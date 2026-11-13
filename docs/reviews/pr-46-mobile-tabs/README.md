# PR #46: mobile tabs before and after

The screenshots show the homepage tab bar at the exact CSS viewport widths. The red outline is a capture annotation around the control group.

- URL: `http://127.0.0.1:3106/` (local build of this branch)
- Captured: before `2026-11-13T18:47:24.991Z`; after `2026-11-13T18:47:38.303Z`
- Chrome headless; device scale factor 2 (PNG widths 720, 780, and 828 px)
- The capture harness removed the opening intro overlay to reveal the page below; it did not modify the application content.

| Viewport | Before button widths | After button widths | Document horizontal overflow |
|---:|---|---|---|
| 360 CSS px | 59 / 48 / 116 px | 105 / 105 / 105 px | none before or after |
| 390 CSS px | 59 / 48 / 116 px | 115 / 115 / 115 px | none before or after |
| 414 CSS px | 59 / 48 / 116 px | 123 / 123 / 123 px | none before or after |

## 360 px

| Before | After |
|---|---|
| ![Before at 360 CSS px](before-360.png) | ![After at 360 CSS px](after-360.png) |

## 390 px

| Before | After |
|---|---|
| ![Before at 390 CSS px](before-390.png) | ![After at 390 CSS px](after-390.png) |

## 414 px

| Before | After |
|---|---|
| ![Before at 414 CSS px](before-414.png) | ![After at 414 CSS px](after-414.png) |

Raw layout measurements: `before-layout.json` and `after-layout.json`.
