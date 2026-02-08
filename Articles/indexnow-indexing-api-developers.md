---
title:: IndexNow and Google Indexing API: Instant Indexing for Developers
description:: Waiting for Google to discover new pages wastes days or weeks. IndexNow and Google Indexing API push URLs to search engines instantly. Here's how developers implement both protocols.
focus_keyword:: indexnow indexing api developers
category:: seo-roles
author:: Victor Valentine Romo
date:: 2026.02.08
---

# IndexNow and Google Indexing API: Instant Indexing for Developers

Google normally discovers new pages through crawling: Googlebot visits your site, finds links, adds them to the crawl queue, and eventually indexes them. This process takes days, weeks, or months depending on your site's crawl budget.

**IndexNow** and **Google Indexing API** bypass this delay by pushing URL changes directly to search engines the moment they happen.

**IndexNow** is an open protocol supported by Microsoft Bing, Yandex, and others (not Google). **Google Indexing API** is Google's proprietary instant indexing system (limited to specific use cases).

This guide explains when to use each, how to implement them, API authentication, rate limits, and integration patterns for common CMS platforms and frameworks.

## Why Instant Indexing Matters

### Traditional Crawling is Slow

**Timeline for new pages:**
1. Publish page
2. Submit sitemap (optional)
3. Googlebot discovers page (1-7 days for established sites, weeks for new sites)
4. Googlebot crawls page
5. Google indexes page (if it passes quality checks)

**Total time:** 3-30 days depending on site authority and crawl budget.

**Problem:** Time-sensitive content (news, events, flash sales) may be irrelevant by the time Google indexes it.

### Instant Indexing Solves This

**IndexNow and Indexing API timeline:**
1. Publish page
2. Send API request notifying search engine
3. Search engine adds URL to crawl queue (within minutes)
4. Search engine crawls and indexes (within hours)

**Total time:** Hours instead of days/weeks.

**Use cases:**
- News sites (breaking news must be indexed immediately)
- E-commerce (new products, price changes, stock updates)
- Job boards (job postings expire quickly)
- Event sites (tickets go on sale, events get canceled)

## IndexNow Protocol

**What it is:** Open protocol for notifying search engines of URL changes.

**Supported by:**
- Microsoft Bing
- Yandex
- Seznam.cz
- Naver

**NOT supported by:** Google (as of 2026—Google uses its own Indexing API)

### How IndexNow Works

1. Generate an API key (any string, e.g., UUID)
2. Host the key at `https://example.com/{API_KEY}.txt` (validates ownership)
3. Send POST request to IndexNow endpoint with list of URLs
4. Search engines crawl the URLs within hours

### Generating an API Key

**Method 1: Generate UUID**

```bash
uuidgen
# Output: 3b7a6f2c-9d8e-4a1b-8c5f-2e9a6d4c1f8b
```

**Method 2: Use any 32+ character string**

```bash
openssl rand -hex 16
# Output: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

**Host the key:**

Create file at: `https://example.com/a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6.txt`

**Content:** (Can be empty or contain the key)

```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

### IndexNow API Request

**Endpoint:**
```
https://api.indexnow.org/indexnow
```

**Method:** POST or GET

**Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `host` | Yes | Your domain (e.g., `example.com`) |
| `key` | Yes | Your API key |
| `urlList` | Yes | Array of URLs to notify (max 10,000 URLs per request) |
| `keyLocation` | No | URL of key file (default: `https://example.com/{key}.txt`) |

**Example (JSON POST):**

```bash
curl -X POST https://api.indexnow.org/indexnow \
  -H "Content-Type: application/json" \
  -d '{
    "host": "example.com",
    "key": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
    "urlList": [
      "https://example.com/new-page",
      "https://example.com/updated-page"
    ]
  }'
```

**Example (GET):**

```bash
curl "https://api.indexnow.org/indexnow?url=https://example.com/new-page&key=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6"
```

**Response:**

- **200 OK:** Request accepted (URLs added to crawl queue)
- **400 Bad Request:** Invalid parameters
- **403 Forbidden:** Key validation failed (key file not found or doesn't match)
- **429 Too Many Requests:** Rate limit exceeded

### IndexNow Rate Limits

**No official rate limits** as of 2026, but recommended:
- Submit URLs as batches (up to 10,000 per request)
- Avoid submitting same URL repeatedly within 24 hours

**Best practice:** Only submit URLs when content changes (new page, update, delete).

### IndexNow Implementation Examples

#### Node.js (Express)

**Install dependencies:**
```bash
npm install axios
```

**Function to submit URLs:**
```javascript
const axios = require('axios');

async function submitToIndexNow(urls) {
  const API_KEY = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';
  const HOST = 'example.com';

  try {
    const response = await axios.post('https://api.indexnow.org/indexnow', {
      host: HOST,
      key: API_KEY,
      urlList: urls,
    });
    console.log('IndexNow response:', response.status);
  } catch (error) {
    console.error('IndexNow error:', error.response?.data || error.message);
  }
}

// Usage
submitToIndexNow([
  'https://example.com/new-page',
  'https://example.com/updated-page'
]);
```

#### Python (Flask)

**Install dependencies:**
```bash
pip install requests
```

**Function to submit URLs:**
```python
import requests

def submit_to_indexnow(urls):
    API_KEY = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6'
    HOST = 'example.com'

    payload = {
        'host': HOST,
        'key': API_KEY,
        'urlList': urls
    }

    response = requests.post('https://api.indexnow.org/indexnow', json=payload)
    print(f'IndexNow response: {response.status_code}')

# Usage
submit_to_indexnow([
    'https://example.com/new-page',
    'https://example.com/updated-page'
])
```

#### WordPress (Plugin or Functions.php)

**Add to `functions.php`:**

```php
function submit_to_indexnow($urls) {
    $api_key = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';
    $host = 'example.com';

    $payload = json_encode([
        'host' => $host,
        'key' => $api_key,
        'urlList' => $urls
    ]);

    $response = wp_remote_post('https://api.indexnow.org/indexnow', [
        'headers' => ['Content-Type' => 'application/json'],
        'body' => $payload
    ]);

    if (is_wp_error($response)) {
        error_log('IndexNow error: ' . $response->get_error_message());
    }
}

// Hook into post publish/update
add_action('save_post', function($post_id) {
    $post = get_post($post_id);
    if ($post->post_status === 'publish') {
        $url = get_permalink($post_id);
        submit_to_indexnow([$url]);
    }
});
```

## Google Indexing API

**What it is:** Google's proprietary instant indexing API.

**Supported use cases:**
- Job postings (JobPosting structured data)
- Livestream videos (BroadcastEvent structured data)

**NOT supported:**
- General web pages
- Blog posts
- Product pages
- News articles

**Why the limitation:** Google restricts the API to high-velocity, time-sensitive content to prevent abuse. For other content, use traditional sitemaps.

### Google Indexing API Setup

#### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project (e.g., "Indexing API")
3. Enable **Google Indexing API** (APIs & Services → Library → search "Indexing API" → Enable)

#### Step 2: Create Service Account

1. Go to **IAM & Admin** → **Service Accounts**
2. Click **Create Service Account**
3. Name: "Indexing API Bot"
4. Grant role: **Indexing API Owner**
5. Create key (JSON format) → Download

**JSON key file looks like:**
```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...",
  "client_email": "indexing-api-bot@your-project-id.iam.gserviceaccount.com"
}
```

#### Step 3: Grant Access in Google Search Console

1. Go to **Google Search Console** for your site
2. Click **Settings** → **Users and permissions**
3. Click **Add user**
4. Enter service account email (e.g., `indexing-api-bot@your-project-id.iam.gserviceaccount.com`)
5. Select **Owner** permission
6. Click **Add**

**This allows the service account to submit URLs for your site.**

### Google Indexing API Requests

**Endpoint:**
```
https://indexing.googleapis.com/v3/urlNotifications:publish
```

**Authentication:** OAuth 2.0 using service account credentials.

**Request body:**
```json
{
  "url": "https://example.com/job-posting",
  "type": "URL_UPDATED"
}
```

**Types:**
- `URL_UPDATED`: Notify that URL was created or updated
- `URL_DELETED`: Notify that URL was removed

**Rate limits:**
- 200 requests per day per site (free tier)
- Can request quota increase via Google Cloud Console

### Implementation Examples

#### Node.js (Using google-auth-library)

**Install dependencies:**
```bash
npm install googleapis google-auth-library
```

**Code:**
```javascript
const { google } = require('googleapis');

async function submitToGoogleIndexing(url, type = 'URL_UPDATED') {
  const auth = new google.auth.GoogleAuth({
    keyFile: './service-account-key.json',
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });

  const indexing = google.indexing({ version: 'v3', auth });

  try {
    const response = await indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: type,
      },
    });
    console.log('Indexing API response:', response.data);
  } catch (error) {
    console.error('Indexing API error:', error.message);
  }
}

// Usage
submitToGoogleIndexing('https://example.com/job-posting', 'URL_UPDATED');
```

#### Python (Using google-auth and google-api-python-client)

**Install dependencies:**
```bash
pip install google-auth google-auth-httplib2 google-api-python-client
```

**Code:**
```python
from google.oauth2 import service_account
from googleapiclient.discovery import build

def submit_to_google_indexing(url, notification_type='URL_UPDATED'):
    credentials = service_account.Credentials.from_service_account_file(
        'service-account-key.json',
        scopes=['https://www.googleapis.com/auth/indexing']
    )

    service = build('indexing', 'v3', credentials=credentials)

    body = {
        'url': url,
        'type': notification_type
    }

    response = service.urlNotifications().publish(body=body).execute()
    print('Indexing API response:', response)

# Usage
submit_to_google_indexing('https://example.com/job-posting', 'URL_UPDATED')
```

## Comparison: IndexNow vs. Google Indexing API

| Feature | IndexNow | Google Indexing API |
|---------|----------|---------------------|
| **Supported search engines** | Bing, Yandex, Seznam, Naver | Google only |
| **Setup complexity** | Simple (generate key, host file) | Complex (Google Cloud, service account) |
| **Use cases** | Any content | Job postings, livestreams only |
| **Rate limits** | None (recommended: batch submissions) | 200/day (free tier) |
| **Authentication** | API key | OAuth 2.0 service account |
| **Cost** | Free | Free (200/day), paid for higher limits |

**Strategy:** Implement **both** if you have job postings or livestreams. Use **IndexNow** for general content (to reach Bing/Yandex).

## Monitoring and Troubleshooting

### IndexNow Debugging

**Check if key file is accessible:**
```bash
curl https://example.com/a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6.txt
```

**Should return 200 OK.**

**Common errors:**
- **403 Forbidden:** Key file not found or doesn't match submitted key
- **400 Bad Request:** Invalid JSON or missing required fields
- **429 Too Many Requests:** Submitting too frequently (wait 24 hours between duplicate submissions)

### Google Indexing API Debugging

**Check quota usage:**
1. Go to **Google Cloud Console** → **IAM & Admin** → **Quotas**
2. Search "Indexing API"
3. View current usage

**Common errors:**
- **403 Forbidden:** Service account not granted **Owner** permission in **Google Search Console**
- **401 Unauthorized:** Invalid or expired service account credentials
- **429 Too Many Requests:** Exceeded daily quota (200 requests)

**Verify service account has correct role:**
```bash
gcloud projects get-iam-policy YOUR_PROJECT_ID \
  --flatten="bindings[].members" \
  --filter="bindings.members:serviceAccount:YOUR_SERVICE_ACCOUNT_EMAIL"
```

## Automation Workflows

### On New Content Publish

**Trigger:** New blog post published

**Workflow:**
1. Publish post via CMS
2. CMS triggers webhook or post-save hook
3. Send URLs to IndexNow
4. If job posting: Also send to Google Indexing API

### On Content Update

**Trigger:** Existing page updated

**Workflow:**
1. Update content
2. Send `URL_UPDATED` to IndexNow
3. If job posting: Send `URL_UPDATED` to Google Indexing API

### On Content Deletion

**Trigger:** Page deleted

**Workflow:**
1. Delete page (returns 404 or 410)
2. Send `URL_DELETED` to IndexNow
3. If job posting: Send `URL_DELETED` to Google Indexing API

**Note:** Notify search engines of deletions to prevent crawling dead URLs.

## Frequently Asked Questions

**Does Google support IndexNow?**

No, as of 2026. Google has its own Indexing API for specific use cases. For general pages, use traditional sitemaps.

**Can I use Google Indexing API for blog posts?**

No. Google restricts the API to job postings and livestreams. Submitting other content may result in API access being revoked.

**How often can I submit URLs to IndexNow?**

No hard limit, but avoid submitting the same URL multiple times within 24 hours. Batch submissions recommended.

**Do instant indexing APIs guarantee ranking?**

No. They only guarantee **discovery** (search engine crawls the URL). Ranking depends on content quality, backlinks, and other signals.

**What happens if I submit a URL that returns 404?**

Search engine will crawl, see 404, and remove URL from index (as expected). Useful for notifying search engines of deletions.

**Can I submit competitor URLs to IndexNow?**

No. You must host the API key file on your domain to validate ownership. You can't submit URLs you don't control.

Instant indexing isn't magic—it doesn't bypass Google's quality filters or force rankings. But for time-sensitive content (news, jobs, events), the difference between indexing in hours vs. weeks determines whether you capture traffic or miss it entirely.