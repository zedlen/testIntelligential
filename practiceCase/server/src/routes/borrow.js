import jwt from 'jsonwebtoken'

module.exports = app => {

  const Books = app.db.models.Books;
  const BorrowedBooks = app.db.models.BorrowedBooks;

  app.post('/borrow', app.get('protectedRoutes'), (req, res) => {  
    Books.findOne({
        where:{
            id: req.body.book_id
        }
    }).then(book => {
        if (book !== null) {
            if ( book.availableCopies > 0 ) {
                BorrowedBooks.create({
                    book_id: req.body.book_id,
                    user_id: req.decoded.id,
                    book_loan_start: new Date(),
                    loan_days: req.body.loan_days,
                    status: 'PENDING'
                }).then(loan => {
                    book.update({
                        availableCopies: book.availableCopies - 1
                    })
                    res.json({
                        message: 'Ok',
                        loan_id: loan.id,
                    })
                })
            } else {
                res.status(409).json({msg: "No avialable copies"}); 
            }
        } else {
            res.status(404).json({msg: "Book not found"}); 
        }
    })
  });
  app.post('/returnBook', app.get('protectedRoutes'), (req, res) => {
    BorrowedBooks.findOne({
        where:{
            id: req.body.loan_id,
            status: 'IN_LOAN',
            book_id: req.book_id
        }
    }).then(loan=>{
        if (loan !== null) {
            loan.update({
                status: 'RETURNED'
            }).then(()=>{
                Books.findOne({
                    where:{
                        id: req.book_id
                    }
                }).then(book => {
                    book.update({
                        availableCopies: book.availableCopies + 1
                    })
                })
            })
        } else {
            res.status(404).json({msg: "No loan found with required params"}); 
        }
    })
  });

  app.put('/rejectLoan', app.get('protectedRoutes'), (req, res) => {
    BorrowedBooks.findOne({
        where:{
            id: req.body.loan_id,   
            status: 'PENDING'         
        }
    }).then(loan=>{
        loan.update({
            status:'REJECTED'
        }).then(()=>{
            res.status(203).send()
        })
    })
  })

  app.put('/acceptLoan', app.get('protectedRoutes'), (req, res) => {
    BorrowedBooks.findOne({
        where:{
            id: req.body.loan_id,   
            status: 'PENDING'         
        }
    }).then(loan=>{
        loan.update({
            status:'IN_LOAN'
        }).then(()=>{
            res.status(203).send()
        })
    })
  })
};