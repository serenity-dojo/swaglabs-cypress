/// <reference types='cypress'/>

import { LoginAction } from "../../actions/login-action";
import { CheckoutConfirmation } from "../../page-objects/checkout-confirmation";
import { CheckoutInformation } from "../../page-objects/checkout-information";
import { CheckoutOverview } from "../../page-objects/checkout-overview";
import { LoginPage } from "../../page-objects/login-form";
import { ProductCatalog } from "../../page-objects/product-catalog";
import { ShoppingCart } from "../../page-objects/shopping-cart";

describe('When placing items in the cart', () => {

    const login = new LoginAction()
    const productCatalog = new ProductCatalog()
    const shoppingCart = new ShoppingCart()
    const checkoutInformation = new CheckoutInformation()
    const checkoutOverview = new CheckoutOverview()
    const checkoutConfirmation = new CheckoutConfirmation()

    beforeEach(() => {
        login.withCredentials("standard_user", "secret_sauce")

        productCatalog.addItemToCartCalled('Sauce Labs Backpack')
        productCatalog.addItemToCartCalled('Sauce Labs Bolt T-Shirt')

        shoppingCart.open()
    });

    describe('When checking out items in the cart', () => {

        beforeEach(() => {
            shoppingCart.initiateCheckout()
        })

        it("all customer information is mandatory", () => {
            checkoutInformation.withPersonalDetails("", "", "")
            
            checkoutInformation.error().should('be.visible')
        })

        it("the items in the cart should be shown in the overview", () => {
            checkoutInformation.withPersonalDetails("Sally","Shopper","ABC123")
            
            checkoutOverview.items().should('have.length',2)
        })        

        it("the Thank You message should be shown when the checkout is completed", () => {
            checkoutInformation.withPersonalDetails("Sally","Shopper","ABC123")
            
            checkoutOverview.finishCheckout()

            checkoutConfirmation.message().should('contain','THANK YOU FOR YOUR ORDER')

        })        

    })

});