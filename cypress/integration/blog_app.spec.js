describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      'username': 'dgMaster',
      'name': 'Dionisio',
      'password': '123456789'
    }
    cy.request('POST','http://localhost:3003/api/users',user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('.formDiv').contains('Log into the application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('dgMaster')
      cy.get('#password').type('123456789')
      cy.get('#login-btn').click()

      cy.get('.success')
        .should('contain', 'Welcome Dionisio')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-color' , 'rgb(0, 128, 0)')

      cy.get('html').should('contain', 'dgMaster Logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('dgMaster')
      cy.get('#password').type('12345678')
      cy.get('#login-btn').click()

      cy.get('.error')
        .should('contain', 'Error: Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-color' , 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'dgMaster Logged in')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username:'dgMaster',password:'123456789' })
    })

    it('A blog can be created', function() {
      cy.contains('Create New Blog').click()
      cy.get('#title').type('A blog created by cypress')
      cy.get('#author').type('dgMaster')
      cy.get('#url').type('newcypressblog.com')
      cy.get('#new-blog-btn').click()

      cy.get('.success')
        .should('contain', 'Added new Blog: A blog created by cypress')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-color' , 'rgb(0, 128, 0)')

      cy.get('h3').should('contain','A blog created by cypress')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Another blog created by cypress 1.0',
          author: 'dgMaster',
          url: 'anothercypressblog1.com'
        })

        cy.logout()

        const user2 = {
          'username': 'rootMaster',
          'name': 'root',
          'password': '123456789'
        }
        cy.request('POST','http://localhost:3003/api/users',user2)
        cy.login({ username:'rootMaster',password:'123456789' })

        cy.createBlog({
          title: 'Another blog created by cypress 2.0',
          author: 'rootMaster',
          url: 'anothercypressblog2.com'
        })
        cy.createBlog({
          title: 'Another blog created by cypress 3.0',
          author: 'rooMaster',
          url: 'anothercypressblog3.com'
        })
      })

      it('it can be liked', function () {
        cy.contains('Another blog created by cypress 2.0')
          .contains('view')
          .click()

        cy.get('#like-btn').click()
        cy.contains('likes 1')

        cy.get('.success')
          .should('contain', 'Updated Blog: Another blog created by cypress 2.0')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-color' , 'rgb(0, 128, 0)')
      })

      describe('delete an existing blog',function(){
        it('success with user who created the blog',function(){
          cy.contains('Another blog created by cypress 3.0')
            .contains('view')
            .click()

          cy.get('#remove-btn').click()

          cy.get('.success')
            .should('contain', 'Deleted Blog: Another blog created by cypress 3.0')
            .and('have.css', 'color', 'rgb(0, 128, 0)')
            .and('have.css', 'border-color' , 'rgb(0, 128, 0)')

          cy.get('h3').should('not.contain','Another blog created by cypress 3.0')

        })
        it('user cannot delete the blog',function(){
          cy.contains('Another blog created by cypress 1.0')
            .contains('view')
            .click()

          cy.contains('Another blog created by cypress 1.0')
            .parent()
            .should('not.contain','Remove')
        })
      })
    })
  })
})