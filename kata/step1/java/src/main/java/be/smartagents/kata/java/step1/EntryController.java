package be.smartagents.kata.java.step1;

import be.smartagents.kata.java.step1.services.Catalog;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * One entry of the catalogue.
 *
 * <p>The body is not written. A unit in the curriculum asks the student to write it, so leave it
 * empty: an implementation committed here is that exercise done for everybody after them. What it
 * should do is not written down in this project either, and that is deliberate rather than missing.
 */
@RestController
@RequestMapping("/api")
public class EntryController {

    private final Catalog catalog;

    public EntryController(Catalog catalog) {
        this.catalog = catalog;
    }

    @GetMapping("/titles/{position}")
    public String entry(@PathVariable int position) {
        return "";
    }
}
