package be.smartagents.kata.java.step1;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import be.smartagents.kata.java.step1.services.Catalog;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;

/**
 * Covers the endpoint only — the JSON is whatever the catalogue published, in that order. What
 * the real stages publish is {@code CatalogTest}'s business, so this builds a catalogue from two
 * stub stages instead.
 */
@WebMvcTest(TitleController.class)
@Import(TitleControllerTest.StubCatalog.class)
class TitleControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void returnsThePublishedTitlesInOrder() throws Exception {
        mockMvc.perform(get("/api/titles"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.length()").value(2))
            .andExpect(jsonPath("$[0]").value("First Stub Title"))
            .andExpect(jsonPath("$[1]").value("Second Stub Title"));
    }

    @TestConfiguration
    static class StubCatalog {

        @Bean
        Catalog catalog() {
            return new Catalog(
                List.of(
                    run -> run.publish("First Stub Title"),
                    run -> run.publish("Second Stub Title")),
                List.of(run -> {}));
        }
    }
}
