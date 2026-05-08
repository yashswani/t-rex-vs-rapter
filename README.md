# T-Rex vs Rapter

A fast, browser-based arcade game where a hungry T-Rex chomps incoming raptors, builds streaks, and unleashes a roar-powered special attack.

This project is a lightweight HTML/CSS/JavaScript game with no build step and no external framework dependencies. Open it, hit start, and survive the stampede.

## Table of Contents

- [Game Overview](#game-overview)
- [Gameplay](#gameplay)
- [Controls](#controls)
- [Core Mechanics](#core-mechanics)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Customization Guide](#customization-guide)
- [Troubleshooting](#troubleshooting)
- [Performance Notes](#performance-notes)
- [Known Limitations](#known-limitations)
- [Roadmap Ideas](#roadmap-ideas)
- [Credits](#credits)
- [License](#license)

## Game Overview

**T-Rex vs Rapter** is a single-player reflex game:

- Raptors spawn from the right side of the screen and rush toward the T-Rex.
- You move vertically to line up attacks.
- A successful chomp removes a raptor and increases your score.
- Missing raptors costs lives.
- Every 10 successful chomps unlocks a special roar that repels all active raptors.

The pacing gradually escalates as both spawn frequency and enemy speed increase over time.

## Gameplay

1. Click **Start Game**.
2. Move the T-Rex up/down to align with incoming raptors.
3. Press **Space** to chomp when a raptor overlaps your hit area.
4. Build your chomp count.
5. Use **Enter** when the special attack is ready to reverse all active raptors.
6. Survive as long as possible before lives reach zero.

### Win/Lose Conditions

- There is no hard win state; this is an endless high-score survival game.
- Game ends when all lives are lost.

## Controls

- `ArrowUp`: Move T-Rex up
- `ArrowDown`: Move T-Rex down
- `Space`: Chomp attack
- `Enter`: Trigger special attack (only when ready)

## Core Mechanics

### Scoring

- Each successful chomp grants **+1 score**.

### Lives

- You start with **3 lives**.
- A life is lost when a raptor crosses the left side without being chomped.

### Difficulty Scaling

During each game loop tick:

- Base raptor speed increases gradually.
- Spawn probability increases gradually.

This creates a smooth but relentless difficulty curve.

### Special Attack

- A special attack unlocks every **10 chomps**.
- When activated, all active raptors reverse direction and visually flip.
- Special status resets after use.

## Tech Stack

- **HTML5** for game container and UI overlays
- **CSS3** for layout, sprite sizing, and HUD/screen styling
- **Vanilla JavaScript** for game loop, input handling, collision checks, and state management

No bundler, package manager, or framework required.

## Project Structure

```text
.
├── index.html      # Main game markup and UI screens
├── style.css       # Styling for world, HUD, overlays, and controls
├── scripts.js      # Game logic, loop, entities, and interactions
└── README.md       # Project documentation
```

## Getting Started

### Option 1: Open Directly

1. Clone or download this repository.
2. Open `index.html` in a modern browser.

### Option 2: Run a Local Static Server (Recommended)

Using Python:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

Why this is recommended:

- Better consistency with browser media/loading behavior
- Easier path for future asset and API extensions

## Customization Guide

Quick tweaks you can make in `scripts.js`:

- `raptorSpawnRate`: Initial spawn chance per tick
- `raptorBaseSpeed`: Initial enemy speed baseline
- `lives`: Starting player lives (set in `startGame()`)
- Special trigger threshold: currently `chompCounter % 10 === 0`

Visual tuning in `style.css`:

- `#trex` and `.game-char` dimensions for character sizing
- HUD typography/colors in `#ui-container`
- Overlay look in `#start-screen` and `#game-over-screen`

Asset URLs in `scripts.js`:

- `backgroundImgUrl`
- `trexImgUrl`
- `raptorImgUrl`
- Roar SFX file in `triggerSpecialAttack()`

## Troubleshooting

### Audio does not play on special attack

Some browsers restrict autoplay/audio until user interaction. Start the game with the button first, then trigger the special.

### Sprites not visible

- Check network access to external sprite URLs.
- If a CDN/source is unavailable, replace URLs with local assets.

### Controls feel unresponsive

- Ensure the browser tab is focused.
- Confirm no extension is intercepting key inputs.

## Performance Notes

- The game runs on a `setInterval` loop at approximately 60 FPS.
- Active raptors are managed in an array and removed when off-screen.
- Collision detection uses axis-aligned bounding boxes via `getBoundingClientRect()`.

For larger-scale versions, consider `requestAnimationFrame`, object pooling, and decoupled physics timing.

## Known Limitations

- Uses viewport dimensions directly (`window.innerWidth/innerHeight`), which may differ from container bounds on unusual layouts.
- Collision includes full bounding rectangles, not pixel-perfect hit masks.
- External image links can break if source hosts change.

## Roadmap Ideas

- Pause/resume support
- Touch/mobile controls
- Persistent local high-score leaderboard
- Multiple enemy types and boss waves
- Particle and hit-feedback effects
- Sound/music settings panel

## Credits

- Game concept and implementation: repository contributors
- Sprite/background assets: external URLs referenced directly in code
- Roar audio: local MP3 file included in this repository

If you plan to publish commercially, replace all third-party assets with licensed originals.

## License

No license file is currently provided.

If this project is intended for open-source distribution, add a `LICENSE` file (for example, MIT, Apache-2.0, or GPL-3.0) and update this section accordingly.
