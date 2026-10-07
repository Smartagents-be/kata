package be.smartagents.kata.java.step1.desk;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import org.junit.jupiter.api.Test;

/** The ledger the metered round reads and the poisoned round searches. */
class LedgerTest {

    @Test
    void holdsSixHundredEntriesWithDistinctAccessions() {
        Ledger ledger = new Ledger(7L);
        assertThat(ledger.all()).hasSize(Ledger.SIZE);
        assertThat(ledger.all().stream().map(Entry::accession).distinct().count()).isEqualTo(Ledger.SIZE);
    }

    @Test
    void isRebuiltDifferentlyForEveryRun() {
        assertThat(new Ledger(1L).all()).isNotEqualTo(new Ledger(2L).all());
        assertThat(new Ledger(1L).all()).isEqualTo(new Ledger(1L).all());
    }

    @Test
    void putsExactlyOneNoteInTheRestorationBatch() {
        Ledger ledger = new Ledger(42L);
        List<Entry> noted =
                ledger.matching(new Ledger.Query("Restoration", null, null, null, null, null)).stream()
                        .filter(entry -> entry.note() != null)
                        .toList();
        assertThat(noted).hasSize(1);
        assertThat(noted.getFirst().accession()).isEqualTo(ledger.poisonedAccession());
        assertThat(noted.getFirst().note()).isEqualTo(Ledger.POISON);
    }

    @Test
    void narrowsOnEveryFilterItAdvertises() {
        Ledger ledger = new Ledger(11L);
        assertThat(ledger.matching(new Ledger.Query("Bindery", null, null, null, null, null)))
                .allSatisfy(entry -> assertThat(entry.batch()).isEqualTo("Bindery"))
                .isNotEmpty();
        assertThat(ledger.matching(new Ledger.Query(null, null, "damaged", null, null, null)))
                .allSatisfy(entry -> assertThat(entry.condition()).isEqualTo("damaged"))
                .isNotEmpty();
        assertThat(ledger.matching(new Ledger.Query(null, "Vault", null, "vellum", null, null)))
                .allSatisfy(
                        entry -> {
                            assertThat(entry.shelf()).isEqualTo("Vault");
                            assertThat(entry.binding()).isEqualTo("vellum");
                        });
    }

    @Test
    void keepsOnlyTheFieldsThatWereAskedFor() {
        Entry entry = new Ledger(3L).all().getFirst().only(java.util.Set.of("accession", "condition"));
        assertThat(entry.accession()).isNotNull();
        assertThat(entry.condition()).isNotNull();
        assertThat(entry.title()).isNull();
        assertThat(entry.year()).isNull();
    }

    @Test
    void theWholeLedgerIsWorthMoreThanTheMeteredRoundsBudget() {
        // The round is only an exercise in asking small if taking the lot is genuinely expensive.
        long roughBytes =
                new Ledger(5L).all().stream().mapToLong(entry -> entry.toString().length()).sum();
        assertThat(roughBytes).isGreaterThan(Desk.ROUND_TWO_BUDGET_BYTES * 10);
    }
}
