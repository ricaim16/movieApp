// TMDB

const API_KEY = 'api_key=2d4bf3405eba804509429f187e836594';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const main = document.getElementById('main');
const button = document.getElementById('button');



form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm) {
    const searchURL = BASE_URL + '/search/movie?' + API_KEY + '&query=' + searchTerm;
    getMovies(searchURL);
  }
});




  




getMovies(API_URL);

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showMovies(data.results);
    });
}

function showMovies(data) {
  main.innerHTML = '';

  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieE1 = document.createElement('div');
    movieE1.classList.add('movie');
    movieE1.innerHTML = `
      <img src="${IMG_URL + poster_path}" alt="${title}">
      <div class="movie-info">
        <div class="change">
          <h3>${title}</h3>
          <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>overview</h3>
          ${overview}
        </div>
      </div>
    `;

    main.appendChild(movieE1);
      
  });
}

function getColor(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}


const prevPage = document.getElementById('prev');
const nextPage = document.getElementById('next');
const currentPage = document.getElementById('current');

let page = 1;

prevPage.addEventListener('click', () => {
  if (page > 1) {
    page--;
    updatePage();
  }
});

nextPage.addEventListener('click', () => {
  page++;
  updatePage();
});

function updatePage() {
  currentPage.textContent = page;
  const searchURL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY + '&page=' + page;
  getMovies(searchURL);
}