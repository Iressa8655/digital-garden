---
title: Why I don't just vibe code
status: draft
started: 2026-04-25
source: Code in Place 2026, Week 1 reflection
tags: [essay, code-in-place, ai, learning]
target: personal website (GitHub Pages)
---

# Why I don't just vibe code

> Draft, extracted from [[Weekly Progress#Week 1 — 2026-04-20 → 2026-04-26 — Kickoff (Session 1)]]

## The hook
I used to think that knowing how to *prompt* an AI to write code was, more or less, the same as knowing how to code. Reader, it isn't. Here's the moment I found out.

## The trapezoid story
I was working on an OpenSim Moco script, `presurg_metabolics.py`, that simulates a pre-surgery walking trial and computes the metabolic cost of transport. To get total energy expenditure across the stride, you have to integrate the muscle metabolic rate over time. Claude had written that integration step using `numpy.trapezoid(...)`, which is the trapezoidal rule for numerical integration, i.e. accumulated energy.

I ran it. It errored. I assumed the script was broken, said so out loud (with feeling), and went looking for someone to blame.

The script, as it happens, was fine. `numpy.trapezoid` was added in NumPy 2.0; the older spelling `numpy.trapz` was deprecated at the same moment. My environment was on an older NumPy (Python 3.8 / OpenSim 4.5 stack), so Python had no idea what `trapezoid` was: `AttributeError: module 'numpy' has no attribute 'trapezoid'`. Claude had cheerfully hallucinated against a newer NumPy than the one actually running on my machine. I had shipped, and then defended, code I did not understand.

```python
# What Claude wrote (NumPy >= 2.0):
energy = np.trapezoid(metabolic_rate, time)

# What my environment needed (NumPy < 2.0):
energy = np.trapz(metabolic_rate, time)
```

A one line fix once you know. Completely invisible if you don't.

> 📎 Source script kept as a reminder: [[attachments/presurg_metabolics.py]]


## What I actually learned
- You don't need to know every line of your code from head to toe. Nobody is asking you to memorise the standard library.
- You are, however, **responsible** for what you put in. "The AI wrote it" is not a defence. Not to your collaborators, not to your supervisor, and (the awkward bit) not to yourself.
- The skill that matters isn't typing the code. It's reading what the AI gave you well enough to spot when it is lying, hallucinating, or quietly assuming a different version of your environment.

## Why I'm doing Code in Place anyway
Because the only way to read AI generated code critically is to have written enough of it yourself to know what "wrong" smells like. Vibe coding scales beautifully, right up to the moment something breaks and you can't tell whether it's the code, the environment, the version, or your prompt. At that point the person who actually understands the language wins, and the person who only knows how to prompt sits there refreshing Stack Overflow.

So I am going back to fundamentals on purpose. Karel the robot, `if/else`, `for`, `while`. Not because Karel is going to feature prominently on my CV, but because I want the muscle memory of *writing* the control flow, rather than nodding along when an AI hands it back to me.

## Receipts: what Week 1 actually taught me
This is not theoretical. Week 1 of Code in Place has already changed how I think about three things, each of which I would previously have outsourced to an AI without so much as a second thought.

**1. `if` vs `while`: spoken language intuition is a trap.**
Our section leader Eric asked, "How do we tell Karel when to start building a hospital column?" My instinct was `if`, because in English "if you see a beeper, build" *sounds* perfectly sensible. Sadly, the action has to repeat across the world rather than fire once. `if` is one shot; `while` keeps checking. The grammar of code isn't the grammar of speech, and an AI that follows your prompt literally will not catch the difference for you.

![[attachments/flow-control-summary.png]]

**2. Decomposition is what makes code survive a change of plan.**
The Karel exercise was to build "hospital" columns of beepers across a row. The naive version is one long sequence: go up, drop beepers, turn, come back down, move across, repeat. It works for one column. It falls apart the moment someone asks for four columns of different heights, which is, of course, exactly what happens.

The clean version splits `build_hospital` into two reusable pieces:
- `build_one_column`: go up, drop beepers
- `return_to_bottom`: come back down, ready to move on

Now `build_hospital` is just: *for each column, run `build_one_column`, then `return_to_bottom`, then move across*. Asking "could one column become four?" is the question that separates a script you wrote once from code you can actually maintain. It is also, conveniently, exactly the question AI generated code rarely answers on its own.

![[attachments/hospital-karel-task.png]]

**3. Pre and post conditions are how functions chain.**
Eric defined every function with an explicit precondition (the state the world must be in *before*) and postcondition (the state it will be in *after*). For example, `build_one_column`. Pre: facing right at the base. Post: facing right at the base, column built.

The trick: **one function's postcondition is the next function's precondition.** When that contract holds, things compose cleanly. When it doesn't, Karel ends up facing the wrong way three steps later and you spend forty minutes wondering if the universe is broken. It forces you to design state explicitly, which is precisely the layer AI tends to gloss over when it stitches snippets together for you.

The through line: each of these is a place I would previously have asked an AI to "just make it work" and accepted whatever it produced. Now I can see what it is doing, and, more usefully, what it is not.

## The rule I'm trying to live by
> Don't ship code you can't defend.

Not "don't use AI". Not "write everything from scratch like it's 1998". Just: if I put it in, I own it, which means I have to be able to read it.

---

## TODO before publishing
- [x] Tighten the trapezium story, name the actual function (`numpy.trapezoid` vs `numpy.trapz`, NumPy 2.0)
- [x] Add a short code snippet (before/after) so it's not pure prose
- [ ] Reproduce the actual error message and paste it verbatim
- [ ] Decide on tone: confessional vs. essay
- [ ] Cross link to the GitHub repo `code-in-place-2026`
- [ ] Pick a closing line that's quotable
