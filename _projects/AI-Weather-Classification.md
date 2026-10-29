---
layout: project
title: "Weather Image Classification with a CNN"
summary: "A convolutional neural network in PyTorch that classifies 11 weather phenomena from photos, with Optuna hyperparameter tuning and a full evaluation pipeline."
date: 2024-05-13
permalink: /projects/ai-weather-classification/
github_repo: https://github.com/Nicolas2912/AI-Weather-Classification
image: /images/AI-Weather-Classification/confusion_matrix.png
image_alt: "Confusion matrix of the weather classifier on the test set"
tech: [Python, PyTorch, Optuna, scikit-learn]
problem: "Classifying weather conditions such as fog, frost, hail, or rime from photos, where several classes look visually similar."
approach: "Built a custom convolutional network in PyTorch, tuned learning rate and weight decay with Optuna, and evaluated the model with weighted F1, precision, recall, and a confusion matrix."
outcome: "A reproducible pipeline from training to batch prediction, with experiment artifacts such as loss curves and confusion matrices saved for comparison."
---

## Overview

This project delivers an end‑to‑end image classification pipeline for detecting 11 distinct
weather phenomena (dew, fog/smog, frost, glaze, hail, lightning, rain, rainbow, rime,
sandstorm, snow) using a custom convolutional neural network in PyTorch. It provides:

* A **training** script (`src/training/train_model.py`) implementing a 3‑layer ConvNet with
configurable image resizing and logging.
* An **Optuna‑powered hyperparameter optimization** module
(`src/training/optimize_hyperparameters.py`) that tunes learning rate, weight decay, and more
via small/large modes and persists trials in `db.sqlite3`.
* An **evaluation** tool (`src/evaluation/evaluation.py`) that computes weighted F1,
precision, recall, prints a classification report, and saves a confusion matrix plot.
* A **prediction** CLI (`src/prediction/predict.py`) to batch‑infer on new images using the
trained model.
* Utility components under `src/utils/` for data loading/splitting (train/val/test),
class‑distribution analysis, and model architecture visualization (via `torchview`).
* An `experiments/` folder capturing loss curves, confusion matrices, and other artifacts
for reproducibility.

## Tech Stack

* Language & Environment: Python 3.9.13 (Conda), PyTorch 2.1.2 & Torchvision 0.16.2
* Data & Transforms: `torchvision.datasets.ImageFolder`, custom `WeatherDataset`,
`torch.utils.data.DataLoader`
* Hyperparameter Tuning: Optuna 3.6.1 with SQLite backend & `optuna-dashboard`
* Visualization: Matplotlib for loss curves & pie charts, `torchview` for model graphs
* Evaluation: scikit‑learn (classification_report, confusion_matrix), tabulate for CLI
tables
* Logging & CLI: structlog, argparse, tqdm for progress bars
* Dev Tools: Git, Conda (via `environment.yml`), `requierements.txt` (pip lockfile)

Setup instructions, usage examples, and the full code structure are in the [GitHub repository](https://github.com/Nicolas2912/AI-Weather-Classification).


## Challenges

### 1. Building a CNN from Scratch in PyTorch

Implemented Solution

* Designed the `WeatherClassifier` class: modular `_initialize_layers` & `_setup_classifier` methods
* Dynamically computed the flatten size via a dummy input tensor
* Managed model-to-device transfers and verbosity flags for detailed tabular logging

Why This Approach

* **Clarity & Debuggability**: Layer init and classifier setup are decoupled, making it easier to inspect intermediate shapes
* **Flexibility**: Channel counts, dropout rates and activation functions are all easy to tweak

Future Improvements

* Incorporate residual or depthwise-separable blocks for efficiency
* Leverage transfer-learning (e.g. ResNet, EfficientNet) for faster convergence on limited data
* Add mixed-precision training (`torch.cuda.amp`) to exploit RTX 4070 Ti fully

### 2. Hyperparameter Optimization under Resource Constraints

Implemented Solution

* Employed Optuna to tune learning rates, weight decay, batch sizes and architectural hyperparameters
* Separated “small” (quick lr/wd sweep) and “large” (full search) modes to manage GPU time
* Persisted trials in `db.sqlite3` and enabled interactive inspection via `optuna-dashboard`

Why This Approach

* **Efficiency**: Focused searches reduce wasted GPU cycles
* **Reproducibility**: SQLite storage lets you resume or share studies
* **Transparency**: CLI prints best parameters in a neat table

Future Improvements

* Integrate Optuna pruning to preemptively halt poor trials
* Implement multi-objective studies (accuracy vs training speed)
* Auto-scale batch sizes based on real-time GPU memory profiling

## What I Learned

* Translating a mathematical CNN design into efficient PyTorch modules and training loops.
* Prerocessing and data analysis of images.
* Integrating Optuna for scalable hyperparameter searches and persisting studies in SQLite.
* Crafting detailed evaluation scripts that output both CLI tables and publication‑quality
plots.

## Improvements I’d Like to Make

* Add a formal test suite (unit & integration) with CI (GitHub Actions) for automated
validation.
generalization.
* Using a more advanced model architecture like ResNet or AlexNet.
* Experiment with transfer learning (ResNet/MobileNet backbones) to boost accuracy and
speed.
* Provide a Streamlit or Flask web UI for interactive image upload & prediction.

## Screenshots

![Loss](/images/AI-Weather-Classification/loss.png)
![Confusion Matrix](/images/AI-Weather-Classification/confusion_matrix.png)


