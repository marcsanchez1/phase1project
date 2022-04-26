const base_url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=100`
const trailer_url = `https://api.themoviedb.org/3/movie/343611?api_key=${API_KEY}&append_to_response=video`
const movieSearch_url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query="`
const imageURL = 'https://image.tmdb.org/t/p/w500'
const form = document.querySelector('#form')
const search = document.querySelector('#search')
const main = document.querySelector('#main')
main.id = 'main'
// main.style.display = 'none'

// Hook to the API
function hookAPI(url) {
  fetch(url)
    .then(resp => resp.json())
    .then(data => generateHTML(data.results))
}

// Invoke fetch
hookAPI(base_url)

// Create HTML to append to main element div
function generateHTML(data) {
  data.forEach(data => {
    const {title, poster_path, overview, vote_average, release_date} = data;

    // Create new div to append to main element and add the .card class to the div
    const div = document.createElement('div')
    div.classList.add('card')
    main.append(div)

    // Create img element and append to card
    const img = document.createElement('img')
    img.src = `${imageURL}${poster_path}`
    img.setAttribute('alt', `${title}`)
    div.append(img)

    // Create div to hold title and text description
    const movieInfo = document.createElement('div')
    movieInfo.classList.add('card-info')
    div.append(movieInfo)

    //  Create div to hold title and rating
    const movieHeader = document.createElement('div')
    movieHeader.classList.add('movie-header')
    movieInfo.append(movieHeader)

     // create h3 for movie title then append to movieInfo
     const h3 = document.createElement('h3')
     h3.classList.add('movie-title')
     h3.innerHTML = `${title}
                      <span class="release-date">Release Date: ${release_date.slice(5)}-${release_date.slice(0, 4)}</span>
                      <span class="trailer"><a href="#">Watch Trailer</a></span>
                      `

     // Create paragraph span for the user reviews
     const ratingContainer = document.createElement('div')
     ratingContainer.classList.add('rating')
     ratingContainer.innerHTML = `${Math.ceil(vote_average * 373.3)}`
     

     ratingContainer.addEventListener('click', () => {
       ratingContainer.innerText++
     })


    // const test = document.querySelector('#test')
    // thumbsUp.addEventListener('click', (e) => {
    //   viewerReview.textContent++
    // })

     movieHeader.append(h3,ratingContainer)

    //  Create paragraph element for movie description and append to movieInfo
    const description = document.createElement('p')
    description.classList.add('movie-description')
    description.textContent = `${overview}`
    movieInfo.append(description)
  })
}

// add eventListner for the form submit
form.addEventListener('submit', (e) => {
  e.preventDefault()

  // Condition to make sure user enters a query else display users query
  if (search.value === '') {
    alert("Please enter a movie to search")
  } else {
      main.innerHTML = ' '
      hookAPI(movieSearch_url + search.value)
      search.value = ''
      main.style.display = 'flex'
    }
    // Scroll page into view of main container
    main.scrollIntoView()
})




