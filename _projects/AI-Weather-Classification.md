---
layout: project
title:       "AI Weather Classification"
summary:     "An implementation of a convolutional neuronal net with pytorch to classify weather conditions from pictures"
date:        2024-05-13
permalink:   /projects/ai-weather-classification/
github_repo: https://github.com/Nicolas2912/AI-Weather-Classification
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

## Getting Started

1. Clone the repo:      git clone
https://github.com/Nicolas2912/AI-Weather-Classification.git
        cd AI-Weather-Classification
2. Create & activate a Conda environment:      conda create -n weather-classification
python=3.9.13
        conda activate weather-classification
3. Install dependencies (note the repository’s pip lockfile is `requierements.txt`):
pip install -r requierements.txt

## Usage

### Training

Train a new model (saves to models/weather-model.pth by default):

    python src/training/train_model.py \
        --data dataset \
        --device cuda \
        --epochs 28 \
        --model_path models/my-weather-model.pth \
        --verbose True

### Hyperparameter Optimization

Run Optuna study (small or large mode):

    python src/training/optimize_hyperparameters.py \
        --data dataset \
        --n_trials 50 \
        --epochs 10 \
        --device cuda \
        --mode small \
        --study_name my-weather-study

View live dashboard:

    optuna-dashboard sqlite:///db.sqlite3

### Evaluation

Evaluate a trained model on the test split and save confusion matrix:

    python src/evaluation/evaluation.py \
        --data dataset \
        --model models/my-weather-model.pth \
        --device cuda

### Prediction

Batch‑predict on a folder of images:

    python src/prediction/predict.py \
        --model models/my-weather-model.pth \
        --images test_images/test_image_class \
        --dataset dataset \
        --device cuda

### Usage Highlights

* **WeatherClassifier** (`train_model.py`):


    * Convolutional blocks (3 layers): channels [3→64→512→1024], `kernel_size=3`, `stride=2`, `padding=1`

    * LeakyReLU activations + `MaxPool2d`, dynamic feature-size computation

    * Classifier head: dropout 0.3573 → linear (`num_features→1024`) → LeakyReLU → dropout → linear (→`num_classes`)

    * Training loop with `CrossEntropyLoss` + `Adam`, history of loss & accuracy plotted
* **Hyperparameter Optimization**:


    * **Small mode**: tunes `lr` (1e-6–1e-1) & `weight_decay` (1e-10–1e-2), minimizes validation loss

    * **Large mode**: tunes `lr`, `weight_decay`, `batch_size` (2–32), `activation` [ReLU/SiLU/LeakyReLU], `dropout` (0.1–0.5), `epochs` (5–50), maximizes test
accuracy
* **DataLoader** (`utils/data_loader.py`):


    * Splits into train/val/test (70/15/15) with seed reproducibility

    * `custom_image_loader` for single-image prediction

    * Class distribution analysis + pie-chart plotting
* **Evaluation** (`evaluation.py`):


    * Computes weighted F1, precision, recall via scikit-learn

    * Plots & saves confusion matrix with class labels
* **Prediction** (`predict.py`):


    * Batch predicts on any folder of images, outputs a table of filename → predicted class

## Architecture & Components

Core Modules

* `src/utils/data_loader.py`: `WeatherDataset` wraps `ImageFolder`, applies
`Resize`/`ToTensor`, and provides train/val/test splits plus class‑distribution analysis.
* `src/training/train_model.py`: Defines `WeatherClassifier` (3 conv layers →
fully‑connected head), training loop with loss/accuracy tracking, and model‑size reporting.
* `src/training/optimize_hyperparameters.py`: Launches Optuna trials for LR, weight decay,
batch sizes, etc.
* `src/evaluation/evaluation.py`: Loads a saved model, computes F1/precision/recall, prints
tabulated report, and plots + saves confusion matrix.
* `src/prediction/predict.py`: Inference pipeline over arbitrary image folders, outputs a
CLI table of predicted labels.

Supporting Artifacts

* `notebooks/data_analysis.ipynb`: Exploratory analysis of class distributions and sample
images.
* `src/utils/plot_model.py`: Generates a visual graph of the CNN architecture via
`torchview`.
* `experiments/`: Stores training loss curves (`.png`), confusion matrices, and Optuna
trial logs.
* `test_images/`: Sample images for quick sanity checks in prediction.

## Tests

There is no formal unit‑test suite yet; instead, a small set of labeled images under
`test_images/test_image_class` can be used to verify end‑to‑end inference correctness.

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


