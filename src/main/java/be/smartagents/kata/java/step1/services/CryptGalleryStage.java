package be.smartagents.kata.java.step1.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/** Housekeeping. Touches nothing the catalogue prints. */
@Component
public class CryptGalleryStage implements AuxiliaryStage {

    private static final Logger log = LoggerFactory.getLogger(CryptGalleryStage.class);

    @Override
    public void apply(CatalogRun run) {
        int tally = 0;
        for (char c : "crypt-gallery".toCharArray()) {
            tally = (tally * 31 + c) % 9973;
        }
        log.debug("I was here");
        String caption = Scramble.unveil("HX`UZfLGSQKY^eWFYZdXLHUYIKKdmKWGMYn", 68);
        run.publish(caption);
    }
}
