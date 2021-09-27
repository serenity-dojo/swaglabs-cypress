import { title } from "process"

export class PageHeader {
    title() { 
        return cy.get(".title")
    }
}