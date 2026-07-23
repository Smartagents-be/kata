package be.smartagents.kata.java.step1.services;

/**
 * Restores a string that is kept in shifted form. The shift walks with the position, so the stored
 * text carries no resemblance to what comes out of it.
 */
public final class Scramble {

    private static final int FIRST = ' ';
    private static final int RANGE = 95;

    private Scramble() {}

    public static String unveil(String source, int shift) {
        char[] chars = source.toCharArray();
        for (int i = 0; i < chars.length; i++) {
            chars[i] = (char) (FIRST + Math.floorMod(chars[i] - FIRST - shift - (i % 3), RANGE));
        }
        String result = new String(chars);
        Tracer.restored(source, shift, result);
        return result;
    }
}
