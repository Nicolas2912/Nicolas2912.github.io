---
layout: project
title:       "Unit Converter"
summary:     "A basic and universal unit converter with python backend with Flash API and a React frontend."
date:        2025-04-19
permalink:   /projects/unit-converter/
github_repo: https://github.com/Nicolas2912/UnitConverter
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

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/universal-unit-converter.git
cd universal-unit-converter
```

### 2. Install and run the Python API

# (Optional) create & activate a virtual environment
```bash
pip install flask flask-cors
python api.py
# The API will listen on http://localhost:5001
```

### 3. Launch the React frontend

```bash
cd unit-converter-frontend
npm install
npm start
# Opens http://localhost:3000 in your browser
```

### 4. (Optional) Run the Python test suite

```bash
python -m unittest discover
```

## Usage

1. **Select a Conversion Type**
    Choose from Length, Area, Volume, Mass, Time, Velocity, Acceleration, Temperature or Data.
2. **Enter a Value**
    Type any number (integers, decimals, positives or negatives).
3. **Choose From/To Units**
    Dropdowns auto-populate based on the selected category; exponents and slashes render correctly.
4. **Click “Convert”**
    The app displays the numeric result and a concise explanation:
    * **Temperature**: displays the formula (e.g. “°F = (°C × 9/5) + 32”)

    * **Others**: shows “Multiply by X” or “Divide by Y” or “Units are equivalent.”

## Architecture & Components

### Python Core (unit_converter.py)

* **`_factors`**: maps every unit and alias to a base-unit factor (e.g. `'km': 1000.0`, `'sq m': 1.0`)
* **Generic `_convert()`**: lowercases units, validates them, applies factor arithmetic
* **Per-category methods**: wrappers that call `_convert()` or implement special logic (`convert_area`,
`convert_temperature`)
* **`get_conversion_explanation()`**:
    * For temperature, returns standard formulas

    * For other types, computes result÷input to determine “Multiply by” or “Divide by”

### Backend Server (api.py)

* Initializes a single `UnitConverter` instance
* **`/units`**: iterates over `converter._factors`, sorts keys, capitalizes type names, injects a hard-coded
Temperature list
* **`/convert`**: parses JSON, maps type to conversion method, catches errors, returns structured JSON

### Frontend Client (unit-converter-frontend/)

* **`App.js`**
    * `useEffect` to fetch unit lists on mount

    * State hooks for inputs, result, loading, errors

    * `handleConvert()` posts JSON to `/convert` and displays the response
* **`UnitDisplay.js`**
    * Parses unit strings with regex, wraps digits in `<sup>`, reassembles division parts
* **Styling & Layout**
    * DaisyUI “card” layout, form controls, alerts, spinners

    * Responsive grid for input/result panels

### Testing (test/)

* **`test_unit_converter.py`**
    * Validates every category’s conversions, edge cases (zero, negative, large/small magnitudes)

    * Verifies `get_conversion_explanation()` for both formula and factor-based outputs

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
