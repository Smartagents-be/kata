package be.smartagents.kata.java.exercise;

/**
 * Grades submissions for one exercise. Each kata step that asks the student for an answer
 * contributes an implementation; {@link ExerciseCheckers} discovers them by {@link #exerciseId()}.
 */
public interface ExerciseChecker {

    /** Stable id used in the API path, e.g. {@code /api/exercises/{exerciseId}/check}. */
    String exerciseId();

    CheckResult check(String answer);
}
