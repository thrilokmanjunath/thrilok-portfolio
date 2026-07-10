---
title: "An Intuitive Guide to Quantum Superposition & Qubits"
description: "Demystifying the foundational physics behind quantum computing, explaining how qubits differ from classical bits, and writing a basic circuit in Qiskit."
date: "2026-06-15"
tags: ["Quantum Computing", "Qiskit", "Physics"]
category: "Quantum"
featured: true
---

Quantum computing is often discussed with an air of mystique, but at its heart, it is a mathematical expansion of classical information theory. Instead of storing discrete binary states, quantum processors manipulate vector spaces.

In this introductory guide, we will explore the concept of a qubit, the physics of superposition, and write our first quantum circuit using **Qiskit**.

## The Classical Bit vs. The Qubit

A classical bit represents a switch that is either **off (0)** or **on (1)**. Mathematically, these can be represented as two orthogonal vectors in a 2D space:

$$|0\rangle = \begin{pmatrix} 1 \\ 0 \end{pmatrix}, \quad |1\rangle = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$$

A quantum bit, or **qubit**, is a physical system that can exist in a linear combination of both states. This state $|\psi\rangle$ is written as:

$$|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$$

where $\alpha$ and $\beta$ are complex numbers representing probability amplitudes. When we measure the qubit, the probability of obtaining state $|0\rangle$ is $|\alpha|^2$, and the probability of obtaining state $|1\rangle$ is $|\beta|^2$. Since the total probability must equal 1, these coefficients must satisfy the normalization condition:

$$|\alpha|^2 + |\beta|^2 = 1$$

## Creating Superposition with the Hadamard Gate

To transition a qubit from a definite state (like $|0\rangle$) into a uniform superposition, we apply a **Hadamard gate ($H$)**. Geometrically, this performs a rotation on the Bloch Sphere. Mathematically, the Hadamard transformation is defined by the matrix:

$$H = \frac{1}{\sqrt{2}} \begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}$$

When applied to $|0\rangle$:

$$H|0\rangle = \frac{1}{\sqrt{2}} (|0\rangle + |1\rangle)$$

This puts the qubit in a state where measuring it yields a 50% chance of being 0 and a 50% chance of being 1.

## Implementing with Qiskit

Let's write a simple Python script to create a quantum circuit, apply a Hadamard gate, and measure the output using Qiskit:

```python
from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator
from qiskit.visualization import plot_histogram

# 1. Create a quantum circuit with 1 qubit and 1 classical bit
qc = QuantumCircuit(1, 1)

# 2. Apply a Hadamard gate to qubit 0
qc.h(0)

# 3. Measure qubit 0 and store the result in classical bit 0
qc.measure(0, 0)

# 4. Simulate the circuit execution
simulator = AerSimulator()
job = simulator.run(qc, shots=1000)
result = job.result()

# 5. Extract counts
counts = result.get_counts(qc)
print("Measurement counts:", counts)
```

Running this simulation returns counts distributed roughly equally between `0` and `1` (e.g., `{'0': 508, '1': 492}`), confirming that the qubit was in a superposition of both states prior to measurement.

## Summary

Superposition is the entry point into quantum algorithms. In upcoming posts, we will explore **Quantum Entanglement** and how CNOT gates allow qubits to share information in ways classical channels cannot replicate.
