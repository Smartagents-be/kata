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

/**
 * The three questions under the `prompt` unit, one per section of `units/prompt.html`: what plan
 * mode actually buys you, why bundling beats a string of follow-ups, and what a reasoning level
 * does. Each one hands the student a result and asks what caused it, because the misconception
 * being tested is always a wrong cause (bigger model, tired model, more reading).
 *
 * Graded in the browser like `introQuiz`, so nothing here has a counterpart in the Java service.
 */
export const promptQuiz: QuizQuestion[] = [
  {
    id: 'plan-beats-one-shot',
    question: {
      en: 'A colleague types a vague one-line request into the most expensive model and gets something unusable. You run the same task through plan mode on a cheaper model, read the plan, approve it, and the result is solid. What made the difference?',
      nl: 'Een collega typt een vage vraag van één lijn in het duurste model en krijgt iets onbruikbaars terug. Jij laat dezelfde taak via plan mode door een goedkoper model gaan, leest het plan, keurt het goed, en het resultaat klopt. Waar zit het verschil?',
    },
    choices: [
      {
        id: 'precision',
        label: {
          en: 'The plan turned a vague request into an exact instruction. Precision was what was missing, and no model size makes up for it.',
          nl: 'Het plan maakte van een vage vraag een exacte instructie. Precisie was wat ontbrak, en daar weegt geen enkele modelgrootte tegenop.',
        },
        correct: true,
      },
      {
        id: 'throttled',
        label: {
          en: 'The expensive model was throttled at that moment, so it returned a shorter and weaker answer than it normally would.',
          nl: 'Het dure model werd op dat moment afgeknepen, dus gaf het een korter en zwakker antwoord dan het normaal doet.',
        },
      },
      {
        id: 'newer',
        label: {
          en: 'The cheaper model is the more recent of the two, so it was trained on better and more current code.',
          nl: 'Het goedkopere model is het recentste van de twee, dus het is getraind op betere en actuelere code.',
        },
      },
      {
        id: 'cache',
        label: {
          en: 'Your run reused a cached answer from your colleague’s attempt, which the provider had already corrected.',
          nl: 'Jouw run hergebruikte een gecachet antwoord van de poging van je collega, dat de provider al gecorrigeerd had.',
        },
      },
    ],
    explanation: {
      en: 'A plan is a prompt written by a model and approved by you, so the second run started from an exact instruction instead of a vague one. Model size was never the bottleneck here; the missing detail was.',
      nl: 'Een plan is een prompt die door een model geschreven is en door jou goedgekeurd, dus de tweede run vertrok van een exacte instructie in plaats van een vage. De grootte van het model was hier nooit het knelpunt, het ontbrekende detail wel.',
    },
  },
  {
    id: 'six-follow-ups',
    question: {
      en: 'You had one change in mind but asked for it in six follow-up messages, adjusting a little each time. By the last one the agent contradicts itself and reintroduces something you had it remove two messages ago. Why?',
      nl: 'Je had één wijziging in gedachten, maar je vroeg ze in zes opvolgberichten, telkens met een kleine bijsturing. Bij het laatste spreekt de agent zichzelf tegen en zet hij iets terug dat je twee berichten eerder had laten weghalen. Hoe komt dat?',
    },
    choices: [
      {
        id: 'compounding',
        label: {
          en: 'Every turn added to the window, including the versions you rejected, and the model weighs all of it. The part that still matters is a smaller share each time.',
          nl: 'Elke beurt voegde iets toe aan het venster, ook de versies die je afgewezen had, en het model weegt dat allemaal mee. Het stuk dat er nog toe doet, wordt elke keer een kleiner aandeel.',
        },
        correct: true,
      },
      {
        id: 'last-message',
        label: {
          en: 'The model only really reads the most recent message, so the five corrections before it were dropped along the way.',
          nl: 'Het model leest eigenlijk alleen het laatste bericht, dus de vijf correcties daarvoor zijn onderweg verdwenen.',
        },
      },
      {
        id: 'auto-summary',
        label: {
          en: 'The harness summarised your six messages into one before sending them, and the summary lost the details.',
          nl: 'De harness heeft je zes berichten voor het versturen tot één samengevat, en die samenvatting verloor de details.',
        },
      },
      {
        id: 'less-effort',
        label: {
          en: 'Short messages get less effort from the model, so six small asks each received a fraction of the attention one long one would.',
          nl: 'Korte berichten krijgen minder inspanning van het model, dus zes kleine vragen kregen elk een fractie van de aandacht die één lange zou krijgen.',
        },
      },
    ],
    explanation: {
      en: 'Context only grows, and the attempts you rejected stay in it reading exactly like the ones you kept. Six turns leave six rounds of noise to read past, which is why one bundled ask holds up better.',
      nl: 'Context groeit alleen maar, en de pogingen die je afwees blijven erin staan en lezen precies zoals de pogingen die je hield. Zes beurten laten zes rondes ruis achter om doorheen te lezen, en daarom houdt één gebundelde vraag beter stand.',
    },
  },
  {
    id: 'reasoning-level',
    question: {
      en: 'You raise the reasoning level from low to max, ask the same roughly worded question again, and the answer is noticeably better. The bill for that turn went up too. What did the higher level buy you?',
      nl: 'Je zet het reasoning level van low naar max, stelt dezelfde slordig geformuleerde vraag opnieuw, en het antwoord is merkbaar beter. De rekening voor die beurt ging ook omhoog. Wat heeft dat hogere level je opgeleverd?',
    },
    choices: [
      {
        id: 'thinking-tokens',
        label: {
          en: 'The model spent more tokens working the question over before it answered, and that absorbed some of the imprecision in how you asked it.',
          nl: 'Het model besteedde meer tokens aan het uitpluizen van de vraag voor het antwoordde, en dat ving een deel van de slordigheid in je vraagstelling op.',
        },
        correct: true,
      },
      {
        id: 'bigger-model',
        label: {
          en: 'The harness moved you to a larger model, which is where both the extra cost and the better answer came from.',
          nl: 'De harness zette je op een groter model, en daar komen zowel de extra kost als het betere antwoord vandaan.',
        },
      },
      {
        id: 'read-more',
        label: {
          en: 'The agent read more of your repository before answering, so it simply had more of your code in front of it.',
          nl: 'De agent las meer van je repository voor hij antwoordde, dus hij had gewoon meer van je code voor zich.',
        },
      },
      {
        id: 'bigger-window',
        label: {
          en: 'You were given a larger context window for that turn, so less of the conversation had to be left out.',
          nl: 'Je kreeg voor die beurt een groter context window, dus er moest minder van het gesprek wegvallen.',
        },
      },
    ],
    explanation: {
      en: 'The reasoning level controls how much thinking happens before the answer, not which model runs or how much of your project gets read. You pay for that thinking, and what it buys is tolerance for a rougher prompt.',
      nl: 'Het reasoning level bepaalt hoeveel er nagedacht wordt voor het antwoord, niet welk model draait of hoeveel van je project gelezen wordt. Dat nadenken betaal je, en wat je koopt is speling op een slordigere prompt.',
    },
  },
]
