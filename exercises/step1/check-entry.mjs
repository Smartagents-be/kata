#!/usr/bin/env node
/**
 * Scores `The same ask, twice`, the task at the foot of step 1's `prompt` unit.
 *
 * The student is handed six wishes in a counter clerk's words and one vague line to type. They type
 * the line on the dearest model they have, let the agent build `EntryController`, restart the
 * service and run this. Then they throw the attempt away, start a fresh agent, type the same line in
 * plan mode on the cheapest model they have, correct the plan before approving it, and run this
 * again. The two scores are the exercise: the wishes were in their head both times, and only one of
 * the two runs got them into the model.
 *
 * **The wishes sit on five independent decisions, and that is what the design turns on.** An
 * ordinary agent writes a bounds check and an informative 404 without being asked, so wishes built
 * out of those score a one-shot near full marks and prove nothing. What is graded here is where the
 * counter's numbering starts, what the answer carries besides the title, how many there are, that
 * the shelf is counted from the far end too, and what happens to everything unservable. The first
 * two are coin flips, counting backwards is one nobody volunteers, and the last is the one an agent
 * can walk into by being tidy. That is deliberate: a board where every line fails on a first run
 * reads as rigged.
 *
 * **It is a black box on purpose.** It talks HTTP to a running service and knows nothing about the
 * project, so it cannot be satisfied by anything except the endpoint actually behaving, and it takes
 * no view on the shape of an answer beyond what the brief asks for. That is also why it lives out
 * here rather than in `exercises/step1/java`: an agent asked to write the endpoint works inside that
 * project, and a file in there setting out what to build would hand the student's own knowledge to
 * the model for free, which is the one thing this task measures.
 *
 * Nothing in it names a title, and nothing is hard-coded to nine. The shelf comes off `/api/titles`
 * at run time, the **pair of positions** wishes 2 and 3 are asked at is picked by `probePositions`
 * so neither is the first or the last and neither title can be mistaken for a number the check is
 * looking for, and everything is compared against that. So the checks hold if the catalogue is
 * rewritten, down to four titles, and the file carries no second copy of a list other things in
 * step 1 depend on.
 *
 *   node exercises/step1/check-entry.mjs                    against localhost:8080
 *   node exercises/step1/check-entry.mjs http://host:port    against somewhere else
 *
 * Exit code is 0 whatever the score, and 1 only when there is nothing to check: the service is down,
 * or the shelf is too short to probe. A score is a reading rather than a build result, and a non-zero
 * exit invites somebody to chase it green, which for the first of the two runs is exactly the wrong
 * thing to do.
 */

const BASE = (process.argv[2] ?? 'http://localhost:8080').replace(/\/+$/, '')

/** Set from the labels below, so a reworded wish cannot run into its own verdict. */
let labelWidth = 0

/** Thrown when the service stops answering mid-run, so one check fails instead of the process. */
class Unreachable extends Error {}

/** One request. A transport failure is a result rather than a crash. */
async function probe(path) {
    let response
    let text
    try {
        response = await fetch(`${BASE}${path}`, {
            headers: { Accept: '*/*' },
            signal: AbortSignal.timeout(5000),
        })
        text = await response.text()
    } catch {
        throw new Unreachable(path)
    }
    let body = text
    try {
        body = JSON.parse(text)
    } catch {
        // A plain string body is not JSON, and that is a fine way to answer.
    }
    return { status: response.status, text, body }
}

/**
 * A body as it is worth showing back to somebody: the text that actually arrived, on one line, and
 * long enough to read. It is deliberately **not** quoted or escaped, and deliberately not clipped to
 * a phrase: the failure a student is most likely to hit on a good run is a refusal whose message the
 * framework swallowed, and the only way to see that is to read the whole thing.
 */
function showBody(text) {
    const flat = String(text).replace(/\s+/g, ' ').trim()
    if (flat === '') return 'an empty body'
    return flat.length > 400 ? `${flat.slice(0, 397)}...` : flat
}

/**
 * The leaf values an answer is made of, nested objects included. The brief asks for a number, a
 * title and a count, and says nothing about the shape they arrive in, so every reading is accepted:
 * a title on its own, an object carrying them under any field names, an object with an error type
 * wrapped inside it, or a line with the lot written into it. Grading a shape nobody asked for would
 * be this check inventing a seventh wish.
 *
 * It stops at four levels down and hands back the container it stopped on, which `saysTitle` and
 * `saysNumber` then skip because it is neither a string nor a number. That is the intended
 * behaviour rather than a limit worth raising: nothing an endpoint can reasonably answer with buries
 * a title five objects deep, and an unbounded walk over a body this file did not write is a way to
 * hang on a cycle.
 */
function partsOf(body, depth = 0) {
    if (body === null || body === undefined) return []
    if (typeof body !== 'object' || depth > 4) return [body]
    const values = Array.isArray(body) ? body : Object.values(body)
    return values.flatMap((part) => partsOf(part, depth + 1))
}

function saysTitle(body, title) {
    return partsOf(body).some((part) => typeof part === 'string' && part.includes(title))
}

/**
 * Every number a piece of text actually states, with three kinds of digit that are not a statement
 * taken out first. All three are load bearing and each of them was a way for a body to be credited
 * with a number it never said.
 *
 * **A hyphen is not a minus sign**, because `1-9` is how everybody writes a range and a tokeniser
 * that read the 9 as negative failed the one implementation this exercise exists to reward.
 * **Timestamps go**, since a framework's default error page carries one and an hour or a millisecond
 * in it is digits. And **paths and URLs go**, which is the one that matters most: a body carrying
 * `"self": "/api/titles/4"` and `"last": "/api/titles/9"` states neither the position nor the count,
 * it states where to go and ask, and an endpoint answering in navigation links was measured passing
 * two wishes on numbers that were only ever in its own hyperlinks.
 */
function numbersIn(text) {
    const runs = String(text)
        // A date, hyphenated or slashed. Three components, so a range written `1-9` is untouched.
        .replace(/\d{1,4}[/-]\d{1,2}[/-]\d{1,4}(?:[T ][\d:.+Z-]*)?/g, ' ')
        .replace(/https?:\/\/\S+/g, ' ')
        // A path: at least one named segment, optionally ending in a number. `/api/titles/9` goes,
        // `3/9` stays, because nothing in it follows a slash with a letter.
        .replace(/(?:\/[A-Za-z][\w.-]*)+(?:\/-?\d+)?/g, ' ')
        .match(/\d+/g)
    return (runs ?? []).map(Number)
}

/** Whether an answer states a given number anywhere it counts as having said it. */
function saysNumber(body, wanted) {
    return partsOf(body).some((part) => {
        if (typeof part === 'number') return part === wanted
        if (typeof part !== 'string') return false
        return numbersIn(part).includes(wanted)
    })
}

/** Answered, and answered with a refusal rather than by falling over. */
function isPlainNo(status) {
    return status >= 400 && status < 500
}

/**
 * A body that is really a stack trace is the thing the brief calls falling over, whatever status it
 * arrived with. Two things about it are the fix for two separate bugs. It tests for a **stack frame**
 * and nothing else, because a refusal that happens to name an exception type is still a refusal, and
 * a cut of this that matched the bare word `Exception` had two adjacent lines of the board
 * disagreeing about the same body. And it tests the **parsed values as well as the raw text**,
 * because a trace inside a JSON string arrives over the wire with its newlines escaped, so the
 * version that only read the raw text could never match anything this service emits: a run whose
 * every refusal was a raw `IndexOutOfBoundsException` dump scored six of six, with the length in
 * `out of bounds for length 9` read as the count the brief asked for.
 */
const STACK_FRAME = /(?:^|\n|\\n)\s*(?:\t|\\t)?\s*at [\w.$/@]+\(/

function looksLikeACrash(response) {
    if (STACK_FRAME.test(String(response.text))) return true
    return partsOf(response.body).some(
        (part) => typeof part === 'string' && STACK_FRAME.test(part),
    )
}

/**
 * The six, in the order the brief says them, one wish per sentence up there and one line per wish
 * down here. The label is the wish rather than the mechanism, because a failing line has to read as
 * something the student knew and did not pass on.
 *
 * Every check is handed the shelf as it comes off `/api/titles`, the two positions that are safe to
 * probe, and the three refusals the last two wishes read, so nothing is asked of the endpoint twice
 * for one line of output.
 */
const WISHES = [
    {
        label: 'the numbers line up with the Catalogue page',
        async run({ shelf }) {
            for (let index = 0; index < shelf.length; index += 1) {
                const position = index + 1
                const got = await probe(`/api/titles/${position}`)
                if (got.status !== 200) {
                    return { ok: false, detail: `/api/titles/${position} answered ${got.status}` }
                }
                if (!saysTitle(got.body, shelf[index])) {
                    // What came back is only worth naming beside what should have: an off-by-one is
                    // read out of the pair. On the shipped stub there is no pair to read, so the
                    // board does not open by printing a title nobody has earned yet.
                    const gave = showBody(got.text)
                    return {
                        ok: false,
                        detail:
                            gave === 'an empty body'
                                ? `/api/titles/${position} gave an empty body`
                                : `/api/titles/${position} gave ${gave}, the page has ${shelf[index]}`,
                    }
                }
            }
            return { ok: true, detail: `all ${shelf.length} of them` }
        },
    },
    {
        /**
         * Asked at **two** positions, each of which has to state its own number. One was enough until
         * an endpoint answering in navigation links passed on the `/api/titles/…` strings in its own
         * body, and what actually closed that is the path-stripping in `numbersIn`; asking twice is
         * kept because it costs one request and catches an answer that states a constant.
         *
         * **What it does not do is object to a body saying anything else**, and that restraint is a
         * bug fixed rather than a gap. A version of this also failed a body that mentioned the other
         * probed position, which was aimed at the same counterexample and hit the wrong target: an
         * endpoint honouring all six wishes and naming its neighbours (`"previous": 1, "next": 3`)
         * was told its answer "is not saying which one you asked for" when it plainly was. The
         * probed positions are adjacent on this catalogue, so it collided in both directions at
         * once, and it failed the one run the whole exercise exists to reward. Grading what an
         * answer carries beyond what was asked for is this check inventing a seventh wish.
         */
        label: 'the answer says the number back, not just the title',
        async run({ at }) {
            for (const position of at) {
                const got = await probe(`/api/titles/${position}`)
                if (got.status !== 200) {
                    return { ok: false, detail: `/api/titles/${position} answered ${got.status}` }
                }
                if (!saysNumber(got.body, position)) {
                    return { ok: false, detail: `/api/titles/${position} said ${showBody(got.text)}` }
                }
            }
            return { ok: true, detail: `${at[0]} and ${at[1]} each came back with their own number` }
        },
    },
    {
        // The brief's own example is "3 of 9" and this line does not repeat it, because the
        // position probed is picked rather than fixed and printing an example the check does not use
        // reads as the board contradicting itself.
        label: 'and how many there are, not only which one it is',
        async run({ shelf, at }) {
            const [position] = at
            const got = await probe(`/api/titles/${position}`)
            if (got.status !== 200) {
                return { ok: false, detail: `/api/titles/${position} answered ${got.status}` }
            }
            return saysNumber(got.body, shelf.length)
                ? { ok: true, detail: `/api/titles/${position} carries ${shelf.length}` }
                : { ok: false, detail: `/api/titles/${position} said ${showBody(got.text)}` }
        },
    },
    {
        label: 'minus 1 is the last one on the shelf',
        async run({ shelf }) {
            const ends = [
                { path: '/api/titles/-1', want: shelf[shelf.length - 1] },
                { path: `/api/titles/-${shelf.length}`, want: shelf[0] },
            ]
            for (const { path, want } of ends) {
                const got = await probe(path)
                if (got.status !== 200) return { ok: false, detail: `${path} answered ${got.status}` }
                if (!saysTitle(got.body, want)) {
                    return { ok: false, detail: `${path} gave ${showBody(got.text)}` }
                }
            }
            return { ok: true, detail: 'both ends counted backwards' }
        },
    },
    {
        label: 'nothing we cannot serve falls over, and it says how many',
        async run({ shelf, refusals }) {
            for (const { path, got, error } of refusals) {
                if (error) throw error
                if (!isPlainNo(got.status)) {
                    return { ok: false, detail: `${path} answered ${got.status}` }
                }
                if (looksLikeACrash(got)) {
                    return { ok: false, detail: `${path} answered with a stack trace` }
                }
                if (!saysNumber(got.body, shelf.length)) {
                    return { ok: false, detail: `${path} said ${showBody(got.text)}` }
                }
            }
            return { ok: true, detail: `all three refused, carrying ${shelf.length}` }
        },
    },
    {
        label: 'a word instead of a number gets that same answer',
        async run({ shelf, refusals }) {
            // Looked up by name rather than by index, and guarded: renaming the array without
            // visiting this line would otherwise be a TypeError, which is not `Unreachable` and
            // would escape the run loop's catch and kill the process rather than fail one wish.
            const named = refusals.find((refusal) => refusal.name === 'past the end')
            if (!named) return { ok: false, detail: 'no refusal is named "past the end" to compare against' }
            if (named.error) throw named.error
            const past = named.got
            const got = await probe('/api/titles/three')
            if (!isPlainNo(past.status)) {
                return { ok: false, detail: 'there is no plain no for it to be the same as yet' }
            }
            if (got.status !== past.status) {
                return {
                    ok: false,
                    detail: `/api/titles/three answered ${got.status}, a number nobody has answers ${past.status}`,
                }
            }
            if (looksLikeACrash(got)) {
                return { ok: false, detail: '/api/titles/three answered with a stack trace' }
            }
            return saysNumber(got.body, shelf.length)
                ? { ok: true, detail: `the same ${got.status}, carrying the same ${shelf.length}` }
                : { ok: false, detail: `/api/titles/three said ${showBody(got.text)}` }
        },
    },
]

/**
 * Two positions whose own titles cannot be mistaken for any of the numbers wishes 2 and 3 look for,
 * or `null` when the shelf is too short to have two safe ones.
 *
 * **Neither is ever the first or the last**, and that is the part with a bug behind it. Position 1
 * turns up inside any path a body might carry, and the last position *is* the count wish 3 asks for,
 * so probing either let a body be credited with a number it had not stated. Book titles opening with
 * a numeral are the other hazard, and two of the nine the catalogue publishes today do, so the pair
 * is picked rather than assumed: `3` and hoping holds until somebody rewrites a title.
 *
 * **It needs at least four titles**, which is worth knowing because the rest of this file is written
 * to survive a catalogue rewrite and this is the one thing in it that cannot.
 */
function probePositions(shelf) {
    const size = shelf.length
    const inside = []
    for (let position = 2; position < size; position += 1) inside.push(position)
    // Below four titles there is no inside to pick from, and every fallback is a lie of some kind:
    // the pair would repeat a position, or be the first or the last, which is exactly what this
    // function exists to avoid. Say so rather than return something that cannot pass.
    if (inside.length < 2) return null

    const digitsOf = (position) => (shelf[position - 1].match(/\d+/g) ?? []).map(Number)
    const pairFits = (first, second) =>
        [first, second].every((position) => {
            const digits = digitsOf(position)
            return ![first, second, size].some((number) => digits.includes(number))
        })

    for (const first of inside) {
        for (const second of inside) {
            if (second !== first && pairFits(first, second)) return [first, second]
        }
    }
    // Every title inside the shelf collides with something. Nothing is safe, so take the two least
    // bad rather than a pair the loop above has already rejected.
    return [inside[0], inside[1]]
}

async function shelfOrExit() {
    let list = null
    try {
        list = await probe('/api/titles')
    } catch {
        list = null
    }
    if (!list || list.status !== 200 || !Array.isArray(list.body) || list.body.length === 0) {
        console.log(`Nothing is answering at ${BASE}/api/titles.`)
        console.log('')
        console.log('Start step 1 in another terminal and leave it running:')
        console.log('  cd exercises/step1/java && mvn spring-boot:run')
        process.exit(1)
    }
    return list.body
}

const shelf = await shelfOrExit()

const at = probePositions(shelf)
if (at === null) {
    console.log(`${BASE}/api/titles returned ${shelf.length} titles, and this check needs at least four.`)
    console.log('Wishes two and three are asked at positions that are neither the first nor the last.')
    process.exit(1)
}

// The three refusals the last two wishes read, asked once. All three are held to the same answer,
// because the brief lumps them together in one sentence. They are named rather than indexed: wish 6
// compares against `past the end` in particular, and reordering this array must not quietly change
// what it compares against.
const refusals = [
    { name: 'zero', path: '/api/titles/0' },
    { name: 'past the end', path: `/api/titles/${shelf.length + 1}` },
    { name: 'past the start', path: `/api/titles/-${shelf.length + 1}` },
]
for (const refusal of refusals) {
    try {
        refusal.got = await probe(refusal.path)
    } catch (error) {
        if (!(error instanceof Unreachable)) throw error
        refusal.error = error
    }
}

labelWidth = Math.max(...WISHES.map((wish) => wish.label.length)) + 2

console.log('')
console.log(`The same ask, twice. Six wishes, checked against ${BASE}`)
console.log('')

let passed = 0
for (const [index, wish] of WISHES.entries()) {
    let result
    try {
        result = await wish.run({ shelf, at, refusals })
    } catch (error) {
        if (!(error instanceof Unreachable)) throw error
        result = { ok: false, detail: `${error.message} did not answer at all` }
    }
    if (result.ok) passed += 1
    console.log(`  ${index + 1}  ${wish.label.padEnd(labelWidth)}${result.ok ? 'PASS' : 'FAIL'}  ${result.detail}`)
}

console.log('')
console.log(`  ${passed} of ${WISHES.length}.`)

// The one failure that is not about the answer. There are no live reloads in this project, so a
// student who has just watched an agent write the endpoint is still being served the old build, and
// a score taken off that is a reading of nothing. Both ends are probed, so an endpoint that is
// written but returns nothing at one position is not told to restart a service that is current.
//
// Wrapped like everything else that talks to the service: a run that scored and then lost the
// service was exiting 1 with a stack trace under a full board, which is the opposite of what the
// note at the top of this file promises.
try {
    const ends = [await probe('/api/titles/1'), await probe(`/api/titles/${shelf.length}`)]
    if (ends.every((end) => end.status === 200 && end.text.trim() === '')) {
        console.log('')
        console.log('Both ends of the shelf answer with an empty body, which is what the stub does.')
        console.log('If the endpoint is written, the service is still running the old build. Stop it and start it again.')
    }
} catch (error) {
    if (!(error instanceof Unreachable)) throw error
}

console.log('')
