# **1. Architectuurstijl** 

# **Domeingedreven architectuur (DDD)** 

De applicatie is opgebouwd rond de domeinconcepten uit het functioneel ontwerp: Recept, ReceptVersie, Brouwsessie, Ingrediënt, Brouwmethoden, Checklist, MeetpuntDefinitie. Deze keuze sluit aan op het principe uit het functioneel ontwerp: “De applicatie maakt een strikte scheiding tussen definitie (het geplande recept) en uitvoering (de daadwerkelijke brouwsessie).” 

**Modulaire architectuur** Elke module (Ingrediënten, Recepten, Brouwsessies, AI, Berekeningen) is logisch gescheiden en kan onafhankelijk worden uitgebreid. 

**Layered architecture** De applicatie bestaat uit vier lagen: 

- Presentatielaag (UI) 

- Applicatielaag (services, use‑cases) 

- Domeinlaag (entiteiten, business rules) 

- Infrastructuurlaag (database, API, offline opslag) 

# **2. Frontendarchitectuur** 

# **Technologie:** 

- React 

- TypeScript 

- Vite 

- React Router 

- Zustand (state management) 

- IndexedDB (offline opslag) 

- Service Worker (PWA + caching) 

# **Reden voor deze keuze:** 

- React is ideaal voor modulaire UI‑componenten zoals checklist, meetpuntkaart, processtappen. 

- TypeScript zorgt voor type‑veiligheid in complexe domeinmodellen. 

- IndexedDB ondersteunt offline brouwsessies, zoals vereist: “De applicatie ondersteunt offline werken tijdens een brouwsessie.” 

- Zustand is lichtgewicht en past perfect bij een domeingedreven state‑structuur. 

# **Frontend structuur:** 

- Feature‑modules per domein 

- Shared UI‑componenten 

- Services voor API‑communicatie 

- Offline‑sync‑queue 

- Berekeningen als pure functions 

# **3. Backendarchitectuur** 

# **Technologie:** 

- Node.js 

- NestJS (voorkeur) of Express 

- TypeScript 

- PostgreSQL 

- Prisma ORM 

- REST API 

# **Waarom NestJS?** 

- Sterke module‑structuur 

- Uitstekend voor DDD 

- Makkelijk te testen 

- Helder service‑ en controller‑model 

**API‑stijl:** REST, omdat dit het eenvoudigst te genereren is in GitHub Spark en perfect aansluit op de PWA. 

# **4. Databasearchitectuur** 

**Database:** PostgreSQL **ORM:** Prisma 

# **Waarom PostgreSQL?** 

- Sterk in relationele structuren zoals Recept → ReceptVersie → Processtap → ChecklistItem 

- Ondersteunt JSON‑ velden voor flexibele eigenschappen (bijv. 

- ‑ 

- ingrediënt eigenschappen) 

# **Belangrijkste tabellen:** 

- users 

- ingredients 

- ingredient_properties 

- brew_methods 

- recipes 

- recipe_versions 

- process_steps 

- checklists 

- checklist_items 

- measurement_definitions 

- brew_sessions 

- measurements 

# **‑architectuur 5. Offline** 

# **Offline-first strategie:** 

- IndexedDB voor lokale opslag 

- Service Worker voor caching 

- Sync‑queue voor wijzigingen 

- Conflictstrategie: server-first met logging 

**Waarom deze keuze?** Tijdens brouwen is internet niet gegarandeerd. Het functioneel ontwerp zegt: “De applicatie ondersteunt offline gebruik en synchroniseert gegevens zodra een internetverbinding beschikbaar is.” 

# **Sync‑mechanisme:** 

- Elke wijziging krijgt een syncStatus (pending, synced, failed) 

- Batch‑sync bij reconnect 

- Conflicten worden gelogd en gemarkeerd 

# **6. Berekeningenarchitectuur** 

# **Berekeningen als aparte module** 

- Pure functions 

- Geen afhankelijkheid van UI of API 

- Herleidbaar en overschrijfbaar 

# **Voorbeelden:** 

- OG 

- FG 

- ABV 

- IBU 

- EBC 

- Brouwrendement 

# **Waarom apart?** 

- GitHub Spark kan deze module volledig genereren 

- Berekeningen worden op meerdere plekken gebruikt (recept, sessie, rapportages) 

# **7. AI‑architectuur** 

# **AI‑orchestratorlaag** 

- Verzamelt context (recept, sessie, meetpunten, historie) 

- Vormt prompts 

- Roept externe LLM aan 

- Filtert persoonsgegevens 

- Geeft advies maar neemt geen beslissingen 

# **AI‑use‑cases:** 

- Receptontwikkeling 

- Processtapadvies 

- Vergistingsanalyse 

- Historische vergelijkingen 

- Chatfunctie 

# **‑ Waarom een aparte AI laag?** 

- Houdt domeinlogica gescheiden van AI‑logica 

- Maakt het systeem uitbreidbaar 

- Voorkomt dat AI direct toegang heeft tot ruwe data 

# **8. Securityarchitectuur** 

# **Authenticatie:** 

- JWT 

- Refresh tokens 

- Secure cookie (optioneel) 

# **Autorisatie:** 

- Rollen: user, admin 

- Admin beheert globale bibliotheken en instellingen 

# **Privacy:** 

- Minimale opslag van persoonsgegevens 

- AI‑ prompts bevatten geen identificerende gegevens 

# **9. Niet‑functionele architectuurkeuzes** 

# **Performance:** 

- Lazy loading van modules 

- IndexedDB caching 

- Server-side pagination voor grote lijsten 

# **Schaalbaarheid:** 

- Backend is stateless 

- Horizontale schaalbaarheid via containerisatie 

- Database kan worden opgeschaald via connection pooling 

# **Onderhoudbaarheid:** 

- Strikte module‑scheiding 

- TypeScript voor type‑veiligheid 

- DDD voor domeinconsistentie 

- Testbare services 

# **10. Waarom deze architectuur perfect werkt met GitHub Spark** 

GitHub Spark genereert het beste resultaat wanneer: 

- modules duidelijk gescheiden zijn 

- domeinmodellen helder gedefinieerd zijn 

- API‑structuur voorspelbaar is 

- frontend en backend beide TypeScript gebruiken 

- berekeningen in pure functions staan 

- prompts per module worden aangeleverd 

Deze architectuur voldoet aan al deze voorwaarden. 

