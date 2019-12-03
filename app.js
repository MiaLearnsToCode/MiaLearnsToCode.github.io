function init() {
  let eyes = document.querySelectorAll('.eye')
  let pupils = document.querySelectorAll('.pupil')
  let hands = document.querySelectorAll('.hand')
  const tail = document.querySelector('.tail')
  let projects = document.querySelectorAll('.project')

  eyes = Array.from(eyes)
  pupils = Array.from(pupils)
  hands = Array.from(hands)
  projects = Array.from(projects)

  projects.forEach(project => {
    const children = Array.from(project.children)
    const screenshot = children[0]
    const snippet = children[1]

    screenshot.addEventListener('click', () => {
      screenshot.classList.add('hide')
      snippet.classList.remove('hide')
    })

    snippet.addEventListener('click', () => {
      snippet.classList.add('hide')
      screenshot.classList.remove('hide')
    })
  })


  setInterval(() => {
    eyes.map(eye => {
      if (eye.style.display === 'none') {
        eye.style.display = 'block'
      } else {
        eye.style.display = 'none'
      }
    })
    pupils.map(pupil => {
      if (pupil.style.display === 'none') {
        pupil.style.display = 'block'
        tail.style.borderRadius = '0px 0px 50px 10px'
      } else {
        pupil.style.display = 'none'
        tail.style.borderRadius = '0px 0px 60px 20px'
      }
    })
    hands.map(hand => {
      if (hand.style.top === '340px') {
        hand.style.top = '335px'
      } else {
        hand.style.top = '340px'
      }
    })
    
  }, 1500)

  

}

window.addEventListener('DOMContentLoaded', init)