const TMDB = {
    page: 1,
    total_pages: 1,
    total_results: movies.length,
  
    results: movies.map(function (movie, index) {
      return {
        id: index + 1,
        title: movie.title,
        original_title: movie.title,
        release_date: movie.date,
        vote_average: movie.rating,
        vote_count: 0,
        poster_path: movie.poster
      };
    })
  };