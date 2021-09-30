/// <reference types='cypress'/>

import { LoginAction } from "../../actions/login-action";
import { ProductCatalog } from "../../page-objects/product-catalog";

describe('When browsing the product catalog', () => {

    const login = new LoginAction()
    const productCatalog = new ProductCatalog()

    beforeEach(() => {
        login.withCredentials("standard_user", "secret_sauce")
    });

    describe('All six products should be displayed', () => {
        it('should show titles for 6 products', () => {
            productCatalog.productNames().should('have.length', 6)
        });
    }); 

    describe('the customer should be able to add any item to the cart', () => {
        it('Each product should have an Add To Cart button', () => {
            productCatalog.addToCartButtons().should('have.length', 6)
        }); 

        it('Adding a item to the cart should update the cart count', () => {
            
            productCatalog.addItemToCartCalled('Sauce Labs Backpack')

            productCatalog.shoppingCartBadge().should('contain.text','1')
            productCatalog.addToCartButtons().should('have.length',5)
            productCatalog.removeFromCartButtons().should('have.length',1)
        });

        it('Adding two items to the cart', () => {
            productCatalog.addItemToCartCalled('Sauce Labs Backpack')
            productCatalog.addItemToCartCalled('Sauce Labs Bike Light')

            productCatalog.shoppingCartBadge().should('contain.text','2')
        });

        it('Adding two items to the cart then removing one', () => {
            productCatalog.addItemToCartCalled('Sauce Labs Backpack')
            productCatalog.addItemToCartCalled('Sauce Labs Bike Light')

            productCatalog.removeItemFromCartCalled('Sauce Labs Backpack')

            productCatalog.shoppingCartBadge().should('contain.text','1')
            productCatalog.addToCartButtons().should('have.length',5)
            productCatalog.removeFromCartButtons().should('have.length',1)
        });
    });

});

