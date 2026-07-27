package be.smartagents.kata.java.step2.web;

import be.smartagents.kata.java.step2.application.MemberStatements;
import be.smartagents.kata.java.step2.domain.MemberTier;
import java.util.Map;
import java.util.TreeMap;

/**
 * What {@code GET /api/loans/statement/{tier}} returns. Media names are strings and the map is
 * sorted, so the JSON reads the same on every request.
 *
 * @param tier         the tier that was asked for
 * @param totalOwed    every fee for that tier added up, in cents
 * @param chargedLoans how many loans came back with a fee above zero
 * @param feesByMedia  the same fees, per media type
 * @param code         the code the workshop asks for, returned once the statement is real
 */
public record StatementResponse(
    String tier,
    long totalOwed,
    int chargedLoans,
    Map<String, Long> feesByMedia,
    String code) {

    static StatementResponse of(MemberTier tier, MemberStatements.Statement statement, String code) {
        Map<String, Long> byMedia = new TreeMap<>();
        statement.feesByMedia().forEach((media, fee) -> byMedia.put(media.name(), fee));
        return new StatementResponse(
            tier.name(), statement.totalOwed(), statement.chargedLoans(), byMedia, code);
    }
}
