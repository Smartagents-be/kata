package be.smartagents.kata.java.step1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Entry point for step 1. Each step owns its own application, so component scanning starts here
 * and reaches only this step's beans.
 */
@SpringBootApplication
public class Step1Application {

    public static void main(String[] args) {
        SpringApplication.run(Step1Application.class, args);
    }
}
