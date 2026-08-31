package be.smartagents.kata.java.step1.desk;

import static org.assertj.core.api.Assertions.assertThat;


import java.util.Map;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/**
 * The desk's state machine, tested without any of the answers in it.
 *
 * <p>Nothing in here knows what a round's answer is, and that is deliberate rather than shy: the
 * first round is checked against a digest whose plaintext is on the student's own machine, so a test
 * that could pass it would be that answer committed here. What is worth testing is everything
 * around it, and all of it is reachable by asserting that a wrong answer is refused and that the run
 * does not move on.
 */
class DeskTest {

    private Desk desk;

    @BeforeEach
    void openTheDesk() {
        desk = new Desk();
        desk.openDesk();
    }

    @Test
    void opensOnRoundOneOfSeven() {
        assertThat(desk.round()).isEqualTo(1);
        assertThat(desk.currentRound()).containsEntry("of", 7).containsEntry("id", "machine");
    }

    @Test
    void namesItsStandingRuleExactlyOnce() {
        Map<String, Object> opened = desk.openDesk();
        assertThat(String.valueOf(opened.get("standingRule"))).contains(desk.word());
        assertThat(String.valueOf(desk.currentRound())).doesNotContain(desk.word());
        assertThat(String.valueOf(desk.meter())).doesNotContain(desk.word());
    }

    @Test
    void aWrongFirstAnswerLeavesTheRunWhereItWas() {
        Map<String, Object> answered = desk.answer("{not-it}");
        assertThat(answered).containsEntry("passed", false);
        assertThat(desk.round()).isEqualTo(1);
    }

    @Test
    void offersTheRecoveryCommandOnlyAfterSeveralWrongTries() {
        assertThat(String.valueOf(desk.answer("{a}").get("desk"))).doesNotContain("machine-context.mjs");
        desk.answer("{b}");
        assertThat(String.valueOf(desk.answer("{c}").get("desk"))).contains("machine-context.mjs");
    }

    @Test
    void metersWhatItSends() {
        desk.record("/api/desk/ledger", 4_000);
        assertThat(desk.meter()).containsEntry("bytes", 4_000L).containsEntry("tokens", 1_000L);
    }

    @Test
    void theStandingRuleOnlyBindsFromRoundSix() {
        assertThat(desk.round()).isLessThan(6);
        assertThat(desk.word()).isNotBlank();
    }

    @Test
    void theReceiptIsRefusedUntilSixRoundsAreBehindYou() {
        Map<String, Object> receipt = desk.receipt();
        assertThat(receipt).containsEntry("flag", "");
        assertThat(String.valueOf(receipt.get("desk2"))).contains("round seven");
    }

    @Test
    void retryClearsWhatTheRoundHasSpentAndLeavesTheRunningTotalAlone() {
        desk.record("/api/desk/ledger", 120_000);
        desk.retry();
        assertThat(desk.meter()).containsEntry("bytes", 120_000L);
        assertThat(desk.round()).isEqualTo(1);
    }

    @Test
    void aShelfLookupIsRememberedAndTheSumIsNotGuessable() {
        int one = desk.tally(1);
        int again = desk.tally(1);
        assertThat(one).isEqualTo(again).isBetween(100, 999);
    }

    @Test
    void everyRoundNamesTheThingItTeaches() {
        assertThat(Round.names())
                .hasSize(7)
                .allSatisfy(line -> assertThat(line).contains("(").contains(")"));
        assertThat(Round.names().getFirst()).contains("machine").contains("context");
        assertThat(Round.names().getLast()).contains("receipt").contains("model");
    }
}
