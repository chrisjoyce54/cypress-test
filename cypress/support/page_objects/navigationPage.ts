

export class NavigationPage {
    formLayoutsPage() {
        // cy.contains('Forms').click();
        this.selectGroupMenuItem('Forms')
        cy.contains('Form Layouts').click()
        cy.url().should('contain', 'layouts');               
    }
    
    formDatePickerPage() {
        //cy.contains('Forms').click();
        this.selectGroupMenuItem('Forms');
        cy.contains('Datepicker').click();        
    }

    toasterPage(){
        this.selectGroupMenuItem('Modal & Overlays')
        cy.contains('Toastr').click()
        cy.url().should('contain', 'toastr')
    }

    smartTablePage(){
        this.selectGroupMenuItem('Tables & Data')
        cy.contains('Smart Table').click()
        cy.url().should('contain', 'smart-table')
    }

    tooltipPage(){
        this.selectGroupMenuItem('Modal & Overlays')
        cy.contains('Tooltip').click()
        cy.url().should('contain', 'tooltip')
    }

    selectGroupMenuItem(groupName) {
        cy.contains('a', groupName).then( menu => {
            cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then( attr => {
                console.log('Logging ' + attr)
                if( attr.includes('left')){
                    cy.wrap(menu).click()
                }
            });
        });
    }
}

export const navigateTo = new NavigationPage();