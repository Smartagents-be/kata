package be.smartagents.kata.java.step2.application;

import be.smartagents.kata.java.step2.domain.LateFeePolicy;
import be.smartagents.kata.java.step2.domain.Loan;
import be.smartagents.kata.java.step2.port.LoanRepository;

/**
 * The one use case of the step 2 module: total up what the overdue loans owe. It walks the
 * repository, runs each loan through {@link LateFeePolicy}, and reports the sum and how many loans
 * actually carried a fee.
 */
public final class LateFeeReport {

    private final LoanRepository loans;

    public LateFeeReport(LoanRepository loans) {
        this.loans = loans;
    }

    public Summary run() {
        long total = 0;
        int charged = 0;
        for (Loan loan : loans.overdueLoans()) {
            long fee = LateFeePolicy.assess(loan);
            total += fee;
            if (fee > 0) {
                charged++;
            }
        }
        return new Summary(total, charged);
    }

    /**
     * @param totalOwed    sum of every loan's fee, in cents
     * @param chargedLoans how many loans came back with a fee above zero
     */
    public record Summary(long totalOwed, int chargedLoans) {}
}
