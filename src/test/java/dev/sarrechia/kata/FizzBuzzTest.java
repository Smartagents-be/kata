package dev.sarrechia.kata;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

class FizzBuzzTest {

    @DisplayName("maps a number to its FizzBuzz representation")
    @ParameterizedTest(name = "{0} -> {1}")
    @CsvSource({
        "1, 1",
        "3, Fizz",
        "5, Buzz",
        "9, Fizz",
        "10, Buzz",
        "15, FizzBuzz",
        "30, FizzBuzz",
    })
    void mapsNumberToFizzBuzz(int input, String expected) {
        assertThat(FizzBuzz.of(input)).isEqualTo(expected);
    }
}
