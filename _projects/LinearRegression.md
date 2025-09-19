---
layout: project
title:       "Linear Regression & Neuronal Network"
summary:     "A full-stack application for training and visualizing a linear regression model and a neuronal network using C++, Node.js, and React."
date:        2025-03-29
permalink:   /projects/LinearRegression-neuronalnetwork/
github_repo: https://github.com/Nicolas2912/cpp-ml-react
---

## Overview

This project brings together high-performance C++ computing with a modern web application, making it ideal for both education and rapid prototyping. It features analytical Linear Regression and a customizable Feedforward Neural Network, both implemented in C++11 and seamlessly integrated with a Node.js/Express backend. The frontend, built with React, utilizes REST APIs and WebSockets to provide dynamic visualizations of data points, regression lines, training losses, and predictions in real-time.

![app-gif](/images/CPP-LinearRegression-ML/app.gif)


## Tech Stack

### C++ Engine
- **Language**: C++11
- **Build System**: GNU Make
- **Libraries**: STL, OpenMP (for optional parallelization)
- **Features**: High-performance mathematical operations, parallelized training

### Backend Server
- **Runtime**: Node.js
- **Framework**: Express for REST API endpoints
- **Communication**:
  - WebSocket (ws) for live data streaming
  - child_process.spawn for C++ binary execution
- **Features**: Bridges C++ computations with frontend, streams real-time training data

### Frontend Client
- **Framework**: React (via create-react-app)
- **Styling**: Tailwind CSS with DaisyUI components
- **Visualization**: Chart.js for interactive data visualization
- **Communication**: WebSocket API for real-time updates
- **Features**: Interactive UI for data input, model configuration, and results display

### Build & Development Tools
- **Build Tools**: GNU Make, npm, Node.js
- **Platform Support**: Cross-platform (Windows via MinGW, macOS, Linux)
- **Development**: Hot-reloading for rapid iteration

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Nicolas2912/cpp-ml-react.git
cd cpp-ml-react
```

### 2. Build the C++ engine

```bash
cd cpp
make  # Creates linear_regression_app (or .exe on Windows)
cd ..
```

### 3. Run the backend server

```bash
cd server
npm install
npm start
# Server runs on http://localhost:3001
```

### 4. Launch the frontend client

```bash
# Open a new terminal
cd client
npm install
npm start
# Opens at http://localhost:3000
```

## Usage

### Data Input and Generation

- **Manual Input**: Enter comma-separated X/Y data points
- **Random Generation**: Generate data by specifying:
  - Number of points
  - Desired linearity (noise level)

### Linear Regression Training

1. Click "Train Linear Regression"
2. Review results:
   - Slope and intercept coefficients
   - Mean Squared Error (MSE)
   - R² (coefficient of determination)
3. Visualize the regression line on the scatter plot
4. Predict new Y-values using the input box

### Neural Network Training

1. Configure your network:
   - Layer architecture (e.g., 1-4-1)
   - Learning rate
   - Number of training epochs
2. Click "Train NN & Predict"
3. Monitor real-time training loss via WebSockets
4. Review final predictions, MSE, and total training time

### Interactive Features

- Toggle between dark and light themes
- Hover over data points for detailed information
- Use tooltips to understand training metrics

## Architecture & Components

### C++ Engine (`cpp/`)

- **`linear_regression.h/.cpp`**:
  - Implements linear regression using the normal equation
  - Computes performance metrics (MSE, R²)

- **`neural_network.h/.cpp`**:
  - Defines feedforward neural network architecture
  - Implements sigmoid activation functions
  - Performs training via gradient descent optimization

- **`main_server.cpp`**:
  - Provides CLI interface for training commands
  - Handles data streaming to Node.js backend

- **`Makefile`**:
  - Builds C++ modules into executable binaries
  - Configures optimization and parallel support

### Backend Server (`server/`)

- **`server.js`**:
  - Manages REST API endpoints
  - Executes C++ subprocesses
  - Parses computation output
  - Streams data via WebSockets
  - Handles cross-platform execution differences

- **Dependencies**:
  - cors for cross-origin requests
  - ws for WebSocket communication

### Frontend Client (`client/`)

- React components for:
  - Data input and visualization
  - Model configuration
  - Training controls
  - Real-time charts

- Styled with Tailwind CSS and DaisyUI for responsive UI

### Additional Components

- **`build/`**: IDE and debugging artifacts
- **`test_openmp.cpp`**: Utility for verifying OpenMP parallel capabilities
- **Root-level binaries**: Pre-compiled executables for quick demos


## Challenges

Throughout this project, I encountered three major challenges that pushed me to deepen my understanding of both C++ and full-stack JavaScript development. Below I
describe each challenge, how I solved it in my actual implementation, why I chose that approach, and ways I might improve it in the future.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------
---

### 1. Bridging C++ and Node.js

I needed to run high-performance C++ code (both an analytical linear-regression solver and a custom neural network with backpropagation) from a Node.js backend without sacrificing productivity or maintainability.

Implemented Solution

* Compiled my C++ logic into standalone executables (`linear_regression_app` and the combined `main_server` for both LR and NN).
* In `server/server.js`, I use Node’s `child_process.spawn` to launch the appropriate C++ binary with commands like `lr_train` or `nn_train_predict`.
* Data is passed via `stdin` as simple comma-separated lines (e.g. `1,2,3,4\n2,4,6,8\n`), and output is printed line-by-line in the form `key=value`.
* A helper function `parseCppLine(line)` splits each line into `{ type: 'loss_update', epoch, mse }` or `{ type: 'final_stat', key, value }`, which I then
transform into JSON messages for HTTP responses and WebSocket broadcasts.

Why This Approach

* **Simplicity**: Using standard I/O and a text-based protocol meant zero extra dependencies on the C++ side beyond the STL.
* **Decoupling**: C++ remains a pure console application; Node.js does all orchestration and parsing in JavaScript.
* **Portability**: No need to learn N-API or maintain native addons; the same binaries can be invoked from any language or environment that can spawn processes.

Future Improvements

* Replace the line-based protocol with a more robust serialization format (e.g. JSON or Protocol Buffers) to avoid parsing edge cases.
* Explore writing a true Node addon (via N-API) for tighter integration and lower latency once the prototype is stable.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------
---

### 2. Real-time Loss Streaming Over WebSockets

During neural-network training, I print loss after every epoch. For small datasets or many epochs, this floods the WebSocket channel and causes UI lag or even browser buffer overflows.

Implemented Solution

* In `server.js`, every time C++ writes a line like `epoch=42,mse=0.1234`, I broadcast an object `{ type: 'loss_update', epoch, mse }` to all connected WebSocket
clients.
* On the React frontend (`App.js`), I collect incoming updates into a local batch (`lossUpdateBatchRef`).
* I use `lodash.throttle` to call a batched updater at most once every 150 ms. That function
    1. Merges new points (filtering out duplicates) into React state,

    2. Clears the batch,

    3. Directly calls `chartRef.current.update('none')` on the Chart.js instance to redraw without animation.
* When I receive the final result or an error (`type: 'final_result'` / `type: 'error'`), I `flush()` the throttle to process any remaining batches immediately.

Why This Approach

* **Performance**: Throttling prevents React from re-rendering hundreds or thousands of chart points per second.
* **Responsiveness**: Manual chart updates (`'none'`) eliminate animation overhead and keep the graph in sync with minimal flicker.
* **Reliability**: Batching + flush ensures no messages are dropped, even if they arrive faster than the throttle interval.

Future Improvements

* Implement server-side buffering or dynamic `report_every_n_epochs` (configurable via the API) to reduce network chatter.
* Provide visual feedback (e.g. a progress bar) so users know training is ongoing even when loss updates pause.
* Explore binary protocols over WebSocket (e.g. MessagePack) for even lower overhead.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------
---

### 3. Correct Neural-Network and Backpropagation in C++

Writing a fully-featured backpropagation algorithm from scratch in C++ — complete with flexible layer sizes, safe matrix/vector arithmetic, and periodic loss
reporting—is a nontrivial undertaking.

Implemented Solution

* Created a `NeuralNetwork` class (`neural_network.h/.cpp`) that:
    * Stores `layer_sizes_`, a vector of weights matrices, and bias vectors.

    * Initializes weights with a simple He-style scaling (`±0.5/√n`) and small positive biases.

    * Implements `forward_pass` to compute weighted sums (`z`) and apply `sigmoid` on hidden layers, identity on the output.

    * Stores both pre-activation (`layer_inputs_`) and post-activation (`layer_outputs_`) vectors to simplify gradient computation.

    * Implements `backpropagate` by

        1. Computing output-layer delta as `(ŷ – y)`,


        2. Back-propagating through each hidden layer via transposed weight multiplication plus `sigmoid_derivative(z)`,


        3. Applying stochastic gradient descent updates to weights (`W ← W – η ⋅ δ⋅aᵀ`) and biases.

    * Exposes `train_for_epochs(inputs, targets, epochs)` that shuffles data each epoch, runs `backpropagate` on every sample, and prints `epoch=<n>,mse=<value>`
whenever `(epoch+1)%report_every_n_epochs==0` or at the last epoch.

    * After training, returns a flat vector of final predictions for all inputs, allowing the caller to compute and print `final_mse`, `training_time_ms`, and
`nn_predictions=…`.

Why This Approach

* **Clarity**: Separating forward/backward logic into clear methods makes it easier to debug each stage.
* **Reusability**: The same `train_for_epochs` method handles both loss reporting (for streaming) and final prediction output.
* **Control**: Writing my own vector/matrix routines lets me ensure correctness before introducing an external linear-algebra dependency.

Future Improvements

* Swap out the home-grown matrix/vector code for a high-performance library (e.g. Eigen or BLAS) to accelerate large networks.
* Support additional activation (ReLU, tanh) and loss functions (cross-entropy) for wider applicability.
* Add mini-batch gradient descent, momentum, and adaptive learning-rate schedulers to improve convergence on larger datasets.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------
---

Tackling these challenges significantly improved my skill with low-level C++ (especially designing and debugging the backprop algorithm) and my ability to architect
a full-stack pipeline that stitches native code into a smooth, real-time web experience.

## What I learned

Building this end-to-end C++ ↔ Node.js pipeline and live-streaming neural-network demo taught me invaluable lessons in both low-level systems programming and
high-level web architecture:

1. **Process Communication & Protocol Design**


    * I now feel comfortable using `child_process.spawn` in Node.js to launch native binaries, pipe data into `stdin`, and read both `stdout` and `stderr` as
streaming events.

    * Designing a minimal text protocol—printing `key=value` pairs line by line from C++ and parsing them in JavaScript via a single helper
(`parseCppLine`)—proved both robust and easy to debug.

    * I learned to guard against edge cases: always ending the C++ stdin stream (`cppProcess.stdin.end()`), checking for `res.headersSent` before writing HTTP
responses, and handling non-zero exit codes or parse failures gracefully.

2. **Real-Time Streaming Over WebSockets**

    * Integrating the `ws` library on the server and a raw `WebSocket` in React gave me a front-row seat to the challenges of high-frequency updates.

    * I discovered that unthrottled epoch-by-epoch messages overwhelm the browser, so batching them in a `useRef` queue and using `lodash.throttle` (150 ms) to
update React state is critical for smooth chart rendering.

    * Directly calling `chartRef.current.update('none')` on the Chart.js instance taught me how to decouple data ingestion from animated redraws, ensuring a
snappy UI even under load.

    * Properly cleaning up on unmount—calling `scheduleProcessLossBatch.cancel()`, closing sockets in `useEffect` cleanup, and clearing batches—prevented subtle
memory leaks and dangling callbacks.

3. **Implementing Backpropagation in C++**

    * Writing a full `NeuralNetwork` class from scratch solidified my understanding of forward passes, storing pre-activation inputs (`z`) and post-activation
outputs (`a`), and computing deltas layer by layer.

    * I sharpened my C++ skills:
            • Exception-safe parsing with `std::strtod` and thorough error checks in `parseVector` and `parseLayerSizes`.
            • Random weight initialization using `std::mt19937` with scaled uniform distributions.
            • Timing code precisely with `<chrono>` to report `training_time_ms`.

    * Separating algorithm (`train_for_epochs`) from I/O (`main_server.cpp`) made both sides easier to test and maintain. I now appreciate the discipline of
throwing on invalid matrix dimensions and catching every parsing exception at the top level.

4. **Full-Stack Architecture & Tooling**

    * I gained confidence wiring together a JavaScript REST/WebSocket layer (Express + ws) with a React front end (react-chartjs-2, reactflow) and a C++
numerical engine. Clear separation of concerns kept each component focused—Node.js orchestrates processes and handles HTTP/WebSocket clients, React manages state and
visuals, and C++ crunches numbers.

    * Detailed logging became my best friend: streaming chunks of C++ stdout/stderr to Node’s console, emitting structured logs (`LR Train C++ Stdout Chunk`,
`WebSocket message received`), and surfacing errors early made multi-language debugging tractable.

    * I reinforced best practices around input validation (both in JS and C++), error propagation, and defensive cleanup—skills that will pay dividends in any
large-scale system.

Next Steps

* Standardize the IPC protocol (e.g. JSON or Protocol Buffers over stdin/stdout) to eliminate ad-hoc parsing.
* Experiment with writing a native Node.js addon (N-API) for tighter, lower-latency C++ integration once the prototype stabilizes.
* Extend the neural-network code with mini-batch training, momentum, and alternative activations, and benchmark it against existing libraries for performance and
accuracy.

## Improvements I'd Like to Make

* **GPU Acceleration**: Implement CUDA kernels for parallel training of neural networks, potentially yielding 10-100x speedup for large problem instances.

* **Other optimizer**: Implement other optimization algorithms (e.g. Adam, RMSprop) to improve convergence and performance.

* **Other activation function**: Implement other activation functions (e.g. ReLU, tanh) to improve performance.



## Screenshots

![LR-card](/images/CPP-LinearRegression-ML/LR-card.png)
![NN-card](/images/CPP-LinearRegression-ML/NN-card.png)
![Modeloverlay-card](/images/CPP-LinearRegression-ML/modeloverlay-card.png)
![network-blueprint-ard](/images/CPP-LinearRegression-ML/network-blueprint-card.png)
![UI-whitemode](/images/CPP-LinearRegression-ML/UI-whitemode_1.png)
![UI-darkmode](/images/CPP-LinearRegression-ML/UI-darkmode_1.png)
