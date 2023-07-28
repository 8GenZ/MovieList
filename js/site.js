const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OThkMWE4NGE1MWY3YWNiOTc0MjgzZTUyYWFjZWRlMCIsInN1YiI6IjY0YzE2ODVkZGI0ZWQ2MDEzYmYzNmJhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cFFIhtrrNbBuSvSMm_kYQ4Y7hBaFAyvoWNZ5YRx7sVw'
// https://api.themoviedb.org/3/movie/popular


async function getMovies() {

    try {

        let response = await fetch('https://api.themoviedb.org/3/movie/popular', {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });

        let data = await response.json();

        return data;

    } catch (error) {

        console.error(error);

    }
}

async function getMovieDetails(movieId) {

    try {

        let response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });

        let data = await response.json();

        return data;

    } catch (error) {

        console.error(error);

    }
}
async function displayMovies() {
    const movieListDiv = document.getElementById('movie-list');
    const moviePosterTemplate = document.getElementById("movie-card-template");

    let data = await getMovies();
    

    let movies = data.results;

    movies.forEach(movie => {
        let movieCard = moviePosterTemplate.content.cloneNode(true);

        let titleElement = movieCard.querySelector('.card-body > h5');
        titleElement.textContent = movie.title;

        let movieParagraphElement = movieCard.querySelector('.card-text');
        movieParagraphElement.textContent = movie.overview;

        let movieImgElement = movieCard.querySelector('.card-img-top');
        movieImgElement.setAttribute('src', `https://image.tmdb.org/t/p/w500${movie.poster_path}`);


        let infoButton = movieCard.querySelector('button.btn');
        infoButton.setAttribute('id', movie.id );


        movieListDiv.appendChild(movieCard);


    });


}



 
async function showMovieDetails(btn) {

    let movieId = btn.getAttribute('id');

    let movieDetails = await getMovieDetails(movieId);

    document.getElementById('modal-movie-title').textContent = movieDetails.title;
    document.getElementById('modal-img').src =`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;
    document.getElementById('modal-paragraph').textContent = movieDetails.overview;
    document.getElementById('modal-genre').textContent = movieDetails.genre;
}


