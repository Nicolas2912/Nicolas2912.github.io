---
layout: project
title: "Bee Algorithm TSP Optimizer"
summary: "A nature-inspired metaheuristic for the Traveling Salesman Problem, implemented in Python for visualization and in C++ for performance, with a MATLAB animation of the search."
date: 2025-04-21
permalink: /projects/bee-tsp-optimizer/
github_repo: https://github.com/Nicolas2912/BEE-TSP-Optimizer
image: /images/BeeTSPOptimizer/cover.png
image_alt: "Tour found by the Bee Algorithm on a set of cities"
featured: true
featured_order: 3
tech: [Python, C++17, MATLAB, NumPy, Matplotlib]
problem: "Exact methods for the Traveling Salesman Problem scale poorly, so large instances need good heuristics that balance exploration and exploitation."
approach: "Implemented the Bee Algorithm with scout, elite, and follower bees and 2-opt and swap neighborhood moves, sharing one algorithmic design across a Python version for experimentation and an optimized C++ version for larger instances."
outcome: "The visualizations show how the colony converges toward near-optimal tours, and the C++ version makes larger benchmark instances practical."
---

## Overview

This project implements the Bee Colony Optimization algorithm as a metaheuristic solver for the classic Traveling Salesman Problem (TSP). Instead of using standard approaches like Branch and Bound or Dynamic Programming, I explored nature-inspired computing through the Bee Algorithm—a population-based search technique that mimics honeybee foraging behavior to efficiently navigate complex solution spaces.

The repository provides a complete ecosystem for TSP experimentation:
- A Python implementation with visualization capabilities for research and teaching
- A high-performance C++ version optimized for large-scale problems and benchmarking
- A MATLAB demonstration script for animated visualization of the search process

The hybrid approach allows for flexibility: rapid prototyping and interactive visualization in Python, with the option to scale to the C++ implementation for production use. Both implementations share the same algorithmic foundation but are optimized for their respective environments.

The solver features adaptive neighborhood search techniques (2-opt, swap operators) that balance exploration and exploitation through carefully tuned colony parameters. The visualization modules provide real-time feedback on the algorithm's convergence progress, illustrating how different bee types (scouts, followers, elites) collaborate to find increasingly optimal tours.

## Tech Stack

The project leverages several technologies to balance performance, flexibility, and visual feedback:
* Languages: Python 3.10+, C++17, MATLAB R2023b
* Core Libraries: 
  * Python: NumPy (for vectorized operations), Matplotlib (visualization), pandas (data handling)
  * C++: Standard Library with custom data structures
* Utilities: tqdm (progress bars), structlog (structured logging), tabulate (formatted output)
* Build Tools: g++ compiler (with -O3 optimization), Python setuptools
* Visualization: Matplotlib for interactive plots, MATLAB for animated demonstrations

Setup instructions, usage examples, and the full code structure are in the [GitHub repository](https://github.com/Nicolas2912/BEE-TSP-Optimizer).


## Challenges & Solutions

Several technical challenges emerged during development:

* **Efficient Neighborhood Search**: For large problem instances, the neighborhood search became a bottleneck. I optimized this with a 2-opt implementation that caches distance calculations, reducing computational overhead.

* **Cross-language Implementation**: Maintaining consistency between Python, C++, and MATLAB implementations required a unified abstract model. I developed a common interface specification that all implementations follow, ensuring algorithm behavior remains consistent across languages.

## What I Learned

* **Metaheuristic Algorithm Design**: Implementing the Bee Algorithm deepened my understanding of population-based search strategies. Particularly insightful was seeing how simple rules of agent behavior can lead to emergent problem-solving capabilities across diverse TSP instances.

* **Optimization Techniques**: The project provided practical experience in algorithmic optimization, from vectorizing operations in NumPy to leveraging optimization techniques in C++. The most significant performance improvements came from translating the neighborhood search logic into C++.

* **Multi-language Development**: Working across Python, C++, and MATLAB reinforced the importance of consistent interfaces and modular design. Each language offered different strengths: Python for rapid development and visualization, C++ for raw performance, and MATLAB for mathematical analysis and animation.

* **Visualization as a Debugging Tool**: Real-time visualization proved invaluable for understanding algorithm behavior and identifying issues.

## Improvements I'd Like to Make

Here are enhancements planned for future iterations:

* **GPU Acceleration**: Implement CUDA kernels for parallel neighborhood search operations, potentially yielding 10-100x speedup for large problem instances.

* **Web Dashboard**: Create an interactive web interface for experimenting with parameters and visualizing results in real-time.

* **Problem Extensions**: Adapt the solver for variants like the Vehicle Routing Problem (VRP), Multiple TSP, and Prize-collecting TSP.


## Screenshots

<video class="project-video" src="/images/BeeTSPOptimizer/BeeTSPOptimizer_animation.mp4" autoplay loop muted playsinline aria-label="Animation of the Bee Algorithm improving a tour"></video>
