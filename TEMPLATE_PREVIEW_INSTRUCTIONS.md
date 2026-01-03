# Template Preview - Istruzioni per Implementazione Futura

## Opzione 1: Video (ATTUALE)
I template usano video MP4 registrati con Puppeteer.

### Come registrare i video
```bash
node record.mjs
```

Il file `record.mjs` registra tutti i template a 1440x900 (MacBook Air resolution).

### Problema
- Devi ri-registrare i video ogni volta che aggiorni un template
- `object-fit: cover` croppa molto del contenuto

---

## Opzione 2: Iframe Live (ALTERNATIVA FUTURA)

Se vuoi preview sempre aggiornate senza ri-registrare video:

### Step 1: Aggiungere script ai template
Ogni template deve includere `/public/preview-mode.js`:

```javascript
// preview-mode.js
(function() {
  if (!window.location.search.includes('preview=true')) return;

  document.body.style.pointerEvents = 'none';
  document.body.style.userSelect = 'none';
  document.documentElement.style.overflow = 'hidden';

  window.addEventListener('message', (e) => {
    if (e.data.type === 'scrollPercent') {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      window.scrollTo({
        top: maxScroll * e.data.percent,
        behavior: 'smooth'
      });
    }
  });

  if (window.parent !== window) {
    window.parent.postMessage({ type: 'previewReady' }, '*');
  }
})();
```

Aggiungere in `index.html` di ogni template:
```html
<script src="/preview-mode.js"></script>
```

### Step 2: Componente React per Portfolio

```tsx
const TemplatePreview: React.FC<{ url: string }> = ({ url }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const percentRef = useRef(0);
  const directionRef = useRef(1);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data.type === 'previewReady') setIsLoaded(true);
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    const animate = () => {
      percentRef.current += directionRef.current * 0.003;
      if (percentRef.current >= 1) directionRef.current = -1;
      if (percentRef.current <= 0) directionRef.current = 1;
      iframeRef.current?.contentWindow?.postMessage(
        { type: 'scrollPercent', percent: percentRef.current }, '*'
      );
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isLoaded]);

  return (
    <div className="template-preview-wrapper">
      <div className="browser-chrome">
        <span className="browser-dot dot-red"></span>
        <span className="browser-dot dot-yellow"></span>
        <span className="browser-dot dot-green"></span>
      </div>
      <iframe
        ref={iframeRef}
        src={`${url}?preview=true`}
        className="template-iframe"
      />
    </div>
  );
};
```

### Step 3: CSS

```css
.template-preview-wrapper {
  position: relative;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  background: #1a1a1a;
}

.browser-chrome {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 32px;
  background: linear-gradient(180deg, #3a3a3a 0%, #2a2a2a 100%);
  border-radius: 12px 12px 0 0;
  display: flex;
  align-items: center;
  padding-left: 12px;
  gap: 8px;
  z-index: 3;
}

.browser-dot { width: 12px; height: 12px; border-radius: 50%; }
.dot-red { background: #ff5f57; }
.dot-yellow { background: #ffbd2e; }
.dot-green { background: #28ca41; }

.template-iframe {
  position: absolute;
  top: 32px; left: 0;
  width: 1440px;
  height: 900px;
  border: none;
  transform: scale(0.28);
  transform-origin: top left;
  pointer-events: none;
}
```

### Pro/Contro Iframe
- PRO: Preview sempre aggiornate
- PRO: Niente video da gestire
- CONTRO: Performance pesante (6 iframe)
- CONTRO: Richiede script in ogni template

---

## Template Mapping

| Cartella locale | GitHub repo | URL Cloudflare |
|-----------------|-------------|----------------|
| hanzo-template | slate | slate-6ls.pages.dev |
| folio-ep | orbit | orbit-zq4.pages.dev |
| artemis-portfolio | nova | nova-edz.pages.dev |
| ezio-portfolio | ferrero-rocher-portfolio | ferrero-rocher-portfolio.pages.dev |
| portfolio-dark | obsidian | obsidian-cud.pages.dev |
| landing-template | aurora | aurora-76x.pages.dev |
