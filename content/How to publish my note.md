![[image.png]]
**Step 1 — Write your note in Obsidian** as you normally would.

**Step 2 — Move it to your `Public` folder** in Obsidian. Just drag the note into the `Public` folder. Only stuff in here gets published — everything else stays private.

**Step 3 — Copy to Quartz.** Open PowerShell and run:

```
Copy-Item -Path "C:\Users\iress\Dropbox\Iressa's note\Public\*" -Destination "C:\Users\iress\quartz\content" -Recurse -Force
```

**Step 4 — Push it live:**

```
cd C:\Users\iress\quartz
npx quartz sync
```

Wait a couple minutes and your new note will be live at **[https://iressa8655.github.io/digital-garden/](https://iressa8655.github.io/digital-garden/)**

That's it — just those 4 steps every time! Steps 3 and 4 are really the only PowerShell commands you need to remember.

If you want to preview locally before publishing, you can add an optional step between 3 and 4:

```
npx quartz build --serve
```

Then check `http://localhost:8080` before pushing.