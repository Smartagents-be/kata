package be.smartagents.kata.java.step1.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;
import java.util.function.Consumer;
import org.springframework.stereotype.Component;

/**
 * Builds the catalog for one request.
 *
 * <p>Every {@link CatalogStage} runs, in {@code @Order}, on every call. On top of that a handful of
 * {@link AuxiliaryStage}s are drawn and folded into the walk at arbitrary positions, so no two
 * requests take quite the same path. What the auxiliaries publish is working notes, and
 * {@link CatalogRun} drops those, which is why the titles that come back are the same whichever
 * ones were drawn.
 */
@Component
public class Catalog {

    private static final int FEWEST_AUXILIARIES = 1;
    private static final int MOST_AUXILIARIES = 10;

    private final List<CatalogStage> stages;
    private final List<AuxiliaryStage> auxiliaries;

    public Catalog(List<CatalogStage> stages, List<AuxiliaryStage> auxiliaries) {
        this.stages = List.copyOf(stages);
        this.auxiliaries = List.copyOf(auxiliaries);
    }

    public List<String> titles() {
        CatalogRun run = new CatalogRun();
        for (Consumer<CatalogRun> step : walk()) {
            step.accept(run);
        }
        return run.titles();
    }

    /** The ordered stages, with a random draw of auxiliaries slotted in between them. */
    private List<Consumer<CatalogRun>> walk() {
        Random random = ThreadLocalRandom.current();

        List<Consumer<CatalogRun>> walk = new ArrayList<>();
        for (CatalogStage stage : stages) {
            walk.add(stage::apply);
        }

        List<AuxiliaryStage> pool = new ArrayList<>(auxiliaries);
        Collections.shuffle(pool, random);
        int drawn = Math.min(
            pool.size(),
            FEWEST_AUXILIARIES + random.nextInt(MOST_AUXILIARIES - FEWEST_AUXILIARIES + 1));
        for (int i = 0; i < drawn; i++) {
            AuxiliaryStage auxiliary = pool.get(i);
            walk.add(random.nextInt(walk.size() + 1), auxiliary::apply);
        }

        return walk;
    }
}
