---
title: "Life at the Lab"
layout: "single"
---

<style>
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
  align-items: start;
}

/* Updated to target both img and video */
.post-content .gallery-item img,
.post-content .gallery-item video {
  display: block;
  margin: 0;
  width: 100%;
  height: 200px;
  object-fit: cover;
  border: 1px solid var(--solaris-border);
  border-radius: 8px;
  box-shadow: 0 0 14px rgba(var(--solaris-accent-rgb), 0.1);
  transition: transform 0.3s ease;
}

.post-content .gallery-item img {
  object-position: center 75%;
}

.gallery-item img:hover,
.gallery-item video:hover { 
  transform: scale(1.05); 
}

/* Optional: Clean styling for the description text */
.gallery-caption {
  font-size: 0.85rem;
  color: var(--solaris-muted);
  margin-top: 8px;
  text-align: center;
  line-height: 1.4;
}
</style>

<div class="gallery-grid">
  <div class="gallery-item">
    <img src="/images/5krun.jpeg" alt="Lab members at the 5 km run in Baltimore">
    <div class="gallery-caption">5 km of MPC, except the plant keeps getting tired! Baltimore, September 2026</div>
  </div>
  <!-- <div class="gallery-item">
    <img src="https://via.placeholder.com/400x300" alt="Lab Lunch">
  </div>
  <div class="gallery-item">
    <img src="https://via.placeholder.com/400x300" alt="Conference Trip">
  </div>
  <div class="gallery-item">
    <img src="https://via.placeholder.com/400x300" alt="Hackathon">
  </div>
  <div class="gallery-item">
    <img src="https://via.placeholder.com/400x300" alt="Whiteboard Session">
  </div> -->
  
  <div class="gallery-item">
    <video src="/images/autorotation.mp4" controls muted></video>
    <div class="gallery-caption">Real-world safety critical control system. France 2026</div>
  </div>
</div>
