import { dateForXDaysAgo } from '../../integration/eligibility-decision-date/eligibility-decision-date';

module.exports = () => {
  cy.goToHouseholderQuestionPage();
  cy.provideHouseholderAnswerYes();
  cy.clickSaveAndContinue();

  cy.goToDecisionDatePage();
  cy.provideDecisionDate(dateForXDaysAgo(30));

  cy.provideEligibleLocalPlanningDepartment();
  cy.clickSaveAndContinue();

  cy.goToEnforcementNoticePage();
  cy.provideEnforcementNoticeAnswer(false);
  cy.clickSaveAndContinue();

  cy.stateCaseDoesNotInvolveAListedBuilding();

  cy.goToCostsPage();
  cy.provideCostsAnswerNo();
  cy.clickSaveAndContinue();

  cy.goToTaskListPage();

  cy.goToWhoAreYouPage();
  cy.answerYesOriginalAppellant();
  cy.clickSaveAndContinue();

  cy.provideDetailsName('Valid Name');
  cy.provideDetailsEmail('valid@email.com');
  cy.clickSaveAndContinue();

  cy.promptUserToProvidePlanningApplicationNumber();
  cy.providePlanningApplicationNumber('ValidNumber/12345');

  cy.goToPlanningApplicationSubmission();
  cy.uploadPlanningApplicationFile('appeal-statement-valid.doc');
  cy.clickSaveAndContinue();

  cy.goToDecisionLetterPage();
  cy.uploadDecisionLetterFile('appeal-statement-valid.doc');
  cy.clickSaveAndContinue();

  cy.goToAppealStatementSubmission();
  cy.checkNoSensitiveInformation();
  cy.uploadAppealStatementFile('appeal-statement-valid.doc');
  cy.clickSaveAndContinue();

  cy.goToSiteAddressPage();
  cy.provideAddressLine1('1 Taylor Road');
  cy.provideAddressLine2('Clifton');
  cy.provideTownOrCity('Bristol');
  cy.provideCounty('South Glos');
  cy.providePostcode('BS8 1TG');
  cy.clickSaveAndContinue();

  cy.goToWholeSiteOwnerPage();
  cy.answerOwnsTheWholeAppeal();
  cy.clickSaveAndContinue();

  cy.goToAccessSitePage();
  cy.answerCanSeeTheWholeAppeal();
  cy.clickSaveAndContinue();

  cy.goToHealthAndSafetyPage();
  cy.answerSiteHasNoIssues();
  cy.clickSaveAndContinue();

  cy.wait(Cypress.env('demoDelay'));
};
