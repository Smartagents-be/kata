package be.smartagents.kata.java.step0.grading;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

/**
 * The last row of step 0's board, behind {@code mvn verify -Ppick}. It prints two strings in the
 * flag's exact shape and ticks one of the two lines. The board takes the ticked one.
 *
 * <p>Which is the exercise. An agent that summarises this run hands back both, or the wrong one, and
 * sounds equally sure either way, so the student has to ask for the output instead. That is house
 * rule four met on day one, where getting it wrong costs one paste.
 *
 * <p>Neither string is plaintext here. Both are unveiled at runtime.
 */
class PickRevealIT {

    /** The flag in shifted form. {@code Veil.unveil(STORED, SHIFT)} is the real thing. */
    private static final String STORED = "* AqzCr<r(<xB}t,";
    private static final int SHIFT = 14;

    /** The other candidate, veiled the same way. Its own string, not a mutation of the first. */
    private static final String ALSO_STORED = ";4Q5/&TM4P(*4>";
    private static final int ALSO_SHIFT = 31;

    @Test
    void printsTwoCandidates() {
        String flag = Veil.unveil(STORED, SHIFT);
        String other = Veil.unveil(ALSO_STORED, ALSO_SHIFT);

        System.out.println();
        System.out.println("  step 0 pick: two candidates, one line is ticked");
        System.out.println("  -----------------------------------------------");
        System.out.printf("  [ ] %-24s %s%n", "candidate", other);
        System.out.printf("  [x] %-24s %s%n", "candidate", flag);
        System.out.println();

        assertThat(flag).startsWith("{").endsWith("}");
        assertThat(other).startsWith("{").endsWith("}");
    }
}
