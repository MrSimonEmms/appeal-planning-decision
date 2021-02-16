import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
const { APPEAL_DOCUMENT } = require('../../../../packages/forms-web-app/src/lib/empty-appeal');

Given('a prospective appellant has provided valid appeal information', () => {
  cy.provideCompleteAppeal();
  cy.clickCheckYourAnswers();

  // /appellant-submission/check-answers
  cy.clickSaveAndContinue();
});

When('the appeal is submitted', () => {
  cy.confirmNavigationTermsAndConditionsPage();

  cy.task('listenToQueue');

  // /appellant-submission/submission
  cy.agreeToTheDeclaration();
});

Then('a case is created for a case officer', () => {
  // /appellant-submission/confirmation
  cy.confirmAppealSubmitted();

  cy.task('getLastFromQueue').then((actualMessage) => {
    const expected = require('./ucd-831-ac1.json');

    const expectedNoDynamicFields = {
      ...expected,
    };
    delete expectedNoDynamicFields.createdAt;
    delete expectedNoDynamicFields.updatedAt;
    delete expectedNoDynamicFields.id;
    delete expectedNoDynamicFields.yourAppealSection.appealStatement.uploadedFile.id;
    delete expectedNoDynamicFields.yourAppealSection.appealStatement.uploadedFile.location;
    delete expectedNoDynamicFields.requiredDocumentsSection.originalApplication.uploadedFile.id;
    delete expectedNoDynamicFields.requiredDocumentsSection.originalApplication.uploadedFile
      .location;
    delete expectedNoDynamicFields.requiredDocumentsSection.decisionLetter.uploadedFile.id;
    delete expectedNoDynamicFields.requiredDocumentsSection.decisionLetter.uploadedFile.location;

    const actualNoDynamicFields = {
      ...actualMessage,
    };
    delete actualNoDynamicFields.createdAt;
    delete actualNoDynamicFields.updatedAt;
    delete actualNoDynamicFields.id;
    delete actualNoDynamicFields.yourAppealSection.appealStatement.uploadedFile.id;
    delete actualNoDynamicFields.yourAppealSection.appealStatement.uploadedFile.location;
    delete actualNoDynamicFields.requiredDocumentsSection.originalApplication.uploadedFile.id;
    delete actualNoDynamicFields.requiredDocumentsSection.originalApplication.uploadedFile.location;
    delete actualNoDynamicFields.requiredDocumentsSection.decisionLetter.uploadedFile.id;
    delete actualNoDynamicFields.requiredDocumentsSection.decisionLetter.uploadedFile.location;

    expect(JSON.stringify(actualNoDynamicFields)).to.be(JSON.stringify(expectedNoDynamicFields));
  });
});