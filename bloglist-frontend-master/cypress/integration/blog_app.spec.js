describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {      
          name: 'user',      
          username: 'user1',      
          password: 'salasana'    
        }    
        cy.request('POST', 'http://localhost:3001/api/users/', user) 
        cy.visit('http://localhost:3000')
    })
  
    it('Login from is shown', function() {
        cy.contains('login')
    })


    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('user1')    
            cy.get('#password').type('salasana')    
            cy.get('#login-button').click()
            cy.contains('user logged in')
        })
    
        it('fails with wrong credentials', function() {
            cy.get('#username').type('wrong')    
            cy.get('#password').type('credentials')    
            cy.get('#login-button').click()
            cy.contains('login')
        })
    })

    describe.only('When logged in', function() {
        beforeEach(function() {
            cy.get('#username').type('user1')    
            cy.get('#password').type('salasana')    
            cy.get('#login-button').click()
        })
    
        it('A blog can be created', function() {
            cy.get('#new-blog-button').click()
            cy.get('#title').type('otsikko')
            cy.get('#author').type('kirjoittaja')
            cy.get('#url').type('osoite')
            cy.get('#save-button').click()
            cy.contains('otsikko')
            cy.get('#view-button').click()
            cy.contains('kirjoittaja')
            cy.contains('osoite')
        })
        it('A blog can be liked', function() {
            cy.get('#new-blog-button').click()
            cy.get('#title').type('otsikko')
            cy.get('#author').type('kirjoittaja')
            cy.get('#url').type('osoite')
            cy.get('#save-button').click()
            cy.get('#view-button').click()
            cy.contains("0")
            cy.get('#like-button').click()
            cy.contains("1")
        })
        it('A blog can be deleted', function() {
            cy.get('#new-blog-button').click()
            cy.get('#title').type('otsikko')
            cy.get('#author').type('kirjoittaja')
            cy.get('#url').type('osoite')
            cy.get('#save-button').click()
            cy.contains('otsikko')
            cy.get('#view-button').click()
            cy.get('#delete-button').click()
            cy.contains("otsikko").should('not.exist')
        })

    })
    
})