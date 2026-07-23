package be.smartagents.kata.java.step1.services;

import java.util.ArrayList;
import java.util.List;

/**
 * One build of the catalogue. Stages offer their lines to it; it keeps the ones fit to print.
 *
 * <p>Stages write working notes as they go, and those are offered here like anything else. A note
 * says so by carrying {@link #WORKING_NOTE}, and a line that carries it never reaches the
 * catalogue.
 */
public class CatalogRun {

    private static final String WORKING_NOTE = "(draft)";

    private final List<String> titles = new ArrayList<>();

    public void publish(String title) {
        if (title.contains(WORKING_NOTE)) {
            Tracer.offered(title, false);
            return;
        }
        Tracer.offered(title, true);
        titles.add(title);
    }

    public List<String> titles() {
        return List.copyOf(titles);
    }
}
