package be.smartagents.kata.java.step2.port;

import be.smartagents.kata.java.step2.domain.Loan;
import java.util.List;

/**
 * The port the late-fee use case reads through. The domain never knows whether the loans come from
 * a database, a file or a test double; it only knows this shape.
 */
public interface LoanRepository {

    /** Every loan currently past its due date. */
    List<Loan> overdueLoans();
}
