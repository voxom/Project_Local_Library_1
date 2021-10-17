// Finds the author by matching the author's id with the passed in id
function findAuthorById(authors, id) 
{
  return authors.find(author => author.id == id);
}

// Finds the book by matching the book's id with the passed in id
function findBookById(books, id) 
{
  return books.find(book => book.id == id);
}

// Returns an array with two arrays inside of it
function partitionBooksByBorrowedStatus(books) 
{
  // creates and finds the books that have been returned
  const booksReturned = books.filter(book =>
    book.borrows.every(borrow => borrow.returned === true)
  );

  // creates and finds the books that have yet to be returned
  const booksBorrowed = books.filter(book =>
    book.borrows.some(borrow => borrow.returned === false)
  );
  // returns the array with the newly created variables
  return [[...booksBorrowed], [...booksReturned]];
}

// Finds the borrows for the book
function getBorrowersForBook(book, accounts, counter = 10) 
{
  // returns the sliced map array
  return book.borrows.map(borrow => 
  {
    // creates and finds the matching id's
    const account = accounts.find(account => account.id === borrow.id);
    // returns the borrow and account object
    return { ...borrow, ...account };
  }).slice(0, counter); // slice slice
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
