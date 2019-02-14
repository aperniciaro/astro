// let todayPotd = {}
let copyText = ''

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
      if (potd.copyright == null) {
        copyText = 'no copyright'
      } else {
        copyText = potd.copyright
      }
      document.querySelector('.copyright-text').textContent =
        'copyright: ' + copyText + ' | title: ' + potd.title
    })
}

document.addEventListener('DOMContentLoaded', getBackground)
