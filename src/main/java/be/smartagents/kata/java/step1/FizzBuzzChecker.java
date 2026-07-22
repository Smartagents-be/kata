package be.smartagents.kata.java.step1;

import be.smartagents.kata.java.shared.exercise.CheckResult;
import be.smartagents.kata.java.shared.exercise.ExerciseChecker;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.springframework.stereotype.Component;

/**
 * Sample exercise for the walking skeleton: the student submits the FizzBuzz sequence for
 * 1..15 as a comma-separated list. Disposable along with {@link FizzBuzz} once the first real
 * kata step lands.
 */
@Component
public class FizzBuzzChecker implements ExerciseChecker {

    private static final int UPPER_BOUND = 15;
    private static final int MAX_DETAILS = 5;

    @Override
    public String exerciseId() {
        return "fizzbuzz";
    }

    @Override
    public CheckResult check(String answer) {
        List<String> submitted = split(answer);
        if (submitted.size() != UPPER_BOUND) {
            return CheckResult.failed(
                "Expected %d comma-separated values, got %d.".formatted(UPPER_BOUND, submitted.size()),
                List.of());
        }

        List<String> mismatches = new ArrayList<>();
        for (int n = 1; n <= UPPER_BOUND; n++) {
            String expected = FizzBuzz.of(n);
            String actual = submitted.get(n - 1);
            if (!expected.equals(actual)) {
                mismatches.add("%d: expected \"%s\" but got \"%s\"".formatted(n, expected, actual));
            }
        }

        if (mismatches.isEmpty()) {
            return CheckResult.passed("All %d values are correct.".formatted(UPPER_BOUND));
        }
        return CheckResult.failed(
            "%d of %d values are wrong.".formatted(mismatches.size(), UPPER_BOUND),
            mismatches.size() > MAX_DETAILS ? mismatches.subList(0, MAX_DETAILS) : mismatches);
    }

    private static List<String> split(String answer) {
        if (answer == null || answer.isBlank()) {
            return List.of();
        }
        return Arrays.stream(answer.split(",", -1)).map(String::trim).toList();
    }
}
