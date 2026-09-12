---
title: AI hype versus real ROI, and why most corporate AI projects never paid for themselves
date: 2026-09-12
tags:
  - artificial-intelligence
  - roi
  - moats
  - open-source
---

# AI hype versus real ROI

Notes and reflections from a masterclass by **Seena Rejal**, Chief Commercial Officer at NetMind.AI, given at Oxbridge AI X in August 2026. The framing and examples below are his. The connections I draw to how early-stage companies get evaluated are mine.

It was a commercial talk rather than a technical one, and it circled one question. Why did almost every corporate generative-AI project fail to pay for itself, and what would one that paid for itself actually look like?

![[attachments/roi-argument-chain.svg]]

---

## 1. The diagnosis, value was measured before cost was

The headline finding he opened with is now fairly well known. Research out of MIT found that the overwhelming majority of enterprise generative-AI pilots produced no measurable value, with independent surveys landing in a similar range.

His explanation for it is the single most useful sentence of the talk, and it is not about the technology at all.

**Organisations measured the value of AI before they had measured its cost.** A pilot gets green-lit on the strength of a demo, runs up an unbounded inference bill, and nobody ever establishes what specific cost line was supposed to come down. The project then cannot be shown to have worked, because nobody defined what working meant in pounds.

That single discipline being skipped explains most of the failures. Not model quality, not talent, not data readiness.

## 2. The cause, the model layer became a commodity

The second move in the argument is that the thing everyone built on top of is no longer scarce.

Open-weight models now sit within a fraction of a point of the frontier on standard benchmarks while costing a small fraction of the price. Access to a capable model is something any competitor can buy on the same terms as you, on the same afternoon.

The consequence for startups is blunt. A company whose entire product is a thin layer over somebody else's model API has nothing a larger player cannot replicate, and the larger players have been steadily absorbing exactly those features into their own products. A very large share of that cohort is expected not to survive.

> [!note] Why this matters on the investing side
> This is the same commoditisation risk I wrote about in [[Ventures/How venture capital actually works|how venture capital actually works]], seen from the buyer's side rather than the investor's. The question "what happens to this company when the next frontier model ships" is the single highest-value question you can ask about an AI business, whether you are buying its product or its equity.

## 3. The answer, build a moat

His framing here is deliberately unexciting. None of this is new to AI. These are the ordinary rules of competitive advantage, applied to a new sector, which is reassuring because it means the existing analytical tools still work.

He gives five moats.

1. **Data flywheel.** Not "we have data". A loop. Customers use the product, their use generates data, the data makes the product better, which attracts more customers. A competitor cannot buy the loop because they would need your customers first. His example is a legal AI company valued in the billions on the strength of proprietary law-firm data rather than any modelling advantage.
2. **Workflow integration.** Being embedded in how a team already works, rather than being a tool someone opens occasionally. Several products dismissed early on as thin wrappers turned out to have this, and are now worth a great deal.
3. **Owned distribution.** Reach into a market that the model providers do not have, which can be built astonishingly fast when it works.
4. **Brand and trust.** Auditable compliance, the SOC 2 and HIPAA and GDPR work, which a new entrant cannot ship overnight. As he put it, "Compliance is boring. Compliance is also a moat."
5. **Network effects.** Value compounding as more users or institutions join the same system. The social platform playbook, unchanged.

Asked afterwards whether a company needs all five, his answer was no, but that a company with all five would be close to immovable. One real moat makes a business.

![[attachments/roi-five-moats.svg]]

The distinction he draws at the end of that section is the one I keep coming back to. **A large valuation is a bet somebody has placed on you. A moat is the reason you no longer need them to keep believing it.** He cites a company that reached a $1.5 billion valuation on generic AI copywriting and was forced into a hard pivot the moment that capability became free inside a general chatbot.

---

## 4. The part you can use on Monday

The practical half of the talk was a five-step approach for anyone actually deciding whether to fund an AI project.

![[attachments/roi-toolkit.svg]]

**Measure the workflow, not the headcount.** The failure mode is trying to automate out a *job title*, which is vague and unmeasurable, instead of naming the specific bounded workflow that person performs. He says client conversations have visibly shifted from "remove five people from this team" to "here are our workflows and here are the bottlenecks", and that the second conversation is the one that produces returns.

**Start in the back office.** Front-office pilots demo beautifully. Claims processing and fraud detection move the profit and loss statement.

**Cap the cost, and budget for governance.** Two instructions, and the second is the one people miss. Set a hard spending ceiling before go-live so you cannot become dependent on a platform you can no longer leave. Then accept that somebody has to monitor and maintain the system, which is a real and recurring line item rather than an afterthought.

**Default to open source.** His stated position is to open with open weights and move to a closed model only for a very strong specific reason. When the gap is a fraction of a point, paying a premium is a choice that needs justifying.

**Ask what moat this builds.** If the honest answer is none, the project is funding a feature that a larger lab will ship free next quarter.

---

## 5. What I took from it

Three things stayed with me.

**The discipline is financial, not technical.** Every failure mode he described is a budgeting failure wearing a technology costume. Nobody in these stories was defeated by the model.

**"Wrapper" is a question about time, not architecture.** Several of the products that got dismissed as wrappers turned out to be among the most defensible businesses in the sector, because they built a flywheel or an integration underneath while everyone was arguing about the surface. The useful version of the question is not "is this a wrapper today" but "what will still be theirs in three years".

**It applies to research, not just products.** A predictive model is not defensible as a model, since anyone can fit one. What makes clinical machine-learning work defensible is the same as what makes a company defensible, linked data that nobody else can assemble, and a validated, auditable artefact that an institution is actually willing to trust. Those are the two moats a frontier lab cannot ship next quarter, and they are exactly the two that take years of unglamorous work to build.

---

*Speaker: Seena Rejal, Chief Commercial Officer, [NetMind.AI](https://netmind.ai/). Talk given at Oxbridge AI X, August 2026. Any errors in summary or interpretation are mine.*

*Related* → [[Ventures/How venture capital actually works|How venture capital actually works]]
