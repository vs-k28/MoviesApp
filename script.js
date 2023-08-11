
const formEl = document.getElementById('form');
const api_url = 'https://api.themoviedb.org/3/discover/movie?api_key=3c668b313527bb694420ac9245554076&sort_by=popularity.desc&language=en-US' 

const search_url = 'https://api.themoviedb.org/3/search/movie?api_key=3c668b313527bb694420ac9245554076&sort_by=popularity.desc&language=en-US&query=';

const img_Path = 'https://image.tmdb.org/t/p/w1280';

const search = document.getElementById('search');
const statusEl = document.querySelector('.status');
const statusid = document.getElementById('status');
const mainEl = document.querySelector('.main');



loadMovies(api_url);     

function loadMovies(url) {
    fetch(`${url}`)
    .then(response => response.json())
    .then(data => {
        getMovies(data.results)
})
    .catch(err => console.error(err));

}



formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    let SearchValue = search.value

    if (SearchValue && SearchValue !== "") {
        statusEl.classList.add('inactive');
        mainEl.classList.remove('inactive')
        loadMovies(search_url + SearchValue)
        SearchValue = '';
    } else {
        // window.location.reload()
        statusEl.classList.remove('inactive');
        statusid.innerText = "Oops! We couldn't find any movies matching your search. Please try a different movie name";
        mainEl.classList.add('inactive')
        SearchValue = '';
    }
})


function getMovies(movies) {
    mainEl.innerHTML = '';
    console.log(movies)
    movies.forEach((movie) => {

        const { title, poster_path, vote_average, overview } = movie

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img src="${img_Path + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3 id="title">${title}</h3>
                <span class="${getRatingColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>`
        mainEl.append(movieEl)
        
    })
}

function getRatingColor(rating) {
    if (rating >= 8) {
        return 'green';
    } else if (rating >= 5) {
        return 'orange';
    } else {
        return 'red'
    }
}

    


