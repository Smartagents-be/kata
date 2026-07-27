package be.smartagents.kata.java.step2.config;

import be.smartagents.kata.java.step2.adapter.InMemoryLoanRepository;
import be.smartagents.kata.java.step2.domain.Loan;
import be.smartagents.kata.java.step2.domain.MediaType;
import be.smartagents.kata.java.step2.domain.MemberTier;
import be.smartagents.kata.java.step2.port.LoanRepository;
import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * The overdue shelf the running service reports on. A fixed list rather than a database: the point
 * of step 2 is the statement, not the storage, and a fixed list means the endpoint answers the same
 * thing on every machine.
 *
 * <p>The spread is deliberate. Every tier appears, every media type appears, and there is a loan
 * still inside its grace period, a renewed one, and one written off as lost, so a statement that
 * only handles the easy path will not match.
 */
@Configuration
public class LoanDataConfig {

    @Bean
    LoanRepository loanRepository() {
        return new InMemoryLoanRepository(List.of(
            new Loan("bk-101", MediaType.BOOK, MemberTier.STUDENT, 5, false, false),
            new Loan("dv-102", MediaType.DVD, MemberTier.STUDENT, 8, false, false),
            new Loan("bk-103", MediaType.BOOK, MemberTier.STUDENT, 2, false, false),
            new Loan("rf-104", MediaType.REFERENCE, MemberTier.STANDARD, 10, false, false),
            new Loan("bk-105", MediaType.BOOK, MemberTier.STANDARD, 4, false, false),
            new Loan("eq-106", MediaType.EQUIPMENT, MemberTier.SENIOR, 10, true, false),
            new Loan("dv-107", MediaType.DVD, MemberTier.STAFF, 12, false, false),
            new Loan("bk-108", MediaType.BOOK, MemberTier.STAFF, 3, false, true)));
    }
}
