let copyrightText = ''
let launchIndex = 0

class Launch {
  constructor(launchInfo) {
    this.launchName = launchInfo.mission_name
    this.launchDescription = launchInfo.details
    //make launch time a countdown
    this.launchTime = launchInfo.launch_date_local
    this.launchLocation = launchInfo.launch_site.site_name_long
  }
}

const main = () => {
  getBackground()
  getLaunch(0)
}

const navigate = direction => {
  //iterate pos or neg in launch array
  //getLaunch(i)
}

const render = () => {
  //output launch-data section
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

const getLaunch = index => {
  fetch('https://sdg-astro-api.herokuapp.com/api/SpaceX/launches/upcoming')
    .then(resp => {
      return resp.json()
    })
    .then(launches => {
      //make launch element from json[index]
      //render launch
    })
}

document.addEventListener('DOMContentLoaded', main)
document.querySelector('.left-arrow').addEventListener('click', navigate(left))
document
  .querySelector('.right-arrow')
  .addEventListener('click', navigate(right))
