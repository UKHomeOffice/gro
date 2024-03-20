@feature @refund-query

Feature: Refund query

  Scenario: I am on the Refund query (about-radio-refund) journey, I ordered a birth certificate online,
  and paid for the standard service.
  On the confirm page I want to change the reason for contact and Type of certificate.
    Given I start the 'base' application journey
    Then I should be on the 'about' page showing 'Which type of order are you contacting us about?'
    Then I check 'order-type-certificate-order'
    Then I click the 'Continue' button
    Then I should be on the 'contact-reason' page showing 'What would you like to contact us about?'
    Then I choose 'Refund query'
    Then I click the 'Continue' button
    Then I should be on the 'type' page showing 'What type of certificate did you order?'
    Then I choose 'Birth'
    Then I click the 'Continue' button
    Then I should be on the 'person' page showing 'Whose name, including any middle names, is on the certificate you ordered?'
    Then I fill 'person-text' with 'Person Name A'
    Then I click the 'Continue' button
    Then I should be on the 'additional' page showing 'Additional information'
    Then I fill 'additional-text' text area with 'Additional information'
    Then I choose 'Yes'
    Then I click the 'Continue' button
    Then I should be on the 'how' page showing 'How did you place your order?'
    Then I check 'how-radio-online'
    Then I fill 'online-toggle-text' with 'COL123456/2015'
    Then I choose 'Continue'
    Then I should be on the 'which' page showing 'Which service did you pay for?'
    Then I check 'which-radio-standard'
    Then I choose 'Continue'
    Then I should be on the 'when' page showing 'When did you place your order?'
    Then I fill 'when-date-day' with '01'
    Then I fill 'when-date-month' with '01'
    Then I fill 'when-date-year' with '2020'
    Then I select 'Continue'
    Then I should be on the 'name' page showing 'What is your full name?'
    Then I fill 'name-text' with 'Person Name B'
    Then I select 'Continue'
    Then I should be on the 'email-address' page showing 'What is your email address?'
    Then I fill 'email-text' with 'test@test.com'
    Then I select 'Continue'
    Then I should be on the 'check-email' page showing 'Is the email address you entered correct?'
    Then I choose 'No'
    Then I select 'Continue'
    Then I should be on the 'email-address/edit' page showing 'What is your email address?'
    Then I fill 'email-text' with 'test@test.com'
    Then I select 'Continue'
    Then I should be on the 'check-email' page showing 'Is the email address you entered correct?'
    Then I choose 'Yes'
    Then I select 'Continue'
    Then I should be on the 'country' page showing 'What country is your address located?'
    Then I fill 'country-select' with 'United Kingdom' option
    Then I select 'Continue'
    Then I should be on the 'address' page showing 'What is your address?'
    Then I fill 'building' with 'Building 1'
    Then I fill 'street' with 'Street Name'
    Then I fill 'townOrCity' with 'London'
    Then I fill 'countyOrState' with 'Greater London'
    Then I fill 'postcodeOrZIPCode' with 'A12BCD'
    Then I click the 'Continue' button
    Then I should be on the 'confirm' page showing 'Is the information you have given us correct?'
    Then I should see 'Type of Order' and 'Certificate order' on the page
    Then I should see 'Reason for contact' and 'Refund query' on the page
    Then I should see 'Type of certificate' and 'Birth' on the page
    Then I should see 'Name on certificate requested' and 'Person Name A' on the page
    Then I should see 'Further description' and 'Additional information' on the page
    Then I should see 'Have you previously been in contact about this enquiry?' and 'Yes' on the page
    Then I should see 'How was the order placed?' and 'Online' on the page
    Then I should see 'COL Number' and 'COL123456/2015' on the page
    Then I should see 'Service' and 'Standard' on the page
    Then I should see 'Date of application' and '1st January 2020' on the page
    Then I should see 'Full Name' and 'Person Name B' on the page
    Then I should see 'Email address' and 'test@test.com' on the page
    Then I should see 'Building and street' and 'Building 1' on the page
    Then I should see 'Address line 2' and 'Street Name' on the page
    Then I should see 'Town or city' and 'Town' on the page
    Then I should see 'County or state' and 'London' on the page
    Then I should see 'Postcode or ZIP Code' and 'A12BCD' on the page
    Then I should see 'Country' and 'United Kingdom' on the page

    # Change Reason For Contact
    Then I select change link 'about-radio-change-'
    Then I should see 'What would you like to contact us about?' on the page
    Then I choose 'Refund query'
    Then I click the 'Continue' button
    Then I should be on the 'confirm' page showing 'Is the information you have given us correct?'
    Then I should see 'Type of Order' and 'Certificate order' on the page
    Then I should see 'Reason for contact' and 'Refund query' on the page
    Then I should see 'Type of certificate' and 'Birth' on the page
    Then I should see 'Name on certificate requested' and 'Person Name A' on the page
    Then I should see 'Further description' and 'Additional information' on the page
    Then I should see 'Have you previously been in contact about this enquiry?' and 'Yes' on the page
    Then I should see 'How was the order placed?' and 'Online' on the page
    Then I should see 'COL Number' and 'COL123456/2015' on the page
    Then I should see 'Service' and 'Standard' on the page
    Then I should see 'Date of application' and '1st January 2020' on the page
    Then I should see 'Full Name' and 'Person Name B' on the page
    Then I should see 'Email address' and 'test@test.com' on the page
    Then I should see 'Building and street' and 'Building 1' on the page
    Then I should see 'Address line 2' and 'Street Name' on the page
    Then I should see 'Town or city' and 'Town' on the page
    Then I should see 'County or state' and 'London' on the page
    Then I should see 'Postcode or ZIP Code' and 'A12BCD' on the page
    Then I should see 'Country' and 'United Kingdom' on the page


  Scenario: I am on the Certificate not received (about-radio-refund) journey, I ordered a marriage certificate
  online and paid for the standard service.
  On the confirm page I want to change the reason for contact and type of certificate.
    Given I start the 'base' application journey
    Then I should be on the 'about' page showing 'Which type of order are you contacting us about?'
    Then I check 'order-type-certificate-order'
    Then I click the 'Continue' button
    Then I should be on the 'contact-reason' page showing 'What would you like to contact us about?'
    Then I choose 'Refund query'
    Then I click the 'Continue' button
    Then I should be on the 'type' page showing 'What type of certificate did you order?'
    Then I choose 'Marriage'
    Then I click the 'Continue' button
    Then I should be on the 'people' page showing 'Tell us the full names of party one on the certificate you requested'
    Then I fill 'person-one' with 'Person Name One'
    Then I fill 'person-two' with 'Person Name Two'
    Then I click the 'Continue' button
    Then I should be on the 'additional' page showing 'Additional information'
    Then I fill 'additional-text' text area with 'Additional information'
    Then I choose 'Yes'
    Then I click the 'Continue' button
    Then I should be on the 'how' page showing 'How did you place your order?'
    Then I check 'how-radio-online'
    Then I fill 'online-toggle-text' with 'COL123456/2015'
    Then I choose 'Continue'
    Then I should be on the 'which' page showing 'Which service did you pay for?'
    Then I check 'which-radio-standard'
    Then I choose 'Continue'
    Then I should be on the 'when' page showing 'When did you place your order?'
    Then I fill 'when-date-day' with '01'
    Then I fill 'when-date-month' with '01'
    Then I fill 'when-date-year' with '2020'
    Then I select 'Continue'
    Then I should be on the 'name' page showing 'What is your full name?'
    Then I fill 'name-text' with 'Person Name B'
    Then I select 'Continue'
    Then I should be on the 'email-address' page showing 'What is your email address?'
    Then I fill 'email-text' with 'test@test.com'
    Then I select 'Continue'
    Then I should be on the 'check-email' page showing 'Is the email address you entered correct?'
    Then I choose 'No'
    Then I select 'Continue'
    Then I should be on the 'email-address/edit' page showing 'What is your email address?'
    Then I fill 'email-text' with 'test@test.com'
    Then I select 'Continue'
    Then I should be on the 'check-email' page showing 'Is the email address you entered correct?'
    Then I choose 'Yes'
    Then I select 'Continue'
    Then I should be on the 'country' page showing 'What country is your address located?'
    Then I fill 'country-select' with 'United Kingdom' option
    Then I select 'Continue'
    Then I should be on the 'address' page showing 'What is your address?'
    Then I fill 'building' with 'Building 1'
    Then I fill 'street' with 'Street Name'
    Then I fill 'townOrCity' with 'London'
    Then I fill 'countyOrState' with 'Greater London'
    Then I fill 'postcodeOrZIPCode' with 'A12BCD'
    Then I click the 'Continue' button
    Then I should be on the 'confirm' page showing 'Is the information you have given us correct?'
    Then I should see 'Type of Order' and 'Certificate order' on the page
    Then I should see 'Reason for contact' and 'Refund query' on the page
    Then I should see 'Type of certificate' and 'Marriage' on the page
    Then I should see 'Party one on certificate requested' and 'Person Name One' on the page
    Then I should see 'Party two on certificate requested' and 'Person Name Two' on the page
    Then I should see 'Further description' and 'Additional information' on the page
    Then I should see 'Have you previously been in contact about this enquiry?' and 'Yes' on the page
    Then I should see 'How was the order placed?' and 'Online' on the page
    Then I should see 'COL Number' and 'COL123456/2015' on the page
    Then I should see 'Service' and 'Standard' on the page
    Then I should see 'Date of application' and '1st January 2020' on the page
    Then I should see 'Full Name' and 'Person Name B' on the page
    Then I should see 'Email address' and 'test@test.com' on the page
    Then I should see 'Building and street' and 'Building 1' on the page
    Then I should see 'Address line 2' and 'Street Name' on the page
    Then I should see 'Town or city' and 'Town' on the page
    Then I should see 'County or state' and 'London' on the page
    Then I should see 'Postcode or ZIP Code' and 'A12BCD' on the page
    Then I should see 'Country' and 'United Kingdom' on the page

    # Change Reason For Contact
    Then I select change link 'about-radio-change-'
    Then I should see 'What would you like to contact us about?' on the page
    Then I choose 'Refund query'
    Then I click the 'Continue' button
    Then I should be on the 'confirm' page showing 'Is the information you have given us correct?'
    Then I should see 'Type of Order' and 'Certificate order' on the page
    Then I should see 'Reason for contact' and 'Refund query' on the page
    Then I should see 'Type of certificate' and 'Marriage' on the page
    Then I should see 'Party one on certificate requested' and 'Person Name One' on the page
    Then I should see 'Party two on certificate requested' and 'Person Name Two' on the page
    Then I should see 'Further description' and 'Additional information' on the page
    Then I should see 'Have you previously been in contact about this enquiry?' and 'Yes' on the page
    Then I should see 'How was the order placed?' and 'Online' on the page
    Then I should see 'COL Number' and 'COL123456/2015' on the page
    Then I should see 'Service' and 'Standard' on the page
    Then I should see 'Date of application' and '1st January 2020' on the page
    Then I should see 'Full Name' and 'Person Name B' on the page
    Then I should see 'Email address' and 'test@test.com' on the page
    Then I should see 'Building and street' and 'Building 1' on the page
    Then I should see 'Address line 2' and 'Street Name' on the page
    Then I should see 'Town or city' and 'Town' on the page
    Then I should see 'County or state' and 'London' on the page
    Then I should see 'Postcode or ZIP Code' and 'A12BCD' on the page
    Then I should see 'Country' and 'United Kingdom' on the page

   # Change Type of Certificate
    Then I select change link 'type-radio-change-'
    Then I should see 'What type of certificate did you order?' on the page
    Then I choose 'Marriage'
    Then I click the 'Continue' button
    Then I should be on the 'confirm' page showing 'Is the information you have given us correct?'
    Then I should see 'Type of Order' and 'Certificate order' on the page
    Then I should see 'Reason for contact' and 'Refund query' on the page
    Then I should see 'Type of certificate' and 'Marriage' on the page
    Then I should see 'Party one on certificate requested' and 'Person Name One' on the page
    Then I should see 'Party two on certificate requested' and 'Person Name Two' on the page
    Then I should see 'Further description' and 'Additional information' on the page
    Then I should see 'Have you previously been in contact about this enquiry?' and 'Yes' on the page
    Then I should see 'How was the order placed?' and 'Online' on the page
    Then I should see 'COL Number' and 'COL123456/2015' on the page
    Then I should see 'Service' and 'Standard' on the page
    Then I should see 'Date of application' and '1st January 2020' on the page
    Then I should see 'Full Name' and 'Person Name B' on the page
    Then I should see 'Email address' and 'test@test.com' on the page
    Then I should see 'Building and street' and 'Building 1' on the page
    Then I should see 'Address line 2' and 'Street Name' on the page
    Then I should see 'Town or city' and 'Town' on the page
    Then I should see 'County or state' and 'London' on the page
    Then I should see 'Postcode or ZIP Code' and 'A12BCD' on the page
    Then I should see 'Country' and 'United Kingdom' on the page


  Scenario: I am on the Refund query (about-radio-refund) journey, I ordered a death certificate
  online and paid for the standard service.
  On the confirm page I want to change the reason for contact and type of certificate.
    Given I start the 'base' application journey
    Then I should be on the 'about' page showing 'Which type of order are you contacting us about?'
    Then I check 'order-type-certificate-order'
    Then I click the 'Continue' button
    Then I should be on the 'contact-reason' page showing 'What would you like to contact us about?'
    Then I choose 'Refund query'
    Then I click the 'Continue' button
    Then I should be on the 'type' page showing 'What type of certificate did you order?'
    Then I choose 'Death'
    Then I click the 'Continue' button
    Then I should be on the 'person' page showing 'Whose name, including any middle names, is on the certificate you ordered?'
    Then I fill 'person-text' with 'Person Name A'
    Then I click the 'Continue' button
    Then I should be on the 'additional' page showing 'Additional information'
    Then I fill 'additional-text' text area with 'Additional information'
    Then I choose 'Yes'
    Then I click the 'Continue' button
    Then I should be on the 'how' page showing 'How did you place your order?'
    Then I check 'how-radio-online'
    Then I fill 'online-toggle-text' with 'COL123456/2015'
    Then I choose 'Continue'
    Then I should be on the 'which' page showing 'Which service did you pay for?'
    Then I check 'which-radio-standard'
    Then I choose 'Continue'
    Then I should be on the 'when' page showing 'When did you place your order?'
    Then I fill 'when-date-day' with '01'
    Then I fill 'when-date-month' with '01'
    Then I fill 'when-date-year' with '2020'
    Then I select 'Continue'
    Then I should be on the 'name' page showing 'What is your full name?'
    Then I fill 'name-text' with 'Person Name B'
    Then I select 'Continue'
    Then I should be on the 'email-address' page showing 'What is your email address?'
    Then I fill 'email-text' with 'test@test.com'
    Then I select 'Continue'
    Then I should be on the 'check-email' page showing 'Is the email address you entered correct?'
    Then I choose 'No'
    Then I select 'Continue'
    Then I should be on the 'email-address/edit' page showing 'What is your email address?'
    Then I fill 'email-text' with 'test@test.com'
    Then I select 'Continue'
    Then I should be on the 'check-email' page showing 'Is the email address you entered correct?'
    Then I choose 'Yes'
    Then I select 'Continue'
    Then I should be on the 'country' page showing 'What country is your address located?'
    Then I fill 'country-select' with 'United Kingdom' option
    Then I select 'Continue'
    Then I should be on the 'address' page showing 'What is your address?'
    Then I fill 'building' with 'Building 1'
    Then I fill 'street' with 'Street Name'
    Then I fill 'townOrCity' with 'London'
    Then I fill 'countyOrState' with 'Greater London'
    Then I fill 'postcodeOrZIPCode' with 'A12BCD'
    Then I click the 'Continue' button
    Then I should be on the 'confirm' page showing 'Is the information you have given us correct?'
    Then I should see 'Type of Order' and 'Certificate order' on the page
    Then I should see 'Reason for contact' and 'Refund query' on the page
    Then I should see 'Type of certificate' and 'Death' on the page
    Then I should see 'Name on certificate requested' and 'Person Name A' on the page
    Then I should see 'Further description' and 'Additional information' on the page
    Then I should see 'Have you previously been in contact about this enquiry?' and 'Yes' on the page
    Then I should see 'How was the order placed?' and 'Online' on the page
    Then I should see 'COL Number' and 'COL123456/2015' on the page
    Then I should see 'Service' and 'Standard' on the page
    Then I should see 'Date of application' and '1st January 2020' on the page
    Then I should see 'Full Name' and 'Person Name B' on the page
    Then I should see 'Email address' and 'test@test.com' on the page
    Then I should see 'Building and street' and 'Building 1' on the page
    Then I should see 'Address line 2' and 'Street Name' on the page
    Then I should see 'Town or city' and 'Town' on the page
    Then I should see 'County or state' and 'London' on the page
    Then I should see 'Postcode or ZIP Code' and 'A12BCD' on the page
    Then I should see 'Country' and 'United Kingdom' on the page

    # Change Reason For Contact
    Then I select change link 'about-radio-change-'
    Then I should see 'What would you like to contact us about?' on the page
    Then I choose 'Refund query'
    Then I click the 'Continue' button
    Then I should be on the 'confirm' page showing 'Is the information you have given us correct?'
    Then I should see 'Type of Order' and 'Certificate order' on the page
    Then I should see 'Reason for contact' and 'Refund query' on the page
    Then I should see 'Type of certificate' and 'Death' on the page
    Then I should see 'Name on certificate requested' and 'Person Name A' on the page
    Then I should see 'Further description' and 'Additional information' on the page
    Then I should see 'Have you previously been in contact about this enquiry?' and 'Yes' on the page
    Then I should see 'How was the order placed?' and 'Online' on the page
    Then I should see 'COL Number' and 'COL123456/2015' on the page
    Then I should see 'Service' and 'Standard' on the page
    Then I should see 'Date of application' and '1st January 2020' on the page
    Then I should see 'Full Name' and 'Person Name B' on the page
    Then I should see 'Email address' and 'test@test.com' on the page
    Then I should see 'Building and street' and 'Building 1' on the page
    Then I should see 'Address line 2' and 'Street Name' on the page
    Then I should see 'Town or city' and 'Town' on the page
    Then I should see 'County or state' and 'London' on the page
    Then I should see 'Postcode or ZIP Code' and 'A12BCD' on the page
    Then I should see 'Country' and 'United Kingdom' on the page

   # Change Type of Certificate
    Then I select change link 'type-radio-change-'
    Then I should see 'What type of certificate did you order?' on the page
    Then I choose 'Death'
    Then I click the 'Continue' button
    Then I should be on the 'confirm' page showing 'Is the information you have given us correct?'
    Then I should see 'Type of Order' and 'Certificate order' on the page
    Then I should see 'Reason for contact' and 'Refund query' on the page
    Then I should see 'Type of certificate' and 'Death' on the page
    Then I should see 'Name on certificate requested' and 'Person Name A' on the page
    Then I should see 'Further description' and 'Additional information' on the page
    Then I should see 'Have you previously been in contact about this enquiry?' and 'Yes' on the page
    Then I should see 'How was the order placed?' and 'Online' on the page
    Then I should see 'COL Number' and 'COL123456/2015' on the page
    Then I should see 'Service' and 'Standard' on the page
    Then I should see 'Date of application' and '1st January 2020' on the page
    Then I should see 'Full Name' and 'Person Name B' on the page
    Then I should see 'Email address' and 'test@test.com' on the page
    Then I should see 'Building and street' and 'Building 1' on the page
    Then I should see 'Address line 2' and 'Street Name' on the page
    Then I should see 'Town or city' and 'Town' on the page
    Then I should see 'County or state' and 'London' on the page
    Then I should see 'Postcode or ZIP Code' and 'A12BCD' on the page
    Then I should see 'Country' and 'United Kingdom' on the page


  Scenario: I am on the Refund query (about-radio-refund) journey, I ordered a adoption certificate
  online and paid for the standard service.
  On the confirm page I want to change the reason for contact and type of certificate.
    Given I start the 'base' application journey
    Then I should be on the 'about' page showing 'Which type of order are you contacting us about?'
    Then I check 'order-type-certificate-order'
    Then I click the 'Continue' button
    Then I should be on the 'contact-reason' page showing 'What would you like to contact us about?'
    Then I choose 'Refund query'
    Then I click the 'Continue' button
    Then I should be on the 'type' page showing 'What type of certificate did you order?'
    Then I choose 'Adoption'
    Then I click the 'Continue' button
    Then I should be on the 'person' page showing 'Whose name, including any middle names, is on the certificate you ordered?'
    Then I fill 'person-text' with 'Person Name A'
    Then I click the 'Continue' button
    Then I should be on the 'additional' page showing 'Additional information'
    Then I fill 'additional-text' text area with 'Additional information'
    Then I choose 'Yes'
    Then I click the 'Continue' button
    Then I should be on the 'how' page showing 'How did you place your order?'
    Then I check 'how-radio-online'
    Then I fill 'online-toggle-text' with 'COL123456/2015'
    Then I choose 'Continue'
    Then I should be on the 'which' page showing 'Which service did you pay for?'
    Then I check 'which-radio-standard'
    Then I choose 'Continue'
    Then I should be on the 'when' page showing 'When did you place your order?'
    Then I fill 'when-date-day' with '01'
    Then I fill 'when-date-month' with '01'
    Then I fill 'when-date-year' with '2020'
    Then I select 'Continue'
    Then I should be on the 'name' page showing 'What is your full name?'
    Then I fill 'name-text' with 'Person Name B'
    Then I select 'Continue'
    Then I should be on the 'email-address' page showing 'What is your email address?'
    Then I fill 'email-text' with 'test@test.com'
    Then I select 'Continue'
    Then I should be on the 'check-email' page showing 'Is the email address you entered correct?'
    Then I choose 'No'
    Then I select 'Continue'
    Then I should be on the 'email-address/edit' page showing 'What is your email address?'
    Then I fill 'email-text' with 'test@test.com'
    Then I select 'Continue'
    Then I should be on the 'check-email' page showing 'Is the email address you entered correct?'
    Then I choose 'Yes'
    Then I select 'Continue'
    Then I should be on the 'country' page showing 'What country is your address located?'
    Then I fill 'country-select' with 'United Kingdom' option
    Then I select 'Continue'
    Then I should be on the 'address' page showing 'What is your address?'
    Then I fill 'building' with 'Building 1'
    Then I fill 'street' with 'Street Name'
    Then I fill 'townOrCity' with 'London'
    Then I fill 'countyOrState' with 'Greater London'
    Then I fill 'postcodeOrZIPCode' with 'A12BCD'
    Then I click the 'Continue' button
    Then I should be on the 'confirm' page showing 'Is the information you have given us correct?'
    Then I should see 'Type of Order' and 'Certificate order' on the page
    Then I should see 'Reason for contact' and 'Refund query' on the page
    Then I should see 'Type of certificate' and 'Adoption' on the page
    Then I should see 'Name on certificate requested' and 'Person Name A' on the page
    Then I should see 'Further description' and 'Additional information' on the page
    Then I should see 'Have you previously been in contact about this enquiry?' and 'Yes' on the page
    Then I should see 'How was the order placed?' and 'Online' on the page
    Then I should see 'COL Number' and 'COL123456/2015' on the page
    Then I should see 'Service' and 'Standard' on the page
    Then I should see 'Date of application' and '1st January 2020' on the page
    Then I should see 'Full Name' and 'Person Name B' on the page
    Then I should see 'Email address' and 'test@test.com' on the page
    Then I should see 'Building and street' and 'Building 1' on the page
    Then I should see 'Address line 2' and 'Street Name' on the page
    Then I should see 'Town or city' and 'Town' on the page
    Then I should see 'County or state' and 'London' on the page
    Then I should see 'Postcode or ZIP Code' and 'A12BCD' on the page
    Then I should see 'Country' and 'United Kingdom' on the page

    # Change Reason For Contact
    Then I select change link 'about-radio-change-'
    Then I should see 'What would you like to contact us about?' on the page
    Then I choose 'Refund query'
    Then I click the 'Continue' button
    Then I should be on the 'confirm' page showing 'Is the information you have given us correct?'
    Then I should see 'Type of Order' and 'Certificate order' on the page
    Then I should see 'Reason for contact' and 'Refund query' on the page
    Then I should see 'Type of certificate' and 'Adoption' on the page
    Then I should see 'Name on certificate requested' and 'Person Name A' on the page
    Then I should see 'Further description' and 'Additional information' on the page
    Then I should see 'Have you previously been in contact about this enquiry?' and 'Yes' on the page
    Then I should see 'How was the order placed?' and 'Online' on the page
    Then I should see 'COL Number' and 'COL123456/2015' on the page
    Then I should see 'Service' and 'Standard' on the page
    Then I should see 'Date of application' and '1st January 2020' on the page
    Then I should see 'Full Name' and 'Person Name B' on the page
    Then I should see 'Email address' and 'test@test.com' on the page
    Then I should see 'Building and street' and 'Building 1' on the page
    Then I should see 'Address line 2' and 'Street Name' on the page
    Then I should see 'Town or city' and 'Town' on the page
    Then I should see 'County or state' and 'London' on the page
    Then I should see 'Postcode or ZIP Code' and 'A12BCD' on the page
    Then I should see 'Country' and 'United Kingdom' on the page

   # Change Type of Certificate
    Then I select change link 'type-radio-change-'
    Then I should see 'What type of certificate did you order?' on the page
    Then I choose 'Adoption'
    Then I click the 'Continue' button
    Then I should be on the 'confirm' page showing 'Is the information you have given us correct?'
    Then I should see 'Type of Order' and 'Certificate order' on the page
    Then I should see 'Reason for contact' and 'Refund query' on the page
    Then I should see 'Type of certificate' and 'Adoption' on the page
    Then I should see 'Name on certificate requested' and 'Person Name A' on the page
    Then I should see 'Further description' and 'Additional information' on the page
    Then I should see 'Have you previously been in contact about this enquiry?' and 'Yes' on the page
    Then I should see 'How was the order placed?' and 'Online' on the page
    Then I should see 'COL Number' and 'COL123456/2015' on the page
    Then I should see 'Service' and 'Standard' on the page
    Then I should see 'Date of application' and '1st January 2020' on the page
    Then I should see 'Full Name' and 'Person Name B' on the page
    Then I should see 'Email address' and 'test@test.com' on the page
    Then I should see 'Building and street' and 'Building 1' on the page
    Then I should see 'Address line 2' and 'Street Name' on the page
    Then I should see 'Town or city' and 'Town' on the page
    Then I should see 'County or state' and 'London' on the page
    Then I should see 'Postcode or ZIP Code' and 'A12BCD' on the page
    Then I should see 'Country' and 'United Kingdom' on the page


  Scenario: I am on the Refund query (about-radio-refund) journey, I ordered a Civil partnership
  certificate online and paid for the standard service.
  On the confirm page I want to change the reason for contact and type of certificate.
    Given I start the 'base' application journey
    Then I should be on the 'about' page showing 'Which type of order are you contacting us about?'
    Then I check 'order-type-certificate-order'
    Then I click the 'Continue' button
    Then I should be on the 'contact-reason' page showing 'What would you like to contact us about?'
    Then I choose 'Refund query'
    Then I click the 'Continue' button
    Then I should be on the 'type' page showing 'What type of certificate did you order?'
    Then I choose 'Civil partnership'
    Then I click the 'Continue' button
    Then I should be on the 'people' page showing 'Tell us the full names of party one on the certificate you requested'
    Then I fill 'person-one' with 'Person Name One'
    Then I fill 'person-two' with 'Person Name Two'
    Then I click the 'Continue' button
    Then I should be on the 'additional' page showing 'Additional information'
    Then I fill 'additional-text' text area with 'Additional information'
    Then I choose 'Yes'
    Then I click the 'Continue' button
    Then I should be on the 'how' page showing 'How did you place your order?'
    Then I check 'how-radio-online'
    Then I fill 'online-toggle-text' with 'COL123456/2015'
    Then I choose 'Continue'
    Then I should be on the 'which' page showing 'Which service did you pay for?'
    Then I check 'which-radio-standard'
    Then I choose 'Continue'
    Then I should be on the 'when' page showing 'When did you place your order?'
    Then I fill 'when-date-day' with '01'
    Then I fill 'when-date-month' with '01'
    Then I fill 'when-date-year' with '2020'
    Then I select 'Continue'
    Then I should be on the 'name' page showing 'What is your full name?'
    Then I fill 'name-text' with 'Person Name B'
    Then I select 'Continue'
    Then I should be on the 'email-address' page showing 'What is your email address?'
    Then I fill 'email-text' with 'test@test.com'
    Then I select 'Continue'
    Then I should be on the 'check-email' page showing 'Is the email address you entered correct?'
    Then I choose 'No'
    Then I select 'Continue'
    Then I should be on the 'email-address/edit' page showing 'What is your email address?'
    Then I fill 'email-text' with 'test@test.com'
    Then I select 'Continue'
    Then I should be on the 'check-email' page showing 'Is the email address you entered correct?'
    Then I choose 'Yes'
    Then I select 'Continue'
    Then I should be on the 'country' page showing 'What country is your address located?'
    Then I fill 'country-select' with 'United Kingdom' option
    Then I select 'Continue'
    Then I should be on the 'address' page showing 'What is your address?'
    Then I fill 'building' with 'Building 1'
    Then I fill 'street' with 'Street Name'
    Then I fill 'townOrCity' with 'London'
    Then I fill 'countyOrState' with 'Greater London'
    Then I fill 'postcodeOrZIPCode' with 'A12BCD'
    Then I click the 'Continue' button
    Then I should be on the 'confirm' page showing 'Is the information you have given us correct?'
    Then I should see 'Type of Order' and 'Certificate order' on the page
    Then I should see 'Reason for contact' and 'Refund query' on the page
    Then I should see 'Type of certificate' and 'Civil partnership' on the page
    Then I should see 'Party one on certificate requested' and 'Person Name One' on the page
    Then I should see 'Party two on certificate requested' and 'Person Name Two' on the page
    Then I should see 'Further description' and 'Additional information' on the page
    Then I should see 'Have you previously been in contact about this enquiry?' and 'Yes' on the page
    Then I should see 'How was the order placed?' and 'Online' on the page
    Then I should see 'COL Number' and 'COL123456/2015' on the page
    Then I should see 'Service' and 'Standard' on the page
    Then I should see 'Date of application' and '1st January 2020' on the page
    Then I should see 'Full Name' and 'Person Name B' on the page
    Then I should see 'Email address' and 'test@test.com' on the page
    Then I should see 'Building and street' and 'Building 1' on the page
    Then I should see 'Address line 2' and 'Street Name' on the page
    Then I should see 'Town or city' and 'Town' on the page
    Then I should see 'County or state' and 'London' on the page
    Then I should see 'Postcode or ZIP Code' and 'A12BCD' on the page
    Then I should see 'Country' and 'United Kingdom' on the page

    # Change Reason For Contact
    Then I select change link 'about-radio-change-'
    Then I should see 'What would you like to contact us about?' on the page
    Then I choose 'Refund query'
    Then I click the 'Continue' button
    Then I should be on the 'confirm' page showing 'Is the information you have given us correct?'
    Then I should see 'Type of Order' and 'Certificate order' on the page
    Then I should see 'Reason for contact' and 'Refund query' on the page
    Then I should see 'Type of certificate' and 'Civil partnership' on the page
    Then I should see 'Party one on certificate requested' and 'Person Name One' on the page
    Then I should see 'Party two on certificate requested' and 'Person Name Two' on the page
    Then I should see 'Further description' and 'Additional information' on the page
    Then I should see 'Have you previously been in contact about this enquiry?' and 'Yes' on the page
    Then I should see 'How was the order placed?' and 'Online' on the page
    Then I should see 'COL Number' and 'COL123456/2015' on the page
    Then I should see 'Service' and 'Standard' on the page
    Then I should see 'Date of application' and '1st January 2020' on the page
    Then I should see 'Full Name' and 'Person Name B' on the page
    Then I should see 'Email address' and 'test@test.com' on the page
    Then I should see 'Building and street' and 'Building 1' on the page
    Then I should see 'Address line 2' and 'Street Name' on the page
    Then I should see 'Town or city' and 'Town' on the page
    Then I should see 'County or state' and 'London' on the page
    Then I should see 'Postcode or ZIP Code' and 'A12BCD' on the page
    Then I should see 'Country' and 'United Kingdom' on the page

   # Change Type of Certificate
    Then I select change link 'type-radio-change-'
    Then I should see 'What type of certificate did you order?' on the page
    Then I choose 'Civil partnership'
    Then I click the 'Continue' button
    Then I should be on the 'confirm' page showing 'Is the information you have given us correct?'
    Then I should see 'Type of Order' and 'Certificate order' on the page
    Then I should see 'Reason for contact' and 'Refund query' on the page
    Then I should see 'Type of certificate' and 'Civil partnership' on the page
    Then I should see 'Party one on certificate requested' and 'Person Name One' on the page
    Then I should see 'Party two on certificate requested' and 'Person Name Two' on the page
    Then I should see 'Further description' and 'Additional information' on the page
    Then I should see 'Have you previously been in contact about this enquiry?' and 'Yes' on the page
    Then I should see 'How was the order placed?' and 'Online' on the page
    Then I should see 'COL Number' and 'COL123456/2015' on the page
    Then I should see 'Service' and 'Standard' on the page
    Then I should see 'Date of application' and '1st January 2020' on the page
    Then I should see 'Full Name' and 'Person Name B' on the page
    Then I should see 'Email address' and 'test@test.com' on the page
    Then I should see 'Building and street' and 'Building 1' on the page
    Then I should see 'Address line 2' and 'Street Name' on the page
    Then I should see 'Town or city' and 'Town' on the page
    Then I should see 'County or state' and 'London' on the page
    Then I should see 'Postcode or ZIP Code' and 'A12BCD' on the page
    Then I should see 'Country' and 'United Kingdom' on the page


  Scenario: I am on the Refund query (about-radio-refund) journey, I ordered a birth certificate on
  the telephone and paid for the priority service.
  On the confirm page I want to change the reason for contact and order placed method.
    Given I start the 'base' application journey
    Then I should be on the 'about' page showing 'Which type of order are you contacting us about?'
    Then I check 'order-type-certificate-order'
    Then I click the 'Continue' button
    Then I should be on the 'contact-reason' page showing 'What would you like to contact us about?'
    Then I choose 'Refund query'
    Then I click the 'Continue' button
    Then I should be on the 'type' page showing 'What type of certificate did you order?'
    Then I choose 'Birth'
    Then I click the 'Continue' button
    Then I should be on the 'person' page showing 'Whose name, including any middle names, is on the certificate you ordered?'
    Then I fill 'person-text' with 'Person Name A'
    Then I click the 'Continue' button
    Then I should be on the 'additional' page showing 'Additional information'
    Then I fill 'additional-text' text area with 'Additional information'
    Then I choose 'Yes'
    Then I click the 'Continue' button
    Then I should be on the 'how' page showing 'How did you place your order?'
    Then I check 'how-radio-telephone'
    Then I fill 'telephone-toggle-text' with '12345-1'
    Then I fill 'telephone-toggle-text-2' with '12345678'
    Then I choose 'Continue'
    Then I should be on the 'which' page showing 'Which service did you pay for?'
    Then I check 'which-radio-priority'
    Then I choose 'Continue'
    Then I should be on the 'when' page showing 'When did you place your order?'
    Then I fill 'when-date-day' with '01'
    Then I fill 'when-date-month' with '01'
    Then I fill 'when-date-year' with '2020'
    Then I select 'Continue'
    Then I should be on the 'name' page showing 'What is your full name?'
    Then I fill 'name-text' with 'Person Name B'
    Then I select 'Continue'
    Then I should be on the 'email-address' page showing 'What is your email address?'
    Then I fill 'email-text' with 'test@test.com'
    Then I select 'Continue'
    Then I should be on the 'check-email' page showing 'Is the email address you entered correct?'
    Then I choose 'No'
    Then I select 'Continue'
    Then I should be on the 'email-address/edit' page showing 'What is your email address?'
    Then I fill 'email-text' with 'test@test.com'
    Then I select 'Continue'
    Then I should be on the 'check-email' page showing 'Is the email address you entered correct?'
    Then I choose 'Yes'
    Then I select 'Continue'
    Then I should be on the 'country' page showing 'What country is your address located?'
    Then I fill 'country-select' with 'United Kingdom' option
    Then I select 'Continue'
    Then I should be on the 'address' page showing 'What is your address?'
    Then I fill 'building' with 'Building 1'
    Then I fill 'street' with 'Street Name'
    Then I fill 'townOrCity' with 'London'
    Then I fill 'countyOrState' with 'Greater London'
    Then I fill 'postcodeOrZIPCode' with 'A12BCD'
    Then I click the 'Continue' button
    Then I should be on the 'confirm' page showing 'Is the information you have given us correct?'
    Then I should see 'Type of Order' and 'Certificate order' on the page
    Then I should see 'Reason for contact' and 'Refund query' on the page
    Then I should see 'Type of certificate' and 'Birth' on the page
    Then I should see 'Name on certificate requested' and 'Person Name A' on the page
    Then I should see 'Further description' and 'Additional information' on the page
    Then I should see 'Have you previously been in contact about this enquiry?' and 'Yes' on the page
    Then I should see 'How was the order placed?' and 'Telephone' on the page
    Then I should see 'Order Number' and '12345-1' on the page
    Then I should see 'Account Number' and '1234567' on the page
    Then I should see 'Service' and 'Priority' on the page
    Then I should see 'Date of application' and '1st January 2020' on the page
    Then I should see 'Full Name' and 'Person Name B' on the page
    Then I should see 'Email address' and 'test@test.com' on the page
    Then I should see 'Building and street' and 'Building 1' on the page
    Then I should see 'Address line 2' and 'Street Name' on the page
    Then I should see 'Town or city' and 'Town' on the page
    Then I should see 'County or state' and 'London' on the page
    Then I should see 'Postcode or ZIP Code' and 'A12BCD' on the page
    Then I should see 'Country' and 'United Kingdom' on the page

    # Change Reason For Contact
    Then I select change link 'about-radio-change-'
    Then I should see 'What would you like to contact us about?' on the page
    Then I choose 'Refund query'
    Then I click the 'Continue' button
    Then I should be on the 'confirm' page showing 'Is the information you have given us correct?'
    Then I should see 'Type of Order' and 'Certificate order' on the page
    Then I should see 'Reason for contact' and 'Refund query' on the page
    Then I should see 'Type of certificate' and 'Birth' on the page
    Then I should see 'Name on certificate requested' and 'Person Name A' on the page
    Then I should see 'Further description' and 'Additional information' on the page
    Then I should see 'Have you previously been in contact about this enquiry?' and 'Yes' on the page
    Then I should see 'How was the order placed?' and 'Telephone' on the page
    Then I should see 'Order Number' and '12345-1' on the page
    Then I should see 'Account Number' and '1234567' on the page
    Then I should see 'Service' and 'Priority' on the page
    Then I should see 'Date of application' and '1st January 2020' on the page
    Then I should see 'Full Name' and 'Person Name B' on the page
    Then I should see 'Email address' and 'test@test.com' on the page
    Then I should see 'Building and street' and 'Building 1' on the page
    Then I should see 'Address line 2' and 'Street Name' on the page
    Then I should see 'Town or city' and 'Town' on the page
    Then I should see 'County or state' and 'London' on the page
    Then I should see 'Postcode or ZIP Code' and 'A12BCD' on the page
    Then I should see 'Country' and 'United Kingdom' on the page

   # Change Order Placed Method
    Then I select change link 'how-radio-change-'
    Then I should see 'How did you place your order?' on the page
    Then I check 'how-radio-telephone'
    Then I fill 'telephone-toggle-text' with '12345-2'
    Then I fill 'telephone-toggle-text-2' with '12345679'
    Then I choose 'Continue'
    Then I should be on the 'confirm' page showing 'Is the information you have given us correct?'
    Then I should see 'Type of Order' and 'Certificate order' on the page
    Then I should see 'Reason for contact' and 'Refund query' on the page
    Then I should see 'Type of certificate' and 'Birth' on the page
    Then I should see 'Name on certificate requested' and 'Person Name A' on the page
    Then I should see 'Further description' and 'Additional information' on the page
    Then I should see 'Have you previously been in contact about this enquiry?' and 'Yes' on the page
    Then I should see 'How was the order placed?' and 'Telephone' on the page
    Then I should see 'Order Number' and '12345-2' on the page
    Then I should see 'Account Number' and '12345679' on the page
    Then I should see 'Service' and 'Priority' on the page
    Then I should see 'Date of application' and '1st January 2020' on the page
    Then I should see 'Full Name' and 'Person Name B' on the page
    Then I should see 'Email address' and 'test@test.com' on the page
    Then I should see 'Building and street' and 'Building 1' on the page
    Then I should see 'Address line 2' and 'Street Name' on the page
    Then I should see 'Town or city' and 'Town' on the page
    Then I should see 'County or state' and 'London' on the page
    Then I should see 'Postcode or ZIP Code' and 'A12BCD' on the page
    Then I should see 'Country' and 'United Kingdom' on the page


  Scenario: I am on the Refund query (about-radio-refund) journey, I ordered a marriage certificate
  by post and paid for the priority service.
  On the confirm page I want to change the reason for contact and type of certificate.
    Given I start the 'base' application journey
    Then I should be on the 'about' page showing 'Which type of order are you contacting us about?'
    Then I check 'order-type-certificate-order'
    Then I click the 'Continue' button
    Then I should be on the 'contact-reason' page showing 'What would you like to contact us about?'
    Then I choose 'Refund query'
    Then I click the 'Continue' button
    Then I should be on the 'type' page showing 'What type of certificate did you order?'
    Then I choose 'Marriage'
    Then I click the 'Continue' button
    Then I should be on the 'people' page showing 'Tell us the full names of party one on the certificate you requested'
    Then I fill 'person-one' with 'Person Name One'
    Then I fill 'person-two' with 'Person Name Two'
    Then I click the 'Continue' button
    Then I should be on the 'additional' page showing 'Additional information'
    Then I fill 'additional-text' text area with 'Additional information'
    Then I choose 'Yes'
    Then I click the 'Continue' button
    Then I should be on the 'how' page showing 'How did you place your order?'
    Then I check 'how-radio-post'
    Then I choose 'Continue'
    Then I should be on the 'which' page showing 'Which service did you pay for?'
    Then I check 'which-radio-priority'
    Then I choose 'Continue'
    Then I should be on the 'when' page showing 'When did you place your order?'
    Then I fill 'when-date-day' with '01'
    Then I fill 'when-date-month' with '01'
    Then I fill 'when-date-year' with '2020'
    Then I select 'Continue'
    Then I should be on the 'name' page showing 'What is your full name?'
    Then I fill 'name-text' with 'Person Name B'
    Then I select 'Continue'
    Then I should be on the 'email-address' page showing 'What is your email address?'
    Then I fill 'email-text' with 'test@test.com'
    Then I select 'Continue'
    Then I should be on the 'check-email' page showing 'Is the email address you entered correct?'
    Then I choose 'No'
    Then I select 'Continue'
    Then I should be on the 'email-address/edit' page showing 'What is your email address?'
    Then I fill 'email-text' with 'test@test.com'
    Then I select 'Continue'
    Then I should be on the 'check-email' page showing 'Is the email address you entered correct?'
    Then I choose 'Yes'
    Then I select 'Continue'
    Then I should be on the 'country' page showing 'What country is your address located?'
    Then I fill 'country-select' with 'United Kingdom' option
    Then I select 'Continue'
    Then I should be on the 'address' page showing 'What is your address?'
    Then I fill 'building' with 'Building 1'
    Then I fill 'street' with 'Street Name'
    Then I fill 'townOrCity' with 'London'
    Then I fill 'countyOrState' with 'Greater London'
    Then I fill 'postcodeOrZIPCode' with 'A12BCD'
    Then I click the 'Continue' button
    Then I should be on the 'confirm' page showing 'Is the information you have given us correct?'
    Then I should see 'Type of Order' and 'Certificate order' on the page
    Then I should see 'Reason for contact' and 'Refund query' on the page
    Then I should see 'Type of certificate' and 'Marriage' on the page
    Then I should see 'Party one on certificate requested' and 'Person Name One' on the page
    Then I should see 'Party two on certificate requested' and 'Person Name Two' on the page
    Then I should see 'Further description' and 'Additional information' on the page
    Then I should see 'Have you previously been in contact about this enquiry?' and 'Yes' on the page
    Then I should see 'How was the order placed?' and 'Post' on the page
    Then I should see 'Service' and 'Priority' on the page
    Then I should see 'Date of application' and '1st January 2020' on the page
    Then I should see 'Full Name' and 'Person Name B' on the page
    Then I should see 'Email address' and 'test@test.com' on the page
    Then I should see 'Building and street' and 'Building 1' on the page
    Then I should see 'Address line 2' and 'Street Name' on the page
    Then I should see 'Town or city' and 'Town' on the page
    Then I should see 'County or state' and 'London' on the page
    Then I should see 'Postcode or ZIP Code' and 'A12BCD' on the page
    Then I should see 'Country' and 'United Kingdom' on the page

    # Change Reason For Contact
    Then I select change link 'about-radio-change-'
    Then I should see 'What would you like to contact us about?' on the page
    Then I choose 'Refund query'
    Then I click the 'Continue' button
    Then I should be on the 'confirm' page showing 'Is the information you have given us correct?'
    Then I should see 'Type of Order' and 'Certificate order' on the page
    Then I should see 'Reason for contact' and 'Refund query' on the page
    Then I should see 'Type of certificate' and 'Marriage' on the page
    Then I should see 'Party one on certificate requested' and 'Person Name One' on the page
    Then I should see 'Party two on certificate requested' and 'Person Name Two' on the page
    Then I should see 'Further description' and 'Additional information' on the page
    Then I should see 'Have you previously been in contact about this enquiry?' and 'Yes' on the page
    Then I should see 'How was the order placed?' and 'Post' on the page
    Then I should see 'Service' and 'Priority' on the page
    Then I should see 'Date of application' and '1st January 2020' on the page
    Then I should see 'Full Name' and 'Person Name B' on the page
    Then I should see 'Email address' and 'test@test.com' on the page
    Then I should see 'Building and street' and 'Building 1' on the page
    Then I should see 'Address line 2' and 'Street Name' on the page
    Then I should see 'Town or city' and 'Town' on the page
    Then I should see 'County or state' and 'London' on the page
    Then I should see 'Postcode or ZIP Code' and 'A12BCD' on the page
    Then I should see 'Country' and 'United Kingdom' on the page

   # Change Order Placed Method
    Then I select change link 'how-radio-change-'
    Then I should see 'How did you place your order?' on the page
    Then I check 'how-radio-post'
    Then I choose 'Continue'
    Then I select change link 'type-radio-change-'
    Then I should see 'What type of certificate did you order?' on the page
    Then I choose 'Marriage'
    Then I click the 'Continue' button
    Then I should be on the 'confirm' page showing 'Is the information you have given us correct?'
    Then I should see 'Type of Order' and 'Certificate order' on the page
    Then I should see 'Reason for contact' and 'Refund query' on the page
    Then I should see 'Type of certificate' and 'Marriage' on the page
    Then I should see 'Party one on certificate requested' and 'Person Name One' on the page
    Then I should see 'Party two on certificate requested' and 'Person Name Two' on the page
    Then I should see 'Further description' and 'Additional information' on the page
    Then I should see 'Have you previously been in contact about this enquiry?' and 'Yes' on the page
    Then I should see 'How was the order placed?' and 'Post' on the page
    Then I should see 'Service' and 'Priority' on the page
    Then I should see 'Date of application' and '1st January 2020' on the page
    Then I should see 'Full Name' and 'Person Name B' on the page
    Then I should see 'Email address' and 'test@test.com' on the page
    Then I should see 'Building and street' and 'Building 1' on the page
    Then I should see 'Address line 2' and 'Street Name' on the page
    Then I should see 'Town or city' and 'Town' on the page
    Then I should see 'County or state' and 'London' on the page
    Then I should see 'Postcode or ZIP Code' and 'A12BCD' on the page
    Then I should see 'Country' and 'United Kingdom' on the page

