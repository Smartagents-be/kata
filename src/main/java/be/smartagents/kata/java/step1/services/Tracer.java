package be.smartagents.kata.java.step1.services;

import java.util.function.Consumer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * TEMPORARY instrumentation. Not part of the kata; delete before committing.
 *
 * <p>Records the three things a stage can do that the response does not show: the order it ran in,
 * every string it restored, and whether what it offered survived into the catalogue.
 */
final class Tracer {

    private static final Logger log = LoggerFactory.getLogger(Tracer.class);

    private Tracer() {}

    /** Names the class that called {@link Scramble#unveil}, skipping Scramble and Tracer itself. */
    static String caller() {
        return StackWalker.getInstance()
            .walk(frames -> frames
                .map(StackWalker.StackFrame::getClassName)
                .filter(name -> name.startsWith("be.smartagents"))
                .filter(name -> !name.endsWith(".Scramble") && !name.endsWith(".Tracer"))
                .findFirst()
                .map(name -> name.substring(name.lastIndexOf('.') + 1))
                .orElse("?"));
    }

    static void restored(String stored, int shift, String restored) {
        log.info("TRACE restore | {} | shift={} | stored={} | -> {}",
            caller(), shift, stored, restored);
    }

    static void ran(int index, String stage) {
        log.info("TRACE run     | #{} {}", index, stage);
    }

    static void offered(String line, boolean kept) {
        log.info("TRACE publish | {} | {}", kept ? "KEPT   " : "dropped", line);
    }

    /** A consumer that remembers what it is, so the walk order can be read back. */
    static Consumer<CatalogRun> named(String name, Consumer<CatalogRun> action) {
        return new Named(name, action);
    }

    static String nameOf(Consumer<CatalogRun> step) {
        return step instanceof Named named ? named.name : step.getClass().getSimpleName();
    }

    private record Named(String name, Consumer<CatalogRun> action) implements Consumer<CatalogRun> {
        @Override
        public void accept(CatalogRun run) {
            action.accept(run);
        }
    }
}
