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