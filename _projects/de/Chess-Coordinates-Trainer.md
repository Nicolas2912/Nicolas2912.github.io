---
layout: project
lang: de
locale: de_DE
title: "Schachkoordinaten-Trainer"
summary: "Eine Desktop-App zum Lernen der Koordinaten auf dem Schachbrett – mit zeitgesteuerten Sessions, Punktesystem und Statistiken zu Trefferquote und Reaktionszeit. Entwickelt mit Python und Tkinter."
date: 2025-04-21
permalink: /de/projects/chess-coordinates-trainer/
github_repo: https://github.com/Nicolas2912/ChessCoordinateTraining
image: /images/ChessBoardCoordinatesTrainer/full-ui.png
image_alt: "Schachkoordinaten-Trainer mit Brett, Timer und Statistikbereich"
tech: [Python, Tkinter, Matplotlib]
problem: "Feldnamen auf Anhieb zu kennen ist eine schachliche Grundfertigkeit – doch wer am echten Brett übt, bekommt kein Feedback zu Tempo oder Genauigkeit."
approach: "Ich habe mit Tkinter ein interaktives Brett mit zufälligen Zielfeldern, konfigurierbarer Sessiondauer und einem Punktesystem gebaut und die Ergebnisse für die spätere Auswertung als JSON gespeichert."
outcome: "Eingebettete Matplotlib-Diagramme zeigen Trefferquote, Reaktionszeiten und Punkteverlauf über mehrere Sessions hinweg."
---

## Überblick

Der Schachkoordinaten-Trainer ist eine Desktop-Anwendung, mit der Spieler die algebraische Notation
sicher beherrschen lernen: Sie zeigt zufällige Brettkoordinaten auf einem interaktiven 8×8-Schachbrett an. Die Anwendung ist
mit Python und Tkinter entwickelt und bietet:

- Koordinatenprüfung und Klick-Tracking in Echtzeit  
- Anpassbare Farbschemata und umdrehbare Brettperspektive  
- Sessionbasierte Zeitmessung (konfigurierbar von 5–60 s) und Punktevergabe  
- Dauerhafte Speicherung der Leistungsdaten in JSON mit Analyse historischer Trends  
- Visualisierungen von Trefferquote, Reaktionszeiten und Punkteverlauf mit Matplotlib  

## Tech-Stack

- Sprache: Python 3.8+  
- UI: Tkinter (Canvas-basiertes Schachbrett, Steuerelemente, Panels)  
- Visualisierung: Matplotlib  
- Daten: JSON zur Speicherung der Statistiken; `pathlib` & Standard-I/O  
- Tests: `unittest`-Suite, Coverage-Reports  
- Packaging: setuptools, setuptools-scm, Editable Install (`pip install -e .`)  

Installationsanleitung, Nutzungsbeispiele und die vollständige Codestruktur finden Sie im [GitHub-Repository](https://github.com/Nicolas2912/ChessCoordinateTraining).


## Herausforderungen

* Korrekte Zuordnung von Koordinaten zu Feldern – auch bei gedrehtem Brett und veränderter Fenstergröße
* Matplotlib in ein live aktualisiertes Tkinter-Canvas einbetten, ohne UI-Updates zu blockieren

## Was ich gelernt habe

*   **Sicherer Umgang mit komplexen Tkinter-UIs:** Dieser Trainer hat meine Tkinter-Kenntnisse wirklich gefordert. Ich habe aus erster Hand gelernt, mehrere interaktive Elemente – Brett, Eingabefelder, Feedback, Timer, Einstellungen – zu verwalten und den Zustand der Anwendung im Blick zu behalten (etwa, ob das Spiel läuft, pausiert ist oder Ergebnisse anzeigt). Entscheidend war, `bind` und `after` gezielt einzusetzen: So reagiert die UI flüssig, und der Timer friert nicht die gesamte Anwendung ein, wenn der Nutzer klickt oder tippt. Ich habe gelernt, dass `Tkinter` für einfache Anwendungen wie diese völlig ausreicht und kaum Overhead mitbringt. Vor allem weil es vollständig in Python integriert ist, ist es eine sehr gute Wahl für einfache UI-Entwicklung und leicht zu nutzen. Wird die Anwendung bzw. UI jedoch komplexer, lohnt sich für eine saubere Entwicklung ein ausgereifteres Framework wie `React`. Für einfache Anwendungen bleibt `Tkinter` aber eine sehr gute Option, wenn man die UI mit Python entwickeln möchte.
*   **Live-Plots in eine Desktop-App bringen:** Einer der kniffligeren Teile war, Matplotlib-Plots für Live-Feedback direkt in das Tkinter-Fenster einzubetten. Diese Plots – sie zeigen Trends der Trefferquote oder wo ich Fehler gemacht habe – während des Spiels flüssig zu aktualisieren, ohne alles auszubremsen, war eine steile Lernkurve. Dafür musste ich mich intensiv damit beschäftigen, wie Matplotlib und Tkinter zusammenspielen, und Wege finden, die Darstellung ohne spürbare Verzögerung zu aktualisieren. Außerdem habe ich viel Zeit in das Debugging von Position und Größe der Plots auf dem Canvas samt korrekter Skalierung gesteckt.
*   **Code sinnvoll strukturieren:** Als der Trainer wuchs, wurde mir klar, wie wichtig eine saubere Code-Organisation ist. Ich habe die zentrale Schachlogik (etwa die Generierung der Koordinaten), den Tkinter-UI-Code, die Punkteregeln und die Datenspeicherung bewusst voneinander getrennt. Durch diese klar abgegrenzten Module mit eindeutigen Schnittstellen konnte ich Fehler viel leichter finden, einzelne Teile gezielt testen und neue Features planen, ohne dabei alles andere kaputtzumachen.
*   **Ein faires Punktesystem entwerfen und testen:** Beim Punktesystem ging es um mehr, als nur richtige und falsche Antworten zu zählen. Ich habe mir überlegt, wie sich Geschwindigkeit und Genauigkeit ausbalancieren lassen und wie mit kniffligem Nutzerverhalten umzugehen ist – etwa sehr schnellem Raten oder langen Pausen. Ich musste das Punktesystem unter verschiedenen Bedingungen testen, auch mit selbst ausgedachten Grenzfällen, damit es sich fair und robust anfühlt; dazu gehörten Feinjustierungen und simulierte Testläufe.
*   **Eine GUI-Anwendung testen lernen:** Eine grafische Anwendung wie diese zu testen, unterscheidet sich deutlich vom Testen einfacher Skripte. Ich musste herausfinden, wie man Tests schreibt, die Nutzeraktionen (etwa Klicks) simulieren und prüfen, ob die UI korrekt reagiert. Sicherzustellen, dass z. B. Highscores korrekt gespeichert und geladen werden, war ebenfalls ein entscheidender Baustein, um mir die Gewissheit zu verschaffen, dass die gesamte Anwendung wie erwartet funktioniert.

## Geplante Verbesserungen

* Eine webbasierte oder mobile Oberfläche ergänzen (z. B. Streamlit oder React), um die App breiter zugänglich zu machen
* Zusätzliche Trainingsmodi einführen (Blindmodus, Spiegelmodus, Notationsdrill)
* Eine Datenbank ergänzen, um Fortschritt und Statistiken auch für mehrere Nutzer zu speichern. 
* Bestenliste und Social-Sharing-Features zur Gamification umsetzen
* Datenexport verbessern (CSV/Excel) und Nutzerprofile einführen

## Screenshots

![Schachbrett](/images/ChessBoardCoordinatesTrainer/board-with-coords.png)
![Gesamte UI](/images/ChessBoardCoordinatesTrainer/full-ui.png)
