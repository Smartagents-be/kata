# kata-agentic-java

A hands-on course on working with an AI coding agent. You read the curriculum in the browser and
work each step against a small Spring Boot project in this repository.

## Before you start

- **Node 22.12 or newer**, with the npm that ships with it.
- **Maven 3.9 or newer** on your `PATH`. There is no wrapper here.
- **A JDK 25 or newer that Maven itself runs on.** `mvn -v` prints the one that counts, and it is
  not always the `java` first on your `PATH`.

## Setup

Open this folder with your assistant and ask it to execute `install.txt`.

That checks the tools above and sets up what the course needs. `install.txt` says at the top what it
changes and how to undo it, so read it first if you would rather know before anything runs.

## Running it

Two terminals:

```bash
cd kata/step1/java && mvn spring-boot:run   # the step's backend on :8080
cd front && npm run dev                     # the course on :5173  <- open this one
```

Then open <http://localhost:5173> and start at the intro. Only one step's backend can hold `:8080`
at a time, which is fine, because you work one step at a time. Reading the course with no backend
running works too.

## Where things are

- `front/` is the curriculum: every step, every unit, every exercise.
- `kata/stepN/java/` is that step's project, standalone, with its own `pom.xml`. Every Maven command
  runs from inside one of those folders, never from here.
