# StreamFlix

Plateforme de streaming fictive réalisée dans un cadre pédagogique.
Cette version migre la feuille de styles CSS native vers **Bootstrap 5.3** et **SASS**.

## Démarrage

```bash
npm install          # installe SASS
npm run sass         # compile scss/style.scss vers css/style.css (+ source map)
npm run sass:watch   # recompile à chaque modification
npm run build        # compilation minifiée pour la production
```

Ouvrir ensuite `index.html` avec un serveur statique, par exemple `npx http-server`.

## Architecture SASS (7-1)

```
scss/
├── base/       _reset.scss, _typography.scss
├── components/ _buttons.scss, _cards.scss, _navigation.scss
├── layout/     _header.scss, _hero.scss, _footer.scss
├── pages/      _home.scss
├── utils/      _variables.scss, _mixins.scss
├── vendors/    _bootstrap-custom.scss
└── style.scss  point d'entrée
```

- `utils/_variables.scss` : charte graphique (couleurs, typographie, espacements,
  points de rupture alignés sur ceux de Bootstrap).
- `utils/_mixins.scss` : `respond-to`, `hover-lift`, `button-filled`, `visually-hidden`.
- `vendors/_bootstrap-custom.scss` : personnalisation de Bootstrap. Bootstrap étant
  chargé via CDN, la personnalisation passe par ses propriétés personnalisées CSS
  (`--bs-primary`, `--bs-body-bg`, `--bs-navbar-color`…), qui sont la surface de
  personnalisation officielle de Bootstrap 5.3.

## Composants Bootstrap utilisés

| Composant | Emplacement |
|---|---|
| Navbar + collapse | header, menu hamburger sous 992 px |
| Dropdown | menu « Mon compte » |
| Card | cartes de films des trois grilles |
| Button | hero, cartes, formulaires |
| Badge | genres des films |
| Modal | fiche « Plus d'infos » du film vedette |
| Forms | recherche et formulaire d'inscription |
| Grid | `container`, `row-cols-*`, `col` |

## Accessibilité

- Lien d'évitement vers le contenu principal.
- Landmarks et libellés ARIA sur chaque zone de navigation.
- Titres hiérarchisés : un seul `h1`, puis `h2` par section et `h3` par film.
- `alt` descriptif sur les affiches, `alt` vide sur l'image décorative du hero.
- Focus visible sur tous les éléments interactifs.
- Prise en charge de `prefers-reduced-motion`.

## Branches

| Branche | Contenu |
|---|---|
| `main` | structure HTML5 sémantique |
| `feat/css-natif` | feuille de styles en CSS natif |
| `feat/bootstrap-sass` | migration Bootstrap 5 + SASS |
