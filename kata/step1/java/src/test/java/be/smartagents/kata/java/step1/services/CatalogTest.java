package be.smartagents.kata.java.step1.services;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.RepeatedTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * The catalogue is assembled by walking every {@link CatalogStage}, with a random draw of
 * {@link AuxiliaryStage}s folded in. These titles are what the walk publishes today; the
 * assertions are deliberately written so that a stage which starts publishing keeps the build
 * green.
 */
@SpringBootTest
class CatalogTest {

    private static final List<String> PUBLISHED = List.of(
        "Refactoring by Candlelight",
        "Secret Key to Great Code",
        "Hidden Software Tricks",
        "Seventeen Ways to Break a Build",
        "The Compiler Told Me Nothing",
        "Whispered Wisdom of the Legacy Monolith",
        "Cathedral of the Nightly Build",
        "The Lost Art of Naming Things",
        "Vault of Forgotten Regressions");

    @Autowired
    private Catalog catalog;

    @Test
    void publishesEveryKnownTitleInStageOrder() {
        List<String> titles = catalog.titles();

        assertThat(titles).containsSubsequence(PUBLISHED.toArray(String[]::new));
        assertThat(titles).hasSizeGreaterThanOrEqualTo(PUBLISHED.size());
        assertThat(titles).doesNotHaveDuplicates();
    }

    /**
     * Which auxiliaries are drawn changes per call. None of them publish, so the result must not
     * move. Repeated so the run covers a spread of draws.
     */
    @RepeatedTest(10)
    void returnsTheSameTitlesWhicheverAuxiliariesAreDrawn() {
        assertThat(catalog.titles()).isEqualTo(catalog.titles());
    }
}
