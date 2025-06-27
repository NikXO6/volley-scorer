# Volleyball Scorer

This is a simple dual screen volleyball scoring web app. One page acts as the
control screen and another page is the public scoreboard display.

## Running

Serve the `public` folder using any static web server. For example:

```bash
python3 -m http.server 8000
```

Open the following URLs on different monitors:

- `http://localhost:8000/public/control.html` – control interface
- `http://localhost:8000/public/display.html` – public scoreboard

Both pages communicate using the browser `BroadcastChannel` API, so they must be
opened from the same origin.

## Features

- Editable team names and scores
- Start/pause/reset main timer
- Configurable timeout length with countdowns
- iOS-inspired design suitable for dual monitors
