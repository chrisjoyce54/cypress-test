import { onDatepickerPage } from "../support/page_objects/datePicker";
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage";
import { navigateTo } from "../support/page_objects/navigationPage";
import { onSmartTablePage } from "../support/page_objects/smartTablePage";

describe.only('Test with Page Objects', () => {
    
    beforeEach('open application', () => { 
        cy.openHomePage();
        console.log('Visited');
    });

    it('Verify navigation actions across the pages', () => {
        navigateTo.formLayoutsPage();
        navigateTo.formDatePickerPage();
        navigateTo.smartTablePage();
        navigateTo.tooltipPage();
        navigateTo.toasterPage();
    });

    it.only('should submit Inline and Basic Form and select tomorrow\'s date in the calendar', () => {
        navigateTo.formLayoutsPage();
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('Chris', 'cjoyce@jackhenry.com');
        onFormLayoutsPage.submitBasicFormWithEmailAndPassword('cjoyce@jackhenry.com', 'password');
        navigateTo.formDatePickerPage();
        onDatepickerPage.selectCommonDatepickerDateFromToday(1)
        onDatepickerPage.selectDatePickerWithRangeFromToday(7,14)
        navigateTo.smartTablePage()
        onSmartTablePage.addNewRecordWithFirstAndLastName('Chris', 'Joyce')
        onSmartTablePage.updateAgeByFirstName('Chris', '35')
        onSmartTablePage.deleteRowByIndex(1)

    });
});