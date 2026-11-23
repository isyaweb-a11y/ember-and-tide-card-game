/* ---------- wiring ---------- */
document.getElementById("start-btn").addEventListener("click", () => {
  document.getElementById("title-screen").classList.add("hidden");
  document.getElementById("table").classList.remove("hidden");
  newGame();
});
document.getElementById("end-turn").addEventListener("click", () => {
  if (S.phase !== "player" || S.over) return;
  aiTurn();
});
document.getElementById("again-win").addEventListener("click", resetAll);
document.getElementById("again-lose").addEventListener("click", resetAll);
document.getElementById("restart-btn").addEventListener("click", resetAll);
document.getElementById("sound-toggle").addEventListener("click", (e) => {
  soundOn = !soundOn; e.target.textContent = "Sound: " + (soundOn ? "On" : "Off");
});
function resetAll() {
  document.getElementById("win-screen").classList.add("hidden");
  document.getElementById("lose-screen").classList.add("hidden");
  document.getElementById("table").classList.add("hidden");
  document.getElementById("opp-played").innerHTML = "Opponent's<br>last card";
  document.getElementById("my-played").innerHTML = "Your<br>last card";
  document.getElementById("log").innerHTML = "";
  document.getElementById("title-screen").classList.remove("hidden");
}
/* Debug / play-test hooks: window.__game exposes state; window.__newGame starts a duel. */
window.__game = () => S;
window.__setEnergy = (n) => { S.me.energy = n; S.me.energyMax = n; render(); };
window.__newGame = () => {
  document.getElementById("title-screen").classList.add("hidden");
  document.getElementById("table").classList.remove("hidden");
  newGame();
};
