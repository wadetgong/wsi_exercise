// Set up page state
const state = [
  {
    image: 'assets/product-large-a.jpg',
    thumbnail: 'assets/product-small-a.jpg',
    name: 'Williams-Sonoma Class Apron, French Blue'
  }, {
    image: 'assets/product-large-b.jpg',
    thumbnail: 'assets/product-small-b.jpg',
    name: 'Williams-Sonoma Class Apron, Pinstripe'
  }, {
    image: 'assets/product-large-c.jpg',
    thumbnail: 'assets/product-small-c.jpg',
    name: 'Williams-Sonoma Class Apron, Lime Green'
  }, {
    image: 'assets/product-large-d.jpg',
    thumbnail: 'assets/product-small-d.jpg',
    name: 'Williams-Sonoma Class Apron, Red'
  },
]
let activeProduct = state[0]
let cartItems = {}

// Helper function to create thumbnail element
const createThumbnail = product => {
  const thumbnail = document.createElement('a')
  thumbnail.href = '#'
  thumbnail.classList.add('product-image-carousel-thumbnail')
  const thumbnailImg = document.createElement('img')
  thumbnailImg.src = product.thumbnail
  thumbnail.append(thumbnailImg)
  return thumbnail
}

// Helper function to create main image element
const createMainImage = product => {
  const image = document.createElement('img')
  image.src = product.image
  image.classList.add('product-image', 'product-image-hidden')
  return image
}

// Helper function combining createThumbnail and createMainImage
createElements = product => ({
  thumbnail: createThumbnail(product),
  mainImage: createMainImage(product)
})

const carousel = document.querySelector('#product-image-carousel')
const mainImgContainer = document.querySelector('#product-image-main')
const productName = document.querySelector('#product-description-title')
const breadcrumbName = document.querySelector('.breadcrumb li:last-child')

// Create respective elements per product and add them to the DOM
state.forEach(product => {
  const { thumbnail, mainImage } = createElements(product)
  carousel.append(thumbnail)
  mainImgContainer.append(mainImage)
  thumbnail.addEventListener('click', evt => {
    evt.preventDefault()
    if (!thumbnail.classList.contains('product-image-carousel-active')) {
      activeProduct = product
      clearActiveThumbs()
      thumbnail.classList.add('product-image-carousel-active')
      clearMainImages()
      mainImage.classList.remove('product-image-hidden')
      productName.innerText = product.name
      breadcrumbName.innerText = product.name
    }
  })
})

// Set up initial active product
carousel.children[0].classList.add('product-image-carousel-active')
mainImgContainer.children[0].classList.remove('product-image-hidden')

// JS for toggle buttons
const toggles = [...document.querySelectorAll('.collapsable-toggle')]

toggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    let collapsableSection = toggle.parentElement.parentElement
    if (collapsableSection.classList.contains('collapsable-expanded')) {
      collapsableSection.classList.remove('collapsable-expanded')
      collapsableSection
        .querySelector('.description-detail-header')
        .innerText = 'Collapsed'
    } else {
      collapsableSection.classList.add('collapsable-expanded')
      collapsableSection
        .querySelector('.description-detail-header')
        .innerText = 'Expanded'
    }
  })
})

// Helper functions to clear the active thumbnail and image
const thumbnails = [...document.querySelectorAll('.product-image-carousel-thumbnail')]
const mainImages = [...document.querySelectorAll('.product-image')]


const clearActiveThumbs = () => {
  thumbnails.forEach(thumbnail => {
    thumbnail.classList.remove('product-image-carousel-active')
  })
}

const clearMainImages = () => {
  mainImages.forEach(image => {
    image.classList.add('product-image-hidden')
  })
}

// JS for add product to cart
const addCartItem = (product, quantity) => {
  if (!quantity) return
  if (cartItems[product.name]) {
    cartItems[product.name].quantity += quantity
  }
  else {
    cartItems[product.name] = {}
    cartItems[product.name].quantity = quantity
    cartItems[product.name].product = product
  }
}

// JS to add product details for an individual product in the cart
const createCartRow = (product, quantity) => {
  console.log(product)
  const rowDiv = document.createElement('div')
  rowDiv.classList.add('cart-summary-row')

  const imageDiv = document.createElement('div')
  imageDiv.classList.add('cart-column-image', 'cart-summary-row-image')
  const image = document.createElement('img')
  image.src = product.thumbnail
  imageDiv.append(image)

  const nameDiv = document.createElement('div')
  nameDiv.classList.add('cart-column-name', 'cart-summary-row-name')
  nameDiv.innerText = product.name

  const quantityDiv = document.createElement('div')
  quantityDiv.classList.add('cart-column-quantity', 'cart-summary-row-quantity')
  quantityDiv.innerText = quantity

  rowDiv.append(imageDiv)
  rowDiv.append(nameDiv)
  rowDiv.append(quantityDiv)
  return rowDiv
}

const addCart = document.querySelector('#product-add')
const quantity = document.querySelector('#product-cart-quantity')
const modal = document.querySelector('.modal')
const cartSummary = document.querySelector('#cart-items-container')

// Open modal and update information when add to cart is clicked
addCart.addEventListener('click', () => {
  addCartItem(activeProduct, parseInt(quantity.value, 10))
  modal.style.display = 'block'

  while (cartSummary.firstChild) {
    cartSummary.removeChild(cartSummary.firstChild)
  }

  console.log('cartItems', cartItems)
  if (Object.keys(cartItems).length) {
    for (let key in cartItems) {
      const { product, quantity } = cartItems[key]
      cartSummary.append(createCartRow(product, quantity))
    }
  } else {
    const noItemsMsg = document.createElement('h3')
    noItemsMsg.innerText = 'Your cart is currently empty.'
    cartSummary.append(noItemsMsg)
  }
})

// Modal logic
const closeModal = document.querySelector('#close-modal')
closeModal.onclick = function() {
  modal.style.display = 'none'
}

window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = 'none'
  }
}
