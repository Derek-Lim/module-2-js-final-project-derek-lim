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

function displayBooks() {
  myLibrary.forEach(book => {
    const cardsContainer = document.getElementById('cards-container')

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
    editBtn.setAttribute('data-bs-target', '#editBook')
    editBtn.textContent = 'Edit'
    cardFooter.appendChild(editBtn)

    const removeBtn = document.createElement('button')
    removeBtn.classList.add('btn', 'btn-danger')
    removeBtn.textContent = 'Remove'
    cardFooter.appendChild(removeBtn)
  })
}

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

displayBooks()
