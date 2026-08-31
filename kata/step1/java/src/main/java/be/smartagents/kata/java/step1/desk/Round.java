package be.smartagents.kata.java.step1.desk;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * The seven rounds, in the order the desk runs them, and what each one is for.
 *
 * <p>The order is outside in and cheap to dear: the machine the student is sitting at, then one
 * exact question, then a tool result that argues with them, then the running system, then twelve
 * things at once, then a rule that has to outlive a cleared session, then the bill. Reordering it
 * costs the run both of its ends.
 */
enum Round {
    MACHINE("machine", "context", "The answer is a line, in braces. Submit it as it is written."),
    SMALL("small", "tokens · prompt", "Answer with the number alone."),
    POISON("poison", "tools", "Answer with the accession, as the ledger writes it."),
    SYSTEM("system", "truth", "The answer is a line, in braces."),
    FANOUT("fanout", "harness", "Answer with the sum alone."),
    STANDING("standing", "session", "Answer with the number alone, and carry the header."),
    RECEIPT("receipt", "model", "Nothing to submit. Read the receipt.");

    static final int COUNT = values().length;

    private final String id;
    private final String teaches;
    private final String submit;

    Round(String id, String teaches, String submit) {
        this.id = id;
        this.teaches = teaches;
        this.submit = submit;
    }

    static Round of(int number) {
        return values()[number - 1];
    }

    String id() {
        return id;
    }

    String teaches() {
        return teaches;
    }

    /** The two lines every round's readout ends on: how to hand an answer over, and how to start over. */
    Map<String, Object> how() {
        Map<String, Object> out = new LinkedHashMap<>();
        out.put("submit", this == RECEIPT ? "GET /api/desk/receipt" : "POST /api/desk/answer {\"answer\": \"…\"}");
        out.put("note", submit);
        out.put("startOver", "POST /api/desk/retry");
        return out;
    }

    /** One line per round, for the readout the desk opens on. */
    static List<String> names() {
        List<String> out = new ArrayList<>();
        for (Round round : values()) {
            out.add("%d %s (%s)".formatted(round.ordinal() + 1, round.id, round.teaches));
        }
        return out;
    }
}
