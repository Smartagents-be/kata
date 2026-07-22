package be.smartagents.kata.java.shared.exercise;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;

/** Looks up an {@link ExerciseChecker} by its id. New checkers register simply by being beans. */
@Component
public class ExerciseCheckers {

    private final Map<String, ExerciseChecker> byId;

    public ExerciseCheckers(List<ExerciseChecker> checkers) {
        this.byId = checkers.stream()
            .collect(Collectors.toUnmodifiableMap(ExerciseChecker::exerciseId, Function.identity()));
    }

    public Optional<ExerciseChecker> find(String exerciseId) {
        return Optional.ofNullable(byId.get(exerciseId));
    }
}
