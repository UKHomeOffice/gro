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
    When I click online and then continue
    Then I should see the online error
    When I click telephone and then continue
    Then I should see the telephone error
    When I click post and then continue
    Then I should see the post error

  @details
  Scenario: Details page validation
    Given I am on the start page for the form
    Then I can see the questions for the about page of the form
    When I click complaint and then continue
    Then I am taken to the details page of the form
    When I click continue
    Then I should see the details error
    When I enter free_text into the details_text field
    When I click continue
    Then I should see the existing error
    When I click on existing_radio_yes
    When I click continue
    Then I should see the previous error

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
    Then I am taken to the post page of the form
    When I click continue
    Then I should see the country error
