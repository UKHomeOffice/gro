@validations
Feature: I see the correct error messages in the form

  @about @type @person @additional @how
  Scenario: About page radio button validation
    Given I am on the start page for the form
    Then I can see the questions for the about page of the form
    When I click continue
    Then I should see the about error
    When I click not_received and then continue
    Then I am taken to the type page of the form
    When I click continue
    Then I should see the type error
    When I click birth and then continue
    Then I am taken to the person page of the form
    When I click continue
    Then I should see the person error
    When I fill in the name on the certificate
    Then I am taken to the additional page of the form
    When I click continue
    Then I should see the additional error
    When I click previous_yes and then continue
    Then I am taken to the how page of the form
    When I click continue
    Then I should see the how error

  @details
  Scenario: Details page validation (complaint)
    Given I am on the start page for the form
    Then I can see the questions for the about page of the form
    When I click complaint and then continue
    Then I am taken to the details_complaint page of the form
    When I click continue
    Then I should see the details_complaint error
    And I should see the existing_complaint error
    And I should see the previous_complaint error
    When I choose no for existing and no for previous complaint
    Then I am taken to the name page of the form

  @details
  Scenario: Details page validation (other)
    Given I am on the start page for the form
    Then I can see the questions for the about page of the form
    When I click other and then continue
    Then I am taken to the details_other page of the form
    When I click continue
    Then I should see the details_other error
    And I should see the existing_other error
    And I should see the previous_other error
    When I choose no for existing and no for previous complaint
    Then I am taken to the name page of the form

  @people
  Scenario: People page validation
    Given I am on the start page for the form
    Then I can see the questions for the about page of the form
    When I click not_received and then continue
    Then I am taken to the type page of the form
    When I click marriage and then continue
    Then I am taken to the people page of the form
    When I click continue
    Then I should see the person error

  @which
  Scenario: Which page validation
    Given I am on the start page for the form
    Then I can see the questions for the about page of the form
    When I click not_received and then continue
    Then I am taken to the type page of the form
    When I click marriage and then continue
    Then I am taken to the people page of the form
    When I enter both names on the certificate
    Then I am taken to the additional page of the form
    When I click previous_yes and then continue
    Then I am taken to the how page of the form
    When I click on online
    And I enter col_number into the online_text field
    When I click continue
    Then I am taken to the which page of the form
    When I click continue
    Then I should see the which error

  @when
  Scenario: When page validation
    Given I am on the start page for the form
    Then I can see the questions for the about page of the form
    When I click not_received and then continue
    Then I am taken to the type page of the form
    When I click birth and then continue
    Then I am taken to the person page of the form
    When I fill in the name on the certificate
    Then I am taken to the additional page of the form
    When I click previous_yes and then continue
    Then I am taken to the how page of the form
    When I click on online
    And I enter col_number into the online_text field
    When I click continue
    Then I am taken to the which page of the form
    When I click standard and then continue
    Then I am taken to the when page of the form
    When I click continue
    Then I should see the when error

  @when @invalid_date
  Scenario: When page validation
    Given I am on the start page for the form
    Then I can see the questions for the about page of the form
    When I click not_received and then continue
    Then I am taken to the type page of the form
    When I click birth and then continue
    Then I am taken to the person page of the form
    When I fill in the name on the certificate
    Then I am taken to the additional page of the form
    When I click previous_yes and then continue
    Then I am taken to the how page of the form
    When I click on online
    And I enter col_number into the online_text field
    When I click continue
    Then I am taken to the which page of the form
    When I click standard and then continue
    Then I am taken to the when page of the form
    When I enter an invalid date
    Then I should see the date error

  @name @email @invalid_email @address
  Scenario: Name page validation
    Given I am on the start page for the form
    Then I can see the questions for the about page of the form
    When I click not_received and then continue
    Then I am taken to the type page of the form
    When I click birth and then continue
    Then I am taken to the person page of the form
    When I fill in the name on the certificate
    Then I am taken to the additional page of the form
    When I click previous_yes and then continue
    Then I am taken to the how page of the form
    When I click on online
    And I enter col_number into the online_text field
    When I click continue
    Then I am taken to the which page of the form
    When I click standard and then continue
    Then I am taken to the when page of the form
    When I enter a date
    Then I am taken to the name page of the form
    When I click continue
    Then I should see the name error
    When I enter my full name
    Then I am taken to the email page of the form
    When I click continue
    Then I should see the email error
    When I enter free_text into the email_text field
    When I click continue
    Then I should see the invalid_email error
    When I enter my email address
    Then I am taken to the country page of the form
    When I enter my country
    Then I am taken to the postcode page of the form
    When I enter my postcode
    Then I am taken to the address page of the form

  @how @invalid_account
  Scenario: When page validation
    Given I am on the start page for the form
    Then I can see the questions for the about page of the form
    When I click not_received and then continue
    Then I am taken to the type page of the form
    When I click birth and then continue
    Then I am taken to the person page of the form
    When I fill in the name on the certificate
    Then I am taken to the additional page of the form
    When I click previous_yes and then continue
    Then I am taken to the how page of the form
    When I click on telephone
    And I enter invalid_acc_number into the telephone_toggle_text_2 field
    When I click continue
    Then I should see the invalid_account error

  @address @country @postcode
  Scenario: Address page validation
    Given I am on the start page for the form
    And I click complaint and then continue
    And I choose no for existing and no for previous complaint
    Then I am taken to the name page of the form
    When I enter my full name
    And I click continue
    And I enter my email address
    And I click continue
    Then I am taken to the country page of the form
    When I click continue
    Then I should see the country_missing error
    When I enter free_text into the country_select field
    And I click continue
    Then I should see the country_invalid error
    When I enter my country
    Then I am taken to the postcode page of the form
    When I click continue
    Then I should see the postcode_missing error
    When I enter free_text into the postcode_code field
    And I click continue
    Then I should see the postcode_invalid error
    When I enter my postcode
    And I click continue
    Then I am taken to the address page of the form
    When I click continue
    Then I should see the address_lookup error

    @name @not_url_error
    Scenario: notUrl validation name-field
    Given I am on the start page for the form
    Then I can see the questions for the about page of the form
    When I click not_received and then continue
    Then I am taken to the type page of the form
    When I click birth and then continue
    Then I am taken to the person page of the form
    When I enter url into the person-text field
    And I click continue
    Then I should see the not_url_error error

    @address @not_url_error
    Scenario: notUrl validation address-field
    Given I am on the start page for the form
    Then I can see the questions for the about page of the form
    When I click not_received and then continue
    Then I am taken to the type page of the form
    When I click birth and then continue
    Then I am taken to the person page of the form
    When I enter my full name into the person-text field
    And I click continue
    When I enter url into the additional-text field
    And I click continue
    Then I should see the not_url_error error





