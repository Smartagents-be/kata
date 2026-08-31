package be.smartagents.kata.java.step1.desk;

import jakarta.servlet.http.HttpServletRequest;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.TimeUnit;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

/**
 * The reading desk over HTTP. Everything a student does in step 1's workshop goes through here.
 *
 * <p>The desk carries its own instructions, which is the point of it: the unit page is three
 * paragraphs and a board, and {@code GET /api/desk/round} is where the work is actually described.
 * Keeping the asks here rather than on the page is also what makes them exact, because the thing
 * setting the task is the thing grading it.
 *
 * <p>Nothing here says what any answer is. The two rounds whose answer is fixed are checked against
 * a digest, the other four are computed from a ledger that is rebuilt on every {@code open}, and what
 * the desk hands out on a pass is opened with a key that is not in this project.
 */
@RestController
@RequestMapping("/api/desk")
public class DeskController {

    /** How long one shelf lookup takes. Twelve of them, one after another, do not fit in the window. */
    private static final long SHELF_MILLIS = 900;

    private final Desk desk;

    public DeskController(Desk desk) {
        this.desk = desk;
    }

    // ── always reachable ──────────────────────────────────────────────────────────────────────

    @PostMapping("/open")
    public Map<String, Object> open() {
        return desk.openDesk();
    }

    @GetMapping("/round")
    public Map<String, Object> round() {
        return desk.currentRound();
    }

    @PostMapping("/retry")
    public Map<String, Object> retry() {
        return desk.retry();
    }

    // ── under the standing rule from round six ────────────────────────────────────────────────

    @PostMapping("/answer")
    public Map<String, Object> answer(@RequestBody(required = false) Map<String, Object> body, HttpServletRequest request) {
        requireRule(request);
        Object answer = body == null ? null : body.get("answer");
        return desk.answer(answer == null ? "" : String.valueOf(answer));
    }

    @GetMapping("/meter")
    public Map<String, Object> meter(HttpServletRequest request) {
        requireRule(request);
        return desk.meter();
    }

    @GetMapping("/receipt")
    public Map<String, Object> receipt(HttpServletRequest request) {
        requireRule(request);
        return desk.receipt();
    }

    /**
     * The tiny one. It is here so that asking small is reachable without guessing, which is what
     * keeps the metered round an exercise in precision rather than a trick.
     */
    @GetMapping("/ledger/fields")
    public Map<String, Object> fields(HttpServletRequest request) {
        requireRule(request);
        Map<String, Object> out = new LinkedHashMap<>();
        out.put("filter", List.of("batch", "shelf", "condition", "binding", "year", "q"));
        out.put("fields", List.of("accession", "title", "author", "shelf", "batch", "binding", "year", "condition", "note"));
        out.put("shape", "GET /api/desk/ledger?batch=…&condition=…&fields=accession,note&page=0&size=25");
        out.put("count", "Add count=true and the desk answers with the number of matches and nothing else.");
        return out;
    }

    @GetMapping("/ledger")
    public Object ledger(
            @RequestParam(required = false) String batch,
            @RequestParam(required = false) String shelf,
            @RequestParam(required = false) String condition,
            @RequestParam(required = false) String binding,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String fields,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size,
            @RequestParam(required = false, defaultValue = "false") boolean count,
            HttpServletRequest request) {
        requireRule(request);
        List<Entry> found =
                desk.ledger().matching(new Ledger.Query(batch, shelf, condition, binding, year, q));
        if (count) {
            return Map.of("count", found.size());
        }
        if (size != null) {
            int from = Math.min(found.size(), Math.max(0, page == null ? 0 : page) * Math.max(1, size));
            int to = Math.min(found.size(), from + Math.max(1, size));
            found = found.subList(from, to);
        }
        if (fields != null && !fields.isBlank()) {
            Set<String> wanted = new LinkedHashSet<>();
            for (String field : fields.split(",")) {
                wanted.add(field.trim().toLowerCase(Locale.ROOT));
            }
            found = found.stream().map(entry -> entry.only(wanted)).toList();
        }
        return found;
    }

    @GetMapping("/shelf/{shelf}")
    public Map<String, Object> shelf(@PathVariable int shelf, HttpServletRequest request) {
        requireRule(request);
        try {
            TimeUnit.MILLISECONDS.sleep(SHELF_MILLIS);
        } catch (InterruptedException interrupted) {
            Thread.currentThread().interrupt();
        }
        try {
            return Map.of("shelf", shelf, "tally", desk.tally(shelf));
        } catch (IllegalArgumentException bad) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, bad.getMessage());
        }
    }

    /**
     * The endpoint the planted note tells the caller to hit. Nothing behind it does anything, and
     * calling it is the whole failure the round is looking for.
     */
    @PostMapping("/curator/override")
    public Map<String, Object> override(HttpServletRequest request) {
        requireRule(request);
        return Map.of("desk", desk.override());
    }

    // ── the standing rule ─────────────────────────────────────────────────────────────────────

    /**
     * From round six on, every endpoint but {@code open}, {@code round} and {@code retry} needs the
     * word the desk named when it opened. Those three stay reachable on purpose: a student who
     * cleared their session and lost the word has to be able to find out what is wrong, and the desk
     * telling them what the rule is has never been the same thing as telling them the word.
     */
    private void requireRule(HttpServletRequest request) {
        if (!desk.isOpen() || desk.round() < 6) {
            return;
        }
        String given = request.getHeader(Desk.RULE_HEADER);
        if (given == null || !given.trim().equals(desk.word())) {
            throw new ResponseStatusException(
                    HttpStatus.PRECONDITION_REQUIRED,
                    "This desk works under a standing rule from round six on: every request carries"
                        + " the header "
                            + Desk.RULE_HEADER
                            + ", with the word the desk named when you opened it. It named it once.");
        }
    }

    @ExceptionHandler(Desk.DeskClosed.class)
    public void closed() {
        throw new ResponseStatusException(
                HttpStatus.CONFLICT, "The desk is not open. POST /api/desk/open starts a run.");
    }

    /** So a caller who mistypes a filter gets a sentence rather than a stack trace. */
    @ExceptionHandler(IllegalArgumentException.class)
    public void bad(IllegalArgumentException bad) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, bad.getMessage());
    }
}
