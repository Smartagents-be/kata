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
 * here rather than in `kata/step1/java`: an agent asked to write the endpoint works inside that
 * project, and a file in there setting out what to build would hand the student's own knowledge to
 * the model for free, which is the one thing this task measures.
 *
 * Nothing in it names a title, and nothing is hard-coded to nine. The shelf comes off `/api/titles`
 * at run time, the position it probes is picked so the title sitting there cannot be mistaken for a
 * number the check is looking for, and everything is compared against that. So the checks hold if
 * the catalogue is ever rewritten, and the file carries no second copy of a list other things in
 * step 1 depend on.
 *
 *   node kata/step1/check-entry.mjs                    against localhost:8080
 *   node kata/step1/check-entry.mjs http://host:port    against somewhere else
 *
 * Exit code is 0 whatever the score, and 1 only when there is nothing to check because the service
 * is down. A score is a reading rather than a build result, and a non-zero exit invites somebody to
 * chase it green, which for the first of the two runs is exactly the wrong thing to do.
 */

const BASE = (process.argv[2] ?? 'http://localhost:8080').replace(/\/+$/, '')

/** Set from the labels below, so a reworded wish cannot run into its own verdict. */
let labelWidth = 0

/** Thrown when the service stops answering mid-run, so one check fails instead of the process. */
class Unreachable extends Error {}

/** One request. A transport failure is a result rather than a crash. */
async function probe(path) {
    let response
    try {
        response = await fetch(`${BASE}${path}`, { headers: { Accept: '*/*' } })
    } catch {
        throw new Unreachable(path)
    }
    const text = await response.text()
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
    return flat.length > 200 ? `${flat.slice(0, 197)}...` : flat
}

/**
 * The values an answer is made of, nested objects included. The brief asks for a number, a title and
 * a count, and says nothing about the shape they arrive in, so every reading is accepted: a title on
 * its own, an object carrying them under any field names, an object with an error type wrapped
 * inside it, or a line with the lot written into it. Grading a shape nobody asked for would be this
 * check inventing a seventh wish.
 */
function partsOf(body, depth = 0) {
    if (body === null || body === undefined || depth > 4) return []
    if (Array.isArray(body)) return body.flatMap((part) => [part, ...partsOf(part, depth + 1)])
    if (typeof body === 'object') {
        return Object.values(body).flatMap((part) => [part, ...partsOf(part, depth + 1)])
    }
    return [body]
}

function saysTitle(body, title) {
    return partsOf(body).some((part) => typeof part === 'string' && part.includes(title))
}

/**
 * Whether an answer states a given number anywhere.
 *
 * Two things in here are load bearing. **A hyphen is not a minus sign**, because `1-9` is how
 * everybody writes a range and a tokeniser that read the 9 as negative failed the one implementation
 * this exercise exists to reward. And **ISO timestamps are cut out of any string first**, since a
 * framework's default error page carries one and an hour or a millisecond in it is digits that could
 * be read as a count.
 */
function saysNumber(body, wanted) {
    return partsOf(body).some((part) => {
        if (typeof part === 'number') return part === wanted
        if (typeof part !== 'string') return false
        const runs = part.replace(/\d{4}-\d{2}-\d{2}[T ][\d:.+Z-]*/g, ' ').match(/\d+/g) ?? []
        return runs.some((run) => Number(run) === wanted)
    })
}

/** Answered, and answered with a refusal rather than by falling over. */
function isPlainNo(status) {
    return status >= 400 && status < 500
}

/**
 * A body that is really a stack trace is the thing the brief calls falling over, whatever status it
 * arrived with. It tests for a stack frame and nothing else: a refusal that happens to name an
 * exception type is a refusal, and a first cut of this that matched the bare word `Exception` had
 * two adjacent lines of the board disagreeing about the same body.
 */
function looksLikeACrash(text) {
    return /\n\s+at [\w.$/]+\(/.test(String(text))
}

/**
 * The six, in the order the brief says them, one wish per sentence up there and one line per wish
 * down here. The label is the wish rather than the mechanism, because a failing line has to read as
 * something the student knew and did not pass on.
 *
 * Every check is handed the shelf as it comes off `/api/titles`, the position that is safe to probe,
 * and the three refusals the last two wishes read, so nothing is asked of the endpoint twice for one
 * line of output.
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
                    return {
                        ok: false,
                        detail: `/api/titles/${position} gave ${showBody(got.text)}`,
                    }
                }
            }
            return { ok: true, detail: `all ${shelf.length} of them` }
        },
    },
    {
        label: 'the answer says the number back, not just the title',
        async run({ at }) {
            const got = await probe(`/api/titles/${at}`)
            if (got.status !== 200) return { ok: false, detail: `/api/titles/${at} answered ${got.status}` }
            return saysNumber(got.body, at)
                ? { ok: true, detail: 'the number came back with the title' }
                : { ok: false, detail: `${showBody(got.text)} does not say ${at}` }
        },
    },
    {
        label: 'and how many there are, so it reads as three of nine',
        async run({ shelf, at }) {
            const got = await probe(`/api/titles/${at}`)
            if (got.status !== 200) return { ok: false, detail: `/api/titles/${at} answered ${got.status}` }
            return saysNumber(got.body, shelf.length)
                ? { ok: true, detail: `the answer carries ${shelf.length}` }
                : { ok: false, detail: `${showBody(got.text)} does not say ${shelf.length}` }
        },
    },
    {
        label: 'minus one is the last one on the shelf',
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
            for (const { path, got } of refusals) {
                if (!isPlainNo(got.status)) {
                    return { ok: false, detail: `${path} answered ${got.status}` }
                }
                if (looksLikeACrash(got.text)) {
                    return { ok: false, detail: `${path} answered with a stack trace` }
                }
            }
            for (const { path, got } of refusals.filter((refusal) => refusal.counts)) {
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
            const past = refusals[1].got
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
            return saysNumber(got.body, shelf.length)
                ? { ok: true, detail: `the same ${got.status}, carrying the same ${shelf.length}` }
                : { ok: false, detail: `${showBody(got.text)} does not say ${shelf.length}` }
        },
    },
]

/**
 * A position whose own title cannot be mistaken for either of the numbers wishes 2 and 3 look for.
 * Book titles open with a numeral often enough that this matters, and two of the nine the catalogue
 * publishes today do, so picking `3` and hoping is the kind of thing that holds until somebody
 * rewrites a title.
 */
function safePosition(shelf) {
    const clean = (index) => {
        const runs = shelf[index].match(/\d+/g) ?? []
        return !runs.some((run) => Number(run) === index + 1 || Number(run) === shelf.length)
    }
    for (let index = 0; index < shelf.length; index += 1) {
        if (clean(index)) return index + 1
    }
    return Math.min(3, shelf.length)
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
        console.log('  cd kata/step1/java && mvn spring-boot:run')
        process.exit(1)
    }
    return list.body
}

const shelf = await shelfOrExit()
const at = safePosition(shelf)

// The three refusals the last two wishes read, asked once. Only the two that are numbers out of
// range are asked to carry the count: zero is a number nobody has as well, and the brief lumps it in
// with them, so it is held to the same answer.
const refusals = [
    { path: '/api/titles/0', counts: true },
    { path: `/api/titles/${shelf.length + 1}`, counts: true },
    { path: `/api/titles/-${shelf.length + 1}`, counts: true },
]
for (const refusal of refusals) {
    refusal.got = await probe(refusal.path)
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
const ends = [await probe('/api/titles/1'), await probe(`/api/titles/${shelf.length}`)]
if (ends.every((end) => end.status === 200 && end.text.trim() === '')) {
    console.log('')
    console.log('Every position answers with an empty body, which is what the stub does.')
    console.log('If the endpoint is written, the service is still running the old build. Stop it and start it again.')
}

console.log('')
