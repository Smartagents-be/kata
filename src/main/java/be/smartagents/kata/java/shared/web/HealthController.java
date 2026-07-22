package be.smartagents.kata.java.shared.web;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** Backs the connection indicator in the frontend. */
@RestController
@RequestMapping("/api")
public class HealthController {

    private final String version;

    public HealthController(@Value("${kata.version:dev}") String version) {
        this.version = version;
    }

    @GetMapping("/health")
    public Health health() {
        return new Health("ok", version);
    }

    public record Health(String status, String version) {}
}
