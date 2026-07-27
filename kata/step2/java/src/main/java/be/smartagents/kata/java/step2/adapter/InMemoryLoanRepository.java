package be.smartagents.kata.java.step2.adapter;

import be.smartagents.kata.java.step2.domain.Loan;
import be.smartagents.kata.java.step2.port.LoanRepository;
import java.util.ArrayList;
import java.util.List;

/** The simplest adapter behind {@link LoanRepository}: a list you hand it at construction. */
public final class InMemoryLoanRepository implements LoanRepository {

    private final List<Loan> loans;

    public InMemoryLoanRepository(List<Loan> loans) {
        this.loans = List.copyOf(loans);
    }

    @Override
    public List<Loan> overdueLoans() {
        return new ArrayList<>(loans);
    }
}
