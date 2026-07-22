package be.smartagents.kata.java.step1;

import be.smartagents.kata.java.shared.exercise.Answers;
import be.smartagents.kata.java.shared.exercise.CheckResult;
import be.smartagents.kata.java.shared.exercise.ExerciseChecker;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Component;

/**
 * Grades the exercise in the `memory` unit of step 1: after a {@code /clear} in the same
 * repository, which context is still there?
 *
 * <p>Only the session layer is lost. Everything else either comes back because the agent reads the
 * project again, or was never part of the conversation to begin with.
 *
 * <p>{@link #ITEMS} is the single source of truth. The numbered list in
 * {@code front/src/steps/step1/units/memory.html} must stay in the same order.
 */
@Component
public class SurvivesClearChecker implements ExerciseChecker {

    private static final String KEEP = "keep";
    private static final String GONE = "gone";

    private static final List<Item> ITEMS = List.of(
        new Item("the mvn test output from earlier in this chat", false),
        new Item("the Conventions section of CLAUDE.md", true),
        new Item("a note you asked the agent to remember last week", true),
        new Item("the prompt you typed three turns ago", false),
        new Item("the description of the Read tool", true));

    private static final int MAX_DETAILS = 5;

    @Override
    public String exerciseId() {
        return "survives-clear";
    }

    @Override
    public CheckResult check(String answer) {
        List<String> submitted = Answers.commaSeparated(answer);
        if (submitted.size() != ITEMS.size()) {
            return CheckResult.failed(
                "Expected %d answers, got %d.".formatted(ITEMS.size(), submitted.size()),
                List.of());
        }

        List<String> mistakes = new ArrayList<>();
        for (int i = 0; i < ITEMS.size(); i++) {
            String submittedAnswer = submitted.get(i).toLowerCase();
            if (!KEEP.equals(submittedAnswer) && !GONE.equals(submittedAnswer)) {
                mistakes.add("%d: answer \"%s\" or \"%s\", not \"%s\""
                    .formatted(i + 1, KEEP, GONE, submitted.get(i)));
                continue;
            }
            Item item = ITEMS.get(i);
            if (KEEP.equals(submittedAnswer) != item.survives()) {
                mistakes.add("%d (%s): expected \"%s\""
                    .formatted(i + 1, item.description(), item.survives() ? KEEP : GONE));
            }
        }

        if (mistakes.isEmpty()) {
            return CheckResult.passed("All %d answers are correct.".formatted(ITEMS.size()));
        }
        return CheckResult.failed(
            "%d of %d answers are wrong.".formatted(mistakes.size(), ITEMS.size()),
            mistakes.size() > MAX_DETAILS ? mistakes.subList(0, MAX_DETAILS) : mistakes);
    }

    /** One numbered item: what the student reads, and whether it is still there after a /clear. */
    private record Item(String description, boolean survives) {}
}
