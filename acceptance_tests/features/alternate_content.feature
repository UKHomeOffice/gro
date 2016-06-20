@alternate_content
Feature: I am shown different content depending on previous answers

  @about @additional
  Scenario: I am shown the additional-name field if I select wrong-certificate
    Given I am on the start page for the form
    Then I can see the questions for the about page of the form
    When I click wrong_certificate and then continue
    Then I am taken to the type page of the form
    When I click birth and then continue
    Then I am taken to the person_wrong_certificate page of the form
    When I fill in the name on the certificate
    Then I am taken to the additional page of the form
    And I can see the additional_name field
