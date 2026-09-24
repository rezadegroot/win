/** Redactionele bron voor de lokale WIN-site. Feiten die Reza nog moet bevestigen staan hier niet in. */

type Block = Record<string, unknown>;
type Page = {
  slug: string;
  titel: string;
  metaTitel: string;
  metaOmschrijving: string;
  hero: {
    type: "homeHero" | "paginaHero" | "kopHeader";
    kop: { voor?: string; accent?: string; na?: string };
    subtitel?: string;
    introZin?: string;
    cta?: { label: string; doel: string };
    secundaireCta?: { label: string; doel: string };
    fotoNaam?: string;
  };
  layout: Block[];
};

const intro = (
  titel: string,
  teksten: string[],
  fotoNaam?: string,
  links?: [string, string][],
): Block => ({
  blockType: "introSplit",
  stijl: fotoNaam ? "homeIntro" : "gecentreerd",
  kop: { voor: titel },
  alineas: teksten.map((tekst) => ({ tekst })),
  ...(fotoNaam ? { fotoNaam } : {}),
  ...(links ? { verderLinks: links.map(([label, doel]) => ({ link: { label, doel } })) } : {}),
});
const cards = (
  titel: string,
  items: [string, string, string?, string?][],
  introZin?: string,
): Block => ({
  blockType: "kaartenGrid",
  stijl: "zonderIcoon",
  kop: { voor: titel },
  introZin,
  items: items.map(([titel, omschrijving, doel, linkLabel]) => ({
    titel,
    omschrijving,
    icoon: "geen",
    ...(doel
      ? { link: { label: linkLabel ?? `Lees meer over ${titel}`, doel } }
      : {}),
  })),
});
const cta = (
  titel: string,
  tekst: string,
  label = "Plan een kennismaking",
): Block => ({
  blockType: "ctaBand",
  stijl: "navy",
  kop: { voor: titel },
  alinea: tekst,
  cta: { label, doel: "/kennismaking" },
});
const hero = (
  titel: string,
  subtitel: string,
  fotoNaam = "nimmerdor 2.jpeg",
): Page["hero"] => ({
  type: "paginaHero",
  kop: { voor: titel },
  subtitel,
  fotoNaam,
  cta: { label: "Kennismaking", doel: "/kennismaking" },
});
const lightHero = (
  titel: string,
  introZin: string,
  ctaLabel?: string,
): Page["hero"] => ({
  type: "kopHeader",
  kop: { voor: titel },
  introZin,
  fotoNaam: "nimmerdor 9.jpeg",
  ...(ctaLabel ? { cta: { label: ctaLabel, doel: "/kennismaking" } } : {}),
});

export const services = [
  {
    naam: "Performance Training & Coaching",
    route: "/coaching",
    kaartOmschrijving:
      "Fysieke training als ingang, met coaching waar denken, voelen en handelen om aandacht vragen.",
    prijsLabel: "Vorm en investering in overleg",
    linkTekst: "Bekijk PTC",
    volgorde: 1,
  },
  {
    naam: "Mentorschap",
    route: "/mentorschap",
    kaartOmschrijving:
      "Een langere begeleidingsrelatie voor vragen die tijd, verdieping en afstemming vragen.",
    prijsLabel: "Vorm en investering in overleg",
    linkTekst: "Bekijk mentorschap",
    volgorde: 2,
  },
  {
    naam: "Consultancy",
    route: "/organisaties",
    kaartOmschrijving:
      "Voor teams en organisaties die een concrete vraag over samenwerking, begeleiding of ontwikkeling willen verkennen.",
    prijsLabel: "Op basis van de opdracht",
    linkTekst: "Bekijk consultancy",
    volgorde: 3,
  },
  {
    naam: "Workshops, clinics & events",
    route: "/workshops",
    kaartOmschrijving:
      "Een gezamenlijke leer- of oefenvorm rond een afgebakend thema. Inhoud en opzet worden afgestemd.",
    prijsLabel: "Programma en voorwaarden in overleg",
    linkTekst: "Bekijk groepsvormen",
    volgorde: 4,
  },
  {
    naam: "Opleidingen",
    route: "/opleidingen",
    kaartOmschrijving:
      "Voor professionals die de benadering van WIN willen leren kennen en verdiepen in hun eigen werk.",
    prijsLabel: "Programma en voorwaarden op aanvraag",
    linkTekst: "Bekijk opleidingen",
    volgorde: 5,
  },
] as const;

export const pages: Page[] = [
  {
    slug: "home",
    titel: "Home",
    metaTitel: "Lijf & Brein in lijn | WIN Instituut",
    metaOmschrijving:
      "WIN Instituut verbindt fysieke, mentale, sociale en emotionele ontwikkeling. Ontdek de methodologie, vijf diensten en een passende kennismaking.",
    hero: {
      type: "homeHero",
      kop: { voor: "Lijf & Brein", accent: "in lijn" },
      subtitel: "WIN Instituut",
      introZin:
        "Ruimte om te voelen wat er speelt, te begrijpen wat je nodig hebt en van daaruit te handelen.",
      fotoNaam: "nimmerdor 2.jpeg",
      cta: { label: "Ontdek het aanbod", doel: "/aanbod" },
      secundaireCta: { label: "Hoe WIN werkt", doel: "/methodiek" },
    },
    layout: [
      intro(
        "Denken, voelen en doen horen bij elkaar",
        [
          "Soms vertelt je lichaam iets anders dan je hoofd. Of weet je wat je wilt veranderen, maar lukt het nog niet om ernaar te handelen. Bij WIN onderzoeken we die samenhang, zonder je terug te brengen tot één klacht of rol.",
          "Reza werkt met wat je meebrengt: je lichaam, gedachten, emoties en de mensen om je heen. De vorm van begeleiding volgt de vraag, niet andersom.",
        ],
        "nimmerdor 12.jpeg",
      ),
      cards(
        "Vier kanten van één geheel",
        [
          [
            "Fysiek",
            "Wat merk je in energie, beweging, ademhaling en belasting?",
          ],
          ["Mentaal", "Welke gedachten, keuzes en patronen spelen mee?"],
          ["Sociaal", "Hoe verhoud je je tot anderen, je werk en je omgeving?"],
          [
            "Emotioneel",
            "Wat voel je, en welke ruimte krijgt dat in je handelen?",
          ],
        ],
        "Lijf & Brein in lijn betekent dat deze vier kanten aandacht krijgen in samenhang.",
      ),
      intro("Een passende ingang", [
        "Je hoeft vooraf niet te weten welke vorm precies past. Op de aanbodpagina zie je het verschil tussen training & coaching, mentorschap, consultancy, groepsvormen en opleidingen.",
      ]),
      { blockType: "dienstenKaarten" },
      cta(
        "Begin met een gesprek",
        "In 25 minuten onderzoeken we je vraag en welke vervolgstap passend kan zijn. Je beslist zelf of je daarna verder wilt.",
      ),
    ],
  },
  {
    slug: "methodiek",
    titel: "Methodiek",
    metaTitel: "De WIN Methodologie | WIN Instituut",
    metaOmschrijving:
      "De WIN Methodologie verbindt lichaam en brein, individuele ervaring en context. Lees hoe Reza integratief, psychofysiek en systemisch werkt.",
    hero: hero(
      "De WIN Methodologie",
      "Lijf & Brein in lijn is het vertrekpunt: aandacht voor wat je voelt, denkt, doet en meemaakt.",
      "nimmerdor 3.jpeg",
    ),
    layout: [
      intro("Eerst begrijpen wat er speelt", [
        "Bij WIN kijken we naar de hele situatie. Wat gebeurt er in je lichaam? Welke gedachten en gevoelens komen op? Wat speelt er in je relaties, werk of omgeving? Die vragen helpen om een passende ingang te vinden.",
      ]),
      cards("Vier dimensies die elkaar beïnvloeden", [
        [
          "Fysiek",
          "Het lichaam geeft signalen over spanning, energie en ruimte.",
        ],
        [
          "Mentaal",
          "Gedachten en overtuigingen beïnvloeden wat je opmerkt en kiest.",
        ],
        [
          "Sociaal",
          "Contact, rollen en verwachtingen maken deel uit van je situatie.",
        ],
        [
          "Emotioneel",
          "Gevoelens kunnen richting geven wanneer ze aandacht krijgen.",
        ],
      ]),
      cards("Hoe dat in de praktijk werkt", [
        [
          "Integratief",
          "We verbinden inzichten en werkvormen die passen bij de vraag, in plaats van één vaste techniek op iedereen toe te passen.",
        ],
        [
          "Psychofysiek",
          "Gesprek en lichamelijke ervaring kunnen elkaar aanvullen. Soms wordt iets pas duidelijk wanneer je het in beweging merkt.",
        ],
        [
          "Systemisch",
          "We kijken ook naar de omgeving en relaties waarin gedrag betekenis krijgt.",
        ],
      ]),
      intro("Geen vast stappenplan voor iedereen", [
        "De WIN Methodologie is een manier van kijken en werken. Welke oefeningen of gesprekken zinvol zijn, bepalen we samen vanuit je vraag en grenzen.",
      ], undefined, [["Bekijk de vijf vormen", "/aanbod"]]),
      cta(
        "Onderzoek je vraag met Reza",
        "Een kennismaking helpt om te bepalen welke begeleiding, als die passend is, bij jouw situatie aansluit.",
      ),
    ],
  },
  {
    slug: "aanbod",
    titel: "Aanbod",
    metaTitel: "Vijf manieren om met WIN te werken | WIN Instituut",
    metaOmschrijving:
      "Vergelijk Performance Training & Coaching, Mentorschap, Consultancy, Workshops/Clinics/Events en Opleidingen. Kies een passende eerste stap.",
    hero: lightHero(
      "Welke vorm past bij jouw vraag?",
      "Vijf verschillende ingangen. Je hoeft niet vooraf precies te weten welke bij je past.",
    ),
    layout: [
      { blockType: "dienstenKaarten" },
      cards("Zo maak je een eerste keuze", [
        [
          "Ik wil zelf aan de slag",
          "PTC begint bij trainen en kan coaching verbinden aan wat je tijdens het oefenen merkt.",
        ],
        [
          "Ik zoek verdieping over tijd",
          "Mentorschap geeft ruimte aan een bredere vraag en een langer gesprek.",
        ],
        [
          "Het gaat om meer mensen",
          "Consultancy richt zich op een organisatievraag; een workshop of clinic is een gezamenlijke leer- of oefenvorm.",
        ],
        [
          "Ik wil de benadering leren",
          "Opleidingen zijn bedoeld voor professionals die WIN’s werkwijze willen verkennen of verdiepen.",
        ],
      ]),
      cta(
        "Nog niet zeker?",
        "In een gesprek kun je je vraag voorleggen. Een kennismaking verplicht je niet om een traject te beginnen.",
      ),
    ],
  },
  {
    slug: "coaching",
    titel: "Performance Training & Coaching",
    metaTitel: "Performance Training & Coaching | WIN",
    metaOmschrijving:
      "Ontdek hoe fysieke training en coaching bij WIN samen kunnen komen. Lees voor wie PTC bedoeld is en hoe een eerste gesprek werkt.",
    hero: hero(
      "Performance Training & Coaching",
      "Training is de ingang. Wat je daarin ervaart, kan helpen om ook buiten de training anders te handelen.",
      "nimmerdor 6.jpeg",
    ),
    layout: [
      intro("Bewegen maakt zichtbaar", [
        "In een training merk je concreet wat inspanning, grenzen, aandacht en herstel met je doen. Dat kan via kracht, conditie, mobiliteit, kickboksen of ademhaling, afhankelijk van je doel en belastbaarheid. Reza verbindt die ervaring waar passend aan gesprek en reflectie.",
      ]),
      cards("Wat je kunt verwachten", [
        [
          "Een fysieke ingang",
          "Training wordt afgestemd op je mogelijkheden, doelen en grenzen.",
        ],
        [
          "Ruimte voor reflectie",
          "We bespreken wat je opmerkt en wat daarvan relevant is in je dagelijks leven.",
        ],
        [
          "Afstemming onderweg",
          "De vorm en intensiteit hangen af van je vraag en worden samen besproken.",
        ],
      ]),
      intro("Past PTC bij jou?", [
        "PTC past wanneer je via beweging wilt onderzoeken hoe je omgaat met belasting, keuzes of verandering. Zoek je vooral een langere begeleidingsrelatie, dan kan mentorschap beter passen. Gaat je vraag over een team of organisatie, dan is consultancy een mogelijke ingang.",
      ], undefined, [["Bekijk mentorschap", "/mentorschap"], ["Bekijk consultancy", "/organisaties"]]),
      cta(
        "Bespreek je vraag",
        "In een kennismaking onderzoeken we of deze ingang past en hoe een vervolg eruit zou kunnen zien.",
      ),
    ],
  },
  {
    slug: "mentorschap",
    titel: "Mentorschap",
    metaTitel: "Mentorschap met Reza | WIN Instituut",
    metaOmschrijving:
      "Mentorschap bij WIN biedt ruimte voor een bredere vraag en begeleiding over tijd. Lees wat de rol van Reza kan zijn en hoe je begint.",
    hero: hero(
      "Mentorschap",
      "Voor een vraag die meer tijd, aandacht en samenhang vraagt.",
      "nimmerdor 9.jpeg",
    ),
    layout: [
      intro("Een gesprek dat mag verdiepen", [
        "Sommige vragen raken werk, lichaam, relaties en richting tegelijk. Mentorschap biedt ruimte om die verbanden te onderzoeken: bijvoorbeeld hoe je een grens opmerkt, aangeeft en vasthoudt in contact met anderen. Reza denkt mee, stelt vragen en kan waar passend ervaringsgericht werken. Jij houdt regie over de keuzes die volgen.",
      ]),
      cards("Wat mentorschap kan bieden", [
        [
          "Samenhang zien",
          "Niet één los symptoom, maar de context waarin je vraag speelt.",
        ],
        [
          "Oefenen en reflecteren",
          "Gesprek en ervaring kunnen elkaar aanvullen, afhankelijk van wat passend is.",
        ],
        [
          "Een relatie over tijd",
          "De duur, frequentie en voorwaarden bespreken we persoonlijk; ze zijn niet voor iedereen gelijk.",
        ],
      ]),
      intro("Wanneer een andere ingang beter past", [
        "Wil je vooral trainen, dan kan Performance Training & Coaching beter passen. Gaat het om een vraag van je team of organisatie, dan is consultancy een logischer startpunt.",
      ], undefined, [["Bekijk PTC", "/coaching"], ["Bekijk consultancy", "/organisaties"]]),
      cta(
        "Verken of mentorschap past",
        "Vertel in een kennismaking wat er speelt. Daarna kun je rustig beoordelen of deze vorm bij je past.",
      ),
    ],
  },
  {
    slug: "organisaties",
    titel: "Consultancy",
    metaTitel: "Consultancy voor organisaties | WIN",
    metaOmschrijving:
      "WIN verkent met teams en organisaties vragen rond samenwerking en ontwikkeling. Lees wat consultancy inhoudt en hoe je een opdracht bespreekt.",
    hero: lightHero(
      "Consultancy",
      "Wanneer de vraag in een team of organisatie ligt, begint het werk bij de context en de betrokkenen.",
      "Bespreek je organisatievraag",
    ),
    layout: [
      intro("Eerst de opdracht scherp krijgen", [
        "Een organisatievraag heeft zelden één perspectief. Denk aan rollen die onduidelijk zijn, afspraken die verschillend worden begrepen of gesprekken die steeds op hetzelfde punt vastlopen. We beginnen met wat je wilt begrijpen, wie erbij betrokken zijn en welke grenzen er zijn. Pas dan kan Reza voorstellen welke bijdrage WIN kan leveren.",
      ]),
      cards("Waar we samen naar kijken", [
        [
          "De vraag",
          "Wat speelt er zichtbaar, en wat blijft nog onuitgesproken?",
        ],
        [
          "De context",
          "Welke rollen, afspraken en relaties beïnvloeden de situatie?",
        ],
        [
          "De vorm",
          "Een gesprek, begeleiding of gezamenlijke oefenvorm wordt pas gekozen als het doel helder is.",
        ],
      ]),
      intro("Duidelijke afspraken horen erbij", [
        "Doel, betrokkenen, vertrouwelijkheid, planning en investering spreken we per opdracht af. Zo weet iedereen waar de samenwerking op gericht is.",
      ]),
      cta(
        "Bespreek je organisatievraag",
        "Een eerste gesprek helpt om te zien of WIN de passende gesprekspartner is.",
      ),
    ],
  },
  {
    slug: "workshops",
    titel: "Workshops, clinics & events",
    metaTitel: "Workshops, clinics & events | WIN",
    metaOmschrijving:
      "Verken groepsvormen bij WIN Instituut: workshops, clinics en events rond lichaam, brein en samenwerking. Programma en voorwaarden in overleg.",
    hero: lightHero(
      "Workshops, clinics & events",
      "Samen leren of oefenen rond een vraag die de groep bezighoudt.",
      "Bespreek een groepsvraag",
    ),
    layout: [
      intro("Een vorm die past bij het doel", [
        "Een workshop, clinic of event kan ruimte maken om een thema gezamenlijk te onderzoeken. De inhoud hangt af van de groep, het doel en de beschikbare tijd. Vraag naar de actuele mogelijkheden.",
      ]),
      cards("Drie mogelijke vormen", [
        [
          "Workshop",
          "Een afgebakend thema met uitleg, voorbeelden en gesprek. De groep onderzoekt wat daarvan in de eigen praktijk herkenbaar is.",
        ],
        [
          "Clinic",
          "Een praktische oefenvorm waarin je iets uitprobeert en daarna bespreekt wat je opmerkt. Meedoen gebeurt binnen ieders grenzen.",
        ],
        [
          "Event",
          "Een groter gezamenlijk moment dat kennismaking, demonstratie en gesprek kan verbinden. Doel en opzet spreken we vooraf af.",
        ],
      ]),
      intro("Wat we vooraf afspreken", [
        "Voor wie is de bijeenkomst? Wat moet zij mogelijk maken? Welke fysieke of persoonlijke grenzen spelen mee? Pas met die informatie kunnen programma, begeleiding en voorwaarden concreet worden.",
      ]),
      cta(
        "Bespreek een groepsvraag",
        "Vertel wat je voor ogen hebt. We bekijken of WIN daarbij past en welke vorm zinvol kan zijn.",
      ),
    ],
  },
  {
    slug: "opleidingen",
    titel: "Opleidingen",
    metaTitel: "Opleidingen bij WIN Instituut",
    metaOmschrijving:
      "Leer de integratieve, psychofysieke en systemische benadering van WIN kennen. Vraag het actuele programma, de voorwaarden en eventuele erkenning op.",
    hero: lightHero(
      "Opleidingen",
      "Voor professionals die de benadering van WIN willen leren kennen en toepassen in hun werk.",
      "Stel je leervraag",
    ),
    layout: [
      intro("Leren met hoofd én lichaam", [
        "WIN verbindt begrippen met ervaring. Een leervraag kan gaan over lichamelijke signalen herkennen, grenzen in contact bespreekbaar maken of patronen in hun context zien. Vraag bij het actuele programma hoe uitleg, oefening en reflectie daarin samenkomen.",
      ]),
      cards("Vragen die je vooraf mag stellen", [
        [
          "Inhoud en niveau",
          "Welke thema’s komen aan bod, en welke voorkennis is nodig?",
        ],
        [
          "Werkvorm en begeleiding",
          "Hoe zijn uitleg, oefening, reflectie en feedback verdeeld?",
        ],
        [
          "Formele waarde",
          "Vraag het actuele programma en de eventuele erkenning of certificering schriftelijk op voordat je beslist.",
        ],
      ]),
      intro("Actuele gegevens op aanvraag", [
        "Vraag naar het programma, de startdata, duur, investering en eventuele formele erkenning. We bespreken deze gegevens voordat je kiest.",
      ]),
      cta(
        "Vraag naar de opleiding",
        "Vertel wat je wilt leren en in welke praktijk je werkt. Dan kan Reza aangeven welke informatie of vervolgstap passend is.",
      ),
    ],
  },
  {
    slug: "wininstituut",
    titel: "Over WIN",
    metaTitel: "Over Reza en WIN Instituut",
    metaOmschrijving:
      "Maak kennis met Reza de Groot en de visie van WIN Instituut: Lijf & Brein in lijn, met aandacht voor de fysieke, mentale, sociale en emotionele kant.",
    hero: hero(
      "Over Reza en WIN",
      "Een plek waar lichaam, denken, voelen en omgeving samen mogen komen.",
      "nimmerdor 11.jpeg",
    ),
    layout: [
      intro(
        "Reza de Groot",
        [
          "Reza is het gezicht van WIN. In zijn werk verbindt hij gesprek, beweging en aandacht voor de context van iemand. Hij kijkt niet alleen naar wat iemand wil bereiken, maar ook naar wat er onderweg voelbaar en haalbaar is.",
        ],
        "nimmerdor 12.jpeg",
      ),
      intro("De gedachte achter WIN", [
        "Lijf & Brein in lijn betekent dat ontwikkeling niet in één deel van een mens plaatsvindt. Fysieke, mentale, sociale en emotionele ervaringen beïnvloeden elkaar. De WIN Methodologie helpt om die samenhang zorgvuldig te onderzoeken.",
      ]),
      cards("Waar je op kunt rekenen", [
        [
          "Een open gesprek",
          "We beginnen bij je vraag en luisteren voordat we een vorm kiezen.",
        ],
        [
          "Aandacht voor grenzen",
          "Werkvormen worden afgestemd op wat past en wat je zelf wilt.",
        ],
        [
          "Heldere afspraken",
          "Een eventueel vervolg vraagt een eigen keuze en concrete voorwaarden.",
        ],
      ]),
      cta(
        "Leer Reza kennen",
        "Een kennismaking geeft ruimte om te voelen of zijn manier van werken bij je past.",
      ),
    ],
  },
  {
    slug: "weerbaarheidsmentor",
    titel: "De Weerbaarheidsmentor",
    metaTitel: "De Weerbaarheidsmentor | WIN",
    metaOmschrijving:
      "Lees over Reza’s rol als weerbaarheidsmentor en hoe die zich verhoudt tot de bredere WIN Methodologie en het mentorschap.",
    hero: hero(
      "De Weerbaarheidsmentor",
      "Reza’s rol begint bij aandacht voor de mens en diens context.",
      "nimmerdor 8.jpeg",
    ),
    layout: [
      intro("Een rol, geen vast pakket", [
        "De naam Weerbaarheidsmentor beschrijft Reza’s manier van begeleiden: betrokken, onderzoekend en met aandacht voor wat iemand in lichaam, denken en relaties ervaart. Welke dienst past, volgt uit je vraag.",
      ]),
      cards("Verder lezen", [
        [
          "Over Reza en WIN",
          "Lees waar WIN voor staat en hoe Reza werkt.",
          "/wininstituut",
          "Lees over Reza en WIN",
        ],
        [
          "Mentorschap",
          "Verken de langere begeleidingsrelatie.",
          "/mentorschap",
          "Bekijk mentorschap",
        ],
        [
          "Methodiek",
          "Begrijp de samenhang achter Lijf & Brein in lijn.",
          "/methodiek",
          "Lees de methodologie",
        ],
      ]),
      cta(
        "Leg je vraag voor",
        "Samen verkennen we welke ingang passend kan zijn.",
      ),
    ],
  },
  {
    slug: "kennisinstituut",
    titel: "Kennisinstituut",
    metaTitel: "Kennis en leren bij WIN Instituut",
    metaOmschrijving:
      "Verdiep je in de WIN Methodologie en verken de opleidingsmogelijkheden voor professionals. Actuele programma’s en erkenning op aanvraag.",
    hero: lightHero(
      "Kennis en leren",
      "Begrijpen, ervaren en zorgvuldig toepassen.",
    ),
    layout: [
      intro("Van inzicht naar praktijk", [
        "WIN deelt kennis over de samenhang tussen fysieke, mentale, sociale en emotionele ontwikkeling. Begrippen krijgen pas waarde als helder is hoe je ze in een echte situatie zorgvuldig toepast.",
      ]),
      cards("De werkwijze of de opleiding?", [
        [
          "De methodologie",
          "Lees hoe WIN integratief, psychofysiek en systemisch kijkt.",
          "/methodiek",
          "Lees de methodologie",
        ],
        [
          "Opleidingen",
          "Verken de leerroute en vraag naar actuele inhoud en voorwaarden.",
          "/opleidingen",
          "Bekijk opleidingen",
        ],
      ]),
      cta(
        "Stel je leervraag",
        "Reza kan helpen bepalen welke informatie voor jouw werk relevant is.",
      ),
    ],
  },
  {
    slug: "ontwikkellijn",
    titel: "Ontwikkellijn",
    metaTitel: "Ontwikkeling bij WIN Instituut",
    metaOmschrijving:
      "WIN kijkt naar ontwikkeling in samenhang. Lees hoe aandacht voor lichaam, denken, emoties en omgeving helpt om een passende volgende stap te kiezen.",
    hero: lightHero(
      "Ontwikkeling is geen rechte lijn",
      "Wat aandacht vraagt, verschilt per mens en per moment.",
    ),
    layout: [
      intro("Begin waar je bent", [
        "Ontwikkeling laat zich niet voor iedereen in dezelfde fasen vangen. Soms is eerst rust nodig, soms oefening, inzicht of een gesprek met de mensen om je heen. WIN onderzoekt samen met jou wat nu betekenisvol is.",
      ]),
      cards("Vragen die richting geven", [
        [
          "Wat merk je?",
          "In je lichaam, gedachten, gevoel en dagelijks handelen.",
        ],
        [
          "Wat speelt er om je heen?",
          "Relaties, verwachtingen en omstandigheden horen bij het verhaal.",
        ],
        [
          "Wat is een haalbare stap?",
          "Een passende stap is concreet, vrijwillig en afgestemd op je situatie.",
        ],
      ]),
      cta(
        "Verken je volgende stap",
        "Een kennismaking is een rustige plek om te beginnen.",
      ),
    ],
  },
  {
    slug: "kennismaking",
    titel: "Kennismaking",
    metaTitel: "Kennismaking met Reza | WIN Instituut",
    metaOmschrijving:
      "Een gesprek van 25 minuten met Reza om je vraag en een passende vervolgstap te verkennen. Lees wat je kunt verwachten en hoe plannen werkt.",
    hero: {
      type: "kopHeader",
      kop: { voor: "Kennismaking met Reza" },
      introZin:
        "Een gesprek van 25 minuten om je vraag te verkennen. Daarna beslis jij of je verder wilt.",
      fotoNaam: "nimmerdor 9.jpeg",
    },
    layout: [
      {
        blockType: "calloutBand",
        kop: { voor: "Plan je gesprek" },
        alinea:
          "De afspraak loopt via Reza’s Calendly-agenda. Je ziet daar de beschikbare tijden en welke gegevens voor het plannen worden gevraagd.",
        knopLabel: "Bekijk beschikbare tijden",
        externeUrl: "https://calendly.com/rezadegroot/25min",
      },
      intro("Wat gebeurt er in dit gesprek?", [
        "Je vertelt wat je bezighoudt en wat je zoekt. Reza luistert, stelt vragen en licht toe welke vorm van begeleiding eventueel passend kan zijn. Je hoeft je verhaal niet vooraf volledig te kunnen uitleggen.",
      ]),
      cards("Vooraf helder", [
        ["Duur", "Het gesprek duurt 25 minuten."],
        ["Jouw keuze", "Een kennismaking verplicht je niet tot een vervolg."],
        [
          "Een passend vervolg",
          "Als jullie verder willen praten, maken jullie eerst duidelijke afspraken over vorm en investering.",
        ],
      ]),
    ],
  },
];
