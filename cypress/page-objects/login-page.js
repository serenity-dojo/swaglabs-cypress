export class LoginPage {

    open() {
        cy.visit('https://www.saucedemo.com/')
    }

    loginWith(username, password) {
        cy.get("[data-test='username']").type(username);
        cy.get("[data-test='password']").type(password);
        cy.get("[data-test='login-button']").click()
    }

    errorMessage() {
        return cy.get('[data-test=error]')
    }
}