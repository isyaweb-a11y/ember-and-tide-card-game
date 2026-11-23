/* ---------- audio (tiny synth, no files) ---------- */
function tone(freq, dur, type, vol) {
  if (!soundOn) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const o = audioCtx.createOscillator(), g = audioCtx.createGain();
    o.type = type || "sine"; o.frequency.value = freq;
    g.gain.setValueAtTime(vol || 0.08, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
    o.connect(g); g.connect(audioCtx.destination);
    o.start(); o.stop(audioCtx.currentTime + dur);
  } catch (e) { /* audio unavailable */ }
}
function blip(freq) { tone(freq, 0.12, "triangle", 0.07); }
function fanfare(win) {
  if (win) { [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => tone(f, 0.35, "triangle", 0.1), i * 140)); }
  else { [330, 262, 196].forEach((f, i) => setTimeout(() => tone(f, 0.4, "sawtooth", 0.05), i * 180)); }
}
