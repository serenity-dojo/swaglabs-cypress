export class LoginForm {

    errorMessage() {
        return cy.get('[data-test=error]')
    }
}