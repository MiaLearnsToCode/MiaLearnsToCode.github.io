const init = () => {
  // queries
  const wheel = document.querySelector('#wheel')
  const ipod = document.querySelector('#ipod')
  const notification = document.querySelector('.notification')
  const closeNot = document.querySelector('#close-notification')
  const back = document.querySelector('.fast-backward')
  const next = document.querySelector('.fast-forward')
  const menuButton = document.querySelector('#menu-button')
  const playButton = document.querySelector('#play-button')
  const okButton = document.querySelector('#ok-button')

  const menu = document.querySelector('.menu')
  const content = document.querySelector('.content')

  const menuRows = Array.from(document.querySelectorAll('.choice-row'))

  //global variables
  let curr = null
  let touchCheck = null

  //HTML content for each choice
  const htmlContent = [
    {
      type: 'display',
      title: 'Hi 👋🏼',
      slides: [],
      text: 'My name is Mia, I am a Software Engineer & Teaching Assistant at General Assembly.',
      image: './assets/content/about.png'
    },
    {
      type: 'scroll',
      title: 'Skills',
      slides: [
        {
          subTitle: 'JavaScript',
          subImage: './assets/skills/javascript.png',
          link: 'https://github.com/MiaLearnsToCode'
        },
        {
          subTitle: 'React',
          subImage: './assets/skills/react.png',
          link: 'https://github.com/MiaLearnsToCode'
        },
        {
          subTitle: 'Redux',
          subImage: './assets/skills/redux.png',
          link: 'https://github.com/MiaLearnsToCode'
        },
        {
          subTitle: 'Webpack',
          subImage: './assets/skills/webpack.png',
          link: 'https://github.com/MiaLearnsToCode'
        },
        {
          subTitle: 'Python',
          subImage: './assets/skills/python.png',
          link: 'https://github.com/MiaLearnsToCode'
        },
        {
          subTitle: 'Django',
          subImage: './assets/skills/django.png',
          link: 'https://github.com/MiaLearnsToCode'
        },
        {
          subTitle: 'Node.js',
          subImage: './assets/skills/node.png',
          link: 'https://github.com/MiaLearnsToCode'
        }
      ],
      image: './assets/content/skills.png'
    },
    {
      type: 'scroll',
      title: 'Projects',
      slides: [
        {
          subTitle: 'React, React testing & APIs',
          subImage: './assets/projects/nws.png',
          link: 'https://github.com/MiaLearnsToCode/nws-app'
        },
        {
          subTitle: 'Tensorflow.js & PoseNet',
          subImage: './assets/projects/whac.png',
          link: 'https://github.com/MiaLearnsToCode/whac-a-mole'
        },
        {
          subTitle: 'React & Mapbox API',
          subImage: './assets/projects/mapbox.png',
          link: 'https://github.com/MiaLearnsToCode/mapbox-playground'
        },
        {
          subTitle: 'React, Node.js & MongoDB',
          subImage: './assets/projects/vietgram.png',
          link: 'https://github.com/MiaLearnsToCode/vietgram'
        },
        {
          subTitle: 'React, Python & PostgreSQL',
          subImage: './assets/projects/yarn.png',
          link: 'https://github.com/MiaLearnsToCode/yarn'
        },
        {
          subTitle: 'React, Node.js & MongoDB',
          subImage: './assets/projects/clanconnect.png',
          link: 'https://github.com/MiaLearnsToCode/clan-connect'
        }
      ],
      image: './assets/content/projects.png'
    },
    {
      type: 'scroll',
      title: 'Contact Me',
      slides: [
        {
          subTitle: 'GitHub',
          subImage: './assets/contact/github.png',
          link: 'https://github.com/MiaLearnsToCode'
        },
        {
          subTitle: 'Glitch',
          subImage: './assets/contact/glitch.png',
          link: 'https://glitch.com/@MiaLearnsToCode'
        },
        {
          subTitle: 'DEV',
          subImage: './assets/contact/dev.png',
          link: 'https://dev.to/miameroi'
        },
        {
          subTitle: 'Twitter',
          subImage: './assets/contact/twitter.png',
          link: 'https://twitter.com/MiaMeroi'
        },
        {
          subTitle: 'LinkedIn',
          subImage: './assets/contact/linkedin.png',
          link: 'https://www.linkedin.com/in/miameroi/'
        }
      ],
      image: 'https://31.media.tumblr.com/9e809e77bc4042f6b2f6710646f5f579/tumblr_mne0bsw6lh1ssqxwho1_400.gif'
    }
  ]

  //circular class to move throgh for menuRows and the HTML content arrays
  class Circular {
    constructor(arr) {
      this.arr = arr
      this.index = 0
    }

    current() {
      return this.arr[this.index]
    }

    next() {
      this.index = this.index < this.arr.length - 1 ? this.index + 1 : 0
      return this.current()
    }

    prev() {
      this.index = this.index > 0 ? this.index - 1 : this.arr.length - 1
      return this.current()
    }
  }

  const rows = new Circular(menuRows)

  let slides = null

  //change the background if the content div is half the screen size
  const changeContentIntro = () => {
    content.style.backgroundImage = `url(${htmlContent[rows.index].image})`
  }

  //start with first choice being highlighted
  const divCurr = rows.current()
  divCurr.classList.add('active')
  changeContentIntro()

  //move to prev item in the circular array
  const moveBack = () => {
    if (content.classList.contains('full-width')) {
      const currSlide = slides.current()
      slides.prev()
      displayContent(currSlide)
    } else {
      const divCurr = rows.current()
      const divPrev = rows.prev()
      divCurr.classList.toggle('active')
      divPrev.classList.toggle('active')
      changeContentIntro()
    }
  }

  //move to next item in the circular array
  const moveNext = () => {
    if (content.classList.contains('full-width')) {
      const currSlide = slides.current()
      slides.next()
      displayContent(currSlide)
    } else {
      const divCurr = rows.current()
      const divNext = rows.next()
      divCurr.classList.toggle('active')
      divNext.classList.toggle('active')
      changeContentIntro()
    }
  }

  //HTML templates for content
  const displayContent = (data) => {
    if (data.type === 'display') {
      content.innerHTML = `
        <div class="menu-row grey-nav">
          <div>
            <p>Mia</p>
          </div>
          <div>
            <i class="fas fa-play"></i>
            <div class="battery"></div>
          </div>
        </div>
        <h2>${data.title}</h2>
        <p class="text">${data.text}</p>
      `
    } else {
      content.innerHTML = `
        <div class="menu-row grey-nav">
          <div>
            <p>Mia</p>
          </div>
          <div>
            <i class="fas fa-play"></i>
            <div class="battery"></div>
          </div>
        </div>
        <div class="slide-wrapper"></div>
      `
      const slideWrapper = document.querySelector('.slide-wrapper')
      const slide = document.createElement('div')

      const currSlide = slides.current()
      slide.innerHTML = `
        <img src="${currSlide.subImage}"/>
        <div class='progress-bar-wrapper'>
          <div class='progress-bar'>
          </div>
        </div>
        <p>${currSlide.subTitle}</p>
      `
      slideWrapper.appendChild(slide)

      const progress = document.querySelector('.progress-bar')
      progress.style.width = `${(slides.index + 1) * 100 / htmlContent[rows.index].slides.length}%`

    }
  }

  //when you press the menu or the center button toggle the menu
  const menuToggle = () => {
    menu.classList.toggle('hide')
    content.classList.toggle('full-width')
    if (content.classList.contains('full-width')) {
      slides = new Circular(htmlContent[rows.index].slides)
      displayContent(htmlContent[rows.index])
    } else {
      content.innerHTML = ''
    }
  }

  //when you press play, open link in new tab
  const openLink = () => {
    if (slides && slides.current() && content.classList.contains('full-width')) {
      window.open(slides.current().link, '_blank')
    } else if (!content.classList.contains('full-width')) {
      menuToggle()
    }
  }

  //wheel movement
  const logMovement = (e) => {
    const pageX = e.pageX ? e.pageX : e.touches[0].clientX
    const pageY = e.pageY ? e.pageY : e.touches[0].clientY

    //distance from the center of the inner button
    const x = Math.round(pageX - window.innerWidth / 2)
    const y = Math.round(pageY - window.innerHeight * 0.6456)
    const d = 180 / Math.PI * Math.atan2(y, x)

    const newD = d % 10 === 0 ? d : curr

    if (newD - curr === 90 || newD - curr === 180 || newD - curr === -270) {
      moveNext()
    } else if (newD - curr === -90 || newD - curr === -180 || newD - curr === 270) {
      moveBack()
    }
    wheel.style.backgroundImage = `linear-gradient(${d + 90}deg, #2b2b2b, #464646)`
    wheel.style.cursor = 'grabbing'
    curr = curr !== newD ? newD : curr
  }

  // mouse events
  const handleDesktopEvents = () => {
    const swapEvents = (e) => {
      e.preventDefault()
      wheel.removeEventListener('mousedown', swapEvents)
      wheel.addEventListener('mousemove', logMovement)
    }

    const removeLog = () => {
      wheel.style.backgroundImage = 'none'
      wheel.style.cursor = 'grab'
      wheel.removeEventListener('mousemove', logMovement)
      wheel.addEventListener('mousedown', swapEvents)
    }

    wheel.addEventListener('mousedown', swapEvents)
    ipod.addEventListener('mouseup', removeLog)
  }

  //touch screen events
  const handleTouchEvents = () => {
    const swapEvents = () => {
      wheel.removeEventListener('touchstart', swapEvents, { passive: true })
      wheel.addEventListener('touchmove', logMovement, { passive: true })
    }

    const removeLog = () => {
      wheel.style.backgroundImage = 'none'
      wheel.removeEventListener('touchmove', logMovement, { passive: true })
      wheel.addEventListener('touchstart', swapEvents), { passive: true }
    }

    wheel.addEventListener('touchstart', swapEvents, { passive: true })
    ipod.addEventListener('touchend', removeLog, { passive: true })
  }

  //check if the user has a mouse or touchscreen 
  //and add event listeners accordingly
  document.addEventListener('touchstart', () => {
    touchCheck = true
    handleTouchEvents()
  }, { passive: true })

  if (!touchCheck) handleDesktopEvents()

  //click event listeners
  back.addEventListener('click', moveBack)
  next.addEventListener('click', moveNext)
  menuButton.addEventListener('click', menuToggle)
  okButton.addEventListener('click', menuToggle)
  playButton.addEventListener('click', openLink)
  closeNot.addEventListener('click', () => notification.style.display = 'none')
  setTimeout(() => {
    notification.style.display = 'flex'
  }, 2000)
}

window.addEventListener('DOMContentLoaded', init)