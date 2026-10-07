package be.smartagents.kata.java.step1;

import be.smartagents.kata.java.step1.services.Catalog;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** The one endpoint of step 1: whatever the catalog build published, in the order it arrived. */
@RestController
@RequestMapping("/api")
public class TitleController {

    private final Catalog catalog;

    public TitleController(Catalog catalog) {
        this.catalog = catalog;
    }

    @GetMapping("/titles")
    public List<String> titles() {
        return catalog.titles();
    }
}
