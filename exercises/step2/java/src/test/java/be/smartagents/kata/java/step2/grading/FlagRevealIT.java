package be.smartagents.kata.java.step2.grading;

import static org.assertj.core.api.Assertions.assertThat;

import java.io.File;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import org.junit.jupiter.api.Test;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

/**
 * The graded gate and the reward in one place. It runs only under {@code mvn verify -Pgraded} (it is
 * an {@code *IT}, wired to failsafe inside that profile), reads the reports the profile just
 * produced, and for every goal already met it prints the flag that goal earns. Then it asserts all
 * three, so the build stays red until the student has met every one.
 *
 * <p>The three goals are exactly what step 2 argues you should hand an agent: a coverage floor, a
 * complexity ceiling, and a check that the coverage is honest rather than gamed. Each is a number a
 * build can answer yes or no to, which is the whole reason a flag can hang off it.
 */
class FlagRevealIT {

    /** Line coverage the module must reach, as a percentage. */
    private static final double COVERAGE_FLOOR = 90.0;

    /** No method may score above this on cyclomatic complexity. */
    private static final int COMPLEXITY_CEILING = 10;

    /** Mutation coverage the domain must reach, as a percentage: the "is it honest" gate. */
    private static final double MUTATION_FLOOR = 80.0;

    /** Only the step 2 module counts; JaCoCo writes package names with slashes. */
    private static final String MODULE = "be/smartagents/kata/java/step2";

    private static final Path TARGET = Path.of(System.getProperty("user.dir"), "target");

    @Test
    void revealsAFlagForEveryGoalMetAndFailsUntilAllThreeAre() throws Exception {
        Jacoco jacoco = Jacoco.read(TARGET.resolve("site/jacoco/jacoco.xml").toFile());
        Double mutation = readMutationScore(TARGET.resolve("pit-reports/mutations.xml").toFile());

        List<String> earned = new ArrayList<>();
        System.out.println();
        System.out.println("  step 2 workshop: goals and flags");
        System.out.println("  --------------------------------");

        boolean coverageMet = jacoco.lineCoverage() >= COVERAGE_FLOOR;
        report("coverage floor", "%.1f%% >= %.1f%%".formatted(jacoco.lineCoverage(), COVERAGE_FLOOR),
            coverageMet, Flag.COVERAGE_FLOOR, earned);

        boolean complexityMet = jacoco.worstComplexity() <= COMPLEXITY_CEILING;
        report("complexity ceiling",
            "worst method %d <= %d".formatted(jacoco.worstComplexity(), COMPLEXITY_CEILING),
            complexityMet, Flag.COMPLEXITY_CEILING, earned);

        boolean mutationMet = mutation != null && mutation >= MUTATION_FLOOR;
        String mutationDetail = mutation == null
            ? "no PIT report yet (run under -Pgraded)"
            : "%.1f%% >= %.1f%%".formatted(mutation, MUTATION_FLOOR);
        report("honest coverage", mutationDetail, mutationMet, Flag.HONEST_COVERAGE, earned);

        System.out.println();

        assertThat(coverageMet)
            .as("line coverage of the module is at least %.1f%%", COVERAGE_FLOOR)
            .isTrue();
        assertThat(complexityMet)
            .as("no method scores above %d on cyclomatic complexity", COMPLEXITY_CEILING)
            .isTrue();
        assertThat(mutationMet)
            .as("mutation coverage of the domain is at least %.1f%%", MUTATION_FLOOR)
            .isTrue();
    }

    private static void report(String gate, String detail, boolean met, Flag flag, List<String> earned) {
        if (met) {
            earned.add(flag.reveal());
            System.out.printf("  [x] %-20s %-32s %s%n", gate, detail, flag.reveal());
        } else {
            System.out.printf("  [ ] %-20s %-32s (locked)%n", gate, detail);
        }
    }

    /** The bits of a JaCoCo XML report the gates care about. */
    private record Jacoco(double lineCoverage, int worstComplexity) {

        static Jacoco read(File report) throws Exception {
            if (!report.isFile()) {
                return new Jacoco(0.0, Integer.MAX_VALUE);
            }
            Document doc = parse(report);
            long missed = 0;
            long covered = 0;
            int worst = 0;
            NodeList methods = doc.getElementsByTagName("method");
            for (int i = 0; i < methods.getLength(); i++) {
                Element method = (Element) methods.item(i);
                if (!inModule(method)) {
                    continue;
                }
                int complexity = counterTotal(method, "COMPLEXITY");
                worst = Math.max(worst, complexity);
            }
            NodeList packages = doc.getElementsByTagName("package");
            for (int i = 0; i < packages.getLength(); i++) {
                Element pkg = (Element) packages.item(i);
                if (!pkg.getAttribute("name").startsWith(MODULE)) {
                    continue;
                }
                Element line = directCounter(pkg, "LINE");
                if (line != null) {
                    missed += Integer.parseInt(line.getAttribute("missed"));
                    covered += Integer.parseInt(line.getAttribute("covered"));
                }
            }
            double total = missed + covered;
            double coverage = total == 0 ? 0.0 : (covered / total) * 100.0;
            return new Jacoco(coverage, worst == 0 ? Integer.MAX_VALUE : worst);
        }

        private static boolean inModule(Element method) {
            for (Node n = method.getParentNode(); n != null; n = n.getParentNode()) {
                if (n instanceof Element e && "package".equals(e.getTagName())) {
                    return e.getAttribute("name").startsWith(MODULE);
                }
            }
            return false;
        }

        private static int counterTotal(Element parent, String type) {
            NodeList counters = parent.getElementsByTagName("counter");
            for (int i = 0; i < counters.getLength(); i++) {
                Element counter = (Element) counters.item(i);
                if (type.equals(counter.getAttribute("type"))) {
                    return Integer.parseInt(counter.getAttribute("missed"))
                        + Integer.parseInt(counter.getAttribute("covered"));
                }
            }
            return 0;
        }

        private static Element directCounter(Element pkg, String type) {
            NodeList children = pkg.getChildNodes();
            for (int i = 0; i < children.getLength(); i++) {
                if (children.item(i) instanceof Element e
                    && "counter".equals(e.getTagName())
                    && type.equals(e.getAttribute("type"))) {
                    return e;
                }
            }
            return null;
        }
    }

    /** Mutation coverage from PIT's XML, or null when the report is not there yet. */
    private static Double readMutationScore(File report) throws Exception {
        if (!report.isFile()) {
            return null;
        }
        Document doc = parse(report);
        NodeList mutations = doc.getElementsByTagName("mutation");
        int total = mutations.getLength();
        if (total == 0) {
            return null;
        }
        int killed = 0;
        for (int i = 0; i < total; i++) {
            Element mutation = (Element) mutations.item(i);
            if ("true".equals(mutation.getAttribute("detected"))
                && "KILLED".equals(mutation.getAttribute("status"))) {
                killed++;
            }
        }
        return (killed / (double) total) * 100.0;
    }

    private static Document parse(File file) throws Exception {
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        // JaCoCo and PIT reports name a DTD the parser must not try to fetch offline.
        factory.setFeature("http://apache.org/xml/features/nonvalidating/load-external-dtd", false);
        factory.setFeature("http://xml.org/sax/features/validation", false);
        DocumentBuilder builder = factory.newDocumentBuilder();
        return builder.parse(file);
    }
}
