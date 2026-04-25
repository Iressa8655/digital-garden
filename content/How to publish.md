---
title: How to publish (private notes to self)
draft: true
tags: [private, instructions]
---

# How to publish a note to my digital garden

> This file lives in `Public/` so I can find it easily, but it is marked `draft: true` in the frontmatter so Quartz **will not** publish it. Safe to keep here.

Live site: **https://iressa8655.github.io/digital-garden/**

## The workflow

1. Write the note in Obsidian as normal.
2. Drag it (and any images it uses) into `C:\Users\iress\Dropbox\Iressa's note\Public\`, organised into whatever subfolder makes sense (e.g. `Essays/Code in Place/`, `DPhil/`, `Talks/2026/`). The folder structure I create here becomes the URL structure on the site.
3. Open File Explorer, navigate to `C:\Users\iress\Dropbox\Iressa's note\` and **double-click `publish.bat`**.
4. A black window opens, lists the files it is about to publish, copies them across, runs `npx quartz sync`, and waits for me to press Enter before closing.
5. About two minutes later, the site updates. Live URL above.

## Make it even easier (one off setup)

Right-click `publish.bat` in the vault folder, choose **Send to → Desktop (create shortcut)**. Now `publish.bat` lives on the Desktop. Double-click from there forever after; no need to open the vault folder.

## Folder rules

- **Anything inside `Public/` gets published**, except files with `draft: true` in frontmatter (like this one).
- The folder structure inside `Public/` mirrors the URLs on the site.
  - `Public/Essays/Code in Place/foo.md` becomes `iressa8655.github.io/digital-garden/Essays/Code-in-Place/foo`.
  - `Public/DPhil/Reading/bar.md` becomes `iressa8655.github.io/digital-garden/DPhil/Reading/bar`.
- Keep images in a sibling `attachments/` folder. Embed with Obsidian wikilinks: `![[attachments/my-image.png]]`. Quartz resolves them correctly.
- **Never** put `publish.bat` or `publish.ps1` inside `Public/`. They live in the vault root, one level up.

## Where things actually live

| Thing | Location |
|---|---|
| Vault | `C:\Users\iress\Dropbox\Iressa's note\` |
| Public folder (what gets published) | `C:\Users\iress\Dropbox\Iressa's note\Public\` |
| Publish scripts | `C:\Users\iress\Dropbox\Iressa's note\publish.bat` and `publish.ps1` |
| Quartz install (the engine) | `C:\Users\iress\quartz\` |
| GitHub repo (the source) | https://github.com/Iressa8655/digital-garden (branch `v4`) |
| Live site (Quartz, themed) | https://iressa8655.github.io/digital-garden/ |
| Build status (if a publish seems stuck) | https://github.com/Iressa8655/digital-garden/actions |

## When things go wrong

- **"publish.bat just opened in Notepad."** Don't right-click open with Notepad. Just double-click it; Windows runs `.bat` files automatically.
- **"It says ERROR: Public folder not found."** Check the path; maybe Dropbox renamed something or the Public folder got dragged elsewhere.
- **"It pushed but the site hasn't updated."** Wait two minutes; GitHub Actions has to rebuild. Check the build status link above. If a build failed, click into it for the error.
- **"My image doesn't show up."** Make sure the image is in `Public/attachments/` and the wikilink reads `![[attachments/your-image.png]]` (no leading slash, no folder typos).
- **"I want to unpublish a note."** Either delete it from `Public/` and re-run `publish.bat`, or add `draft: true` to its frontmatter and re-publish.
