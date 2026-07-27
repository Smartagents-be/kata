package be.smartagents.kata.java.step2.web;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import be.smartagents.kata.java.step2.Step2Application;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;

/**
 * The other half of the step 2 challenge spec: the endpoint itself, over the real seeded shelf in
 * {@code LoanDataConfig}. It fails with a 500 until {@code MemberStatements.forTier} is implemented.
 *
 * <p>The code is only checked against {@link StatementCode}, never written out here, so passing this
 * test is the way to learn it rather than reading it off the source.
 *
 * <p>The application is named explicitly: {@code @SpringBootTest} only searches upwards from its own
 * package for a configuration, and step 2's {@link Step2Application} sits beside this test's package,
 * not above it. Naming it also keeps the boot to step 2's slice, without step 1 on the context.
 */
@Tag("challenge")
@SpringBootTest(classes = Step2Application.class)
@AutoConfigureMockMvc
class LoanControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void reportsWhatTheStudentTierOwesAndHandsBackTheCode() throws Exception {
        mockMvc.perform(get("/api/loans/statement/STUDENT"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.tier").value("STUDENT"))
            .andExpect(jsonPath("$.totalOwed").value(275))
            .andExpect(jsonPath("$.chargedLoans").value(2))
            .andExpect(jsonPath("$.feesByMedia.BOOK").value(25))
            .andExpect(jsonPath("$.feesByMedia.DVD").value(250))
            .andExpect(jsonPath("$.code").value(StatementCode.reveal()));
    }

    @Test
    void reportsTheOtherTiersFromTheSameShelf() throws Exception {
        mockMvc.perform(get("/api/loans/statement/STANDARD"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.totalOwed").value(2100))
            .andExpect(jsonPath("$.chargedLoans").value(2));

        // Staff late fees are waived, so only the lost book is left to pay for.
        mockMvc.perform(get("/api/loans/statement/STAFF"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.totalOwed").value(3000))
            .andExpect(jsonPath("$.chargedLoans").value(1));
    }
}
