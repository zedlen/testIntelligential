import jwt from 'jsonwebtoken'

module.exports = app => {

  const Books = app.db.models.Books;
  const Users = app.db.models.Users;
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
                }).catch(e=>{
                    res.status(500).json(e)
                })
            } else {
                res.status(409).json({msg: "No avialable copies"}); 
            }
        } else {
            res.status(404).json({msg: "Book not found"}); 
        }
    }).catch(e=>{
        res.status(500).json(e)
    })
  });
  app.post('/returnBook', app.get('protectedRoutes'), (req, res) => {
    BorrowedBooks.findOne({
        where:{
            id: req.body.loan_id,
            status: 'IN_LOAN',
            book_id: req.body.book_id
        }
    }).then(loan=>{
        if (loan !== null) {
            loan.update({
                status: 'RETURNED'
            }).then(()=>{
                Books.findOne({
                    where:{
                        id: req.body.book_id
                    }
                }).then(book => {
                    book.update({
                        availableCopies: book.availableCopies + 1
                    }).then(()=>{
                        res.status(203).send()
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

  app.get('/loans', app.get('protectedRoutes'), (req, res) => {
      
    BorrowedBooks.findAll({}).then( async loans=>{
        var complete_loans = []

        for (let index = 0; index < loans.length; index++) {
            const loan = loans[index];
            let l = {
                id: loan.id,
                book_loan_start: loan.book_loan_start,
                loan_days: loan.loan_days,
                status: loan.status,
                book_id: loan.book_id,
                user_id: loan.user_id,                
            }
            const user = await Users.findOne({where:{id:loan.user_id}})
            const book = await Books.findOne({where:{id:loan.book_id}})
            l.user_name = user.name
            l.book_name = book.name
            complete_loans.push(l)            
        }
        res.json(complete_loans)
    })
  })

  app.get('/loans/user', app.get('protectedRoutes'), (req, res) => {    
    BorrowedBooks.findAll({where:{
        user_id: req.decoded.id 
    }}).then( async loans=>{
      var complete_loans = []

      for (let index = 0; index < loans.length; index++) {
          const loan = loans[index];
          let l = {
              id: loan.id,
              book_loan_start: loan.book_loan_start,
              loan_days: loan.loan_days,
              status: loan.status,
              book_id: loan.book_id,
              user_id: loan.user_id,                
          }
          const user = await Users.findOne({where:{id:loan.user_id}})
          const book = await Books.findOne({where:{id:loan.book_id}})
          l.user_name = user.name
          l.book_name = book.name
          complete_loans.push(l)            
      }
      res.json(complete_loans)
  })
})
};