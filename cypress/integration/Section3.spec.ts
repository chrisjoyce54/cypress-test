import { of } from "rxjs";

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

    it('assert property Lesson 13', () => {
        
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

    it('Radio Buttons Lesson 14', () => {
        
        cy.visit('/')
        cy.contains('Forms').click();
        cy.contains('Form Layout').click();

        cy.contains('nb-card', 'Using the Grid')
            .find('[type="radio"]').then(radio => {
            cy.wrap(radio)
                .first()
                .check({force: true})  // check won't work by itself, becauase it's "visuall-hidden"
                .should('be.checked');  
        
            cy.wrap(radio)
                .eq(1)
                .check({force: true})  // check won't work by itself, becauase it's "visuall-hidden"
                .should('be.checked');  
            
            cy.wrap(radio)
                .first()
                .should('not.be.checked');
                
            cy.wrap(radio)
                .eq(2)
                .should('be.disabled');
        })
    });

    it('Checkboxes Lesson 14', () => {
        
        cy.visit('/')
        cy.contains('Modal & Overlays').click();
        cy.contains('Toastr').click();

        cy.get('[type="checkbox"]').check({force: true}); // Check method only turns on, won't uncheck if already checked

        cy.get('[type="checkbox"]').eq(0).click({force: true});
    });

    it('lists and dropdowns lesson 15', () => {
        cy.visit('/');

        cy.get('nav nb-select').click(); // will cause the dropdown to display
        cy.get('.options-list').contains('Dark').click();
        cy.get('nav nb-select').should('contain', 'Dark');
        cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)');

        // Loop through all items
        cy.get('nav nb-select').then(dropdown => {
            cy.wrap(dropdown).click();
            cy.get('.options-list nb-option').each((listItem, index) => {
                const itemText = listItem.text().trim();

                const colors = {
                    "Light": "rgb(255, 255, 255)",
                    "Dark": "rgb(34, 43, 69)",
                    "Cosmic": "rgb(50, 50, 89)",
                    "Corporate": "rgb(255, 255, 255)"
                }

                cy.wrap(listItem).click();
                cy.wrap(dropdown).should('contain', itemText);
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText]);
                if(index < 3){
                    cy.wrap(dropdown).click();
                }
            });

        });
    });

    it('Web Tables Lesson 16', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click();
        cy.contains('Smart Table').click();

        cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click();
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25');
            cy.wrap(tableRow).find('.nb-checkmark').click();
            cy.wrap(tableRow).find('td').eq(6).should('contain', '25');
        });

        cy.get('thead').find('.nb-plus').click();
        cy.get('thead').find('tr').eq(2).then(row => {
            cy.wrap(row).find('[placeholder="First Name"]').type('Chris');
            cy.wrap(row).find('[placeholder="Last Name"]').type('Joyce');
            cy.wrap(row).find('.nb-checkmark').click();
        });
        cy.get('tbody tr').first().find('td').then(columns => {
            cy.wrap(columns).eq(2).should('contain', 'Chris');
            cy.wrap(columns).eq(3).should('contain', 'Joyce');                
        });

        const age = [20, 30, 40, 200];

        cy.wrap(age).each(age => {
            cy.get('thead [placeholder="Age"]').clear().type(age);
            cy.wait(500); // delay so filtering can take place
            cy.get('tbody tr').each(row => {
                if(age == 200) {
                    cy.wrap(row).should('contain', 'No data found');
                } else {
                    cy.wrap(row).find('td').eq(6).should('contain', age);
                }
            });
        });
    });

     it('Datepickers Lesson 17', () => {
        cy.visit('/')
        cy.contains('Forms').click();
        cy.contains('Datepicker').click();

        let date = new Date();
        date.setDate(date.getDate() + 21);
        let futureDay = date.getDate();
        let futureMonth = date.toLocaleString('default', {month: 'short'});
        const dateAssert = futureMonth+' '+futureDay+', '+date.getFullYear();

        cy.contains('nb-card', 'Common Datepicker')
            .find('input')
            .then(input => {
                cy.wrap(input).click(); // cannot click on jQuery element need to convert back to cypress   
                selectDayFromCurrent(futureDay, futureMonth);
                
                cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert);
            }); 
     });

     it('Datepickers2 Lesson 17', () => {
        cy.visit('/')
        cy.contains('Forms').click();
        cy.contains('Datepicker').click();

        let date = new Date();
        date.setDate(date.getDate() + 2);
        let futureDay = date.getDate();
        let futureMonth = date.toLocaleString('default', {month: 'short'});
        const dateAssert = futureMonth+' '+futureDay+', '+date.getFullYear();

        cy.contains('nb-card', 'Common Datepicker')
            .find('input')
            .then(input => {
                cy.wrap(input).click(); // cannot click on jQuery element need to convert back to cypress   
                selectDayFromCurrent(futureDay, futureMonth);

                cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert);
            }); 
     });
     
     it('Datepickers3 Lesson 17', () => {
        cy.visit('/')
        cy.contains('Forms').click();
        cy.contains('Datepicker').click();

        let date = new Date();
        date.setDate(date.getDate() + 71);
        let futureDay = date.getDate();
        let futureMonth = date.toLocaleString('default', {month: 'short'});
        const dateAssert = futureMonth+' '+futureDay+', '+date.getFullYear();

        cy.contains('nb-card', 'Common Datepicker')
            .find('input')
            .then(input => {
                cy.wrap(input).click(); // cannot click on jQuery element need to convert back to cypress   
                selectDayFromCurrent(futureDay, futureMonth);
                
                cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert);
            }); 
     });
     
     it('Datepickers3 Lesson 17', () => {
        cy.visit('/')
        cy.contains('Forms').click();
        cy.contains('Datepicker').click();

        let date = new Date();
        date.setDate(date.getDate() + 271);
        let futureDay = date.getDate();
        let futureMonth = date.toLocaleString('default', {month: 'short'});
        const dateAssert = futureMonth+' '+futureDay+', '+date.getFullYear();

        cy.contains('nb-card', 'Common Datepicker')
            .find('input')
            .then(input => {
                cy.wrap(input).click(); // cannot click on jQuery element need to convert back to cypress   
                selectDayFromCurrent(futureDay, futureMonth);
                
                cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert);
            }); 
     });
                
     function selectDayFromCurrent(futureDay: number, futureMonth: string){
         console.log('LOG futureDay ' + futureDay);
         console.log('LOG futureMonth ' + futureMonth);
         cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttr => {
             if(!dateAttr.includes(futureMonth)) {
                 cy.get('[data-name="chevron-right"]').click();
                 selectDayFromCurrent(futureDay, futureMonth);
             } else {             
                 cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
             }
         });
     };

     it('Popups and Tool tips Lesson 18', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click();
        cy.contains('Tooltip').click();

        cy.contains('nb-card', 'Colored Tooltips')
            .contains('Default').click(); // you can also trigger mouseover event

        cy.get('nb-tooltip').should('contain', 'This is a tooltip');

     });

     it('Pop up not in DOM The bad way Lesson 18', () => {
         cy.visit('/')
         cy.contains('Tables & Data').click();
         cy.contains('Smart Table').click();

         cy.get('tbody tr').first().find('.nb-trash').click();

         // if no window confirm, the assertion won't be called
         cy.on('window:confirm', (confirm) => {
            expect(confirm).to.equal('Are you sure you want to delete?');
         });
     }); 

     it('Pop up not in DOM The better way Lesson 18', () => {
         cy.visit('/')
         cy.contains('Tables & Data').click();
         cy.contains('Smart Table').click();

         const stub = cy.stub();
         cy.on('window:confirm', stub); 
         // if no window confirm, stub will be empty, and assertion will fail
         cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
             expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
         });
     }); 

     it('Pop up not in DOM The better way Select cancel on dialog box Lesson 18', () => {
         cy.visit('/')
         cy.contains('Tables & Data').click();
         cy.contains('Smart Table').click();

         const stub = cy.stub();
         cy.on('window:confirm', stub); 
         // if no window confirm, stub will be empty, and assertion will fail
         cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
             expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
         });

         cy.on('window:confirm',  () => false);
    }); 
});
