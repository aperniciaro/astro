let copyrightText = ''

class Launch {
  constructor(launchInfo) {
    this.launchName = launchInfo.mission_name
    this.launchDescription = launchInfo.details
    this.launchTime = launchInfo.launch_date_local
    this.launchLocation = launchInfo.launch_site.site_name_long
  }
}

const main = () => {
  getBackground()
  getLaunches()
}

const getBackground = () => {
  fetch('https://sdg-astro-api.herokuapp.com/api/Nasa/apod')
    .then(resp => {
      return resp.json()
    })
    .then(potd => {
      document.getElementById('pic-of-the-day').style.backgroundImage = `url(${
        potd.hdUrl
      })`
      if (potd.copyright == null) {
        copyrightText = 'no copyright'
      } else {
        copyrightText = potd.copyright
      }
      document.querySelector('.copyright-text').textContent =
        'copyright: ' + copyrightText + ' | title: ' + potd.title
    })
}

const getLaunches = () => {
  fetch('https://sdg-astro-api.herokuapp.com/api/SpaceX/launches/upcoming')
    .then(resp => {
      return resp.json()
    })
    .then(launches => {
      for (let i = 0; i < launches.length; i++) {}
    })
}

document.addEventListener('DOMContentLoaded', main)
