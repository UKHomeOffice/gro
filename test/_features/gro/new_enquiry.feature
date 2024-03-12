@feature @gro @new_enquiry
Feature: New Enquiry
  A user should be able to skip existing enquiry questions when submitting a new enquiry

  @full_new_enquiry
  Scenario: A Full New Enquiry Submission
    Given I start the 'base' application journey
    Then I should be on the 'about' page showing 'Which type of order are you contacting us about?'
    Then I check 'order-type-certificate-order'
    Then I click the 'Continue' button
    Then I should be on the 'contact-reason' page showing 'What would you like to contact us about?'
    Then I choose 'Service complaint'
    Then I click the 'Continue' button
    Then I should be on the 'details' page showing 'Provide details of your complaint'
    Then I fill 'details-text' text area with 'details information'
    Then I check 'existing-radio-no'
    Then I check 'previous-radio-yes'
    Then I click the 'Continue' button
    Then I should be on the 'name' page showing 'What is your full name?'
    Then I fill 'name-text' with 'Test test'
    Then I click the 'Continue' button
    Then I should be on the 'email-address' page showing 'What is your email address?'
    Then I fill 'email-text' with 'sas-hof-test@digital.homeoffice.gov.uk'
    Then I click the 'Continue' button
    Then I should be on the 'check-email' page showing 'Is the email address you entered correct?'
    Then I choose 'No'
    Then I click the 'Continue' button
    Then I should be on the 'email-address/edit' page showing 'What is your email address?'
    Then I fill 'email-text' with 'sas-hof-test@digital.homeoffice.gov.uk'
    Then I click the 'Continue' button
    Then I should be on the 'check-email' page showing 'Is the email address you entered correct?'
    Then I choose 'Yes'
    Then I click the 'Continue' button
    Then I should be on the 'country' page showing 'What country is your address located?'
    Then I fill 'country-select' with 'United Kingdom'
    Then I click the 'Continue' button
    Then I should be on the 'address' page showing 'What is your address?'
    Then I fill 'building' with 'Rose House'
    Then I fill 'street' with '1 Love Lane'
    Then I fill 'townOrCity' with 'London'
    Then I fill 'countyOrState' with 'Greater London'
    Then I fill 'postcodeOrZIPCode' with 'N87BQ'
    Then I click the 'Continue' button
    Then I should be on the 'confirm' page showing 'Is the information you have given us correct?'
    Then I should see 'Your enquiry details' on the page
    Then I should see 'Your personal and contact details' on the page
