package be.smartagents.kata.java.step1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Step 1's entry point. It relies on the default component scan of its own package, so running it
 * boots step 1 and only step 1: the catalogue and its stages, and nothing from a later step. Step 2
 * has its own {@link be.smartagents.kata.java.step2.Step2Application} that boots its slice the same
 * way. The two apps stay independent; neither reaches across into the other's package.
 */
@SpringBootApplication
public class Step1Application {

    public static void main(String[] args) {
        SpringApplication.run(Step1Application.class, args);
    }
}
