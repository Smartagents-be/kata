package be.smartagents.kata.java.step2.grading;

/**
 * One gate's reward. The flag never appears here in the clear: {@link #reveal()} restores it from
 * its shifted form only when a gate asks for it, matching how step 1 keeps its hidden string.
 *
 * @param gate   which goal earns it, in words the reveal prints
 * @param stored the flag in shifted form (see {@link Veil})
 * @param shift  the shift that restores it
 */
record Flag(String gate, String stored, int shift) {

    static final Flag COVERAGE_FLOOR =
        new Flag("coverage floor", "#k9};{;o<4nu78{%", 7);
    static final Flag COMPLEXITY_CEILING =
        new Flag("complexity ceiling", "'o=x|y>%> &:n?>w={r*", 11);
    static final Flag HONEST_COVERAGE =
        new Flag("honest coverage", "!n7s9zy3j5|:w:n8$", 5);

    String reveal() {
        return Veil.unveil(stored, shift);
    }
}
