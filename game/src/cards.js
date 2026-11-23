"use strict";
/* Ember & Tide — Duel of the Four Winds. Original card battler. */
const ELEMS = {
  ember: { name: "EMBER", glyph: "\u25B2", beats: "gale",  color: "#ff6a3d" },
  tide:  { name: "TIDE",  glyph: "\u25CF", beats: "ember", color: "#4db2ff" },
  gale:  { name: "GALE",  glyph: "\u25C6", beats: "stone", color: "#3ddc84" },
  stone: { name: "STONE", glyph: "\u25A0", beats: "tide",  color: "#f0b429" },
};
const CARD_DEFS = [
  // Ember
  { name: "Cinder Strike", elem: "ember", cost: 1, dmg: 3,  effect: "Deal 3 damage." },
  { name: "Cinder Strike", elem: "ember", cost: 1, dmg: 3,  effect: "Deal 3 damage." },
  { name: "Flame Lash",    elem: "ember", cost: 2, dmg: 5,  effect: "Deal 5 damage." },
  { name: "Inferno",       elem: "ember", cost: 4, dmg: 9,  effect: "Deal 9 damage." },
  { name: "Spark Imp",     elem: "ember", cost: 1, dmg: 2,  effect: "Deal 2 damage. Draw a card.", draw: 1 },
  { name: "Ash Shield",    elem: "ember", cost: 2, dmg: 3,  effect: "Deal 3 damage. Gain 4 shield.", shield: 4 },
  { name: "Phoenix Mend",  elem: "ember", cost: 3, dmg: 4,  effect: "Deal 4 damage. Heal 4.", heal: 4 },
  // Tide
  { name: "Tidal Cut",     elem: "tide", cost: 1, dmg: 3,  effect: "Deal 3 damage." },
  { name: "Tidal Cut",     elem: "tide", cost: 1, dmg: 3,  effect: "Deal 3 damage." },
  { name: "Crashing Wave", elem: "tide", cost: 3, dmg: 7,  effect: "Deal 7 damage." },
  { name: "Healing Rain",  elem: "tide", cost: 2, dmg: 0,  effect: "Heal 6 life.", heal: 6 },
  { name: "Deep Siphon",   elem: "tide", cost: 3, dmg: 5,  effect: "Deal 5 damage. Heal 3.", heal: 3 },
  { name: "Frostbite",     elem: "tide", cost: 2, dmg: 4,  effect: "Deal 4 damage." },
  { name: "Riptide",       elem: "tide", cost: 4, dmg: 8,  effect: "Deal 8 damage. Draw a card.", draw: 1 },
  // Gale
  { name: "Swift Gust",    elem: "gale", cost: 1, dmg: 3,  effect: "Deal 3 damage." },
  { name: "Swift Gust",    elem: "gale", cost: 1, dmg: 3,  effect: "Deal 3 damage." },
  { name: "Cyclone",       elem: "gale", cost: 3, dmg: 6,  effect: "Deal 6 damage. Draw a card.", draw: 1 },
  { name: "Zephyr Mend",   elem: "gale", cost: 2, dmg: 0,  effect: "Heal 5 life.", heal: 5 },
  { name: "Storm Talon",   elem: "gale", cost: 2, dmg: 5,  effect: "Deal 5 damage." },
  { name: "Tailwind",      elem: "gale", cost: 1, dmg: 0,  effect: "Draw 2 cards.", draw: 2 },
  { name: "Tempest",       elem: "gale", cost: 5, dmg: 10, effect: "Deal 10 damage." },
  // Stone
  { name: "Rock Slam",     elem: "stone", cost: 1, dmg: 3,  effect: "Deal 3 damage." },
  { name: "Rock Slam",     elem: "stone", cost: 1, dmg: 3,  effect: "Deal 3 damage." },
  { name: "Bulwark",       elem: "stone", cost: 1, dmg: 0,  effect: "Gain 6 shield.", shield: 6 },
  { name: "Quake",         elem: "stone", cost: 3, dmg: 7,  effect: "Deal 7 damage." },
  { name: "Granite Guard", elem: "stone", cost: 2, dmg: 2,  effect: "Deal 2 damage. Gain 5 shield.", shield: 5 },
  { name: "Mountain Gift", elem: "stone", cost: 2, dmg: 0,  effect: "Heal 4. Gain 4 shield.", heal: 4, shield: 4 },
  { name: "Avalanche",     elem: "stone", cost: 4, dmg: 9,  effect: "Deal 9 damage." },
];
const MAX_HP = 30, MAX_HAND = 7;
