import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { createServer } from 'node:http'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

const checker = fileURLToPath(new URL('./check-entry.mjs', import.meta.url))
const shelf = ['Dummy alpha', 'Dummy beta', 'Dummy gamma', 'Dummy delta']

async function runFixture(t, handle) {
    const server = createServer(handle)
    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
    t.after(() => {
        server.closeAllConnections()
        server.close()
    })
    const child = spawn(process.execPath, [checker, `http://127.0.0.1:${server.address().port}`])
    t.after(() => { if (child.exitCode === null) child.kill() })
    let stdout = ''
    let stderr = ''
    child.stdout.on('data', (data) => { stdout += data })
    child.stderr.on('data', (data) => { stderr += data })
    const code = await new Promise((resolve, reject) => {
        child.on('error', reject)
        child.on('close', resolve)
    })
    return { code, stdout, stderr }
}

function stub(request, response) {
    if (request.url === '/api/titles') {
        response.setHeader('Content-Type', 'application/json')
        response.end(JSON.stringify(shelf))
    } else {
        response.end('')
    }
}

function assertScored(result) {
    assert.equal(result.code, 0)
    assert.equal(result.stderr, '')
    assert.match(result.stdout, /0 of 6\./)
    assert.equal((result.stdout.match(/FAIL/g) ?? []).length, 6)
}

test('a stub is scored without turning its failures into a build error', { timeout: 10000 }, async (t) => {
    assertScored(await runFixture(t, stub))
})

for (const mode of ['disconnect', 'body disconnect', 'timeout']) {
    test(`an initial refusal ${mode} fails the affected wish without aborting scoring`, { timeout: 15000 }, async (t) => {
        const result = await runFixture(t, (request, response) => {
            if (request.url !== '/api/titles/0') return stub(request, response)
            if (mode === 'timeout') return
            if (mode === 'body disconnect') {
                response.writeHead(200, { 'Content-Length': '1000' })
                response.write('partial')
                setTimeout(() => response.destroy(), 20)
            } else {
                response.destroy()
            }
        })
        assertScored(result)
        assert.match(result.stdout, /\/api\/titles\/0 did not answer at all/)
    })
}

test('a lost comparison refusal also fails the dependent last wish', { timeout: 10000 }, async (t) => {
    const result = await runFixture(t, (request, response) => {
        if (request.url === '/api/titles/5') response.destroy()
        else if (request.url === '/api/titles/0') {
            response.writeHead(404)
            response.end(String(shelf.length))
        }
        else stub(request, response)
    })
    assertScored(result)
    assert.equal((result.stdout.match(/\/api\/titles\/5 did not answer at all/g) ?? []).length, 2)
})

test('a disconnected catalogue exits with startup guidance instead of a stack trace', { timeout: 10000 }, async (t) => {
    const result = await runFixture(t, (_request, response) => response.destroy())
    assert.equal(result.code, 1)
    assert.equal(result.stderr, '')
    assert.match(result.stdout, /Nothing is answering/)
    assert.match(result.stdout, /mvn spring-boot:run/)
})
