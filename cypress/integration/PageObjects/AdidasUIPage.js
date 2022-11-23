/// <reference types="cypress" />

class AdidasUIPage {

    sonyvaioI5_click(){
        return cy.contains('Sony vaio i5')
    }
    dellI7_click(){
        return cy.contains('Dell i7 8gb')
    }

    addToCart_click(){
        return cy.contains('Add to cart')
    }
    navigateToLaptop_click(){
        return cy.contains('Laptops')
    }
    navigateToHome_click(){
        return cy.get('#nava')
    }
    navigateToCart_click(){
        return cy.get('#cartur')
    }
    deleteDell_click(){
        return cy.get(':nth-child(2) > :nth-child(4) > a')
    }
    totalAmount(){
        return cy.get('#totalp')
    }
    placeOrder(){
        return cy.get('.col-lg-1 > .btn')
    }
    formName(){
        return cy.get('#name')
    }
    formCountry(){
        return cy.get('#country')
    }
    formCity(){
        return cy.get('#city')

    }
    formCard(){
        return cy.get('#card')
        
    }
    formMonth(){
        return cy.get('#month')
        
    }
    formYear(){
        return cy.get('#year')
        
    }
    btnConfirmPurchase(){
        return cy.get('#orderModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary')
        
    }
    purchaseSucessMessgae(){
        return cy.get('.sweet-alert > h2')
        
    }

    purchaseSucessdataVerification(){
        return cy.get('[class="lead text-muted "]')
        
    }
    
    purchaseSucessOkbtn(){
        return cy.get('.confirm')
        
    }
    
}
module.exports = new AdidasUIPage();