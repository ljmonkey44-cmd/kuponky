// =====================================================================
// KONFIGURACE: Sem vlož svůj přístupový klíč z Web3Forms.com
// =====================================================================
const WEB3FORMS_ACCESS_KEY = "11b0aa14-f5a6-4436-a91d-987c0c79f79f";

const STORAGE_KEY = "laskyplne_kupony_stav";
const COOLDOWN_MS = 30 * 24 * 60 * 60 * 1000; // 30 dní

// Definice kategorií pro přehlednost
const categories = {
  pohoda: { title: "Pohoda & Rozmazlování", class: "cat-pohoda" },
  gastro: { title: "Gastro & Dobré jídlo", class: "cat-gastro" },
  logistika: { title: "Společný čas & Návštěvy", class: "cat-logistika" },
  rande: { title: "Zážitky & Společné rande", class: "cat-rande" },
  radosti: { title: "Drobné radosti & Úlevy", class: "cat-radosti" }
};

// =====================================================================
// DATA KUPONŮ (Celkem 27 kuponů roztříděných do kategorií)
// =====================================================================
const coupons = [
  // --- POHODA & ROZMAZLOVÁNÍ ---
  {
    id: "masaz",
    category: "pohoda",
    emoji: "💆‍♀️",
    title: "Božská masáž",
    desc: "30 minut profi masáže zad nebo nohou s vonným olejem a relaxační hudbou."
  },
  {
    id: "masaz_kamkoliv",
    category: "pohoda",
    emoji: "🕯️",
    title: "Masáž na přání",
    desc: "Platí kdekoli – u mě, nebo u tebe. Přivezu si vlastní vonný olej a postarám se o tvůj relax."
  },
  {
    id: "spanek",
    category: "pohoda",
    emoji: "😴",
    title: "Sladký spánek",
    desc: "Dneska mě nečeká žádné ponocování. Půjdeme spát brzy, budeme se tulit a pořádně se vyspíme dorůžova."
  },
  {
    id: "spatna_nalada",
    category: "pohoda",
    emoji: "🩹",
    title: "Záchrana špatné nálady",
    desc: "Cítíš se pod psa? Aktivuj kupon. Okamžitě volám, píšu, posílám vtipná videa nebo vezu čokoládu."
  },
  {
    id: "sex",
    category: "pohoda",
    emoji: "🔥",
    title: "Vášnivý sex",
    desc: "Dneska hodíme starosti za hlavu. Slibuji večer plný vášně, svíček a maximálního soustředění jen na tvé touhy."
  },
  {
    id: "masaz_pro_nej",
    category: "pohoda",
    emoji: "💆‍♂️",
    title: "Hýčkání pro něj",
    desc: "Dneska se role obrací. Svíčky zapálím já, olej si připravím já a ty si budeš užívat masáž ode mě."
  },

  // --- GASTRO & JÍDLO ---
  {
    id: "snidane",
    category: "gastro",
    emoji: "🍳",
    title: "Snídaně do postele",
    desc: "Objednej si cokoliv od palačinek po vajíčka, donáška až pod peřinu s čerstvým čajem."
  },
  {
    id: "donaska",
    category: "gastro",
    emoji: "🍔",
    title: "Donáška jídla na dálku",
    desc: "Máš hlad nebo špatný den a nejsme spolu? Aktivuj kupon a já ti domů objednám tvé oblíbené jídlo."
  },
  {
    id: "sushi",
    category: "gastro",
    emoji: "🍣",
    title: "Gastro večer u mě",
    desc: "Přijď ke mně na degustační večer. Připravím tvoje nejoblíbenější dobroty (nebo objednám sushi) a zapálím svíčky."
  },

  // --- CESTOVÁNÍ & NÁVŠTĚVY ---
  {
    id: "dovoz",
    category: "logistika",
    emoji: "🚗",
    title: "Dovoz až k domu",
    desc: "Nemusíš jet autobusem ani vlakem. Vyzvednu tě nebo odvezu autem přímo před tvůj dům."
  },
  {
    id: "prespavacka",
    category: "logistika",
    emoji: "🏠",
    title: "Přespávačka u mě",
    desc: "Můj pokoj/byt je dnes celý tvůj. Slibuji perfektně ustlanou postel, tvůj oblíbený čaj a stoprocentní pohodlí."
  },
  {
    id: "spani_u_tebe",
    category: "logistika",
    emoji: "🌙",
    title: "Dnes spím u tebe",
    desc: "Chceš moji společnost na noc u tebe doma? Sbalím se rychlostí blesku a jedu za tebou."
  },
  {
    id: "pomoc",
    category: "logistika",
    emoji: "🛠️",
    title: "Pomocná ruka doma",
    desc: "Potřebuješ s něčím pomoct doma, přestěhovat těžkou krabici nebo něco opravit? Beru nářadí a jedu."
  },
  {
    id: "videohovor",
    category: "logistika",
    emoji: "📱",
    title: "Noční videohovor",
    desc: "I když jsme od sebe daleko, uděláme si online rande přes kameru a budeme u hovoru klidně i usínat."
  },

  // --- SPOLEČNÉ ZÁŽITKY ---
  {
    id: "vylet",
    category: "rande",
    emoji: "🗺️",
    title: "Útěk za dobrodružstvím",
    desc: "Sbal si věci, jedeme na tajný výlet. Cíl cesty, svačinu i program zařizuji já."
  },
  {
    id: "rande",
    category: "rande",
    emoji: "✨",
    title: "Rande s překvapením",
    desc: "Naplánuji pro nás kompletní rande od A do Z. Ty se jen hezky oblečeš a o nic se nestaráš."
  },
  {
    id: "unos",
    category: "rande",
    emoji: "🛸",
    title: "Únos ze stereotypu",
    desc: "Tento kupon tě okamžitě zachrání z nudného dne. Přijedu, unesu tě ven a vymyslím super program."
  },
  {
    id: "piknik",
    category: "rande",
    emoji: "🧺",
    title: "Piknik pod hvězdami",
    desc: "Sbalím deku, dobré pití, drobné zobání a vyrazíme na romantické místo sledovat západ slunce."
  },
  {
    id: "film",
    category: "rande",
    emoji: "💻",
    title: "Virtuální filmový večer",
    desc: "Dáme si společný film na dálku. Synchronizovaně ho pustíme, uděláme popcorn a budeme na FaceTimu."
  },
  {
    id: "nakupy",
    category: "rande",
    emoji: "🛍️",
    title: "Společný nákupní den",
    desc: "Půjdu s tebou nakupovat, budu ti nosit věci do kabinky, hodnotit outfity a na konci tě pozvu na kávu."
  },

  // --- DROBNÉ RADOSTI & ÚLEVY ---
  {
    id: "nadobi",
    category: "radosti",
    emoji: "🧼",
    title: "Generální stopka nádobí",
    desc: "Dneska neumyješ ani lžičku. Beru to komplet na sebe, ty nohy nahoru!"
  },
  {
    id: "hadka",
    category: "radosti",
    emoji: "🏳️",
    title: "Vítězství v hádce",
    desc: "Použij v případě nouze. Okamžitě uznávám tvou pravdu bez jakýchkoliv řečí."
  },
  {
    id: "pravidla",
    category: "radosti",
    emoji: "👑",
    title: "Den podle tvých pravidel",
    desc: "Od rána do večera dělám přesně to, co chceš ty. Výběr jídla i aktivit je čistě ve tvé režii."
  },
  {
    id: "usmireni",
    category: "radosti",
    emoji: "🤝",
    title: "Jízdenka na usmíření",
    desc: "Platí po jakékoliv neshodě. Bez řečí měníme téma, pevně se obejmeme a jdeme dál s čistým štítem."
  },
  {
    id: "kvetiny",
    category: "radosti",
    emoji: "💐",
    title: "Donáška květin",
    desc: "Chceš si udělat hezčí den nebo vyzdobit pokoj? Do 24 hodin ti doručím krásnou kytici."
  },
  {
    id: "kluci",
    category: "radosti",
    emoji: "🍺",
    title: "Jeho večer s klukama",
    desc: "Dneska má tvůj kluk absolutní volno na pivo nebo online hry. Žádné zprávy – jen jeho chlapský čas."
  },
  {
    id: "hobby",
    category: "radosti",
    emoji: "🎮",
    title: "Jeho herní / hobby den",
    desc: "Dnes ho necháš nerušeně hrát hry na PC/konzoli tak dlouho, jak chce. A ještě mu k tomu přineseš sváču."
  }
];

// =====================================================================
// POMOCNÉ FUNKCE PRO STAV A ČASOVAČE
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

function isCooldownOver(redeemedAt) {
  return Date.now() - redeemedAt >= COOLDOWN_MS;
}

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
// DYNAMICKÉ VYKRESLENÍ KATEGORIÍ A KUPONŮ
// =====================================================================
const container = document.getElementById("categoriesContainer");

function renderCoupons() {
  container.innerHTML = "";

  // Projdeme všechny definované kategorie
  Object.keys(categories).forEach((catKey) => {
    const catInfo = categories[catKey];
    
    // Filtrujeme kupony, které do této kategorie patří
    const catCoupons = coupons.filter(c => c.category === catKey);
    if (catCoupons.length === 0) return;

    // Vytvoříme sekci kategorie
    const section = document.createElement("section");
    section.className = "category-section";

    // Vytvoříme nadpis sekce
    const heading = document.createElement("h2");
    heading.className = "category-title";
    heading.textContent = catInfo.title;
    section.appendChild(heading);

    // Vytvoříme mřížku pro kupony
    const grid = document.createElement("div");
    grid.className = "coupon-grid";

    // Vložíme kupony do mřížky
    catCoupons.forEach((coupon) => {
      const redeemedAt = usedState[coupon.id];
      const isUsed = !!redeemedAt;

      const card = document.createElement("div");
      // Přidáme základní třídu + třídu pro specifickou barvu kategorie
      card.className = `coupon ${catInfo.class}` + (isUsed ? " used" : "");
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

    section.appendChild(grid);
    container.appendChild(section);
  });

  updateAllTimers();
}

function updateAllTimers() {
  let needsFullRerender = false;

  document.querySelectorAll(".coupon.used").forEach((card) => {
    const id = card.dataset.id;
    const redeemedAt = usedState[id];
    if (!redeemedAt) return;

    if (isCooldownOver(redeemedAt)) {
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

setInterval(updateAllTimers, 1000);

// =====================================================================
// POTVRZOVACÍ MODÁLNÍ OKNO
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

modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeConfirmModal();
});

modalConfirm.addEventListener("click", () => {
  if (!pendingCoupon) return;
  const coupon = pendingCoupon;
  closeConfirmModal();

  const card = document.querySelector(`.coupon[data-id="${coupon.id}"]`);
  const btn = card ? card.querySelector(".redeem-btn") : null;
  redeemCoupon(coupon, card, btn);
});

// =====================================================================
// ODESLÁNÍ E-MAILU PŘES WEB3FORMS
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

function launchConfetti() {
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 },
    colors: ["#ff8fa3", "#ffc7d2", "#ffe1e6", "#e26e85", "#ffffff"]
  });
}

async function redeemCoupon(coupon, card, btn) {
  if (btn) {
    btn.disabled = true;
    btn.textContent = "Odesílám...";
  }

  try {
    await sendRedeemNotification(coupon);
  } catch (err) {
    console.warn("Odeslání e-mailu se nepodařilo:", err);
  }

  usedState[coupon.id] = Date.now();
  saveUsedState(usedState);

  renderCoupons();
  launchConfetti();
}

// Prvotní vykreslení
renderCoupons();
