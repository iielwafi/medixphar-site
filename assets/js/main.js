// =====================
// Year
// =====================
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// =====================
// Theme
// =====================
const themeBtn = document.querySelector("[data-theme-toggle]");
const themeIcon = document.querySelector("[data-theme-icon]");

function applyTheme(theme){
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  if (themeIcon) themeIcon.textContent = theme === "dark" ? "🌙" : "☀️";
}
applyTheme(localStorage.getItem("theme") || "dark");

if (themeBtn){
  themeBtn.addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme") || "dark";
    applyTheme(cur === "dark" ? "light" : "dark");
  });
}

// =====================
// Language (FR/EN)
// =====================
const dict = {
  fr: {
    nav_about:"À propos", nav_events:"Activités", nav_team:"Équipe", nav_join:"Rejoindre",
    badge:"Club étudiant • Médecine & Pharmacie",
    hero_title:"Construisons une communauté qui apprend, agit et impacte.",
    hero_sub:"Événements, ateliers et initiatives pour développer vos compétences et créer des opportunités.",
    cta_join:"Devenir membre", cta_events:"Voir les activités",
    stat_events:"Événements", stat_partners:"Partenaires", stat_spirit:"Esprit",
    next_event:"Prochain événement",
    next_event_desc:"Ajoute ici un événement phare (date, thème, lieu).",
    ev_theme:"Thème:", ev_theme_val:"Atelier CV & Interview",
    ev_date:"Date:", ev_date_val:"À définir",
    ev_place:"Lieu:", ev_place_val:"Faculté / en ligne",
    ev_details:"Détails",
    about_title:"À propos",
    about_sub:"Notre mission: apprendre, partager, impacter.",
    about_card1_title:"Mission",
    about_card1_text:"Développer les compétences scientifiques, humaines et professionnelles des étudiants.",
    about_card2_title:"Vision",
    about_card2_text:"Créer un réseau solide entre étudiants, enseignants et partenaires du domaine santé.",
    about_card3_title:"Valeurs",
    about_card3_text:"Excellence, collaboration, éthique, et impact positif sur la communauté.",
    about_cta:"En savoir plus",
    events_title:"Activités",
    events_sub:"Quelques formats d’activités que le club organise.",
    events_cta:"En savoir plus",
    team_title:"Équipe",
    team_sub:"Une équipe motivée pour organiser et innover.",
    team_role1:"Présidence", team_role2:"Vice-présidence", team_role3:"Organisation", team_role4:"Communication",
    join_title:"Prête à rejoindre l’aventure ?",
    join_sub:"Laisse-nous tes infos et on te contacte rapidement.",
    join_btn:"Envoyer",
    ph_name:"Nom", ph_email:"Email",
    footer_home:"Accueil", footer_contact:"Contact",
    back_home:"Retour à l’accueil",
    open_map:"Open map",
    register:"Register",
    partners_title:"Partenaires",
    partners_sub:"Ils nous font confiance et soutiennent nos activités.",
    
  },
  en: {
    nav_about:"About", nav_events:"Events", nav_team:"Team", nav_join:"Join",
    badge:"Student Club • Medicine & Pharmacy",
    hero_title:"Build a community that learns, acts, and creates impact.",
    hero_sub:"Events, workshops, and initiatives to grow your skills and create opportunities.",
    cta_join:"Become a member", cta_events:"View activities",
    stat_events:"Events", stat_partners:"Partners", stat_spirit:"Spirit",
    next_event:"Next event",
    next_event_desc:"Add a highlight event here (date, topic, place).",
    ev_theme:"Theme:", ev_theme_val:"CV & Interview Workshop",
    ev_date:"Date:", ev_date_val:"To be announced",
    ev_place:"Location:", ev_place_val:"Faculty / online",
    ev_details:"Details",
    about_title:"About",
    about_sub:"Our mission: learn, share, and create impact.",
    about_card1_title:"Mission",
    about_card1_text:"Develop students’ scientific, human, and professional skills.",
    about_card2_title:"Vision",
    about_card2_text:"Build a strong network between students, teachers, and health-domain partners.",
    about_card3_title:"Values",
    about_card3_text:"Excellence, collaboration, ethics, and positive community impact.",
    about_cta:"Learn more",
    events_title:"Events",
    events_sub:"A few activity formats the club organizes.",
    events_cta:"Learn more",
    team_title:"Team",
    team_sub:"A motivated team to organize and innovate.",
    team_role1:"President", team_role2:"Vice President", team_role3:"Operations", team_role4:"Communication",
    join_title:"Ready to join the journey?",
    join_sub:"Leave your details and we’ll contact you soon.",
    join_btn:"Send",
    ph_name:"Name", ph_email:"Email",
    footer_home:"Home", footer_contact:"Contact",
    back_home:"Back home",
    open_map:"Open map",
    register:"Register",
    partners_title:"Partners",
partners_sub:"They trust us and support our activities.",
  }
};

function applyLang(lang){
  document.documentElement.setAttribute("lang", lang);
  localStorage.setItem("lang", lang);

  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    const v = dict?.[lang]?.[key];
    if (v) el.textContent = v;
  });

  document.querySelectorAll("[data-i18n-ph]").forEach(el=>{
    const key = el.getAttribute("data-i18n-ph");
    const v = dict?.[lang]?.[key];
    if (v) el.setAttribute("placeholder", v);
  });

  // Seg active
  document.querySelectorAll("[data-lang]").forEach(btn=>{
    btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
  });
}

applyLang(localStorage.getItem("lang") || "fr");
document.querySelectorAll("[data-lang]").forEach(btn=>{
  btn.addEventListener("click", ()=> applyLang(btn.getAttribute("data-lang")));
});

// =====================
// Mobile Nav
// =====================
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
if (nav && navToggle){
  navToggle.addEventListener("click", ()=>{
    const open = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
}

// =====================
// Reveal
// =====================
const reveals = document.querySelectorAll(".reveal");
if (reveals.length){
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=> e.isIntersecting && e.target.classList.add("is-visible"));
  }, {threshold:0.12});
  reveals.forEach(el=> io.observe(el));
}

// =====================
// Events API
// =====================
const EVENTS_URL = "https://script.google.com/macros/s/AKfycbw4cZHtMRHRe0gOxx1LuVYog_LiPv8HMVLWFkAabhDkOYa8GS2l6y3XhjSqIs_zWfkC/exec";

// =====================
// Slider (1 card/page + smooth loop)
// =====================
async function initHomeSlider(){
  const track = document.getElementById("eventsTrack");
  const dotsWrap = document.getElementById("eventsDots");
  const slider = document.getElementById("eventsSlider");
  if (!track || !dotsWrap || !slider) return;

  let events = [];
  try{
    const res = await fetch(EVENTS_URL);
    const data = await res.json();
    events = data.events || [];
  }catch(e){
    console.error(e);
  }

  if (!events.length){
    track.innerHTML = `<div class="slide"><div class="glass card"><div class="card__head"><h3>No events yet</h3><p class="muted">Add rows in Google Sheet.</p></div></div></div>`;
    dotsWrap.innerHTML = "";
    return;
  }

  // Clone edges for infinite loop
  const slidesData = [events[events.length-1], ...events, events[0]];

  track.innerHTML = slidesData.map(ev => `
    <div class="slide">
      <article class="glass card slide__card">
        ${ev.cover ? `
          <div class="slide__hero">
            <img src="${ev.cover}" alt="${ev.title || "Event"}" loading="lazy" referrerpolicy="no-referrer">
          </div>` : ``}
        <div class="slide__body">
          <span class="badgedate">${(ev.date||"")}${ev.time ? " • "+ev.time : ""}</span>
          <div class="slide__title">${ev.title || "Event"}</div>
          <div class="muted">${ev.description || ""}</div>
          ${ev.address ? `<div class="muted slide__place">📍 ${ev.address}</div>` : ``}
          <div style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap;">
            ${ev.maps ? `<a class="btn btn--glass" href="${ev.maps}" target="_blank" rel="noopener">${dict[localStorage.getItem("lang")||"fr"].open_map}</a>` : ``}
            ${ev.link ? `<a class="btn btn--primary" href="${ev.link}" target="_blank" rel="noopener">${dict[localStorage.getItem("lang")||"fr"].register}</a>` : ``}
          </div>
        </div>
      </article>
    </div>
  `).join("");

  // Dots only for real slides
  dotsWrap.innerHTML = events.map((_,i)=> `<button class="slider__dot ${i===0?'active':''}" type="button" aria-label="dot"></button>`).join("");

  let index = 1; // start at first real
  let width = slider.querySelector(".slider__viewport").getBoundingClientRect().width;

  function setTransform(animate=true){
    track.style.transition = animate ? "transform .7s cubic-bezier(.2,.8,.2,1)" : "none";
    track.style.transform = `translateX(-${index * width}px)`;
  }

  function setActiveDot(){
    const realIndex = (index - 1 + events.length) % events.length;
    dotsWrap.querySelectorAll(".slider__dot").forEach((d,i)=> d.classList.toggle("active", i===realIndex));
  }

  // initial position
  setTransform(false);
  setActiveDot();

  // resize
  window.addEventListener("resize", ()=>{
    width = slider.querySelector(".slider__viewport").getBoundingClientRect().width;
    setTransform(false);
  });

  // autoplay
  let timer = setInterval(()=> go(index+1), 4500);
  slider.addEventListener("mouseenter", ()=> clearInterval(timer));
  slider.addEventListener("mouseleave", ()=> timer = setInterval(()=> go(index+1), 4500));

  function go(next){
    index = next;
    setTransform(true);
    setActiveDot();
  }

  // when transition ends, jump for loop edges
  track.addEventListener("transitionend", ()=>{
    if (index === 0){
      index = events.length;
      setTransform(false);
      setActiveDot();
    }
    if (index === events.length + 1){
      index = 1;
      setTransform(false);
      setActiveDot();
    }
  });

  // dots click
  dotsWrap.querySelectorAll(".slider__dot").forEach((dot,i)=>{
    dot.addEventListener("click", ()=> go(i+1));
  });
}

initHomeSlider();

// =====================
// Events page grid
// =====================
async function loadEventsPage(){
  const grid = document.getElementById("eventsGrid");
  if (!grid) return;

  grid.innerHTML = `<div class="muted">Loading…</div>`;

  try{
    const res = await fetch(EVENTS_URL);
    const data = await res.json();
    const events = data.events || [];

    if (!events.length){
      grid.innerHTML = `<div class="muted">No events yet.</div>`;
      return;
    }

    grid.innerHTML = events.map(ev=>`
      <article class="glass event">
        ${ev.cover ? `<div class="event__hero"><img src="${ev.cover}" alt="${ev.title||"Event"}" loading="lazy" referrerpolicy="no-referrer"></div>` : ""}
        <div class="event__body">
          <span class="badgedate">${(ev.date||"")}${ev.time ? " • "+ev.time : ""}</span>
          <div class="slide__title">${ev.title || "Event"}</div>
          <div class="muted">${ev.description || ""}</div>
          ${ev.address ? `<div class="muted" style="margin-top:8px;">📍 ${ev.address}</div>` : ""}

          <div class="event__meta">
            ${ev.location ? `<span class="pillmini">📌 ${ev.location}</span>` : ""}
            ${ev.type ? `<span class="pillmini">🏷️ ${ev.type}</span>` : ""}
          </div>

          <div style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap;">
            ${ev.maps ? `<a class="btn btn--glass" href="${ev.maps}" target="_blank" rel="noopener">${dict[localStorage.getItem("lang")||"fr"].open_map}</a>` : ""}
            ${ev.link ? `<a class="btn btn--primary" href="${ev.link}" target="_blank" rel="noopener">${dict[localStorage.getItem("lang")||"fr"].register}</a>` : ""}
          </div>
        </div>
      </article>
    `).join("");

  }catch(e){
    console.error(e);
    grid.innerHTML = `<div class="muted">Error loading events.</div>`;
  }
}
loadEventsPage();

async function initNewsSlider() {
  const track = document.getElementById("newsTrack");
  const dots = document.getElementById("newsDots");
  const slider = document.getElementById("newsSlider");

  if (!track || !dots || !slider) return;

  track.innerHTML = `<div class="muted">Loading news...</div>`;

  try {
    const res = await fetch("https://script.google.com/macros/s/AKfycbxzyM0Fi6Qg8IzDx9LBmxbsYTLAisIy1IMykRBmGM6H4-jBf8v_eJ3JqD5aPpoTQMySvw/exec");
    const data = await res.json();
    const news = data.news || [];

    if (!news.length) {
      track.innerHTML = `<div class="muted">No news yet.</div>`;
      return;
    }

    const slidesData = [news[news.length - 1], ...news, news[0]];

    track.innerHTML = slidesData.map(n => {
      const title = n.title_fr || n.title || "News";
      const excerpt = n.excerpt_fr || "";
      const formattedDate = n.date
        ? new Date(n.date).toLocaleDateString("fr-FR")
        : "";

      return `
        <div class="news-slide">
          <article class="news-card">
            ${n.cover ? `
              <div class="cover">
                <img src="${n.cover}" alt="${title}" loading="lazy">
              </div>
            ` : ""}

            <div class="body">
              <div class="news-date">${formattedDate}</div>
              <h3 class="news-title">${title}</h3>
              <p class="news-excerpt">${excerpt}</p>
            </div>
          </article>
        </div>
      `;
    }).join("");

    dots.innerHTML = news.map((_, i) =>
      `<button class="dot ${i === 0 ? "active" : ""}" type="button"></button>`
    ).join("");

    let index = 1;

    function getSlideWidth() {
      const slide = track.querySelector(".news-slide");
      return slide ? slide.getBoundingClientRect().width : 0;
    }

    function setTransform(animate = true) {
      const width = getSlideWidth();
      track.style.transition = animate ? "transform .7s cubic-bezier(.2,.8,.2,1)" : "none";
      track.style.transform = `translateX(-${index * width}px)`;
    }

    function setActiveDot() {
      const realIndex = (index - 1 + news.length) % news.length;
      dots.querySelectorAll(".dot").forEach((d, i) => {
        d.classList.toggle("active", i === realIndex);
      });
    }

    function go(next) {
      index = next;
      setTransform(true);
      setActiveDot();
    }

    setTransform(false);
    setActiveDot();

    let timer = setInterval(() => go(index + 1), 4000);

    slider.addEventListener("mouseenter", () => clearInterval(timer));
    slider.addEventListener("mouseleave", () => {
      timer = setInterval(() => go(index + 1), 4000);
    });

    track.addEventListener("transitionend", () => {
      if (index === 0) {
        index = news.length;
        setTransform(false);
        setActiveDot();
      }
      if (index === news.length + 1) {
        index = 1;
        setTransform(false);
        setActiveDot();
      }
    });

    dots.querySelectorAll(".dot").forEach((dot, i) => {
      dot.addEventListener("click", () => go(i + 1));
    });

    window.addEventListener("resize", () => {
      setTransform(false);
    });

  } catch (e) {
    console.error(e);
    track.innerHTML = `<div class="muted">Error loading news.</div>`;
  }
}

initNewsSlider();

async function loadNewsPage() {
  const grid = document.getElementById("newsPageGrid");
  if (!grid) return;

  const lang = localStorage.getItem("lang") || "fr";
  grid.innerHTML = `<div class="news-empty">${lang === "en" ? "Loading news..." : "Chargement des actualités..."}</div>`;

  try {
    const res = await fetch("https://script.google.com/macros/s/AKfycbxzyM0Fi6Qg8IzDx9LBmxbsYTLAisIy1IMykRBmGM6H4-jBf8v_eJ3JqD5aPpoTQMySvw/exec");
    const data = await res.json();
    const news = data.news || [];

    if (!news.length) {
      grid.innerHTML = `<div class="news-empty">${lang === "en" ? "No news yet." : "Aucune actualité pour le moment."}</div>`;
      return;
    }

    grid.innerHTML = news.map(item => {
      const title =
        (lang === "en" ? item.title_en : item.title_fr) ||
        item.title_fr ||
        item.title ||
        "News";

      const excerpt =
        (lang === "en" ? item.excerpt_en : item.excerpt_fr) ||
        item.excerpt_fr ||
        item.excerpt ||
        "";

      const formattedDate = item.date
        ? new Date(item.date).toLocaleDateString(lang === "en" ? "en-GB" : "fr-FR")
        : "";

      return `
        <article class="news-page-card">
          ${item.cover ? `
            <div class="news-page-cover">
              <img src="${item.cover}" alt="${title}" loading="lazy" referrerpolicy="no-referrer">
            </div>
          ` : ""}

          <div class="news-page-body">
            <div class="news-page-date">${formattedDate}</div>
            <h3 class="news-page-title">${title}</h3>
            <p class="news-page-excerpt">${excerpt}</p>

            <div class="news-page-actions">
              <a class="btn btn--primary" href="news-detail.html?id=${encodeURIComponent(item.id || "")}">
                ${lang === "en" ? "Read more" : "Lire plus"}
              </a>
            </div>
          </div>
        </article>
      `;
    }).join("");

  } catch (error) {
    console.error(error);
    grid.innerHTML = `<div class="news-empty">${lang === "en" ? "Error loading news." : "Erreur lors du chargement des actualités."}</div>`;
  }
}

loadNewsPage();