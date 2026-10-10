---
title: "Research"
description: "The Solaris Lab develops learning-enabled optimization and control methods that are scalable, reliable, and grounded in physical systems."
---

<div class="research-vision">
  <p class="research-eyebrow">What we work on</p>
  <p class="page-intro research-intro">We develop learning-enabled optimization and control methods for complex dynamical systems. Our work connects mathematical structure, differentiable computation, and physical models to make intelligent systems faster, safer, and useful at scale.</p>
</div>

<div class="research-directions">
  <section class="research-direction" aria-labelledby="learning-control-title">
    <div class="research-direction-copy">
      <span class="research-direction-number" aria-hidden="true">01</span>
      <p class="research-direction-kicker">Core methods</p>
      <h2 id="learning-control-title">Learning to Control &amp; Optimize</h2>
      <p>We build learning-based policies and optimization methods that make high-dimensional decision problems fast enough for real-time use while retaining the constraints and structure that engineering systems demand.</p>
      <p>Our research combines differentiable predictive control, learning to optimize, neural operators, and end-to-end physical simulation. The goal is not only to predict what a system will do, but to learn decisions that control it well.</p>
      <ul class="research-focus-list" aria-label="Learning to control and optimize topics">
        <li>Differentiable predictive control</li>
        <li>Constrained learning to optimize</li>
        <li>Neural operators for distributed systems</li>
      </ul>
      <a class="research-paper-link" href="https://proceedings.mlr.press/v306/zanotta26a.html" target="_blank" rel="noopener noreferrer">Featured paper: CINOC</a>
    </div>
    <figure class="research-direction-media">
      <div class="research-figure-frame">
        <img src="/images/research/cinoc-learning-control.png" alt="CINOC neural-operator control framework coordinating multiple agents over partial differential equation systems" loading="lazy" decoding="async">
      </div>
      <figcaption><strong>CINOC</strong> learns scalable neural-operator policies for PDE control. Led by Pietro Zanotta, Dibakar Roy Sarkar, and Honghui Zheng.</figcaption>
    </figure>
  </section>

  <section class="research-direction research-direction--reverse" aria-labelledby="real-time-mpc-title">
    <div class="research-direction-copy">
      <span class="research-direction-number" aria-hidden="true">02</span>
      <p class="research-direction-kicker">Optimization algorithms</p>
      <h2 id="real-time-mpc-title">Real-Time Optimization &amp; Model Predictive Control</h2>
      <p>We design optimization algorithms that make model predictive control fast, scalable, and dependable enough for demanding real-time systems. Our methods exploit problem structure and modern parallel hardware instead of treating the online optimization problem as a black box.</p>
      <p>This direction spans parallel-in-horizon and construction-free MPC solvers, execution-time-certified optimization, and Koopman-based predictive control. The goal is reliable closed-loop performance even for long horizons, nonlinear models, and embedded implementations.</p>
      <ul class="research-focus-list" aria-label="Real-time optimization and model predictive control topics">
        <li>Fast and parallel MPC solvers</li>
        <li>Time-certified optimization</li>
        <li>Koopman-based predictive control</li>
      </ul>
      <a class="research-paper-link" href="https://arxiv.org/abs/2601.14414" target="_blank" rel="noopener noreferrer">Featured paper: &pi;MPC</a>
    </div>
    <figure class="research-direction-media">
      <div class="research-figure-frame">
        <img src="/images/research/pimpc-scalability.svg" alt="PiMPC computation-time benchmark across increasing prediction horizons and system dimensions" loading="lazy" decoding="async">
      </div>
      <figcaption><strong>&pi;MPC</strong> maintains nearly constant GPU iteration time as prediction horizons and system dimensions grow. Led by Liang Wu.</figcaption>
    </figure>
  </section>

  <section class="research-direction" aria-labelledby="energy-control-title">
    <div class="research-direction-copy">
      <span class="research-direction-number" aria-hidden="true">03</span>
      <p class="research-direction-kicker">Systems and impact</p>
      <h2 id="energy-control-title">Control for Energy Systems</h2>
      <p>We translate advances in learning and control into practical tools for sustainable energy systems. These applications bring together nonlinear physics, uncertain operating conditions, discrete decisions, and strict real-time requirements.</p>
      <p>Our work covers grid-scale energy storage, batteries, buildings, HVAC systems, and data-center cooling—using learning-enabled optimization to operate them efficiently without losing sight of physical feasibility.</p>
      <ul class="research-focus-list" aria-label="Control for energy systems topics">
        <li>Grid-scale storage and battery dispatch</li>
        <li>Buildings, HVAC, and data-center cooling</li>
        <li>Mixed-integer real-time control</li>
      </ul>
      <a class="research-paper-link" href="https://xboldocky.github.io/chiller-plant-MIDPC/" target="_blank" rel="noopener noreferrer">Featured paper: Data Center Chiller Plant MI-DPC</a>
    </div>
    <figure class="research-direction-media">
      <div class="research-figure-frame">
        <img src="/images/research/chiller-plant-midpc.png" alt="Graphical abstract showing mixed-integer differentiable predictive control for a data-center chiller plant" loading="lazy" decoding="async">
      </div>
      <figcaption><strong>Data-center chiller plant optimization</strong> with mixed-integer differentiable predictive control, led by Ján Boldocký.</figcaption>
    </figure>
  </section>
</div>
