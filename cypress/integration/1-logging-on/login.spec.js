/// <reference types='cypress'/>

import { LoginPage } from "../../page-objects/login-page";
import { PageHeader } from "../../page-objects/page-header";

describe('When logging on', () => {

    const loginPage = new LoginPage()
    const pageHeader = new PageHeader()

    beforeEach(() => {
        loginPage.open()
    });
    
    describe('with a valid user account', () => {
        it('With valid credentials', () => {
            loginPage.loginWith("standard_user","secret_sauce")
            pageHeader.title().should('have.text', 'Products')
        })

        it('With an incorrect username', () => {
            loginPage.loginWith("WRONG_USER","secret_sauce")
            loginPage.errorMessage().should('contain', 'Username and password do not match any user')
        })

        it('With incorrect password', () => {
            loginPage.loginWith("standard_user","WRONG_USER")
            loginPage.errorMessage().should('contain', 'Username and password do not match any user')
        })
    });

    describe('with a blocked account', () => {
        it('should not allow a blocked user to login', () => {
            loginPage.loginWith("locked_out_user","secret_sauce")
            loginPage.errorMessage().should('contain', 'Sorry, this user has been locked out.')   
        })
    })
})