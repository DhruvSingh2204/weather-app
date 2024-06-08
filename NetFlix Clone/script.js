window.onload = () => {
  fetchMovies();
};

const url = 'https://streaming-availability.p.rapidapi.com/shows/search/filters?country=IN&series_granularity=show&order_direction=asc&order_by=original_title&genres_relation=and&output_language=en&show_type=movie';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '84ede7503bmsh482b8f109fdf27fp1ca99cjsn8570f7da1a4b',
    'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
  }
};

function fetchMovies() {
  fetch(url, options)
    .then(response => response.json())
    .then(data => showMovies(data.shows))
    .catch(error => console.log('cannot fetch', error));
}

function showMovies(movies) {
  const dom_element1 = document.querySelector('.original__movies');
  const dom_element2 = document.querySelector('#trending');
  const dom_element3 = document.querySelector('#top_rated');

  for (const movie of movies) {
    let imageElement = document.createElement('img');
    imageElement.src = movie.imageSet.verticalPoster.w720;
    imageElement.alt = movie.title;

    imageElement.onclick = () => {
      const titleDiv = document.getElementById('name');
      const descriptionDiv = document.querySelector('.featured__description');
      const featuredDiv = document.querySelector('.featured');
      const ratingDiv = document.getElementById('ratings');

      ratingDiv.innerText = `Rating - ${movie.rating}`;
      featuredDiv.style.backgroundImage = `url(${movie.imageSet.horizontalPoster.w720})`;
      featuredDiv.style.transitionDuration = '0.2s';
      featuredDiv.style.transitionTimingFunction = 'ease-in';
      titleDiv.innerText = movie.title;
      descriptionDiv.innerText = movie.overview || 'No description available.';
    };

    const playButton = document.getElementById('playbutton');

    playButton.onclick = () => {
      const trailerModal = document.getElementById('trailerModal');
      const movieTrailer = document.getElementById('movieTrailer');
      const movieNotFound = document.querySelector('.movieNotFound');

      // Log the streaming options to debug the issue
      console.log('Streaming Options:', movie.streamingOptions);

      if (movie.streamingOptions && movie.streamingOptions.in && movie.streamingOptions.in.length > 0 && movie.streamingOptions.in[0] && movie.streamingOptions.in[0].link) {
        movieTrailer.src = movie.streamingOptions.in[0].link;
        movieTrailer.style.display = 'block';
        movieNotFound.style.display = 'none';
      }
      else {
        movieTrailer.style.display = 'none';
        movieNotFound.style.display = 'block';
      }

      // Open the modal
      $(trailerModal).modal('show');
    };

    if (movie.rating >= 51) {
      dom_element1.appendChild(imageElement);
    } else if (movie.rating >= 50) {
      dom_element2.appendChild(imageElement);
    } else {
      dom_element3.appendChild(imageElement);
    }
  }
}

function closeTrailer() {
  const trailerModal = document.getElementById('trailerModal');
  const movieTrailer = document.getElementById('movieTrailer');

  movieTrailer.src = '';
  $(trailerModal).modal('hide');
}