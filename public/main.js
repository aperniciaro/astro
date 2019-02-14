let todayPotd = {}

const getBackground = () => {
  fetch('https://sdg-astro-api.herokuapp.com/api/Nasa/apod')
    .then(resp => {
      return resp.json()
    })
    .then(potd => {
      // todayPotd = potd
      document.getElementById('pic-of-the-day').style.backgroundImage = `url(${
        potd.hdUrl
      })`
      let picMeta = 'copyright: ' + potd.copyright + ' | title: ' + potd.title
      document.querySelector('.copyright-text').textContent = picMeta
    })
}

document.addEventListener('DOMContentLoaded', getBackground)
