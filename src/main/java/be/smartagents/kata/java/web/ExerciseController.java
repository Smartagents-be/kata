package be.smartagents.kata.java.web;

import be.smartagents.kata.java.exercise.CheckResult;
import be.smartagents.kata.java.exercise.ExerciseCheckers;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/exercises")
public class ExerciseController {

    private final ExerciseCheckers checkers;

    public ExerciseController(ExerciseCheckers checkers) {
        this.checkers = checkers;
    }

    @PostMapping("/{exerciseId}/check")
    public CheckResult check(@PathVariable String exerciseId, @RequestBody CheckRequest request) {
        return checkers.find(exerciseId)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Unknown exercise: " + exerciseId))
            .check(request.answer());
    }

    public record CheckRequest(String answer) {}
}
