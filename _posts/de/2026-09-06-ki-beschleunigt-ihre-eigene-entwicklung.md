---
layout: post
title: "Was passiert, wenn KI hilft, die nächste KI zu bauen?"
date: 2026-09-06 09:00:00 +0200
lang: de
locale: de_DE
permalink: /de/blog/ki-beschleunigt-ihre-eigene-entwicklung/
description: "Schnellere Chips könnten mehr bewirken, als einen Chat zu beschleunigen. Sie könnten die Wartezeit auf die nächste KI-Generation verkürzen – und uns weniger Zeit lassen, Schritt zu halten."
excerpt: "Angenommen, die nächste KI-Generation kommt sechs Monate früher, weil die aktuelle beim Bau mitgeholfen hat. Genau diese Beschleunigung möchte ich verstehen."
tags: [KI, zHBM, Hardware, Forschung, Wirtschaft]
---

Angenommen, die nächste KI-Generation kommt sechs Monate früher, weil die aktuelle beim Bau mitgeholfen hat.

Das Modell hat einen Teil des Codes geschrieben, geholfen, einen besseren Trainingsalgorithmus zu finden, oder ein Hardwareproblem entdeckt, bevor jemand den Entwurf in die Fertigung geschickt hat. Nichts besonders Filmreifes. Nur genug nützliche Arbeit an den richtigen Stellen, um den gesamten Zeitplan nach vorn zu ziehen.

Dann macht ihr Nachfolger dasselbe.

Auf diese Möglichkeit komme ich immer wieder zurück, wenn ich über schnellere KI-Hardware lese. Ein paar Sekunden weniger Wartezeit im Chat weiß man leicht zu schätzen. Dass sich der Entwicklungszyklus der Technologie selbst verkürzt, ist schwerer vorstellbar – und potenziell viel folgenreicher.

Eine aktuelle Ankündigung von Samsung hat mich wieder daran erinnert. Im August 2026 hat das Unternehmen zHBM vorgestellt, ein Speicherkonzept, bei dem High Bandwidth Memory, kurz HBM, direkt über dem KI-Beschleuniger gestapelt wird. Kürzere Wege für Daten, höhere Bandbreite, bessere Energieeffizienz: So beschreibt Samsung das Ziel. Es handelt sich um ein Konzept mit Leistungszielen, nicht um Messergebnisse für ein fertiges KI-System. [Samsungs Ankündigung](https://news.samsung.com/global/samsung-unveils-next-gen-3d-memory-vision-at-fms-2026-charting-the-future-of-ai-infrastructure)

Eine Prognose über die Zukunft würde ich nicht an einer einzelnen Speicher-Roadmap aufhängen. Als Ausgangspunkt taugt sie trotzdem.

## Das unspektakuläre Problem der Datenbewegung

Ein Chip kann enorme Rechenkapazität haben und trotzdem Zeit damit verbringen, auf die Daten zu warten, die er braucht. Wie sehr das ins Gewicht fällt, hängt von der Arbeitslast ab. Eine einzelne Antwort zu erzeugen, einen großen Stapel von Anfragen abzuarbeiten und ein Modell zu trainieren, stellt jeweils andere Anforderungen an das System.

HBM hilft, indem es viel Speicherbandbreite in unmittelbarer Nähe des Prozessors bereitstellt. zHBM würde diese Nähe noch weiter treiben. Kürzere Verbindungen könnten Datenbewegung günstiger machen, an Energie wie an Zeit, sodass mehr Kapazität des Systems für nützliche Arbeit übrig bleibt.

Der verlockende nächste Schritt ist, aus einer Bandbreitenangabe eine Aussage über die Chatgeschwindigkeit abzuleiten. Achtmal dies, zehnmal das, also Tausende Tokens pro Sekunde. Da wäre ich vorsichtig. Modell, Software, Kontextlänge, Netzwerk und Auslastung spielen alle eine Rolle. Und ein Server, der hundert Menschen gleichzeitig bedient, ist etwas anderes als eine einzelne Antwort, die schneller ankommt.

Mich würde interessieren, ob die Kosten dauerhaft sinken, eine schwierige Aufgabe richtig zu lösen. Fehlversuche eingerechnet. Die Prüfung des Ergebnisses eingerechnet. Den Ingenieur eingerechnet, der den Schaden beheben muss, wenn sich eine plausible Antwort als falsch herausstellt.

Wenn diese Kosten weit genug sinken, können wir uns Versuche leisten, die heute den Aufwand nicht wert sind.

Nehmen wir einen hartnäckigen Softwarefehler. Statt der ersten plausiblen Erklärung zu folgen, könnte ein System den Fehler reproduzieren, mehrere Ursachen untersuchen, alternative Korrekturen ausprobieren und die relevanten Tests ausführen. Übrig blieben vielleicht eine kurze Erklärung und ein kleiner Patch. Der Großteil der zusätzlichen Rechenarbeit bliebe unsichtbar.

Dafür würde ich gern bezahlen. Mit einer längeren Antwort kann ich deutlich weniger anfangen.

## Ein kleines, konkretes Beispiel gibt es schon

AlphaEvolve von Google DeepMind lohnt einen Blick, weil die berichteten Ergebnisse konkret genug sind, um sie zu prüfen.

Laut Google hat das System Verbesserungen bei der Auslastung von Rechenzentren gefunden, eine Vereinfachung für eine TPU-Schaltung vorgeschlagen und einen Rechenkern beschleunigt, der im Gemini-Training zum Einsatz kommt. Zum letzten Ergebnis nennt Google zwei Zahlen: 23 Prozent Beschleunigung des betroffenen Kernels und rund ein Prozent weniger Trainingszeit insgesamt. [DeepMinds Bericht](https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/)

Beide Zahlen sind wichtig. Wer nur die erste zitiert, erweckt einen irreführenden Eindruck vom Nutzen. Wer die zweite abtut, übersieht, warum eine kleine Verbesserung wertvoll sein kann, wenn sie einen teuren Prozess betrifft.

An diesen Ansatz ist eine ziemlich strenge Bedingung geknüpft: Die vorgeschlagenen Lösungen müssen sich automatisch bewerten lassen. Aufgaben, die manuelle Experimente verlangen, klammern die Autoren ausdrücklich aus ihrer Arbeit aus. [AlphaEvolve-Paper](https://arxiv.org/abs/2506.13131)

Wir haben also ein KI-System, das zu einem Teil der Software- und Hardwarearbeit beiträgt, auf der KI-Entwicklung aufbaut. Menschen wählen weiterhin die Probleme aus, legen die Prüfverfahren fest und entscheiden, was eingesetzt wird. Ein autonomer Kreislauf, der sich immer weiter beschleunigt, ist damit nicht belegt. Aber die größere Idee steht so auf festerem Boden als ein Diagramm mit Pfeilen, die auf sich selbst zurückzeigen.

In meinem [früheren Beitrag über Recursive Self-Improvement]({% post_url de/2025-09-24-recursive-self-improvement %}) ging es mir vor allem um den Unterschied zwischen der Automatisierung von Forschungsaufgaben und einem System, das seine eigene Fähigkeit, sich zu verbessern, dauerhaft steigert. Diesen Unterschied halte ich nach wie vor für wichtig. Wirtschaftlich könnte allerdings schon eine ganze Menge passieren, bevor die strengere Definition erfüllt ist.

Ein Forschungsteam muss nicht seine gesamte Arbeit abgeben, damit KI-Unterstützung seinen Zeitplan verändert.

## Entscheidend ist die Zeit zwischen den Verbesserungen

Angenommen, ein vergleichbarer, unabhängig geprüfter Fortschritt dauert zwölf Monate, dann neun, dann sechs. Die Zahlen sind ein Gedankenexperiment, keine Prognose. Aufschlussreich wäre der Nachweis, dass frühere Verbesserungen tatsächlich dazu beigetragen haben, dass die späteren früher kommen.

Das ist schwerer zu belegen als ein höherer Benchmark-Wert. Man müsste Ausgaben, Teamgröße, Veränderungen in der Schwierigkeit der Aufgabe und die Arbeit berücksichtigen, die gar nicht in die Messung eingeht. Ein kürzerer Trainingslauf hilft wenig, wenn die Datenaufbereitung jetzt doppelt so lange dauert.

Selbst die elementare Mathematik kann in die Irre führen. Jedes Jahr 20 zusätzliche Einheiten sind lineares Wachstum; jedes Jahr 20 Prozent mehr sind exponentielles Wachstum. Keins von beidem sagt uns, ob sich „KI-Fähigkeit“ überhaupt sinnvoll in einer einzigen Zahl ausdrücken lässt oder ob der Trend den nächsten Engpass übersteht.

Vorerst würde ich Entwicklungszeit und Gesamtkosten zusammen mit der Qualität des Ergebnisses beobachten. Dann würde ich fragen, wie viel vom Gewinn in die nächste Runde mitgenommen wird. Ein Muster, das mehrere Generationen übersteht, wäre viel überzeugender als eine einzelne, ungewöhnlich gute Demonstration.

Dabei liegt ein weiterer Fehler nahe: die Fähigkeit eines Agenten mit der Zahl der Kopien zu multiplizieren, die wir laufen lassen können, und das Ergebnis Forschungsleistung zu nennen.

Hundert Agenten könnten hundert nützliche Möglichkeiten erkunden. Sie könnten sich aber auch auf dieselbe schlechte Idee einschießen, sich auf dieselbe fehlerhafte Quelle stützen oder auf dasselbe Experiment warten. Parallele Arbeit hilft, wenn sich ein Problem tatsächlich aufteilen lässt und die Antworten überprüfbar sind. Mehr Instanzen heben keine Abhängigkeit zwischen zwei Schritten auf.

Und wenn erst schnellere Hardware es ermöglicht, mehr Agenten laufen zu lassen, darf man den Hardwaregewinn und die zusätzlichen Agenten nicht ohne Weiteres als getrennte Faktoren ansetzen. Womöglich zählt man denselben Vorteil zweimal.

## Irgendwann muss jemand den Chip bauen

An dieser Stelle verlieren mich die dramatischsten Versionen des Arguments.

Auch ein vielversprechender Entwurf muss gefertigt, verpackt, gekühlt und an echter Hardware getestet werden. Simulationen können Fehler verhindern, aber sie ersetzen nicht jede Messung. Und ein besserer Entwurf schafft noch keine freie Fertigungskapazität in einer Fabrik.

Ich erwarte, dass sich diese Rückkopplung in Software leichter beschleunigen lässt. Änderungen kann man dort oft schnell ausprobieren, und manche Ergebnisse lassen sich einfach messen. Hardware hat längere Phasen, in denen der begrenzende Faktor etwas ist, das sich nicht dadurch lösen lässt, dass man einen weiteren Kandidaten erzeugt.

Das macht KI-Unterstützung nicht bedeutungslos. Ein thermisches Problem vor der Fertigung zu finden, könnte eine teure Iteration sparen. Ein besseres Experiment könnte eine Frage mit weniger physischen Proben beantworten. Der Gewinn hängt davon ab, ob diese Arbeit auf dem kritischen Pfad liegt.

Robotik und automatisierte Labore könnten die Reichweite des Kreislaufs irgendwann vergrößern. Aber zwischen „KI entwirft einen Roboter“ und „Roboter bauen die Fabriken, die mehr KI-Chips herstellen“ liegen etliche handfeste Engineering-Probleme. Die möchte ich nicht alle in einem einzigen Pfeil verstecken.

Plausibler erscheint mir ein ungleichmäßiger Fortschritt: schnelle Gewinne in einem Bereich, frustrierendes Warten in einem anderen, dann tut sich wieder eine Tür auf. zHBM könnte eine dieser Türen öffnen. Es könnte aber auch spät kommen und sich für große Teile des Markts als zu teuer erweisen. Die größere These muss beide Ausgänge überstehen.

## Günstigerer Code würde verändern, was sich zu bauen lohnt

Ich arbeite mit CRM-Systemen, Datenintegration und KI-Anwendungen. Deshalb wirkt die Softwareseite dieses Themas auf mich deutlich weniger abstrakt.

Es gibt viele Abläufe, für die ein eigenes Werkzeug nützlich, aber schwer zu rechtfertigen wäre. Vielleicht braucht es nur ein kleines Team. Vielleicht spart es zu wenig Zeit, um Entwicklung und Wartung zu decken. Sinken diese Kosten, könnte sich sehr spezifische Software lohnen, bis hin zu Werkzeugen, die auf die Arbeitsweise einer einzigen Person zugeschnitten sind.

Ich verstehe, warum das manche bestehenden Softwareunternehmen unter Druck setzt. Ich glaube aber auch, dass „ein Agent baut mir mein CRM“ vieles überspringt, wofür ein Unternehmen eigentlich bezahlt.

Wer migriert die Daten? Wer entscheidet, welche Nutzer sie ändern dürfen? Was passiert, wenn ein vorgelagertes System einen unerwarteten Wert schickt oder eine Schnittstelle mittendrin ausfällt? Eine funktionierende Oberfläche ist ein Anfang. Den Geschäftsprozess verlässlich am Laufen zu halten, ist eine Daueraufgabe.

Wenn Implementierung billiger wird, würde ich erwarten, dass ein größerer Teil des Produktwerts darin liegt, das Problem der Kunden zu verstehen, diese betrieblichen Details im Griff zu haben und Vertrauen zu gewinnen. Der Wettbewerb könnte härter werden, ohne dass Softwareunternehmen überflüssig werden.

Dieselbe Ungleichmäßigkeit gilt für die Forschung. Einen Raum von Programmen mit einem verlässlichen Bewertungsverfahren zu durchsuchen, ist ein guter Kandidat für zusätzliche Rechenleistung. Eine offene wissenschaftliche Frage ohne verlässlichen Test ist etwas ganz anderes. Auch mit einer Million Antworten, die richtig klingen, bleibt das Problem, herauszufinden, welche davon stimmen.

## Weniger Zeit zum Aufholen

Eine produktive Rückkopplung könnte einen frühen Vorsprung dauerhafter machen. Das Team, das KI bereits gut einsetzt, sammelt Erfahrung, verbessert seine Werkzeuge und hat mehr Ressourcen für den nächsten Anlauf. Eine Verzögerung kann mehrere Lernrunden kosten.

Für Europa halte ich die praktischen Fragen für ziemlich konkret. Bekommt ein sinnvolles Projekt Zugang zu Energie und Rechenkapazität? Sind die Anforderungen klar genug, um danach zu handeln? Welche Prüfungen verringern ein echtes Risiko, und welche Verzögerungen lassen eine Entscheidung einfach in irgendeiner Warteschlange liegen?

Ich will damit nicht sagen, dass Geschwindigkeit das einzige Ziel sein sollte. Schlecht geprüfte Systeme können ihre eigenen teuren Probleme verursachen. Aber wenn Entwicklungszyklen kürzer werden, haben Institutionen, die Jahre für eine Reaktion brauchen, es schwerer mitzuhalten.

Menschen ebenso.

Angenommen, ein Wandel, der sich früher vielleicht über fünfzehn Jahre erstreckt hätte, vollzieht sich in fünf. Auch das ist ein Gedankenexperiment. Selbst ohne große „Intelligenzexplosion“ hätten Beschäftigte, Unternehmen und öffentliche Institutionen dann viel weniger Zeit, sich anzupassen. Höhere Produktivität allein entscheidet außerdem nicht, wer von ihr profitiert. Der Zugang zu den Werkzeugen und der Besitz der Infrastruktur wären enorm wichtig.

Diesen Teil kann ich nur schwer mit einem Schulterzucken abtun. Es braucht kein unendliches Wachstum, damit der Übergang einschneidend wird. Eine deutliche Veränderung des Tempos würde genügen.

Wenn die nächste Speicherankündigung kommt, werde ich mir weiterhin die Bandbreitenzahlen ansehen. Aber ich werde auch nach Belegen weiter hinten in der Kette suchen: kürzere Experimente, günstigere Validierung, nützliche Verbesserungen, die schneller im nächsten System ankommen.

Das erste Anzeichen könnte ziemlich unspektakulär sein. Ein Team kommt früher als erwartet zu einem Ergebnis. Ein Teil der gesparten Zeit fließt in ein besseres Werkzeug für das nächste Projekt. Dann wird auch dieses Projekt früher fertig.

Ich wüsste gern, wann das aufhört, ein gelegentlicher Erfolg zu sein, und zur normalen Art wird, wie Fortschritt entsteht.
