describe('Blog app', function() {
    let testUser
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      
      testUser = {
        username:'test',
        password:'123',
        name:'Testi'
      }

      cy.request('POST', 'http://localhost:3003/api/users', testUser)
      cy.visit('http://localhost:3003')
    })
  
    it('Login form is shown', function() {
      cy.contains('login')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {

           cy.login({username: testUser.username, password: testUser.password})
        
            cy.contains(testUser.name + ' logged in')
        })
    
        it('fails with wrong credentials', function() {
            cy.login({username: testUser.username, password: 'vaaraSalasana'})
        
            cy.contains('wrong username or password')

            cy.login({username: 'vaaraKayttaja', password: testUser.password})
        
            cy.contains('wrong username or password')
        })
    })

    describe.only('When logged in', function() {
        beforeEach(function() {
            cy.get('#username').type(testUser.username)
            cy.get('#password').type(testUser.password)
            cy.get('#login-button').click()

            cy.contains('add blog').click()
            cy.get('#author').type('First Author')
            cy.get('#title').type('First Title')
            cy.get('#url').type('firsturl.com')
            cy.get('#create-button').click()
        })
    
        it('A blog can be created', function() {
          cy.contains('add blog').click()
          cy.get('#author').type('Test Author')
          cy.get('#title').type('Test Title')
          cy.get('#url').type('testurl.com')
          cy.get('#create-button').click()
          cy.contains('New blog added: Test Title by Test Author')

        })
        
        it('can like a blog', function(){

          cy.contains('view').click()
          cy.contains('likes 0')
          cy.contains('like').click()
          cy.contains('likes 1')

        }) 

        it('blogs listed by likes', function(){

          cy.contains('view').click()
          cy.contains('like').click()

          cy.contains('add blog').click()
          cy.get('#author').type('Test Author2')
          cy.get('#title').type('Test Title2')
          cy.get('#url').type('testurl2.com')
          cy.get('#create-button').click()

          cy.reload()
          cy.get('#title-and-author').then((blogs)=>{
            expect(blogs[0].textContent).to.equal('First Title First Author')
          })
        })

        //does not work on cypress but works in prod. user.id unidentified?
        it('can delete a blog', function(){

            cy.contains('view').click()
            cy.contains('delete').click()
            cy.should('not.contain', 'First Title')
  
        })

    })
})