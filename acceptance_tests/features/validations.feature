@validation
Feature: I see the correct error messages in the form

  @about @type @person @how
  Scenario: About page radio button validation
    Given I am on the start page for the form
    Then I can see the questions for the about page of the form
    When I click continue
    Then I should see the about error
    When I click not_received and then continue
    Then I am taken to the type page of the form
    When I click continue
    Then I should see the type error
    When I click on birth
    Then I am taken to the person page of the form
    When I click continue
    Then I should see the person error
    When I fill in the name on the certificate
    Then I am taken to the how page of the form
    When I click continue
    Then I should see the how error
    When I click on online
    Then I should see the online error
    When I click on telephone
    Then I should see the telephone error
    When I click on post
    Then I should see the post error


  @details
  Scenario: Details page validation
    Given I am on the start page for the form
    Then I can see the questions for the about page of the form
    When I click complaint and then continue
    Then I am taken to the details page of the form
    When I click continue
    Then I should see the details error
    When I fill in the details_text
    When I click continue
    Then I should see the details_text error
    When I click on existing-radio
    When I click continue
    Then I should see the existing_radio error

  @people
  Scenario: People page validation
    Given I am on the start page for the form
    Then I can see the questions for the about page of the form
    When I click not_received and then continue
    Then I am taken to the type page of the form
    When I click on marriage
    Then I am taken to the people page of the form
    When I click continue
    Then I should see the people error

  @which @order_number
  Scenario: Which page validation
    Given I am on the start page for the form
    Then I can see the questions for the about page of the form
    When I click not_received and then continue
    Then I am taken to the type page of the form
    When I click marriage and then continue
    Then I am taken to the people page of the form
    When I enter both names on the certificate
    Then I am taken to the how page of the form
    When I click on online
    Then I am taken to the which page of the form
    When I click continue
    Then I should see the which error
    When I click on standard
    Then I should see the order_number error

  @which @standard
  Scenario: Which page validation
    Given I am on the start page for the form
    Then I can see the questions for the about page of the form
    When I click not_received and then continue
    Then I am taken to the type page of the form
    When I click marriage and then continue
    Then I am taken to the people page of the form
    When I enter both names on the certificate
    Then I am taken to the how page of the form
    When I click on online
    Then I am taken to the which page of the form
    When I enter the order number
    When I click continue
    Then I should see the order error

  @when
  Scenario: When page validation
    Given I am on the start page for the form
    Then I can see the questions for the about page of the form
    When I click not_received and then continue
    Then I am taken to the type page of the form
    When I click birth and then continue
    Then I am taken to the person page of the form
    When I fill in the name on the certificate
    Then I am taken to the how page of the form
    When I click online and then continue
    Then I am taken to the which page of the form
    When I choose standard and enter my order number
    Then I am taken to the when page of the form
    When I click continue
    Then I should see the when error

  @when
  Scenario: When page validation
    Given I am on the start page for the form
    Then I can see the questions for the about page of the form
    When I click not_received and then continue
    Then I am taken to the type page of the form
    When I click birth and then continue
    Then I am taken to the person page of the form
    When I fill in the name on the certificate
    Then I am taken to the how page of the form
    When I click online and then continue
    Then I am taken to the which page of the form
    When I choose standard and enter my order number
    Then I am taken to the when page of the form
    When I enter an invalid date
    Then I should see the date error
   
  @name
  Scenario: Name page validation
    Given I am on the start page for the form
    Then I can see the questions for the about page of the form
    When I click not_received and then continue
    Then I am taken to the type page of the form
    When I click birth and then continue
    Then I am taken to the person page of the form
    When I fill in the name on the certificate
    Then I am taken to the how page of the form
    When I click online and then continue
    Then I am taken to the which page of the form
    When I choose standard and enter my order number
    Then I am taken to the when page of the form
    When I enter a date
    Then I am taken to the name page of the form
    When I click continue
    Then I should see the name error
