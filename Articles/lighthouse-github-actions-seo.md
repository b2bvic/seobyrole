---
title:: Lighthouse GitHub Actions: Automated SEO and Performance Monitoring
description:: Automate Lighthouse audits with GitHub Actions to catch SEO and performance regressions before deployment. Learn setup, configuration, and alert workflows.
focus_keyword:: Lighthouse GitHub Actions SEO
category:: seo-roles
author:: Victor Valentine Romo
date:: 2026.02.08
---

# Lighthouse GitHub Actions: Automated SEO and Performance Monitoring

**Lighthouse** audits web pages for performance, accessibility, SEO, and best practices. Running Lighthouse manually before every deploy doesn't scale. **GitHub Actions** automates Lighthouse audits on every pull request, catching regressions before they reach production.

This guide shows how to integrate Lighthouse with GitHub Actions, configure SEO-focused audits, and set up alerting for performance and SEO issues.

## Why Automate Lighthouse Audits

Manual Lighthouse audits face three problems:

**Inconsistency:** Developers forget to run audits, or only audit on desktop, or skip audits when rushing to deploy.

**Late detection:** Discovering a performance regression after deployment means rollback complexity, angry users, and lost rankings.

**No historical tracking:** Manual audits produce one-time scores with no trend data to identify gradual degradation.

**Automated Lighthouse via GitHub Actions** solves these:

**Consistency:** Every pull request runs audits automatically, no human memory required.

**Early detection:** Regressions get caught during code review, before merging to main. Failed audits block merges.

**Historical tracking:** Store audit results in artifacts or external services to track performance trends over time.

**SEO-specific use cases:**

- Catch meta tag removals or canonical tag errors before deployment
- Detect structured data breakage or schema.org validation errors
- Monitor crawlability issues (broken internal links, robots.txt changes)
- Track Core Web Vitals trends (LCP, CLS, FID) across releases

## Setting Up Lighthouse GitHub Actions

### Basic Workflow Configuration

Create a GitHub Actions workflow file at `.github/workflows/lighthouse.yml`:

```yaml
name: Lighthouse CI

on:
  pull_request:
    branches:
      - main

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Install Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build site
        run: npm run build

      - name: Run Lighthouse
        uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            https://example.com
            https://example.com/blog
            https://example.com/products
          uploadArtifacts: true
          temporaryPublicStorage: true
```

**What this does:**

1. Triggers on pull requests to `main`
2. Checks out code
3. Installs dependencies and builds the site
4. Runs Lighthouse against specified URLs
5. Uploads audit results as artifacts

**URL targeting:** Test critical pages—homepage, top landing pages, key product pages. Auditing 5-10 pages catches most issues.

### Lighthouse CI Server Setup (Advanced)

For persistent storage and historical trends, use **Lighthouse CI Server**.

**Benefits:**
- Stores audit history across all branches and PRs
- Provides web UI for comparing runs
- Enables trend analysis (performance over time)
- Supports assertions (fail builds if scores drop below thresholds)

**Setup:**

1. **Deploy Lighthouse CI Server** (Heroku, Vercel, or self-hosted Docker container)

2. **Update workflow** to post results to the server:

```yaml
- name: Run Lighthouse CI
  uses: treosh/lighthouse-ci-action@v9
  with:
    urls: |
      https://example.com
      https://example.com/blog
    serverBaseUrl: https://your-lhci-server.herokuapp.com
    serverToken: ${{ secrets.LHCI_SERVER_TOKEN }}
```

3. **Add assertions** in a `lighthouserc.json` config:

```json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:seo": ["error", {"minScore": 0.95}],
        "categories:accessibility": ["warn", {"minScore": 0.9}]
      }
    },
    "upload": {
      "target": "lhci",
      "serverBaseUrl": "https://your-lhci-server.herokuapp.com",
      "token": "YOUR_TOKEN"
    }
  }
}
```

**Assertions:**
- `categories:performance` requires performance score ≥90
- `categories:seo` requires SEO score ≥95
- `categories:accessibility` warns if accessibility <90 but doesn't fail

**Pull requests that fail assertions get blocked from merging.**

## SEO-Focused Lighthouse Configuration

Lighthouse's SEO audit checks 16+ factors. Customize which failures block deployments.

### SEO Audit Categories

Lighthouse SEO audits include:

**Document structure:**
- `<title>` tag exists and isn't empty
- Meta description exists
- Page has valid `<html lang>` attribute

**Crawlability:**
- `robots.txt` is valid
- Page is mobile-friendly
- Links have descriptive text (no "click here")
- Links are crawlable (use `<a href>`, not JavaScript click handlers)

**Structured data:**
- Structured data is valid (schema.org compliance)

**Image optimization:**
- Images have `alt` attributes
- Images use appropriate sizes

**Mobile usability:**
- Viewport meta tag exists
- Font sizes are legible on mobile
- Tap targets are appropriately sized (44x44px minimum)

### Custom SEO Assertions

Target critical SEO issues in `lighthouserc.json`:

```json
{
  "ci": {
    "assert": {
      "assertions": {
        "categories:seo": ["error", {"minScore": 0.95}],
        "document-title": "error",
        "meta-description": "error",
        "link-text": "warn",
        "crawlable-anchors": "error",
        "image-alt": "warn",
        "hreflang": "error",
        "canonical": "error"
      }
    }
  }
}
```

**Critical errors (block merge):**
- Missing `<title>` or meta description
- Invalid canonical tags or hreflang
- Links that aren't crawlable

**Warnings (don't block, but flag):**
- Generic link text ("click here", "read more")
- Missing alt attributes

### Validating Structured Data

Lighthouse validates structured data but doesn't exhaustively check schema.org compliance. Add a separate step for schema validation:

```yaml
- name: Validate Structured Data
  run: |
    npx structured-data-testing-tool https://example.com
```

Alternatively, integrate **Google's Rich Results Test** via API or scraping.

## Core Web Vitals Tracking

Lighthouse measures **Core Web Vitals** (LCP, CLS, FID/TBT). Track these over time to identify regressions.

### Web Vitals Assertions

Set thresholds in `lighthouserc.json`:

```json
{
  "ci": {
    "assert": {
      "assertions": {
        "largest-contentful-paint": ["error", {"maxNumericValue": 2500}],
        "cumulative-layout-shift": ["error", {"maxNumericValue": 0.1}],
        "total-blocking-time": ["error", {"maxNumericValue": 300}]
      }
    }
  }
}
```

**Thresholds:**
- **LCP:** ≤2.5s (good), 2.5-4.0s (needs improvement), >4.0s (poor)
- **CLS:** ≤0.1 (good), 0.1-0.25 (needs improvement), >0.25 (poor)
- **TBT (proxy for FID):** ≤300ms (good), 300-600ms (needs improvement), >600ms (poor)

Pull requests that exceed thresholds fail, forcing developers to optimize before merging.

### Tracking Trends

Store Lighthouse scores in a database or external service to track trends.

**Option 1: Lighthouse CI Server** (built-in trending)

**Option 2: Post results to analytics platform**

```yaml
- name: Post Lighthouse results to analytics
  run: |
    curl -X POST https://analytics.example.com/lighthouse \
      -H "Content-Type: application/json" \
      -d '{"score": ${{ steps.lighthouse.outputs.performance }}, "timestamp": "$(date -Iseconds)"}'
```

**Option 3: Store results in Google Sheets or Airtable**

Use a GitHub Action like `googleapis/sheets-action` to append scores to a tracking sheet.

## Handling Dynamic and Authenticated Pages

Lighthouse audits require publicly accessible URLs. Staging environments or authenticated pages need special handling.

### Auditing Staging Environments

Deploy PR branches to preview environments (Vercel, Netlify, or custom staging), then audit those URLs.

**Example with Vercel:**

```yaml
- name: Deploy to Vercel
  uses: amondnet/vercel-action@v20
  with:
    vercel-token: ${{ secrets.VERCEL_TOKEN }}
    vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
    vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}

- name: Run Lighthouse on preview
  uses: treosh/lighthouse-ci-action@v9
  with:
    urls: ${{ steps.vercel.outputs.preview-url }}
```

**This audits the deployed preview, catching issues before production.**

### Auditing Authenticated Pages

Lighthouse can't audit pages behind login by default. Two workarounds:

**Option 1: Bypass authentication for CI**

Create a temporary token or bypass parameter that allows Lighthouse to access authenticated pages during CI runs. Restrict this to CI IP addresses.

**Option 2: Puppeteer login flow**

Use Puppeteer to log in before running Lighthouse:

```javascript
const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Login
  await page.goto('https://example.com/login');
  await page.type('#username', 'test-user');
  await page.type('#password', 'test-password');
  await page.click('#login-button');
  await page.waitForNavigation();

  // Run Lighthouse
  const result = await lighthouse('https://example.com/dashboard', {
    port: new URL(browser.wsEndpoint()).port,
    output: 'json'
  });

  console.log(result.lhr.categories.seo.score);

  await browser.close();
})();
```

## Alerting on Regressions

GitHub Actions can send alerts when audits fail.

### Slack Notifications

Post Lighthouse failures to Slack:

```yaml
- name: Notify Slack on failure
  if: failure()
  uses: slackapi/slack-github-action@v1
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK }}
    payload: |
      {
        "text": "Lighthouse audit failed on PR #${{ github.event.pull_request.number }}",
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "Performance score dropped below threshold. Review: ${{ github.event.pull_request.html_url }}"
            }
          }
        ]
      }
```

### Email Notifications

Use GitHub Actions' built-in email notifications or a custom action to send email alerts on failures.

### PR Comments

Post Lighthouse results directly to pull requests:

```yaml
- name: Comment Lighthouse results on PR
  uses: actions/github-script@v6
  with:
    script: |
      github.rest.issues.createComment({
        issue_number: context.issue.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        body: 'Lighthouse Audit Results:\n- Performance: 92\n- SEO: 98\n- Accessibility: 95'
      });
```

## Example: Full Lighthouse GitHub Actions Workflow

```yaml
name: Lighthouse CI

on:
  pull_request:
    branches:
      - main

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build site
        run: npm run build

      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            http://localhost:3000
            http://localhost:3000/blog
            http://localhost:3000/products
          uploadArtifacts: true
          configPath: './lighthouserc.json'

      - name: Comment results on PR
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const results = JSON.parse(fs.readFileSync('.lighthouseci/manifest.json'));
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `Lighthouse Results:\n- SEO: ${results[0].summary.seo * 100}\n- Performance: ${results[0].summary.performance * 100}`
            });

      - name: Notify Slack on failure
        if: failure()
        uses: slackapi/slack-github-action@v1
        with:
          webhook-url: ${{ secrets.SLACK_WEBHOOK }}
          payload: |
            {
              "text": "Lighthouse audit failed for PR #${{ github.event.pull_request.number }}"
            }
```

## FAQ

**Does Lighthouse GitHub Actions work for server-side rendered apps?**

Yes, but you must build and serve the app before running Lighthouse. Use `npm run build && npm run start` to serve a local instance, then audit `http://localhost:3000`.

**Can I audit mobile and desktop separately?**

Yes. Configure separate Lighthouse runs with different emulation settings in `lighthouserc.json`:

```json
{
  "ci": {
    "collect": {
      "settings": {
        "emulatedFormFactor": "mobile"
      }
    }
  }
}
```

Run the workflow twice with different configs, or use matrix builds to test both.

**How do I prevent flaky Lighthouse scores?**

Run Lighthouse multiple times per URL and average scores. Set `numberOfRuns: 3` in `lighthouserc.json` to run 3 audits per URL and use the median score.

**What if Lighthouse fails due to third-party script issues?**

Lighthouse audits the entire page, including third-party scripts. If a third-party script causes failures, either fix the issue with the vendor, remove the script, or adjust assertions to warn instead of error.

**Can I run Lighthouse on every commit, not just PRs?**

Yes, but this consumes more CI minutes. Use triggers like `push: branches: [main]` to audit on every commit to main. Most teams audit PRs only to save resources.

**How do I benchmark against competitors?**

Add competitor URLs to the `urls` list. Lighthouse audits any publicly accessible URL. Track your scores vs. competitors to identify gaps.