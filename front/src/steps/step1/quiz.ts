import type { QuizQuestion } from '@/shared/step'

/**
 * The three questions under the `intro` unit. Each one is a symptom a student will have already
 * met at work, and each maps onto a section of `units/intro.html`: amnesia, missing context and
 * entropy. Keep them in that order, because that is the order the prose above them explains.
 *
 * These are graded in the browser, so nothing here has a counterpart in the Java service. The
 * explanations are only read by a student who got the question wrong, which is why they are two
 * sentences rather than a lecture.
 */
export const introQuiz: QuizQuestion[] = [
  {
    id: 'forgets-this-morning',
    question: {
      en: 'You have been working on the same project all morning. At 14:00 you ask the agent something you already told it at 08:00, and it does not remember. What happened?',
      nl: 'Je werkt al de hele voormiddag aan hetzelfde project. Om 14:00 vraag je de agent iets wat je hem om 08:00 al verteld had, en hij weet het niet meer. Wat is er gebeurd?',
    },
    choices: [
      {
        id: 'window',
        label: {
          en: 'The window filled up. The morning was compacted into a summary or pushed out of the context, so it is no longer in front of the model.',
          nl: 'Het venster is volgelopen. De voormiddag is samengevat of uit de context geduwd, dus staat ze niet meer voor het model.',
        },
        correct: true,
      },
      {
        id: 'ignored',
        label: {
          en: 'Everything from 08:00 is still in the context, but the model decided it was no longer relevant.',
          nl: 'Alles van 08:00 zit nog in de context, maar het model vond het niet meer relevant.',
        },
      },
      {
        id: 'lookup',
        label: {
          en: 'The model looks your history up in a database per session, and this morning is in yesterday’s partition.',
          nl: 'Het model zoekt je geschiedenis per sessie op in een databank, en deze voormiddag zit in een andere partitie.',
        },
      },
      {
        id: 'learning',
        label: {
          en: 'The model learned during the day and overwrote the old instruction with something it liked better.',
          nl: 'Het model heeft tijdens de dag bijgeleerd en de oude instructie vervangen door iets wat het beter vond.',
        },
      },
    ],
    explanation: {
      en: 'A model keeps nothing between two messages, so every turn re-sends the whole transcript into a finite window. Once the morning no longer fits, it is compacted into a summary or pushed out, and your 08:00 instruction goes with it.',
      nl: 'Een model houdt tussen twee berichten niets bij, dus elke beurt gaat het hele transcript opnieuw naar een eindig venster. Zodra de voormiddag er niet meer in past, wordt ze samengevat of eruit geduwd, en je instructie van 08:00 gaat mee.',
    },
  },
  {
    id: 'invented-userservice',
    question: {
      en: 'You ask the model to explain what UserService in this repository does. It answers confidently, and the answer has nothing to do with the UserService that is actually there. Why?',
      nl: 'Je vraagt het model uit te leggen wat UserService in deze repository doet. Het antwoordt vol vertrouwen, en het antwoord slaat nergens op vergeleken met de UserService die er echt staat. Hoe komt dat?',
    },
    choices: [
      {
        id: 'never-read',
        label: {
          en: 'It never read the file. With nothing from your project in the context, it answers from the average of every UserService it saw during training.',
          nl: 'Het heeft het bestand nooit gelezen. Zonder iets uit jouw project in de context antwoordt het vanuit het gemiddelde van elke UserService die het tijdens de training gezien heeft.',
        },
        correct: true,
      },
      {
        id: 'too-complex',
        label: {
          en: 'It read the file, but the class is too long for the model to follow.',
          nl: 'Het heeft het bestand gelezen, maar de klasse is te lang om te volgen.',
        },
      },
      {
        id: 'cached',
        label: {
          en: 'It read a cached copy of the file from an earlier session, and the cache is stale.',
          nl: 'Het heeft een gecachete versie uit een eerdere sessie gelezen, en die cache is verouderd.',
        },
      },
      {
        id: 'naming',
        label: {
          en: 'Your team uses a naming convention the model was never trained on, so it could not match the class.',
          nl: 'Jullie gebruiken een naamgevingsconventie waarop het model niet getraind is, dus kon het de klasse niet plaatsen.',
        },
      },
    ],
    explanation: {
      en: 'With nothing from your project in the context, the model answers from the average of every UserService in its training data. It cannot tell you it never saw your file, so the guess arrives sounding like a fact.',
      nl: 'Zonder iets uit jouw project in de context antwoordt het model vanuit het gemiddelde van elke UserService uit zijn trainingsdata. Het kan je niet zeggen dat het jouw bestand nooit gezien heeft, dus de gok klinkt als een feit.',
    },
  },
  {
    id: 'quality-degrades',
    question: {
      en: 'A long session is running. The agent starts contradicting itself, proposes an approach you rejected an hour ago, and edits a file back to a version you moved past. What is going on?',
      nl: 'Je zit in een lange sessie. De agent spreekt zichzelf tegen, stelt een aanpak voor die je een uur geleden afgewezen hebt, en zet een bestand terug naar een versie die je al achter je gelaten had. Wat is er aan de hand?',
    },
    choices: [
      {
        id: 'entropy',
        label: {
          en: 'Entropy. The context filled with the session’s leftovers: failed attempts, a command that errored, the same file read in three different states. The model weighs all of it.',
          nl: 'Entropie. De context is volgelopen met de restanten van de sessie: mislukte pogingen, een commando dat faalde, hetzelfde bestand in drie verschillende toestanden. Het model weegt dat allemaal mee.',
        },
        correct: true,
      },
      {
        id: 'degrades',
        label: {
          en: 'The model degrades the longer it runs, the way a machine drifts as it heats up.',
          nl: 'Het model gaat achteruit naarmate het langer draait, zoals een machine die warm loopt.',
        },
      },
      {
        id: 'downgrade',
        label: {
          en: 'The provider quietly moved you to a smaller model once the session got expensive.',
          nl: 'De provider heeft je stilletjes naar een kleiner model verplaatst toen de sessie duur werd.',
        },
      },
      {
        id: 'repo-grew',
        label: {
          en: 'The repository grew during the session, so there is more code than the model can handle.',
          nl: 'De repository is tijdens de sessie gegroeid, dus er is meer code dan het model aankan.',
        },
      },
    ],
    explanation: {
      en: 'Nothing leaves the context on its own, so the session fills with its own leftovers and the model weighs all of it. An idea you rejected an hour ago sits there reading exactly like a live one.',
      nl: 'Er verdwijnt niets vanzelf uit de context, dus loopt de sessie vol met haar eigen restanten en het model weegt dat allemaal mee. Een idee dat je een uur geleden afgewezen hebt, staat er nog en leest precies zoals een levend idee.',
    },
  },
]
