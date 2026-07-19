# **Technisch Ontwerp – BrouwApp** 

# **1. Doel en Scope** 

Dit technisch ontwerp beschrijft de volledige technische structuur van de BrouwApp. Het vormt de basis voor implementatie in GitHub Spark en omvat architectuur, ‑ ‑ ‑ datamodellen, API ontwerp, offline functionaliteit, berekeningen, AI integratie en niet‑functionele eisen. 

De applicatie ondersteunt hobbybrouwers tijdens het ontwerpen, beheren, brouwen en analyseren van bierrecepten. Zoals in het functioneel ontwerp staat: “De applicatie ondersteunt hobbybrouwers bij het ontwikkelen, beheren, brouwen en evalueren van bierrecepten.” 

# **2. Architectuur** 

# **2.1 Architectuurstijl** 

- Modulair, domeingedreven ontwerp (Domain Driven Design). 

- Scheiding tussen: 

   - Presentatielaag (UI) 

   - Applicatielaag (services, use‑cases) 

   - Domeinlaag (entiteiten, business rules) 

   - Infrastructuurlaag (database, API, offline opslag) 

# **2.2 Hoofdprincipes** 

- Recept = ontwerp 

- Brouwsessie = uitvoering 

- Bibliotheken = kennisbron 

- Receptversies zijn immutable 

- Offline-first PWA 

- Automatische synchronisatie bij reconnect 

- AI geeft advies, maar neemt geen beslissingen 

# **3. Technisch Platform** 

# **3.1 Frontend** 

- React (TypeScript) 

- Vite als buildtool 

- React Router voor navigatie 

- Zustand of Redux Toolkit voor state management 

- IndexedDB voor offline opslag 

- Service Worker voor caching en PWA-functionaliteit 

# **3.2 Backend** 

- Node.js (TypeScript) 

- NestJS of Express 

- PostgreSQL database 

- Prisma ORM 

- REST API (JSON) 

# **3.3 AI‑integratie** 

- Externe LLM via API 

- Contextlaag die recept-, sessie- en meetgegevens omzet naar prompts 

- Privacyfilter om persoonsgegevens te verwijderen 

# **4. Module‑indeling** 

De applicatie bestaat uit de volgende modules: 

- Ingrediëntenbibliotheek 

- Brouwmethoden 

- Receptbeheer 

- Brouwsessies 

- Berekeningen 

- Dashboard 

- Rapportages 

- AI‑assistent 

- Instellingen en gebruikersbeheer 

# **5. Gegevensmodel** 

# **5.1 Domeinmodellen** 

# **Recept** 

- id 

- naam 

- stijl 

- status 

- beschrijving 

- versies[] 

# **ReceptVersie** 

- id 

- receptId 

- versieNummer 

- batchGrootte 

- ingrediënten[] 

- processtappen[] 

- verwachteResultaten 

- status 

Zoals in het functioneel ontwerp staat: “Receptversies zijn na creatie onveranderbaar.” 

# **Processtap** 

- id 

- naam 

- volgorde 

- instructie 

- parameters 

- checklist 

- receptnotities 

- verwachtResultaat 

# **Checklist** 

- id 

- processtapId 

- items[] 

# **ChecklistItem** 

- id 

- omschrijving 

- volgorde 

- verplicht 

- parameterRef? 

- ingrediëntRef? 

- meetpuntDefinitieRef? 

# **MeetpuntDefinitie** 

- id 

- type 

- eenheid 

- verplicht 

- toelichting? 

# **Brouwsessie** 

- id 

- receptVersieId 

- status 

- startDatum 

- eindDatum 

- meetpuntregistraties[] 

- opmerkingen 

# **MeetpuntRegistratie** 

- id 

- sessieId 

- meetpuntDefinitieId? 

- waarde 

- datumTijd 

- notitie? 

# **Ingrediënt** 

- id 

- type 

- naam 

- leverancier? 

- beschrijving? 

- actief 

- favoriet 

- eigenschappen (type-specifiek) 

# **Brouwmethode** 

- id 

- naam 

- processtappen[] 

# **6. Database‑schema** 

# **6.1 Tabellen** 

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

# **6.2 Relaties** 

- Eén recept heeft meerdere receptversies 

- Eén receptversie heeft meerdere processtappen 

- Eén processtap heeft één checklist 

- Eén checklist heeft meerdere checklistitems 

- Eén brouwsessie heeft meerdere meetpuntregistraties 

# **7. API‑ontwerp** 

# **7.1 REST‑endpoints** 

**Ingrediëntenbibliotheek** GET /ingredients POST /ingredients PUT /ingredients/{id} DELETE /ingredients/{id} 

**Brouwmethoden** GET /brew-methods POST /brew-methods PUT /brew-methods/{id} DELETE /brew-methods/{id} 

**Receptbeheer** GET /recipes POST /recipes POST /recipes/{id}/versions GET /recipes/{id}/versions 

**Brouwsessies** POST /sessions GET /sessions GET /sessions/{id} POST /sessions/{id}/measurements POST /sessions/{id}/complete 

**Berekeningen** POST /calculations/recipe POST /calculations/session 

**AI‑assistent** POST /ai/advise/recipe POST /ai/advise/session POST /ai/chat 

# **8. Frontend UI‑ontwerp** 

# **8.1 Navigatiestructuur** 

- Dashboard 

- Recepten 

- Brouwsessies 

- Ingrediënten 

- Brouwmethoden 

- Rapportages 

- AI‑assistent 

- Instellingen 

# **8.2 Schermtypen** 

- Lijstscherm 

- Detailscherm 

- Bewerkscherm 

- Processcherm (voor actieve brouwsessies) 

# **8.3 UI‑componenten** 

- Informatieblok 

- Actiebalk 

- Zoekbalk 

- Filterpaneel 

- Tabel/Lijst 

- Checklist 

- Meetpuntkaart 

- Notitieblok 

- Voortgangsbalk 

- Meldingen 

- AI‑paneel 

# **9. Offline & Synchronisatie** 

# **9.1 Offline strategie** 

- IndexedDB voor lokale opslag 

- Service Worker voor caching 

- Sync‑queue voor wijzigingen tijdens offline gebruik 

- Automatische synchronisatie bij reconnect 

# **9.2 Sync‑mechanisme** 

- Elke wijziging krijgt een syncStatus (pending, synced, failed) 

- Batch‑sync naar backend 

- Conflictstrategie: server-first met logging 

# **10. Berekeningen** 

# **10.1 Berekeningsmodule** 

- OG 

- FG 

- ABV 

- IBU 

- EBC 

- Brouwrendement 

# **10.2 Herleidbaarheid** 

- Alle berekeningen loggen inputparameters 

- Handmatige overschrijving mogelijk 

- Berekeningen wijzigen nooit invoerwaarden 

# **11. AI‑assistent** 

# **11.1 Architectuur** 

- AI‑orchestrator service 

- Contextlaag voor recept-, sessie- en meetgegevens 

- Privacyfilter 

# **11.2 Use‑cases** 

- Receptadvies 

- Processtapadvies 

- Vergistingsanalyse 

- Historische vergelijkingen 

- Chatfunctie 

# **12. Beveiliging en Privacy** 

# **12.1 Authenticatie** 

- JWT‑based 

- Rollen: user, admin 

# **12.2 Privacy** 

- Minimale opslag van persoonsgegevens 

- AI‑ prompts zonder identificerende gegevens 

# **13. Niet‑functionele eisen** 

- PWA 

- Offline-first 

- Automatische opslag 

- Hoge performance 

- Uitbreidbare architectuur 

- Consistente UI 

- Schaalbare backend 

# **14. Richtlijnen voor GitHub Spark** 

# **‑ 14.1 Structuur van Spark prompts** 

1. Context 

2. Randvoorwaarden 

3. Opdracht 

4. Functionele bron (stuk uit jouw document) 

