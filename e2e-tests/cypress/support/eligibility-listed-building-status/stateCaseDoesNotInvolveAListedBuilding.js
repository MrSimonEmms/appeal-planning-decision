module.exports = () => {
  cy.visit('/eligibility/listed-building');

  cy.get('#is-your-appeal-about-a-listed-building-2').click()


  cy.wait(Cypress.env('demoDelay'));
  const continueBtn = cy.get('.govuk-button').click();
  cy.wait(Cypress.env('demoDelay'));
}
