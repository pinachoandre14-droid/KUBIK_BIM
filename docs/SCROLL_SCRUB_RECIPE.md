# Scroll-Scrub Video Animation — Reusable Recipe

How the Ch02 "gemelo digital" animation works, and how to reproduce it with
any other `.mp4`. Reference implementation:
[`src/components/Chapter02.jsx`](../src/components/Chapter02.jsx).

---

## What the effect is

As the user scrolls through a tall section, the page is *pinned* and the video
plays forward/backward in lock-step with scroll position — "scroll scrubbing".
We do **not** let the `<video>` element render itself (that caused stale/black
frames). Instead:

1. The `<video>` is hidden (0×0) and used only as a decode source.
2. Scroll progress `0→1` is mapped to `video.currentTime`.
3. When a seek settles (`'seeked'` event), the decoded frame is drawn to a
   `<canvas>` (cover-fit). If scroll moved on during the seek, it immediately
   re-seeks to chase the latest target — so it never lags behind.

---

## ⚠️ The #1 gotcha: keyframes

`video.currentTime` seeks can **only land on keyframes (I-frames)**. Most
exported mp4s have *one* keyframe at the very start (e.g. the original Ch02 had
**1 keyframe across 609 frames**). Result: every seek snaps to frame 0 and the
scrub "jumps". No amount of JS or longer scroll distance fixes this.

**The fix is in the file, not the code:** re-encode so *every* frame is a
keyframe. Then every scroll position maps to a real, seekable frame.

### 1. Check the source (how bad is it?)

```powershell
$bin = "C:\Users\arqan\ffmpeg-portable\ffmpeg-8.1.1-essentials_build\bin"
$f = & "$bin\ffprobe.exe" -v error -select_streams v:0 -show_entries frame=pict_type -of csv "input.mp4"
"I-frames: $((($f | Where-Object { $_ -match ',I' }).Count)) / $((($f | Measure-Object).Count))"
```

If I-frames ≪ total frames → re-encode.

### 2. Re-encode to all-keyframe

```powershell
& "$bin\ffmpeg.exe" -y -i "input.mp4" -an `
  -c:v libx264 -preset slow -crf 25 `
  -g 1 -keyint_min 1 -x264-params "scenecut=0" `
  -pix_fmt yuv420p -movflags +faststart "output.mp4"
```

- `-g 1` → GOP size 1 = **every frame is an I-frame** (the key flag).
- `-an` → drop audio (scrub video is muted anyway; smaller file).
- `-crf 25` → quality/size knob. Lower = better/larger (try 23 for crisper,
  28 for smaller). Ch02 came out **18.67 MB at 1080p**.
- `-movflags +faststart` → moov atom up front for faster web start.
- To shrink further, downscale: add `-vf scale=1280:-2` (720p).

All-intra is less compression-efficient, so expect the file to grow vs a normal
export — that's the tradeoff for seekability. Keep each file < 100 MB (GitHub
limit). Verify the result has `I-frames == total` with the check above.

> Toolchain note: `ffmpeg`/`ffprobe` and `node`/`npm` are installed as portable
> builds on this machine (paths above / in the Node bin). No admin / winget.

---

## Adding a new scroll-scrub section (code)

`Chapter02.jsx` is the template. To make another one for a different mp4:

1. **Drop the re-encoded mp4** in `public/uploads/...` and point the `<video src>` at it.
2. **Copy the component** (or the `useEffect` scrub engine + the JSX skeleton):
   hidden `<video ref>`, a tall `.seq` track, a sticky `.seq-sticky`, the
   `<canvas ref>`, and (optional) the overlay/legend/progress bar.
3. **Tune the scroll length** via the track height — `style={{ height: '450vh' }}`.
   Longer = finer control / slower playthrough (we've used 450vh–2000vh).
4. The scrub engine is self-contained: it reads scroll position from the
   section, seeks the video, draws to canvas on `'seeked'`, chases the target,
   and is DPR-aware for sharpness. No global wiring needed.

### Key knobs

| Knob | Where | Effect |
|------|-------|--------|
| Track height (`vh`) | `.seq` inline style | How much scrolling plays the clip |
| `crf` | ffmpeg re-encode | Quality vs file size |
| `scale` | ffmpeg `-vf` | Resolution vs file size |
| Overlay content | `.seq-overlay` JSX | Legend / captions / titles per stage |
| Progress bar | `.seq-progress` | Uses `var(--accent-1)` (follows atmosphere) |

### Reuse idea (when ready)

The scrub engine could be extracted into a generic
`<ScrollScrubVideo src height>` component (+ render-prop overlay) so each new
mp4 is a one-liner. Not done yet — say the word and we'll refactor Ch02 to use
it so all future sequences share one implementation.
