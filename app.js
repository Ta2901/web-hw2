
let sumA = 0;
for (let i = 0; i < ratings.length; i++) {
  sumA += ratings[i];
}
const averageA = sumA / ratings.length;
console.log("A1 평균 평점:", averageA);


let maxA = 0;
for (let i = 1; i < ratings.length; i++) {
  if (ratings[i] > ratings[maxA]) {
    maxA = i;
  }
}
console.log("A2 최고 평점:", titles[maxA], ratings[maxA]);


let countA = 0;
for (let i = 0; i < ratings.length; i++) {
  if (ratings[i] >= 8) {
    countA++;
  }
}
console.log("A3 8점 이상:", countA + "편");


let count2020A = 0;
let count2010A = 0;
let count2000A = 0;
let countBeforeA = 0;

for (let i = 0; i < years.length; i++) {
  const decade = years[i] - (years[i] % 10);

  switch (decade) {
    case 2020:
      count2020A++;
      break;
    case 2010:
      count2010A++;
      break;
    case 2000:
      count2000A++;
      break;
    default:
      countBeforeA++;
  }
}
console.log(
  "A4",
  "2020년대 " + count2020A + "편,",
  "2010년대 " + count2010A + "편,",
  "2000년대 " + count2000A + "편,",
  "그 이전 " + countBeforeA + "편"
);


let bigA = "";
for (let i = 0; i < audiences.length; i++) {
  if (audiences[i] >= 1000000) {
    if (bigA !== "") {
      bigA += " ";
    }
    bigA += titles[i];
  }
}
if (bigA === "") {
  bigA = "없음";
}
console.log("A5 관객 100만 이상:", bigA);



function average(list) {
  return averageBy(list, "rating");
}


function best(list) {
  if (list.length === 0) return null;

  let bestMovie = list[0];
  for (let i = 1; i < list.length; i++) {
    if (list[i].rating > bestMovie.rating) {
      bestMovie = list[i];
    }
  }
  return bestMovie;
}


function filterByRating(list, min) {
  return list.filter(function (movie) {
    return movie.rating >= min;
  });
}


function sortBy(list, key, desc) {
  const sign = desc ? -1 : 1;

  return [...list].sort(function (a, b) {
    if (typeof a[key] === "string") {
      return sign * a[key].localeCompare(b[key]);
    }
    return sign * (a[key] - b[key]);
  });
}


function search(list, keyword) {
  const normalizedKeyword = keyword.trim().toLowerCase();

  return list.filter(function (movie) {
    return movie.title.toLowerCase().includes(normalizedKeyword);
  });
}


function formatNumber(n) {
  return Number(n).toLocaleString("ko-KR");
}


function yearsSince(dateStr) {
  const movieYear = new Date(dateStr).getFullYear();
  const currentYear = new Date().getFullYear();
  return currentYear - movieYear;
}

const bestMovie = best(movies);
const audienceTop = sortBy(movies, "audience", true)[0];

document.getElementById("out").textContent =
  "전체 " + movies.length + "편, 평균 평점 " + average(movies).toFixed(1) + "점\n" +
  "최고 평점 " + bestMovie.title + " (" + bestMovie.rating + "점, 개봉한 지 " + yearsSince(bestMovie.date) + "년)\n" +
  "관객 1위 " + audienceTop.title + " (누적 " + formatNumber(audienceTop.audience) + "명)";



function getList(data) {
  return data.results;
}


function averageBy(list, key) {
  if (list.length === 0) return 0;

  let sum = 0;
  for (let i = 0; i < list.length; i++) {
    sum += Number(list[i][key]);
  }
  return sum / list.length;
}

const tmdbMovies = getList(TMDB);

console.log(
  "C1 page", TMDB.page,
  ", total_pages", TMDB.total_pages,
  ", total_results", TMDB.total_results,
  ", 이번 응답", tmdbMovies.length + "편"
);

console.log(
  "C2 상영작 평균 평점:",
  averageBy(tmdbMovies, "vote_average").toFixed(1)
);

console.table(
  sortBy(tmdbMovies, "vote_average", true).slice(0, 5),
  ["title", "release_date", "vote_average"]
);


const tmdbSearchKeyword =
  tmdbMovies.length > 0 ? tmdbMovies[0].title.slice(0, 1) : "";

console.log(
  "C4 검색:",
  tmdbSearchKeyword,
  "검색:",
  search(tmdbMovies, tmdbSearchKeyword).length + "편"
);

