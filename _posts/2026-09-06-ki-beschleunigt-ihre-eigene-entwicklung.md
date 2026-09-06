---
layout: post
title: "What happens when AI helps build the next AI?"
date: 2026-09-06 09:00:00 +0200
lang: en
locale: en_US
permalink: /blog/ki-beschleunigt-ihre-eigene-entwicklung/
description: "Faster chips could do more than speed up a chat. They could shorten the wait for the next generation of AI—and leave us less time to catch up."
excerpt: "Suppose the next generation of AI arrives six months early because the current one helped build it. That's the speedup I want to understand."
tags: [AI, zHBM, Hardware, Research, Economics]
---

Suppose the next generation of AI arrives six months early because the current one helped build it.

The model wrote some of the code, helped find a better training algorithm, or caught a hardware problem before anyone sent the design off for manufacturing. Nothing especially cinematic. Just enough useful work, in the right places, to bring the whole schedule forward.

Then its successor does the same.

That's the possibility I keep coming back to when I read about faster AI hardware. Saving a few seconds in a chat is easy to appreciate. Shortening the development cycle of the technology itself is harder to picture, and potentially much more consequential.

A recent Samsung announcement brought this back to mind. In August 2026, the company presented zHBM, a memory concept that stacks high-bandwidth memory directly above an AI accelerator. The aim is to move data over shorter distances and improve bandwidth and energy efficiency. Samsung is describing a concept and performance targets here; those aren't measured results for a finished AI system. [Samsung's announcement](https://news.samsung.com/global/samsung-unveils-next-gen-3d-memory-vision-at-fms-2026-charting-the-future-of-ai-infrastructure)

I wouldn't hang a prediction about the future on one memory roadmap. Still, it's a useful place to start.

## The unglamorous problem of moving data

A chip can have enormous computing capacity and still spend time waiting for the data it needs. How much this matters depends on the workload. Generating one answer, processing a large batch of requests, and training a model put different demands on the system.

HBM helps by putting a lot of memory bandwidth close to the processor. zHBM would take that proximity further. Shorter connections could make moving data cheaper in energy and time, leaving more of the system's capacity available for useful work.

The tempting next step is to turn a bandwidth figure into a claim about chat speed. Eight times this, ten times that, therefore thousands of tokens per second. I'd be careful. The model, software, context length, network, and load all matter. So does the distinction between serving a hundred people at once and making one person's answer arrive faster.

What would interest me is a sustained reduction in the cost of getting a difficult task right. Include the failed attempts. Include checking the result. Include the engineer who has to repair the damage when a plausible answer turns out to be wrong.

If that cost falls enough, we can afford to try things that currently aren't worth the effort.

Take a stubborn software bug. Instead of following the first plausible explanation, a system could reproduce the failure, investigate several causes, try alternative fixes, and run the relevant tests. You might get a short explanation and a small patch. Most of the extra computation would be invisible.

I'd happily pay for that. I have much less use for a longer answer.

## There is already a small, concrete example

Google DeepMind's AlphaEvolve is worth looking at because the reported results are specific enough to examine.

According to Google, it found improvements in data-center scheduling, proposed a simplification to a TPU circuit, and sped up a computing kernel used in Gemini training. That last result came with two numbers: a 23% speedup for the affected kernel and roughly a 1% reduction in training time overall. [DeepMind's account](https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/)

Both numbers matter. Quoting only the first would give a misleading impression of the benefit. Dismissing the second would miss why a small improvement can be valuable when applied to an expensive process.

There is a fairly strict condition attached to this approach. Candidate solutions have to be evaluated automatically. The authors explicitly put tasks requiring manual experiments outside the scope of their work. [AlphaEvolve paper](https://arxiv.org/abs/2506.13131)

So we have an AI system contributing to some of the software and hardware work that supports AI development. People still choose the problems, establish the checks, and decide what gets used. It doesn't establish an autonomous cycle that keeps accelerating. But it gives the broader idea something firmer to stand on than a diagram with arrows pointing back to themselves.

In my [earlier post on recursive self-improvement]({% post_url 2025-09-24-recursive-self-improvement %}), I focused on the distinction between automating research tasks and a system persistently improving its own capacity to improve. I still think that distinction matters. Economically, though, quite a lot could happen before we reach the stricter definition.

A research team doesn't need to hand over its entire job for AI assistance to change its schedule.

## Watch the time between improvements

Imagine a comparable, independently checked advance taking twelve months, then nine, then six. Those are illustrative numbers, not a forecast. The interesting evidence would be whether earlier improvements actually helped make the later ones arrive sooner.

That is harder to establish than a higher benchmark score. You would need to account for spending, team size, changes in the difficulty of the task, and the work left out of the measurement. A shorter training run doesn't help much if preparing the data now takes twice as long.

Even the elementary maths can mislead. Adding twenty units each year is linear growth; adding twenty percent is exponential. Neither tells us whether “AI capability” can sensibly be represented by one number, or whether the trend will survive the next bottleneck.

For now, I'd watch development time and total cost alongside the quality of the result. Then I'd ask how much of the gain gets carried into the next round. A pattern that survives several generations would be much more persuasive than one unusually good demonstration.

There's another easy mistake here: multiplying an agent's ability by the number of copies we can run and calling the result research output.

A hundred agents might explore a hundred useful possibilities. They might also converge on the same bad idea, rely on the same flawed source, or sit waiting for the same experiment. Parallel work helps when a problem can actually be divided and the answers can be checked. More instances don't remove a dependency between two steps.

And if faster hardware is what lets you run more agents, you can't necessarily count the hardware gain and the extra agents as separate multipliers. You may be counting the same benefit twice.

## Eventually, someone has to make the chip

This is where the most dramatic versions of the argument lose me.

A promising design still needs fabrication, packaging, cooling, and tests on real hardware. Simulations can prevent mistakes, but they don't replace every measurement. Nor does a better design create an available factory slot.

I expect software to be the easier place for this feedback to accelerate. Changes can often be tried quickly, and some outcomes are straightforward to measure. Hardware has longer stretches where the limiting factor is something you cannot solve by generating another candidate.

That doesn't make AI assistance irrelevant. Finding a thermal problem before fabrication could save a costly iteration. A better experiment could answer a question with fewer physical samples. The gain depends on whether that work lies on the critical path.

Robotics and automated labs might eventually extend the reach of the cycle. But there are several substantial engineering problems between “AI designs a robot” and “robots build the factories that produce more AI chips.” I don't want to hide all of them inside one arrow.

It seems more plausible to me that progress would be uneven: quick gains in one area, a frustrating wait somewhere else, then another opening. zHBM could provide one of those openings. Or it could arrive late and prove too expensive for much of the market. The broader argument has to survive either outcome.

## Cheaper code would change what is worth building

My work involves CRM systems, data integration, and AI applications. That makes the software side of this feel much less abstract.

There are plenty of workflows for which a custom tool would be useful but hard to justify. Perhaps only a small team needs it. Perhaps it saves too little time to cover development and maintenance. Lowering those costs could make very specific software viable, including tools designed around a single person's way of working.

I can see why that puts pressure on some existing software businesses. I also think “an agent can build my CRM” skips over much of what a company is paying for.

Who migrates the data? Who decides which users may change it? What happens when an upstream system sends an unexpected value, or an integration fails halfway through? A working interface is a start. Keeping the business process dependable is ongoing work.

If implementation gets cheaper, I would expect understanding the customer's problem, handling those operational details, and earning trust to account for more of a product's value. Competition could become fiercer without making software companies unnecessary.

The same unevenness applies to research. Searching a space of programs with a reliable evaluator is a good candidate for extra computation. An open scientific question without a dependable test is a different proposition. A million answers that sound right still leave you with the problem of finding out which ones are true.

## Less time to catch up

A productive feedback cycle could make an early advantage more durable. The team already using AI well gains experience, improves its tools, and has more resources for the next attempt. A delay may cost several rounds of learning.

For Europe, I think the practical questions are quite concrete. Can a useful project get access to power and computing capacity? Are requirements clear enough to act on? Which checks reduce a real risk, and which delays simply leave a decision sitting in someone's queue?

I'm not suggesting we treat speed as the only objective. Poorly checked systems can create expensive problems of their own. But if development cycles shorten, institutions that take years to respond will have a harder job keeping up.

So will people.

Suppose a change that might once have unfolded over fifteen years happens in five. Again, a thought experiment. Even without any grand “intelligence explosion,” that would give workers, companies, and public institutions much less time to adjust. Higher productivity would not automatically settle who benefits from it, either. Access to the tools and ownership of the infrastructure would matter enormously.

This is the part I find difficult to shrug off. We don't need infinite growth for the transition to be disruptive. A substantial change in the pace would be enough.

When the next memory announcement comes along, I'll still look at the bandwidth numbers. But I'll also be looking for evidence further down the chain: shorter experiments, cheaper validation, useful improvements reaching the next system sooner.

The first sign might be fairly mundane. A team gets a result earlier than expected. Some of the time it saved goes into a better tool for the next project. Then that project finishes sooner too.

I'd want to know when that stops being an occasional success and starts becoming the normal way progress happens.
