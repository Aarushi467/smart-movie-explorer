let allMovies = [];
let favorites = JSON.parse(localStorage.getItem("fav")) || [];

async function searchMovies() {
  const query = document.getElementById("searchInput").value;
  fetchMovies(query);
}

async function quickSearch(q) {
  document.getElementById("searchInput").value = q;
  fetchMovies(q);
}

async function fetchMovies(query) {
  const moviesDiv = document.getElementById("movies");
  moviesDiv.innerHTML = "Loading...";

  try {
    const res = await fetch(
      `https://www.omdbapi.com/?s=${query}&apikey=838ba4b9`,
    );
    const data = await res.json();

    allMovies = data.Search || [];
    displayMovies(allMovies);
  } catch {
    moviesDiv.innerHTML = "Error loading movies";
  }
}

function displayMovies(movies) {
  const moviesDiv = document.getElementById("movies");
  moviesDiv.innerHTML = `
    <h2 style="margin-left:20px">Trending Now</h2>
    <div class="row" id="row1"></div>
  `;

  const row = document.getElementById("row1");
  movies.forEach(m => {
  const div = document.createElement("div");
  div.classList.add("movie");

  div.onclick = () => showDetails(m.imdbID); // 🔥 THIS LINE

  div.innerHTML = `
    <img src="${m.Poster}">
    <h3>${m.Title}</h3>
    <p>${m.Year}</p>
  `;

  row.appendChild(div);
});

  
}

function sortAZ() {
  displayMovies([...allMovies].sort((a, b) => a.Title.localeCompare(b.Title)));
}

function sortZA() {
  displayMovies([...allMovies].sort((a, b) => b.Title.localeCompare(a.Title)));
}

function filterMovies(type) {
  let filtered = allMovies;

  if (type === "new") {
    filtered = allMovies.filter((m) => parseInt(m.Year) >= 2015);
  } else if (type === "old") {
    filtered = allMovies.filter((m) => parseInt(m.Year) < 2015);
  }

  displayMovies(filtered);
}

function addFavorite(title) {
  favorites.push(title);
  localStorage.setItem("fav", JSON.stringify(favorites));
  alert("Added!");
}

function showFavorites() {
  const moviesDiv = document.getElementById("movies");
  moviesDiv.innerHTML = "";

  favorites.forEach((f) => {
    const div = document.createElement("div");
    div.innerHTML = `<h3>${f}</h3>`;
    moviesDiv.appendChild(div);
  });
}

function toggleTheme() {
  document.body.classList.toggle("light");
}

function showHome() {
  displayMovies(allMovies);
}

async function showDetails(id) {
  const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=838ba4b9`);
  const m = await res.json();

  document.getElementById("modal").style.display = "flex";
  document.getElementById("modalPoster").src = m.Poster;
  document.getElementById("modalTitle").innerText = m.Title;
  document.getElementById("modalRating").innerText = "⭐ " + m.imdbRating;
  document.getElementById("modalPlot").innerText = m.Plot;
}

/* ENTER KEY SEARCH */
document.getElementById("searchInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchMovies();
});
window.onload = () => {
  fetchMovies("Avengers");
};
function closeModal() {
  document.getElementById("modal").style.display = "none";
}


