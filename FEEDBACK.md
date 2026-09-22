# Feedback op de kata

Dit document bundelt drie soorten werk voor de kata: opmerkingen uit een volledige doorloop
("algemeen echt heel cool"), onderwerpen die nog ontbreken en bestaande inhoud die niet meer klopt.
De screenshots staan in `feedback/`.

## Feedback per unit

Per unit in de volgorde van de curriculum. Bij elk punt staat waar het zit, wat de screenshot toont
en wat de opmerking is.

### Stap 1

#### 1. `step1/tokens`: quiz "Kies wat er volgt"

![Kies wat er volgt](feedback/01-tokens-pick-the-next.png)

Figuur `pick-the-next` (`step1/PickTheNext.tsx`). De boom na "the pull request was" toont merged,
closed en approved met hun kans; het juiste antwoord is "Alle drie".

**Opmerking:** het is niet duidelijk wat er gevraagd wordt. De vraag leest alsof je moet antwoorden
welk woord er op je scherm zal verschijnen, en dat zijn ze niet alle drie. Daardoor is "Alle drie"
verwarrend.

#### 2. `step1/tokens`: figuur "één woord door het model"

![Eén woord door het model](feedback/02-tokens-words-into-tokens.png)

Figuur `words-into-tokens`: `unscrambled` wordt `unscr` + `ambled`, dan een vector, een matrix, een
nieuwe vector en ten slotte `titles`.

**Opmerking:** de figuur is niet te volgen. Ze lijkt van een reeks naar een matrix naar een reeks te
gaan, en het is niet duidelijk wat `unscr` en `titles` met elkaar te maken hebben.

#### 3. `step1/tokens`: soorten tokens

**Opmerking:** de unit zou het verschil tussen input-, output-, cache- en reasoning tokens moeten
tonen. Zie ook punt 1 onder "Ontbrekende onderwerpen".

#### 4. `step1/tools`: figuur "Tools"

![Tools in context](feedback/03-tools-in-context.png)

Figuur `tools-in-context`: de tool steekt buiten het venster uit met "draait op jouw systeem" en de
voorbeelden `grep`, `find`, `curl` en `mcp`.

**Opmerking:** `mcp` past niet in dat rijtje. Het is geen tool zoals de andere drie, maar een
protocol waarlangs tools binnenkomen.

#### 5. `step1/tools`: oefening "Kies de vreemde eend"

![Kies de vreemde eend](feedback/04-tools-spot.png)

Figuur `spot`: vier toolresultaten, waarvan één (een MCP-ticket) een prompt injection bevat.

**Opmerking:** leuk voorbeeld, maar het is niet duidelijk hoe het bij tools past. Meer algemeen zou
deze unit beter over de agentic loop gaan, met tools als onderdeel daarvan. Zie ook punt 5 onder "Ontbrekende onderwerpen".

#### 6. `step1/tools`: oefening "Verdeel het venster"

![Verdeel het venster](feedback/05-tools-budget.png)

Figuur `budget`: kies de toolcalls die nodig zijn om een `?limit=`-parameter aan `GET /api/titles`
toe te voegen.

**Opmerking:** de student heeft te weinig informatie. De vraag is erg beperkt, en de student moet al
weten dat de standaardoperaties van een harness niet meer zijn dan grep, glob, read, write, edit en
bash, en welke daarvan de meeste tokens kost.

#### 7. `step1/context`: kop "En het is een statistiek"

![En het is een statistiek](feedback/06-context-statistiek.png)

Sleutel `context.model-statistic.heading` in `step1/locales/nl.json`.

**Opmerking:** "En het is een statistiek" leest vreemd als kop.

#### 8. `step1/session`: figuur "Compaction kiest het moment, of jij kiest het"

![Compaction of clear](feedback/07-session-seam.png)

Figuur `seam`: twee balken, compaction wanneer het venster vol zit en een clear op een moment dat jij
kiest, met de taken "de pipeline lezen", "de null zoeken" en "de test schrijven".

**Opmerking:** in deze figuur lijken clear en compact bijna hetzelfde, terwijl het heel verschillende
dingen zijn. Het label "de null zoeken" is vreemd. Toon misschien ook dat compacten zelf tokens kost en
dus niet pas bij 100% gebeurt.

#### 9. `step1/harness`: figuur "Decompositie"

![Decompositie](feedback/08-harness-decompositie.png)

Figuur `under-specified` onder de kop `harness.decomposition.heading`: "Zet zoeken op de
catalogus" wordt opgeknipt in drie vragen.

**Opmerking:** niet duidelijk wat hier bedoeld wordt.

### Stap 2

#### 10. `step2/setup`: CLAUDE.md-boom

![CLAUDE.md in de projectopzet](feedback/09-setup-claude-md-tree.png)

Boom met een `CLAUDE.md` in de root, in `front/` en in `kata/step2/java/`.

**Opmerking:** bekijk of `.claude/rules` hier beter is dan aparte `CLAUDE.md`-bestanden. Op het examen
van Claude Certified Architect kwam `.claude/rules` vaak terug. Zie ook punt 6 onder "Ontbrekende onderwerpen".

#### 11. `step2/steering`: figuur "Onderbreken, of teruggaan"

![Onderbreken of teruggaan](feedback/10-steering-interrupt-or-go-back.png)

Twee kolommen: "Stuur een correctie" en "Ga terug en pas aan".

**Opmerking:** het is niet meteen duidelijk dat de agent in het tweede geval al een fout antwoord had
gegeven. "Ga terug en pas aan" doet ook denken dat je in de sessie kunt teruggaan, in plaats van een
nieuwe sessie te starten.

#### 12. `step2/patterns`: figuur "Scripts"

![Scripts](feedback/11-patterns-script-runs.png)

Figuur `script-runs`: drie runs van gedropt, geseed en gecheckt, eerst elke keer anders, daarna als
script elke keer hetzelfde.

**Opmerking:** zonder meer context niet duidelijk.

#### 13. `step2/workflows`: figuur `flow-audit`

![Audit-workflow](feedback/12-workflows-flow-audit.png)

Jij, agent, `audit.md`, jij, agent, project (spec en code), met een update-pijl terug naar
`audit.md` en een tak naar "jij".

**Opmerking:** ook niet helemaal duidelijk. Bij de update-pijl hoort waarschijnlijk nog een
agent-pill, en het is niet duidelijk wat de "jij" onderaan doet.

## Ontbrekende onderwerpen

1. **Tokenverbruik kunnen lezen**

   De kata legt al uit dat context bij iedere beurt opnieuw wordt verwerkt. `step1/model` noemt
   input-, output- en gecachete tokens (alleen in de Copilot-variant) en `step1/prompt` zegt dat
   reasoning tokens de kost verhogen. Wat ontbreekt, is het verbruik echt leren lezen: laat
   deelnemers het verbruik voor en na een aanpassing meten met hetzelfde model en dezelfde reasoning
   effort. Claude Code toont dit via `/usage` (`/cost` en `/stats` zijn aliassen); de API en SDK
   geven onder andere `input_tokens`, `output_tokens`, `cache_creation_input_tokens` en
   `cache_read_input_tokens` terug in `usage`. Vergelijk ook het aantal beurten en de doorlooptijd.
   Reasoning tokens tellen bij Claude als outputtokens en de kost in `/usage` blijft een schatting.

   Bron: *Token-efficient AI development*, dia 2, 8 tot en met 9, 17 tot en met 20 en 47 tot en met
   48; [Anthropic, Manage costs effectively](https://code.claude.com/docs/en/costs).

2. **Model en reasoning effort bewust kiezen**

   `step1/model` behandelt al de tier en reasoning als twee aparte knoppen en wanneer de kleine tier
   volstaat. Voeg daar een eenvoudige beslisregel aan toe. Blijf bij hetzelfde model zolang het de
   nodige mogelijkheden heeft en schakel pas over wanneer de taak buiten zijn mogelijkheden valt.
   Pas binnen hetzelfde model de reasoning effort aan wanneer de taak zorgvuldiger geanalyseerd en
   gecontroleerd moet worden. Meer reasoning vervangt geen ontbrekende context of bewijs.

   Bron: *Token-efficient AI development*, dia 45 en 46.

3. **Context actief sturen**

   Er zijn fragmenten: `step1/tools` raadt aan om overbodige tools uit te schakelen en
   `step2/steering` om de falende output mee te geven. De startmap en het bredere sturen van context
   worden sinds het verdwijnen van `step2/scoping` nergens meer behandeld. Voeg toe dat je relevante
   bestanden en foutregels meegeeft (geen volledige logs), irrelevante mappen en tools uitsluit en
   eerst gericht zoekt als je nog niet weet waar de wijziging zit. De prompt benoemt het concrete
   doel, de grenzen en aannames die de agent niet zelf kan afleiden.

   Leg ook het verschil uit tussen focus en toegang. De startmap bepaalt het standaard werkgebied
   en welke gedeelde settings gelden: `.claude/settings.json` en de hooks daarin worden alleen uit
   de `.claude/`-map van de startmap geladen, zonder terugval op bovenliggende mappen (alleen
   `.claude/settings.local.json` wordt ook uit de repository-root geladen). `CLAUDE.md`, skills en
   agents worden wel naar boven toe gevonden. De startmap is geen beveiligingsgrens. Permissions
   worden via `/permissions` of met `allow`, `ask` en `deny` in `.claude/settings.json`,
   `.claude/settings.local.json` of `~/.claude/settings.json` ingesteld en in de volgorde deny, ask,
   allow geëvalueerd, ook over die bestanden heen. Deze regels bepalen welke tools en paden Claude
   Code mag gebruiken. Met de sandbox ingeschakeld dwingen `sandbox.filesystem.denyRead` en
   `denyWrite` bestandsgrenzen ook af voor Bash en subprocessen. Een ignorebestand vermindert ruis,
   maar beperkt de toegang niet.

   Bron: *Token-efficient AI development*, dia 12 tot en met 20 en 53 tot en met 54; examengids,
   domein 2, taak 2.5 en domein 5, taak 5.4;
   [Anthropic, Configure permissions](https://code.claude.com/docs/en/permissions) en
   [Anthropic, Configure the sandboxed Bash tool](https://code.claude.com/docs/en/sandboxing).

4. **Context rot en "lost in the middle" benoemen**

   `step1/context` behandelt al entropie en het tijdig wissen van de sessie, en `step2/steering`
   zegt dat een nieuwe poging in een schoon venster beter werkt dan verder bouwen in een vervuild
   venster. Voeg de reden toe waarom een lange sessie slechter wordt, ook ruim onder de limiet:
   informatie in het midden van een lange context wordt minder betrouwbaar gebruikt dan wat aan het
   begin of het einde staat, en ruis, zijsporen en tegenstrijdige informatie maken dat erger. Start
   dan opnieuw met een korte samenvatting van de nog geldige feiten, beslissingen en het doel.

   Bron: *Token-efficient AI development*, dia 4, 15, 53 en 54; examengids, domein 1, taak 1.7 en
   domein 5, taak 5.1 en 5.4; Liu et al.,
   [Lost in the Middle: How Language Models Use Long Contexts](https://arxiv.org/abs/2307.03172).

5. **De agentic loop volledig benoemen**

   `step1/tools` toont de essentie al: de agent vraagt een tool, de harness voert die uit en het
   resultaat komt in de context. Voeg de technische cyclus voor client-side tools toe: de request
   bevat de conversatie en tools met `name`, `description` en `input_schema`; een toolcall komt
   terug als `stop_reason: "tool_use"` met één of meer `tool_use`-blokken met `id`, `name` en
   `input`. De harness voert iedere call uit, voegt de volledige assistant-response toe aan de
   geschiedenis en stuurt daarna een nieuw `user`-bericht dat begint met een `tool_result` per call.
   Daarin verwijst `tool_use_id` naar het oorspronkelijke `id`, bevat `content` het resultaat en
   geeft `is_error: true` een fout aan. De loop gaat door bij `tool_use` en eindigt normaal bij
   `end_turn`; `max_tokens`, `stop_sequence`, `refusal` en `model_context_window_exceeded` vragen
   een aparte afhandeling, net als `pause_turn`, dat alleen bij server-side tools voorkomt. Tekst
   zoals "klaar" is geen technisch stopsignaal.

   Bronnen: examengids, domein 1, taak 1.1;
   [Anthropic, How tool use works](https://platform.claude.com/docs/en/agents-and-tools/tool-use/how-tool-use-works),
   [Anthropic, Handle tool calls](https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls)
   en [Anthropic, Handling stop reasons](https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons).

6. **Projectinstructies deelbaar en zo neutraal mogelijk maken**

   `step2/setup` behandelt al persoonlijke tegenover gedeelde `CLAUDE.md` en mapgebonden
   `CLAUDE.md`-bestanden die pas laden wanneer de agent in die map werkt. Voeg nog altijd tegenover
   gericht geladen instructies toe. Algemene afspraken kunnen in `AGENTS.md` staan. Claude Code leest
   `AGENTS.md` zelf wanneer er geen `CLAUDE.md` is; naast een `CLAUDE.md` importeer je het met
   `@AGENTS.md`. Zo'n import maakt de configuratie overzichtelijker, maar de inhoud wordt bij de
   start geladen en bespaart dus geen tokens. Bestanden in `.claude/rules/` groeperen regels per
   onderwerp: zonder `paths` gelden ze altijd, met `paths`-frontmatter alleen voor overeenkomende
   bestanden. Houd de altijd geladen instructies kort, zet padgebonden afspraken in rules en
   taakgebonden procedures in skills.

   Bron: *Token-efficient AI development*, dia 22 tot en met 26 en 54; examengids, domein 3,
   taak 3.1 tot en met 3.3;
   [Anthropic, How Claude remembers your project](https://code.claude.com/docs/en/memory).

7. **Commands en skills onderscheiden**

   `step2/setup` legt al uit dat een skill met `/<naam>` wordt gestart en dat Claude op de
   beschrijving matcht. Voeg toe dat custom commands in Claude Code zijn samengevoegd met skills.
   Bestaande bestanden in `.claude/commands/<naam>.md` blijven werken, maar
   `.claude/skills/<naam>/SKILL.md` is de huidige vorm en kan ook ondersteunende bestanden bevatten.
   Een skill kan standaard zowel door de developer met `/<naam>` als automatisch door Claude worden
   gestart wanneer de beschrijving bij de prompt past. `disable-model-invocation: true` maakt ze
   uitsluitend handmatig, `user-invocable: false` uitsluitend voor Claude. Bij een command en skill
   met dezelfde naam wint de skill; gebruik die naam dus niet voor verschillende workflows.

   Bron: *Token-efficient AI development*, dia 26 en 27;
   [Anthropic, Extend Claude with skills](https://code.claude.com/docs/en/skills).

8. **Zelf gespecialiseerde agents configureren**

   Subagents komen al als idee voor in `step1/tools`, `step1/harness` en `step2/parallel`. Voeg toe
   hoe developers ze zelf maken. Gedeelde agents staan in `.claude/agents/<naam>.md`, persoonlijke
   agents in `~/.claude/agents/<naam>.md`. Je maakt ze door Claude te vragen of door het bestand
   zelf te schrijven; `/agents` opent geen beheerscherm meer. De frontmatter bevat minstens `name`
   en `description` en kan ook `model`, `tools`, `disallowedTools` en `skills` instellen; de
   markdowntekst is de systeemprompt. De beschrijving bepaalt wanneer Claude de agent kiest. De agent
   werkt in een eigen context: hij laadt wel `CLAUDE.md` en kan zelf skills aanroepen, maar krijgt
   de hoofdconversatie en de daar gebruikte skills niet mee. Doel, nodige context en verwacht
   resultaat moeten dus expliciet worden doorgegeven. Geef iedere agent alleen de tools die zijn rol
   nodig heeft.

   Bron: *Token-efficient AI development*, dia 28 en 29; examengids, domein 1, taak 1.2 en 1.3;
   [Anthropic, Create custom subagents](https://code.claude.com/docs/en/sub-agents).

9. **Permissions, hooks en scripts als guardrails**

   Het verschil tussen een instructie, skill en hook staat al in `step2/setup`, scripts in
   `step2/patterns` en een hook als kwaliteitspoort in `step2/engineering`. Voeg permissions en
   beperkte tooltoegang toe aan dat overzicht. De hoofdregel is dat iets wat gegarandeerd moet
   gebeuren niet alleen in een prompt hoort. Zet zulke controles in een script, hook of build en
   houd secrets en gevoelige bestanden buiten het bereik van de agent. Gedeelde hooks staan onder
   `hooks` in `.claude/settings.json`, persoonlijke in `~/.claude/settings.json` en lokale in
   `.claude/settings.local.json`; er bestaat geen afzonderlijk `.claude/hooks.json` voor een
   project. Toon met `.env` het verschil tussen de lagen: `permissions.deny` met `Read(./.env)` (of
   `Read(**/.env)` voor elke diepte) blokkeert de ingebouwde leestools en herkende Bash-commando's
   zoals `cat`, `head` en `tail`, maar niet elk script dat het bestand zelf opent. Een
   `PreToolUse`-hook kan ook verdachte Read- en Bash-calls onderscheppen en
   `sandbox.filesystem.denyRead` maakt het bestand op OS-niveau onbereikbaar voor Bash en
   subprocessen.

   Bron: *Token-efficient AI development*, dia 30, 31 en 54; examengids, domein 1, taak 1.4 en 1.5
   en domein 3, taak 3.2;
   [Anthropic, Automate actions with hooks](https://code.claude.com/docs/en/hooks-guide),
   [Anthropic, Configure permissions](https://code.claude.com/docs/en/permissions) en
   [Anthropic, Configure the sandboxed Bash tool](https://code.claude.com/docs/en/sandboxing).

10. **Onafhankelijke review expliciet maken**

   `step1/harness` beschrijft al waarom een verse context beter kan reviewen, en `step2/steering`,
   `step2/parallel` en `step3/impostor` maken duidelijk dat een mens de diff blijft lezen. Verbind
   die regels expliciet: laat gegenereerde code niet alleen reviewen in dezelfde redeneercontext
   waarin ze gemaakt is, maar start een nieuwe context. Voor grote wijzigingen kan de review worden
   opgesplitst in gerichte controles en een aparte controle van de samenhang.

   Bron: examengids, domein 4, taak 4.6.

11. **Architectuurgrenzen door de build laten bewaken**

    `step2/engineering` stipt de architectuurgrenzen kort aan (hexagonaal, `adapter/`) en
    `step2/goals` zegt dat je een controle eerst in de build inbouwt. Voeg kort toe dat belangrijke
    grenzen ook automatisch controleerbaar moeten zijn, bijvoorbeeld met ArchUnit. Dit versterkt
    het bestaande punt dat de build, en niet de agent zelf, bepaalt of het werk klaar is.

    Bron: *Token-efficient AI development*, dia 39.

12. **De relevante MCP-basis vervolledigen**

    `step1/tools` behandelt al het verschil tussen tools, resources en prompts en raadt aan alleen
    de nodige tools aan te zetten. Vul aan met duidelijke en niet-overlappende toolbeschrijvingen en
    gedeelde tegenover persoonlijke configuratie. Gedeelde MCP-servers staan in `.mcp.json` aan de
    repository-root en worden gecommit. Persoonlijke of experimentele servers staan in
    `~/.claude.json`. Secrets komen niet in deze bestanden, maar worden met syntax zoals
    `${GITHUB_TOKEN}` uit omgevingsvariabelen ingelezen. Een eigen MCP-server bouwen,
    foutcategorieën ontwerpen en productie-escalaties uitwerken gaan te ver voor deze training.

    Bron: *Token-efficient AI development*, dia 32 tot en met 33 en 54; examengids, domein 2,
    taak 2.1, 2.3 en 2.4;
    [Anthropic, Connect Claude Code to tools via MCP](https://code.claude.com/docs/en/mcp).

13. **Gegenereerde dependencies verifiëren**

    Voeg bij kwaliteit of security een korte regel toe dat een door een agent voorgestelde package,
    versie of API gecontroleerd wordt tegen de officiële registry en documentatie voordat ze aan
    het project wordt toegevoegd. Tests alleen bewijzen niet dat een dependency legitiem,
    onderhouden of de bedoelde package is.

    Bron: *Token-efficient AI development*, dia 52.

## Bestaande inhoud corrigeren

1. **MCP-tooldefinities worden niet altijd volledig vooraf geladen**

   In `step1/tools` staat nu dat elke aangesloten tool zijn volledige beschrijving en parameters
   vooraf in het contextvenster zet en daardoor op iedere beurt tokens kost. `step1/harness` herhaalt
   dat: een MCP-server halverwege aansluiten verschuift de tooldefinities bovenaan. Dat is te
   absoluut. Claude Code gebruikt standaard MCP Tool Search: alleen de toolnamen en
   serverinstructies worden bij de start geladen en de volledige schema's worden pas opgehaald
   wanneer ze nodig zijn. Met `alwaysLoad: true` op een server, met `ENABLE_TOOL_SEARCH=false` of
   via een niet-Anthropic `ANTHROPIC_BASE_URL` worden definities wel vooraf geladen. De
   Copilot-variant van de les kan correct blijven.

   De les mag nog altijd aanraden om irrelevante tools uit te schakelen, maar de reden is dan zowel
   minder keuzeruis en minder risico als mogelijk minder contextgebruik. Dezelfde absolute
   formulering staat ook in de presentatie op dia 12, 32 en 54 en moet daar op termijn genuanceerd
   worden.

   Bron: [Anthropic, MCP Tool Search](https://code.claude.com/docs/en/mcp#scale-with-mcp-tool-search).
