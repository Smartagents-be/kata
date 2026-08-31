package be.smartagents.kata.java.step1.desk;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.HexFormat;

/**
 * What the desk hands out when a round is passed, and how it knows an answer was right.
 *
 * <p>Nothing in here is stored as text. The five strings below are ciphertext, and the key is not in
 * this project at all: it is derived from the answer to the first round, which lives in a file on
 * the student's own machine and nowhere in this repository. So the desk cannot hand out anything
 * until that first answer has been given to it, and reading this file end to end yields nothing.
 *
 * <p>Two salts, and they are deliberately different strings. One derives the key that opens the
 * ciphertext, the other derives the digests the desk checks answers against. Made the same, the
 * stored digest would <em>be</em> the key.
 */
final class Vault {

    private static final String KEY_SALT = "kata-step1-desk-key-v1";
    private static final String CHECK_SALT = "kata-step1-desk-check-v1";

    /** Each entry starts on its own lane of the keystream, so no two share a byte of it. */
    private static final int LANE = 64;

    /**
     * The five the desk hands out, in round order: the metered round, the poisoned note, the twelve
     * shelves, the standing rule, the receipt. The two rounds missing from this list are the two
     * whose answer <em>is</em> the flag, so there is nothing for the desk to hand back.
     */
    private static final String[] CIPHER = {
        "RiUW15Zjs3/gQFeOEU0=",
        "NViagVsQAcA+MEEEEkMsHlpb1v0S",
        "XknltLA4YFqC2XrULuG4kWtxTRg=",
        "2COUTB3KOVD+Ti5HprwhaGZX5f8=",
        "slvPzWt/euywJcLzRnVdgu2C",
    };

    private Vault() {}

    /** {@code sha256(CHECK_SALT + value)}, lowercase hex, for comparing an answer without holding it. */
    static String check(String value) {
        return HexFormat.of().formatHex(sha256((CHECK_SALT + value).getBytes(StandardCharsets.UTF_8)));
    }

    /**
     * The five strings, opened with a key derived from {@code opener}. A wrong opener returns five
     * strings of the right length and no meaning, which is why the caller checks the opener against
     * a digest before it ever gets here.
     */
    static String[] open(String opener) {
        byte[] key = sha256((KEY_SALT + opener).getBytes(StandardCharsets.UTF_8));
        String[] out = new String[CIPHER.length];
        for (int i = 0; i < CIPHER.length; i++) {
            byte[] bytes = Base64.getDecoder().decode(CIPHER[i]);
            byte[] stream = keystream(key, i * LANE, bytes.length);
            for (int b = 0; b < bytes.length; b++) {
                bytes[b] ^= stream[b];
            }
            out[i] = new String(bytes, StandardCharsets.UTF_8);
        }
        return out;
    }

    /** {@code length} bytes of {@code sha256(key || counter)} taken from {@code offset}. */
    private static byte[] keystream(byte[] key, int offset, int length) {
        byte[] out = new byte[length];
        for (int written = 0; written < length; ) {
            int position = offset + written;
            int block = position / 32;
            byte[] digest =
                    sha256(
                            concat(
                                    key,
                                    new byte[] {
                                        (byte) (block >>> 24),
                                        (byte) (block >>> 16),
                                        (byte) (block >>> 8),
                                        (byte) block
                                    }));
            int from = position % 32;
            int take = Math.min(32 - from, length - written);
            System.arraycopy(digest, from, out, written, take);
            written += take;
        }
        return out;
    }

    private static byte[] concat(byte[] left, byte[] right) {
        byte[] out = new byte[left.length + right.length];
        System.arraycopy(left, 0, out, 0, left.length);
        System.arraycopy(right, 0, out, left.length, right.length);
        return out;
    }

    private static byte[] sha256(byte[] input) {
        try {
            return MessageDigest.getInstance("SHA-256").digest(input);
        } catch (NoSuchAlgorithmException impossible) {
            throw new IllegalStateException(impossible);
        }
    }
}
