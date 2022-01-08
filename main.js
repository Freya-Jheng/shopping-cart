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
const shippingContent = document.querySelector('.shipping-content')
const totalShippingPrice = document.querySelector('.total-shipping-price')
const firstPrice = document.querySelector('.first-price')
const secondPrice = document.querySelector('.second-price')
const totalPrice = document.querySelector('.total-price')
const contentPanel = document.querySelector('.content-panel')

// functions
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
    addAll(cartItem)
  } 
}
function countUnit (targetEvent, cartItem) {
  const unitNum = cartItem.querySelector('.unit')
  const priceNum = cartItem.querySelector('.price-number')
  const priceNumber = priceNum.innerHTML
  if (targetEvent.matches('.add') ) {
    if(cartItem.classList.contains('first-cart')) {
      unitNum.innerHTML ++
      priceNum.innerHTML = Number(unitNum.textContent) * 3999
    } else if (cartItem.classList.contains('second-cart')) {
      unitNum.innerHTML++
      priceNum.innerHTML = Number(unitNum.textContent)* 1299
    }
  } else if (targetEvent.matches('.minus') && priceNumber > 0) {
    if (cartItem.classList.contains('first-cart')) {
      unitNum.innerHTML--
      priceNum.innerHTML = Number(unitNum.textContent) * 3999
    } else if (cartItem.classList.contains('second-cart')) {
      unitNum.innerHTML--
      priceNum.innerHTML = Number(unitNum.textContent) * 1299
    }
  }
}
function handleShippingFee (event) {
 const targetEvent = event.target
 let subShipping = 0
 const cartItem = document.querySelector('.cart')
  if (targetEvent.classList.contains('normal-shipping')) {
     subShipping = 0
  } else if (targetEvent.classList.contains('DHL-shipping')) {
     subShipping = 500
   }
  totalShippingPrice.innerHTML = subShipping
  addAll(cartItem)
}
function addAll (cartItem) {
  const shippingCarts = cartItem.closest('.shopping-cart')
  const subPrice = shippingCarts.querySelectorAll('.sub-price')
  let sum = 0
  subPrice.forEach(subPrice => {
    if (!isNaN(Number(subPrice.innerHTML))) {
      sum += Number(subPrice.innerHTML)
    }
  })
  totalPrice.innerHTML = sum
}

// add listeners
buttons.addEventListener('click', handleContentPage)
darkModeToggle.addEventListener('change', toggleDarkMode)
shippingContent.addEventListener('click', handleShippingFee)
contentPanel.addEventListener('click', handleShoppingItemUnit)