package be.smartagents.kata.java.step1;

import static org.assertj.core.api.Assertions.assertThat;

import be.smartagents.kata.java.shared.exercise.CheckResult;
import org.junit.jupiter.api.Test;

class FizzBuzzCheckerTest {

    private static final String CORRECT =
        "1,2,Fizz,4,Buzz,Fizz,7,8,Fizz,Buzz,11,Fizz,13,14,FizzBuzz";

    private final FizzBuzzChecker checker = new FizzBuzzChecker();

    @Test
    void acceptsTheCorrectSequence() {
        CheckResult result = checker.check(CORRECT);

        assertThat(result.passed()).isTrue();
        assertThat(result.details()).isEmpty();
    }

    @Test
    void toleratesSpacingAroundValues() {
        assertThat(checker.check(CORRECT.replace(",", " , ")).passed()).isTrue();
    }

    @Test
    void namesEveryWrongValue() {
        CheckResult result = checker.check(CORRECT.replace(",Fizz,4,", ",3,4,"));

        assertThat(result.passed()).isFalse();
        assertThat(result.details()).containsExactly("3: expected \"Fizz\" but got \"3\"");
    }

    @Test
    void rejectsAnAnswerOfTheWrongLength() {
        CheckResult result = checker.check("1,2,Fizz");

        assertThat(result.passed()).isFalse();
        assertThat(result.message()).isEqualTo("Expected 15 comma-separated values, got 3.");
    }

    @Test
    void rejectsABlankAnswer() {
        assertThat(checker.check("  ").passed()).isFalse();
    }
}
