package be.smartagents.kata.java.shared.exercise;

import java.util.List;

/**
 * Outcome of checking a submitted answer.
 *
 * @param passed  whether the answer was accepted
 * @param message one-line summary shown to the student
 * @param details per-item feedback; empty when the answer passed
 */
public record CheckResult(boolean passed, String message, List<String> details) {

    public static CheckResult passed(String message) {
        return new CheckResult(true, message, List.of());
    }

    public static CheckResult failed(String message, List<String> details) {
        return new CheckResult(false, message, List.copyOf(details));
    }
}
