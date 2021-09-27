export class CheckoutOverview {
    items() { return cy.get('.inventory_item_name') }

    finishCheckout() { cy.contains("Finish").click() }
}

