// Takes in an array and reduces it for each value of the array
function arrayReducer(array) 
{
  // returns single value which is the function's accumulated result
  return array.reduce(counter => (counter += 1), 0);
}

// Calls the helper function to find the total amount of books
function getTotalBooksCount(books) 
{
  return arrayReducer(books);
}

// Calls the helper function to get the total amount of accounts
function getTotalAccountsCount(accounts) 
{
  return arrayReducer(accounts);
}

// Finds out how many books have been currently borrowed
function getBooksBorrowedCount(books) 
{
  // Filters through the books array and then the borrows array
  // Returns the length of the filter array based on the find results
  return books.filter(book => book.borrows.find(borrow => borrow.returned == false)).length;
}

// Finds the most common genres
function getMostCommonGenres(books, counter = 5) 
{
  const result = [];
  // creates a new array based on the results of the function
  books.map(book => 
  {
    // finds the genre's index location if it exists
    const genreLocation = result.findIndex(element => element.name === book.genre); 
    // if it exists increase the count
    if (genreLocation >= 0) 
    {
      result[genreLocation].count += 1;
    }
    // else push this object into the result array
    else 
    {
      result.push({ name: book.genre, count: 1 });
    }
  });

  // sorts the result array from highest to lowest
  result.sort((genreA, genreB) => genreB.count - genreA.count);

  // returns the sliced array from 0 to the passed in counter value
  return result.slice(0, counter);
}

// Finds the most popular books based on the amount of times it was borrowed
function getMostPopularBooks(books, counter = 5) 
{
  // creates a new result array with the following object embedded
  const result = books.map(book => 
  ({
    name: book.title,
    count: book.borrows.length,
  }));

  // sorts the result array from highest to lowest based on the count
  result.sort((bookA, bookB) => bookB.count - bookA.count);

  // returns the result array sliced from 0 to the passed in counter value
  return result.slice(0, counter);
}

// Finds the most popular authors based on the amount of times their books were checked out
function getMostPopularAuthors(books, authors, counter = 5) 
{
  const result = [];
  // loops through each author
  authors.forEach(author => 
    {
    // creates a temp author
    const tempAuthor = 
    {
      name: `${author.name.first} ${author.name.last}`,
      count: 0,
    };
    // loops through each book
    books.forEach(book => 
    {
      // if the ID's match increase the count variable
      if (book.authorId === author.id) 
      {
        tempAuthor.count += book.borrows.length;
      }
    });
    // then push the temp author into the result array
    result.push(tempAuthor);
  });

  // sorts the result array from highest to lowest based on the count
  result.sort((authorA, authorB) => authorB.count - authorA.count);

  // returns the array sliced from 0 to the counter variable
  return result.slice(0, counter);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
