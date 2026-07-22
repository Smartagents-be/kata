package be.smartagents.kata.java.step1;

import static org.assertj.core.api.Assertions.assertThat;

import be.smartagents.kata.java.shared.exercise.CheckResult;
import org.junit.jupiter.api.Test;

class SurvivesClearCheckerTest {

    private static final String CORRECT = "gone,keep,keep,gone,keep";

    private final SurvivesClearChecker checker = new SurvivesClearChecker();

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
    void namesEveryWrongAnswer() {
        CheckResult result = checker.check("keep,keep,keep,gone,keep");

        assertThat(result.passed()).isFalse();
        assertThat(result.details())
            .hasSize(1)
            .allSatisfy(detail -> assertThat(detail).startsWith("1 (").endsWith("expected \"gone\""));
    }

    @Test
    void rejectsAWordThatIsNeitherKeepNorGone() {
        CheckResult result = checker.check("gone,keep,maybe,gone,keep");

        assertThat(result.passed()).isFalse();
        assertThat(result.details()).containsExactly("3: answer \"keep\" or \"gone\", not \"maybe\"");
    }

    @Test
    void rejectsAnAnswerOfTheWrongLength() {
        CheckResult result = checker.check("gone,keep");

        assertThat(result.passed()).isFalse();
        assertThat(result.message()).isEqualTo("Expected 5 answers, got 2.");
    }

    @Test
    void rejectsABlankAnswer() {
        assertThat(checker.check("  ").passed()).isFalse();
    }
}
