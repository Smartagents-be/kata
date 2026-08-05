package be.smartagents.kata.java.step2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Step 2's entry point. Like step 1's own application class it leans on the default component scan
 * of its own package, so running it boots step 2 and only step 2: the loans domain, its endpoint,
 * and the native-image flag runner. Nothing from another step is on the classpath to load.
 *
 * <p>This project holds one {@code @SpringBootApplication}, so the Boot plugin finds it without
 * help. Plain {@code mvn spring-boot:run} from {@code kata/step2/java} starts step 2, and the
 * {@code pom.xml} needs no {@code mainClass} pin.
 */
@SpringBootApplication
public class Step2Application {

    public static void main(String[] args) {
        SpringApplication.run(Step2Application.class, args);
    }
}
