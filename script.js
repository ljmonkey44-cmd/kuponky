// =====================================================================
// KONFIGURACE: Sem si vlož svůj přístupový klíč z Web3Forms.com
// (Zdarma se zaregistruješ na https://web3forms.com a klíč zkopíruješ.)
// =====================================================================
const WEB3FORMS_ACCESS_KEY = "11b0aa14-f5a6-4436-a91d-987c0c79f79f";

// Klíč, pod kterým se stav kuponů ukládá do LocalStorage prohlížeče
const STORAGE_KEY = "laskyplne_kupony_stav";

// Za jak dlouho se uplatněný kupon sám znovu aktivuje (1 měsíc = 30 dní)
const COOLDOWN_MS = 30 * 24 * 60 * 60 * 1000;

// =====================================================================
// DATA KUPONŮ – uprav / přidávej kupony přímo tady
// Každý kupon má unikátní "id", které se používá pro ukládání stavu
// =====================================================================
const coupons = [
  {
    id: "masaz",
    emoji: "💆‍♀️",
    title: "Božská masáž",
    desc: "30 minut profi masáže zad nebo nohou s vonným olejem a relaxační hudbou."
  },
  {
    id: "snidane",
    emoji: "🍳",
    title: "Snídaně do postele",
    desc: "Objednej si cokoliv od palačinek po vajíčka, donáška až pod peřinu s čerstvým čajem."
  },
  {
    id: "nadobi",
    emoji: "🧼",
    title: "Generální stopka nádobí",
    desc: "Dneska neumyješ ani lžičku. Beru to komplet na sebe, ty nohy nahoru!"
  },
  {
    id: "vylet",
    emoji: "🚗",
    title: "Útěk za dobrodružstvím",
    desc: "Sbal si věci, jedeme na tajný výlet. Cíl cesty, svačinu i program zařizuji já."
  },
  {
    id: "hadka",
    emoji: "🏳️",
    title: "Okamžité vítězství v hádce",
    desc: "Použij v případě nouze. Okamžitě uznávám tvou pravdu bez jakýchkoliv řečí."
  },
  {
    id: "masaz",
    emoji: "💆‍♀️",
    title: "Božská masáž",
    desc: "30 minut profi masáže zad nebo nohou s vonným olejem a relaxační hudbou."[cite: 2]
  },
  {
    id: "snidane",
    emoji: "🍳",
    title: "Snídaně do postele",
    desc: "Objednej si cokoliv od palačinek po vajíčka, donáška až pod peřinu s čerstvým čajem."[cite: 2]
  },
  {
    id: "nadobi",
    emoji: "🧼",
    title: "Generální stopka nádobí",
    desc: "Dneska neumyješ ani lžičku. Beru to komplet na sebe, ty nohy nahoru!"[cite: 2]
  },
  {
    id: "vylet",
    emoji: "🚗",
    title: "Útěk za dobrodružstvím",
    desc: "Sbal si věci, jedeme na tajný výlet. Cíl cesty, svačinu i program zařizuji já."[cite: 2]
  },
  {
    id: "hadka",
    emoji: "🏳️",
    title: "Okamžité vítězství v hádce",
    desc: "Použij v případě nouze. Okamžitě uznávám tvou pravdu bez jakýchkoliv řečí."[cite: 2]
  },
  {
    id: "dovoz",
    emoji: "🚗",
    title: "Dovoz až k domu",
    desc: "Nemusíš jet autobusem ani vlakem. Dnes funguji jako tvůj osobní řidič a vyzvednu tě (nebo tě odvezu) přímo před tvým domem."
  },
  {
    id: "prespavacka",
    emoji: "🏠",
    title: "Exkluzivní přespávačka u mě",
    desc: "Můj pokoj/byt je dnes celý tvůj. Slibuji perfektně ustlanou postel, tvůj oblíbený čaj a stoprocentní pohodlí."
  },
  {
    id: "spani_u_tebe",
    emoji: "🌙",
    title: "Dnes spím u tebe",
    desc: "Uplatni, pokud chceš moji společnost na noc u tebe doma. Sbalím se rychlostí blesku a jedu za tebou."
  },
  {
    id: "pravidla",
    emoji: "👑",
    title: "Celý den podle tvých pravidel",
    desc: "Od rána do večera dělám přesně to, co chceš ty. Výběr jídla, aktivit i místa je čistě ve tvé režii."
  },
  {
    id: "rande",
    emoji: "✨",
    title: "Rande s překvapením",
    desc: "Naplánuji pro nás kompletní rande od A do Z. Ty se jen hezky oblečeš a o nic se nestaráš."
  },
  {
    id: "unos",
    emoji: "🛸",
    title: "Únos ze stereotypu",
    desc: "Tento kupon tě okamžitě zachrání z nudného dne. Přijedu, 'unesu' tě ven a vymyslím super program."
  },
  {
    id: "film",
    emoji: "💻",
    title: "Virtuální filmový večer",
    desc: "I když jsme každý jinde, dáme si společný film. Synchronizovaně pustíme film, uděláme si popcorn a budeme na telefonu/FaceTimu."
  },
  {
    id: "donaska",
    emoji: "🍔",
    title: "Donáška jídla na dálku",
    desc: "Máš hlad nebo špatný den a nejsme spolu? Aktivuj kupon a já ti domů objednám a zaplatím tvoje nejoblíbenější jídlo."
  },
  {
    id: "piknik",
    emoji: "🧺",
    title: "Piknik pod hvězdami",
    desc: "Sbalím deku, nějaké dobré pití, drobné zobání a vyrazíme na romantické místo sledovat západ slunce nebo hvězdy."
  },
  {
    id: "masaz_kamkoliv",
    emoji: "🕯️",
    title: "Masáž na přání (kdekoliv)",
    desc: "Platí kdekoli – ať už u mě, nebo u tebe. Přivezu si vlastní vonný olej a postarám se o tvůj relax."
  }
];

// =====================================================================
// POMOCNÉ FUNKCE PRO PRÁCI S LOCALSTORAGE
// Stav kuponu ukládáme jako { [id]: <timestamp uplatnění v ms> }
// =====================================================================

function loadUsedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveUsedState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

let usedState = loadUsedState();

// =====================================================================
// ČASOVÉ POMOCNÉ FUNKCE
// =====================================================================

// Vrátí true, pokud už uplynul měsíc od uplatnění a kupon se má obnovit
function isCooldownOver(redeemedAt) {
  return Date.now() - redeemedAt >= COOLDOWN_MS;
}

// Naformátuje zbývající čas na "12d 04h 33m 10s"
function formatRemaining(ms) {
  if (ms <= 0) return "0d 00h 00m 00s";
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return `${days}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
}

// =====================================================================
// VYKRESLENÍ KUPONŮ DO STRÁNKY
// =====================================================================
const grid = document.getElementById("couponGrid");

function renderCoupons() {
  grid.innerHTML = "";

  coupons.forEach((coupon) => {
    const redeemedAt = usedState[coupon.id];
    const isUsed = !!redeemedAt;

    const card = document.createElement("div");
    card.className = "coupon" + (isUsed ? " used" : "");
    card.dataset.id = coupon.id;

    let cooldownHtml = "";
    if (isUsed) {
      cooldownHtml = `
        <div class="cooldown-box">
          <span class="cooldown-label">Obnoví se za:</span>
          <div class="cooldown-bar-track">
            <div class="cooldown-bar-fill" data-timer-bar></div>
          </div>
          <span class="cooldown-time" data-timer-text></span>
        </div>
      `;
    }

    card.innerHTML = `
      <div class="coupon-icon">${coupon.emoji}</div>
      <div class="coupon-title">${coupon.title}</div>
      <div class="coupon-desc">${coupon.desc}</div>
      ${cooldownHtml}
      <button class="redeem-btn" ${isUsed ? "disabled" : ""}>
        ${isUsed ? "Uplatněno" : "Uplatnit kupon"}
      </button>
    `;

    const btn = card.querySelector(".redeem-btn");
    if (!isUsed) {
      btn.addEventListener("click", () => openConfirmModal(coupon));
    }

    grid.appendChild(card);
  });

  updateAllTimers();
}

// Projde všechny "used" karty a aktualizuje progress bar + zbývající čas.
// Pokud už kooldown vypršel, kupon rovnou vrátí do aktivního stavu.
function updateAllTimers() {
  let needsFullRerender = false;

  document.querySelectorAll(".coupon.used").forEach((card) => {
    const id = card.dataset.id;
    const redeemedAt = usedState[id];
    if (!redeemedAt) return;

    if (isCooldownOver(redeemedAt)) {
      // Měsíc uplynul -> kupon se sám aktivuje
      delete usedState[id];
      saveUsedState(usedState);
      needsFullRerender = true;
      return;
    }

    const elapsed = Date.now() - redeemedAt;
    const remaining = COOLDOWN_MS - elapsed;
    const percent = Math.min(100, (elapsed / COOLDOWN_MS) * 100);

    const bar = card.querySelector("[data-timer-bar]");
    const text = card.querySelector("[data-timer-text]");
    if (bar) bar.style.width = percent + "%";
    if (text) text.textContent = formatRemaining(remaining);
  });

  if (needsFullRerender) {
    renderCoupons();
  }
}

// Aktualizace časovačů každou sekundu
setInterval(updateAllTimers, 1000);

// =====================================================================
// POTVRZOVACÍ MODÁLNÍ OKNO PŘED UPLATNĚNÍM KUPONU
// =====================================================================
const modalOverlay = document.getElementById("modalOverlay");
const modalIcon = document.getElementById("modalIcon");
const modalDesc = document.getElementById("modalDesc");
const modalCancel = document.getElementById("modalCancel");
const modalConfirm = document.getElementById("modalConfirm");

let pendingCoupon = null;

function openConfirmModal(coupon) {
  pendingCoupon = coupon;
  modalIcon.textContent = coupon.emoji;
  modalDesc.textContent = `„${coupon.title}“ – jakmile potvrdíš, kupon se na měsíc uloží k odpočinku a pak se sám obnoví.`;
  modalOverlay.classList.add("visible");
}

function closeConfirmModal() {
  modalOverlay.classList.remove("visible");
  pendingCoupon = null;
}

modalCancel.addEventListener("click", closeConfirmModal);

// Zavření kliknutím mimo okno
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeConfirmModal();
});

modalConfirm.addEventListener("click", () => {
  if (!pendingCoupon) return;
  const coupon = pendingCoupon;
  closeConfirmModal();

  const card = grid.querySelector(`.coupon[data-id="${coupon.id}"]`);
  const btn = card ? card.querySelector(".redeem-btn") : null;
  redeemCoupon(coupon, card, btn);
});

// =====================================================================
// ODESLÁNÍ E-MAILU PŘES WEB3FORMS PŘI UPLATNĚNÍ KUPONU
// =====================================================================
async function sendRedeemNotification(coupon) {
  const payload = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: `Kupon uplatněn: ${coupon.title}`,
    message: `Tvoje přítelkyně právě uplatnila kupon "${coupon.title}" (${coupon.emoji}). Kupon se automaticky obnoví za 30 dní.`
  };

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(payload)
  });

  return response.ok;
}

// =====================================================================
// OSLAVNÁ ANIMACE - DÉŠŤ KONFET PŘES CELOU OBRAZOVKU
// =====================================================================
function launchConfetti() {
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 },
    colors: ["#ff8fa3", "#ffc7d2", "#ffe1e6", "#e26e85", "#ffffff"]
  });
}

// =====================================================================
// HLAVNÍ LOGIKA UPLATNĚNÍ KUPONU (volá se až PO potvrzení v modálním okně)
// =====================================================================
async function redeemCoupon(coupon, card, btn) {
  if (btn) {
    btn.disabled = true;
    btn.textContent = "Odesílám...";
  }

  try {
    await sendRedeemNotification(coupon);
  } catch (err) {
    // I když e-mail selže (např. klíč ještě není nastavený),
    // kupon se přesto označí jako uplatněný, aby zážitek nebyl narušen.
    console.warn("Odeslání e-mailu se nepodařilo:", err);
  }

  // Uložíme čas uplatnění do LocalStorage, aby zůstal i po zavření prohlížeče
  usedState[coupon.id] = Date.now();
  saveUsedState(usedState);

  // Znovu vykreslíme kupony, aby se zobrazil odpočet
  renderCoupons();

  // Odpálíme konfety na oslavu 🎉
  launchConfetti();
}

// Prvotní vykreslení stránky
renderCoupons();
