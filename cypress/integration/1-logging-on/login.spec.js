/// <reference types='cypress'/>

import { LoginAction } from "../../actions/login-action";
import { LoginForm } from "../../page-objects/login-form";
import { PageHeader } from "../../page-objects/page-header";

describe('When logging on', () => {

    const login = new LoginAction()
    const loginForm = new LoginForm()
    const pageHeader = new PageHeader()

    describe('with a valid user account', () => {
        it('With valid credentials', () => {
            login.withCredentials("standard_user","secret_sauce")
            pageHeader.title().should('have.text', 'Products')
        })

        it('With an incorrect username', () => {
            login.withCredentials("WRONG_USER","secret_sauce")
            loginForm.errorMessage().should('contain', 'Username and password do not match any user')
        })

        it('With incorrect password', () => {
            login.withCredentials("standard_user","WRONG_USER")
            loginForm.errorMessage().should('contain', 'Username and password do not match any user')
        })
    });

    describe('with a blocked account', () => {
        it('should not allow a blocked user to login', () => {
            login.withCredentials("locked_out_user","secret_sauce")
            loginForm.errorMessage().should('contain', 'Sorry, this user has been locked out.')   
        })
    })
})