/* ---------- rendering ---------- */
function cardEl(card, playable) {
  const el = ELEMS[card.elem];
  const d = document.createElement("div");
  d.className = "card " + card.elem + (playable === false ? " unplayable" : "");
  d.innerHTML =
    '<div class="cost">' + card.cost + '</div>' +
    '<div class="elem"><span class="glyph">' + el.glyph + '</span><span class="ename">' + el.name + '</span></div>' +
    '<div class="cname">' + card.name + '</div>' +
    '<div class="power">' + (card.dmg > 0 ? card.dmg : "—") + (card.dmg > 0 ? ' <small>DMG</small>' : "") + '</div>' +
    '<div class="effect">' + card.effect + '</div>';
  return d;
}
function render() {
  if (!S) return;
  const set = (id, v) => { document.getElementById(id).textContent = v; };
  document.getElementById("opp-hp-fill").style.width = (S.opp.hp / MAX_HP * 100) + "%";
  document.getElementById("my-hp-fill").style.width = (S.me.hp / MAX_HP * 100) + "%";
  set("opp-hp-num", S.opp.hp + " / " + MAX_HP);
  set("my-hp-num", S.me.hp + " / " + MAX_HP);
  set("opp-shield", S.opp.shield > 0 ? "🛡 " + S.opp.shield : "");
  set("my-shield", S.me.shield > 0 ? "🛡 " + S.me.shield : "");
  set("opp-ward", S.opp.ward ? ELEMS[S.opp.ward].glyph + " " + ELEMS[S.opp.ward].name : "—");
  set("my-ward", S.me.ward ? ELEMS[S.me.ward].glyph + " " + ELEMS[S.me.ward].name : "—");
  set("energy-val", S.me.energy + " / " + S.me.energyMax);
  set("turn-num", S.turn);
  set("deck-num", S.me.deck.length);
  const oh = document.getElementById("opp-hand"); oh.innerHTML = "";
  S.opp.hand.forEach(() => { const b = document.createElement("div"); b.className = "card-back"; b.textContent = "✦"; oh.appendChild(b); });
  const mh = document.getElementById("my-hand"); mh.innerHTML = "";
  S.me.hand.forEach(card => {
    const can = S.phase === "player" && !S.over && card.cost <= S.me.energy;
    const el = cardEl(card, can);
    el.addEventListener("click", () => { if (can) playCard(card, true); });
    mh.appendChild(el);
  });
  document.getElementById("end-turn").disabled = S.phase !== "player" || S.over;
  document.getElementById("end-turn").style.opacity = (S.phase === "player" && !S.over) ? "1" : ".45";
}
function showPlayed(card, byMe) {
  const slot = document.getElementById(byMe ? "my-played" : "opp-played");
  slot.innerHTML = "";
  const el = cardEl(card, true); el.classList.add("played"); slot.appendChild(el);
}
function log(msg) {
  const box = document.getElementById("log");
  const div = document.createElement("div");
  div.textContent = "› " + msg;
  box.prepend(div);
  while (box.children.length > 5) box.removeChild(box.lastChild);
}
function floater(anchorSel, text, color) {
  const anchor = document.querySelector(anchorSel);
  if (!anchor) return;
  const r = anchor.getBoundingClientRect(), app = document.getElementById("app").getBoundingClientRect();
  const f = document.createElement("div");
  f.className = "floater"; f.textContent = text; f.style.color = color;
  f.style.left = (r.left - app.left) + "px"; f.style.top = (r.top - app.top - 10) + "px";
  document.getElementById("app").appendChild(f);
  setTimeout(() => f.remove(), 1200);
}
