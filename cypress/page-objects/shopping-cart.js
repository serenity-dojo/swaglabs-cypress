export class ShoppingCart {
    open() { return cy.get('.shopping_cart_badge').click() }

    items() { return cy.get('.inventory_item_name') }

    itemPrice(name) { return this.cartItem(name).get(".inventory_item_price")}

    itemQuantity(name) { return this.cartItem(name).get(".cart_quantity")}

    itemDescription(name) { return this.cartItem(name).get(".inventory_item_desc")}

    removeButtonFor(name) { return this.cartItem(name).contains('Remove') }

    cartItem(name) {return cy.contains('.cart_item', name)}

    initiateCheckout() { cy.get("#checkout").click() }
}

