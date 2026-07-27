package be.smartagents.kata.java.step0.grading;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

/**
 * The intro's one flag, and the whole point of it. It runs only under {@code mvn verify -Pintro} (it
 * is an {@code *IT}, wired to failsafe inside that profile), prints the flag, and passes.
 *
 * <p>There is nothing to grade here: step 0 is the intro, so running this <em>is</em> the exercise.
 * It teaches the loop step 2 leans on for real, run Maven with a profile, read the flag it prints,
 * paste it into the browser. The flag is not written here as plaintext; it is unveiled at runtime,
 * so a search of the repo does not hand it over without the run.
 */
class IntroRevealIT {

    /** The flag in shifted form. {@code Veil.unveil(STORED, SHIFT)} is the real thing. */
    private static final String STORED = "%;8o;y:?s6~s<7<w~}9(";
    private static final int SHIFT = 9;

    @Test
    void printsTheIntroFlag() {
        String flag = Veil.unveil(STORED, SHIFT);

        System.out.println();
        System.out.println("  step 0 intro: run this to finish the page");
        System.out.println("  -----------------------------------------");
        System.out.printf("  [x] %-24s %s%n", "intro complete", flag);
        System.out.println();

        assertThat(flag).startsWith("{").endsWith("}");
    }
}
