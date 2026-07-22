package be.smartagents.kata.java.shared.web;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import be.smartagents.kata.java.shared.exercise.CheckResult;
import be.smartagents.kata.java.shared.exercise.ExerciseChecker;
import be.smartagents.kata.java.shared.exercise.ExerciseCheckers;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;

/**
 * Covers the plumbing only — dispatch, JSON shape, unknown ids. Grading logic belongs to the
 * step that owns the exercise, so this test uses a stub rather than a real checker: nothing in
 * {@code shared} should depend on a step package.
 */
@WebMvcTest(ExerciseController.class)
@Import({ExerciseCheckers.class, ExerciseControllerTest.StubChecker.class})
class ExerciseControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void returnsThePassingResultFromTheChecker() throws Exception {
        mockMvc.perform(check("stub", "right"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.passed").value(true))
            .andExpect(jsonPath("$.message").value("Looks right."))
            .andExpect(jsonPath("$.details").isEmpty());
    }

    @Test
    void returnsTheFailingResultIncludingDetails() throws Exception {
        mockMvc.perform(check("stub", "wrong"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.passed").value(false))
            .andExpect(jsonPath("$.message").value("Not quite."))
            .andExpect(jsonPath("$.details.length()").value(1))
            .andExpect(jsonPath("$.details[0]").value("first value is off"));
    }

    @Test
    void returnsNotFoundForAnUnknownExercise() throws Exception {
        mockMvc.perform(check("nope", "right")).andExpect(status().isNotFound());
    }

    private static RequestBuilder check(String exerciseId, String answer) {
        return post("/api/exercises/{exerciseId}/check", exerciseId)
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"answer\":\"%s\"}".formatted(answer));
    }

    static class StubChecker implements ExerciseChecker {

        @Override
        public String exerciseId() {
            return "stub";
        }

        @Override
        public CheckResult check(String answer) {
            return "right".equals(answer)
                ? CheckResult.passed("Looks right.")
                : CheckResult.failed("Not quite.", List.of("first value is off"));
        }
    }
}
