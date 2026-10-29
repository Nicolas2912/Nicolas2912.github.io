---
layout: post
title: "Recursive Self-Improvement ohne Hype"
date: 2025-09-24
mathjax: true
lang: de
locale: de_DE
permalink: /de/blog/recursive-self-improvement/
---

Ein skeptischer, lösungsorientierter Blick darauf, was RSI ist, was es nicht ist und wie man den Unterschied erkennt.

## TL;DR

- RSI $$\neq$$  „Das Modell wird größer.“ Es ist ein Feedback-Loop, in dem ein System seine eigene Fähigkeit verbessert, sich zu verbessern – nicht nur seine Ergebnisse bei einzelnen Aufgaben.
- Heute sehen wir eingehegte Selbstverbesserung (KI-Feedback, Selbstkorrektur, agentische Automatisierung), aber keine offene, sich beschleunigende RSI, die ohne menschliche Kuratierung Bestand hat.
- Der Engpass sind nicht die Ideen – sondern Validierung, Physik und Ökonomie.
- In den nächsten 5/10/20 Jahren ist mit zunehmender Automatisierung und lokalen RSI-Zellen zu rechnen (Compiler, Beweiser, Chip-Heuristiken). Eine allgemeine, unkontrolliert davonlaufende RSI ist ohne Durchbrüche bei autonomer Validierung und Substrat-Upgrades (Hardware, Materialien, Repräsentationen) jedoch unwahrscheinlich.

---

## Was RSI wirklich bedeutet

Die meisten Einschätzungen verwechseln Automatisierung mit Autonomie. Recursive Self-Improvement (RSI), also rekursive Selbstverbesserung, ist ein Kreislauf:

Den Verbesserer verbessern → der sich dadurch schneller verbessert → der dann wiederum seine eigene Fähigkeit zur Verbesserung verbessert.

Zwei Größen sind entscheidend:

- $$ g(C) $$: die Verbesserungskraft (Suchheuristiken, Werkzeuge, Meta-Learning), die man gewinnt, wenn die Fähigkeit $$C$$ steigt.
- $$ D(C) $$: die Schwierigkeit bzw. die Validierungskosten, verlässlich zu bestätigen, dass die nächste Änderung tatsächlich besser ist.

Eine einfache Dynamik lautet

<div class="math-display">
  \[
  \dot{C} = \frac{g(C)}{D(C)}
  \]
</div>

- Wenn $$ g(C) $$ ungefähr linear mit $$C$$ skaliert und $$D(C)$$ moderat bleibt → exponentieller Fortschritt.
- Wenn $$ D(C) $$ schneller wächst als $$g(C)$$ (teure Validierung, Governance, Physik) → der Fortschritt verlangsamt sich, selbst wenn das System „klüger wird“.

Der entscheidende Test: RSI bedeutet nicht einfach mehr Tokens oder mehr Verzweigungen zur Inferenzzeit. Es ist dauerhafte, sich beschleunigende Selbstmodifikation (Gewichte, Code, Toolchain) mit autonomer Validierung.

---

## Wo wir tatsächlich stehen (2025)

Bruchstücke von Selbstverbesserung gibt es bereits:

- KI-Feedback (RLAIF), konstitutionelles Training, Selbstkritik. Senkt die Kosten für Labeling; verbessert Alignment und das Befolgen von Anweisungen.
- Skalierung zur Inferenzzeit (Chain-/Tree-of-Thought, Tool-Nutzung, Retrieval, Debatten zwischen mehreren Agenten). Hilft während der Inferenz, verändert aber nicht die dauerhafte Leistungsfähigkeit des Basismodells.
- Agentische Pipelines (Workflows nach dem Muster eines „KI-Wissenschaftlers“): Literaturrecherche, Codesynthese, Orchestrierung von Experimenten. Nützliche Automatisierung, aber weiterhin von außen orchestriert und empfindlich gegenüber der Wahl des Benchmarks.
- Self-Play und Meta-Learning in eng begrenzten Domänen (Spiele, Theorembeweisen, Compiler-Pässe) mit echten, teils deutlichen Gewinnen.

Aber das ist keine RSI: Die Verbesserungen sind über Domänen hinweg fragil, hängen von menschlich gesetzten Zielen und Kuratierung ab und zeigen selten sich beschleunigende Zyklen mit dauerhaften Änderungen an Gewichten oder Toolchain und robuster, autonomer Validierung.

---

## Warum der Kreislauf ins Stocken gerät: das Nennerproblem

1. **Die Validierungskosten explodieren.** Nachzuweisen, dass eine Änderung wirklich besser ist (OOD-Robustheit, Sicherheit, formale Invarianten), skaliert schneller als „noch einen cleveren Kniff finden“. Je größer das System, desto aufwendiger die Testumgebung.
2. **Engpässe wandern.** Man verbessert einen Optimierer und stößt als Nächstes auf Daten, I/O, Bandbreite, Speicherlokalität, Hardware-Packaging oder Labordurchsatz.
3. **Es gibt harte Grenzen.** Komplexitätstheorie (NP-schwer oder schlimmer), Unentscheidbarkeit sowie Physik und Thermodynamik (Energie pro Bit, Latenz/Bandbreite, Grundrauschen, Vorlaufzeiten in der Fertigung).
4. **Goodhart und Governance.** Wer eine Ersatzmetrik optimiert, kann sich vom eigentlichen Ziel entfernen; wachsende Fähigkeiten ziehen strengere Compliance und menschliche Freigaben nach sich – und verlangsamen den Kreislauf aus guten Gründen.

---

## „Aber eine Superintelligenz würde das doch einfach erledigen, oder?“

Nicht automatisch. Ein „klügerer“ Agent steigert $$g(C)$$ massiv: bessere Suche, schnellere Synthese, straffere Beweise, überlegenes Experimentdesign. Doch serielle Realitäten bleiben bestehen:

- Manche Validierungsschritte brauchen eine Zeit, die sich nicht verkürzen lässt (Fertigung, physische Experimente).
- Energie, Investitionsausgaben und Lieferketten sind keine Gedankenexperimente.
- Ohne autonome, vertrauenswürdige Validierung werden Menschen die Freigabe in der Hand behalten – und das sollten sie auch.

Unterm Strich: Intelligenz vervielfacht, was sich parallelisieren lässt; serielle oder physische Beschränkungen hebt sie nicht auf.

---

## Die klassischen Argumente für „ASI in 10 Jahren“ – und wo sie danebenliegen

1. **Trendextrapolation (Rechenleistung → Fähigkeit → AGI/ASI).** Korrelation ist keine kausale Zwangsläufigkeit; Skalierungsgesetze zeigen abnehmende Erträge außerhalb kuratierter Benchmarks. Validierungs- und Kostenkurven verschlechtern sich mit zunehmender Größe.
2. **„Die Labs/CEOs sagen es doch.“** Definitionen verschieben sich, Anreize verzerren ins Optimistische, und öffentliche Aussagen kommen selten mit reproduzierbaren RSI-Indikatoren (dauerhafte Gewinne, OOD-Robustheit, sinkende Kosten pro Fähigkeitspunkt).
3. **„Die Hardware wird uns retten.“** Die Roadmaps sind real (dichterer Speicher, höhere Bandbreite), aber inzwischen dominieren Energie, Investitionskosten und Vorlaufzeiten. Die Rechenleistung kann wachsen, während der wirtschaftliche Durchsatz stagniert.
4. **„Agenten plus Heuristiken zur Selbstverbesserung.“** Heute haben wir die Automatisierung lästiger Forschungsaufgaben, kein autonomes, sich beschleunigendes Umschreiben des eigenen Systems. Gewinne verschwinden oft, sobald man Tricks zur Inferenzzeit von dauerhaften Verbesserungen trennt.

---

## Eine klare RSI-Checkliste (zum Prüfen jeder kühnen Behauptung)

Ein System ist nur dann auf einem RSI-Pfad, wenn man die meisten dieser Fragen mit Ja beantworten kann – mit Daten:

- **Persistenz:** Bleiben Gewichte, Code oder Werkzeuge besser, nachdem man zusätzliches Sampling und Tools zur Inferenzzeit abgeschaltet hat?
- **Beschleunigung:** Wird die Zeit zwischen bedeutenden, extern reproduzierten Verbesserungen beständig kürzer?
- **Autonome Validierung:** Laufen Sicherheits-, Robustheits- und OOD-Prüfungen durchgängig ohne menschliche Kuratierung, mit Rollback bei Fehlschlag?
- **Breite:** Übertragen sich die Verbesserungen auf andere Aufgaben, ohne maßgeschneiderte Prompts oder Händchenhalten?
- **Stückkosten:** Sinken die Kosten in Euro und Kilowattstunden pro Fähigkeitspunkt mit der Zeit – selbst wenn die Anforderungen strenger werden?
- **Bewusstsein für Engpässe:** Wählt der Agent Substrat-Upgrades (Compiler, Architekturen, Laborprotokolle), wenn deren ROI den von Software-Optimierungen übertrifft – und setzt er sie um?

Wenn ein Paper, eine Demo oder eine Ankündigung diese Fragen nicht beantworten kann, handelt es sich um Automatisierung, nicht um RSI.

---

## Was in 5 / 10 / 20 Jahren zu erwarten ist

- **≈5 Jahre (2030):** Deutlich stärkere agentische Automatisierung und Training mit KI-Feedback, bessere Compiler/Beweiser, größere Cluster. Keine offene RSI. Validierung mit Menschen in der Schleife (Human-in-the-Loop) bestimmt weiterhin das Tempo.
- **≈10 Jahre (2035):** Halbautonome Validierung wird ausgereifter (formale Prüfungen plus Fuzzing plus Hochdurchsatzlabore). Zu erwarten sind lokale RSI-Zellen in eng umrissenen Toolchains (Compiler-Pässe, Solver-Heuristiken, bestimmte Syntheseaufgaben). Weiterhin begrenzt durch Ziele, Governance und Physik.
- **≈20 Jahre (2045):** Drei mögliche Abzweigungen:
    1. Konservative logistische Kurve: Der Fortschritt geht weiter, flacht aber ab – Validierung und Ökonomie dominieren.
    2. Durchbruch: Neue Repräsentationen und automatisierte Verifikation lassen $$g(C)$$ endlich domänenübergreifend $$D(C)$$ überholen → breitere RSI-Dynamik.
    3. Gegenwind: Energie, Lieferketten und Regulierung bremsen den Kreislauf; RSI bleibt eine eingehegte Nische.

---

## Wie man auf echte RSI hinarbeitet (ohne sich selbst etwas vorzumachen)

1. **Den Nenner gestalten:** Zuerst in die Automatisierung der Validierung investieren (formale Eigenschaften, Property-based Testing, Red-Teaming im großen Maßstab, Reproduzierbarkeit), nicht nur in größere Modelle.
2. **Ein Engpass-Register führen:** Jede Iteration muss die nächste Beschränkung identifizieren (Daten, IO, Speicher, Laborzeit) und genau diese angehen – nicht Vanity-Metriken.
3. **Repräsentation vor reiner Größe:** Domänenspezifische Sprachen, typisierte Zwischenrepräsentationen, Beweisassistenten, differenzierbare Simulationen – Werkzeuge, die den Suchraum verkleinern.
4. **Pragmatismus beim Substrat:** Hardware, Packaging, Compiler und Labore als Teil des lernenden Systems behandeln; Upgrades anhand expliziter ROI-Tests auswählen.
5. **Leitplanken von Anfang an:** Isolierte Selbständerungen, Ausführung in einer Sandbox, formale Invarianten und ein harter Rollback. Feedback-Loops nach dem Muster „schnell, aber falsch“ vermeiden.

---

## Eine Anmerkung zur epistemischen Demut

Es ist möglich, dass uns schlicht die Vorstellungskraft dafür fehlt, was ein weit klügeres System tun würde. Das hebt Komplexität, Unentscheidbarkeit, Physik und Ökonomie aber nicht auf. Die nüchterne Position lautet nicht „niemals“, sondern „Zeigt mir den Kreislauf“: dauerhafte Selbstmodifikation, ein sich beschleunigender Takt, autonome Validierung, sinkende Stückkosten – und zwar domänenübergreifend.

Solange wir das nicht sehen, haben wir es mit außergewöhnlicher Automatisierung zu tun – nicht mit rekursiver Selbstverbesserung.

---

## RSI-Scorecard auf einer Seite (für das nächste Paper oder die nächste Demo)

- [ ] Dauerhafte Selbst-Updates?
- [ ] Wird die Zeit bis zum nächsten Durchbruch kürzer?
- [ ] Autonome Validierung (Sicherheit/OOD/Rollback)?
- [ ] Transfer zwischen Aufgaben ohne Kuratierung?
- [ ] Sinkende Kosten pro Fähigkeitspunkt?
- [ ] Trifft das System Substrat-Entscheidungen selbst und setzt sie um?

Wer vier oder mehr Kästchen mit überzeugenden Belegen abhaken kann, skaliert nicht nur – bei dem läuft der Kreislauf.

---

**Fazit:** RSI ist ein Problem des Feedback-Designs, keine Stimmungskurve. Die heutigen Systeme liefern leistungsfähige, manchmal verblüffende Automatisierung; ihre Fähigkeit, sich zu verbessern, verbessern sie aber noch nicht auf dauerhafte, sich beschleunigende und autonom validierte Weise. Um dorthin zu kommen, sollte man den Ehrgeiz auf den Nenner richten – und den Kreislauf unbestreitbar machen.
