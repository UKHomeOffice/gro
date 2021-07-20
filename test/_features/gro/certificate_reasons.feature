@feature @gro @certificate_reasons
Feature: Certificate Reasons
  A user should be able to select a certificate reason and go through the appropriate pages following this selection

  Scenario: Certificate Not Received
    Given I start the 'base' application journey
    Then I should be on the 'about' page showing 'What would you like to contact us about?'
    Then I choose 'Certificate not received'
    Then I click the 'Continue' button
    Then I should be on the 'type' page showing 'What type of certificate did you order?'

  @wrong_certificate
  Scenario: Wrong Certificate Received - Not Marriage or Civil Partnership
    Given I start the 'base' application journey
    Then I should be on the 'about' page showing 'What would you like to contact us about?'
    Then I choose 'Wrong certificate received'
    Then I click the 'Continue' button
    Then I should be on the 'type' page showing 'What type of certificate did you order?'
    Then I choose 'Birth'
    Then I click the 'Continue' button
    Then I should be on the 'person' page showing 'Tell us the full names of the person in the certificate you requested'
    Then I fill 'person-text' with 'Joe Bloggs'
    Then I click the 'Continue' button
    Then I should be on the 'additional' page showing 'Additional information'
    Then I fill 'additional-text' text area with 'enquiry information'
    Then I choose 'Yes'
    Then I click the 'Continue' button
    Then I should be on the 'how' page showing 'How did you place your order?'

  @marriage_or_civil @wrong_certificate
  Scenario: Wrong Certificate Received - Marriage Type
    Given I start the 'base' application journey
    Then I should be on the 'about' page showing 'What would you like to contact us about?'
    Then I choose 'Wrong certificate received'
    Then I click the 'Continue' button
    Then I should be on the 'type' page showing 'What type of certificate did you order?'
    Then I choose 'Marriage'
    Then I click the 'Continue' button
    Then I fill 'person-one' with 'Person1'
    Then I fill 'person-two' with 'Person2'
    Then I click the 'Continue' button
    Then I should be on the 'additional' page showing 'Additional information'
    Then I fill 'additional-names' text area with 'Additional Names'
    Then I fill 'additional-text' text area with 'Additional Enquiry Text'
    Then I check 'additional-radio-yes'
    Then I click the 'Continue' button
    Then I should be on the 'how' page showing 'How did you place your order?'

  @marriage_or_civil @wrong_certificate
  Scenario: Wrong Certificate Received - Civil Partnership Type
    Given I start the 'base' application journey
    Then I should be on the 'about' page showing 'What would you like to contact us about?'
    Then I choose 'Wrong certificate received'
    Then I click the 'Continue' button
    Then I should be on the 'type' page showing 'What type of certificate did you order?'
    Then I choose 'Civil partnership'
    Then I click the 'Continue' button
    Then I fill 'person-one' with 'Person1'
    Then I fill 'person-two' with 'Person2'
    Then I click the 'Continue' button
    Then I should be on the 'additional' page showing 'Additional information'
    Then I fill 'additional-names' text area with 'Additional Names'
    Then I fill 'additional-text' text area with 'Additional Enquiry Text'
    Then I check 'additional-radio-yes'
    Then I click the 'Continue' button
    Then I should be on the 'how' page showing 'How did you place your order?'

  Scenario: Poor Quality Certificate
    Given I start the 'base' application journey
    Then I should be on the 'about' page showing 'What would you like to contact us about?'
    Then I choose 'Poor quality certificate'
    Then I click the 'Continue' button
    Then I should be on the 'type' page showing 'What type of certificate did you order?'

  Scenario: Refund Query
    Given I start the 'base' application journey
    Then I should be on the 'about' page showing 'What would you like to contact us about?'
    Then I choose 'Refund query'
    Then I click the 'Continue' button
    Then I should be on the 'type' page showing 'What type of certificate did you order?'

  @existing_enquiry
  Scenario: Service Complaint - Previously Enquired
    Given I start the 'base' application journey
    Then I should be on the 'about' page showing 'What would you like to contact us about?'
    Then I choose 'Service complaint'
    Then I click the 'Continue' button
    Then I should be on the 'details' page showing 'Provide details of your complaint'
    Then I fill 'details-text' text area with 'details information'
    Then I check 'existing-radio-yes'
    Then I check 'previous-radio-yes'
    Then I click the 'Continue' button
    Then I should be on the 'type' page showing 'What type of certificate did you order?'

  @new_enquiry
  Scenario: Service Complaint - Not Existing Enquiry
    Given I start the 'base' application journey
    Then I should be on the 'about' page showing 'What would you like to contact us about?'
    Then I choose 'Service complaint'
    Then I click the 'Continue' button
    Then I should be on the 'details' page showing 'Provide details of your complaint'
    Then I fill 'details-text' text area with 'details information'
    Then I check 'existing-radio-no'
    Then I check 'previous-radio-yes'
    Then I click the 'Continue' button
    Then I should be on the 'name' page showing 'What is your full name?'

  @existing_enquiry
  Scenario: Other issues and feedback - Previously Enquired
    Given I start the 'base' application journey
    Then I should be on the 'about' page showing 'What would you like to contact us about?'
    Then I choose 'Other issues and feedback'
    Then I click the 'Continue' button
    Then I should be on the 'details' page showing 'Provide details of your enquiry'
    Then I fill 'details-text' text area with 'details information'
    Then I check 'existing-radio-yes'
    Then I check 'previous-radio-yes'
    Then I click the 'Continue' button
    Then I should be on the 'type' page showing 'What type of certificate did you order?'

  @new_enquiry
  Scenario: Other issues and feedback - Not Existing Enquiry
    Given I start the 'base' application journey
    Then I should be on the 'about' page showing 'What would you like to contact us about?'
    Then I choose 'Other issues and feedback'
    Then I click the 'Continue' button
    Then I should be on the 'details' page showing 'Provide details of your enquiry'
    Then I fill 'details-text' text area with 'details information'
    Then I check 'existing-radio-no'
    Then I check 'previous-radio-yes'
    Then I click the 'Continue' button
    Then I should be on the 'name' page showing 'What is your full name?'
