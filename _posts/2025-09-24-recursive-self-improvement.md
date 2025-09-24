---
layout: post
title: "Recursive Self-Improvement, Without the Hype"
date: 2025-09-24
mathjax: true
---

A skeptical, solution-oriented look at what RSI is, what it is not, and how to tell the difference.

## TL;DR

- RSI $$\neq$$  "model gets bigger." It is a feedback loop where a system improves its own ability to improve, not just its task scores.
- Today we see fenced self-improvement (AI feedback, self-correction, agentic automation) but no open, accelerating RSI that persists without human curation.
- The bottleneck is not ideas—it is validation, physics, and economics.
- Over the next 5/10/20 years expect rising automation and local RSI cells (compilers, provers, chip heuristics), but general runaway RSI is unlikely without breakthroughs in autonomous validation and substrate upgrades (hardware, materials, representations).

---

## What RSI Really Means

Most takes confuse automation with autonomy. Recursive Self-Improvement (RSI) is a loop:

Improve the improver → which then improves faster → which then improves its own improving ability again.

Two variables matter:

- $$ g(C) $$: the improvement power (search heuristics, tools, meta-learning) you gain as capability $$C$$ rises.
- $$ D(C) $$: the difficulty/validation cost of reliably confirming that the next change is actually better.

A simple dynamic is

<div class="math-display">
  \[
  \dot{C} = \frac{g(C)}{D(C)}
  \]
</div>

- If $$ g(C) $$ scales roughly linearly with $$C$$ and $$D(C)$$ stays modest → exponential progress.
- If $$ D(C) $$ outpaces $$g(C)$$ (costly validation, governance, physics) → progress slows, even as the system "gets smarter."

Key test: RSI is not just more tokens or more inference-time branching. It is persistent, accelerating self-modification (weights, code, toolchain) with autonomous validation.

---

## Where We Actually Are (2025)

We already have fragments of self-improvement:

- AI feedback (RLAIF), constitutional training, self-critique. Lowers labeling costs; improves alignment and instruction following.
- Inference-time scaling (chain/tree-of-thought, tool-use, retrieval, multi-agent debate). Helps during inference but does not change the base model's persistent capacity.
- Agentic pipelines ("AI scientist" workflows): literature search, code synthesis, experiment orchestration. Useful automation, still externally orchestrated and benchmark-sensitive.
- Self-play and meta-learning in constrained domains (games, theorem-proving, compiler passes) with real, sometimes strong gains.

But not RSI: improvements are brittle across domains, depend on human-set goals and curation, and rarely demonstrate accelerating cycles with persistent weight/toolchain changes and robust, autonomous validation.

---

## Why the Loop Stalls: The Denominator Problem

1. **Validation cost explodes.** Proving a change is genuinely better (OOD robustness, safety, formal invariants) scales faster than "finding another clever tweak." The bigger the system, the heavier the test harness.
2. **Bottlenecks migrate.** You fix an optimizer and then hit data, I/O, bandwidth, memory locality, hardware packaging, or lab throughput next.
3. **Hard limits exist.** Complexity theory (NP-hard or worse), undecidability, and physics/thermodynamics (energy per bit, latency/bandwidth, noise floors, fabrication lead times).
4. **Goodhart and governance.** Optimizing a proxy metric can diverge from the true goal; growing capability invites stricter compliance and human gating—slowing the loop for good reasons.

---

## "But Super-Intelligence Would Just Do It, Right?"

Not automatically. A "smarter" agent massively boosts $$g(C)$$: better search, faster synthesis, tighter proofs, superior experiment design. Yet serial realities remain:

- Some validation steps have irreducible clock time (fabrication, physical experiments).
- Energy, capital expenditure, and supply chains are not thought experiments.
- Without autonomous, trustworthy validation, humans will (and should) keep the gate.

Bottom line: intelligence multiplies what is parallelizable; it does not delete serial or physical constraints.

---

## The Classic "ASI in 10 Years" Arguments—and Where They Miss

1. **Trend extrapolation (compute → capability → AGI/ASI).** Correlation is not causal inevitability; scaling laws show diminishing returns outside curated benchmarks. Validation and cost curves worsen with scale.
2. **"The labs/CEOs say so."** Definitions drift, incentives skew optimistic, and public claims rarely ship with reproducible RSI indicators (persistent gains, OOD robustness, falling cost per capability point).
3. **"Hardware will save us."** Roadmaps are real (denser memory, higher bandwidth), but power, capex, and lead times now dominate. Compute can grow while economic throughput stalls.
4. **"Agents plus self-improvement heuristics."** Today we have automation of research chores, not autonomous, accelerating self-rewrite. Gains often vanish once you strip inference-time tricks from persistent improvements.

---

## A Clear RSI Checklist (Use This to Audit Any Bold Claim)

A system is on an RSI path only if you can answer yes to most of these—with data:

- **Persistence:** After turning off extra inference-time sampling/tools, do weights, code, or tooling remain better?
- **Acceleration:** Does the time between significant, externally reproduced improvements shrink consistently?
- **Autonomous validation:** Are safety, robustness, and OOD checks run end-to-end without human curation, with rollback on failure?
- **Breadth:** Do the improvements transfer across tasks without bespoke prompts or hand-holding?
- **Unit economics:** Do euro and kilowatt-hour costs per capability point fall over time—even as requirements tighten?
- **Bottleneck awareness:** Does the agent choose substrate upgrades (compilers, architectures, lab protocols) when their ROI beats software tweaks—and execute them?

If a paper, demo, or announcement cannot answer these, it is automation, not RSI.

---

## What to Expect in 5 / 10 / 20 Years

- **≈5 years (2030):** Much stronger agentic automation and AI-feedback training, better compilers/provers, bigger clusters. No open RSI. Human-in-the-loop validation still rules cadence.
- **≈10 years (2035):** Semi-autonomous validation matures (formal checks plus fuzzing plus high-throughput labs). Expect local RSI cells in narrow toolchains (compiler passes, solver heuristics, specific synthesis tasks). Still bounded by goals, governance, and physics.
- **≈20 years (2045):** Three forks:
    1. Conservative logistic curve: progress continues but plateaus—validation and economics dominate.
    2. Breakthrough: new representations and automated verification let $$g(C)$$ finally outrun $$D(C)$$ across domains → broader RSI dynamics.
    3. Headwinds: energy, supply chains, and regulation slow the loop; RSI remains niche and fenced.

---

## How to Build Toward Real RSI (Without Self-Delusion)

1. **Engineer the denominator:** Invest first in validation automation (formal properties, property-based testing, red-teaming at scale, reproducibility), not just bigger models.
2. **Keep a bottleneck ledger:** Each iteration must identify the next constraint (data, IO, memory, lab time) and attack that—not vanity metrics.
3. **Representation over raw scale:** Domain-specific languages, typed intermediate representations, proof assistants, differentiable simulations—tools that shrink search space.
4. **Substrate pragmatism:** Treat hardware, packaging, compilers, and labs as part of the learning system; choose upgrades via explicit ROI tests.
5. **Guardrails by design:** Isolated self-edits, sandboxed execution, formal invariants, and hard rollback. Avoid "fast wrong" feedback loops.

---

## A Note on Epistemic Humility

It is possible that we are failing to imagine what a far smarter system would do. That does not erase complexity, undecidability, physics, and economics. The sober position is not "never," but "show me the loop": persistent self-modification, accelerating cadence, autonomous validation, falling unit cost—across domains.

Until we see that, what we have is extraordinary automation—not recursive self-improvement.

---

## One-Page RSI Scorecard (For Your Next Paper or Demo)

- [ ] Persistent self-updates?
- [ ] Time-to-next-breakthrough shrinks?
- [ ] Autonomous validation (safety/OOD/rollback)?
- [ ] Cross-task transfer without curation?
- [ ] Costs per capability point falling?
- [ ] Substrate choices made and executed by the system?

If you can tick four or more boxes with convincing evidence, you are not just scaling—you are looping.

---

**Bottom line:** RSI is a feedback-design problem, not a vibes curve. Today’s systems deliver powerful, sometimes stunning automation; they do not yet improve their ability to improve in a persistent, accelerating, autonomously validated way. To get there, aim ambition at the denominator—and make the loop undeniable.
