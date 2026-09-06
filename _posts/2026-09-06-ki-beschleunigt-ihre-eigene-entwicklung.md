---
layout: post
title: "Was passiert, wenn KI ihre eigenen Nachfolger baut?"
date: 2026-09-06 09:00:00 +0200
lang: de
locale: de_DE
permalink: /blog/ki-beschleunigt-ihre-eigene-entwicklung/
description: "Samsungs zHBM lenkt den Blick auf eine größere Frage: Was passiert, wenn schnellere KI die Forschung an der nächsten KI beschleunigt?"
excerpt: "Eine KI, die schneller antwortet, spart uns Wartezeit. Eine KI, die ihre Nachfolger schneller mitentwickelt, könnte den Takt ganzer Industrien verändern."
tags: [KI, zHBM, Hardware, Forschung, Wirtschaft]
---

Eine KI, die meine E-Mails in einer Sekunde statt in zehn formuliert, ist praktisch. Eine KI, die dabei hilft, die nächste KI-Generation sechs Monate früher fertigzustellen, hätte eine andere Tragweite.

Über den ersten Effekt reden wir ständig. Der zweite beschäftigt mich mehr.

Der Anlass ist ausgerechnet eine Speicherarchitektur. Samsung hat im August 2026 ein Konzept namens zHBM vorgestellt: Speicher soll direkt über dem KI-Beschleuniger gestapelt werden. Kürzere Wege für Daten, höhere Bandbreite, bessere Energieeffizienz. So beschreibt Samsung die Richtung. Es handelt sich um ein Konzept mit Leistungszielen, nicht um einen veröffentlichten Benchmark für ein fertiges KI-System. [Samsung, 5. August 2026](https://news.samsung.com/global/samsung-unveils-next-gen-3d-memory-vision-at-fms-2026-charting-the-future-of-ai-infrastructure)

Das ist zunächst eine Nachricht für die Halbleiterbranche. Mich interessiert, was daraus werden könnte, wenn günstigere Rechenleistung zunehmend in Forschung fließt. Auch in die Forschung an KI selbst.

**Wie viel von der Arbeit einer KI fließt in die Entwicklung ihres eigenen Nachfolgers?**

## Warum ein Speicherchip hier überhaupt eine Rolle spielt

Rechenleistung allein reicht nicht. Ein KI-Beschleuniger muss seine Recheneinheiten auch mit Daten versorgen. Je nach Modell und Arbeitslast kann die Bewegung dieser Daten zum Engpass werden. Beim schrittweisen Erzeugen von Text spielen unter anderem Modellgewichte, der gespeicherte Kontext und die Zahl gleichzeitig bearbeiteter Anfragen eine Rolle.

High Bandwidth Memory, kurz HBM, stellt dafür viel Speicherbandbreite in unmittelbarer Nähe des Prozessors bereit. zHBM soll diese Verbindung noch enger machen. Die Idee ist plausibel: Weniger Weg zwischen Speicher und Recheneinheit kann Datenbewegung effizienter machen.

Daraus lässt sich aber keine seriöse Ansage wie „bald 5.000 Tokens pro Sekunde in jedem Chat“ ableiten. Speicherbandbreite ist keine Antwortgeschwindigkeit. Was beim Nutzer ankommt, hängt auch von Rechenleistung, Software, Modellgröße, Auslastung und Netzwerk ab. Und ein Server, der viele Anfragen gleichzeitig abarbeitet, ist etwas anderes als eine einzelne Unterhaltung, die besonders schnell läuft.

Die spannende Möglichkeit bleibt: Falls solche Architekturen die Kosten brauchbarer KI-Arbeit deutlich senken, könnten wir viel mehr davon einsetzen. Das muss sich allerdings am gesamten System zeigen, nicht nur an einer Komponente.

## Niemand will eine Million Tokens lesen

Zusätzliche Geschwindigkeit könnte hinter einer kurzen Antwort verschwinden.

Bei einem schwierigen Softwarefehler könnte ein System mehrere Ursachen untersuchen, einen Fehler reproduzieren, alternative Änderungen ausprobieren und die Ergebnisse testen. Für den Nutzer blieben vielleicht fünf Sätze und ein funktionierender Patch übrig.

Das wäre ein sinnvoller Einsatz zusätzlicher Rechenzeit. Allerdings nur dann, wenn die Prüfung funktioniert. Zehn Agenten, die dieselbe falsche Annahme wiederholen, liefern zehnmal denselben Irrtum. Mehr Text ist noch keine zusätzliche Erkenntnis.

Deshalb halte ich Tokens pro Sekunde allein für eine schwache Erfolgskennzahl. Mich würde interessieren: **Wie viele korrekt gelöste Aufgaben bekommen wir pro Euro, einschließlich Prüfung und Nacharbeit?**

Diese Frage ist weniger spektakulär als ein Geschwindigkeitsrekord. Für Unternehmen wäre sie wesentlich nützlicher.

## Ein Stück dieser Rückkopplung gibt es schon

Man muss dafür keine vollständig autonome Superintelligenz annehmen.

Google DeepMind berichtet, dass AlphaEvolve Algorithmen für die Auslastung von Rechenzentren verbessert, eine Vereinfachung für eine TPU-Schaltung vorgeschlagen und einen Rechenkern im Gemini-Training beschleunigt hat. Bei Letzterem nennt Google 23 Prozent Beschleunigung des betroffenen Kernels, aber rund ein Prozent weniger Trainingszeit insgesamt. Diese Unterscheidung ist entscheidend: Ein großer lokaler Gewinn kann im Gesamtsystem deutlich kleiner ausfallen. [Google DeepMind, Mai 2025](https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/)

Das zugehörige Paper beschreibt auch die Grenze des Ansatzes: Die vorgeschlagenen Lösungen müssen sich automatisch bewerten lassen. Aufgaben, die manuelle Experimente verlangen, liegen außerhalb dieses Rahmens. [AlphaEvolve-Paper](https://arxiv.org/abs/2506.13131)

Trotzdem steckt darin etwas Bemerkenswertes. Ein KI-System hilft, Teile der Infrastruktur und Software zu verbessern, auf denen KI entwickelt wird. Menschen definieren weiterhin Probleme, Prüfverfahren und den Einsatz der Ergebnisse. Aber KI ist bereits an einigen Stellen Teil des Entwicklungsprozesses ihrer technischen Grundlagen.

Daraus könnte eine stärkere Rückkopplung entstehen:

> Bessere KI unterstützt Forschung und Engineering. Deren Ergebnisse ermöglichen bessere KI. Diese kann wiederum mehr zur nächsten Runde beitragen.

Das ist noch kein Nachweis einer sich selbst beschleunigenden Gesamtentwicklung. Dafür müsste man über mehrere Generationen zeigen, dass der Kreislauf tatsächlich schneller wird. Es ist aber ein konkreter Grund, genauer hinzusehen.

## Die interessante Kurve misst Entwicklungszeit

In meinem [früheren Beitrag über Recursive Self-Improvement]({% post_url 2025-09-24-recursive-self-improvement %}) ging es vor allem darum, echte Selbstverbesserung von Automatisierung zu unterscheiden. Hier interessiert mich die wirtschaftliche Wirkung, die schon entstehen könnte, bevor ein System seinen gesamten Entwicklungsprozess autonom beherrscht.

Angenommen, ein Team benötigt zwölf Monate für einen verlässlich messbaren Fortschritt. Mit KI-Unterstützung schafft es eine vergleichbare Verbesserung später in neun Monaten. Die nächste Runde dauert sechs. Das wäre Beschleunigung. Die Zahlen sind ein Gedankenexperiment, keine Prognose.

Die mathematische Grundidee ist einfach. Jedes Jahr 20 zusätzliche Leistungseinheiten wären lineares Wachstum. Jedes Jahr 20 Prozent mehr wären exponentielles Wachstum. Das wird gerne vermischt. Ob sich KI-Fähigkeit überhaupt sinnvoll in einer einzigen Zahl ausdrücken lässt, ist eine weitere offene Frage.

Für die Praxis würde ich deshalb drei Dinge beobachten:

- Wird die Zeit bis zur nächsten **nachgewiesenen Verbesserung** kürzer?
- Sinken die Gesamtkosten, einschließlich Experimenten, Fehlversuchen und Kontrolle?
- Tragen die erreichten Verbesserungen messbar zur nächsten Entwicklungsrunde bei?

Ein beeindruckender Benchmark beantwortet diese Fragen noch nicht. Eine über Jahre kürzer werdende Entwicklungsschleife wäre dagegen schwer zu ignorieren.

## Mehr Agenten ergeben nicht automatisch mehr Forschung

Es ist verlockend, die Fähigkeit eines Agenten mit der Zahl seiner Kopien zu multiplizieren. Fünfmal besser, hundertmal mehr Instanzen: fünfhundertmal mehr Forschung.

So einfach funktioniert Arbeit selten. Agenten können dieselben Ideen verfolgen, dieselben Fehler machen oder auf dasselbe knappe Labor warten. Manche Probleme lassen sich hervorragend aufteilen. Andere verlangen ein Ergebnis, bevor der nächste Schritt beginnen kann.

Auch Hardwareleistung und Agentenzahl darf man nicht gedankenlos miteinander multiplizieren. Wenn bessere Hardware bereits die zusätzlichen Agenten ermöglicht, zählt man denselben Vorteil womöglich zweimal.

Die größere Chance sehe ich bei Aufgaben, für die es viele unabhängig prüfbare Kandidaten gibt: Compileroptimierung, bestimmte mathematische Suchprobleme, Softwaretests oder Simulationen mit klaren Bewertungskriterien. Dort kann zusätzliche Suche wertvoll sein. Wie viel sie bringt, muss man messen.

Für eine offene Forschungsfrage ohne verlässliches Prüfverfahren hilft es dagegen wenig, eine Million überzeugend klingende Antworten zu erzeugen.

## Die Fabrik wartet nicht auf den nächsten Token

Selbst ein sehr guter Chipentwurf muss gefertigt, verpackt, gekühlt und getestet werden. Eine Simulation ersetzt nicht jede Messung am realen Bauteil. Ein besserer Entwurf baut noch keine zusätzliche Fabrik.

Deshalb erwarte ich, dass sich eine solche Rückkopplung in Software leichter beschleunigen lässt als in Hardware. Code kann man oft rasch ändern und ausführen. Physische Experimente, Fertigung und Infrastruktur haben andere Taktzeiten.

KI könnte trotzdem helfen, unnötige Iterationen zu vermeiden: mehr Varianten vorab untersuchen, Schwachstellen früher erkennen, Versuche gezielter planen. Ob dadurch ein Hardwarezyklus erheblich kürzer wird, hängt davon ab, welcher Schritt ihn tatsächlich begrenzt.

Robotik und automatisierte Labore könnten weitere Teile dieses Prozesses zugänglich machen. Daraus eine nahtlose Kette von „KI entwirft Roboter, Roboter bauen Chips, Chips erzeugen mehr KI“ abzuleiten, wäre heute jedoch ein Szenario mit vielen offenen Voraussetzungen.

Vielleicht besteht der langfristige Effekt eher darin, schneller zur nächsten brauchbaren Technologie zu gelangen, wenn die bisherige an Grenzen stößt. Auch dieser Übergang kostet Zeit und kann scheitern.

## Was das für Softwareunternehmen bedeuten würde

Wenn verlässliche Entwicklungsarbeit günstiger wird, könnten sich Anwendungen für viel kleinere Zielgruppen lohnen. Ein interner Ablauf, für den sich bisher kein eigenes Werkzeug rechnet. Eine Fachanwendung für wenige Dutzend Nutzer. Vielleicht eine Lösung für eine einzige Person.

Das könnte Teile des Softwaremarkts unter Druck setzen. Aber „ein Agent baut mir mein CRM“ beantwortet noch nicht, wer die Daten migriert, Berechtigungen sauber hält, Schnittstellen wartet und bei einem Ausfall Verantwortung übernimmt.

Gerade bei Unternehmenssoftware ist das Produkt mehr als sein Quellcode. Der laufende Betrieb, das Verständnis der Fachprozesse und das Vertrauen der Nutzer gehören dazu.

Meine Vermutung: Wenn Implementierung billiger wird, verschiebt sich der Wettbewerb stärker zu diesen Fragen. Wer versteht das Problem? Wer erreicht die Kunden? Wer kann zuverlässig liefern? Ein schneller gebautes Produkt braucht darauf weiterhin gute Antworten.

## Warum Verzögerung teurer werden könnte

Eine funktionierende Rückkopplung hätte auch eine strategische Konsequenz: Ein früher Vorsprung könnte die nächste Runde erleichtern. Wer bereits produktiv mit KI arbeitet, sammelt Erfahrung, verbessert Abläufe und kann die Gewinne erneut investieren.

Das betrifft Unternehmen ebenso wie Forschungsstandorte. Falls Entwicklungszyklen kürzer werden, kann eine lange Verzögerung mehrere Lernrunden kosten.

Für Europa würde ich daraus keine pauschale Forderung nach weniger Regulierung ableiten. Meine Frage wäre konkreter: Welche Anforderungen schaffen überprüfbare Sicherheit, und welche Prozesse lassen Projekte warten, ohne ein Risiko zu verringern?

Zuverlässige Energieversorgung, Zugang zu Rechenleistung, klare Regeln und handlungsfähige Teams wären in diesem Szenario besonders wertvoll. Die Herausforderung wäre, sorgfältige Prüfung mit kürzeren Umsetzungszeiten zu verbinden.

## Wir müssten mit weniger Vorlauf zurechtkommen

Mich überzeugt die Vorstellung einer unendlichen „Intelligenzexplosion“ nicht als Prognose. Eine Gleichung kann ins Unendliche laufen. Eine reale Lieferkette kann das nicht.

Eine viel begrenztere Entwicklung wäre bereits einschneidend: Ein technischer Wandel, auf den sich Unternehmen und Beschäftigte sonst über fünfzehn Jahre einstellen könnten, vollzieht sich in fünf. Auch das ist ein Gedankenexperiment. Es zeigt aber, warum die Übergangsgeschwindigkeit genauso wichtig sein könnte wie die langfristige Produktivität.

Menschen brauchen Zeit, um sich neu zu orientieren. Organisationen brauchen Zeit, um Verantwortung und Arbeitsabläufe anzupassen. Höhere Produktivität allein entscheidet außerdem nicht, wer von ihr profitiert. Breiter Zugang zu leistungsfähigen Werkzeugen und konzentrierter Besitz der Infrastruktur können sehr unterschiedliche Ergebnisse hervorbringen.

Für mich liegt hier der eigentliche gesellschaftliche Streitpunkt: Wer kann mit diesen Systemen etwas aufbauen, wer kontrolliert die Voraussetzungen dafür, und wie viel Zeit bleibt für die Anpassung?

## Worauf ich bei der nächsten Hardwareankündigung achte

zHBM könnte ein wichtiger Baustein werden. Es könnte auch später kommen, teurer werden oder im Gesamtsystem weniger bewirken als erhofft. Die größere These hängt nicht an diesem einen Produktkonzept.

Entscheidend wäre, ob Fortschritte bei Speicher, Algorithmen und Infrastruktur gemeinsam die Zeit zwischen brauchbaren Ergebnissen verkürzen. Und ob ein wachsender Teil dieser Ergebnisse wiederum den nächsten Fortschritt ermöglicht.

Deshalb interessiert mich an schnellerer KI vor allem, wofür wir ihre zusätzliche Leistung einsetzen.

**Wenn KI ihre Nachfolger schneller mitentwickelt, ist der kürzere Chat nur der sichtbare Nebeneffekt. Der größere Wandel wäre, wie viel Zukunft in ein einziges Jahr passt.**
