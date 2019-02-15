let copyrightText = ''
let launchIndex = 0
let launchArray = []

class Launch {
  constructor(launchInfo) {
    this.launchName = launchInfo.mission_name
    if (launchInfo.details == null) {
      this.launchDescription = 'No description available yet.'
    } else {
      this.launchDescription = launchInfo.details
    }
    //make launch time a countdown
    this.launchTime = launchInfo.launch_date_utc
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
      console.log(2)
      return resp.json()
    })
    .then(launches => {
      console.log(3)
      for (let i = 0; i < launches.length; i++) {
        launchArray.push(new Launch(launches[i]))
      }
      render(launchIndex)
    })
}

const navigate = direction => {
  if (direction === 'right') {
    if (launchIndex === launchArray.length - 1) {
      launchIndex = 0
    } else {
      launchIndex++
    }
  } else if (direction === 'left') {
    if (launchIndex === 0) {
      launchIndex = launchArray.length - 1
    } else {
      launchIndex--
    }
  }
  render(launchIndex)
}

const countdown = () => {}

const render = index => {
  const parent = document.querySelector('.launch-data')
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
  //launch name
  const nameElement = document.createElement('span')
  nameElement.classList.add('launch-element')
  nameElement.classList.add('name-element')
  parent.appendChild(nameElement)

  const nameLogo = document.createElement('i')
  nameLogo.classList.add('fas')
  nameLogo.classList.add('fa-space-shuttle')
  nameElement.appendChild(nameLogo)

  const nameText = document.createElement('h3')
  nameText.classList.add('launch-name')
  nameText.textContent = launchArray[index].launchName
  nameElement.appendChild(nameText)
  //launch descr
  const descriptionElement = document.createElement('span')
  descriptionElement.classList.add('launch-element')
  descriptionElement.classList.add('description-element')
  parent.appendChild(descriptionElement)

  const descriptionLogo = document.createElement('i')
  descriptionLogo.classList.add('fas')
  descriptionLogo.classList.add('fa-info-circle')
  descriptionElement.appendChild(descriptionLogo)

  const descriptionText = document.createElement('p')
  descriptionText.classList.add('launch-description')
  descriptionText.textContent = launchArray[index].launchDescription
  descriptionElement.appendChild(descriptionText)
  //launch time
  const timeElement = document.createElement('span')
  timeElement.classList.add('launch-element')
  timeElement.classList.add('time-element')
  parent.appendChild(timeElement)

  const timeLogo = document.createElement('i')
  timeLogo.classList.add('fas')
  timeLogo.classList.add('fa-clock')
  timeElement.appendChild(timeLogo)

  const timeText = document.createElement('p')
  timeText.classList.add('launch-time')
  timeText.textContent = launchArray[index].launchTime
  timeElement.appendChild(timeText)
  //launch location
  const locationElement = document.createElement('span')
  locationElement.classList.add('launch-element')
  locationElement.classList.add('location-element')
  parent.appendChild(locationElement)

  const locationLogo = document.createElement('i')
  locationLogo.classList.add('fas')
  locationLogo.classList.add('fa-map-marked-alt')
  locationElement.appendChild(locationLogo)

  const locationText = document.createElement('p')
  locationText.classList.add('launch-location')
  locationText.textContent = launchArray[index].launchLocation
  locationElement.appendChild(locationText)
}

document
  .querySelector('.left-arrow')
  .addEventListener('click', () => navigate('left'))
document
  .querySelector('.right-arrow')
  .addEventListener('click', () => navigate('right'))
document.addEventListener('DOMContentLoaded', main)
