# SOLARIS Lab Website 🌌

This is the source code for the **SOLARIS** (Scalable Optimization, Learning, And Robustness for Intelligent Systems) Lab website.

The site is built using **Hugo**. It uses a "Data-Driven" architecture, meaning you can update News, People, and Projects by editing simple text lists, without needing to touch HTML or CSS.

---

## 🚀 1. Quick Start (Windows)

### Prerequisites
1.  **Install Hugo:**
    * Download the latest **Windows** version (e.g., `hugo_extended_..._windows-amd64.zip`) from [Hugo Releases](https://github.com/gohugoio/hugo/releases).
    * Extract `hugo.exe` to a folder (e.g., `C:\Hugo\bin`) and add it to your System PATH.
2.  **VS Code (Recommended):** A text editor makes editing YAML files easier.

### Running the Site Locally
1.  Open this folder in **VS Code** (or open a Terminal in this folder).
2.  Run the following command:
    ```powershell
    hugo server --disableFastRender
    ```
3.  Open your browser and go to: `http://localhost:1313`

> **Note:** We use `--disableFastRender` to ensure the site fully refreshes when you change data files.

---

## 📝 2. How to Update Content

You do **not** need to edit HTML files (I'm using shortcodes). All dynamic content is managed in the `data/` folder to save your time.

### 🔹 Updating News
**File:** `data/news.yml`

Add a new block to the top of the list to add a new announcement.
```yaml
- date: "Mar 2026"
  title: "New Paper Accepted"
  summary: "Our work on Quantum Turbulence was accepted at ICML."
```

### 🔹 Updating Research Projects
**File:** `data/research.yml`

Each project is a block. The site automatically arranges them into a grid.
```yaml
- title: "New Project Name"
  summary: "A short description of the project."
  category: "AI + Physics"
  lead: "Dr. Jane Doe"
  funding: "NSF"
  links:
    - text: "Code"
      url: "[https://github.com/](https://github.com/)..."
```

### 🔹 Updating Software Tools
**File:** `data/software.yml`

Same format as research. Links are automatically styled Cyan.
```yaml
- title: "Solver++"
  summary: "High-performance C++ solver"
  language: "C++"
  info_1: "License: MIT"
  info_2: "Downloads: 5k+"
  links:
    - text: "GitHub"
      url: "[https://github.com/](https://github.com/)..."
```

### 🔹 Managing the Team (People)
**File:** `data/people.yml`

The team is divided into three groups: `pi`, `postdocs`, and `students`.
To add a new student, simply add them to the `students` list:
```yaml
students:
  - name: "New Student Name"
    role: "PhD Student (Joined 2026)"
    image: "/images/student-photo.jpg"
```
*(Make sure to put their photo in the `static/images/` folder).*

### 🔹 Updating the Homepage (Hero Section)
**File:** `content/_index.md`

Use this file to change the main Title, Subtitle, Video, or Quote.
```yaml
---
title: "SOLARIS LAB"
full_name: "Scalable Optimization, Learning, And Robustness for Intelligent Systems"
subtitle: "Innovating at the intersection of Physics, AI, and Engineering."
video_file: "my-video.mp4"
...
```

---

## 🎨 3. Design & Theme

* **Dark Mode:** The site is permanently locked to "Solaris Dark Mode" (Deep Blue & Cyan). Light mode is disabled.
* **Images:** Place all new images (logos, headshots) in the `static/images/` folder.
* **Styles:** Global CSS is located in `static/css/lab-style.css`.

---

## ☁️ 4. Deployment (Automatic via GitHub Pages)

This repository is set up with **GitHub Actions**. Deployment happens automatically whenever you push changes.

### How to Publish Changes
1.  **Save** your files in VS Code.
2.  **Commit & Push** your changes to GitHub (using VS Code Source Control or GitHub Desktop).
3.  **Wait ~60 Seconds.** * Go to the **Actions** tab on the GitHub repository page to see the progress.
    * When the dot turns 🟢 **Green**, the site is live.
4.  **View Site:** Go to ``[TODO!]

### ⚠️ First Time Setup (One-Time Only)
If this is a brand new repository, you must enable the automation (this should not be the case):
1.  Go to the repository **Settings** on GitHub.
2.  Click **Pages** (left sidebar).
3.  Under **Build and deployment** > **Source**, select **GitHub Actions**.
4.  The site will deploy automatically on the next push.

---

## ⚙️ Appendix: Automation File (Technical)

*Only needed if the automation stops working.*

Ensure this file exists at `.github/workflows/hugo.yaml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: recursive
      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: 'latest'
          extended: true
      - name: Build
        run: hugo --minify
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./public

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```