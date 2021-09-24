/// <reference types='cypress'/>

beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
});

describe('When logging on', () => {
    describe('with a valid user account', () => {
        it('Entering valid credentials should take the user to the product page', () => {
            cy.get("[data-test='username']").type("standard_user");
            cy.get("[data-test='password']").type("secret_sauce");

            cy.get("[data-test='login-button']").click()

            cy.get('.title').should('have.text', 'Products')
        })

        it('And an incorrect username', () => {
            cy.get("[data-test='username']").type("WRONG_USER");
            cy.get("[data-test='password']").type("secret_sauce");

            cy.get("[data-test='login-button']").click()

            cy.get('[data-test=error]')
              .should('be.visible')
              .should('contain', 'Username and password do not match any user')
        })

        it('And an incorrect password', () => {
            cy.get("[data-test='username']").type("standard_user");
            cy.get("[data-test='password']").type("WRONG-PASSWORD");

            cy.get("[data-test='login-button']").click()

            cy.get('[data-test=error]')
              .should('be.visible')
              .should('contain', 'Username and password do not match any user')
        })
    });

    describe('with a blocked account', () => {
        it('should not allow a blocked user to login', () => {
            cy.get("[data-test='username']").type("locked_out_user");
            cy.get("[data-test='password']").type("secret_sauce");

            cy.get("[data-test='login-button']").click()

            cy.get('[data-test=error]')
              .should('be.visible')
              .should('contain', 'Sorry, this user has been locked out.')   
        })
    })

})