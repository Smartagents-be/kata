package be.smartagents.kata.java.step0.grading;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.fail;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import org.junit.jupiter.api.Test;

/**
 * The readiness check behind {@code mvn verify -Pready}. It prints one line per thing the rest of
 * the course assumes about the machine it runs on, and the flag on the last line when the ones that
 * matter pass. When one does not, the build fails naming that check and what to do about it, and no
 * flag is printed.
 *
 * <p>Two checks gate the flag: the JDK the build compiles with, and whether the other step projects
 * are on disk. The third is a warning and never a gate. Step 2's last flag wants a GraalVM JDK, and
 * a student on a stock Temurin has a working course in front of them, so the row says what they will
 * need later rather than stopping them on day one.
 *
 * <p>The flag is not plaintext here. It is unveiled at runtime, so the run is what hands it over.
 */
class ReadyRevealIT {

    /** The flag in shifted form. {@code Veil.unveil(STORED, SHIFT)} is the real thing. */
    private static final String STORED = "3+LK|3D-ID!/&-7";
    private static final int SHIFT = 23;

    /** Relative to this project's own directory, which is where Maven runs a test from. */
    private static final Path STEP1_POM = Path.of("..", "..", "step1", "java", "pom.xml");
    private static final Path STEP2_POM = Path.of("..", "..", "step2", "java", "pom.xml");

    @Test
    void printsTheReadinessRows() {
        int feature = Runtime.version().feature();
        boolean jdk = feature >= 25;
        boolean repository = Files.exists(STEP1_POM) && Files.exists(STEP2_POM);
        boolean nativeImage = nativeImageIsAround();

        System.out.println();
        System.out.println("  step 0 ready: what the rest of the course assumes");
        System.out.println("  ------------------------------------------------");
        row(jdk, "jdk 25 or newer", "java " + feature);
        row(repository, "repository complete", repository ? "step1 and step2 found" : "step1 or step2 missing");
        row(nativeImage, "native-image available", nativeImage ? "found" : "step 2's last flag wants a GraalVM JDK");

        if (!jdk) {
            fail("""

                    jdk 25 or newer failed. Maven compiled this with java %d.
                    Install a JDK 25 or newer and point JAVA_HOME at it, then run this again.
                    """
                    .formatted(feature));
        }
        if (!repository) {
            fail("""

                    repository complete failed. kata/step1/java or kata/step2/java is not on disk.
                    Clone the whole repository rather than downloading one folder, then run this again.
                    """);
        }

        String flag = Veil.unveil(STORED, SHIFT);
        row(true, "ready to hunt", flag);
        System.out.println();

        assertThat(flag).startsWith("{").endsWith("}");
    }

    /** One row of the readout, in the shape the intro's reveal already prints. */
    private static void row(boolean passed, String name, String value) {
        System.out.printf("  [%s] %-24s %s%n", passed ? "x" : " ", name, value);
    }

    /**
     * Whether a {@code native-image} binary sits beside this JDK or anywhere on the path. It is a
     * lookup rather than a run: this row reports, and a subprocess that hangs would turn a warning
     * into a wait.
     */
    private static boolean nativeImageIsAround() {
        if (holdsNativeImage(Path.of(System.getProperty("java.home"), "bin"))) {
            return true;
        }
        String path = System.getenv("PATH");
        if (path == null) {
            return false;
        }
        for (String entry : path.split(File.pathSeparator)) {
            if (entry.isBlank()) {
                continue;
            }
            try {
                if (holdsNativeImage(Path.of(entry))) {
                    return true;
                }
            } catch (RuntimeException ignored) {
                // A path entry this platform cannot parse is one that holds nothing.
            }
        }
        return false;
    }

    private static boolean holdsNativeImage(Path directory) {
        return Files.isExecutable(directory.resolve("native-image"))
                || Files.isExecutable(directory.resolve("native-image.cmd"));
    }
}
