package be.smartagents.kata.java.step2.aot;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.NativeDetector;
import org.springframework.stereotype.Component;

/**
 * The fifth workshop flag, and the only one a JVM will never print. It runs on every startup but says
 * nothing unless {@link NativeDetector#inNativeImage()} is true, which it is only inside a compiled
 * GraalVM native image.
 *
 * <p>Wiring that build is the first half of the exercise, so the {@code native} Maven profile is not in
 * the {@code pom.xml}. The second half is the catch that stops a one-shot: the flag's payload lives in a
 * classpath resource ({@code flags/native-image.veil}), and a native image keeps only the resources it
 * is told to keep. A plain "add the plugin and compile" builds an image that starts but cannot find
 * that resource, so it prints a miss, not the flag. Reaching the flag needs a resource hint the student
 * plans and writes, a {@code RuntimeHintsRegistrar} wired with {@code @ImportRuntimeHints}; that fix is
 * deliberately not shipped. The payload is stored shifted, the same trick {@code StatementCode} uses,
 * so it is not a string a search through the repository turns up.
 */
@Component
class NativeImageFlag implements ApplicationRunner {

    private static final String RESOURCE = "/flags/native-image.veil";
    private static final int SHIFT = 9;

    private static final int FIRST = ' ';
    private static final int RANGE = 95;

    @Override
    public void run(ApplicationArguments args) {
        if (!NativeDetector.inNativeImage()) {
            return;
        }
        System.out.println();
        System.out.println("  step 2 workshop: native image");
        System.out.println("  -----------------------------");
        String stored = readPayload();
        if (stored == null) {
            System.out.println("  [ ] the image runs, but its flag resource is not inside it.");
            System.out.println("      a native image keeps only the resources it is told to keep.");
            System.out.println("      " + RESOURCE + " was dropped; plan the hint that keeps it.");
        } else {
            System.out.printf("  [x] %-24s %s%n", "native image booted", reveal(stored));
        }
        System.out.println();
    }

    private String readPayload() {
        try (InputStream in = getClass().getResourceAsStream(RESOURCE)) {
            if (in == null) {
                return null;
            }
            try (BufferedReader reader =
                    new BufferedReader(new InputStreamReader(in, StandardCharsets.UTF_8))) {
                return reader.readLine();
            }
        } catch (IOException e) {
            return null;
        }
    }

    private static String reveal(String stored) {
        char[] chars = stored.toCharArray();
        for (int i = 0; i < chars.length; i++) {
            chars[i] = (char) (FIRST + Math.floorMod(chars[i] - FIRST - SHIFT - (i % 3), RANGE));
        }
        return new String(chars);
    }
}
