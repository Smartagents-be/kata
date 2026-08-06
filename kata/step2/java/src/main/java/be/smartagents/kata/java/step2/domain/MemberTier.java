package be.smartagents.kata.java.step2.domain;

/** Who borrowed it. The tier bends the fee: some members get a grace, some get a discount. */
public enum MemberTier {
    STANDARD,
    STUDENT,
    SENIOR,
    STAFF,
    /**
     * Partner institution, billed on a rate negotiated with it rather than on the public one. That
     * arrangement is not written down in this repository.
     */
    PARTNER
}
