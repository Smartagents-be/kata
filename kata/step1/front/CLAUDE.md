# CLAUDE.md — step 1's browser target

One file, `index.html`, and nothing behind it. It is what the student's agent opens through a
browser MCP server in the `connect-one` task of `front/src/steps/step1/units/tools.html`, and it
hides step 1's sixth flag, the one that is not on the `workshop` board.

**Do not decode, reveal or reimplement that flag.** It is not in the markup as text: `CIPHER` is the
string with each byte XORed against a rolling key, and the page assembles it in the browser when the
button is pressed. That is the exercise. Reading the file, grepping it, or working the arithmetic out
in prose all have to come back empty, so the plaintext must not appear in this file, in a comment, in
the `<title>`, in any `CLAUDE.md`, or in the curriculum. `ShutterFlag` in the frontend grades it
against a salted SHA-256 and holds no plaintext either.

**The page never addresses the agent.** Two sections below that task, the same unit teaches prompt
injection, and a page that told a browsing agent what to do next would be the course running the
attack while warning about it. Everything the student is meant to do is on the task card. The page
states what it is and stops.

Three smaller decisions:

- **No build, no dependencies, no server.** The task already asks a student to run two servers, and a
  third install to look at one page is not worth it. The agent opens the file straight off disk, so
  the page is one self-contained `index.html` with its CSS and its JS inline and nothing loaded from
  a CDN.
- **It carries its own colours, and that is the one place in the repo allowed to.** The rule that
  nothing outside `front/src/index.css` holds a colour is the curriculum app's, and this file is not
  in that app and cannot import from it. The values are the design system's dark tokens copied by
  hand, so the page reads as family without pretending to be part of the app.
- **The flag stays legible when the animation is off.** `prefers-reduced-motion` skips the flash, the
  eject and the developing bath, and the print is simply there. A screenshot taken under that setting
  has to be as readable as one taken without it.
