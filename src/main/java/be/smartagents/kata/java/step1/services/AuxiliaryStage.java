package be.smartagents.kata.java.step1.services;

/**
 * Housekeeping work the catalogue does not depend on. {@link Catalog} draws a handful of these per
 * request and folds them into the walk, so which ones run varies from call to call. What they leave
 * behind is a working note, which {@link CatalogRun} does not print.
 */
@FunctionalInterface
public interface AuxiliaryStage {

    void apply(CatalogRun run);
}
