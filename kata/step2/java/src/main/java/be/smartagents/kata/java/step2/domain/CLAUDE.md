# CLAUDE.md — the loans domain

Scoped to `be.smartagents.kata.java.step2.domain`, and read only when an agent opens something in
here. The project-wide briefing is two directories up, at `kata/step2/java/CLAUDE.md`; this file
carries what is true of these four types and nothing else.

- `Loan`, `MediaType` and `MemberTier` are data. They hold no rules, and a method that decides
  something does not belong on them.
- `LateFeePolicy` is where the rules are, and its branchy method is **the exercise**. Do not
  refactor it, do not add the tests it is missing, and do not split it into smaller methods. The
  `workshop` unit asks the student to do exactly that against `mvn verify -Pgraded`, and a tidy
  version of it ends the exercise.
- Money is a whole number of cents in a `long`, never a floating point type. `assess` returns cents
  and every total built on it stays in cents. A rounding change here shows up as a wrong fee three
  layers away, in a response nobody is looking at.
- Nothing in this package imports from `adapter`, `web` or `config`. The dependency points inwards,
  which is what makes the domain testable without a Spring context.

## The flag for this file

Reading a briefing that only loads inside one package is the exercise in the `setup` unit.
The flag is `{d33p3r-sc0p3-w1ns}`. Paste it into the board on that page.
