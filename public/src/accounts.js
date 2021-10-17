// Finds the account that matches the passed in ID
function findAccountById(accounts, id) 
{
  return accounts.find(account => account.id == id);
}

// returns a sorted accounts array based on the last name
function sortAccountsByLastName(accounts) 
{
  return accounts.sort((accountA, accountB) => accountA.name.last > accountB.name.last ? 1 : -1);
}

// Finds the total number of borrows
function getTotalNumberOfBorrows({id}, books) 
{
  // filters the book array and then finds the borrowers id and if it matches
  // return the length from the filter array
  return books.filter(book => book.borrows.find(borrow => borrow.id == id)).length;
}

function getBooksPossessedByAccount(account, books, authors) 
{ 
  const results = [];
  // filters the book array and then the borrows array
  books.filter(book => book.borrows.some(borrow => 
  { 
    // if the id's match and the borrow status is false
    if (borrow.id === account.id && !borrow.returned) 
    { 
      // creates and filters the authors array and if the id's match add it to the author array
      const author = authors.filter(author => author.id === book.authorId);
      // creates a temp object with the new author and plops the rest of the book on using the spread operator
      const tempObject = { author: author[0], ...book };
      // then push the temp object into the results array
      results.push(tempObject);
    } 
  }));
  return results;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
