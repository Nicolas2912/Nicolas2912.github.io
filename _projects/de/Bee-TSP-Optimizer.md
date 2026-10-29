---
layout: project
lang: de
locale: de_DE
title: "TSP-Optimierer mit dem Bienenalgorithmus"
summary: "Eine von der Natur inspirierte Metaheuristik für das Problem des Handlungsreisenden (Traveling Salesman Problem, TSP) – in Python für die Visualisierung und in C++ für die Performance implementiert, ergänzt um eine MATLAB-Animation der Suche."
date: 2025-04-21
permalink: /de/projects/bee-tsp-optimizer/
github_repo: https://github.com/Nicolas2912/BEE-TSP-Optimizer
image: /images/BeeTSPOptimizer/cover.png
image_alt: "Vom Bienenalgorithmus gefundene Tour durch eine Menge von Städten"
featured: true
featured_order: 3
tech: [Python, C++17, MATLAB, NumPy, Matplotlib]
problem: "Exakte Verfahren für das Problem des Handlungsreisenden (TSP) skalieren schlecht. Große Instanzen brauchen deshalb gute Heuristiken, die Exploration und Exploitation in Balance halten."
approach: "Ich habe den Bienenalgorithmus mit Kundschafter-, Elite- und Folgebienen sowie 2-opt- und Swap-Nachbarschaftszügen implementiert. Eine Python-Version zum Experimentieren und eine optimierte C++-Version für größere Instanzen teilen sich dabei denselben algorithmischen Aufbau."
outcome: "Die Visualisierungen zeigen, wie die Kolonie gegen nahezu optimale Touren konvergiert, und die C++-Version macht größere Benchmark-Instanzen praktikabel."
---

## Überblick

Dieses Projekt implementiert die Bienenkolonie-Optimierung (Bee Colony Optimization) als metaheuristischen Solver für das klassische Problem des Handlungsreisenden (Traveling Salesman Problem, TSP). Statt Standardansätze wie Branch and Bound oder dynamische Programmierung zu verwenden, habe ich mich mit naturinspiriertem Rechnen beschäftigt – über den Bienenalgorithmus, ein populationsbasiertes Suchverfahren, das das Futtersuchverhalten von Honigbienen nachahmt, um komplexe Lösungsräume effizient zu durchsuchen.

Das Repository bietet ein vollständiges Ökosystem für TSP-Experimente:
- Eine Python-Implementierung mit Visualisierungsfunktionen für Forschung und Lehre
- Eine hochperformante C++-Version, optimiert für große Probleme und Benchmarks
- Ein MATLAB-Demoskript zur animierten Visualisierung des Suchprozesses

Der hybride Ansatz sorgt für Flexibilität: schnelles Prototyping und interaktive Visualisierung in Python, mit der Möglichkeit, für den produktiven Einsatz auf die C++-Implementierung zu skalieren. Beide Implementierungen beruhen auf derselben algorithmischen Grundlage, sind aber jeweils für ihre Umgebung optimiert.

Der Solver nutzt adaptive Techniken der Nachbarschaftssuche (2-opt, Swap-Operatoren), die über sorgfältig abgestimmte Kolonieparameter Exploration und Exploitation ausbalancieren. Die Visualisierungsmodule geben in Echtzeit Rückmeldung zum Konvergenzverlauf des Algorithmus und zeigen, wie die verschiedenen Bienentypen (Kundschafter, Folgebienen, Elitebienen) zusammenarbeiten, um immer bessere Touren zu finden.

## Tech-Stack

Das Projekt setzt auf mehrere Technologien, um Performance, Flexibilität und visuelles Feedback in Einklang zu bringen:
* Sprachen: Python 3.10+, C++17, MATLAB R2023b
* Kernbibliotheken: 
  * Python: NumPy (für vektorisierte Operationen), Matplotlib (Visualisierung), pandas (Datenverarbeitung)
  * C++: Standardbibliothek mit eigenen Datenstrukturen
* Hilfsmittel: tqdm (Fortschrittsbalken), structlog (strukturiertes Logging), tabulate (formatierte Ausgabe)
* Build-Tools: g++-Compiler (mit -O3-Optimierung), Python setuptools
* Visualisierung: Matplotlib für interaktive Diagramme, MATLAB für animierte Demonstrationen

Installationsanleitung, Nutzungsbeispiele und die vollständige Codestruktur finden Sie im [GitHub-Repository](https://github.com/Nicolas2912/BEE-TSP-Optimizer).


## Herausforderungen & Lösungen

Während der Entwicklung haben sich mehrere technische Herausforderungen ergeben:

* **Effiziente Nachbarschaftssuche**: Bei großen Probleminstanzen wurde die Nachbarschaftssuche zum Engpass. Ich habe sie mit einer 2-opt-Implementierung optimiert, die Distanzberechnungen zwischenspeichert und so den Rechenaufwand reduziert.

* **Implementierung über mehrere Sprachen hinweg**: Die Python-, C++- und MATLAB-Implementierungen konsistent zu halten, erforderte ein einheitliches abstraktes Modell. Ich habe eine gemeinsame Schnittstellenspezifikation entwickelt, der alle Implementierungen folgen, sodass sich der Algorithmus in allen Sprachen gleich verhält.

## Was ich gelernt habe

* **Entwurf metaheuristischer Algorithmen**: Die Implementierung des Bienenalgorithmus hat mein Verständnis populationsbasierter Suchstrategien vertieft. Besonders aufschlussreich war zu sehen, wie aus einfachen Verhaltensregeln einzelner Agenten über ganz unterschiedliche TSP-Instanzen hinweg emergente Problemlösungsfähigkeiten entstehen.

* **Optimierungstechniken**: Das Projekt hat mir praktische Erfahrung in der algorithmischen Optimierung verschafft – von vektorisierten Operationen in NumPy bis zum Einsatz von Optimierungstechniken in C++. Die größten Performance-Gewinne brachte die Übertragung der Nachbarschaftssuche nach C++.

* **Entwicklung in mehreren Sprachen**: Die Arbeit mit Python, C++ und MATLAB hat mir gezeigt, wie wichtig konsistente Schnittstellen und ein modularer Aufbau sind. Jede Sprache hatte ihre eigenen Stärken: Python für schnelle Entwicklung und Visualisierung, C++ für rohe Performance und MATLAB für mathematische Analysen und Animationen.

* **Visualisierung als Debugging-Werkzeug**: Die Echtzeit-Visualisierung erwies sich als unschätzbar wertvoll, um das Verhalten des Algorithmus zu verstehen und Probleme zu erkennen.

## Geplante Verbesserungen

Für künftige Iterationen sind folgende Erweiterungen geplant:

* **GPU-Beschleunigung**: CUDA-Kernels für parallele Nachbarschaftssuche implementieren – bei großen Probleminstanzen potenziell mit einer 10- bis 100-fachen Beschleunigung.

* **Web-Dashboard**: Eine interaktive Weboberfläche entwickeln, um mit Parametern zu experimentieren und Ergebnisse in Echtzeit zu visualisieren.

* **Erweiterte Problemstellungen**: Den Solver für Varianten wie das Tourenplanungsproblem (Vehicle Routing Problem, VRP), das Multiple TSP und das Prize-Collecting TSP anpassen.


## Screenshots

<video class="project-video" src="/images/BeeTSPOptimizer/BeeTSPOptimizer_animation.mp4" autoplay loop muted playsinline aria-label="Animation des Bienenalgorithmus beim Verbessern einer Tour"></video>
