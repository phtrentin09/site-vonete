(function(){
  var WA = "5541996317708";
  var btn = document.querySelector(".menu-btn"), nav = document.querySelector(".nav");
  if (btn && nav) {
    btn.addEventListener("click", function(){
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function(e){ if (e.target.closest("a")) { nav.classList.remove("open"); btn.setAttribute("aria-expanded","false"); } });
  }
  var form = document.getElementById("form-visita");
  if (form) {
    form.addEventListener("submit", function(e){
      e.preventDefault();
      var v = function(id){ var el = document.getElementById(id); return el ? el.value.trim() : ""; };
      var linhas = ["Olá! Vim pelo site e gostaria de agendar uma visita."];
      if (v("f-nome")) linhas.push("Meu nome é " + v("f-nome") + ".");
      if (v("f-parentesco")) linhas.push("O cuidado é para: " + v("f-parentesco") + ".");
      linhas.push("Casa de interesse: " + v("f-casa") + ".");
      linhas.push("Modalidade: " + v("f-modo") + ".");
      if (v("f-msg")) linhas.push(v("f-msg"));
      var url = "https://wa.me/" + WA + "?text=" + encodeURIComponent(linhas.join("\n"));
      var link = document.getElementById("form-link");
      link.href = url; link.hidden = false;
      var w = null; try { w = window.open(url, "_blank", "noopener"); } catch (err) {}
      link.focus();
    });
  }
})();
/* consentimento de cookies e mapas */
(function(){
  var KEY = "vn-cookies";
  function get(){ try { return localStorage.getItem(KEY); } catch(e){ return null; } }
  function set(v){ try { localStorage.setItem(KEY, v); } catch(e){} }
  function loadMap(g){
    if (!g || g.dataset.loaded) return;
    var f = document.createElement("iframe");
    f.src = g.dataset.mapSrc; f.title = g.dataset.mapTitle || "Mapa"; f.loading = "lazy";
    f.referrerPolicy = "no-referrer-when-downgrade";
    g.innerHTML = ""; g.appendChild(f); g.dataset.loaded = "1"; g.classList.add("on");
  }
  function loadAll(){ [].forEach.call(document.querySelectorAll(".map-gate"), loadMap); }
  var banner = document.getElementById("cookie-banner");
  var choice = get();
  if (choice === "all") loadAll();
  if (!choice && banner) banner.hidden = false;
  document.addEventListener("click", function(e){
    var b = e.target.closest("[data-cookie]");
    if (b) { set(b.dataset.cookie); if (banner) banner.hidden = true; if (b.dataset.cookie === "all") loadAll(); return; }
    if (e.target.closest("[data-cookie-open]")) { if (banner) banner.hidden = false; return; }
    var m = e.target.closest("[data-load-map]");
    if (m) loadMap(m.closest(".map-gate"));
  });
})();
