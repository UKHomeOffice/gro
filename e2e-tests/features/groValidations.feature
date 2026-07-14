@GroRegression

Feature: GRO - General Register Office - Page Validations

  Background:
    Given Test data has been created for "GRO" scenarios

  Scenario: GRO - Field page validation error message
    Given I selected the data for scenario "3" - "S3 - PDF Order (Poor quality order - Death Cert)"
    And I visit the General Register Office page
    When I select continue
    Then I see "There is a problem" error header message displayed for GRO
    And I see "Tell us which type of order you are contacting us about" error message displayed for GRO
    When I select order type "PDF order" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for GRO
    And I see "Tell us what you are contacting us about" error message displayed for GRO
    When I select reason for contacting us "Wrong order received" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for GRO
    And I see "Tell us the type of certificate that was ordered" error message displayed for GRO
    When I select certificate type "Birth" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for GRO
    And I see "Enter a full name" error message displayed for GRO
    When I enter full name on certificate and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for GRO
    And I see "Tell us if you have previously been in contact about this enquiry" error message displayed for GRO
    When I enter additional information, select "Yes" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for GRO
    And I see "Tell us how you placed your order" error message displayed for GRO
    When I select how you placed order and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for GRO
    And I see "Tell us which service you paid for" error message displayed for GRO
    When I select service type and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for GRO
    And I see "Tell us when you placed your order" error message displayed for GRO
    When I enter order date "10/10/2009" and click continue
    Then I see "There is a problem" error header message displayed for GRO
    And I see "Enter a date after 1-1-2010" error message displayed for GRO
    When I enter order date "11/9/2018" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for GRO
    And I see "Tell us your full name" error message displayed for GRO
    When I enter full name and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for GRO
    And I see "Enter an email address" error message displayed for GRO
    When I enter email address "sas-hof-test@" and click continue
    Then I see "There is a problem" error header message displayed for GRO
    And I see "The email address isn't valid, enter a valid email address" error message displayed for GRO
    When I enter email address "sas-hof-test@digital.homeoffice.gov.uk" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for GRO
    And I see "Tell us whether your email address is correct" error message displayed for GRO
    When I confirm email address entered is correct and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for GRO
    And I see "Enter your country" error message displayed for GRO
    And I enter country "United Kingdom" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for GRO
    And I see "Enter details of your building and street" error link message displayed for GRO
    And I see "Enter a town or city" error link message displayed for GRO
    And I see "Enter a county" error link message displayed for GRO
    And I see "Enter your postcode" error link message displayed for GRO
    When I click the "Back" button for GRO
    And I enter country "Invalid country" and click continue
    Then I see "There is a problem" error header message displayed for GRO
    And I see "Pick a country from the list" error message displayed for GRO
    When I enter country "Cuba" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for GRO
    And I see "Enter your address" error message displayed for GRO

  Scenario: GRO - Field page validation error message - Service Compliant/Feedback path
    Given I selected the data for scenario "9" - "S9 - Digital Image Order (Service compliant - Civil partnership Cert)"
    And I visit the General Register Office page
    When I select continue
    Then I see "There is a problem" error header message displayed for GRO
    And I see "Tell us which type of order you are contacting us about" error message displayed for GRO
    When I select order type "Online View Digital Image order" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for GRO
    And I see "Tell us what you are contacting us about" error message displayed for GRO
    When I select reason for contacting us "Other issues and feedback" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for GRO
    And I see "Tell us about your enquiry" error link message displayed for GRO
    And I see "Tell us if your enquiry is about an existing order" error link message displayed for GRO
    And I see "Tell us if you have already enquired about this issue" error link message displayed for GRO
    When I click the "Back" button for GRO
    And I select reason for contacting us "Service complaint" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for GRO
    And I see "Tell us about your complaint" error link message displayed for GRO
    And I see "Tell us if your complaint is about an existing order" error link message displayed for GRO
    And I see "Tell us if you have already complained about this issue" error link message displayed for GRO
    When I complete the enquiry complaint page details and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for GRO
    And I see "Tell us the type of certificate that was ordered" error message displayed for GRO
    When I select certificate type "Birth" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for GRO
    And I see "Enter a full name" error message displayed for GRO
    When I enter full name on certificate and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for GRO
    And I see "Tell us how you placed your order" error message displayed for GRO
    When I select how you placed order and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for GRO
    And I see "Tell us which service you paid for" error message displayed for GRO
    When I select service type and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for GRO
    And I see "Tell us when you placed your order" error message displayed for GRO
    When I enter order date "0/10/2018" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for GRO
    And I see "Tell us when you placed your order" error message displayed for GRO
    When I enter order date "5/0/2018" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for GRO
    And I see "Tell us when you placed your order" error message displayed for GRO
