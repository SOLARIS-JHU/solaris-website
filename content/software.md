---
title: "Open Source Software"
layout: "single"
---

<style>
  /* 1. THE GRID (Mobile First) */
  .research-grid {
    display: grid;
    grid-template-columns: 1fr; /* 1 column on phones */
    gap: 30px;
    padding: 20px 0;
  }

  /* 2. FORCE 3 COLUMNS ON DESKTOP */
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

<p>We believe in open science. All our tools are available on GitHub.</p>
<div class="research-grid">

  <div class="flash-card">
    <div class="flash-card-inner">
      <div class="flash-card-front">
        <h3 style="margin-bottom: 10px;">PyFluids-AI</h3>
        <p>Python Library for CFD + ML</p>
        <small style="color: #888;">Language: Python/PyTorch</small>
      </div>
      <div class="flash-card-back">
        <p><strong>License:</strong> MIT</p>
        <p><strong>Maintainer:</strong> Bob Coder</p>
        <div style="margin-top: 15px;">
             <a href="#" style="color: white; text-decoration: underline;">View on GitHub</a>
             <br><br>
             <a href="#" style="color: black; text-decoration: underline;">Read Docs</a>
        </div>
      </div>
    </div>
  </div>

  <div class="flash-card">
    <div class="flash-card-inner">
      <div class="flash-card-front">
        <h3 style="margin-bottom: 10px;">Solver++</h3>
        <p>High-performance C++ solver</p>
        <small style="color: #888;">Language: C++</small>
      </div>
      <div class="flash-card-back">
        <p><strong>License:</strong> GPLv3</p>
        <p><strong>Downloads:</strong> 10k+</p>
        <div style="margin-top: 15px;">
            <a href="#" style="color: white; text-decoration: underline;">View on GitHub</a>
        </div>
      </div>
    </div>
  </div>

</div>