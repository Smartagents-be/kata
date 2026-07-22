package be.smartagents.kata.java.step1;

import java.util.Arrays;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * The layers an agent's context is assembled from. The {@link #label()} is what a student types
 * as an answer, so it doubles as the vocabulary the step teaches.
 */
public enum ContextLayer {

    PROMPT("prompt", "the message you just typed"),
    SESSION("session", "everything earlier in this conversation, tool results included"),
    PROJECT("project", "what the agent reads from the repository"),
    HARNESS("harness", "system prompt, tool definitions and skills, injected before you type"),
    MEMORY("memory", "notes that survive a /clear and come back next session"),
    EXTERNAL("external", "material pulled in from outside: MCP servers, the web, pasted docs");

    private final String label;
    private final String description;

    ContextLayer(String label, String description) {
        this.label = label;
        this.description = description;
    }

    public String label() {
        return label;
    }

    public String description() {
        return description;
    }

    /**
     * Reads a student-supplied label. Unknown words come back empty rather than throwing, so the
     * checker can tell "wrong layer" apart from "not a layer at all".
     */
    public static Optional<ContextLayer> parse(String label) {
        if (label == null) {
            return Optional.empty();
        }
        String normalised = label.trim().toLowerCase();
        return Arrays.stream(values()).filter(layer -> layer.label.equals(normalised)).findFirst();
    }

    /** The accepted labels, in declaration order, for error messages. */
    public static String labels() {
        return Arrays.stream(values()).map(ContextLayer::label).collect(Collectors.joining(", "));
    }
}
