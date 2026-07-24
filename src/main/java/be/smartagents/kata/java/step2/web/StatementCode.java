package be.smartagents.kata.java.step2.web;

/**
 * The code the statement endpoint hands back once it works. Kept in shifted form so it is not a
 * string a search through this repository turns up, the same trick step 1 uses for its hidden title
 * and the graded profile uses for its flags.
 *
 * <p>Reaching this code is not the exercise. Making {@code MemberStatements.forTier} correct is; the
 * endpoint only pays out afterwards.
 */
final class StatementCode {

    private static final String STORED = ")z?A|<!#C\"A|@|$+";
    private static final int SHIFT = 13;

    private static final int FIRST = ' ';
    private static final int RANGE = 95;

    private StatementCode() {}

    static String reveal() {
        char[] chars = STORED.toCharArray();
        for (int i = 0; i < chars.length; i++) {
            chars[i] = (char) (FIRST + Math.floorMod(chars[i] - FIRST - SHIFT - (i % 3), RANGE));
        }
        return new String(chars);
    }
}
