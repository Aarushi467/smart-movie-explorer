async function searchMovies() {
  const query = document.getElementById("searchInput").value;

  const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=YOUR_API_KEY`);
  const data = await response.json();

  const moviesDiv = document.getElementById("movies");
  moviesDiv.innerHTML = "";

  if (data.Search) {
    data.Search.forEach(movie => {
      const div = document.createElement("div");
      div.classList.add("movie");

      div.innerHTML = `
        <h3>${movie.Title}</h3>
        <img src="${movie.Poster}" />
      `;

      moviesDiv.appendChild(div);
    });
  } else {
    moviesDiv.innerHTML = "<p>No results found</p>";
  }
}
