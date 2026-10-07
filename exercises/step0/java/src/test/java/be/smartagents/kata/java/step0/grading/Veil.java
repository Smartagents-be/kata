package be.smartagents.kata.java.step0.grading;

/**
 * Restores a string kept in shifted form, so no flag sits in this source as plaintext a search
 * would reach. Step 1 has its own {@code Scramble} and step 2 its own {@code Veil}; this is step 0's
 * copy, on purpose, because a step owns its own grading code rather than reaching across into
 * another step's.
 *
 * <p>The shift walks with the position, so the stored text carries no resemblance to what comes out.
 */
final class Veil {

    private static final int FIRST = ' ';
    private static final int RANGE = 95;

    private Veil() {}

    static String unveil(String stored, int shift) {
        char[] chars = stored.toCharArray();
        for (int i = 0; i < chars.length; i++) {
            chars[i] = (char) (FIRST + Math.floorMod(chars[i] - FIRST - shift - (i % 3), RANGE));
        }
        return new String(chars);
    }
}
