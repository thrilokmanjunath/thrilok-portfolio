"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { 
  Sliders, Brain, Play, 
  RefreshCw, Terminal, 
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";

// -------------------------------------------------------------
// TYPES & DATA DEFINITIONS
// -------------------------------------------------------------

interface QubitState {
  alpha: number; // amplitude of |0>
  beta: number;  // amplitude of |1>
  gates: string[]; // sequence of applied gates
}

interface DataPoint {
  x: number;
  y: number;
  cluster: number;
}

export function QuantumStoryteller() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);

  // Scroll Progress calculations for the central Waveguide line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const elements = containerRef.current.querySelectorAll(".story-section");
      const scrollPos = window.scrollY + window.innerHeight / 2;

      elements.forEach((el, index) => {
        const top = (el as HTMLElement).offsetTop;
        const height = (el as HTMLElement).offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // -------------------------------------------------------------
  // GADGET 1: BLOCH SPHERE / INTRODUCTION
  // -------------------------------------------------------------
  const BlochSphereWidget = () => {
    const [angle, setAngle] = useState({ theta: 45, phi: 45 });
    
    useEffect(() => {
      const interval = setInterval(() => {
        setAngle(prev => ({
          theta: (prev.theta + 0.5) % 360,
          phi: (prev.phi + 0.8) % 360
        }));
      }, 30);
      return () => clearInterval(interval);
    }, []);

    // Vector calculations for 3D sphere projection
    const radTheta = (angle.theta * Math.PI) / 180;
    const radPhi = (angle.phi * Math.PI) / 180;
    const r = 80;
    
    // Qubit projection coordinates
    const qx = r * Math.sin(radTheta) * Math.cos(radPhi);
    const qy = r * Math.sin(radTheta) * Math.sin(radPhi);
    const qz = r * Math.cos(radTheta);

    // Center coordinates
    const cx = 130;
    const cy = 130;

    return (
      <div className="flex flex-col items-center justify-center p-6 h-full text-center">
        <h4 className="text-xs uppercase tracking-widest font-mono text-brand-purple mb-4">
          Qubit State |ψ⟩ Vector Visualizer
        </h4>
        <div className="relative w-[260px] h-[260px] glass rounded-full flex items-center justify-center border-brand-purple/25">
          <svg className="w-full h-full" viewBox="0 0 260 260">
            {/* Sphere boundaries */}
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(139, 92, 246, 0.15)" strokeWidth="1" />
            <ellipse cx={cx} cy={cy} rx={r} ry={25} fill="none" stroke="rgba(139, 92, 246, 0.1)" strokeWidth="1" strokeDasharray="3,3" />
            <ellipse cx={cx} cy={cy} rx={25} ry={r} fill="none" stroke="rgba(139, 92, 246, 0.1)" strokeWidth="1" strokeDasharray="3,3" />

            {/* Axes */}
            <line x1={cx - r - 20} y1={cy} x2={cx + r + 20} y2={cy} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <line x1={cx} y1={cy - r - 20} x2={cx} y2={cy + r + 20} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <line x1={cx - 50} y1={cy - 50} x2={cx + 50} y2={cy + 50} stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4,4" />

            {/* Labels */}
            <text x={cx} y={cy - r - 10} fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="monospace" textAnchor="middle">|0⟩ (Z)</text>
            <text x={cx} y={cy + r + 15} fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="monospace" textAnchor="middle">|1⟩ (-Z)</text>
            <text x={cx + r + 10} y={cy + 4} fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="monospace">|+⟩ (X)</text>

            {/* Projection line to state vector */}
            <line x1={cx} y1={cy} x2={cx + qx} y2={cy - qz} stroke="url(#quantum-gradient-story)" strokeWidth="2.5" />
            
            {/* The State Dot */}
            <circle cx={cx + qx} cy={cy - qz} r="5" fill="var(--color-brand-cyan)" className="animate-pulse shadow-glow" />
            
            {/* Dashed projections to axes */}
            <line x1={cx + qx} y1={cy - qz} x2={cx + qx} y2={cy} stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" strokeDasharray="2,2" />
            <line x1={cx + qx} y1={cy - qz} x2={cx} y2={cy - qz} stroke="rgba(139, 92, 246, 0.3)" strokeWidth="1" strokeDasharray="2,2" />

            <defs>
              <linearGradient id="quantum-gradient-story" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--color-brand-purple)" />
                <stop offset="100%" stopColor="var(--color-brand-cyan)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="mt-4 font-mono text-[10px] text-muted-foreground bg-secondary/35 py-1.5 px-3 rounded-full border border-border/10">
          State ψ = {Math.cos(radTheta/2).toFixed(3)}|0⟩ + {(Math.sin(radTheta/2)).toFixed(3)}e^(i*{angle.phi.toFixed(0)}°)|1⟩
        </div>
      </div>
    );
  };

  // -------------------------------------------------------------
  // GADGET 2: K-MEANS CLUSTERING (BCA DATA ANALYTICS)
  // -------------------------------------------------------------
  const KMeansWidget = () => {
    const [k, setK] = useState(3);
    const [noise, setNoise] = useState(15);
    const [points, setPoints] = useState<DataPoint[]>([]);
    const [centroids, setCentroids] = useState<{ x: number; y: number; color: string }[]>([]);

    // Colors for clusters
    const clusterColors = [
      "var(--color-brand-purple)",
      "var(--color-brand-cyan)",
      "var(--color-brand-pink)",
      "var(--color-brand-blue)"
    ];

    // Core generator for mock data clusters
    const generateClusterData = (numClusters: number, variance: number) => {
      const generatedPoints: DataPoint[] = [];
      const generatedCentroids: { x: number; y: number; color: string }[] = [];

      // Create base coordinates for centroids
      const baseCentroids = [
        { x: 80, y: 70 },
        { x: 220, y: 80 },
        { x: 120, y: 200 },
        { x: 200, y: 210 }
      ];

      for (let i = 0; i < numClusters; i++) {
        const center = baseCentroids[i];
        generatedCentroids.push({
          x: center.x,
          y: center.y,
          color: clusterColors[i]
        });

        // Add 12 points per cluster group
        for (let j = 0; j < 12; j++) {
          const angle = Math.random() * Math.PI * 2;
          const dist = Math.random() * variance * 2;
          generatedPoints.push({
            x: Math.min(Math.max(center.x + Math.cos(angle) * dist, 20), 280),
            y: Math.min(Math.max(center.y + Math.sin(angle) * dist, 20), 280),
            cluster: i
          });
        }
      }

      setPoints(generatedPoints);
      setCentroids(generatedCentroids.slice(0, numClusters));
    };

    useEffect(() => {
      generateClusterData(k, noise);
    }, [k, noise]);

    const handleRandomize = () => {
      generateClusterData(k, noise);
    };

    return (
      <div className="flex flex-col p-5 h-full justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs uppercase tracking-widest font-mono text-brand-purple">
              Interactive K-Means Sandbox
            </h4>
            <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full cursor-pointer text-muted-foreground hover:text-foreground" onClick={handleRandomize}>
              <RefreshCw className="h-3.5 w-3.5" />
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            Tune parameters to see centroid stabilization and cluster assignment boundaries shift in real-time.
          </p>
        </div>

        {/* Clustering SVG canvas */}
        <div className="relative w-full h-[180px] bg-black/30 rounded-2xl border border-border/10 overflow-hidden my-3">
          <svg className="w-full h-full" viewBox="0 0 300 280">
            {/* Voronoi / Centroid linkage lines */}
            {points.map((p, idx) => {
              const centroid = centroids[p.cluster];
              if (!centroid) return null;
              return (
                <line
                  key={`line-${idx}`}
                  x1={p.x}
                  y1={p.y}
                  x2={centroid.x}
                  y2={centroid.y}
                  stroke={clusterColors[p.cluster]}
                  strokeWidth="0.5"
                  strokeOpacity="0.25"
                />
              );
            })}

            {/* Points */}
            {points.map((p, idx) => (
              <circle
                key={`pt-${idx}`}
                cx={p.x}
                cy={p.y}
                r="4.5"
                fill={clusterColors[p.cluster]}
                className="transition-all duration-500"
                opacity="0.85"
                stroke="rgba(0,0,0,0.3)"
                strokeWidth="1"
              />
            ))}

            {/* Centroids */}
            {centroids.map((c, idx) => (
              <g key={`centroid-${idx}`}>
                {/* centroid pulse glow */}
                <circle
                  cx={c.x}
                  cy={c.y}
                  r="14"
                  fill="none"
                  stroke={c.color}
                  strokeWidth="1.5"
                  className="animate-ping duration-3000"
                  opacity="0.3"
                />
                <polygon
                  points={`${c.x},${c.y - 7} ${c.x - 6.5},${c.y + 4.5} ${c.x + 6.5},${c.y + 4.5}`}
                  fill={c.color}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  className="shadow-md"
                />
              </g>
            ))}
          </svg>
        </div>

        {/* Sliders layout */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="flex items-center">
              <Sliders className="h-3 w-3 mr-1.5 text-brand-purple" />
              Clusters (k = {k})
            </span>
            <input
              type="range"
              min="2"
              max="4"
              value={k}
              onChange={(e) => setK(parseInt(e.target.value))}
              className="w-24 h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-brand-purple"
            />
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="flex items-center">
              <Sliders className="h-3 w-3 mr-1.5 text-brand-cyan" />
              Variance (σ = {noise})
            </span>
            <input
              type="range"
              min="10"
              max="25"
              value={noise}
              onChange={(e) => setNoise(parseInt(e.target.value))}
              className="w-24 h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-brand-cyan"
            />
          </div>
        </div>
      </div>
    );
  };

  // -------------------------------------------------------------
  // GADGET 3: ML TRAINING SIMULATOR (PRODIGY INFOTECH INTERN)
  // -------------------------------------------------------------
  const MLTrainWidget = () => {
    const [epoch, setEpoch] = useState(0);
    const [isTraining, setIsTraining] = useState(false);
    const [lossHistory, setLossHistory] = useState<number[]>([]);
    const [valAccHistory, setValAccHistory] = useState<number[]>([]);
    const [lr, setLr] = useState(0.1);
    const [model, setModel] = useState("neural_network");

    const runTraining = () => {
      setIsTraining(true);
      setEpoch(0);
      setLossHistory([0.9]);
      setValAccHistory([0.35]);

      let currentEpoch = 0;
      let currentLoss = 0.9;
      let currentAcc = 0.35;

      const interval = setInterval(() => {
        currentEpoch += 5;
        // Simulating gradient descent learning curve
        const factor = lr === 0.1 ? 0.8 : lr === 0.01 ? 0.95 : 0.6; // lr rate modifier
        const noise = (Math.random() - 0.5) * 0.03;
        
        currentLoss = Math.max(currentLoss * factor + noise, 0.05 + Math.random() * 0.02);
        currentAcc = Math.min(currentAcc + (1 - currentAcc) * (1 - factor) + noise, 0.98);

        setEpoch(currentEpoch);
        setLossHistory(prev => [...prev, currentLoss]);
        setValAccHistory(prev => [...prev, currentAcc]);

        if (currentEpoch >= 100) {
          clearInterval(interval);
          setIsTraining(false);
        }
      }, 150);
    };

    return (
      <div className="flex flex-col p-5 h-full justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs uppercase tracking-widest font-mono text-brand-pink">
              Active Neural Net Trainer
            </h4>
            <span className={`h-2 w-2 rounded-full ${isTraining ? "bg-emerald-500 animate-pulse" : "bg-zinc-500"}`} />
          </div>
          <p className="text-[10px] text-muted-foreground">
            Configure parameters and trigger standard Gradient Descent backpropagation.
          </p>
        </div>

        {/* Hyperparameter selector */}
        <div className="grid grid-cols-2 gap-3 my-2 text-[10px] font-mono">
          <div className="flex flex-col">
            <span className="text-muted-foreground mb-1">Architecture:</span>
            <select 
              value={model} 
              disabled={isTraining}
              onChange={(e) => setModel(e.target.value)}
              className="bg-black/30 text-foreground border border-border/25 rounded-md p-1 outline-none"
            >
              <option value="neural_network">MLP Classifier</option>
              <option value="logistic_regression">Logistic Regressor</option>
            </select>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground mb-1">Learning Rate (η):</span>
            <select 
              value={lr} 
              disabled={isTraining}
              onChange={(e) => setLr(parseFloat(e.target.value))}
              className="bg-black/30 text-foreground border border-border/25 rounded-md p-1 outline-none"
            >
              <option value="0.01">0.01 (Slow)</option>
              <option value="0.1">0.1 (Optimal)</option>
              <option value="0.5">0.5 (Aggressive)</option>
            </select>
          </div>
        </div>

        {/* Loss Graph */}
        <div className="relative w-full h-[100px] bg-black/40 rounded-xl border border-border/10 overflow-hidden flex items-end p-1">
          {/* Grid lines */}
          <div className="absolute inset-0 grid grid-rows-3 grid-cols-5 opacity-5 pointer-events-none">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="border-t border-l border-white" />
            ))}
          </div>

          {/* Loss Curve SVG */}
          {lossHistory.length > 1 && (
            <svg className="w-full h-full absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path
                d={lossHistory.map((val, i) => {
                  const x = (i / (lossHistory.length - 1)) * 100;
                  const y = (1 - val) * 100; // invert y for SVG coordinate space
                  return `${i === 0 ? "M" : "L"} ${x} ${y}`;
                }).join(" ")}
                fill="none"
                stroke="var(--color-brand-pink)"
                strokeWidth="2"
                className="transition-all duration-300"
              />
              <path
                d={valAccHistory.map((val, i) => {
                  const x = (i / (valAccHistory.length - 1)) * 100;
                  const y = (1 - val) * 100;
                  return `${i === 0 ? "M" : "L"} ${x} ${y}`;
                }).join(" ")}
                fill="none"
                stroke="var(--color-brand-cyan)"
                strokeWidth="1.5"
                strokeDasharray="2,2"
                className="transition-all duration-300"
              />
            </svg>
          )}

          {epoch === 0 && !isTraining && (
            <div className="absolute inset-0 flex items-center justify-center text-[10px] text-muted-foreground font-mono">
              Graph Idle - click Train
            </div>
          )}
        </div>

        {/* Real-time telemetry console */}
        <div className="bg-secondary/40 font-mono text-[9px] p-2.5 rounded-lg border border-border/10 flex items-center justify-between">
          <div className="space-y-0.5">
            <div>Epoch: <span className="text-foreground font-bold">{epoch}/100</span></div>
            <div>Loss: <span className="text-brand-pink font-semibold">{lossHistory.length > 0 ? lossHistory[lossHistory.length - 1].toFixed(4) : "—"}</span></div>
          </div>
          <div className="space-y-0.5 text-right">
            <div>Val Acc: <span className="text-brand-cyan font-semibold">{valAccHistory.length > 0 ? (valAccHistory[valAccHistory.length - 1] * 100).toFixed(1) : "—"}%</span></div>
            <div>Status: <span className={isTraining ? "text-amber-400" : "text-emerald-400"}>{isTraining ? "CONVERGING" : "READY"}</span></div>
          </div>
        </div>

        <Button 
          onClick={runTraining} 
          disabled={isTraining}
          className="w-full bg-brand-pink text-white hover:bg-brand-pink/90 font-mono text-xs rounded-lg py-2 mt-2 h-9 cursor-pointer"
        >
          {isTraining ? (
            <span className="flex items-center justify-center">
              <RefreshCw className="h-3 w-3 mr-2 animate-spin" />
              BACKPROPAGATING...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <Play className="h-3 w-3 mr-2 fill-current" />
              TRAIN MODEL
            </span>
          )}
        </Button>
      </div>
    );
  };

  // -------------------------------------------------------------
  // GADGET 4: NEURAL NETWORK PROPAGATION (CHRIST MSC)
  // -------------------------------------------------------------
  const NeuralNetworkWidget = () => {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    const inputNodes = [
      { id: "in-1", label: "Stats & Prob", color: "var(--color-brand-purple)" },
      { id: "in-2", label: "Quantum Mech", color: "var(--color-brand-cyan)" },
      { id: "in-3", label: "Neural Archs", color: "var(--color-brand-pink)" },
      { id: "in-4", label: "Big Data APIs", color: "var(--color-brand-blue)" }
    ];

    const hiddenNodes = [
      { id: "h-1", cx: 150, cy: 50 },
      { id: "h-2", cx: 150, cy: 110 },
      { id: "h-3", cx: 150, cy: 170 },
      { id: "h-4", cx: 150, cy: 230 }
    ];

    const outputNodes = [
      { id: "out-1", label: "QML Models", cx: 260, cy: 90, color: "var(--color-brand-cyan)" },
      { id: "out-2", label: "Synthetic Data", cx: 260, cy: 190, color: "var(--color-brand-pink)" }
    ];

    return (
      <div className="flex flex-col p-5 h-full justify-between">
        <div>
          <h4 className="text-xs uppercase tracking-widest font-mono text-brand-blue mb-2">
            MSc Neural Feature Mapping
          </h4>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            Hover over any foundational course domain node on the left to trace forward-propagating synapses.
          </p>
        </div>

        {/* SVG Network Grid */}
        <div className="relative w-full h-[220px] bg-black/25 rounded-2xl border border-border/10 overflow-hidden my-3">
          <svg className="w-full h-full" viewBox="0 0 300 280">
            {/* Synapse Synaptic Connections (Line traces) */}
            {inputNodes.map((input, inIdx) => {
              const startX = 40;
              const startY = 40 + inIdx * 65;
              const isPathwayActive = hoveredNode === input.id || hoveredNode === null;

              return hiddenNodes.map((hidden) => {
                const isSynapseHovered = hoveredNode === input.id;
                return (
                  <line
                    key={`syn1-${input.id}-${hidden.id}`}
                    x1={startX}
                    y1={startY}
                    x2={hidden.cx}
                    y2={hidden.cy}
                    stroke={input.color}
                    strokeWidth={isSynapseHovered ? "2.5" : "0.5"}
                    strokeOpacity={isSynapseHovered ? "0.85" : isPathwayActive ? "0.15" : "0.03"}
                    className="transition-all duration-300"
                  />
                );
              });
            })}

            {hiddenNodes.map((hidden) => {
              return outputNodes.map((out) => {
                const isActive = hoveredNode !== null;
                const activeColor = hoveredNode 
                  ? inputNodes.find(n => n.id === hoveredNode)?.color 
                  : "rgba(255,255,255,0.1)";

                return (
                  <line
                    key={`syn2-${hidden.id}-${out.id}`}
                    x1={hidden.cx}
                    y1={hidden.cy}
                    x2={out.cx}
                    y2={out.cy}
                    stroke={activeColor}
                    strokeWidth={isActive ? "2" : "0.5"}
                    strokeOpacity={isActive ? "0.6" : "0.1"}
                    className="transition-all duration-300"
                  />
                );
              });
            })}

            {/* Input layer elements */}
            {inputNodes.map((node, idx) => {
              const cx = 40;
              const cy = 40 + idx * 65;
              const isHovered = hoveredNode === node.id;

              return (
                <g 
                  key={node.id}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isHovered ? 12 : 9}
                    fill={node.color}
                    opacity={isHovered ? 0.9 : 0.7}
                    className="transition-all duration-300"
                  />
                  <text
                    x={cx + 16}
                    y={cy + 4}
                    fill={isHovered ? "#ffffff" : "rgba(255,255,255,0.6)"}
                    fontSize="9.5"
                    fontFamily="monospace"
                    fontWeight={isHovered ? "bold" : "normal"}
                    className="transition-all duration-300"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}

            {/* Hidden layer nodes */}
            {hiddenNodes.map((node) => (
              <circle
                key={node.id}
                cx={node.cx}
                cy={node.cy}
                r="6"
                fill="rgba(255,255,255,0.2)"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1"
              />
            ))}

            {/* Output layer nodes */}
            {outputNodes.map((node) => {
              const isAnyHovered = hoveredNode !== null;
              return (
                <g key={node.id}>
                  <circle
                    cx={node.cx}
                    cy={node.cy}
                    r="10"
                    fill={node.color}
                    opacity={isAnyHovered ? 0.95 : 0.65}
                    className="transition-all duration-300 animate-pulse"
                  />
                  <text
                    x={node.cx - 16}
                    y={node.cy + 4}
                    fill="rgba(255,255,255,0.85)"
                    fontSize="9.5"
                    fontFamily="monospace"
                    textAnchor="end"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="font-mono text-[9px] text-muted-foreground text-center">
          {hoveredNode 
            ? `Weight metrics mapping: [w_1 -> w_4] actively active` 
            : "Hover on left nodes to propagate features."}
        </div>
      </div>
    );
  };

  // -------------------------------------------------------------
  // GADGET 5: QUANTUM GATE PLAYGROUND (QUANTUM CLUB PRESIDENT)
  // -------------------------------------------------------------
  const QuantumCircuitWidget = () => {
    const [state, setState] = useState<QubitState>({
      alpha: 1, // Start in pure |0> state
      beta: 0,
      gates: []
    });

    const resetCircuit = () => {
      setState({ alpha: 1, beta: 0, gates: [] });
    };

    const applyGate = (gate: string) => {
      if (state.gates.length >= 4) return; // limit slots

      let a = state.alpha;
      let b = state.beta;

      if (gate === "H") {
        // Hadamard Transform: H |0> = (|0>+|1>)/sqrt(2), H |1> = (|0>-|1>)/sqrt(2)
        const newAlpha = (a + b) / Math.sqrt(2);
        const newBeta = (a - b) / Math.sqrt(2);
        a = newAlpha;
        b = newBeta;
      } else if (gate === "X") {
        // Pauli-X (NOT): swaps amplitudes
        const temp = a;
        a = b;
        b = temp;
      }

      setState({
        alpha: a,
        beta: b,
        gates: [...state.gates, gate]
      });
    };

    // Calculate probabilities P = |amplitude|^2
    const p0 = Math.pow(state.alpha, 2);
    const p1 = Math.pow(state.beta, 2);

    return (
      <div className="flex flex-col p-5 h-full justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs uppercase tracking-widest font-mono text-brand-purple">
              Qubit Gate Simulator v0.9
            </h4>
            <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full text-muted-foreground hover:text-foreground cursor-pointer" onClick={resetCircuit}>
              <RefreshCw className="h-3.5 w-3.5" />
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            Organizing Christ University workshops on Qiskit algorithms. Try constructing superposition.
          </p>
        </div>

        {/* Live Quantum Waveform */}
        <div className="relative w-full h-[70px] bg-black/40 rounded-xl border border-border/10 overflow-hidden my-2 flex items-center justify-center">
          <svg className="w-full h-full absolute inset-0" viewBox="0 0 100 40">
            {/* Draw live sine wave showing state amplitude */}
            {p0 > 0.01 && p1 > 0.01 ? (
              // Superposition wave (interference)
              <path
                d="M 0 20 Q 25 5, 50 20 T 100 20"
                fill="none"
                stroke="url(#wave-gradient)"
                strokeWidth="2.5"
                className="animate-pulse"
              />
            ) : p1 > 0.9 ? (
              // Pure |1> wave (shifted phase/amplitude)
              <path
                d="M 0 20 Q 25 35, 50 20 T 100 20"
                fill="none"
                stroke="var(--color-brand-pink)"
                strokeWidth="2"
              />
            ) : (
              // Pure |0> state (steady ground state wave)
              <path
                d="M 0 20 L 100 20"
                fill="none"
                stroke="var(--color-brand-cyan)"
                strokeWidth="2"
              />
            )}
            
            <defs>
              <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--color-brand-cyan)" />
                <stop offset="100%" stopColor="var(--color-brand-purple)" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute top-2 right-2 text-[8px] font-mono text-muted-foreground uppercase">
            {p0 > 0.1 && p1 > 0.1 ? "Superposition state" : p1 > 0.9 ? "State |1⟩ (Excited)" : "State |0⟩ (Ground)"}
          </div>
        </div>

        {/* Circuit line representation */}
        <div className="flex items-center space-x-1.5 justify-center py-2 border-y border-border/10 my-1 bg-secondary/15">
          <div className="font-mono text-xs font-bold text-brand-cyan">|0⟩</div>
          <div className="h-0.5 w-8 bg-zinc-700" />
          
          {/* Gate slots */}
          {Array.from({ length: 4 }).map((_, i) => {
            const gate = state.gates[i];
            return (
              <React.Fragment key={i}>
                <div className={`w-8 h-8 rounded border flex items-center justify-center font-mono text-xs font-bold transition-all ${
                  gate 
                    ? gate === "H" 
                      ? "bg-brand-purple border-brand-purple/40 text-white" 
                      : "bg-brand-pink border-brand-pink/40 text-white"
                    : "border-dashed border-zinc-700 text-zinc-600 bg-black/10"
                }`}>
                  {gate || "•"}
                </div>
                <div className="h-0.5 w-6 bg-zinc-700" />
              </React.Fragment>
            );
          })}
          
          <div className="font-mono text-xs text-zinc-500">M</div>
        </div>

        {/* Interactive control buttons */}
        <div className="flex items-center gap-2">
          <Button 
            size="sm"
            onClick={() => applyGate("H")}
            disabled={state.gates.length >= 4}
            className="flex-1 bg-brand-purple text-white hover:bg-brand-purple/95 font-mono text-xs h-8 cursor-pointer"
          >
            Hadamard (H)
          </Button>
          <Button 
            size="sm"
            onClick={() => applyGate("X")}
            disabled={state.gates.length >= 4}
            className="flex-1 bg-brand-pink text-white hover:bg-brand-pink/95 font-mono text-xs h-8 cursor-pointer"
          >
            Pauli-X (X)
          </Button>
        </div>

        {/* Probability histogram bars */}
        <div className="space-y-1.5 mt-3 text-[10px] font-mono">
          <div className="flex items-center justify-between">
            <span>Prob(|0⟩): {(p0 * 100).toFixed(0)}%</span>
            <div className="w-36 h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-brand-cyan transition-all duration-500" 
                style={{ width: `${p0 * 100}%` }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span>Prob(|1⟩): {(p1 * 100).toFixed(0)}%</span>
            <div className="w-36 h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-brand-pink transition-all duration-500" 
                style={{ width: `${p1 * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Switch display gadget based on current active narrative index
  const renderGadget = () => {
    switch (activeSection) {
      case 0:
        return <BlochSphereWidget />;
      case 1:
        return <KMeansWidget />;
      case 2:
        return <MLTrainWidget />;
      case 3:
        return <NeuralNetworkWidget />;
      case 4:
        return <QuantumCircuitWidget />;
      default:
        return <BlochSphereWidget />;
    }
  };

  // Section configs for the right-hand narrative path
  const narrativeSections = [
    {
      subtitle: "Personal Introduction",
      title: "Storytelling Journey",
      content: "I am Thrilok M, currently pursuing my MSc in Data Science at Christ University, Bengaluru. Driven by computational complexity, statistical modeling, and information theory, I walk the line between clean full-stack systems engineering and theoretical machine learning research.",
      techs: ["Data Science", "Quantum Simulation", "ML Architecture"],
      accentColor: "border-l-4 border-brand-purple"
    },
    {
      subtitle: "Undergrad Roots (2022 - 2025)",
      title: "Data Analytics @ St. Joseph's",
      content: "During my Bachelor of Computer Applications at St. Joseph's University, I specialized in Data Analytics. I spent years mastering data structures, SQL optimization, and statistical modeling. As the Coding Club Coordinator, I orchestrated city-wide hackathons and began writing my first exploratory clustering pipelines.",
      techs: ["BCA Data Analytics", "Pandas & Numpy", "K-Means Clustering", "SQL"],
      accentColor: "border-l-4 border-brand-cyan"
    },
    {
      subtitle: "Internship & Practice (2025)",
      title: "Data Science @ Prodigy InfoTech",
      content: "Stepping into industrial application, I joined Prodigy InfoTech as a Data Science Intern. I designed features and automated data preprocessing paths. I worked extensively on evaluating classifiers, constructing regression models, and building clean validation pipelines to avoid overfitting.",
      techs: ["Feature Engineering", "Scikit-Learn", "Model Training", "Cross Validation"],
      accentColor: "border-l-4 border-brand-pink"
    },
    {
      subtitle: "Graduate School (2025 - 2027)",
      title: "MSc Data Science @ CHRIST",
      content: "Deepening my academic rigor, I began my Master of Science in Data Science at CHRIST (Deemed to be University). Here, my academic work covers advanced deep learning, large language models, big data analytics engines, and applied research in quantum-infused machine learning topologies.",
      techs: ["MSc Data Science", "Deep Learning", "High-Performance Compute", "PyTorch"],
      accentColor: "border-l-4 border-brand-blue"
    },
    {
      subtitle: "Club Presidency (2025 - Present)",
      title: "Head of the Quantum Club",
      content: "As the President of the Quantum Club at CHRIST University, I coordinate a community of 150+ student researchers. We host quantum computing seminars, Qiskit labs, and write simulations of quantum circuits, pushing for accessible quantum information education.",
      techs: ["Qiskit SDK", "Quantum Mechanics", "Superposition & Entanglement", "NISQ Systems"],
      accentColor: "border-l-4 border-brand-purple"
    }
  ];

  return (
    <section ref={containerRef} className="relative min-h-[400vh] py-20 px-4">
      {/* Absolute visual anchors */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-background to-transparent pointer-events-none z-20" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none z-20" />

      <div className="container mx-auto max-w-7xl relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* LEFT SIDE: Sticky visualization panel (Desktop only) */}
          <div className="sticky top-28 hidden lg:block h-[420px] rounded-3xl glass border border-border/40 bg-secondary/5 overflow-hidden glow-purple transition-all duration-500">
            {/* Morphing grid overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-brand-purple)/2%,transparent_70%)] pointer-events-none" />
            
            {/* Visual Header / status indicator */}
            <div className="h-10 border-b border-border/20 px-6 flex items-center justify-between text-[10px] font-mono text-muted-foreground uppercase tracking-widest bg-black/10">
              <span className="flex items-center">
                <Terminal className="h-3.5 w-3.5 text-brand-purple mr-2 animate-pulse" />
                Active Node: Section_{activeSection + 1}
              </span>
              <span>Simulation Status: ONLINE</span>
            </div>

            {/* Simulated interactive viewport */}
            <div className="h-[calc(100%-40px)] w-full">
              {renderGadget()}
            </div>
          </div>

          {/* RIGHT SIDE: Scrolling storytelling milestones */}
          <div className="relative space-y-32 pl-8 sm:pl-16">
            
            {/* CENTRAL TIMELINE WAVEGUIDE */}
            <div className="absolute left-[3px] sm:left-7 top-4 bottom-4 w-[2px] bg-border/25">
              <motion.div 
                className="w-full bg-gradient-to-b from-brand-purple via-brand-cyan to-brand-pink origin-top h-full" 
                style={{ scaleY }}
              />
            </div>

            {narrativeSections.map((sec, index) => {
              const isActive = activeSection === index;
              return (
                <div 
                  key={index} 
                  className="story-section relative min-h-[50vh] flex flex-col justify-center scroll-mt-24"
                >
                  {/* Glowing timeline milestone node */}
                  <motion.div 
                    className={`absolute -left-[29px] sm:-left-[41px] top-6 w-[12px] h-[12px] rounded-full border-2 bg-background z-20 transition-all duration-300 ${
                      isActive 
                        ? "border-brand-cyan scale-125 glow-cyan" 
                        : "border-border"
                    }`}
                    animate={{
                      scale: isActive ? [1.2, 1.4, 1.2] : 1
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.5
                    }}
                  />

                  {/* Narrative details block */}
                  <motion.div
                    initial={{ opacity: 0.3, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                    className={`p-6 sm:p-8 rounded-3xl glass transition-all duration-500 relative overflow-hidden ${sec.accentColor} ${
                      isActive ? "bg-secondary/20 shadow-md border-border/60" : "bg-transparent border-transparent"
                    }`}
                  >
                    <span className="text-[10px] sm:text-xs font-semibold text-brand-purple uppercase tracking-widest font-mono">
                      {sec.subtitle}
                    </span>
                    <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-2">
                      {sec.title}
                    </h3>
                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed font-light">
                      {sec.content}
                    </p>

                    {/* Integrated Mobile Interactive Panel (Shown stacked inside card for smaller viewports) */}
                    <div className="block lg:hidden mt-6 pt-6 border-t border-border/25 bg-secondary/10 rounded-2xl overflow-hidden min-h-[220px]">
                      {activeSection === index && renderGadget()}
                    </div>

                    <div className="flex flex-wrap gap-2 mt-6">
                      {sec.techs.map((tag) => (
                        <span key={tag} className="text-[9.5px] font-mono bg-secondary px-2.5 py-1 rounded-full text-muted-foreground border border-border/10">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
