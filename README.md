# Wild Lirt Studio v2

"bots that live where u chat"

Simplified single-bot rebuild: the whole site + Necta run as **one process,
one Render service** - no proxy, no child processes, no port-waiting logic.
Necta's own Express server now also serves the website directly from
`public/`.

## Structure

```
wild-lirt-studio-v2/
  public/index.html   <- the whole site
  index.js             <- Necta's bot logic + API routes (unchanged core)
  server.js            <- serves public/ AND mounts Necta's routes
  config.js, helpers.js
  package.json
```

## What's fixed vs. the original upload

1. Removed `denethdev-ytmp3` from `REQUIRED_MODULES` in `index.js` - it's
   not a real npm package, and having it in that list made the batched
   `npm install` fail for ALL missing modules together, not just that one.
2. Baileys pinned to `7.0.0-rc10` - the old `^6.7.9` had a documented
   pairing-code bug (code generates, WhatsApp never confirms the link).
3. `@octokit/rest`, `ruhend-scraper`, `yt-dlp-exec` added as real
   `package.json` dependencies instead of being installed at runtime.
4. `server.js` no longer wipes the session folder on exit.
5. Both pairing-code and QR linking are wired to real endpoints:
   `POST /pair` (code) and `GET /pair-qr` (QR, returns a PNG image
   directly). The website's pairing modal lets the user pick either.

## Deploy (Render)

Build command: npm install
Start command: npm start

Set environment variables in Render's dashboard (see .env.example for the
full list) - most are optional and features degrade gracefully without them.

## Note on the other bots

ProCoder X and Wild Lirt are shown as "coming soon" on the site for this
relaunch - they aren't touched by this repo. ProCoder X stays on its own
separate Render service from before.
