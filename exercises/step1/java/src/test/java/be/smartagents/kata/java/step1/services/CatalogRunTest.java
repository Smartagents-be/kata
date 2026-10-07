package be.smartagents.kata.java.step1.services;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

class CatalogRunTest {

    private final CatalogRun run = new CatalogRun();

    @Test
    void keepsWhatWasPublished() {
        run.publish("A Title Worth Printing");

        assertThat(run.titles()).containsExactly("A Title Worth Printing");
    }

    @Test
    void dropsAWorkingNoteWhereverTheMarkerSits() {
        run.publish("shelf swept (draft)");
        run.publish("(draft) not finished either");

        assertThat(run.titles()).isEmpty();
    }

    @Test
    void keepsTheOrderStagesPublishedIn() {
        run.publish("First");
        run.publish("housekeeping (draft)");
        run.publish("Second");

        assertThat(run.titles()).containsExactly("First", "Second");
    }
}
