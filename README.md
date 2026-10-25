# CircuitVerse simulator, as built for mytekdev.com

The [CircuitVerse](https://circuitverse.org) digital logic simulator is by the
CircuitVerse contributors. Its front end,
[cv-frontend-vue](https://github.com/CircuitVerse/cv-frontend-vue), is MIT licensed,
and so are our changes (see LICENSE).

This repository holds the copy that students open on mytekdev.com.

- `main` is the built app we serve, exactly as deployed.
- `source` is the source it was built from: upstream commit
  [0b7d0ed](https://github.com/CircuitVerse/cv-frontend-vue/commit/0b7d0edcdddd19440f9de6569a833635a74d50c4)
  (2026-05-31), plus one commit of our changes.

## What we changed

1. **Save hooks.** `v1/src/main.ts` adds `cvSerialize`, `cvRestore`, `cvHasClock`
   and `cvPreviewImage` on `window`, so the embedding page can save, reopen and
   thumbnail a project.
2. **Read-only preview.** `?view=embed` opens upstream's embed view.
3. **Icon paths.** Element icons load from `public/img/` through `BASE_URL`, so the
   app works below the site root.
4. **A shorter Project menu.** Saving and opening are done by the embedding page, so
   those items and the links to circuitverse.org are gone.
5. Two small fixes: the hover label in the embed view is set as text rather than
   HTML, and an empty project id no longer starts a fetch.

The commit message on `source` has the details.

## Building it

```
git checkout source
npm ci
VITE_BASE=/apps/circuitverse/ node scripts/multi-build.js v1
```

The output in `dist/simulatorvue/v1/` matches `main` byte for byte. The build
needs about 3 GB of memory.

`jquery-1.9.1.min.js` is the unmodified jQuery 1.9.1 (MIT) that the simulator
expects; we serve it ourselves instead of loading it from Google. The icon fonts in
`assets/` are Font Awesome Free (SIL OFL 1.1) and Material Design Icons (Apache
2.0), bundled from their npm packages.

The page that embeds the simulator on mytekdev.com, the script that connects it to
the site, and the preview page are separate programs that use the hooks above. They
are not part of this repository.
