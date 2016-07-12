@alternate_content
Feature: I am shown different content depending on previous answers

  @about @additional
  Scenario: I am shown the additional-name field if I select wrong-certificate
    Given I am on the start page for the form
    Then I can see the questions for the about page of the form
    When I click wrong_certificate and then continue
    Then I am taken to the type page of the form
    When I click birth and then continue
    Then I am taken to the person_wrong_certificate page of the form
    When I fill in the name on the certificate
    Then I am taken to the additional page of the form
    And I can see the additional_names field
    And I enter additional_fullname into the additional_names field
    And I enter free_text into the additional_text field
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
    When I enter my full name
    Then I am taken to the email page of the form
    When I enter my email address
    Then I am taken to the country page of the form
    When I enter my country
    Then I am taken to the postcode page of the form
    When I enter my postcode
    Then I am taken to the address page of the form
    When I select my address
    Then I am taken to the confirm page of the form
    Then I should see the headers and my information in the summary:
      |  table_not_received         |  wrong_certificate_summary  |
      |  table_type                 |  birth_summary              |
      |  table_person_text          |  full_name                  |
      |  table_additional_names     |  addtional_fullname         |
      |  table_additional_text      |  free_text                  |
      |  table_additional_radio     |  yes_summary                |
      |  table_which                |  standard_summary           |
      |  table_when                 |  date_summary               |
      |  table_name                 |  full_name                  |
      |  table_email                |  email_address              |
      |  table_country              |  country_summary            |
      |  table_post                 |  address_summary            |
    When I click Confirm submission
    Then I am taken to the confirmation page
