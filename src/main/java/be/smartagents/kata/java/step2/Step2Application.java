package be.smartagents.kata.java.step2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Step 2's entry point. Like {@link be.smartagents.kata.java.step1.Step1Application} it leans on the
 * default component scan of its own package, so running it boots step 2 and only step 2: the loans
 * domain, its endpoint, and the native-image flag runner. Nothing from step 1 is loaded.
 *
 * <p>Because there are now two {@code @SpringBootApplication} classes in the tree, the Boot plugin
 * can no longer guess which one to run or package. Its {@code mainClass} is pinned to step 1 in the
 * {@code pom.xml}, so plain {@code mvn spring-boot:run} still starts step 1. Run step 2 with
 * {@code mvn spring-boot:run -Dspring-boot.run.main-class=be.smartagents.kata.java.step2.Step2Application}.
 */
@SpringBootApplication
public class Step2Application {

    public static void main(String[] args) {
        SpringApplication.run(Step2Application.class, args);
    }
}
