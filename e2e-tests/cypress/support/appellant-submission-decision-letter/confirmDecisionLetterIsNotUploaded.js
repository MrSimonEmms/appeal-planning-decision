module.exports = () => {
  cy.goToDecisionLetterPage();
  cy.get('#decision-upload-file-name').should('not.exist');
  cy.snapshot();
};
