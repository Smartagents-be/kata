package be.smartagents.kata.java.step2.web;

import be.smartagents.kata.java.step2.application.MemberStatements;
import be.smartagents.kata.java.step2.domain.MemberTier;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Step 2's one endpoint. It is already wired: it takes the tier off the path, asks
 * {@link MemberStatements} what that tier owes, and hands back the answer together with the code.
 *
 * <p>Until {@code MemberStatements.forTier} is implemented this fails with a 500, which is the
 * point. Implement the statement and the same request starts answering.
 */
@RestController
@RequestMapping("/api/loans")
public class LoanController {

    private final MemberStatements statements;

    public LoanController(MemberStatements statements) {
        this.statements = statements;
    }

    @GetMapping("/statement/{tier}")
    public StatementResponse statement(@PathVariable MemberTier tier) {
        return StatementResponse.of(tier, statements.forTier(tier), StatementCode.reveal());
    }
}
