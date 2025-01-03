const myLibrary = []

class Book {
  constructor(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
  }
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read))
}

function updateBookDisplay() {
  const container = document.getElementById('container')
  const cardsContainer = document.createElement('div')
  container.className = 'container-fluid'
  container.innerHTML = ''

  if (myLibrary.length === 0) {
    container.classList.add('text-white', 'text-center', 'fs-1')
    container.textContent = 'Library is empty.'
  } else {
    cardsContainer.classList.add(
      'row',
      'row-cols-2',
      'row-cols-md-3',
      'row-cols-lg-4',
      'row-cols-xl-5',
      'row-cols-xxl-6',
      'g-4'
    )
    cardsContainer.setAttribute('id', 'cards-container')
    container.appendChild(cardsContainer)

    myLibrary.forEach((book, index) => {
      createCard(cardsContainer, book, index)
      createEditModal(container, book, index)
    })

    filterBooks()

    let booksDisplayStatus = []
    for (let i = 0; i < cardsContainer.children.length; i++) {
      booksDisplayStatus.push(
        cardsContainer.children[i].style.display === 'none' ? false : true
      )
    }
    if (booksDisplayStatus.every(book => !book)) {
      container.classList.add('text-white', 'text-center', 'fs-1')
      container.textContent = 'No books to show.'
    }
  }
}

function updateMenu() {
  const bookCount = document.getElementById('book-count')
  const completedCount = document.getElementById('completed-count')
  const pageCount = document.getElementById('page-count')
  const progressContainer = document.getElementById('progress-container')
  const completedLibrary = myLibrary.filter(book => book.read)
  const totalPages = myLibrary.reduce((totalPages, book) =>
    totalPages + book.pages, 0
  )
  const completedPages = completedLibrary.reduce((totalPages, book) =>
    totalPages + book.pages, 0
  )

  bookCount.textContent = myLibrary.length
  completedCount.textContent = completedLibrary.length
  pageCount.textContent = completedPages.toLocaleString() +'/' +
                          totalPages.toLocaleString()
  progressContainer.innerHTML = ''

  if (!(completedPages === 0 && totalPages === 0)) {
    const progress = document.createElement('div')
    progress.classList.add('progress')
    progressContainer.appendChild(progress)

    const progressBar = document.createElement('div')
    progressBar.classList.add(
      'progress-bar',
      'progress-bar-striped',
      'progress-bar-animated',
      'bg-success'
    )
    progressBar.style.width = `${(completedPages/totalPages) * 100}%`
    progress.appendChild(progressBar)
  }
}

function createCard(cardsContainer, book, index) {
  const cardContainer = document.createElement('div')
  cardContainer.classList.add('col')
  cardsContainer.appendChild(cardContainer)

  const card = document.createElement('div')
  card.classList.add(
    'card',
    'text-center',
    'h-100',
    'border-4',
    `${book.read ? 'border-success' : 'border-secondary'}`
  )
  cardContainer.appendChild(card)

  const cardHeader = document.createElement('div')
  cardHeader.classList.add('card-header')
  card.appendChild(cardHeader)

  const completeBtn = document.createElement('button')
  completeBtn.classList.add(
    'btn',
    `${book.read ? 'btn-success' : 'btn-secondary'}`
  )
  completeBtn.setAttribute('id', `complete-${index}`)
  completeBtn.textContent = `${book.read ? 'Completed' : 'Not Completed'}`
  completeBtn.addEventListener('click', toggleComplete)
  completeBtn.addEventListener('click', searchBooks)
  cardHeader.appendChild(completeBtn)

  const cardBody = document.createElement('div')
  cardBody.classList.add('card-body')
  card.appendChild(cardBody)

  const cardTitle = document.createElement('div')
  cardTitle.classList.add('card-title', 'fs-4')
  cardTitle.textContent = book.title
  cardBody.appendChild(cardTitle)

  const cardSubtitle = document.createElement('div')
  cardSubtitle.classList.add('card-subtitle', 'text-muted')
  cardSubtitle.textContent = book.author
  cardBody.appendChild(cardSubtitle)

  const cardText = document.createElement('div')
  cardText.classList.add('card-text')
  cardText.textContent = `${book.pages} pages`
  cardBody.appendChild(cardText)

  const cardFooter = document.createElement('div')
  cardFooter.classList.add(
    'card-footer',
    'text-muted',
    'd-flex',
    'justify-content-center',
    'gap-2'
  )
  card.appendChild(cardFooter)

  const editBtn = document.createElement('button')
  editBtn.classList.add('btn', 'btn-warning')
  editBtn.setAttribute('data-bs-toggle', 'modal')
  editBtn.setAttribute('data-bs-target', `#edit-book-modal-${index}`)
  editBtn.setAttribute('id', `edit-${index}`)
  editBtn.textContent = 'Edit'
  cardFooter.appendChild(editBtn)

  const removeBtn = document.createElement('button')
  removeBtn.classList.add('btn', 'btn-danger')
  removeBtn.setAttribute('id', `remove-${index}`)
  removeBtn.textContent = 'Remove'
  removeBtn.addEventListener('click', removeBook)
  removeBtn.addEventListener('click', searchBooks)
  cardFooter.appendChild(removeBtn)
}

function createEditModal(container, book, index) {
  const modal = document.createElement('div')
  modal.classList.add('modal', 'fade')
  modal.setAttribute('id', `edit-book-modal-${index}`)
  container.appendChild(modal)

  const modalDialog = document.createElement('div')
  modalDialog.classList.add('modal-dialog', 'modal-dialog-centered')
  modal.appendChild(modalDialog)

  const modalContent = document.createElement('div')
  modalContent.classList.add('modal-content')
  modalDialog.appendChild(modalContent)

  const modalHeader = document.createElement('div')
  modalHeader.classList.add('modal-header')
  modalContent.appendChild(modalHeader)

  const modalTitle = document.createElement('span')
  modalTitle.classList.add('modal-title', 'fs-1')
  modalTitle.textContent = 'Edit'
  modalHeader.appendChild(modalTitle)

  const modalCloseBtn = document.createElement('button')
  modalCloseBtn.classList.add('btn-close')
  modalCloseBtn.setAttribute('data-bs-dismiss', 'modal')
  modalHeader.appendChild(modalCloseBtn)

  const modalBody = document.createElement('div')
  modalBody.classList.add('modal-body')
  modalContent.appendChild(modalBody)

  const form = document.createElement('form')
  form.setAttribute('id', `edit-book-form-${index}`)
  form.addEventListener('submit', editBook)
  form.addEventListener('submit', clearSearchBar)
  modalBody.appendChild(form)

  const titleContainer = document.createElement('div')
  titleContainer.classList.add('form-floating', 'mb-3')
  form.appendChild(titleContainer)

  const titleInput = document.createElement('input')
  titleInput.classList.add('form-control')
  titleInput.setAttribute('type', 'text')
  titleInput.setAttribute('id', `title-edit-${index}`)
  titleInput.setAttribute('placeholder', '')
  titleInput.setAttribute('value', book.title)
  titleInput.setAttribute('required', '')
  titleContainer.appendChild(titleInput)

  const titleLabel = document.createElement('label')
  titleLabel.setAttribute('for', `title-edit-${index}`)
  titleLabel.textContent = 'Title'
  titleContainer.appendChild(titleLabel)

  const authorContainer = document.createElement('div')
  authorContainer.classList.add('form-floating', 'mb-3')
  form.appendChild(authorContainer)

  const authorInput = document.createElement('input')
  authorInput.classList.add('form-control')
  authorInput.setAttribute('type', 'text')
  authorInput.setAttribute('id', `author-edit-${index}`)
  authorInput.setAttribute('placeholder', '')
  authorInput.setAttribute('value', book.author)
  authorInput.setAttribute('required', '')
  authorContainer.appendChild(authorInput)

  const authorLabel = document.createElement('label')
  authorLabel.setAttribute('for', `author-edit-${index}`)
  authorLabel.textContent = 'Author'
  authorContainer.appendChild(authorLabel)

  const pagesContainer = document.createElement('div')
  pagesContainer.classList.add('form-floating', 'mb-3')
  form.appendChild(pagesContainer)

  const pagesInput = document.createElement('input')
  pagesInput.classList.add('form-control')
  pagesInput.setAttribute('type', 'number')
  pagesInput.setAttribute('id', `pages-edit-${index}`)
  pagesInput.setAttribute('placeholder', '')
  pagesInput.setAttribute('value', book.pages)
  pagesInput.setAttribute('required', '')
  pagesInput.setAttribute('min', 5)
  pagesInput.setAttribute('max', 5000)
  pagesContainer.appendChild(pagesInput)

  const pagesLabel = document.createElement('label')
  pagesLabel.setAttribute('for', `pages-edit-${index}`)
  pagesLabel.textContent = 'Pages'
  pagesContainer.appendChild(pagesLabel)

  const completedContainer = document.createElement('div')
  completedContainer.classList.add('form-check', 'mb-3')
  form.appendChild(completedContainer)

  const completedInput = document.createElement('input')
  completedInput.classList.add('form-check-input')
  completedInput.setAttribute('type', 'checkbox')
  completedInput.setAttribute('id', `completed-edit-${index}`)
  if (book.read) completedInput.setAttribute('checked', '')
  completedContainer.appendChild(completedInput)

  const completedLabel = document.createElement('label')
  completedLabel.classList.add('form-check-label')
  completedLabel.setAttribute('for', `completed-edit-${index}`)
  completedLabel.textContent = 'Completed'
  completedContainer.appendChild(completedLabel)

  const submitBtnContainer = document.createElement('div')
  submitBtnContainer.classList.add('d-grid', 'col-6', 'mx-auto', 'mt-4')
  form.appendChild(submitBtnContainer)

  const submitBtn = document.createElement('button')
  submitBtn.classList.add('btn', 'btn-primary')
  submitBtn.setAttribute('type', 'submit')
  submitBtn.textContent = 'Confirm'
  submitBtnContainer.appendChild(submitBtn)
}

function submitNewBook(e) {
  e.preventDefault()

  const newBookModal = document.getElementById('new-book-modal')
  const title = document.getElementById('title-add')
  const author = document.getElementById('author-add')
  const pages = document.getElementById('pages-add')
  const completed = document.getElementById('completed-add')

  if (myLibrary.filter(
    book => book.title.toLowerCase() === title.value.toLowerCase() &&
            book.author.toLowerCase() === author.value.toLowerCase()
  ).length > 0) {
    alert('Book already exists.')
  } else {
    addBookToLibrary(title.value, author.value, +pages.value, completed.checked)
  
    title.value = ''
    author.value = ''
    pages.value = ''
    completed.checked = false
  
    bootstrap.Modal.getInstance(newBookModal).hide()
  
    updateBookDisplay()
    updateMenu()
  }
}

function toggleComplete(e) {
  const index = e.target.id.charAt(e.target.id.length - 1)
  myLibrary[index].read = myLibrary[index].read ? false : true

  updateBookDisplay()
  updateMenu()
}

function editBook(e) {
  e.preventDefault()

  const index = e.target.id.charAt(e.target.id.length - 1)
  const editBookModal = document.getElementById(`edit-book-modal-${index}`)
  const title = document.getElementById(`title-edit-${index}`)
  const author = document.getElementById(`author-edit-${index}`)
  const pages = document.getElementById(`pages-edit-${index}`)
  const completed = document.getElementById(`completed-edit-${index}`)

  if (myLibrary.filter(
    (book, i) => book.title.toLowerCase() === title.value.toLowerCase() &&
                book.author.toLowerCase() === author.value.toLowerCase() &&
                i != index
  ).length > 0) {
    alert('Book already exists.')
  } else {
    myLibrary[index].title = title.value
    myLibrary[index].author = author.value
    myLibrary[index].pages = +pages.value
    myLibrary[index].read = completed.checked
  
    title.value = ''
    author.value = ''
    pages.value = ''
    completed.checked = false
  
    bootstrap.Modal.getInstance(editBookModal).hide()
  
    updateBookDisplay()
    updateMenu()
  }
}

function removeBook(e) {
  myLibrary.splice(e.target.id.charAt(e.target.id.length - 1), 1)

  updateBookDisplay()
  updateMenu()
}

function removeAllBooks() {
  const menu = document.getElementById('menu')
  const confirmResetModal = document.getElementById('confirm-reset')

  bootstrap.Offcanvas.getInstance(menu).hide()
  bootstrap.Modal.getInstance(confirmResetModal).hide()
  
  while (myLibrary.length > 0) myLibrary.pop()

  updateMenu()
  updateBookDisplay()
}

function searchBooks() {
  const cardsContainer = document.getElementById('cards-container')

  for (const card of cardsContainer.children) {
    const text = document.getElementById('search-bar').value
    const title = card.querySelector('.card-title').textContent
    const author = card.querySelector('.card-subtitle').textContent
    
    if (title.toLowerCase().indexOf(text.toLowerCase()) !== -1 ||
        author.toLowerCase().indexOf(text.toLowerCase()) !== -1) {
      card.style.display = 'block'
    } else {
      card.style.display = 'none'
    }
  }

  filterBooks()
}

function clearSearchBar() {
  const searchBar = document.getElementById('search-bar')
  searchBar.value = ''
}

function updateActive(menu, e) {
  for (const item of menu.children) {
    item.firstElementChild.classList.remove('active')
  }
  e.target.classList.add('active')

  updateBookDisplay()
}

function filterBooks() {
  const cardsContainer = document.getElementById('cards-container')
  const filterMenu = document.getElementById('filter-menu')
  const active = filterMenu.querySelector('.active').id

  if (active === 'read') {
    const unreadIndexes = []
    myLibrary.forEach((book, index) => {
      if (!book.read) {
        unreadIndexes.push(index)
      }
    })
    unreadIndexes.forEach(i => {
      cardsContainer.children[i].style.display = 'none'
    })
  } else if (active === 'unread') {
    const readIndexes = []
    myLibrary.forEach((book, index) => {
      if (book.read) {
        readIndexes.push(index)
      }
    })
    readIndexes.forEach(i => {
      cardsContainer.children[i].style.display = 'none'
    })
  }
}

function initialRender() {
  const newBookForm = document.getElementById('new-book-form')
  newBookForm.addEventListener('submit', submitNewBook)
  newBookForm.addEventListener('submit', clearSearchBar)

  const resetBtn = document.getElementById('reset-btn')
  resetBtn.addEventListener('click', removeAllBooks)
  resetBtn.addEventListener('click', clearSearchBar)

  const searchBar = document.getElementById('search-bar')
  searchBar.addEventListener('input', searchBooks)

  const filterMenu = document.getElementById('filter-menu')
  for (const item of filterMenu.children) {
    item.firstElementChild.addEventListener(
      'click', 
      updateActive.bind(this, filterMenu)
    )
  }
  filterMenu.addEventListener('click', clearSearchBar)
  
  addBookToLibrary(
    'The Pragmatic Programmer',
    'David Thomas, Andrew Hunt',
    352,
    true
  )
  addBookToLibrary(
    'Code Complete',
    'Steve McConnell',
    960,
    false
  )
  addBookToLibrary(
    'Git & GitHub Visual Guide',
    'Ben Bloomfield, David Ocean, Atlas Skylark, Valeria Celis',
    514,
    true
  )
  addBookToLibrary(
    'C Programming Language',
    'Kernighan Brian W., Ritchie Dennis',
    279,
    false
  )
  
  updateBookDisplay()
  updateMenu()
}

initialRender()
