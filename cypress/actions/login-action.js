export class LoginAction {

    withCredentials(username, password) {
        cy.visit('https://www.saucedemo.com');

        cy.get('#user-name').type(username);
        cy.get('#password').type(password);
        cy.get('#login-button').click();
    }
}