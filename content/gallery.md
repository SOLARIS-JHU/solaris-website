---
title: "Life at the Lab"
layout: "single"
---

<style>
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
}

/* Updated to target both img and video */
.gallery-item img,
.gallery-item video {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.gallery-item img:hover,
.gallery-item video:hover { 
  transform: scale(1.05); 
}

/* Optional: Clean styling for the description text */
.gallery-caption {
  font-size: 0.85rem;
  color: #666;
  margin-top: 8px;
  text-align: center;
  line-height: 1.4;
}
</style>

<div class="gallery-grid">
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