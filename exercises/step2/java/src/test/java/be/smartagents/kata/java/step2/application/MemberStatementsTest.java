package be.smartagents.kata.java.step2.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.entry;

import be.smartagents.kata.java.step2.adapter.InMemoryLoanRepository;
import be.smartagents.kata.java.step2.domain.Loan;
import be.smartagents.kata.java.step2.domain.MediaType;
import be.smartagents.kata.java.step2.domain.MemberTier;
import be.smartagents.kata.java.step2.port.LoanRepository;
import java.util.List;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

/**
 * The spec for the step 2 challenge. These tests fail until {@code MemberStatements.forTier} is
 * implemented, and passing them is the exercise.
 *
 * <p>They are tagged {@code challenge} and excluded from the default build, so a clean checkout
 * stays green. Run them with {@code mvn test -Pchallenge}.
 *
 * <p>Read them as the requirement rather than guessing from the class name. Between them they say
 * what the statement totals, what it counts, how it splits the money per media, and what it does
 * with the awkward cases: a loan still inside its grace period, a lost item, and a tier with nothing
 * outstanding at all.
 */
@Tag("challenge")
class MemberStatementsTest {

    /** Fees follow LateFeePolicy, so these fixtures deliberately cover grace, tiers and a loss. */
    private static final Loan STUDENT_BOOK_CHARGED =
        new Loan("bk-1", MediaType.BOOK, MemberTier.STUDENT, 5, false, false);
    private static final Loan STUDENT_DVD_CHARGED =
        new Loan("dv-1", MediaType.DVD, MemberTier.STUDENT, 8, false, false);
    private static final Loan STUDENT_BOOK_IN_GRACE =
        new Loan("bk-2", MediaType.BOOK, MemberTier.STUDENT, 2, false, false);
    private static final Loan STUDENT_REFERENCE_IN_GRACE =
        new Loan("rf-1", MediaType.REFERENCE, MemberTier.STUDENT, 3, false, false);
    private static final Loan STANDARD_REFERENCE =
        new Loan("rf-2", MediaType.REFERENCE, MemberTier.STANDARD, 10, false, false);
    private static final Loan SENIOR_EQUIPMENT_RENEWED =
        new Loan("eq-1", MediaType.EQUIPMENT, MemberTier.SENIOR, 10, true, false);
    private static final Loan STAFF_BOOK_LOST =
        new Loan("bk-3", MediaType.BOOK, MemberTier.STAFF, 3, false, true);

    private static MemberStatements statementsOver(Loan... loans) {
        LoanRepository repository = new InMemoryLoanRepository(List.of(loans));
        return new MemberStatements(repository);
    }

    private static MemberStatements everyTier() {
        return statementsOver(
            STUDENT_BOOK_CHARGED,
            STUDENT_DVD_CHARGED,
            STUDENT_BOOK_IN_GRACE,
            STUDENT_REFERENCE_IN_GRACE,
            STANDARD_REFERENCE,
            SENIOR_EQUIPMENT_RENEWED,
            STAFF_BOOK_LOST);
    }

    @Test
    void addsUpEveryFeeOwedByTheRequestedTier() {
        // 25 for the overdue book, 250 for the DVD, nothing for the two still inside their grace.
        assertThat(everyTier().forTier(MemberTier.STUDENT).totalOwed()).isEqualTo(275);
    }

    @Test
    void countsOnlyTheLoansThatActuallyCarriedAFee() {
        // Four student loans, but the two inside their grace period cost nothing.
        assertThat(everyTier().forTier(MemberTier.STUDENT).chargedLoans()).isEqualTo(2);
    }

    @Test
    void splitsTheFeesByMediaTypeAndKeepsMediaThatCostNothing() {
        // Every media the tier has a loan for shows up, even when its fees add up to zero.
        assertThat(everyTier().forTier(MemberTier.STUDENT).feesByMedia())
            .containsOnly(
                entry(MediaType.BOOK, 25L),
                entry(MediaType.DVD, 250L),
                entry(MediaType.REFERENCE, 0L));
    }

    @Test
    void leavesOtherTiersOutOfTheStatement() {
        MemberStatements statements = everyTier();

        MemberStatements.Statement standard = statements.forTier(MemberTier.STANDARD);
        assertThat(standard.totalOwed()).isEqualTo(2000);
        assertThat(standard.chargedLoans()).isEqualTo(1);
        assertThat(standard.feesByMedia()).containsOnly(entry(MediaType.REFERENCE, 2000L));

        // A renewed senior loan: the surcharge lands before the tier discount does.
        MemberStatements.Statement senior = statements.forTier(MemberTier.SENIOR);
        assertThat(senior.totalOwed()).isEqualTo(945);
        assertThat(senior.feesByMedia()).containsOnly(entry(MediaType.EQUIPMENT, 945L));
    }

    @Test
    void stillBillsATierThatNormallyPaysNothingWhenTheItemIsLost() {
        // Staff late fees are waived, but a lost item is a replacement charge, not a late fee.
        MemberStatements.Statement staff = everyTier().forTier(MemberTier.STAFF);

        assertThat(staff.totalOwed()).isEqualTo(3000);
        assertThat(staff.chargedLoans()).isEqualTo(1);
    }

    @Test
    void returnsAnEmptyStatementForATierWithNothingOutstanding() {
        MemberStatements.Statement staff =
            statementsOver(STUDENT_BOOK_CHARGED, STANDARD_REFERENCE).forTier(MemberTier.STAFF);

        assertThat(staff.totalOwed()).isZero();
        assertThat(staff.chargedLoans()).isZero();
        assertThat(staff.feesByMedia()).isEmpty();
    }
}
