@feature @gro @existing_enquiry
Feature: Existing Enquiry
  A user should answer 'existing enquiry' questions when making a further submission to an existing enquiry

  @full_existing_enquiry @online @smoke_test
  Scenario: A Full Existing Enquiry Submission - Online
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
    Then I choose 'Marriage'
    Then I click the 'Continue' button
    Then I should be on the 'people' page showing 'Tell us the full names of party one on the certificate you requested'
    Then I fill 'person-one' with 'Person1'
    Then I fill 'person-two' with 'Person2'
    Then I click the 'Continue' button
    Then I should be on the 'how' page showing 'How did you place your order?'
    Then I check 'how-radio-online'
    Then I fill 'online-toggle-text' with 'COL123456/2020'
    Then I click the 'Continue' button
    Then I should be on the 'which' page showing 'Which service did you pay for?'
    Then I select 'Standard'
    Then I click the 'Continue' button
    Then I should be on the 'when' page showing 'When did you place your order?'
    Then I fill the date 'when-date' with '30-06-2021'
    Then I click the 'Continue' button
    Then I should be on the 'name' page showing 'What is your full name?'
    Then I fill 'name-text' with 'Test test'
    Then I click the 'Continue' button
    Then I should be on the 'email-address' page showing 'What is your email address?'
    Then I fill 'email-text' with 'sas-hof-test@digital.homeoffice.gov.uk'
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
    Then I should see 'Your order details' on the page
    Then I should see 'Your personal and contact details' on the page
    Then I submit the application
    Then I should be on the 'confirmation' page showing 'Thank you for contacting the General Register Office.'
    Then I should see 'We have sent you an email containing the information you have provided to sas-hof-test@digital.homeoffice.gov.uk' on the page

  @full_existing_enquiry @telephone
  Scenario: A Full Existing Enquiry Submission - Telephone
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
    Then I choose 'Marriage'
    Then I click the 'Continue' button
    Then I should be on the 'people' page showing 'Tell us the full names of party one on the certificate you requested'
    Then I fill 'person-one' with 'Person1'
    Then I fill 'person-two' with 'Person2'
    Then I click the 'Continue' button
    Then I should be on the 'how' page showing 'How did you place your order?'
    Then I check 'how-radio-telephone'
    Then I fill 'telephone-toggle-text' with '12345-100'
    Then I fill 'telephone-toggle-text-2' with '12345678'
    Then I click the 'Continue' button
    Then I should be on the 'which' page showing 'Which service did you pay for?'
    Then I select 'Standard'
    Then I click the 'Continue' button
    Then I should be on the 'when' page showing 'When did you place your order?'
    Then I fill the date 'when-date' with '30-06-2021'
    Then I click the 'Continue' button
    Then I should be on the 'name' page showing 'What is your full name?'
    Then I fill 'name-text' with 'Test test'
    Then I click the 'Continue' button
    Then I should be on the 'email-address' page showing 'What is your email address?'
    Then I fill 'email-text' with 'sas-hof-test@digital.homeoffice.gov.uk'
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
    Then I should see 'Your order details' on the page
    Then I should see 'Your personal and contact details' on the page

  @full_existing_enquiry @post
  Scenario: A Full Existing Enquiry Submission - Post
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
    Then I choose 'Marriage'
    Then I click the 'Continue' button
    Then I should be on the 'people' page showing 'Tell us the full names of party one on the certificate you requested'
    Then I fill 'person-one' with 'Person1'
    Then I fill 'person-two' with 'Person2'
    Then I click the 'Continue' button
    Then I should be on the 'how' page showing 'How did you place your order?'
    Then I check 'how-radio-post'
    Then I click the 'Continue' button
    Then I should be on the 'which' page showing 'Which service did you pay for?'
    Then I select 'Standard'
    Then I click the 'Continue' button
    Then I should be on the 'when' page showing 'When did you place your order?'
    Then I fill the date 'when-date' with '30-06-2021'
    Then I click the 'Continue' button
    Then I should be on the 'name' page showing 'What is your full name?'
    Then I fill 'name-text' with 'Test test'
    Then I click the 'Continue' button
    Then I should be on the 'email-address' page showing 'What is your email address?'
    Then I fill 'email-text' with 'sas-hof-test@digital.homeoffice.gov.uk'
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
    Then I should see 'Your order details' on the page
    Then I should see 'Your personal and contact details' on the page
