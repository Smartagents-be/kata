package be.smartagents.kata.java.web;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import be.smartagents.kata.java.exercise.ExerciseCheckers;
import be.smartagents.kata.java.exercise.FizzBuzzChecker;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(ExerciseController.class)
@Import({ExerciseCheckers.class, FizzBuzzChecker.class})
class ExerciseControllerTest {

    private static final String CORRECT =
        "1,2,Fizz,4,Buzz,Fizz,7,8,Fizz,Buzz,11,Fizz,13,14,FizzBuzz";

    @Autowired
    private MockMvc mockMvc;

    @Test
    void acceptsACorrectAnswer() throws Exception {
        mockMvc.perform(check("fizzbuzz", CORRECT))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.passed").value(true))
            .andExpect(jsonPath("$.details").isEmpty());
    }

    @Test
    void reportsEachWrongValue() throws Exception {
        String wrong = CORRECT.replace(",Fizz,4,", ",3,4,");

        mockMvc.perform(check("fizzbuzz", wrong))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.passed").value(false))
            .andExpect(jsonPath("$.details.length()").value(1))
            .andExpect(jsonPath("$.details[0]").value("3: expected \"Fizz\" but got \"3\""));
    }

    @Test
    void rejectsAnAnswerOfTheWrongLength() throws Exception {
        mockMvc.perform(check("fizzbuzz", "1,2,Fizz"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.passed").value(false))
            .andExpect(jsonPath("$.message").value("Expected 15 comma-separated values, got 3."));
    }

    @Test
    void returnsNotFoundForAnUnknownExercise() throws Exception {
        mockMvc.perform(check("nope", CORRECT)).andExpect(status().isNotFound());
    }

    private static org.springframework.test.web.servlet.RequestBuilder check(
            String exerciseId, String answer) {
        return post("/api/exercises/{exerciseId}/check", exerciseId)
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"answer\":\"%s\"}".formatted(answer));
    }
}
