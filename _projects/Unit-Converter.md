---
layout: project
title: "Unit Converter"
summary: "A unit converter for nine physical quantities, with a Python conversion engine behind a Flask API and a React frontend that explains each conversion."
date: 2025-04-19
permalink: /projects/unit-converter/
github_repo: https://github.com/Nicolas2912/UnitConverter
image: /images/UnitConverter/UI.png
image_alt: "Unit Converter interface with a conversion result and explanation"
tech: [Python, Flask, React, Tailwind CSS]
problem: "Unit conversions across many categories need one consistent registry, plus special handling for offset-based units like temperature."
approach: "Designed a single factor registry with unit aliases in Python, handled temperature via an intermediate Celsius step, and exposed the engine through a Flask REST API to a React client."
outcome: "Each result comes with a human-readable explanation of the conversion factor or formula, and a unittest suite covers the conversion engine."
---

## Overview

This project is a **Universal Unit Converter** that marries a lightweight yet powerful Python conversion
engine with a modern, responsive React frontend. It supports conversions across nine major categories—Length,
Area, Volume, Mass, Time, Velocity, Acceleration, Temperature and Data Storage—providing both the numeric result
and a human-readable explanation (multiplication factor or formula). The backend is a Flask API that exposes
the conversion logic as REST endpoints, and the frontend is built with Create React App, styled by Tailwind CSS
& DaisyUI, offering an intuitive UI with real-time validation, loading states and nicely formatted unit labels
(including superscripts for exponents and division symbols).

## Tech Stack

### Python Conversion Engine
- **Language**: Python 3.7+
- **Core Library**: `unit_converter.py`
- **Design**:
    - A `UnitConverter` class with a single `_factors` registry mapping every unit (and its aliases) to a
base-unit factor
    - Conversion methods per category (`convert_length`, `convert_area`, … `convert_acceleration`) that
normalize units, apply factor arithmetic, and handle special cases (e.g. area aliases “sq m” → m²)
    - `convert_temperature` which walks through an intermediate Celsius step to handle Fahrenheit and Kelvin
offsets
    - `get_conversion_explanation()` that returns either a formula (for temperature) or “Multiply by X” /
“Divide by Y” for other quantities

### Backend Server
- **Framework**: Flask + `flask-cors`
- **Endpoints**:
    - `GET /units` – Returns JSON of available units per category (sorted alphabetically, except Data Storage
sorted by size)
    - `POST /convert` – Accepts `{ type, value, fromUnit, toUnit }`, invokes the converter, and returns `{
result, explanation }` or an error
- **Communication**: JSON over HTTP on port 5001

### Frontend Client
- **Framework**: React (Create React App)
- **Styling**: Tailwind CSS + DaisyUI components
- **Components**:
    - **`App.js`** – Manages state (types, units, input, result, loading/error flags), fetches `/units`, posts
`/convert`, and renders the form & result card
    - **`UnitDisplay.js`** – Parses unit strings like `m2`, `cm3`, `km/h` and injects `<sup>` tags for
exponents, handles division slashes
- **UX Features**:
    - Animated spinner during initial unit fetch and conversion
    - Inline error alerts
    - Disabled inputs while loading
    - Smooth “fade-in” of the result card

### Build & Development Tools
- **Python**: `pip install flask flask-cors`
- **JavaScript**: Node.js, npm
- **Frontend**: Create React App, PostCSS, Tailwind CSS, DaisyUI
- **Testing**:
    - **Python**: `unittest` suite in `test/test_unit_converter.py`
    - **Frontend**: default Jest setup from CRA

Setup instructions, usage examples, and the full code structure are in the [GitHub repository](https://github.com/Nicolas2912/UnitConverter).


## Challenges

### 1. Designing a Unified Conversion Registry

Problem: Supporting dozens of units (and their many aliases) across multiple physical quantities without
repetitive code.
Solution: A single _factors dictionary keyed by category, enriched with programmatic aliases (e.g. area "sq m" →
"m2"). _convert() handles all arithmetic uniformly.
Why: Minimizes duplication, centralizes validation and error messages.
Future: Load factor data from a schema or external JSON to allow user-defined units.

----------------------------------------------------------------------------------------------------------------
---

### 2. Handling Temperature Offsets & Explanations

Problem: Celsius, Fahrenheit and Kelvin don’t share a purely multiplicative relationship; they require additive
offsets and different formulas.
Solution: Convert any input to Celsius first, then to target; get_conversion_explanation() returns standard
formulas (e.g. “°C = (°F − 32) × 5/9”).
Why: Keeps temperature logic isolated and expressive.
Future: Support additional temperature scales (Rankine, Réaumur) and display worked-out examples.

----------------------------------------------------------------------------------------------------------------
---

### 3. Rendering Complex Unit Labels in React

Problem: Units like “m2”, “cm3” or “km/h” need proper typographic treatment (superscripts, division signs) in a
JSX environment.
Solution: UnitDisplay.js parses the string with regex, injects <sup> for digits, and correctly reassembles parts
    around “/”.
Why: Enhances readability and professionalism of the UI.
Future: Extend to handle compound units (e.g. “N·m”, “J/s²”) and locale-specific formatting.

## What I Learned

1. Crafting a **single, generic conversion engine** that scales across multiple domains.
2. Implementing **offset-based conversions** (temperature) cleanly alongside factor-based ones.
3. Exposing Python logic via a **RESTful Flask API** with CORS for seamless frontend integration.
4. Building a **React UI** with Tailwind CSS & DaisyUI, handling asynchronous fetches, loading spinners, and
error states.
5. Writing **comprehensive unit tests** in Python to guard against edge cases (zero, negatives, extremes).
6. Parsing and rendering **superscript exponents** and division in JS/JSX with a minimal utility component.

## Next Steps

* Add more categories (Energy, Pressure, Data Rate).
* Publish the Python engine as a PyPI package & Docker image for easy reuse.
* Introduce a **CLI** or **Streamlit** front-end for quick local conversions.
* Enhance the frontend with mobile-first design and offline caching (PWA).

## Improvements I'd Like to Make

* Allow **custom unit definitions** via a user-editable JSON schema.
* Offer **batch conversions** (upload CSV of values and units).
* Visualize **unit relationships** in a graph or tree structure.


## Screenshots

![UI](/images/UnitConverter/UI.png)
