@wip
Feature: Cookie consent bar - no JS

  NOTE: THIS WON'T WORK WITHOUT FURTHER CYPRESS CONFIG CHANGES
    because we cannot disable JS in a Cypress test

<<<<<<< HEAD
  @as-98 @as-98-1
  Scenario: Cookie banner available until actioned
    Given a user has not previously submitted cookie preferences
    When the user navigates through the service
    Then the cookie banner remains until actioned
=======
#  As a performance analyst working on the appeals service
#  I want users to be able to say Yes to GA cookies
#  So that I will receive analytics data for the service

  @as-98 @as-98-1
  Scenario: Cookie banner always displays
    Given a user visits the site with JavaScript disabled
    When the user navigates through the service
    Then the cookie banner remains visible
>>>>>>> 0ded9f8a... feat(forms-web-app): cookie consent banner - no JS

  @as-98 @as-98-2
  Scenario: Cookie banner links to cookie settings page
    Given a user visits the site with JavaScript disabled
    When the user views cookies
    Then the cookies page is presented
