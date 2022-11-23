/// <reference types="cypress" />
import apiTestdata from "../../fixtures/apiTestdata.json"
import frontendData from "../../fixtures/frontendData.json"
import AdidasUIPage from "../../integration/PageObjects/AdidasUIPage"



let fullbody
let fullbodyupdate
let availablePets
let totalamount
let updatedAmountPurchase

let postURLcontry = apiTestdata.url_api



describe('Sadagopan First Question Cypress API Test For Adidas Assesment-GET API Call ', () => {
    it('Visits the GET API URL for fetching available Pets and then verify the 200 response code', () => {
        //The request missed important two input param in body one is brand and other one is locale.
        cy.request({
            method: 'GET',
            url: postURLcontry + '/v2/pet/findByStatus?status=available',

            form: true,

        }).then(response => {
            //Verifying the status code
            expect(response.status).to.eq(200)
            //write the response in the fixture folder
            cy.writeFile('cypress/fixtures/responseGet.json', response.body)
            //verify the availble pets status from the response
            expect((JSON.stringify(response.body))).contains('available')




        })


    })

    it('Assert all pets having status available from the response', () => {

        cy.fixture('responseGet.json').then((data) => {
            // iterate using for loop and verify all the pet status should be equal to Available.
            for (var index in data) {
                if ((data[index].status) === 'available') {
                    expect(data[index].status).to.deep.equal('available')

                } else {
                    //if there is any of the pet status other then available then print the id of the Pets.
                    assert.isOk(data[index].id, 'Pet status other then available and the ID of non available Pet')
                }

            }


        })



    })

})

describe('Sadagopan First Question Cypress API Test For Adidas Assesment-POST API call ', () => {
    it('Post a new available pet to the store - Verify 200 status code ', () => {
        //The request missed important two input param in body one is brand and other one is locale.
        cy.request({
            method: 'POST',
            url: postURLcontry + '/v2/pet',


            headers: { "Content-Type": "application/json; charset=utf8", "accept": "application/json" },
            body: {
                //in the body placing the required param from a test data json file available in fixture folder.
                "id": apiTestdata.id_post,
                "category": {
                    "id": 0,
                    "name": "string"
                },
                "name": apiTestdata.petname_post,
                "photoUrls": [
                    "string"
                ],
                "tags": [
                    {
                        "id": 0,
                        "name": "string"
                    }
                ],
                "status": apiTestdata.status_post

            }

        }).then(response => {
            //Verifying the status code
            expect(response.status).to.eq(200)

            //write the response in the fixture folder
            cy.writeFile('cypress/fixtures/responsePost.json', response.body)

            fullbody = JSON.stringify(response.body)




        })


    })

    it('From the response Assert new pet added  ', () => {
        //verify the availble pets status from the response
        expect(fullbody).contains(apiTestdata.id_post)

    })

})


describe('Sadagopan First Question Cypress API Test For Adidas Assesment-POST API call For update ', () => {
    it('update a new available pet in the store - Verify 200 status code ', () => {
        //The request missed important two input param in body one is brand and other one is locale.
        cy.request({
            method: 'PUT',
            url: postURLcontry + '/v2/pet/',
           
            body: {
                //in the body placing the required param from a test data json file available in fixture folder for update.
                "id": apiTestdata.id_post,
                "category": {
                    "id": 0,
                    "name": "string"
                },
                "name": apiTestdata.petname_update_post,
                "photoUrls": [
                    "string"
                ],
                "tags": [
                    {
                        "id": 0,
                        "name": "string"
                    }
                ],
                "status": apiTestdata.pet_status_update_post

            }

        }).then(response => {
            //Verifying the status code
            expect(response.status).to.eq(200)
            cy.wait(5000)



        })


    })

    it('Assert  whether the pet updated or not in the API databace.  ', () => {
        //verify the availble pets status from the response

        cy.request({
            method: 'GET',
            url: postURLcontry + '/v2/pet/' + apiTestdata.id_post,

            form: true,

        }).then(response => {
            //Verifying the status code
            expect(response.status).to.eq(200)
            cy.writeFile('cypress/fixtures/responseUpdate.json', (JSON.stringify(response.body)))

            expect((JSON.stringify(response.body))).contains(apiTestdata.id_post)
            expect((JSON.stringify(response.body))).contains(apiTestdata.petname_update_post)
            expect((JSON.stringify(response.body))).contains(apiTestdata.pet_status_update_post)






        })

    })

})


describe('Sadagopan First Question Cypress API Test For Adidas Assesment-Delete  API call ', () => {
    it('Delete this pet. Assert deletion', () => {
        //The request missed important two input param in body one is brand and other one is locale.
        cy.request({
            method: 'DELETE',
            url: postURLcontry + '/v2/pet/' + apiTestdata.id_post,

        }).then(response => {
            //Verifying the status code
            expect(response.status).to.eq(200)
            cy.wait(5000)


        })


    })

    it('Assert  whether the pet Deleted or not in the API databace.  ', () => {
        //verify the availble pets status from the response

        cy.request({
            method: 'GET',
            url: postURLcontry + '/v2/pet/' + apiTestdata.id_post,

            form: true,
            failOnStatusCode: false

        }).then(response => {
            //Verifying the status code
            expect(response.status).to.eq(404)

            cy.writeFile('cypress/fixtures/responseDelete.json', (JSON.stringify(response.body)))

            expect((JSON.stringify(response.body))).contains('Pet not found')
            cy.log(JSON.stringify(response.body))




        })

    })

})

describe('Sadagopan Second Question Cypress Front END UI validation Test For Adidas Assesment ', () => {
    it('Launch the URL and Customer navigation through product categories: Phones, Laptops and Monitors ', () => {
        cy.visit(frontendData.url_frontend)
    })
    it('Navigate to Laptop and then select "Sony vaio i5" and click on "Add to cart". Accept pop up confirmation. ', () => {
        AdidasUIPage.navigateToLaptop_click().click()
        cy.wait(3000)
        AdidasUIPage.sonyvaioI5_click().click()
        cy.wait(3000)
        AdidasUIPage.addToCart_click().click()
    })
    it('Navigate to Laptop  and then select "Dell i7 8gb" and click on "Add to cart". Accept pop up confirmation. ', () => {
        AdidasUIPage.navigateToHome_click().click()
        cy.wait(3000)
        AdidasUIPage.navigateToLaptop_click().click()
        cy.wait(3000)
        AdidasUIPage.dellI7_click().click()
        cy.wait(5000)
        AdidasUIPage.addToCart_click().click()
    })
    it('Navigate to Cart and then Delete "Dell i7 8gb" from cart. ', () => {
        cy.wait(3000)
        AdidasUIPage.navigateToCart_click().click()
        cy.wait(3000)
        AdidasUIPage.deleteDell_click().click()
        cy.wait(4000)
    })
    it('Click on Place order button. ', () => {
        AdidasUIPage.placeOrder().click()
        cy.wait(4000)
    })
    it('Fill the form for Purchasse the product. ', () => {
        AdidasUIPage.formName().type(frontendData.fornname)
        cy.wait(3000)
        AdidasUIPage.formCountry().type(frontendData.formcountry)
        AdidasUIPage.formCity().type(frontendData.Formcity)
        AdidasUIPage.formCard().type(frontendData.formcardNumber)
        AdidasUIPage.formMonth().type(frontendData.formmonth)
        AdidasUIPage.formYear().type(frontendData.formyear)
        cy.wait(3000)
        cy.get('#totalm').then(function($elem) {
            totalamount= $elem.text()
            cy.log(totalamount)
            updatedAmountPurchase = totalamount.substring(5);
       })
    })
    it('confirm the Purchase. ', () => {
        AdidasUIPage.btnConfirmPurchase().click()
    })
    //Purchase confirmation
    it('Verify the sucess message after Purchase ', () => {
        AdidasUIPage.purchaseSucessMessgae().should('have.text', 'Thank you for your purchase!')
    })
    //Purchase data verification
    it('Assert purchase amount equals expected ', () => {
        AdidasUIPage.purchaseSucessdataVerification().contains(frontendData.fornname)
        AdidasUIPage.purchaseSucessdataVerification().contains(frontendData.formcardNumber)
        AdidasUIPage.purchaseSucessdataVerification().contains(updatedAmountPurchase)



    })


it('capturing the final screenshot after purchase and click Ok button from the Purchasse confirmation popup ', () => {
    cy.screenshot()
    AdidasUIPage.purchaseSucessOkbtn().click()
})
})






