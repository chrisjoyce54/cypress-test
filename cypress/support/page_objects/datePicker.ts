
export class Datepicker{

    selectCommonDatepickerDateFromToday(day){
        cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
            cy.wrap(input).click()
            const dateAssert = this.selectDayFromCurrent(day)
            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
            cy.wrap(input).should('have.value', dateAssert)            
        })
    }

    selectDatePickerWithRangeFromToday(from, to){
        cy.contains('nb-card', 'Datepicker With Range').find('input').then( input => {
            cy.wrap(input).click()
            const dateAssertFirst = this.selectDayFromCurrent(from)
            const dateAssertSecond = this.selectDayFromCurrent(to)
            const finalDate = dateAssertFirst+' - '+dateAssertSecond
            cy.wrap(input).invoke('prop', 'value').should('contain', finalDate)
            cy.wrap(input).should('have.value', finalDate)            
        })
    }
    
    selectDayFromCurrent(day){
        let date = new Date()
        date.setDate(date.getDate() + day)
        let futureDay = date.getDate()
        let futureMonth = date.toLocaleString('default', {month: 'short'})
        let dateAssert = futureMonth+' '+futureDay+', '+date.getFullYear()
    
            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute => {
                if ( !dateAttribute.includes(futureMonth) ){
                    cy.get('[data-name="chevron-right"]').click()
                    this.selectDayFromCurrent(day)
                } else {
                    cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
                    return
                }
            })
            return dateAssert
        }

}

export const onDatepickerPage = new Datepicker()