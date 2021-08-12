
describe("First test suite", () => {
        it('First test Lesson 10', () => {

            cy.visit('/')
            cy.contains('Forms').click();
            cy.contains('Form Layouts').click();


            // by tag name
            cy.get('input');

            // by ID
            cy.get('#inputEmail1');

            //by Class name
            cy.get('.input-full-width');

            // by Attribute name
            cy.get('[placeholder]');

            // by Attribute name and value
            cy.get('[placeholder="Email"]');

            // by class value
            cy.get('[class="input-full-width size-medium shape-rectangle"]'); // must use all names of the class

            // by Tag name and attribute value
            cy.get('input[placeholder="Email"]');

            // by 2 different attributes
            cy.get('[placeholder="Email"][type="email"]');

            // by Tag name, Attribute with value, ID and class name
            cy.get('input[placeholder="Email"]#inputEmail1.input-full-width'); // note no spaces

            // The most recommended way by cypress
            cy.get('[data-cy="imputEmail1"]'); // attribute created in template
    });

    it('second test Lesson 11', () => {
        
        cy.visit('/')
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        //Attribute I added
        cy.get('[data-cy="signinButton"]');

        // Casing from DOM, not page. Style sheet can change casing
        cy.contains('Sign in');
        
        cy.contains('[status="warning"]', 'Sign in');

        // By ID, get Parent Form then get  child on form button
        cy.get('#inputEmail3')
            .parents('form')
            .find('button') //Find is only for child, must be preceded by parents
            .should('contain', 'Sign in')  // Assertion
            .parents('form')
            .find('nb-checkbox')
            .click(); // click the check box

        cy.contains('nb-card', 'Horizontal form').find('[type="email"]')
    });

    it('then and wrap methods Lesson 12', ()=> {
        
        cy.visit('/')
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        cy.contains('nb-card', 'Using the Grid')
            .find('[for="inputEmail1"]')
            .should('contain', 'Email');

        cy.contains('nb-card', 'Using the Grid')
            .find('[for="inputPassword2"]')
            .should('contain', 'Password');

        cy.contains('nb-card', 'Basic form')
            .find('[for="exampleInputEmail1"]')
            .should('contain', 'Email address');

        cy.contains('nb-card', 'Basic form')
            .find('[for="exampleInputPassword1"]')
            .should('contain', 'Password');

            // shorter way JQuery format
        cy.contains('nb-card', 'Using the Grid').then(firstForm => {
            const emailLabelGrid = firstForm.find('[for="inputEmail1"]').text();
            const passwordLabelGrid = firstForm.find('[for="inputPassword2"]').text();
            expect(emailLabelGrid).to.equal('Email');
            expect(passwordLabelGrid).to.equal('Password');
        });
        
        cy.contains('nb-card', 'Using the Grid').then(firstForm => {
            const passwordLabelGrid = firstForm.find('[for="inputPassword2"]').text();
            expect(passwordLabelGrid).to.equal('Password');

            cy.contains('nb-card', 'Basic form').then(secondForm => {
                const passwordLabelBasic = secondForm.find('[for="exampleInputPassword1"]').text();
                expect(passwordLabelGrid).to.equal(passwordLabelBasic);

            // Convert back to cypress syntax
            cy.wrap(secondForm).find('[for="exampleInputPassword1"]')
            .should('contain', 'Password');
        });


        });              
    });

    it('invoke command Lesson 13', () => {
        
        cy.visit('/')
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address');

        cy.get('[for="exampleInputEmail1"]').then( label => {
            console.log('LOG ' + label.text());
            expect(label.text()).to.equal('Email address');
        });

        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
            expect(text).to.equal('Email address');

        });

        cy.contains('nb-card', 'Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr', 'class')
            .should('contain', 'check');

            cy.contains('nb-card', 'Basic form')
                .find('nb-checkbox')
                .click()
                .find('.custom-checkbox')
                .invoke('attr', 'class')
                .then(classValue => {
                    expect(classValue).to.contain('check')
                });
    });

    it('assert property', () => {
        
        cy.visit('/')
        cy.contains('Forms').click();
        cy.contains('Datepicker').click();

        cy.contains('nb-card', 'Common Datepicker')
            .find('input')
            .then(input => {
                cy.wrap(input).click() // cannot click on jQuery element need to convert back to cypress
                cy.get('nb-calendar-day-picker').contains('17').click()
                cy.wrap(input).invoke('prop', 'value') //prop = 'Properties in debugger
                    .should('equal', 'Aug 17, 2021')
            });
        });
});
