package be.smartagents.kata.java.step1;

import static org.assertj.core.api.Assertions.assertThat;

import be.smartagents.kata.java.shared.exercise.CheckResult;
import org.junit.jupiter.api.Test;

class ContextLayersCheckerTest {

    private static final String CORRECT =
        "prompt,project,harness,session,external,memory,session,project";

    private final ContextLayersChecker checker = new ContextLayersChecker();

    @Test
    void acceptsTheCorrectSequence() {
        CheckResult result = checker.check(CORRECT);

        assertThat(result.passed()).isTrue();
        assertThat(result.details()).isEmpty();
    }

    @Test
    void toleratesSpacingAndCasing() {
        assertThat(checker.check(CORRECT.replace(",", " , ").toUpperCase()).passed()).isTrue();
    }

    @Test
    void namesEveryItemInTheWrongLayer() {
        CheckResult result = checker.check(CORRECT.replace("prompt,project,", "prompt,session,"));

        assertThat(result.passed()).isFalse();
        assertThat(result.details())
            .hasSize(1)
            .allSatisfy(detail -> assertThat(detail)
                .startsWith("2 (")
                .endsWith("expected \"project\" but got \"session\""));
    }

    @Test
    void tellsAnUnknownLabelApartFromAWrongOne() {
        CheckResult result = checker.check(CORRECT.replace("harness", "banana"));

        assertThat(result.passed()).isFalse();
        assertThat(result.details()).containsExactly(
            "3: \"banana\" is not one of: prompt, session, project, harness, memory, external");
    }

    @Test
    void rejectsAnAnswerOfTheWrongLength() {
        CheckResult result = checker.check("prompt,project,harness");

        assertThat(result.passed()).isFalse();
        assertThat(result.message()).isEqualTo("Expected 8 labels, got 3.");
    }

    @Test
    void rejectsABlankAnswer() {
        assertThat(checker.check("  ").passed()).isFalse();
    }
}
