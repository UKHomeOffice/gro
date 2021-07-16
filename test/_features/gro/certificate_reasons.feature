@feature @gro @single
Feature: Certificate Reasons
  A user should be able to select a certificate reason and go through the appropriate pages following this selection

  Scenario: Certificate Not Received
    Given I start the 'base' application journey
    Then I should be on the 'about' page showing 'What would you like to contact us about?'
    Then I choose 'Certificate not received'
    Then I click the 'Continue' button
    Then I should be on the 'type' page showing 'What type of certificate did you order?'
    Then I choose 'Birth'
    Then I click the 'Continue' button
    Then I should be on the 'person' page showing 'Whose name, including any middle names, is on the certificate you ordered?'
    Then I fill 'person-text' with 'Joe Bloggs'
    Then I click the 'Continue' button
    Then I should be on the 'additional' page showing 'Additional information'
    Then I fill 'additional-text' text area with 'enquiry information'
    Then I choose 'Yes'
    Then I click the 'Continue' button
    Then I should be on the 'how' page showing 'How did you place your order?'
