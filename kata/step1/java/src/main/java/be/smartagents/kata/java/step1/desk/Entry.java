package be.smartagents.kata.java.step1.desk;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * One catalogue entry as the reading desk hands it out.
 *
 * <p>A null field is left out of the JSON rather than serialised as {@code null}: most entries carry
 * no note, and six hundred {@code "note":null} pairs would be bytes the caller pays for and cannot
 * use.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public record Entry(
        String accession,
        String title,
        String author,
        String shelf,
        String batch,
        String binding,
        Integer year,
        String condition,
        String note) {

    /** The same entry with only the named fields kept, for a caller who asked for a subset. */
    Entry only(java.util.Set<String> fields) {
        return new Entry(
                fields.contains("accession") ? accession : null,
                fields.contains("title") ? title : null,
                fields.contains("author") ? author : null,
                fields.contains("shelf") ? shelf : null,
                fields.contains("batch") ? batch : null,
                fields.contains("binding") ? binding : null,
                fields.contains("year") ? year : null,
                fields.contains("condition") ? condition : null,
                fields.contains("note") ? note : null);
    }
}
