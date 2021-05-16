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
})