# ANALISI PROGETTI PORTFOLIO

Documento completo con analisi tecnica e business case per ogni progetto.

---

# 1. COCKTAIL AI

## OVERVIEW
Piattaforma AI per mixology con due workspace separati: Personal (per appassionati) e Bar (per gestori locali).

**URL**: https://cocktail-ai.pages.dev
**Stack**: React, TypeScript, Supabase, Claude AI, Cloudflare

---

## ANALISI TECNICA

### Cos'è
Cocktail AI è una piattaforma basata su AI che fornisce assistenza intelligente per due categorie di utenti:
1. **Personal Workspace** - Per appassionati, hobbisti, bartender privati
2. **Bar/Organization Workspace** - Per professionisti, bar, ristoranti

### PERSONAL WORKSPACE

#### Cosa puoi fare:
- Chiedere ricette ("come si fa un Negroni?")
- Imparare tecniche di bartending
- Esplorare 3000+ spirit con profili aromatici
- Mandare foto di bottiglie per identificarle (Vision)
- Salvare ricette in collezioni
- Voice input in 9 lingue

#### Come risponde l'AI:
- Come un bartender esperto
- Formato markdown strutturato (ingredienti, preparazione, note)
- Attinge da 15+ libri di mixology (Cocktail Codex, Death & Co, Imbibe)
- Database 3000+ spirit con regione, profilo aromatico, ABV
- Ricette di bar famosi (World's Best Bars)
- Web search real-time (Perplexity) per info aggiornate

#### Modalità AI:
1. **Beverage Assistant** - Consigli cocktail, ricette
2. **Price Analyzer** - Analisi prezzi spirit
3. **Master Distiller** - Distillazione e produzione
4. **Food Pairing** - Abbinamenti cibo-bevanda

#### RAG (Knowledge Base):
- **15+ libri** indicizzati con embeddings (OpenAI)
- **3000+ spirit** con metadata (categoria, regione, flavor profile)
- **Ricette bar famosi** (Death & Co, Savoy, etc.)
- **Chunking:** ~1500 chars per chunk
- **Retrieval:** 6-12 chunks per query (in base al piano)

### BAR WORKSPACE

#### A. Stock Management
**Dashboard:**
- Lista prodotti per categoria (spirits, liquori, mixer, garnish, food, supplies)
- Quantità corrente, min/max alert
- Costo per prodotto
- Ordinamento e filtri
- Paginazione (10 items/page)

**Operazioni:**
- Aggiungi/rimuovi prodotti
- Aggiorna quantità (inline edit)
- Imposta alert stock basso
- Traccia costo unitario
- Supporta più formati (750ml vs 1L)

**AI Stock Assistant:**
- "Quali prodotti sono sotto stock?" → Lista alert
- "Cosa devo ordinare?" → Suggerimenti smart
- "Analizza i consumi" → Trend analysis
- "Aggiungi 3 bottiglie di Tanqueray" → Comando vocale

#### B. Menu Management
**Funzionalità:**
- Crea drink con ricetta completa
- Link ingredienti dal database stock
- **Calcolo automatico costo** = somma costi ingredienti
- **Margine di profitto** per ogni drink
- Liste menu (Classici, Signature, Estate...)
- QR code per menu digitale pubblico

**AI Menu Assistant:**
- "Crea un Mojito a 12€" → Genera ricetta + calcola costo + inserisce
- "Qual è il margine del Negroni?" → Analisi profittabilità
- "Crea menu stagionale" → Suggerimenti AI basati su stock disponibile

#### C. POS Integration (14 Provider)
**Supportati:** SumUp (iPad + Cloud), Stripe Terminal, Square, Adyen, Axerve, MyPos, Nexi, Revolut, Satispay, Zettle, Worldline, Custom Webhooks

**Come funziona:**
1. Transazione su POS → Webhook al sistema
2. Sistema identifica menu_item dal pos_code
3. **Riduce automaticamente lo stock** (ingredienti della ricetta)
4. Registra transazione in `pos_transactions`
5. Aggiorna analytics vendite

#### D. Business Analytics
**Documenti supportati:** PDF, Excel, Word, Fatture (OCR)

**Analytics disponibili:**
- Revenue trend (giornaliero, mensile, trimestrale)
- Top selling items
- Margine per categoria
- Costo ingredienti trending
- Breakeven analysis

**AI Business Consultant:**
- "Quale fornitore è più conveniente?"
- "Analizza i consumi di febbraio"
- "Come riduco i costi?"

#### E. Open Banking (PSD2)
- Provider: Tink
- Collega conto bancario
- Sincronizza transazioni automaticamente
- Auto-riconcilia con fatture

#### F. Team Management
**Ruoli:** Owner, Admin, Manager, Member, Viewer

### DATABASE (Supabase PostgreSQL)

**Tabelle principali:**
- `organizations` - Bar/distillery info
- `organization_members` - Team con ruoli
- `products` - Inventario (3000+ spirit)
- `stock_levels` - Quantità correnti
- `stock_movements` - Audit trail movimenti
- `menu_items` - Drink e food
- `menu_lists` - Liste menu
- `recipe_ingredients` - Ricette con quantità
- `pos_configurations` - Setup POS
- `pos_transactions` - Transazioni
- `pos_product_mappings` - Mapping POS → menu
- `bank_accounts` - Conti collegati
- `bank_transactions` - Movimenti bancari
- `invoices` - Fatture
- `business_documents` - Documenti uploadati
- `conversations` - Chat history
- `messages` - Messaggi chat
- `user_billing` - Subscription e quote
- `query_logs` - Analytics query

### EDGE FUNCTIONS (40+)

**Chat & AI:**
- `chat-bot` - AI personal workspace (RAG + Vision + Billing)
- `bar-assistant` - AI bar workspace (stock/menu/business modes)
- `business-consultant` - Analisi documenti
- `recipe-ai` - Generazione ricette
- `menu-assistant` - Suggerimenti menu

**Webhooks POS (14):**
- `webhook-sumup-pos`, `webhook-sumup-cloud`
- `webhook-stripe-terminal`, `webhook-square`
- `webhook-adyen`, `webhook-axerve`, `webhook-mypos`
- `webhook-nexi`, `webhook-revolut`, `webhook-satispay`
- `webhook-zettle`, `webhook-worldline`

**Banking:**
- `open-banking` - Integrazione Tink

### MODELLI AI
- **Claude Haiku 4.5** - Query optimization (economico)
- **Claude Sonnet 4.5** - Risposte principali (PRO mode)
- **OpenAI text-embedding-3-small** - Embeddings per RAG
- **Perplexity sonar-pro** - Web search real-time

### BILLING (4 Piani)

| Piano | Prezzo | Query/mese | Vision | Features |
|-------|--------|------------|--------|----------|
| FREE | €0 | 10 | 0 | RAG base |
| CREATOR | €19 | 600 | 30 | RAG completo, web search |
| PRO | €49 | 1500 | 100 | Claude Sonnet, extended thinking |
| BUSINESS | €199 | 4000 | 400 | Bar workspace, team, POS, analytics |

### FEATURES SPECIALI

**Vision (Image Analysis):**
- Identifica bottiglie da foto
- OCR etichette
- Parse menu fotografati

**Voice Input:**
- 9 lingue supportate (IT, EN, ES, FR, DE, PT, ZH, JA, RU)
- Web Speech API
- Real-time transcription

**Extended Thinking:**
- Ragionamento profondo per query complesse
- Mostra i "thinking steps"
- Solo in PRO mode

**Streaming:**
- Risposte in tempo reale (Server-Sent Events)

### SISTEMA COMANDI AI

**STOCK_CMD:**
```
"Aggiungi 3 bottiglie di Tanqueray"
→ [STOCK_CMD:add:Tanqueray:3:bottles:spirits:700]
```

**MENU_CMD:**
```
"Crea Mojito a 12€"
→ [MENU_CMD:create:Mojito:cocktails:12:4.5:Fresco e rinfrescante]
```

---

## BUSINESS CASE / PITCH

### IL PROBLEMA

**Per gli appassionati di cocktail:**
- Informazioni frammentate (libri, YouTube, blog, Reddit)
- Non esiste un "esperto" disponibile 24/7
- Difficile sapere cosa comprare, come abbinare
- Corsi mixology: €200-500

**Per i bar e ristoranti:**
- Gestione stock manuale → errori, sprechi, out-of-stock
- Nessuna visibilità sui margini
- POS scollegato dall'inventario
- Software esistenti (Lightspeed, Toast): €200-400/mese

### LA SOLUZIONE

**Cocktail AI** è un assistente AI che parla di cocktail come un bartender esperto, ma con la memoria di un database e la velocità di un software.

**Due prodotti in uno:**
1. **PERSONAL (B2C)** - "Bartender in tasca" per appassionati
2. **BAR WORKSPACE (B2B)** - Gestionale intelligente per locali

### LA DIFFERENZA CHIAVE

**Stessa domanda, risposte diverse:**

Personal: "Come si fa un Margarita?"
→ Ricetta completa con storia, tecniche, variazioni

Bar: "Come si fa un Margarita?"
→ "Con la tua Tequila José Cuervo costa €2.20 per drink. Se lo vendi a €12, hai margine 82%. Lo aggiungo al menu?"

### TARGET MARKET

**B2C - Personal (TAM: €2B)**
- Cocktail enthusiasts: 50M+ in Europa/USA
- Home bartenders: crescita +40% post-COVID
- Studenti bartending: 500K/anno globalmente

**B2B - Bar Workspace (TAM: €8B)**
- Bar e cocktail bar: 500K+ in Europa
- Ristoranti con bar: 2M+ in Europa
- Hotel bar: 100K+ in Europa

### MODELLO DI BUSINESS

**Pricing B2C:**
| Piano | Prezzo | Target |
|-------|--------|--------|
| FREE | €0 | Lead generation |
| CREATOR | €19/mese | Appassionati |
| PRO | €49/mese | Bartender professionisti |

**Pricing B2B:**
| Piano | Prezzo | Target |
|-------|--------|--------|
| BUSINESS | €199/mese | Bar singoli |
| ENTERPRISE | Custom | Catene, hotel |

### VANTAGGI COMPETITIVI

**vs Software tradizionali (Lightspeed, Toast, MarketMan):**
- Setup: Settimane → Minuti
- Interfaccia: Form e tabelle → Chat naturale
- Prezzo: €200-400/mese → €199/mese
- AI: No → Core product

**vs ChatGPT/Claude generico:**
- Knowledge: Generale → 15+ libri specializzati
- Contesto business: No → Conosce il TUO bar
- Azioni: Solo testo → Esegue comandi
- Integrazioni: No → POS, banche, fornitori

### TRACTION

- **40+ Edge Functions** in produzione
- **99 database migrations** (prodotto maturo)
- **14 integrazioni POS**
- **15+ libri di mixology** indicizzati
- **3000+ spirit** nel database
- **9 lingue** supportate

### FINANCIALS (Proiezioni)

**Anno 1:** €270K ARR
- B2C: 500 utenti × €25 = €150K
- B2B: 50 bar × €199 = €120K

**Anno 2:** €1.4M ARR
**Anno 3:** €5M ARR

**Unit Economics:**
- CAC B2C: €15-30
- CAC B2B: €200-500
- LTV B2C: €180 (12 mesi)
- LTV B2B: €2,400 (24 mesi)
- LTV:CAC: 5-6:1

### VISION

**Diventare il "sistema operativo" per l'industria beverage.**

Oggi: Cocktail AI per bar
Domani: Wine AI, Beer AI, Coffee AI
Dopodomani: Piattaforma B2B per tutto l'F&B

---

## UX / DESIGN ANALYSIS

### DESIGN SYSTEM

**Colore Primario - "After Red":**
- Primary: `#FF8F72` (bottoni, accenti)
- Hover: `#FFA18D`
- Active: `#E84D2B`
- Light background: `#FFF4F2`

**Palette Grigia (senza toni blu):**
- Background light: `#FFFFFF`
- Background dark: `#0A0A0A`
- Text: `#18181B` (light), `#FFFFFF` (dark)
- Borders: `#e4e4e7` (light), `rgba(255,255,255,0.1)` (dark)

**Typography:**
- Font: Plus Jakarta Sans + Cal Sans (display)
- Sizes: 10px (xxs) → 36px (4xl)
- Weights: 400 (body), 500 (labels), 600 (buttons), 700 (headings)

**Spacing:** Sistema 4px (Tailwind scale)
**Border Radius:** Buttons pill (30px), Cards 16-24px, Inputs 8px
**Shadows:** Custom con tinta primary per glow effect

### USER FLOW

**Personal Workspace:**
```
Home (Hero + Search)
→ SearchBar / GuidedSearch / Filters
→ Results Grid
→ Cocktail Detail Modal
→ Save / Share / Chat about it
```

**Bar Workspace:**
```
BarDashboard (Hub)
├── MenuManager (CRUD drinks, pricing)
├── StockDashboard (inventory, alerts)
├── BarChat (AI assistant)
├── Transactions (POS history)
├── Settings (team, integrations)
└── IntegrationsHub (POS, banking)
```

### COMPONENTI UI

**Buttons:** 7 varianti (primary, secondary, outline, ghost, moving-border, gradient-fill, hover-stroke)
**Modals:** BaseModal con sizes (sm → full), backdrop blur, ESC close
**Chat:** Message bubbles con markdown, RecipeArtifact, ActionBar, TypewriterText
**Cards:** Cocktail cards, InfoBlocks con 3D icons, AnswerCard glass-effect
**Forms:** ChatInput auto-expand, voice input, image upload, toggles

### RESPONSIVE

**Breakpoints:** 768px (tablet), 1024px (desktop), 1280px (wide)
**Mobile:** Single column, hamburger menu, sidebar hidden
**Desktop:** Multi-column, expanded sidebar, all dropdowns visible

### ANIMAZIONI

**46 keyframe animations** definite:
- Fade (in, up, down, left, right, scale)
- Slide (in, up, down, left, right)
- Bounce, scale, pulse
- Gradient animations
- Blob, glow, float effects
- Shimmer loading

**Librerie:** Framer Motion per React, custom keyframes per CSS
**Transitions:** 200-600ms, ease-out standard

### DARK MODE

- Toggle via ThemeContext
- Classe `dark:` Tailwind
- Persistenza localStorage
- Background: white → #0A0A0A

### ACCESSIBILITY

- Focus ring: `ring-2 ring-[#FF8F72]/50`
- ARIA labels su buttons, toggles
- Reduced motion support
- 7 lingue supportate
- Keyboard navigation (ESC, Tab, Enter)

---
---

# 2. ADELE LO FEUDO

## OVERVIEW
Portfolio web per artista contemporanea italiana con CMS integrato per gestire tutto senza sviluppatore.

**URL**: https://adelelofeudo.com
**Stack**: React, TypeScript, Cloudflare Workers/D1/R2, Stripe, Claude AI

---

## ANALISI TECNICA

### Cos'è
ALF Portfolio è una piattaforma web completa per la gestione e presentazione del portfolio artistico di Adele Lo Feudo, artista contemporanea italiana specializzata in opere materiche e ritratti espressivi.

Combina:
- **Sito pubblico** multi-lingue per presentazione opere
- **Backoffice/CMS** per gestione completa contenuti
- **Sistema vendita** integrato con Stripe
- **Assistente AI** conversazionale per visitatori

### SITO PUBBLICO

#### Pagine:
1. **Home/Collezione** - Galleria collezioni con animazioni GSAP, scroll effects
2. **Dettaglio Collezione** - Lista opere di una collezione
3. **Dettaglio Opera** - Immagine HD, descrizione, prezzo, bottone "Acquista"
4. **Mostre** - Lista mostre passate e future con date, location, link
5. **Testi Critici** - Critiche d'arte con autore e citazioni
6. **About/Studio** - Biografia artista, foto studio, parallax effects
7. **Privacy/Terms** - Pagine legali

#### Features:
- **9 lingue** (IT, EN, ES, FR, JA, ZH, ZH-TW, DE, KO)
- **Auto-detect lingua** da browser + geo-IP
- **Smooth scroll** (Lenis)
- **Animazioni** GSAP + Framer Motion
- **Lazy loading** immagini ottimizzate WebP
- **Chat AI** - Assistente che risponde su portfolio (Claude)
- **Newsletter popup** - Raccolta email visitatori

### BACKOFFICE/CMS

#### Autenticazione:
- **Google OAuth** (login con account Google)
- **Email whitelist** - Solo email autorizzate
- 3 admin autorizzati

#### Gestione Contenuti:

**Collezioni:**
- CRUD completo
- Titolo e descrizione in 8 lingue
- Immagine cover
- Ordinamento drag-and-drop
- Visibilità on/off
- Mostra in homepage on/off

**Opere (per collezione):**
- CRUD completo
- Titolo, descrizione, medium in 8 lingue
- Dimensioni, anno
- Prezzo EUR e USD
- Disponibilità (disponibile/venduto)
- Gallery multi-immagine
- Layout cover (horizontal/vertical/full)
- Ordinamento drag-and-drop

**Mostre:**
- CRUD completo
- Titolo, sottotitolo, location in 8 lingue
- Data, descrizione, info aggiuntive
- Link sito mostra, immagine

**Critici/Testi Critici:**
- CRUD completo
- Nome critico + foto
- Titolo e testo in 8 lingue
- Citazione principale, anno

**About (Bio + Studio):**
- Biografia artista in 8 lingue
- Immagini studio
- Effetti parallax configurabili

#### Media Storage:
- Upload drag-and-drop
- Organizzazione in cartelle
- Anteprima immagini
- Copia URL al clipboard
- Controllo uso immagini
- Rigenerazione thumbnails
- Rotazione e ottimizzazione WebP
- Statistiche storage

#### Ordini:
- Lista ordini da Stripe
- Dettagli cliente e spedizione
- Sincronizzazione status

#### Newsletter:
- Lista iscritti
- Ricerca e eliminazione

#### Traduzioni Automatiche:
- Scrivi in italiano → auto-traduce in 8 lingue
- Provider: Cloudflare AI + fallback Claude

### DATABASE (Cloudflare D1 - SQLite)

**Tabelle principali:**
- `collections` - id, slug, title (8 lingue), description (8 lingue), image_url, order_index, is_visible, show_on_homepage
- `artworks` - id, collection_id, title (8 lingue), description (8 lingue), medium (8 lingue), dimensions, year, price_eur, price_usd, is_available, is_sold, cover_image_url, images
- `exhibitions` - id, title (8 lingue), subtitle (8 lingue), location (8 lingue), date, description (8 lingue), website, image_url
- `critics` - id, name, photo_url, title (8 lingue), text (8 lingue), quote (8 lingue), year
- `bio_blocks` - id, section, title (8 lingue), content (8 lingue), images
- `orders` - id, artwork_id, customer info, shipping address, amount, stripe_session_id, status
- `newsletter_subscribers` - id, email, subscribed_at

### ARCHITETTURA

**Stack:**
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS
- **Animazioni**: GSAP, Framer Motion, Lenis
- **Backend**: Cloudflare Workers (serverless)
- **Database**: Cloudflare D1 (SQLite)
- **Storage**: Cloudflare R2 (immagini)
- **AI**: Cloudflare AI + Anthropic Claude
- **Pagamenti**: Stripe
- **Email**: Resend
- **Auth**: Google OAuth

**Numeri:**
- 31 pagine React
- 31 componenti
- 230 API endpoints
- 60 migrazioni SQL
- 658 MB progetto

### INTEGRAZIONI

**Stripe (Pagamenti):**
1. Cliente clicca "Acquista"
2. Redirect a Stripe Checkout
3. Pagamento processato
4. Webhook notifica sistema
5. Ordine creato, opera "venduta"
6. Email a Adele + cliente

**Resend (Email):**
- Notifica ordine a Adele
- Conferma ordine a cliente

**Google OAuth:**
- Login sicuro backoffice
- Email whitelist

**Cloudflare AI + Claude:**
- Traduzioni automatiche (8 lingue)
- Chat AI per visitatori

### FEATURES SPECIALI

**Multi-lingua (9 lingue):**
- Auto-detect da browser + geo-IP
- Ogni contenuto in 8 lingue
- Traduzioni AI automatiche

**Sistema ordinamento:**
- Drag-and-drop
- order_index in DB
- Homepage order separato

**Bespoke Artworks:**
- Alcune opere acquistabili più volte (commission-based)

**Image Processing:**
- Upload → WebP automatico
- Thumbnail generation
- Lazy loading + cache

---

## BUSINESS CASE / PITCH

### IL PROBLEMA

**Per gli artisti:**
- Siti portfolio **statici** - ogni modifica richiede sviluppatore
- Piattaforme generiche (Squarespace, Wix) - non pensate per arte
- Vendere online richiede **integrazioni complesse**
- Clienti internazionali - servono traduzioni professionali
- CMS tradizionali (WordPress) - complessi e richiedono manutenzione

**Il costo:**
- Sviluppatore: €50-100/ora per ogni modifica
- Traduttore 8 lingue: €500-1000 per aggiornamento
- Piattaforme arte (Artsy, Saatchi): 20-50% commissione

### LA SOLUZIONE

Portfolio professionale con CMS dove l'artista:
- Aggiorna **tutto da sola**
- Traduzioni **automatiche** in 8 lingue
- Vende **direttamente** senza commissioni
- **Assistente AI** che risponde 24/7

### COME FUNZIONA

**Per il visitatore:**
```
Visita sito → Lingua auto-rilevata → Naviga collezioni
→ Clicca "Acquista" → Paga con Stripe → Conferma email
```

**Per l'artista:**
```
Login Google → Aggiunge opera (5 min)
→ Scrive in italiano → Auto-traduce 8 lingue
→ Pubblica → Live immediato
```

### TARGET

**Artisti contemporanei che:**
- Vendono opere €500-50.000+
- Clienti internazionali
- Partecipano a mostre/fiere
- Vogliono controllo totale sul brand
- Non vogliono commissioni gallerie online

**Mercato:**
- 500K+ artisti professionisti in Europa
- Mercato arte contemporanea: €50B+ globale
- Vendite online arte: +25% CAGR

### MODELLO DI BUSINESS (se prodottizzato)

**Opzione SaaS:**
| Piano | Prezzo | Features |
|-------|--------|----------|
| Starter | €29/mese | 50 opere + 3 lingue |
| Pro | €79/mese | Illimitato + 8 lingue + AI chat |
| Gallery | €199/mese | Multi-artista + analytics |

**Opzione Custom:**
- Setup: €3.000-5.000
- Manutenzione: €200-500/mese

### VANTAGGI COMPETITIVI

**vs Squarespace/Wix:**
- Traduzioni: Manuali → Automatiche
- Vendita arte: Plugin generici → Integrato
- AI chat: No → Incluso

**vs Artsy/Saatchi:**
- Commissioni: 20-50% → 0% (solo Stripe 2.9%)
- Controllo brand: Limitato → Totale
- Dati clienti: Loro → Tuoi

**vs WordPress:**
- Manutenzione: Continua → Zero
- Traduzioni: Plugin complessi → Automatiche
- Performance: Variabile → Edge globale

### TECNOLOGIA (Moat)

1. Traduzioni AI automatiche
2. Edge computing (Cloudflare)
3. Storage ottimizzato (WebP, thumbnails)
4. Checkout integrato (Stripe)
5. Chat AI contestuale

### RISULTATI

- 9 lingue supportate
- 230 API endpoints
- < 2 secondi caricamento
- 0 sviluppatori per aggiornamenti
- Opera aggiunta in 5 minuti
- Traduzioni in 30 secondi

### ESPANSIONE

**Verticali:**
- Fotografi - Portfolio + vendita stampe
- Designer - Portfolio + commissioni
- Artigiani - Catalogo + e-commerce
- Gallerie - Multi-artista

**Features future:**
- Analytics vendite
- CRM clienti
- Fatturazione automatica
- NFT/certificati autenticità

---

## UX / DESIGN ANALYSIS

### DESIGN SYSTEM

**Palette Colori:**
- Background: `#FEFBF6` (crema caldo) - raffinato, galleria d'arte
- Testo primario: `#1a1a1a` (nero morbido)
- Testo secondario: `#666666`
- Accent caldo: `#D4A574` (oro/bronzo)
- Hover: `#8B7355`
- Border sottile: `rgba(0,0,0,0.08)`

**Typography:**
- Display: Playfair Display (serif elegante) - titoli
- Body: Inter 300/400 (sans-serif) - testo
- Contrasto tipografico forte tra serif/sans

**Spacing:**
- Generoso, aria tra elementi
- Padding grandi (80-120px sezioni)
- Grid con gap ampi

**Border Radius:**
- Quasi zero - estetica sharp, minimal

### USER FLOW

**Visitatore:**
```
Landing → Auto-detect lingua
→ Hero con CTA collezioni
→ Grid collezioni animate
→ Collezione detail (lista opere)
→ Opera detail (zoom, acquista)
→ Stripe Checkout → Conferma
```

**Admin (Backoffice):**
```
Login Google → Dashboard
├── Collezioni (CRUD + drag order)
├── Opere (CRUD + multi-lingua)
├── Mostre (CRUD)
├── Critici (CRUD)
├── Media (upload, organize)
├── Ordini (lista da Stripe)
└── Newsletter (subscribers)
```

### COMPONENTI UI

**Navigation:**
- Header fixed trasparente con blur on scroll
- Menu hamburger mobile
- Logo centrale
- Language selector (9 lingue)

**Galleria:**
- Masonry grid responsivo
- Hover: zoom + overlay info
- Lightbox fullscreen
- Touch gestures mobile

**Cards:**
- Opere: immagine + titolo + prezzo
- Mostre: data + location + link
- Critici: foto + quote

**Forms (Backoffice):**
- Multi-lingua con tabs (8 lingue)
- Rich text editor
- Image upload drag-drop
- Auto-save

**Chat AI:**
- Floating button angolo
- Modal chat overlay
- Markdown rendering
- Typing indicator

### ANIMAZIONI

**GSAP:**
- Scroll-triggered reveals
- Parallax su immagini studio
- Stagger su grid collezioni
- Smooth scroll (Lenis)

**Framer Motion:**
- Page transitions
- Modal enter/exit
- Hover scale cards
- Loading states

**Effetti:**
- Fade up on scroll (0.6s ease-out)
- Parallax verticale (0.3x speed)
- Image zoom on hover (1.05 scale)
- Blur backdrop modals

### RESPONSIVE

**Breakpoints:**
- Mobile: < 768px (1 colonna)
- Tablet: 768-1024px (2 colonne)
- Desktop: > 1024px (3-4 colonne)

**Mobile:**
- Menu hamburger
- Immagini full-width
- Touch swipe gallery
- Font sizes ridotti

**Desktop:**
- Grid multi-colonna
- Hover effects
- Sidebar backoffice
- Split layouts

### MULTI-LINGUA

**9 lingue:**
IT, EN, ES, FR, DE, JA, ZH, ZH-TW, KO

**Auto-detection:**
1. Query param `?lang=`
2. LocalStorage preference
3. Navigator.language
4. Geo-IP fallback

**UI:**
- Flag dropdown header
- Persist in localStorage
- Traduzioni AI automatic

### ACCESSIBILITY

- Alt text su tutte le immagini
- Focus visible outlines
- Keyboard navigation
- Skip to content link
- ARIA labels forms
- Contrast ratio conforme

### ESTETICA

**Mood:**
- Galleria d'arte contemporanea
- Minimal, raffinato
- Spazio negativo generoso
- Tipografia come elemento design

**Riferimenti:**
- Gallerie d'arte online (Gagosian, Pace)
- Fashion lookbooks
- Design magazine layouts

---
---

# 3. GUSTO

## OVERVIEW
Assistente culinario AI che trasforma ingredienti in piatti personalizzati. Vision per foto dispensa, generazione ricette, menu settimanali.

**URL**: https://gusto-8cx.pages.dev
**Stack**: React 19, TypeScript, Cloudflare Workers/D1, Claude AI, Perplexity

---

## ANALISI TECNICA

### Cos'è
Gusto è un assistente AI per la cucina che risolve il problema quotidiano "cosa cucino oggi?". Combina:
- **Vision AI** - Identifica ingredienti da foto
- **Chat conversazionale** - Chiedi variazioni, suggerimenti
- **Menu planning** - Genera menu settimanali completi
- **Dietary modes** - Adatta ricette a diete specifiche

### ARCHITETTURA

**Frontend:**
- React 19 + TypeScript + Vite
- Tailwind CSS 4 + PostCSS
- Framer Motion (animazioni)
- React Router Dom 7 (routing)
- React Markdown (rendering ricette)

**Backend:**
- Cloudflare Workers/Pages Functions
- Cloudflare D1 (SQLite serverless)
- 26 edge functions API

**AI:**
- Claude Haiku 4.5 (chat principale)
- Perplexity Sonar (ricerche web ricette)
- Tool calling per display ricette/menu
- Streaming SSE real-time

### DATABASE SCHEMA

**Tabelle Core:**
```
users           - id, email, password_hash, name
conversations   - id, user_id, title, timestamps
messages        - id, conversation_id, role, content, parsed_recipe
saved_recipes   - id, user_id, name, ingredients[], steps[], is_favorite
menus           - id, user_id, name, occasion, courses[], wine_pairing
pantry_items    - id, user_id, name, quantity, category, expires_at
```

**Subscription:**
```
plans              - id, display_name, price, messages_per_day, features[]
user_subscriptions - id, user_id, plan_id, stripe_ids, status
usage_logs         - id, user_id, action, date, count
```

### API ENDPOINTS (26)

**Authentication:**
- POST /api/auth/register, login
- GET /api/auth/me

**Chat:**
- POST /api/chat (streaming SSE)
- GET/POST /api/conversations

**Recipes & Menus:**
- GET/POST/DELETE /api/recipes
- GET/POST /api/menus

**Features:**
- POST /api/suggest-dishes (AI da ingredienti)
- POST /api/explore-world (cucine mondiali)
- GET/POST /api/pantry

**Subscription:**
- GET /api/subscription, /usage
- POST /api/subscription/checkout, /portal

### RAG KNOWLEDGE BASE

**Fonti indicizzate:**
- Alma Scuola Gusto Italiano (~90KB, 200+ ricette)
- Larousse Gastronomique (~730KB)
- Menu Stellati Dettagliati (JSON)
- Flavor Pairing Guide (~47KB)

**Indici:**
- rag_index.json (1M+ chunks)
- BM25 scoring (no vector DB)
- 5 chunks per query

### AI MODES

**Modalità Speciali:**
1. **Menu Mode** - Genera menu multi-course con wine pairing
2. **Stellato Mode** - Tecniche Michelin (sous-vide, emulsioni)
3. **Recupero Mode** - Zero-waste, utilizzo avanzi
4. **Diet Modes** - lowcarb, keto, vegan, vegetarian, glutenfree, lactosefree, highprotein

**Tool Calling:**
- `display_recipe` - Ricetta strutturata (ingredienti, steps, tips)
- `display_menu` - Menu completo (antipasto→dolce + wine)
- `suggest_quick_replies` - Follow-up suggeriti

### PIANI PRICING

| Piano | Prezzo | Messaggi | Features |
|-------|--------|----------|----------|
| Free | €0 | 3/mese | Base |
| Pro | €9.99/mese | 50/giorno | Stellato mode |
| Premium | €14.99/mese | Illimitati | Tutto + Recupero |

### INTEGRAZIONI

- **Stripe** - Pagamenti, subscription, webhooks
- **Anthropic Claude** - Chat AI principale
- **Perplexity** - Web search ricette
- **Cloudflare D1** - Database SQLite

---

## BUSINESS CASE / PITCH

### IL PROBLEMA

**Pain Point Universale:**
"Apri il frigo e non sai cosa cucinare"

- Perdita di tempo nel decidere
- Sprechi alimentari (1/3 produzione globale)
- Monotonia nelle ricette
- Esigenze specifiche non gestite (diete, allergie)

**Competitor Attuali:**
- App ricette generiche (statiche, no AI)
- ChatGPT generico (no contesto dispensa)
- Nessuno risolve in modo conversazionale + visuale

### LA SOLUZIONE

**Value Proposition:**
"Un assistente AI che trasforma ingredienti in piatti in 30 secondi"

**Meccanica Core:**
```
Utente: "Ho pomodori, pasta, aglio"
↓
Gusto: "Ti suggerisco:
1. Aglio e Olio (5 min)
2. Pomodoro e Aglio (15 min)
3. Cacio e Pepe variante"
↓
Utente: "Fai versione vegan della #2"
↓
Gusto: [Ricetta adattata]
```

### TARGET MARKET

**Segment 1: Home Cooks Giovani**
- 18-35 anni, single/coppie
- TAM: 80M Europa
- CAC: €5-15, LTV: €50-80

**Segment 2: Genitori Occupati**
- 30-50 anni, famiglie
- TAM: 150M Europa
- CAC: €10-25, LTV: €120-200

**Segment 3: Professionisti (B2B Light)**
- Nutrizionisti, dietisti
- TAM: 500K Europa
- CAC: €100-300, LTV: €1-3K/anno

### MODELLO DI BUSINESS

| Piano | Prezzo | Target |
|-------|--------|--------|
| Free | €0 | Lead generation |
| Creator | €4.99/mese | Casual cooks |
| Family | €9.99/mese | Famiglie |
| Pro | €14.99/mese | Professionisti |

**Proiezioni:**
- Year 1: €1.1M ARR (50K users)
- Year 2: €8.5M ARR (500K users)
- Year 3: €35M+ ARR (2M users)

### VANTAGGI COMPETITIVI

**vs App Ricette (Giallo Zafferano):**
- Static recipes → Dynamic AI generation
- Generic → Your pantry/preferences

**vs ChatGPT:**
- Generico → Conosce la TUA dispensa
- No vision → Photo recipes
- Generic UX → Cooking-focused

**vs Meal Kit (HelloFresh):**
- €10/meal → €5-15/mese
- Fixed menus → Your choice
- Logistica → Pure software

### VISION

**Diventare l'OS per la cucina quotidiana**

- Fase 1: "Cosa cucino?" → Recipe AI
- Fase 2: "Come mangio bene?" → Nutrition
- Fase 3: "Cosa compro?" → Grocery marketplace
- Fase 4: "Come cucino?" → Smart kitchen IoT

---

## UX / DESIGN ANALYSIS

### DESIGN SYSTEM

**Tema: "Zine Style" (Warm & Artisanal)**

**Colori:**
- Background: `#FAF7F2` (cream/paper)
- Text: `#2D2A26` (ink)
- Primary: `#22C55E` (chef green)
- Secondary grays: pencil, faded, light

**Typography:**
- Display: Cal Sans + Plus Jakarta Sans
- Body: Plus Jakarta Sans
- Decorativo: Caveat (handwritten)

**Spacing:** Base 8px (Tailwind)
**Border Radius:** xl rounded

### USER FLOW

**Chat con Chef AI:**
```
Home → Ask Input → Chat Page → Send Message
→ Streaming Response → Quick Replies → Save Recipe
```

**Recipes:**
```
Home → Ricette → Recipe List → Details → Share/Save
```

**Mondo (Cucine Globali):**
```
Home → Mondo → Select Country → Generate Recipe → Customize
```

### COMPONENTI UI

**Chat:**
- UserMessage, AIMessage
- QuickReplies (suggerimenti)
- RecipeInChat (card integrata)
- MenuInChat (menu completo)
- Streaming con loading dots

**Cards:**
- ZineRecipeCard (hand-drawn frame)
- ZineNoteCard (dashed border)
- Hand-drawn SVG decorations

**Sketch Illustrations (30+ icons):**
- Proteins: Egg, Chicken, Fish, Cheese
- Vegetables: Carrot, Tomato, Basil
- Grains: Pasta, Bread, Pizza
- Tutti in stile sketch black & white

### ANIMAZIONI

**Tailwind Keyframes:**
- shimmer, pulse-soft
- fade-in, fade-in-up, fade-in-scale
- bounce-in, slide-up, slide-down
- glow, float

**Transizioni:**
- Hover: shadow-lg, -translate-y-1
- Focus: ring-2 ring-chef-500/50
- Loading: dotPulse 1.2s staggered

### RESPONSIVE

**Mobile-first:**
- Bottom navigation
- Stack verticale full-width
- Hamburger menu
- Touch targets 48px+

**Desktop (≥768px):**
- Fixed top navbar
- Multi-column grids
- Hover effects

### DARK MODE

- Supportato via `darkMode: 'class'`
- Tema primario: light (cream)
- Variants per Button, Input, Card

### ESTETICA

**Mood:**
- Zine magazine style
- Handmade/artisanal feel
- Warm cream colors (cozy kitchen)
- Sketch illustrations per personality

**35+ Cucine Mondiali:**
Italia, Francia, Giappone, Messico, India, Thailandia, Grecia, Spagna, Marocco, Cina, Vietnam, Corea, Perù, Libano, Turchia, Etiopia, Brasile, Argentina, USA, UK, Germania, Polonia, Russia, Portogallo, Belgio, Paesi Bassi, Svezia, Norvegia, Danimarca, Finlandia, Austria, Svizzera, Irlanda, Australia, Nuova Zelanda

---

# 4. BRICKGEN

## OVERVIEW
Generatore AI di modelli LEGO costruibili. Da descrizione testuale a modello 3D completo con istruzioni, BOM e integrazione acquisti.

**URL**: https://brickgen.pages.dev
**Stack**: React 19, Three.js, Cloudflare Workers/D1, Claude AI

---

## ANALISI TECNICA

### Cos'è
Brickgen è un sistema AI multi-agente che trasforma descrizioni testuali in modelli LEGO completi e costruibili. Pipeline a 4 stadi: Analyst → Architect → Shaper → Brickifier.

### ARCHITETTURA

**Frontend:**
- React 19 + Vite 7
- Three.js + React Three Fiber (rendering 3D)
- @react-three/drei (OrbitControls, Environment)
- Tailwind CSS 4
- html2canvas + jsPDF (export)

**Backend:**
- Cloudflare Workers (edge functions)
- Cloudflare D1 (SQLite - 23,643 parti LEGO)
- Claude AI (Sonnet 4, Haiku 4.5)

### PIPELINE AI A 4 STADI

**Stage 1: ANALYST AGENT**
```
Input: "Taipei 101, 30cm tall"
Output: {
  type: "building",
  complexity: 0.75,
  suggested_tier: "LARGE",
  colors: [{name: "dark_azure", lego_id: 321, percentage: 60}],
  estimates: {parts: 3000-6000, cost_eur: 200-400}
}
```

**Stage 2: ARCHITECT AGENT**
- Crea blueprint modulare con sezioni
- Definisce proporzioni in studs LEGO
- Pattern: solid_plate, windowed_box, arched_wall, tapered
- Scaling per tier (MINI/MEDIUM/LARGE/GIANT)

**Stage 3: SHAPER AGENT**
- Converte sections → voxel grids 3D
- Applica pattern architettonici
- Mappatura colori LEGO (LDraw IDs)

**Stage 4: BRICKIFIER AGENT**
- Greedy fill algorithm (largest parts first)
- Converte voxel → brick reali (500+ tipologie)
- Interlocking pattern per stabilità
- Genera BOM con prezzi BrickLink

### DATABASE LEGO (D1)

**Tabelle:**
```
colors       - 200+ colori LEGO con RGB, hex
parts        - 23,643 parti ufficiali LEGO
elements     - Mapping parte+colore (Rebrickable IDs)
part_categories - Categorie (bricks, plates, slopes, etc.)
```

**Parts Database:**
- Bricks: 3001 (2x4), 3003 (2x2), 3005 (1x1)
- Plates: 3811 (16x16), 3020 (2x4)
- Slopes: 3040 (1x2 45°)
- Arches, Round, Tiles

### API ENDPOINTS

- `POST /api/analyze` - Analyst agent
- `POST /api/architect` - Blueprint generation
- `POST /api/generate-smart` - Full pipeline
- `POST /api/generate-model` - Brickify + BOM
- `POST /api/generate-steps` - Step-by-step instructions
- `GET /api/parts` - Search parts database
- `GET /api/colors` - LEGO colors
- `POST /api/validate-parts` - Rebrickable validation
- `POST /api/suggest-palette` - AI color suggestion

### RENDERING 3D

**Three.js Setup:**
```jsx
<Canvas>
  <OrbitControls />
  <Environment preset="studio" />
  <ContactShadows />
  <Grid />
  {parts.map(p => <BrickMesh {...p} />)}
</Canvas>
```

**BrickMesh:**
- Box geometry per corpo brick
- Cylinder geometry per studs
- MeshStandardMaterial con colori LEGO
- Selection wireframe

### INTEGRAZIONI

- **Rebrickable API** - Validazione parti reali
- **BrickLink** - Prezzi medi EUR per parte
- **LEGO Pick-a-Brick** - CSV export per acquisto diretto
- **Tripo 3D** - Generazione modello 3D da immagine (stub)

### EXPORT FORMATS

- **PDF** - Istruzioni stile LEGO ufficiale
- **BrickLink XML** - Import diretto cart
- **CSV** - Lista parti per acquisti
- **LDraw** - Compatibile con Studio 2.0

---

## BUSINESS CASE / PITCH

### IL PROBLEMA

**Pain Point:**
Trasformare un'idea in un modello LEGO costruibile richiede:
- 40-200 ore di design manuale
- Competenze CAD e conoscenza 23,643 parti
- Software complessi (Studio 2.0, LDD)

**Mercato:**
- 100M+ LEGO builder globali
- 10M premium (spendono €100+/anno)
- TAM: €500M-1B/anno

### LA SOLUZIONE

**Value Proposition:**
"Da descrizione a modello LEGO in 5 minuti invece di 40 ore"

**Meccanica:**
```
"Taipei 101, 30cm, budget €100"
↓ 5 minuti
✓ 3,847 bricks
✓ 42 parti uniche
✓ €156 costo stimato
✓ Istruzioni PDF
✓ BrickLink cart ready
```

### TARGET MARKET

**Segment 1: Serious Builders (40-50%)**
- 500K builder seri globali
- Spendono €500-5K/anno
- WTP: €10-50/modello

**Segment 2: Content Creators (15-20%)**
- 50K creator LEGO-focused
- Necessitano contenuti settimanali
- WTP: €500-2K/mese

**Segment 3: Brand & Agencies (10-15%)**
- 5K agenzie/brand interessate
- LEGO custom per marketing
- WTP: €10K-50K/progetto

**Segment 4: Educational (15-20%)**
- 50K scuole/enti STEM
- Lezioni architettura, engineering
- WTP: €500-5K/anno

### MODELLO DI BUSINESS

| Piano | Prezzo | Features |
|-------|--------|----------|
| Free | €0 | 3 gen/mese, 2D preview |
| Pro | €9.99/mese | Illimitato, 3D, PDF |
| Studio | €49/mese | API, batch, priority |
| Enterprise | Custom | White-label, on-premise |

**Unit Economics:**
- CAC: €20-50
- LTV: €800-2K (3-5 anni)
- LTV:CAC: 16-40x

### VANTAGGI COMPETITIVI

**vs CAD Tools (Studio 2.0, LDD):**
- Tempo: 5 min vs 40 ore
- Skill: Zero vs CAD expertise
- AI: Sì vs No

**vs Generic AI (ChatGPT):**
- Database: 23,643 parti reali vs generico
- Output: Modello costruibile vs testo
- BOM: Prezzi reali vs niente

### PARTNERSHIP POTENZIALI

**Tier 1: LEGO Group**
- API integration ufficiale
- Pick-a-Brick white-label
- Revenue share 20-30%

**Tier 2: BrickLink (LEGO-owned)**
- Deeper API integration
- Affiliate revenue 5-10%

**Tier 3: Rebrickable**
- Set library hosting
- Revenue share

---

## UX / DESIGN ANALYSIS

### DESIGN SYSTEM

**Palette Scura:**
- Background: `#0f0f23` (navy scuro)
- Secondary: `#1a1a2e`
- Accent: `#f7d117` (giallo LEGO)
- Text: `#eee` / `#888`

**Action Colors:**
- Place: giallo
- Move: arancione
- Rotate: blu
- Delete: rosso
- Copy: turchese

**Typography:**
- System fonts (-apple-system, Segoe UI)
- Heading: 2rem
- Body: 0.9-1rem
- Labels: 0.7-0.85rem

### USER FLOW

**AI Builder:**
```
Input Query → Progress (7 steps animati)
→ Result Tabs (Preview/Parts/Instructions/Export)
→ Download PDF / BrickLink XML
```

**Manual Builder:**
```
Parts Browser (search 23,643 parti)
→ Drag & Drop su Canvas 3D
→ Snap-to-grid + Collision detection
→ Save / Export
```

### COMPONENTI UI

**Canvas 3D:**
- OrbitControls (rotate/zoom)
- Grid floor con snap
- Real-time collision detection
- Selection wireframe

**Parts Browser:**
- Grid auto-fill (140px cards)
- Search con debounce 300ms
- Category filter
- Load more pagination

**Color Picker:**
- Quick access (9 colori)
- Expandable (200+ colori)
- Search by name
- Category tabs

**Toolbar (bottom-center):**
- Selected part info
- Action buttons colorati
- History (Undo/Redo)
- File operations

### ANIMAZIONI

**CSS:**
- Transitions: 0.15s (rapide)
- Sidebar toggle: 0.3s ease
- Loading spinner: spin 1s
- Collision pulse: 0.5s infinite

**Three.js:**
- Auto-rotate preview
- Selection highlight
- Hover states 3D

### RESPONSIVE

**Breakpoint 768px:**
- Sidebar: 320px → 280px
- Toolbar padding ridotto
- Color picker riposizionato
- Grid colonne: 10 → 8

### PROGRESS VISUALIZATION

**7 Steps con emoji:**
1. Analisi riferimenti architettonici
2. Calcolo proporzioni e scala
3. Selezione pezzi dal catalogo
4. Verifica disponibilità colori
5. Ottimizzazione strutturale
6. Generazione istruzioni
7. Calcolo costi e venditori

**Progress bar:** +3% ogni 100ms, max 95% durante fetch

---

# 5. OBJECTS

## OVERVIEW
Editor visuale per React che genera codice production-ready. Design su canvas → esporta componenti React + Tailwind. AI integration per generazione e modifica.

**URL**: https://objects-ef4.pages.dev
**Stack**: React 19, TypeScript, Vite, WebContainers, Claude AI, Supabase

---

## ANALISI TECNICA

### Cos'è
Objects è un editor visuale WYSIWYG (stile Figma) che genera codice React reale. Combina:
- **Canvas visuale** - Design drag-drop
- **Code generation** - JSX + Tailwind in tempo reale
- **Live preview** - WebContainers eseguono Node.js nel browser
- **AI assistant** - Claude per generazione e modifica codice

### ARCHITETTURA

**Frontend:**
- React 19 + TypeScript 5.8
- Vite 7 (build tool)
- Zustand 5 (state management)
- Framer Motion 12 (animazioni)
- Tailwind CSS

**Code Generation:**
- Babel (AST parsing/generation)
- Prettier (formatting)
- Custom artifact parser (4 formati supportati)

**Live Preview:**
- WebContainers API (Node.js nel browser)
- Vite HMR (hot module replacement)
- postMessage bridge (editor ↔ iframe)

**Backend:**
- Supabase (PostgreSQL + Auth)
- IndexedDB (cache locale)
- Cloudflare Pages (hosting)

### SISTEMA DI GENERAZIONE CODICE

**Artifact Parser** - 4 formati supportati:
1. **bolt.diy** (primario):
```xml
<boltArtifact>
  <boltAction type="file" filePath="src/Hero.tsx">
    export function Hero() {...}
  </boltAction>
</boltArtifact>
```
2. **lovable**: `<file path="...">`
3. **Cursor/Claude**: ` ```tsx:src/App.tsx `
4. **Markdown**: `// filepath: src/App.tsx`

**Code Generator:**
```
Canvas JSON → AST → React JSX + CSS → File system
```

### WEBCONTAINER FLOW

```
1. Boot WebContainer (singleton)
2. Mount virtual filesystem
3. npm install (Vite, React, Tailwind)
4. Avvia dev server
5. Preview in iframe
6. File change → HMR → instant update
```

### DATABASE SCHEMA

**Supabase:**
```
design_projects {
  id, user_id, name, description
  canvas_data: JSON  // Stato canvas completo
  thumbnail_url, is_public, is_template
}

design_templates {
  id, name, type, json_structure
  preview_url, is_public
}
```

**IndexedDB:**
- chats (history conversazioni AI)
- snapshots (versioni file per rollback)

### AI INTEGRATION

**Claude API via Vercel AI SDK:**
- Streaming responses (SSE)
- Tool calling per file generation
- Artifact parsing automatico

**Flow:**
```
User prompt → Claude → <boltArtifact> → Parser → WebContainer → Preview
```

### DESIGN SYSTEM TOKENS

**8 Palette Colori:**
- Noir (dark, gold accent)
- Paper (minimal light)
- Candy (warm, playful)
- Aurora (purple gradient)
- Trust (corporate blue)
- Earth (natural tones)
- Cyber (neon tech)
- Luxury (premium gold)

**4 Typography Scales:**
- Impact (bold, powerful)
- Elegant (refined, luxury)
- Modern (clean, balanced)
- Playful (fun, friendly)

---

## BUSINESS CASE / PITCH

### IL PROBLEMA

**Gap Design-Development:**
- Designer crea in Figma
- Developer traduce manualmente in React
- Perdita di fedeltà, tempi 3-5x più lunghi
- Feedback loop di giorni invece che ore

**Pain Points:**
- Figma export genera HTML generico, non React
- Framer è proprietario, non esporta codice reale
- v0.dev è solo AI, no editor visuale

### LA SOLUZIONE

**Value Proposition:**
"Editor visuale dove il codice React è il canvas"

**Meccanica:**
```
Designer disegna componente
↓
Codice React generato in tempo reale
↓
Developer modifica codice
↓
Preview visuale si aggiorna istantaneamente
```

### TARGET MARKET

**Segment 1: Design Teams in Tech (40%)**
- 50K+ team globali
- CAC: €1,500-5K
- LTV: €50K-200K/anno

**Segment 2: Freelance Designer+Developer (25%)**
- 100K+ freelance
- CAC: €20-50 (viral)
- LTV: €500-2K/anno

**Segment 3: Enterprise Design Systems (20%)**
- 5K+ enterprises
- CAC: €10K-50K
- LTV: €500K-2M/anno

### MODELLO DI BUSINESS

| Piano | Prezzo | Features |
|-------|--------|----------|
| Starter | €0 | 1 progetto, 5 componenti |
| Creator | €39/mese | 5 progetti, Figma sync |
| Team | €199/mese | Illimitato, 5 users, collab |
| Enterprise | €999+/mese | SSO, on-premise, API |

### VANTAGGI COMPETITIVI

**vs Figma → Code:**
- Output: HTML generico vs React production-ready
- Props: No vs Full state management
- Animations: No vs Framer Motion built-in

**vs Framer:**
- Export: Proprietario vs React open
- Developer UX: Difficile vs Eccellente
- Existing projects: No vs Import React projects

**vs v0.dev:**
- UI: Solo AI vs Visual builder
- Iteration: Lenta (ripromp) vs Veloce (visual edit)
- Collaboration: No vs Team multiplayer

---

## UX / DESIGN ANALYSIS

### LAYOUT EDITOR

```
┌─────────────────────────────────────────────────┐
│                    HEADER                        │
│  [Logo] [Undo/Redo] [Export] [Share] [Auth]     │
├──────────────┬─────────────────┬────────────────┤
│   SIDEBAR    │     CANVAS      │  RIGHT PANEL   │
│              │   (draggable)   │                │
│ - Pages      │  [Preview/Code] │ - Style        │
│ - Layers     │    [iframe]     │ - States       │
│ - AI Chat    │                 │ - Animate      │
│              │                 │ - Presets      │
├──────────────┴─────────────────┴────────────────┤
│         RESPONSIVE TOOLBAR                       │
│  [Desktop] [Tablet] [Mobile] | Tools | Zoom     │
└─────────────────────────────────────────────────┘
```

### DESIGN SYSTEM

**Glassmorphism:**
```css
backdrop-filter: blur(20px);
background: rgba(20, 20, 20, 0.98);
border: 1px solid rgba(255, 255, 255, 0.08);
```

**Accent Color:** Burgundy `#8B1E2B` / `#A83248`

### USER FLOW

**Fase 1: Setup**
- Scegli template (7 preset)
- Seleziona formato canvas (Web/Social/Print)

**Fase 2: Design**
- Drag-drop elementi da toolbar
- Modifica stili nel pannello destro
- Aggiungi animazioni e stati

**Fase 3: Responsive**
- Configura per 3 breakpoint (Desktop/Tablet/Mobile)
- Override stili per breakpoint

**Fase 4: Export**
- Download .zip con src/
- Copia negli appunti
- Push su GitHub

### COMPONENTI UI

**Canvas:**
- Multi-page view (zoom + pan)
- Selection overlay con 8 handles
- Snap-to-grid, guides

**Right Sidebar (4 tabs):**
1. Style - CSS properties editor
2. States - Hover, active, focus
3. Animate - Keyframe animations
4. Presets - Saved styles

**Toolbar:**
- Primitives: Frame, Text, Button, Image
- Layout: Section, Container, Stack, Grid
- Blocks: Navbar, Hero, Features, Pricing, Footer

### ANIMAZIONI

**14 Preset:**
- Fade In/Out
- Slide Up/Down/Left/Right
- Scale Up, Bounce, Pulse, Shake, Rotate, Float

**Trigger Types:**
- mount, hover, click, scroll, inView

**15+ Easing Curves:**
- Linear, ease variants
- Quad, Cubic, Quart, Back, Elastic

### RESPONSIVE

**Breakpoints:**
- Desktop: 1440px (base)
- Tablet: 768px
- Mobile: 375px

**18 Device Presets:**
- iPhone 15 Pro, iPad Pro, MacBook, Pixel, Galaxy

### PERFORMANCE

- Direct DOM manipulation per drag (60fps)
- Lazy animation keyframes
- Ref-based state (no stale closures)
- WebContainers per preview autentico

---

# 6. RITORNO

**URL:** https://ritorno.adelelofeudo.com
**Tipo:** Client Work - Sito per mostra d'arte
**Stack:** JavaScript Vanilla, CSS3, Cloudflare Pages
**Repository:** GitHub (EZP98/ritorno)

---

## ANALISI TECNICA

### ARCHITETTURA

**Struttura File:**
```
ritorno/
├── sito-produzione/
│   ├── index.html           # Single Page Application
│   ├── style.css            # 1065 righe
│   ├── opera-data.json      # Manifesto 49 foglie
│   ├── images/
│   │   ├── sky.png          # Background parallax (8.3 MB)
│   │   └── foglie/          # 98 file (49 fronte + 49 retro)
│   ├── audio.mp3            # Soundtrack (1.9 MB)
│   ├── ritorno.mp4          # Video promo (12.1 MB)
│   └── _headers             # Config Cloudflare
└── assets-originali/
```

**Scelte tecniche:**
- Vanilla JavaScript puro (niente framework)
- SPA con caricamento JSON dinamico
- ~700 righe JS inline nell'HTML
- Peso totale: 525 MB (dominato da immagini)

### ANIMAZIONI

**Oscillazione Foglie (leafSway):**
```css
@keyframes leafSway {
    0%, 100% { transform: rotate(0deg) translateY(0px); }
    25% { transform: rotate(0.5deg) translateY(-1px); }
    75% { transform: rotate(-0.5deg) translateY(1px); }
}
```
- Rotazione: ±0.5 gradi
- Traslazione: ±1px
- Durata: 4-5s con stagger per effetto organico
- Mobile: 3x più pronunciato (±1.5°, ±3px)

**Flip Fronte/Retro:**
- Cross-fade senza 3D transform (massima compatibilità)
- Timing: 850ms con cubic-bezier
- Flag `isFlipping` per evitare spam
- Force reflow per transizioni smooth

### GESTURE HANDLING

**Touch (Mobile):**
- Swipe orizzontale: naviga tra opere (threshold 50px)
- Tap: flip immagine (rilevato se <10px movimento in 300ms)

**Wheel (Desktop):**
- Scroll verticale: navigazione
- Scroll orizzontale: flip

**Keyboard:**
- Frecce: navigazione
- Spazio/Invio: flip
- Esc: chiudi lightbox

### ASSET MANAGEMENT

**JSON struttura:**
```json
{
  "id": 1,
  "numero": "01",
  "titolo": "adele",
  "fronte": "images/foglie/adele.png",
  "retro": "images/foglie/adele-retro.png"
}
```

- 49 oggetti = 49 foglie
- Lazy loading: `loading="lazy"`
- Error handling con console logging

### HOSTING

- Cloudflare Pages (Git-based deploy)
- Zero build process (static serving)
- Headers custom per iframe embedding
- CDN globale + SSL automatico

### PERFORMANCE

- Lazy loading immagini
- Intersection Observer per animazioni
- State flags per evitare race conditions
- Force reflow controllato
- Audio: pausa su tab nascosto
- Cache busting con query params

### RESPONSIVE

**Desktop (>768px):**
- Grid orizzontale scrollabile
- Height: 600px
- Gap: 50px tra foglie
- Oscillazione delicata

**Mobile (≤768px):**
- Stack verticale full-width
- Height: 350px per foglia
- Oscillazione 3x più visibile
- Menu hamburger
- Video: download diretto invece di modal

---

## BUSINESS CASE

### PROBLEMA

**Limitazioni mostra fisica:**
- Temporalità: chiude dopo settimane
- Geolocalizzazione: solo visitatori in loco
- Documentazione passiva: foto/PDF non trasmettono esperienza
- Narrazione incompleta: pochi leggono i testi critici

**Bisogno specifico:**
- Artista che torna nel luogo d'origine dopo 9 anni (il "nostos")
- Opera concettuale: ogni foglia ha fronte e retro
- Raggiungere collezionisti/galleristi a distanza

### SOLUZIONE

**Portfolio tradizionale vs RITORNO:**

| Portfolio Standard | RITORNO |
|-------------------|---------|
| Griglia statica | Foglie che oscillano |
| Click per ingrandire | Gesture naturali |
| Silenzio | Soundscape immersivo |
| Visualizzazione frontale | Interazione fronte/retro |

**Funzionalità distintive:**
- Navigazione fisica tradotta in digitale
- Scroll verticale = camminare nella mostra
- Scroll orizzontale = girare la foglia in mano
- Audio ambientale che un portfolio non offre

### TARGET

**Primario:**
1. Visitatori mostra fisica (rivivono, approfondiscono)
2. Collezionisti/galleristi (valutano da remoto)
3. Curatori/critici (accesso testi critici)

**Secondario:**
4. Comunità locale (orgoglio, condivisione)
5. Portfolio visitors (primo touchpoint)

### VALORE AGGIUNTO

**Traduzione fedele del concept:**
- Il flip replica il gesto di girare una foglia
- L'utente "scopre" il retro, non lo vede passivamente

**Estensioni impossibili nel fisico:**
- Esplorazione a proprio ritmo
- 3 testi critici completi a portata di click
- Accesso 24/7 globale
- Audio curato

**Permanenza:**
- La mostra chiude, il sito resta
- Archivio dell'opera
- Materiale per future mostre

### MODELLO DI BUSINESS

**Per freelance:**
- Progetto fisso: 3.000 - 6.000 EUR
- Include: design, sviluppo, ottimizzazione, caricamento opere

**ROI per artista:**
- Un collezionista da remoto può ripagare l'investimento
- Credibilità professionale
- Il sito lavora per anni
- Press kit digitale immediato

### PORTFOLIO VALUE

**Dimostra:**
- Interaction design avanzato
- Performance con 49 immagini HD
- Gestione audio web
- Responsive non solo layout ma paradigma interattivo
- Sensibilità artistica oltre la tecnica

**Differenziazione:**
- Pochi sviluppatori lavorano con artisti visivi
- Attrae altri artisti come clienti
- Si distingue da landing page e e-commerce

### DIFFERENZIAZIONE

**Siti mostre tradizionali:**
- Statici: galleria, testo, contatti
- Informativi: date, orari, location
- Documentativi: foto post-evento

**RITORNO:**
- "Vivi la mostra" invece di "guarda le foto"
- Metafora interattiva coerente (flip = cuore dell'opera)
- Multisensorialità: visivo + audio + tattile
- Progettato per sopravvivere alla mostra

---

## ANALISI UX/DESIGN

### CONCEPT

**Metafora nel design:**
- Background cielo: continuità con "Museo a Cielo Aperto di Camo"
- Palette: bianco/trasparente + #F64128 (arancione-rosso) per accenti
- Navigazione circolare riflette il "ritorno" (nostos greco)

**Tipografia:**
- Palanquin (artistico, leggero): titoli
- Lato (moderno, leggibile): corpo testi
- Dualità: artistico + accessibile

**Atmosfera:**
- Fondo cielo fixed: contemplazione, eternità
- Colore #F64128: passione, calore artistico
- Blur nei modali: isolamento, focus
- Audio in loop: ritualità, immersione

### INTERAZIONI

**Desktop:**
- Scroll ↕: naviga tra opere
- Scroll ↔: gira foglia
- Frecce tastiera: navigazione
- Spazio/Invio: flip
- Esc: chiudi

**Mobile:**
- Swipe ↔: naviga
- Tap: flip
- Indicatore dinamico istruzioni

### ANIMAZIONI

**Oscillazione (leafSway):**
- Rotazione minima (±0.5°): brezza leggera
- Sfasamento temporale: 4.5s vs 5s + delay diversi
- Movimento organico non sincronizzato

**Flip:**
- Cross-fade 0.8s con cubic-bezier
- Flag `isFlipping` previene spam
- Force reflow per smooth animation

**Altre:**
- fadeInUp (hero): 1s ease-out con cascata
- parallax hero on scroll
- modalFadeIn: 0.4s ease-out
- pulse: audio hint

### NAVIGAZIONE

**Struttura:**
```
HERO → OPERE (grid/stack) → CRITICA (3 cards) → FOOTER
         ↓
    LIGHTBOX (spa secondaria)
    - Swipe/Scroll naviga
    - Tap/Scroll-X flip
    - Esc chiude
```

**Lightbox immersivo:**
- Lock scroll body
- Cross-fade 0.8s tra opere
- Reset sempre a fronte
- Indicatore istruzioni (4s poi fade)

### VISUAL DESIGN

**Palette:**
- #ffffff: testo principale
- #131313: testo modale dark
- #F64128: CTA, accenti
- rgba(): glassmorphism
- sky.png: background fixed

**Glassmorphism:**
```css
background: rgba(255, 255, 255, 0.05-0.95);
backdrop-filter: blur(10-20px);
border: 1px solid rgba(255, 255, 255, 0.1-0.9);
border-radius: 16px;
```

### RESPONSIVE

**Desktop (>768px):**
- Grid orizzontale scrollabile
- Height: 600px
- Gap: 50px
- 3 colonne cards

**Mobile (≤768px):**
- Stack verticale
- Full width
- Hamburger menu
- Safe area inset per notch

**Device detection:**
- User agent + viewport check
- Video: modal su desktop, download su mobile

### MICRO-INTERAZIONI

**Feedback visivo:**
- Hover nav: color #F64128 (0.3s)
- Hover card: border-color accent
- Hover close: rotate(90deg)
- Image flip: cross-fade 0.8s

**Indicatori:**
- Swipe indicator: appare 4s poi fade
- Audio hint: pulse animation
- Intersection Observer per sezioni

### ACCESSIBILITA'

**Implementato:**
- Keyboard navigation completa
- Link anchor semantici
- Modali con role="dialog"
- Button elements corretti
- Lazy loading

**Migliorabile:**
- aria-label sui button
- aria-live per indicatori dinamici
- prefers-reduced-motion non implementato
- Contrasto alcuni elementi su sfondo variabile

---

## SINTESI

**RITORNO** non è un sito web, è la mostra stessa in forma digitale.

**Design Philosophy:**
1. Oscillazione foglie = ritmo biologico
2. #F64128 = calore artistico in palette fredda
3. Flip cross-fade = eleganza senza rischi 3D
4. Mobile-first gestures = inclusione device-agnostic
5. Lightbox immersivo = parallelo alla white-wall gallery
6. Audio looped = contemplazione rituale
7. Glassmorphism = modernità + sofferenza visuale

**Scelte deliberate:**
- Vanilla JS per semplicità e controllo
- Niente 3D transform per compatibilità
- Cross-fade invece di rotazione
- Gestures diverse per device diversi
- Background cielo come estensione del museo fisico
