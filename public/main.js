let copyrightText = ''
let launchIndex = 0
let launchArray = []

class Launch {
  constructor(launchInfo) {
    this.launchName = launchInfo.mission_name
    this.launchDescription = launchInfo.details
    //make launch time a countdown
    this.launchTime = launchInfo.launch_date_utc
    this.launchLocation = launchInfo.launch_site.site_name_long
  }
}

const main = () => {
  getBackground()
  getLaunches()
  console.log(launchArray)
  render(launchIndex)
}

const navigate = direction => {
  console.log(direction)
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
  console.log(launchIndex)
  render(launchIndex)
}

const render = index => {
  const parent = document.querySelector('.launch-data')
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
  //launch name
  const nameElement = document.createElement('section')
  nameElement.classList.add('launch-element')
  nameElement.classList.add('name-element')
  parent.appendChild(nameElement)

  const nameLogo = document.createElement('i')
  nameLogo.classList.add('fas fa-space-shuttle')
  nameElement.appendChild(nameLogo)

  const nameText = document.createElement('h3')
  nameText.classList.add('launch-name')
  nameElement.appendChild(nameText)
  //launch descr
  const descriptionElement = document.createElement('section')
  descriptionElement.classList.add('launch-element')
  descriptionElement.classList.add('description-element')
  parent.appendChild(descriptionElement)

  const descriptionLogo = document.createElement('i')
  descriptionLogo.classList.add('fas fa-info-circle')
  descriptionElement.appendChild(descriptionLogo)

  const descriptionText = document.createElement('p')
  descriptionText.classList.add('launch-description')
  descriptionElement.appendChild(descriptionText)

  const nameElement = document.createElement('section')
  nameElement.classList.add('launch-element')
  nameElement.classList.add('name-element')
  parent.appendChild(nameElement)

  const nameLogo = document.createElement('i')
  nameLogo.classList.add('fas fa-space-shuttle')
  nameElement.appendChild(nameLogo)

  const nameText = document.createElement('h3')
  nameText.classList.add('launch-name')
  nameElement.appendChild(nameText)

  const nameElement = document.createElement('section')
  nameElement.classList.add('launch-element')
  nameElement.classList.add('name-element')
  parent.appendChild(nameElement)

  const nameLogo = document.createElement('i')
  nameLogo.classList.add('fas fa-space-shuttle')
  nameElement.appendChild(nameLogo)

  const nameText = document.createElement('h3')
  nameText.classList.add('launch-name')
  nameElement.appendChild(nameText)

  //   <section class="launch-element">
  //     <i class="fas fa-info-circle"></i>
  //     <p class="launch-description">launch description</p>
  //   </section>
  //   <section class="launch-element">
  //     <i class="fas fa-clock"></i>
  //     <p class="launch-time">countdown</p>
  //   </section>
  //   <section class="launch-element">
  //     <i class="fas fa-map-marked-alt"></i>
  //     <p class="launch-location">launch location</p>
  //   </section>
  // </section>
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
      for (let i = 0; i < launches.length; i++) {
        launchArray[i] = launches[i]
      }
    })
}

document
  .querySelector('.left-arrow')
  .addEventListener('click', () => navigate('left'))
console.log('left click')
document
  .querySelector('.right-arrow')
  .addEventListener('click', () => navigate('right'))
console.log('right click')
document.addEventListener('DOMContentLoaded', main)
