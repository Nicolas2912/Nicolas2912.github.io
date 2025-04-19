---
layout: project
title:       "Simplex"
summary:     "A python implementation of the Simplex algorithm to solve linear optimization problems. With a streamlit interface and additional features for visualization (also sensitivity analysis) and a LLM integration."
date:        2025-04-19
permalink:   /projects/simplex/
github_repo: https://github.com/Nicolas2912/SimplexAlgorithm
---

## Overview

This project is a complete Linear Programming (LP) solver suite built in Python. I implemented both the classic Two-Phase Primal Simplex algorithm and Karmarkar’s Interior-Point method (though the latter isn’t fully wired into the UI yet). The goal was to offer flexibility in solving a wide range of LP problems, while also making the process more transparent and interactive — not just a black box.

The suite comes with a Streamlit web interface that visualizes each pivot step in the Simplex method. Users can toggle between floating-point and exact arithmetic (via Python’s fractions module) to reduce rounding issues. There’s also support for visualizing 2D/3D feasible regions, with LaTeX-rendered problem statements for clarity.

Beyond the core solvers, I built out a sensitivity analysis module that lets users see how changes to objective function coefficients or constraint bounds affect the optimal solution. It calculates shadow prices, allowable ranges, and includes interactive sliders that update plots in real time.

Another key feature is the “LLM LP Solver” page — a natural-language interface that uses Google Gemini to convert plain English problem descriptions into structured LPs. It auto-generates the corresponding scipy.optimize.linprog code, runs it, and interprets the results. This was mainly to make LPs more accessible, even for non-technical users.

To back it all up, there’s a full test suite that validates the custom solver outputs against SciPy’s linprog. Tests cover all the usual cases — feasible, infeasible, unbounded, equality constraints, etc.

## Tech Stack

The stack reflects a mix of practicality and precision:
* Language: Python 3.12 (Conda-compatible)
* Math Libraries: NumPy, SciPy (for validation), fractions (for exact mode)
* UI: Streamlit (multi-page app), Plotly & Matplotlib for 2D/3D plots, Pandas for Simplex tableaus
* LLM Integration: Google Gemini via `google-genai`, with .env key management using `python-dotenv` because of free limits and great performance
* Testing: Python unittest, compared to SciPy’s “highs” solver
* Dev Tools: Git, pip, pre-commit (for linting, type checks)

## Getting Started

1. Clone the repository:
```powershell
git clone https://github.com/nicolas2912/linear-programming-solver.git
cd linear-programming-solver
```

2. Create and activate a conda environment:
```powershell
conda create -n lp-solver python=3.12
conda activate lp-solver
```

3. Install dependencies:
```powershell
pip install -r requirements.txt
```

## Usage

Start the Streamlit application (powershell):
```powershell
python -m streamlit run app.py
```

or for other shells:
```bash
python run app.py
```

If you want to use the LLM solver, create a `.env` file in the root directory and add your Gemini API key:
```bash
GEMINI_API_KEY=your_api_key_here
```


## Architecture & Components

Core Modules
* `simplex.py`: Implements Two-Phase Primal Simplex. Handles standard form conversion, pivot logic, artificial vars, and degeneracy.
* `inner_point.py`: Early version of a Karmarkar interior-point solver (not yet integrated into the UI).
* `sensitivity.py`: Computes objective/RHS ranges, shadow prices, and supports interactive sliders for what-if analysis.

Utilities
* `utils.py`: Input validation, session state helpers, and example problem generators (2D/3D).
* `plotting.py`: Handles 2D/3D visualization of feasible regions, isoprofit lines, and analysis plots.
* `ui_components.py`: LaTeX problem display, fraction-rendered tableaus, consistent UI elements.

Streamlit Apps
* `frontend_simplex.py`: Main solver interface. Supports example loading, custom input, problem visualization, and solver step review.
* `sensitivity_ui.py`: Separate tab for sensitivity analysis.
* `pages/llm_lp_solver.py`: Uses Gemini to translate English → LP → SciPy code → solution → explanation.

Tests
* `test_simplex.py`: Unit tests that validate solver correctness, check edge cases, and compare results against SciPy.


## Challenges

A few areas required extra care:
* Standard Form Conversion: Handling mixed constraints and negative RHS values was tedious and easy to get wrong.
* Two-Phase Setup: Building Phase I/II cleanly, managing artificial variables, and ensuring correct pivoting wasn’t trivial.
* Streamlit State Management: Keeping solver states, plots, and UI synced correctly across reruns and interactions took a lot of iteration.
* LLM Output Handling: Getting consistent, structured output from the LLM was fragile. It needed prompt tuning and post-processing logic for cleanup and execution safety.

## What I Learned

* **Deep Understanding Through Implementation**: Implementing the Simplex and Karmarkar algorithms from scratch significantly deepened my understanding of linear programming. The transition from Phase I to Phase II in the Simplex method was particularly enlightening, as it required careful handling of basis changes and maintaining feasibility. This process sharpened my ability to translate mathematical concepts into efficient code, especially when managing the pivot operations and ensuring numerical stability.
* **Integrating Interactive Plots in Streamlit**: Incorporating both Matplotlib and Plotly for visualization within the Streamlit UI posed unique challenges. The key was ensuring that plots remained interactive and responsive to user inputs without unnecessary reruns or recalculations. This involved managing Streamlit's session state effectively to store intermediate results and user preferences, allowing for dynamic updates to plots like the feasible region and sensitivity analysis without restarting the application.
* **Leveraging Streamlit’s Session Model**: Streamlit's session model and UI components are powerful tools for building interactive applications. However, they require disciplined management, especially in multi-page apps, to ensure that session state is consistently updated and shared across different components. This involved careful initialization and resetting of session variables to maintain a seamless user experience.
* **Validation Through Trusted Solvers**: Testing my implementation against SciPy's linprog was crucial for identifying edge cases and ensuring accuracy. This comparison helped catch subtle bugs early, such as issues with numerical precision or edge cases in constraint handling, and provided a benchmark for the performance and correctness of my algorithms.


## Improvements I’d Like to Make

Here’s what I think would bring the most value going forward:
* Add Dual Simplex: This would be useful for warm starts and expanded sensitivity analysis.
* Secure Code Execution: LLM-generated code needs proper sandboxing — maybe a remote microservice.
* Export Options: Let users save results as PDF/LaTeX reports or data files (CSV/JSON).
* UI Enhancements: Constraint builder GUI, user accounts, saved problem history, etc.
* DevOps: CI/CD pipeline (e.g., GitHub Actions + Docker) to automate tests and builds.
* Advanced Analysis: Support for robust optimization and multi-objective LPs would expand its analytical scope.
* Implementation of Branch and Bound for integer programming.
* Implementation of a cutting plane method for integer programming.


## Screenshots

![simplex_2d_rhs_sensitivity_analysis](/images/SimplexAlgorithm/simplex_2d_rhs_sensitivity_analysis.png)
![simplex_2d_sensitivity_analysis](/images/SimplexAlgorithm/simplex_2d_sensitivity_analysis.png)
![simplex_2d_visualiation](/images/SimplexAlgorithm/simplex_2d_visualiation.png)
![simplex_3d_visualization](/images/SimplexAlgorithm/simplex_3d_visualization.png)
![simplex_shadow_prices](/images/SimplexAlgorithm/simplex_shadow_prices.png)
![simplex_solution_and_tableau](/images/SimplexAlgorithm/simplex_solution_and_tableau.png)
![simplex_streamlit_home-ui](/images/SimplexAlgorithm/simplex_streamlit_home-ui.png)
![simplex_whatif_analysis](/images/SimplexAlgorithm/simplex_whatif_analysis.png)
![simplex_llm_solver](/images/SimplexAlgorithm/simplex_llm_solver.gif)
