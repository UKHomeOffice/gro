@feature @nonUkCountries

Feature: testing

  Scenario: I am on the Order not received (about-radio-not-received) journey, I ordered a birth certificate online,
  and paid for the standard service.
  On the confirm page I want to change the reason for contact and type of certificate.
    Given I start the 'base' application journey
    Then I should be on the 'about' page showing 'Which type of order are you contacting us about?'
    Then I check 'order-type-certificate-order'
    Then I click the 'Continue' button
    Then I should be on the 'contact-reason' page showing 'What would you like to contact us about?'
    Then I choose 'Order not received'
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
    Then I choose 'Yes'
    Then I select 'Continue'
    Then I should be on the 'country' page showing 'What country is your address located?'
    Then I fill 'country-select' with 'France' option
    Then I select 'Continue'
    Then I should be on the 'address-nonuk' page showing 'Enter your address in France'
    Then I fill 'nonUkAddress' text area with '38 rue de la République, Lyon, Rhône-Alpes, 69004'
    Then I click the 'Continue' button
    Then I should be on the 'confirm' page showing 'Is the information you have given us correct?'
    Then I should see 'Type of Order' and 'Certificate order' on the page
    Then I should see 'Reason for contact' and 'Order not received' on the page
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
    Then I should see 'Country' and 'France' on the page
    Then I should see 'Your current address' and '38 rue de la République, Lyon, Rhône-Alpes, 69004' on the page

    # Change Reason For Contact
    Then I select change link 'about-radio-change-'
    Then I should see 'What would you like to contact us about?' on the page
    Then I choose 'Order not received'
    Then I click the 'Continue' button
    Then I should be on the 'confirm' page showing 'Is the information you have given us correct?'
    Then I should see 'Type of Order' and 'Certificate order' on the page
    Then I should see 'Reason for contact' and 'Order not received' on the page
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
    Then I should see 'Country' and 'France' on the page
    Then I should see 'Your current address' and '38 rue de la République, Lyon, Rhône-Alpes, 69004' on the page

    # Change Type of Certificate
    Then I select change link 'type-radio-change-'
    Then I should see 'What type of certificate did you order?' on the page
    Then I choose 'Birth'
    Then I click the 'Continue' button
    Then I should be on the 'confirm' page showing 'Is the information you have given us correct?'
    Then I should see 'Type of Order' and 'Certificate order' on the page
    Then I should see 'Reason for contact' and 'Order not received' on the page
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
    Then I should see 'Country' and 'France' on the page
    Then I should see 'Your current address' and '38 rue de la République, Lyon, Rhône-Alpes, 69004' on the page

