const listEl = document.getElementById("list");
const tpl = document.getElementById("card-tpl");
const search = document.getElementById("search");
const lang = document.getElementById("lang");
const showFavs = document.getElementById("show-favs");

let currentLang = "en";
let showingFavs = false;

async function load(q="") {
  const res = await fetch(`/api/crops?q=${encodeURIComponent(q)}&lang=${currentLang}`);
  const data = await res.json();
  renderList(data);
}

function renderList(items) {
  listEl.innerHTML = "";
  if(items.length === 0) {
    listEl.innerHTML = "<p class='empty'>No crops found.</p>";
    return;
  }
  items.forEach(it => {
    const node = tpl.content.cloneNode(true);
    node.querySelector(".thumb").src = it.thumb || "/static/images/placeholder.png";
    node.querySelector(".name").textContent = it.name;
    node.querySelector(".short").textContent = it.short || "";
    const view = node.querySelector(".view");
    view.href = `/crop/${it.id}`;
    const favBtn = node.querySelector(".fav");
    favBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      await toggleFav(it.id, favBtn);
    });
    listEl.appendChild(node);
    updateFavButton(it.id, node.querySelector(".fav"));
  });
}

async function toggleFav(id, btn) {
  const isFav = btn.classList.contains("is-fav");
  if(isFav) {
    await fetch("/api/favorites", {method:"DELETE", headers:{"Content-Type":"application/json"}, body: JSON.stringify({id})});
    btn.classList.remove("is-fav");
    btn.textContent = "♡";
  } else {
    await fetch("/api/favorites", {method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({id})});
    btn.classList.add("is-fav");
    btn.textContent = "❤️";
  }
}

async function updateFavButton(id, btn) {
  const res = await fetch("/api/favorites");
  const favs = await res.json();
  if(favs.includes(id)) {
    btn.classList.add("is-fav");
    btn.textContent = "❤️";
  } else {
    btn.classList.remove("is-fav");
    btn.textContent = "♡";
  }
}

search.addEventListener("input", () => {
  showingFavs = false;
  load(search.value);
});

lang.addEventListener("change", () => {
  currentLang = lang.value;
  load(search.value);
});

showFavs.addEventListener("click", async () => {
  showingFavs = !showingFavs;
  if(showingFavs) {
    const res = await fetch("/api/favorites");
    const favs = await res.json();
    const cropPromises = favs.map(id => fetch(`/api/crop/${id}`).then(r=>r.json()));
    const crops = await Promise.all(cropPromises);
    const items = crops.map(c=>{
      return {
        id: c.id,
        name: currentLang==="en"?c.name_en:c.name_kn,
        thumb: c.thumb || "/static/images/placeholder.png",
        short: currentLang==="en"?c.short_en:c.short_kn
      }
    });
    renderList(items);
  } else {
    load(search.value);
  }
});

load();
