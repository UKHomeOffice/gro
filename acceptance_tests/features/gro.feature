Feature: I am able to navigate through my example form with the validation working as expected

  @happy @not_received @birth
  Scenario: Happy path, not received, birth and then how, which and when
    Given I am on the start page for the form
    Then I can see the questions for the about page of the form
    When I click on not_received
    Then I am taken to the type page of the form
    When I click on birth
    Then I am taken to the person page of the form
    When I fill in the name on the certificate
    Then I am taken to the how page of the form
    When I click on online
    Then I am taken to the which page of the form
    When I choose standard and enter my order number
    Then I am taken to the when page of the form
    When I enter a date
    Then I am taken to the name page of the form
    When I enter my full name
    Then I am taken to the email page of the form
    When I enter my email address
    Then I am taken to the post page of the form
    When I fill in my address
    Then I am taken to the summary page

  @happy @complaint
  Scenario: Happy path, complaint, details, not about order, then name
    Given I am on the start page for the form
    Then I can see the questions for the about page of the form
    When I click on complaint
    Then I am taken to the details page of the form
    When I choose no for existing and no for previous complaint
    Then I am taken to the name page of the form
    When I enter my full name
    Then I am taken to the email page of the form
    When I enter my email address
    Then I am taken to the post page of the form
    When I fill in my address
    Then I am taken to the summary page

  @happy @other @marriage
  Scenario: Happy path, other, details, yes about order, type, people
    Given I am on the start page for the form
    Then I can see the questions for the about page of the form
    When I click on other
    Then I am taken to the details page of the form
    When I choose yes for existing and yes for previous complaint
    Then I am taken to the type page of the form
    When I click on marriage
    Then I am taken to the people page of the form
    When I enter both names on the certificate
    Then I am taken to the how page of the form
    When I click on online
    Then I am taken to the which page of the form
    When I choose standard and enter my order number
    Then I am taken to the when page of the form
    When I enter a date
    Then I am taken to the name page of the form
    When I enter my full name
    Then I am taken to the email page of the form
    When I enter my email address
    Then I am taken to the post page of the form
    When I fill in my address
    Then I am taken to the summary page


  # Scenario: I am able to navigate through my example form with the validation working as expected
  #   Given I am on the start page for the form
  #   Then I can see the questions for the about page of the form
  #   When I complete the first page of the form incorrectly
  #   Then I am presented with validation errors for the first page
  #   When I complete the first page of the form correctly
  #   Then I am taken to the second page of the form
  #   When I select yes on the radio button
  #   Then I can see another field appear
  #   When I select no on the radio button
  #   Then the hidden field disappears again
  #   When I click continue
  #   Then I am taken to the third page of the form
  #   When I select the yes radio button
  #   And I click continue
  #   Then I am presented with an error for the field that is dependent on Yes being selected
  #   When I select the no radio button
  #   And I click continue
  #   Then I am taken to the fourth page
  #   When I enter that my favourite multiple is 5
  #   And I click continue
  #   Then I am presented with my custom validation errors
  #   When I enter that my favourite multiple is 15
  #   And I click continue
  #   Then I am taken to the summary page
  #   When I click the first "Change" button
  #   Then I can see the questions for the first page of the form
  #   When I click continue
  #   Then I am taken to the summary page
  #   When I click Confirm submission
  #   Then I am taken to the confirmation page
