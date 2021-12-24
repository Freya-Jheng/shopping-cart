// varies
const shoppingCart = document.querySelector('.shopping-cart')
const formList = document.querySelectorAll('.infor')
let activePageIndex = 0
const buttons = document.querySelector('.buttons')
const stepsList = document.querySelectorAll('.step')
const stepperPanel = document.querySelector('.stepper-panel')
const backToPageBtn = document.querySelector('.back-to')
const nextToPageBtn = document.querySelector('.next-to')
const header = document.querySelector('.navbar-icons')
const darkModeToggle = header.querySelector('#dark-mode-toggle')

// function
function toggleDarkMode (event){
  const darkMode = header.querySelector('.moon')
  const lightMode = header.querySelector('.sun')
  const eventTarget = event.target
  if (eventTarget.checked) {
    document.documentElement.setAttribute('dark-theme', 'dark')
  } else {
    document.documentElement.setAttribute('dark-theme', 'light')
  }
  darkMode.classList.toggle('d-none')
  lightMode.classList.toggle('d-none')
}

function handleContentPage (event) {
  event.preventDefault()
  const targetEvent = event.target

  // back to the page
  if (targetEvent.classList.contains('back-to') && activePageIndex > 0) {
    const nextPage = formList[activePageIndex-1]
    updateFormStyle (nextPage)
    activePageIndex --
    changeStepper(activePageIndex)
    btnStyleChange(activePageIndex)

  // next to the page 
  } else if (targetEvent.classList.contains('next-to') && activePageIndex < formList.length - 1) {
    const nextPage = formList[activePageIndex + 1]
    updateFormStyle (nextPage)
    activePageIndex ++
    changeStepper (activePageIndex)
    btnStyleChange (activePageIndex)
  }
}
function btnStyleChange (currentPageIndex) {
  if (currentPageIndex === 0) {
    backToPageBtn.classList.add('opacity')
  } else if (currentPageIndex <= formList.length - 1) {
    backToPageBtn.classList.remove('opacity')
  } 
  if (currentPageIndex === 2) {
    nextToPageBtn.firstChild.innerHTML = '確認下訂單'
    nextToPageBtn.classList.add('submit-form')
  } else {
    nextToPageBtn.firstChild.innerHTML = '下一步'
  }
}

function changeStepper(currentPageIndex) {
  stepsList.forEach((step, stepIndex)=>{
    step.classList.remove('active')
    if (stepIndex < currentPageIndex) {
      step.classList.add('checked')
    }
  })

  stepsList[currentPageIndex].classList.remove('checked')
  stepsList[currentPageIndex].classList.add('active')
}

function updateFormStyle (nextPage) {
  const currentPage = formList[activePageIndex]
  currentPage.classList.add('d-none')
  nextPage.classList.remove('d-none')
}

function handleShoppingItemUnit (event) {
  const targetEvent = event.target
  if (targetEvent.matches('.unit-controller')){
    const cartItem = targetEvent.closest('.cart')
    countUnit(targetEvent, cartItem)
  }
}

function countUnit (targetEvent, cartItem) {
  const unit = cartItem.querySelector('.unit')
  const unitNum = unit.innerHTML
  if(targetEvent.matches('.minus') && unitNum > 0) {
    unit.innerHTML --
  } else if (targetEvent.matches('.add')) {
    unit.innerHTML ++
  }
} 

// add listener
shoppingCart.addEventListener('click', handleShoppingItemUnit)
buttons.addEventListener('click', handleContentPage)
darkModeToggle.addEventListener('change', toggleDarkMode)
