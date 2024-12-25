const myLibrary = []

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read))
}

function updateBookDisplay() {
  const container = document.getElementById('container')
  container.innerHTML = ''
  const cardsContainer = document.createElement('div')
  cardsContainer.classList.add(
    'row',
    'row-cols-2',
    'row-cols-md-3',
    'row-cols-lg-4',
    'row-cols-xl-5',
    'row-cols-xxl-6',
    'g-4'
  )
  container.appendChild(cardsContainer)
  
  myLibrary.forEach((book, index) => {
    createCard(cardsContainer, book, index)
    createEditModal(container, index)
  })
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

  const completeStatus = document.createElement('button')
  completeStatus.classList.add(
    'btn',
    `${book.read ? 'btn-success' : 'btn-secondary'}`
  )
  completeStatus.textContent = `${book.read ? 'Completed' : 'Not Completed'}`
  cardHeader.appendChild(completeStatus)

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
  cardFooter.appendChild(removeBtn)
}

function createEditModal(container, index) {
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
  modalBody.appendChild(form)

  const titleContainer = document.createElement('div')
  titleContainer.classList.add('form-floating', 'mb-3')
  form.appendChild(titleContainer)

  const titleInput = document.createElement('input')
  titleInput.classList.add('form-control')
  titleInput.setAttribute('type', 'text')
  titleInput.setAttribute('id', `title-edit-${index}`)
  titleInput.setAttribute('placeholder', '')
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

  addBookToLibrary(title.value, author.value, pages.value, completed.checked)

  title.value = ''
  author.value = ''
  pages.value = ''
  completed.checked = false

  bootstrap.Modal.getInstance(newBookModal).hide()

  updateBookDisplay()
}

function editBook(e) {
  e.preventDefault()

  const index = e.target.id.charAt(e.target.id.length - 1)
  const editBookModal = document.getElementById(`edit-book-modal-${index}`)
  const title = document.getElementById(`title-edit-${index}`)
  const author = document.getElementById(`author-edit-${index}`)
  const pages = document.getElementById(`pages-edit-${index}`)
  const completed = document.getElementById(`completed-edit-${index}`)

  myLibrary[index].title = title.value
  myLibrary[index].author = author.value
  myLibrary[index].pages = pages.value
  myLibrary[index].read = completed.checked

  title.value = ''
  author.value = ''
  pages.value = ''
  completed.checked = false

  bootstrap.Modal.getInstance(editBookModal).hide()

  updateBookDisplay()
}

function removeBook(e) {
  myLibrary.splice(e.target.id.charAt(e.target.id.length - 1), 1)
  updateBookDisplay()
}

function initialRender() {
  const newBookForm = document.getElementById('new-book-form')
  newBookForm.addEventListener('submit', submitNewBook)
  
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
    true
  )
  
  updateBookDisplay()
}

initialRender()
