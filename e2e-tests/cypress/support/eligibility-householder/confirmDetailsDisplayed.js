module.exports = (label, text) => {
  cy.get(`[data-cy="${label}"]`).within(() => {
    cy.contains(text)
  })
  cy.snapshot();
};
