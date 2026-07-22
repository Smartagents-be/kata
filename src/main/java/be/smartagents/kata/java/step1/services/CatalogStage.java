package be.smartagents.kata.java.step1.services;

/**
 * One step of the catalog build. Every implementation runs on every request, in {@code @Order},
 * and may add to the run or leave it alone.
 */
@FunctionalInterface
public interface CatalogStage {

    void apply(CatalogRun run);
}
