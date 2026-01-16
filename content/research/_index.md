---
title: "Our Research"
---

<style>
  /* 1. THE GRID (Mobile First) */
  .research-grid {
    display: grid;
    grid-template-columns: 1fr; /* 1 column on phones */
    gap: 30px;
    padding: 20px 0;
  }

  /* 2. FORCE 3 COLUMNS ON DESKTOP (Screens wider than 900px) */
  @media (min-width: 900px) {
    .research-grid {
      grid-template-columns: repeat(3, 1fr); 
    }
  }

  .flash-card {
    background-color: transparent;
    width: 100%;
    height: 300px;
    perspective: 1000px;
  }
  .flash-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    cursor: pointer;
  }
  .flash-card:hover .flash-card-inner {
    transform: rotateY(180deg);
  }
  .flash-card-front, .flash-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    box-sizing: border-box;
  }
  .flash-card-front {
    background-color: #2e2e33;
    color: white;
    border: 1px solid #444;
  }
  .flash-card-back {
    background-color: #feda4a;
    color: black;
    transform: rotateY(180deg);
  }
</style>

<div class="research-grid">
  <div class="flash-card">
    <div class="flash-card-inner">
      <div class="flash-card-front">
        <h3 style="margin-bottom: 10px;">Neural Operators</h3>
        <p>Accelerating CFD solvers by 1000x using Fourier Neural Operators.</p>
        <small style="color: #888;">AI + Physics</small>
      </div>
      <div class="flash-card-back">
        <p><strong>Lead:</strong> Dr. Jane Doe</p>
        <p><strong>Funding:</strong> NSF Grant #2024</p>
        <div style="margin-top: 15px;">
           <a href="#" style="color: #feda4a; margin-right: 10px;">[Code]</a>
           <a href="#" style="color: #fff; text-decoration: underline;">[Paper]</a>
        </div>
      </div>
    </div>
  </div>

  <div class="flash-card">
    <div class="flash-card-inner">
      <div class="flash-card-front">
        <h3 style="margin-bottom: 10px;">Quantum Turbulence</h3>
        <p>Simulating superfluids using quantum-inspired algorithms.</p>
        <small style="color: #888;">HPC & Quantum</small>
      </div>
      <div class="flash-card-back">
        <p><strong>Lead:</strong> Bob Coder</p>
        <p><strong>Status:</strong> Under Review</p>
        <div style="margin-top: 15px;">
           <a href="#" style="color: #feda4a; margin-right: 10px;">[GitHub]</a>
           <a href="#" style="color: #fff; text-decoration: underline;">[Preprint]</a>
        </div>
      </div>
    </div>
  </div>

  <div class="flash-card">
    <div class="flash-card-inner">
      <div class="flash-card-front">
        <h3 style="margin-bottom: 10px;">Bio-Locomotion</h3>
        <p>Modeling fish swimming patterns to design efficient underwater drones.</p>
        <small style="color: #888;">Robotics</small>
      </div>
      <div class="flash-card-back">
        <p><strong>Lead:</strong> Alice Researcher</p>
        <p><strong>Funding:</strong> DARPA</p>
        <div style="margin-top: 15px;">
           <a href="#" style="color: #feda4a; margin-right: 10px;">[Demo]</a>
           <a href="#" style="color: #fff; text-decoration: underline;">[Paper]</a>
        </div>
      </div>
    </div>
  </div>

</div>