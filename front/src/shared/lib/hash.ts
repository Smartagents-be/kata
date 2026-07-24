/**
 * SHA-256 of a string, as lowercase hex, over the Web Crypto API the browser already ships. Used to
 * check a pasted flag against a stored digest without keeping the flag itself in the bundle. This is
 * obfuscation, not security: a determined reader can still find a flag in the source, the same way
 * step 1's hidden string is findable in principle. It only stops the answer sitting in plain sight.
 */
export async function sha256Hex(input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('')
}
