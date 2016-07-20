@happy
Feature: I am able to navigate through the GRO form correctly
  Background:
    Given I am on the start page for the form
    Then I can see the questions for the about page of the form
    When I click not_received and then continue
    Then I am taken to the type page of the form
    When I click birth and then continue
    Then I am taken to the person page of the form
    When I fill in the name on the certificate
    Then I am taken to the additional page of the form
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


  Scenario: Happy postcode lookup, country is United Kingdom, postcode is within GB
    When I enter my country uk
    Then I am taken to the postcode page of the form
    When I enter my postcode
    Then I am taken to the address page of the form
    When I select my address
    Then I am taken to the confirm page of the form
    Then I should see the headers and my information in the summary:
      |  table_not_received         |  not_received_summary  |
      |  table_type                 |  birth_summary         |
      |  table_person_text          |  full_name             |
      |  table_additional_text      |  free_text             |
      |  table_additional_radio     |  yes_summary           |
      |  table_which                |  standard_summary      |
      |  table_when                 |  date_summary          |
      |  table_name                 |  full_name             |
      |  table_email                |  email_address         |
      |  table_country              |  country_summary       |
      |  table_address              |  address_summary       |
    When I click Confirm submission
    Then I am taken to the confirmation page

  Scenario: Happy postcode lookup, country is not United Kingdom
    When I enter my country not uk
    Then I am taken to the address-outside page of the form
    When I enter my address
    Then I am taken to the confirm page of the form
    Then I should see the headers and my information in the summary:
      |  table_not_received         |  not_received_summary   |
      |  table_type                 |  birth_summary          |
      |  table_person_text          |  full_name              |
      |  table_additional_text      |  free_text              |
      |  table_additional_radio     |  yes_summary            |
      |  table_which                |  standard_summary       |
      |  table_when                 |  date_summary           |
      |  table_name                 |  full_name              |
      |  table_email                |  email_address          |
      |  table_country              |  country_summary_not_uk |
      |  table_address              |  address_summary_not_uk |
    When I click Confirm submission
    Then I am taken to the confirmation page

  Scenario: Happy postcode lookup, country is United Kingdom, postcode is not in MOJ
    When I enter my country
    Then I am taken to the postcode page of the form
    When I enter my postcode not in MOJ
    Then I am taken to the no-postcode page of the form
    When I enter my address
    Then I am taken to the confirm page of the form
    Then I should see the headers and my information in the summary:
      |  table_not_received         |  not_received_summary       |
      |  table_type                 |  birth_summary              |
      |  table_person_text          |  full_name                  |
      |  table_additional_text      |  free_text                  |
      |  table_additional_radio     |  yes_summary                |
      |  table_which                |  standard_summary           |
      |  table_when                 |  date_summary               |
      |  table_name                 |  full_name                  |
      |  table_email                |  email_address              |
      |  table_country              |  country_summary            |
      |  table_address              |  address_summary_not_in_MOJ |
    When I click Confirm submission
    Then I am taken to the confirmation page

  Scenario: Happy postcode lookup, country is United Kingdom, postcode is in Northern Ireland
    When I enter my country uk
    Then I am taken to the postcode page of the form
    When I enter my postcode in Northern Ireland
    Then I am taken to the address-inside page of the form
    When I enter my NI address
    Then I am taken to the confirm page of the form
    Then I should see the headers and my information in the summary:
      |  table_not_received         |  not_received_summary  |
      |  table_type                 |  birth_summary         |
      |  table_person_text          |  full_name             |
      |  table_additional_text      |  free_text             |
      |  table_additional_radio     |  yes_summary           |
      |  table_which                |  standard_summary      |
      |  table_when                 |  date_summary          |
      |  table_name                 |  full_name             |
      |  table_email                |  email_address         |
      |  table_country              |  country_summary       |
      |  table_address              |  address_summary_NI    |
    When I click Confirm submission
    Then I am taken to the confirmation page

  Scenario: Happy postcode lookup, country is United Kingdom, postcode is within GB, I can't find my address
    When I enter my country uk
    Then I am taken to the postcode page of the form
    When I enter my postcode
    Then I am taken to the address page of the form
    When I cant find the address
    Then I am taken to the address-inside page of the form
    When I enter my address
    Then I am taken to the confirm page of the form
    Then I should see the headers and my information in the summary:
      |  table_not_received         |  not_received_summary  |
      |  table_type                 |  birth_summary         |
      |  table_person_text          |  full_name             |
      |  table_additional_text      |  free_text             |
      |  table_additional_radio     |  yes_summary           |
      |  table_which                |  standard_summary      |
      |  table_when                 |  date_summary          |
      |  table_name                 |  full_name             |
      |  table_email                |  email_address         |
      |  table_country              |  country_summary       |
      |  table_address              |  address_summary_other |
    When I click Confirm submission
    Then I am taken to the confirmation page

  Scenario: Manual postcode lookup
    When I enter my country uk
    Then I am taken to the postcode page of the form
    And I can see the manual_lookup element
    When I click on manual_lookup
    Then I am taken to the address page of the form
