# 🌸 sakura-guacamole

A dark, Japanese-inspired branding extension for [Apache Guacamole](https://guacamole.apache.org/) — featuring animated sakura petals, a frosted glass UI, and a violet accent color scheme.

Compatible with **Guacamole 1.6.0** (flcontainers/guacamole image).

---

## Installation

### 1. Download or build the JAR

Clone the repo and build the JAR manually:

```bash
git clone https://github.com/MiyazakiTakara/sakura-guacamole
cd sakura-guacamole

zip -r sakura-guacamole-latest.jar \
  guac-manifest.json css js html img
```

### 2. Place in extensions folder

```bash
# Default Guacamole path
cp sakura-guacamole-latest.jar /etc/guacamole/extensions/

# If using flcontainers/guacamole with Docker volume
cp sakura-guacamole-latest.jar /path/to/guacamole/extensions/
```

### 3. Restart Guacamole

```bash
docker compose restart
```

### 4. Verify

```bash
docker exec guacamole cat /opt/tomcat/logs/catalina.out | grep -i sakura
# Should show: Extension "sakura-guacamole-latest.jar" loaded
```

---

## Docker Compose volume example

```yaml
services:
  guacamole:
    image: flcontainers/guacamole
    volumes:
      - ./guacamole:/config/guacamole
```

Place the JAR in `./guacamole/extensions/`.

---

## Structure

```
.
├── guac-manifest.json        # Extension manifest (Guacamole 1.6.0)
├── css/
│   └── sakura.css            # Full dark theme — login + home UI
├── js/
│   └── sakura.js             # Animated sakura petal canvas
├── html/
│   └── body.html             # Injected HTML (canvas, fuji bg, branding)
└── img/
    ├── fuji.svg              # Mount Fuji silhouette background
    └── sakura/
        ├── sakura1.png       # Petal sprites
        ├── sakura2.png
        ├── sakura3.png
        └── sakura4.png
```

---

## What it changes

- **Login page** — frosted glass card, violet submit button, dark inputs
- **Home page** — `.list-item` styled as elevated cards with borders
- **Menus & dropdowns** — `backdrop-filter: blur()` frosted glass
- **Settings** — dark tables, tabs, forms
- **Session toolbar** — dark menu, clipboard, file browser
- **Global** — animated sakura petals, Mount Fuji silhouette, subtle grid background

---

## License

MIT
