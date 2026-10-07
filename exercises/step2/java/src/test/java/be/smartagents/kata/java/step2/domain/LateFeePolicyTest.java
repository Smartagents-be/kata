package be.smartagents.kata.java.step2.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

/**
 * The loan module ships with barely any test to its name. One happy path is covered and nothing
 * else: not the media types, not the tiers, not the grace, not the cap, not the lost-item branch.
 *
 * <p>That is the starting line, not the finish. The {@code graded} profile holds this module to a
 * coverage floor and a complexity ceiling, and the workshop unit hands the student the goal of
 * meeting them. Do not harden it here: filling this file in is the exercise.
 */
class LateFeePolicyTest {

    @Test
    void chargesAStandardMemberTheDailyRatePerOverdueDay() {
        Loan loan = new Loan("bk-1", MediaType.BOOK, MemberTier.STANDARD, 4, false, false);

        assertThat(LateFeePolicy.assess(loan)).isEqualTo(100);
    }
}
