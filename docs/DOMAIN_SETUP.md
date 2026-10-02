# Connecting Custom Domain (`aadilkhan.xyz` via Spaceship) to Firebase Hosting

This guide outlines the exact, step-by-step procedure to connect your domain **`aadilkhan.xyz`** (purchased from [Spaceship](https://www.spaceship.com)) to your Firebase project **`portfolio-aadil-khan`**.

---

## Architecture Overview

```
User visits https://aadilkhan.xyz
            │
            ▼
Spaceship DNS (A Records / CNAME)
            │
            ▼
Firebase Global Fastly/Cloudflare CDN (SSL Terminated)
            │
            ▼
Firebase Hosting (build/web/ Single Page App)
```

---

## Step 1: Add Custom Domain in Firebase Console

1. Open the [Firebase Console](https://console.firebase.google.com/).
2. Select your project: **`portfolio-aadil-khan`**.
3. In the left navigation menu, go to **Build** > **Hosting**.
4. In the **Domains** section, click the **Add custom domain** button.
5. In the domain field, enter:
   ```
   aadilkhan.xyz
   ```
6. *(Recommended)* Check the box **"Redirect aadilkhan.xyz to an existing website"** or add `www.aadilkhan.xyz` so that visitors typing either `aadilkhan.xyz` or `www.aadilkhan.xyz` reach the exact same site.
7. Click **Continue**.

Firebase will now present you with the specific DNS records you need to insert into Spaceship.

---

## Step 2: Log into Spaceship and Access DNS Management

1. Log into your account at [Spaceship.com](https://www.spaceship.com).
2. From the **Launchpad**, navigate to **Domain List**.
3. Click on your domain: **`aadilkhan.xyz`**.
4. Click on the **DNS** or **Advanced DNS** tab.

> [!IMPORTANT]
> If Spaceship has default "Parking" or placeholder `A` or `CNAME` records pointing to a parking landing page, delete or edit those records so they do not conflict with Firebase.

---

## Step 3: Add DNS Records in Spaceship

Firebase Hosting typically requires **two `A` records** for root domains, and optionally a **`TXT` record** for initial domain ownership verification:

### 1. Root Domain (`aadilkhan.xyz`) `A` Records
Click **Add Record** in Spaceship:

| Type | Host / Name | Value / Points to | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `@` | `199.36.158.100` *(or IP provided by Firebase)* | Automatic / 1800 |
| **A** | `@` | `199.36.158.100` *(or second IP provided by Firebase)* | Automatic / 1800 |

*(Note: Always check the exact IP addresses displayed in your Firebase Console modal, as Firebase assigns them dynamically per region/project).*

### 2. Domain Ownership Verification `TXT` Record *(if prompted by Firebase)*
If Firebase asks you to verify ownership first:

| Type | Host / Name | Value | TTL |
| :--- | :--- | :--- | :--- |
| **TXT** | `@` | `firebase=portfolio-aadil-khan` *(paste exact token)* | Automatic / 1800 |

### 3. Subdomain (`www.aadilkhan.xyz`) CNAME Record *(Optional but Recommended)*
To ensure visitors typing `www.aadilkhan.xyz` reach your portfolio:

| Type | Host / Name | Value / Points to | TTL |
| :--- | :--- | :--- | :--- |
| **CNAME** | `www` | `portfolio-aadil-khan.web.app` | Automatic / 1800 |

Click **Save Records** in Spaceship.

---

## Step 4: Verification and SSL Certificate Provisioning

1. Go back to the **Firebase Console** and click **Verify** or **Finish**.
2. **Status Changes**:
   - **Needs setup / Pending**: DNS records are propagating across worldwide resolvers.
   - **Provisioning SSL**: Firebase is automatically negotiating a free TLS/SSL certificate with Let's Encrypt / Google Trust Services.
   - **Connected**: Your custom domain is fully operational with HTTPS!

> [!NOTE]
> DNS propagation typically takes **5 to 30 minutes**, but can take up to 24 hours depending on TTL. SSL provisioning usually finishes within **15 to 60 minutes** once DNS is detected.

---

## How to Check DNS Propagation from Terminal

You can verify that Spaceship has propagated the records using `dig` or `nslookup`:

```bash
# Check root domain A records
dig +short aadilkhan.xyz

# Check www subdomain CNAME
dig +short www.aadilkhan.xyz
```

Once the output returns Firebase's IP addresses, your domain is active!
