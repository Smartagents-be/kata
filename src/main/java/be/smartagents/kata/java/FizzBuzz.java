package be.smartagents.kata.java;

/** Placeholder kata, here so the build has something to compile. Replace with the real exercise. */
public final class FizzBuzz {

    private FizzBuzz() {
    }

    public static String of(int n) {
        if (n % 15 == 0) {
            return "FizzBuzz";
        }
        if (n % 3 == 0) {
            return "Fizz";
        }
        if (n % 5 == 0) {
            return "Buzz";
        }
        return Integer.toString(n);
    }
}
