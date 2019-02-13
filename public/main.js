const getBackground = () => {
  fetch('https://sdg-astro-api.herokuapp.com/api/Nasa/apod')
    .then(resp => {
      return resp.json()
    })
    .then(potd => {
      todayPotd = potd
      console.log(todayPotd.hdUrl)
      document.getElementById('pic-of-the-day').style.backgroundImage = `url(${
        todayPotd.hdUrl
      })`
    })
}

document.addEventListener('DOMContentLoaded', getBackground)
