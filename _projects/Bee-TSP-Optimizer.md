---
layout: project
title: "BEE-TSP-Optimizer"
summary: "A hybrid Python/C++ implementation of the Bee Algorithm for solving the Traveling Salesman Problem. Features interactive visualizations, performance optimizations, and customizable colony parameters to efficiently find near-optimal routes."
date: 2025-04-21
permalink: /projects/bee-tsp-optimizer/
github_repo: https://github.com/Nicolas2912/BEE-TSP-Optimizer
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
* Languages: Python 3.10+, C++17, MATLAB R2022a
* Core Libraries: 
  * Python: NumPy (for vectorized operations), Matplotlib (visualization), pandas (data handling)
  * C++: Standard Library with custom data structures
* Utilities: tqdm (progress bars), structlog (structured logging), tabulate (formatted output)
* Build Tools: g++ compiler (with -O3 optimization), Python setuptools
* Visualization: Matplotlib for interactive plots, MATLAB for animated demonstrations

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/Nicolas2912/BEE-TSP-Optimizer.git
cd BEE-TSP-Optimizer
```

2. Python setup:
```bash
pip install -r requirements.txt
```

3. C++ setup:
```bash
cd cpp
g++ main.cpp TSP.cpp Bee.cpp -std=c++17 -O3 -o bee_tsp
```

## Usage

### Python Implementation

```bash
python BeeAlgorithm.py \
    --ns 75 --nb 55 --ne 15 --nrb 25 --nre 25 \
    --routeLen 50 --iterations 100 \
    --visualize True --visualize_final True
```

Parameters explained:
* `ns`: Number of scout bees that explore the solution space (default: 75)
* `nb`: Number of best sites selected for neighborhood search (default: 55)
* `ne`: Number of elite sites given priority for intensive exploration (default: 15)
* `nrb`: Recruited bees for best sites - controls exploitation breadth (default: 25)
* `nre`: Recruited bees for elite sites - controls exploitation depth (default: 25)
* `routeLen`: Number of cities in the problem instance (default: 50)
* `iterations`: Maximum search iterations (default: 100)
* `visualize`: Enable/disable real-time visualization (default: True)
* `visualize_final`: Plot the final optimized tour (default: True)

### C++ Implementation

1. Compile:
```bash
cd cpp
g++ main.cpp TSP.cpp Bee.cpp -std=c++17 -O3 -o bee_tsp
```

2. Run with default parameters:
```bash
./bee_tsp
```

3. Or with custom parameters:
```bash
./bee_tsp 75 55 15 25 25 50 100
```
(Parameters follow the same order as the Python implementation)

### MATLAB Animation

Open MATLAB and run:
```matlab
main
```

Set `animate = true` in the script to watch the colony explore the TSP landscape in real-time.

## Architecture & Components

Core Modules:
* `BeeAlgorithm.py`: Main Python implementation with parameter parsing, colony management, and visualization logic
* `cpp/Bee.cpp`, `cpp/Bee.h`: C++ implementation of the bee agent with local search operators
* `cpp/TSP.cpp`, `cpp/TSP.h`: Problem modeling, distance calculations, and solution validation
* `cpp/main.cpp`: Entry point with command-line argument handling

Utilities:
* `utils/distance_matrix.py`: Efficient calculation of city-to-city distances
* `utils/csv_handler.py`: Export results for external analysis
* `utils/visualization.py`: Real-time and final tour plotting functions

Experimental Assets:
* `examples/`: Sample coordinate files for benchmark TSP instances
* `solutions/`: Pre-computed tours for comparison and validation

Testing:
* `tests/test_solutions.py`: Unit tests comparing route lengths against known benchmarks
* `tests/test_operators.py`: Validation of local search operators

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

![BeeTSPOptimizer_animation](/images/BeeTSPOptimizer/BeeTSPOptimizer_animation.gif)
