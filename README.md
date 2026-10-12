# Quray Potosí — Interactive CV

A single-page interactive CV for GitHub Pages. Plain HTML/CSS/JS — no build step, no frameworks.

Features: animated NbS₂ honeycomb background that reacts to the mouse, typewriter tagline,
filterable timeline, publications with copy-citation, a searchable **documents gallery**
(certificates, papers, posters, reports) with in-page PDF/image preview, dark/light theme,
mobile layout.

## 1. Publish it (≈5 min)

1. Create a GitHub account if needed, then a **new public repository** named exactly
   `USERNAME.github.io` (replace USERNAME with your GitHub username).
2. Upload everything in this folder (`index.html`, `style.css`, `main.js`, `content.js`,
   `files/`, `.nojekyll`) — on github.com: **Add file → Upload files**, drag them in, **Commit**.
3. Go to **Settings → Pages**, set *Source* = "Deploy from a branch", branch = `main`, folder = `/ (root)`.
4. After ~1 minute your site is live at `https://USERNAME.github.io`.

(Any other repo name works too — the site will then be at `https://USERNAME.github.io/REPO-NAME`.)

## 2. Edit your info

Everything lives in **`content.js`**. Open it on GitHub, click the ✏️ pencil, edit, commit.
Fill in the `TODO`s first: email, GitHub link, optionally LinkedIn / ORCID / Google Scholar,
`photo`, and `cvPdf`.

## 3. Add a certificate, paper, poster or report

1. Upload the file into the **`files/`** folder (PDF, PNG or JPG).
   Tip: use simple names without spaces, e.g. `files/epic-v-certificate.pdf`.
2. In `content.js`, find the `documents` list and either fill in `file:` on an existing entry
   or add a new one:

```js
{
  title: "EPIC V — Scientific Data Analysis & ML in Python",
  type: "certificate",           // certificate | paper | poster | report | other
  date: "2024",
  issuer: "ICTP · Latitud Cero",
  file: "files/epic-v-certificate.pdf",
  thumb: "files/epic-v-thumb.png", // optional preview image for the card
},
```

Entries with `file: ""` show as "coming soon" so the gallery never has broken links.
New `type` values automatically get their own filter chip.

Preview images: a quick way is to screenshot the first page of the PDF and save it as PNG.

## Notes

- Keep files under ~25 MB each (GitHub's web-upload limit); compress big posters.
- Anything in the repo is public — don't upload documents with ID numbers, grades you don't
  want public, or unpublished manuscripts without your co-authors' OK.
- To preview locally, just open `index.html` in a browser.

## Colors

Five palettes are built in, each with a dark and a light version: `lattice`, `andes`, `aurora`,
`plasma` and `paper`. Set `palette:` in `content.js`. Visitors can switch with the 🎨 button;
set `showPalettePicker: false` to hide the button and lock your choice.

## Add a new section

In `content.js`, find `extraSections` and copy one `{ id, title, menu, items: [...] }` block.
Each new section appears on the page and in the top menu automatically, and sections are
renumbered for you. No HTML or JavaScript changes needed.
