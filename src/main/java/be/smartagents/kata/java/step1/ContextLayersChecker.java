package be.smartagents.kata.java.step1;

import be.smartagents.kata.java.shared.exercise.Answers;
import be.smartagents.kata.java.shared.exercise.CheckResult;
import be.smartagents.kata.java.shared.exercise.ExerciseChecker;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Component;

/**
 * Grades the step 1 exercise: the student labels each item with the {@link ContextLayer} it comes
 * from and submits the labels comma-separated, in order.
 *
 * <p>{@link #ITEMS} is the single source of truth for the quiz. The numbered list in
 * {@code front/src/steps/step1/content.html} must stay in the same order — change one and change
 * the other.
 */
@Component
public class ContextLayersChecker implements ExerciseChecker {

    private static final List<Item> ITEMS = List.of(
        new Item("the sentence you just typed", ContextLayer.PROMPT),
        new Item("the Conventions section of CLAUDE.md", ContextLayer.PROJECT),
        new Item("the description of the Read tool", ContextLayer.HARNESS),
        new Item("your \"no, use AssertJ instead\" from twenty turns ago", ContextLayer.SESSION),
        new Item("release notes fetched from the web", ContextLayer.EXTERNAL),
        new Item("a note saved last week and reloaded today", ContextLayer.MEMORY),
        new Item("the output of the mvn test run earlier in this chat", ContextLayer.SESSION),
        new Item("the branch name and recent commits", ContextLayer.PROJECT));

    private static final int MAX_DETAILS = 5;

    @Override
    public String exerciseId() {
        return "context-layers";
    }

    @Override
    public CheckResult check(String answer) {
        List<String> submitted = Answers.commaSeparated(answer);
        if (submitted.size() != ITEMS.size()) {
            return CheckResult.failed(
                "Expected %d labels, got %d.".formatted(ITEMS.size(), submitted.size()),
                List.of());
        }

        List<String> mistakes = new ArrayList<>();
        for (int i = 0; i < ITEMS.size(); i++) {
            String submittedLabel = submitted.get(i);
            Optional<ContextLayer> parsed = ContextLayer.parse(submittedLabel);
            if (parsed.isEmpty()) {
                mistakes.add("%d: \"%s\" is not one of: %s"
                    .formatted(i + 1, submittedLabel, ContextLayer.labels()));
                continue;
            }
            Item item = ITEMS.get(i);
            if (parsed.get() != item.layer()) {
                mistakes.add("%d (%s): expected \"%s\" but got \"%s\""
                    .formatted(i + 1, item.description(), item.layer().label(), parsed.get().label()));
            }
        }

        if (mistakes.isEmpty()) {
            return CheckResult.passed("All %d items are placed correctly.".formatted(ITEMS.size()));
        }
        return CheckResult.failed(
            "%d of %d items are wrong.".formatted(mistakes.size(), ITEMS.size()),
            mistakes.size() > MAX_DETAILS ? mistakes.subList(0, MAX_DETAILS) : mistakes);
    }

    /** One numbered item of the quiz: what the student reads, and where it actually comes from. */
    private record Item(String description, ContextLayer layer) {}
}
