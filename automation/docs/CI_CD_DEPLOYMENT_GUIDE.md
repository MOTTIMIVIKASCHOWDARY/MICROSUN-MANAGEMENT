# 🚀 MICROSUN MANAGEMENT - Enterprise CI/CD & Live GitHub Pages Deployment Guide

> **Continuous Integration, Continuous Deployment & Live E2E Automation Pipeline**

---

## 1. Pipeline Architecture Overview

The automated CI/CD pipeline runs on **GitHub Actions** across 13 continuous delivery stages:

```
[ Push / Pull Request to main ]
              │
              ▼
   +-------------------------------------------------------+
   |  STAGE 1-6: BUILD & DEPLOY TO GITHUB PAGES           |
   |  • Checkout Repository                                |
   |  • Package Web App assets to _site/                   |
   |  • Static Syntax & Asset Verification                 |
   |  • Deploy to Live GitHub Pages via GitHub API         |
   +-------------------------------------------------------+
              │
              ▼
   +-------------------------------------------------------+
   |  STAGE 7-10: LIVE DEPLOYMENT VALIDATION & TESTING     |
   |  • Healthcheck Verification on Live Deployment URL    |
   |  • Provision Headless Chrome Selenium Engine          |
   |  • Execute 440+ POM Test Cases against Live URL       |
   |  • Capture Screenshots & Execution Logs on Failure   |
   +-------------------------------------------------------+
              │
              ▼
   +-------------------------------------------------------+
   |  STAGE 11-13: REPORTING & ARTIFACT MANAGEMENT         |
   |  • Generate Excel Workbooks (6 Sheets)                |
   |  • Generate Interactive HTML Dashboards & JSON        |
   |  • Upload Artifacts to GitHub Actions (30-Day TTL)    |
   |  • Publish Live Step Summary to GitHub PR/Commit      |
   +-------------------------------------------------------+
```

---

## 2. GitHub Repository Configuration Checklist

To activate automated deployment to GitHub Pages on your repository:

1. Go to your GitHub Repository: `https://github.com/<username>/<repo>/settings/pages`
2. Under **Build and deployment > Source**, select: **`GitHub Actions`**.
3. Under **Settings > Actions > General > Workflow permissions**, select: **`Read and write permissions`**.
4. Push your code to `main` or trigger manually via **Actions > Run workflow**.

---

## 3. Environment Variables & URL Configuration

The framework dynamically uses the `BASE_URL` environment variable:
* In GitHub Actions: Automatically injected from `${{ steps.deployment.outputs.page_url }}`.
* In Local Testing: Defaults to `http://127.0.0.1:8085` or your custom staging URL via `BASE_URL=https://my-site.com npm test`.
