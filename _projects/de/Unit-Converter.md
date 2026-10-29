---
layout: project
lang: de
locale: de_DE
title: "Einheitenumrechner"
summary: "Ein Einheitenumrechner für neun physikalische Größen: eine Umrechnungs-Engine in Python hinter einer Flask-API und ein React-Frontend, das jede Umrechnung erklärt."
date: 2025-04-19
permalink: /de/projects/unit-converter/
github_repo: https://github.com/Nicolas2912/UnitConverter
image: /images/UnitConverter/UI.png
image_alt: "Oberfläche des Einheitenumrechners mit Umrechnungsergebnis und Erklärung"
tech: [Python, Flask, React, Tailwind CSS]
problem: "Umrechnungen über viele Kategorien hinweg brauchen eine einheitliche Registry sowie eine Sonderbehandlung für Einheiten mit Offset wie die Temperatur."
approach: "Ich habe in Python eine zentrale Faktor-Registry mit Einheiten-Aliassen entworfen, Temperaturen über einen Zwischenschritt in Celsius umgerechnet und die Engine über eine Flask-REST-API für einen React-Client bereitgestellt."
outcome: "Zu jedem Ergebnis gibt es eine verständliche Erklärung des Umrechnungsfaktors bzw. der Formel; eine unittest-Suite deckt die Umrechnungs-Engine ab."
---

## Überblick

Dieses Projekt ist ein **universeller Einheitenumrechner**, der eine schlanke, aber leistungsfähige Umrechnungs-Engine in Python
mit einem modernen, responsiven React-Frontend verbindet. Er unterstützt Umrechnungen in neun großen Kategorien – Länge,
Fläche, Volumen, Masse, Zeit, Geschwindigkeit, Beschleunigung, Temperatur und Datenspeicher – und liefert sowohl das numerische Ergebnis
als auch eine verständliche Erklärung (Multiplikationsfaktor oder Formel). Das Backend ist eine Flask-API, die
die Umrechnungslogik als REST-Endpunkte bereitstellt; das Frontend basiert auf Create React App, ist mit Tailwind CSS
& DaisyUI gestaltet und bietet eine intuitive UI mit Echtzeit-Validierung, Ladezuständen und sauber formatierten Einheitenbezeichnungen
(einschließlich hochgestellter Exponenten und Divisionszeichen).

## Tech-Stack

### Umrechnungs-Engine in Python
- **Sprache**: Python 3.7+
- **Kernbibliothek**: `unit_converter.py`
- **Design**:
    - Eine Klasse `UnitConverter` mit einer zentralen `_factors`-Registry, die jede Einheit (und ihre Aliasse) auf einen
Faktor zur Basiseinheit abbildet
    - Umrechnungsmethoden je Kategorie (`convert_length`, `convert_area`, … `convert_acceleration`), die
Einheiten normalisieren, mit Faktoren rechnen und Sonderfälle behandeln (z. B. Flächen-Aliasse „sq m“ → m²)
    - `convert_temperature`, das über einen Zwischenschritt in Celsius die Offsets von Fahrenheit und Kelvin
berücksichtigt
    - `get_conversion_explanation()`, das entweder eine Formel (bei Temperaturen) oder „Multiply by X“ /
„Divide by Y“ für andere Größen zurückgibt

### Backend-Server
- **Framework**: Flask + `flask-cors`
- **Endpunkte**:
    - `GET /units` – Gibt die verfügbaren Einheiten je Kategorie als JSON zurück (alphabetisch sortiert, mit Ausnahme von Datenspeicher,
das nach Größe sortiert ist)
    - `POST /convert` – Nimmt `{ type, value, fromUnit, toUnit }` entgegen, ruft den Umrechner auf und gibt `{
result, explanation }` oder einen Fehler zurück
- **Kommunikation**: JSON über HTTP auf Port 5001

### Frontend-Client
- **Framework**: React (Create React App)
- **Styling**: Tailwind CSS + DaisyUI-Komponenten
- **Komponenten**:
    - **`App.js`** – Verwaltet den State (Typen, Einheiten, Eingabe, Ergebnis, Lade-/Fehler-Flags), lädt `/units`, sendet Anfragen an
`/convert` und rendert Formular & Ergebniskarte
    - **`UnitDisplay.js`** – Parst Einheiten-Strings wie `m2`, `cm3`, `km/h`, fügt `<sup>`-Tags für
Exponenten ein und behandelt Divisionsschrägstriche
- **UX-Features**:
    - Animierter Spinner beim initialen Laden der Einheiten und während der Umrechnung
    - Inline-Fehlermeldungen
    - Deaktivierte Eingaben während des Ladens
    - Sanftes Einblenden („Fade-in“) der Ergebniskarte

### Build- & Entwicklungswerkzeuge
- **Python**: `pip install flask flask-cors`
- **JavaScript**: Node.js, npm
- **Frontend**: Create React App, PostCSS, Tailwind CSS, DaisyUI
- **Tests**:
    - **Python**: `unittest`-Suite in `test/test_unit_converter.py`
    - **Frontend**: Standard-Jest-Setup von CRA

Installationsanleitung, Nutzungsbeispiele und die vollständige Codestruktur finden Sie im [GitHub-Repository](https://github.com/Nicolas2912/UnitConverter).


## Herausforderungen

### 1. Eine einheitliche Umrechnungs-Registry entwerfen

Problem: Dutzende Einheiten (samt ihrer vielen Aliasse) für mehrere physikalische Größen unterstützen, ohne
Code zu wiederholen.
Lösung: Ein einziges _factors-Dictionary mit der Kategorie als Schlüssel, ergänzt um programmatisch erzeugte Aliasse (z. B. Fläche „sq m“ →
„m2“). _convert() übernimmt die gesamte Arithmetik einheitlich.
Warum: Minimiert Duplikate und bündelt Validierung und Fehlermeldungen an einer Stelle.
Ausblick: Faktordaten aus einem Schema oder einer externen JSON-Datei laden, um benutzerdefinierte Einheiten zu ermöglichen.

----------------------------------------------------------------------------------------------------------------
---

### 2. Temperatur-Offsets & Erklärungen behandeln

Problem: Celsius, Fahrenheit und Kelvin stehen nicht in einem rein multiplikativen Verhältnis zueinander; sie erfordern additive
Offsets und unterschiedliche Formeln.
Lösung: Jede Eingabe zuerst in Celsius und dann in die Zieleinheit umrechnen; get_conversion_explanation() gibt Standardformeln zurück
(z. B. „°C = (°F − 32) × 5/9“).
Warum: Hält die Temperaturlogik isoliert und ausdrucksstark.
Ausblick: Weitere Temperaturskalen (Rankine, Réaumur) unterstützen und durchgerechnete Beispiele anzeigen.

----------------------------------------------------------------------------------------------------------------
---

### 3. Komplexe Einheitenbezeichnungen in React darstellen

Problem: Einheiten wie „m2“, „cm3“ oder „km/h“ brauchen in einer JSX-Umgebung eine korrekte typografische Darstellung (Hochstellungen,
Divisionszeichen).
Lösung: UnitDisplay.js parst den String per Regex, fügt <sup> für Ziffern ein und setzt die Teile
    um „/“ korrekt wieder zusammen.
Warum: Verbessert die Lesbarkeit und den professionellen Eindruck der UI.
Ausblick: Erweiterung auf zusammengesetzte Einheiten (z. B. „N·m“, „J/s²“) und länderspezifische Formatierung.

## Was ich gelernt habe

1. Eine **zentrale, generische Umrechnungs-Engine** zu entwickeln, die über mehrere Domänen hinweg skaliert.
2. **Offset-basierte Umrechnungen** (Temperatur) sauber neben faktorbasierten umzusetzen.
3. Python-Logik über eine **RESTful Flask-API** mit CORS bereitzustellen, um sie nahtlos ins Frontend zu integrieren.
4. Eine **React-UI** mit Tailwind CSS & DaisyUI zu bauen – inklusive asynchroner Fetches, Lade-Spinnern und
Fehlerzuständen.
5. **Umfassende Unit-Tests** in Python zu schreiben, die Grenzfälle (null, negative Werte, Extremwerte) absichern.
6. **Hochgestellte Exponenten** und Divisionen in JS/JSX mit einer minimalen Hilfskomponente zu parsen und darzustellen.

## Nächste Schritte

* Weitere Kategorien ergänzen (Energie, Druck, Datenrate).
* Die Python-Engine als PyPI-Paket & Docker-Image veröffentlichen, damit sie sich leicht wiederverwenden lässt.
* Ein **CLI**- oder **Streamlit**-Frontend für schnelle lokale Umrechnungen einführen.
* Das Frontend um ein Mobile-First-Design und Offline-Caching (PWA) erweitern.

## Geplante Verbesserungen

* **Benutzerdefinierte Einheiten** über ein vom Nutzer bearbeitbares JSON-Schema ermöglichen.
* **Batch-Umrechnungen** anbieten (CSV-Datei mit Werten und Einheiten hochladen).
* **Beziehungen zwischen Einheiten** als Graph oder Baumstruktur visualisieren.


## Screenshots

![UI](/images/UnitConverter/UI.png)
