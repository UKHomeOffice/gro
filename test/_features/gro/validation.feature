@feature @gro @validations
Feature: Validations
  A user should be see the appropriate validation error messages for each page

  @marriage_or_civil
  Scenario: Marriage or Civil Partnership Application Start
    Given I start the 'base' application journey
    Then I click the 'Continue' button
    Then I should see the 'Tell us what you are contacting us about' error
    Then I choose 'Wrong certificate received'
    Then I click the 'Continue' button
    Then I click the 'Continue' button
    Then I should see the 'Tell us the type of certificate that was ordered' error
    Then I choose 'Civil partnership'
    Then I click the 'Continue' button
    Then I click the 'Continue' button
    Then I should see the 'Enter a full name' error
    Then I fill 'person-one' with 'Person1'
    Then I click the 'Continue' button
    Then I click the 'Continue' button
    Then I should see the 'Tell us if you have previously been in contact about this enquiry' error
    Then I check 'additional-radio-yes'
    Then I click the 'Continue' button
    Then I should be on the 'how' page showing 'How did you place your order?'

  Scenario: Service Complaint or Other Issues And Feedback Application Start
    Given I start the 'base' application journey
    Then I choose 'Other issues and feedback'
    Then I click the 'Continue' button
    Then I click the 'Continue' button
    Then I should see the 'Tell us about your enquiry' error
    Then I should see the 'Tell us if your enquiry is about an existing order' error
    Then I should see the 'Tell us if you have already enquired about this issue' error
    Then I fill 'details-text' text area with 'details information'
    Then I check 'existing-radio-yes'
    Then I check 'previous-radio-yes'
    Then I click the 'Continue' button
    Then I should be on the 'type' page showing 'What type of certificate did you order?'

  Scenario: The Rest of the Full Validation Journey
    Given I start the 'base' application journey
    Then I click the 'Continue' button
    Then I should see the 'Tell us what you are contacting us about' error
    Then I choose 'Certificate not received'
    Then I click the 'Continue' button
    Then I click the 'Continue' button
    Then I should see the 'Tell us the type of certificate that was ordered' error
    Then I choose 'Birth'
    Then I click the 'Continue' button
    Then I click the 'Continue' button
    Then I should see the 'Enter a full name' error
    Then I fill 'person-text' with 'Test test'
    Then I click the 'Continue' button
    Then I click the 'Continue' button
    Then I should see the 'Tell us if you have previously been in contact about this enquiry' error
    Then I check 'additional-radio-yes'
    Then I click the 'Continue' button
    Then I click the 'Continue' button
    Then I should see the 'Tell us how you placed your order' error
    Then I check 'how-radio-online'
    Then I click the 'Continue' button
    Then I click the 'Continue' button
    Then I should see the 'Tell us which service you paid for' error
    Then I check 'which-radio-priority'
    Then I click the 'Continue' button
    Then I click the 'Continue' button
    Then I should see the 'Tell us when you placed your order' error
    Then I fill the date 'when-date' with '30-06-2021'
    Then I click the 'Continue' button
    Then I click the 'Continue' button
    Then I should see the 'Tell us your full name' error
    Then I fill 'name-text' with 'Test Full Name'
    Then I click the 'Continue' button
    Then I click the 'Continue' button
    Then I should see the 'Enter an email address' error
    Then I fill 'email-text' with 'sas-hof-test@digital.homeoffice.gov.uk'
    Then I click the 'Continue' button
    Then I click the 'Continue' button
    Then I should see the 'Enter your country' error
    Then I fill 'country-select' with 'United Kingdom'
    Then I click the 'Continue' button
    Then I click the 'Continue' button
    Then I should see the 'Enter details of your building and street' error
    Then I should see the 'Enter a town or city' error
    Then I should see the 'Enter your postcode' error
    Then I fill 'building' with 'Rose House'
    Then I fill 'street' with '1 Love Lane'
    Then I fill 'townOrCity' with 'London'
    Then I fill 'countyOrState' with 'Greater London'
    Then I fill 'postcodeOrZIPCode' with 'N87BQ'
    Then I click the 'Continue' button
    Then I should be on the 'confirm' page showing 'Is the information you have given us correct?'
