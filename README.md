# sakura-guacamole

Guacamole branding extension — dark background, violet accent, sakura petals, fuji SVG.

Ported from [sakura](https://github.com/MiyazakiTakara/sakura) Keycloak theme.

## Structure

```
sakura-guacamole/
├── guac-manifest.json
├── css/
│   └── sakura.css
├── js/
│   └── sakura.js
├── html/
│   └── body.html
└── img/
    ├── fuji.svg
    └── sakura/          ← add sakura1.png … sakura4.png here
```

## Installation

### Manual
1. Build a `.jar` from the contents of this repo (the root acts as the JAR root).
2. Drop the JAR into `/etc/guacamole/extensions/`.
3. Restart Guacamole.

### Docker
Mount the directory as an extension volume:
```yaml
volumes:
  - ./sakura-guacamole:/etc/guacamole/extensions/sakura-guacamole
```

> **Note:** You need to supply the petal images (`sakura1.png` – `sakura4.png`) inside `img/sakura/`. They are the same files used in the Keycloak theme.

## Palette

| Token | Value |
|---|---|
| `--bg` | `#09090b` |
| `--accent` | `#7c3aed` |
| `--border` | `#27272a` |
| `--text` | `#f4f4f5` |
| `--muted` | `#a1a1aa` |
