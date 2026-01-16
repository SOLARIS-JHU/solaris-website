---
title: "Our Team"
layout: "single"
---

<style>
/* NUCLEAR OPTION: PEOPLE CSS */
.people-section { margin-bottom: 40px; }
.people-section h2 { border-bottom: 2px solid #444; padding-bottom: 10px; margin-bottom: 20px; }

.people-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 30px;
}

.person-card {
  text-align: center;
  background: #25262b; 
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #333;
}

.person-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
  border: 3px solid #feda4a; /* Star Wars Yellow Accent */
}

.social-links a { margin: 0 5px; text-decoration: none; font-size: 0.9em; color: #aaa; }
.social-links a:hover { color: #fff; }
</style>

<div class="people-section">
  <h2>Principal Investigator</h2>
  <div class="people-grid">
    <div class="person-card">
      <img src="https://via.placeholder.com/150" class="person-img">
      <h3>Dr. Jane Doe</h3>
      <p><i>Associate Professor</i></p>
      <p>Focus: AI & Fluid Dynamics</p>
      <div class="social-links">
        <a href="#">[CV]</a>
        <a href="#">[Scholar]</a>
        <a href="#">[Twitter]</a>
      </div>
    </div>
  </div>
</div>

<div class="people-section">
  <h2>Postdocs</h2>
  <div class="people-grid">
    <div class="person-card">
      <img src="https://via.placeholder.com/150" class="person-img">
      <h3>Dr. John Smith</h3>
      <p>Ph.D. MIT</p>
      <div class="social-links"><a href="#">[Website]</a></div>
    </div>
  </div>
</div>

<div class="people-section">
  <h2>PhD Students</h2>
  <div class="people-grid">
    <div class="person-card">
      <img src="https://via.placeholder.com/150" class="person-img">
      <h3>Alice Researcher</h3>
      <p>Joined 2024</p>
    </div>
    <div class="person-card">
      <img src="https://via.placeholder.com/150" class="person-img">
      <h3>Bob Coder</h3>
      <p>Joined 2025</p>
    </div>
  </div>
</div>