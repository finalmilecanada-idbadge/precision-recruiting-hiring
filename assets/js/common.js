/* Shared by every page: analytics, campaign attribution, toast message, menu. Load config.js first. */
var PDCFG = { gaId: window.PD_GA_ID || "", peak: { start: "10-06", end: "01-12" } };   // peak season: Oct 6 to Jan 12

/* ===== Analytics: one event name per action. Logs to the console until a GA4 ID is set in config.js ===== */
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
function isPeak(d){ d=d||new Date(); var m=("0"+(d.getMonth()+1)).slice(-2)+"-"+("0"+d.getDate()).slice(-2); return m>=PDCFG.peak.start||m<=PDCFG.peak.end; }
function track(name, params){
  params = params || {}; params.season = isPeak() ? "peak" : "off_peak"; params.language = "en";
  if (PDCFG.gaId) { gtag("event", name, params); } else { console.log("[event]", name, params); }
}
if (PDCFG.gaId) {
  var gs_=document.createElement("script"); gs_.async=true; gs_.src="https://www.googletagmanager.com/gtag/js?id="+PDCFG.gaId; document.head.appendChild(gs_);
  gtag("js", new Date()); gtag("config", PDCFG.gaId, {transport_type:"beacon"});
}

/* ===== Campaign attribution: capture UTMs once, keep them for the visit, add them to application links and links between pages ===== */
var UTM_KEYS=["utm_source","utm_medium","utm_campaign","utm_content","utm_term"], utm={};
try {
  var qs=new URLSearchParams(location.search), found={};
  UTM_KEYS.forEach(function(k){ if(qs.get(k)) found[k]=qs.get(k); });
  if (Object.keys(found).length) sessionStorage.setItem("pd_utm", JSON.stringify(found));
  utm = JSON.parse(sessionStorage.getItem("pd_utm")||"{}");
} catch(e){ utm = {}; }
function withUtm(url){ try{ var u=new URL(url); Object.keys(utm).forEach(function(k){u.searchParams.set(k,utm[k])}); return u.toString(); }catch(e){ return url; } }
document.querySelectorAll("a[data-keep-utm]").forEach(function(a){ try{ var u=new URL(a.getAttribute("href"), location.href); Object.keys(utm).forEach(function(k){ u.searchParams.set(k,utm[k]); }); a.href=u.toString(); }catch(e){} });

function toast(msg){
  var t=document.getElementById("toast");
  if(!t){ t=document.createElement("div"); t.id="toast"; t.setAttribute("role","status"); t.hidden=true; document.body.appendChild(t); }
  t.textContent=msg; t.hidden=false; clearTimeout(toast.t); toast.t=setTimeout(function(){t.hidden=true},3500);
}

/* Every "Apply to Drive" button counts as one apply_click (cta_location says which button) */
document.querySelectorAll("[data-apply]").forEach(function(a){
  a.addEventListener("click", function(){ track("apply_click", { cta_location: a.dataset.cta }); });
});

/* ===== Menu: burger on phones, links in the header on larger screens ===== */
(function(){
  var b=document.getElementById("burger"), n=document.getElementById("sitenav"); if(!b||!n) return;
  function set(o){ n.classList.toggle("open",o); b.setAttribute("aria-expanded",String(o)); b.setAttribute("aria-label",o?"Close menu":"Open menu"); }
  b.addEventListener("click",function(){ var o=!n.classList.contains("open"); set(o); if(o) track("menu_open"); });
  n.addEventListener("click",function(e){ var a=e.target.closest("a"); if(!a) return; track("nav_click",{item:a.getAttribute("data-nav")||a.textContent.trim()}); set(false); });
  document.addEventListener("keydown",function(e){ if(e.key==="Escape") set(false); });
})();

/* ===== Language switch (the Quebec French pages are built next) ===== */
(function(){
  var lg=document.getElementById("lang"); if(!lg) return;
  lg.addEventListener("click",function(){ track("language_switch",{to:"fr"}); toast("The Quebec French version is built next, as its own page."); });
})();
