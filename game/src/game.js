let S = null; // game state
let soundOn = true, audioCtx = null;

function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function buildDeck() { return shuffle(CARD_DEFS.map((c, i) => ({ ...c, uid: i + "-" + Math.random().toString(36).slice(2, 7) }))); }

function newGame() {
  S = {
    turn: 1, phase: "player", over: false,
    me:  { hp: MAX_HP, shield: 0, deck: buildDeck(), hand: [], discard: [], ward: null, dmgDealt: 0, cardsPlayed: 0 },
    opp: { hp: MAX_HP, shield: 0, deck: buildDeck(), hand: [], discard: [], ward: null },
  };
  for (let i = 0; i < 4; i++) { drawCard(S.me); drawCard(S.opp); }
  S.me.energy = S.me.energyMax = 3;
  log("The duel begins. You hold 4 cards, 3 energy.");
  log("Tip: play the element that beats the Warden's ward for +2 damage.");
  render();
}
function drawCard(p) {
  if (p.deck.length === 0) { p.deck = shuffle(p.discard); p.discard = []; if (p.deck.length === 0) return; }
  if (p.hand.length >= MAX_HAND) return;
  p.hand.push(p.deck.pop());
}
function startTurn() {
  S.turn++;
  S.me.energyMax = Math.min(2 + S.turn, 10);
  S.me.energy = S.me.energyMax;
  drawCard(S.me);
  S.phase = "player";
  log("Turn " + S.turn + " — you draw a card, energy refills to " + S.me.energyMax + ".");
  render();
}
function advantage(elem, wardElem) { return wardElem && ELEMS[elem].beats === wardElem; }
function dealDamage(target, amount, source) {
  let remaining = amount;
  if (target.shield > 0) { const absorbed = Math.min(target.shield, remaining); target.shield -= absorbed; remaining -= absorbed; }
  target.hp = Math.max(0, target.hp - remaining);
  return amount;
}
function playCard(card, byMe) {
  const actor = byMe ? S.me : S.opp, foe = byMe ? S.opp : S.me;
  const idx = actor.hand.findIndex(c => c.uid === card.uid);
  if (idx < 0) return false;
  if (byMe) { if (card.cost > S.me.energy) return false; S.me.energy -= card.cost; }
  actor.hand.splice(idx, 1);
  actor.discard.push(card);
  actor.cardsPlayed = (actor.cardsPlayed || 0) + 1;
  let dmg = card.dmg;
  const adv = advantage(card.elem, foe.ward);
  if (adv) dmg += 2;
  if (dmg > 0) {
    dealDamage(foe, dmg, actor);
    if (byMe) S.me.dmgDealt += dmg;
    floater(foe === S.opp ? "#opp-hp-num" : "#my-hp-num", "-" + dmg, "#ff6a5e");
    blip(dmg >= 8 ? 520 : 330);
  }
  if (card.shield) { actor.shield += card.shield; floater(byMe ? "#my-hp-num" : "#opp-hp-num", "+" + card.shield + " shield", "#8fd3ff"); }
  if (card.heal) { actor.hp = Math.min(MAX_HP, actor.hp + card.heal); floater(byMe ? "#my-hp-num" : "#opp-hp-num", "+" + card.heal, "#7ee2a8"); }
  if (card.draw) { for (let i = 0; i < card.draw; i++) drawCard(actor); }
  actor.ward = card.elem;
  const who = byMe ? "You play" : "Warden plays";
  log(who + " " + card.name + (dmg > 0 ? " — " + dmg + " damage" + (adv ? " (elemental +2!)" : "") : "") +
      (card.shield ? " · +" + card.shield + " shield" : "") + (card.heal ? " · heals " + card.heal : "") +
      (card.draw ? " · draws " + card.draw : "") + ".");
  showPlayed(card, byMe);
  render();
  if (foe.hp <= 0) return endGame(byMe);
  return true;
}
function aiTurn() {
  S.phase = "ai";
  render();
  const opp = S.opp;
  let energy = Math.min(2 + S.turn, 10);
  log("The Warden takes the table…");
  let delay = 650;
  const playable = () => opp.hand.filter(c => c.cost <= energy)
    .sort((a, b) => (b.dmg + (b.heal || 0) + (b.shield || 0)) - (a.dmg + (a.heal || 0) + (a.shield || 0)));
  const step = () => {
    if (S.over) return;
    const opts = playable();
    if (opts.length === 0 || Math.random() < 0.12) {
      drawCard(opp);
      setTimeout(() => { if (!S.over) startTurn(); }, 500);
      return;
    }
    const pick = opts[0];
    energy -= pick.cost;
    playCard(pick, false);
    if (S.over) return;
    delay = 750;
    setTimeout(step, delay);
  };
  setTimeout(step, delay);
}
function endGame(playerWon) {
  S.over = true;
  S.phase = "over";
  if (playerWon) {
    document.getElementById("win-turns").textContent = S.turn;
    document.getElementById("win-dmg").textContent = S.me.dmgDealt;
    document.getElementById("win-cards").textContent = S.me.cardsPlayed;
    document.getElementById("win-hp").textContent = S.me.hp;
    document.getElementById("win-screen").classList.remove("hidden");
    fanfare(true);
    log("Victory! The Warden falls.");
  } else {
    document.getElementById("lose-turns").textContent = S.turn;
    document.getElementById("lose-dmg").textContent = S.me.dmgDealt;
    document.getElementById("lose-cards").textContent = S.me.cardsPlayed;
    document.getElementById("lose-hp").textContent = S.opp.hp;
    document.getElementById("lose-screen").classList.remove("hidden");
    fanfare(false);
    log("Defeat. The Warden stands.");
  }
  render();
}
