package be.smartagents.kata.java.shared.exercise;

import java.util.Arrays;
import java.util.List;

/** Turns what a student typed into something a {@link ExerciseChecker} can compare. */
public final class Answers {

    private Answers() {}

    /**
     * Splits a comma-separated answer into trimmed parts. A blank answer comes back empty rather
     * than as one empty label, so a checker comparing sizes reports "expected 8, got 0".
     */
    public static List<String> commaSeparated(String answer) {
        if (answer == null || answer.isBlank()) {
            return List.of();
        }
        return Arrays.stream(answer.split(",", -1)).map(String::trim).toList();
    }
}
