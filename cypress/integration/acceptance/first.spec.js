/// <reference types="cypress" />

context('Home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  describe('Loads page', () => {
    it('has shared plan heading', () => {
      cy.get('h1')
        .should('have.text', 'Welcome to Shared Plan!')
    })
  })
})
