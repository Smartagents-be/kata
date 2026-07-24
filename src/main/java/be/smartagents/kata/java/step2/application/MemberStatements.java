package be.smartagents.kata.java.step2.application;

import be.smartagents.kata.java.step2.domain.MediaType;
import be.smartagents.kata.java.step2.domain.MemberTier;
import be.smartagents.kata.java.step2.port.LoanRepository;
import java.util.Map;
import org.springframework.stereotype.Component;

/**
 * What one member tier owes across every overdue loan: the total, how many loans actually carried a
 * fee, and the same money split by media type.
 *
 * <p><b>This is the step 2 challenge, and {@link #forTier} is deliberately not implemented.</b> The
 * endpoint in front of it and the seed data behind it are already wired, so this method is the only
 * thing standing between a 500 and a working {@code GET /api/loans/statement/{tier}}.
 *
 * <p>The spec is not in this comment. It is in {@code MemberStatementsTest} and
 * {@code LoanControllerTest}, which fail until the method is right. Run them with
 * {@code mvn test -Pchallenge}, read them as the requirement, plan the implementation before you
 * write it, and let the tests say when it is done.
 */
@Component
public class MemberStatements {

    private final LoanRepository loans;

    public MemberStatements(LoanRepository loans) {
        this.loans = loans;
    }

    public Statement forTier(MemberTier tier) {
        throw new UnsupportedOperationException(
            "step 2 challenge: implement MemberStatements.forTier. "
                + "Run `mvn test -Pchallenge` to see the spec it has to satisfy.");
    }

    /**
     * One tier's statement.
     *
     * @param totalOwed    every fee for this tier added up, in cents
     * @param chargedLoans how many of those loans came back with a fee above zero
     * @param feesByMedia  the same fees grouped by the media that was borrowed
     */
    public record Statement(long totalOwed, int chargedLoans, Map<MediaType, Long> feesByMedia) {}
}
