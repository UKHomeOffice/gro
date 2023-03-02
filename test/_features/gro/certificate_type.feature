@feature @gro @certificate_type
Feature: Certificate Types
  A user should be able to select a certificate type and go through the appropriate pages following this selection

  Scenario: Birth Type
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
    Then I fill 'person-text' with 'Joe Bloggs'
    Then I click the 'Continue' button
    Then I should be on the 'additional' page showing 'Additional information'
    Then I fill 'additional-text' text area with 'enquiry information'
    Then I choose 'Yes'
    Then I click the 'Continue' button
    Then I should be on the 'how' page showing 'How did you place your order?'

  @marriage_or_civil
  Scenario: Marriage Type - No Additional Names
    Given I start the 'base' application journey
    Then I should be on the 'about' page showing 'Which type of order are you contacting us about?'
    Then I check 'order-type-certificate-order'
    Then I click the 'Continue' button
    Then I should be on the 'contact-reason' page showing 'What would you like to contact us about?'
    Then I choose 'Order not received'
    Then I click the 'Continue' button
    Then I should be on the 'type' page showing 'What type of certificate did you order?'
    Then I choose 'Marriage'
    Then I click the 'Continue' button
    Then I should be on the 'people' page showing 'Tell us the full names of party one on the certificate you requested'
    Then I fill 'person-one' with 'Person1'
    Then I fill 'person-two' with 'Person2'
    Then I click the 'Continue' button
    Then I should be on the 'additional' page showing 'Additional information'
    Then I fill 'additional-text' text area with 'Additional Enquiry Text'
    Then I check 'additional-radio-yes'
    Then I click the 'Continue' button
    Then I should be on the 'how' page showing 'How did you place your order?'

  @marriage_or_civil
  Scenario: Marriage Type - Additional Details Already Filled In
    Given I start the 'base' application journey
    Then I should be on the 'about' page showing 'Which type of order are you contacting us about?'
    Then I check 'order-type-certificate-order'
    Then I click the 'Continue' button
    Then I should be on the 'contact-reason' page showing 'What would you like to contact us about?'
    Then I choose 'Service complaint'
    Then I click the 'Continue' button
    Then I should be on the 'details' page showing 'Provide details of your complaint'
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

  @marriage_or_civil @wrong_certificate
  Scenario: Marriage Type - Wrong Certificate Received - Additional Names
    Given I start the 'base' application journey
    Then I should be on the 'about' page showing 'Which type of order are you contacting us about?'
    Then I check 'order-type-certificate-order'
    Then I click the 'Continue' button
    Then I should be on the 'contact-reason' page showing 'What would you like to contact us about?'
    Then I choose 'Wrong order received'
    Then I click the 'Continue' button
    Then I should be on the 'type' page showing 'What type of certificate did you order?'
    Then I choose 'Marriage'
    Then I click the 'Continue' button
    Then I should be on the 'people' page showing 'Tell us the full names of party one on the certificate you requested'
    Then I fill 'person-one' with 'Person1'
    Then I fill 'person-two' with 'Person2'
    Then I click the 'Continue' button
    Then I should be on the 'additional' page showing 'Additional information'
    Then I fill 'additional-names' text area with 'Additional Names'
    Then I fill 'additional-text' text area with 'Additional Enquiry Text'
    Then I check 'additional-radio-yes'
    Then I click the 'Continue' button
    Then I should be on the 'how' page showing 'How did you place your order?'

  Scenario: Death Type
    Given I start the 'base' application journey
    Then I should be on the 'about' page showing 'Which type of order are you contacting us about?'
    Then I check 'order-type-certificate-order'
    Then I click the 'Continue' button
    Then I should be on the 'contact-reason' page showing 'What would you like to contact us about?'
    Then I choose 'Order not received'
    Then I click the 'Continue' button
    Then I should be on the 'type' page showing 'What type of certificate did you order?'
    Then I choose 'Death'
    Then I click the 'Continue' button
    Then I should be on the 'person' page showing 'Whose name, including any middle names, is on the certificate you ordered?'
    Then I fill 'person-text' with 'Joe Bloggs'
    Then I click the 'Continue' button
    Then I should be on the 'additional' page showing 'Additional information'
    Then I fill 'additional-text' text area with 'enquiry information'
    Then I choose 'Yes'
    Then I click the 'Continue' button
    Then I should be on the 'how' page showing 'How did you place your order?'

  Scenario: Adoption Type
    Given I start the 'base' application journey
    Then I should be on the 'about' page showing 'Which type of order are you contacting us about?'
    Then I check 'order-type-certificate-order'
    Then I click the 'Continue' button
    Then I should be on the 'contact-reason' page showing 'What would you like to contact us about?'
    Then I choose 'Order not received'
    Then I click the 'Continue' button
    Then I should be on the 'type' page showing 'What type of certificate did you order?'
    Then I choose 'Adoption'
    Then I click the 'Continue' button
    Then I should be on the 'person' page showing 'Whose name, including any middle names, is on the certificate you ordered?'
    Then I fill 'person-text' with 'Joe Bloggs'
    Then I click the 'Continue' button
    Then I should be on the 'additional' page showing 'Additional information'
    Then I fill 'additional-text' text area with 'enquiry information'
    Then I choose 'Yes'
    Then I click the 'Continue' button
    Then I should be on the 'how' page showing 'How did you place your order?'

  @marriage_or_civil
  Scenario: Civil Partnership Type - No Additional Names
    Given I start the 'base' application journey
    Then I should be on the 'about' page showing 'Which type of order are you contacting us about?'
    Then I check 'order-type-certificate-order'
    Then I click the 'Continue' button
    Then I should be on the 'contact-reason' page showing 'What would you like to contact us about?'
    Then I choose 'Order not received'
    Then I click the 'Continue' button
    Then I should be on the 'type' page showing 'What type of certificate did you order?'
    Then I choose 'Civil partnership'
    Then I click the 'Continue' button
    Then I should be on the 'people' page showing 'Tell us the full names of party one on the certificate you requested'
    Then I fill 'person-one' with 'Person1'
    Then I fill 'person-two' with 'Person2'
    Then I click the 'Continue' button
    Then I should be on the 'additional' page showing 'Additional information'
    Then I fill 'additional-text' text area with 'Additional Enquiry Text'
    Then I check 'additional-radio-yes'
    Then I click the 'Continue' button
    Then I should be on the 'how' page showing 'How did you place your order?'

  @marriage_or_civil
  Scenario: Civil Partnership Type - Additional Details Already Filled In
    Given I start the 'base' application journey
    Then I should be on the 'about' page showing 'Which type of order are you contacting us about?'
    Then I check 'order-type-certificate-order'
    Then I click the 'Continue' button
    Then I should be on the 'contact-reason' page showing 'What would you like to contact us about?'
    Then I choose 'Service complaint'
    Then I click the 'Continue' button
    Then I should be on the 'details' page showing 'Provide details of your complaint'
    Then I fill 'details-text' text area with 'details information'
    Then I check 'existing-radio-yes'
    Then I check 'previous-radio-yes'
    Then I click the 'Continue' button
    Then I should be on the 'type' page showing 'What type of certificate did you order?'
    Then I choose 'Civil partnership'
    Then I click the 'Continue' button
    Then I should be on the 'people' page showing 'Tell us the full names of party one on the certificate you requested'
    Then I fill 'person-one' with 'Person1'
    Then I fill 'person-two' with 'Person2'
    Then I click the 'Continue' button
    Then I should be on the 'how' page showing 'How did you place your order?'

  @marriage_or_civil @wrong_certificate
  Scenario: Civil Partnership Type - Wrong Certificate Received - Additional Names
    Given I start the 'base' application journey
    Then I should be on the 'about' page showing 'Which type of order are you contacting us about?'
    Then I check 'order-type-certificate-order'
    Then I click the 'Continue' button
    Then I should be on the 'contact-reason' page showing 'What would you like to contact us about?'
    Then I choose 'Wrong order received'
    Then I click the 'Continue' button
    Then I should be on the 'type' page showing 'What type of certificate did you order?'
    Then I choose 'Civil partnership'
    Then I click the 'Continue' button
    Then I should be on the 'people' page showing 'Tell us the full names of party one on the certificate you requested'
    Then I fill 'person-one' with 'Person1'
    Then I fill 'person-two' with 'Person2'
    Then I click the 'Continue' button
    Then I should be on the 'additional' page showing 'Additional information'
    Then I fill 'additional-names' text area with 'Additional Names'
    Then I fill 'additional-text' text area with 'Additional Enquiry Text'
    Then I check 'additional-radio-yes'
    Then I click the 'Continue' button
    Then I should be on the 'how' page showing 'How did you place your order?'
