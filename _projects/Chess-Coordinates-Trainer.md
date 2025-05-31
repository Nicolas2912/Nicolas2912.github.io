---
layout: project
title:       "Chess Coordinates Trainer"
summary:     "An advanced, interactive chess coordinates training application with precise statistics, timing, and performance tracking, built in Python and Tkinter."
date:        2025-04-21
permalink:   /projects/chess-coordinates-trainer/
github_repo: https://github.com/Nicolas2912/ChessCoordinateTraining.git
---

## Overview

Chess Coordinates Trainer is a desktop application that helps players master algebraic 
notation by presenting randomized board coordinates on an interactive 8×8 chessboard. Built 
with Python and Tkinter, it features:

- Real‑time coordinate validation and click tracking  
- Adaptive color schemes and flip‑board perspectives  
- Session‑based timing (configurable 5–60 s) and scoring  
- Persistent JSON‑backed performance data with historical trend analysis  
- Matplotlib‑powered visualizations of accuracy, response times, and score progression  

## Tech Stack

- Language: Python 3.8+  
- UI: Tkinter (canvas‑based chessboard, controls, panels)  
- Visualization: Matplotlib  
- Data: JSON for stats persistence; `pathlib` & standard I/O  
- Testing: `unittest` suite, coverage reports  
- Packaging: setuptools, setuptools‑scm, editable install (`pip install -e .`)  

## Getting Started

1. Clone the repo  
    ```bash
    git clone https://github.com/Nicolas2912/ChessCoordinateTraining.git
    cd ChessCoordinateTraining
    ```

2. Install dependencies
    ```bash
    pip install -r requirements.txt
    python -m pip install -e .
    ```

3. (Optional) Run tests
    ```bash
    python -m unittest discover -q
    ```

## Usage

Launch the application:

```bash
python main.py
```

1. Adjust session duration via the slider
2. Click **Start** to begin
3. Click the target square when shown a coordinate label
4. Use **Flip Board** to switch perspective
5. Save or load past sessions with **Save Stats** / **Load Stats**

## Architecture & Components

Core Modules

* **src/core/game_logic.py**: Random coordinate generation, board flips, click‐validation
logic
* **src/core/stats.py**: Session tracking, attempt recording, score & accuracy computations

UI Components

* **src/ui/components.py**:
    * `ChessboardCanvas`: renders board & binds click events

    * `CoordinateDisplay`: shows target notation

    * `StatisticsPanel`: updates live metrics

    * `GameControls`: start/flip/save/load buttons & timer

    * `PerformanceGraphs`: Matplotlib figures for trends

Entry Point

* **main.py**: initializes `ChessCoordinatesGame`, sets up main window & event loop

Assets & Docs

* **assets/images/**: UI mockups
* **docs/api_documentation.md**: auto‑generated module/class reference

Tests

* **tests/**: unit & integration tests covering core logic, UI callbacks, and end‑to‑end
scenarios

## Challenges

* Correct coordinates-tile matching also for flipped boards and resized windows
* Embedding Matplotlib into a live Tkinter canvas without blocking UI updates

## What I Learned

*   **Getting Comfortable with Complex Tkinter UIs:** Building this trainer really pushed my Tkinter skills. I learned firsthand how to manage multiple interactive elements – the board, input fields, feedback, timer, settings – and keep track of the application's state (like whether the game was running, paused, or showing results). Figuring out how to use `bind` and `after` effectively was key to making the UI feel responsive and preventing things like the timer from freezing the whole application when the user clicked or typed. I learned that for simple applications like this `Tkinter` is more than enough and does not provide much overhead. Especially that is fully integrated in python makes it a great choice for simple UI development and easy to use. But if the application/UI gets more complex, you might want to use a more sophisticated framework like `React` for proper development. `Tkinter`is still a great option if you want to use python for UI development for simple applications.
*   **Bringing Live Plots into a Desktop App:** One of the trickier parts I tackled was embedding Matplotlib plots directly into the Tkinter window for live feedback. Getting those plots – showing accuracy trends or where I was making mistakes – to update smoothly during gameplay without slowing everything down was a significant learning curve. It involved digging into how Matplotlib and Tkinter interact and finding ways to refresh the visuals without causing noticeable lag. Also a large amount of time was spent on debugging the plots placement and size on the canvas with proper scaling.
*   **Structuring the Code for Sanity:** As the trainer grew, I realized how important it was to keep the code organized. I intentionally separated the core chess logic (like generating coordinates), the Tkinter UI code, the scoring rules, and how data was saved. Creating these distinct modules with clear connections made it much easier for me to debug issues, test specific parts, and think about adding new features later without breaking everything.
*   **Crafting and Testing a Fair Scoring System:** Designing the scoring wasn't just about counting right or wrong answers. I spent time thinking about how to balance speed and accuracy and what to do about tricky user behaviors – like guessing really fast or taking long pauses. I had to test the scoring system under different conditions, including edge cases I thought up, to make sure it felt fair and robust, which involved tweaking and simulated test runs.
*   **Learning to Test a GUI Application:** Testing a graphical application like this was different from testing simple scripts. I had to figure out how to write tests that could simulate user actions (like clicks) and check if the UI responded correctly. Making sure things like high scores were saved and loaded properly was also a crucial piece of the puzzle in building confidence that the whole application worked as expected.

## Improvements I’d Like to Make

* Add a web‑based or mobile interface (e.g., Streamlit or React) for broader accessibility
* Introduce additional training modes (blindfold, mirror‑mode, notation drill)
* Add a database to store user progress and statistics also for multiple users. 
* Implement leaderboard and social sharing features for gamification
* Enhance data export (CSV/Excel) and introduce user profiles

## Screenshots

![ChessBoard](/images/ChessBoardCoordinatesTrainer/board-with-coords.png)
![FullUI](/images/ChessBoardCoordinatesTrainer/full-ui.png)


