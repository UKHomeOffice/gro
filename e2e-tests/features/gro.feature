@GroRegression
@GroRegressionCI
Feature: GRO - General Register Office

  Background:
    Given Test data has been created for "GRO" scenarios

  Scenario Outline: General Register Office - E2E
    Given I selected the data for scenario "<Scenario ID>" - "<Description>"
    And I visit the General Register Office page
    Then I see header link service name "Enquire about your certificate order"
    When I fill out my answers to the GRO questionnaire
    Then I check the information given is correct
    And I am able to submit the GRO questionnaire
    Examples:
      | Scenario ID | Description                                                                             |
      | 1           | S1 - Certificate Order (Order not received - Birth Cert)                                |
      | 2           | S2 - Digital Image Order (Wrong order received - Marriage Cert)                         |
      | 3           | S3 - PDF Order (Poor quality order - Death Cert)  Incorrect Email, UK                   |
      | 4           | S4 - General enquiry (Refund query - Adoption Cert)                                     |
      | 5           | s5 - Certificate Order (Wrong order received - Birth Cert)                              |
      | 6           | S6 - Digital Image Order (Service compliant - Death Cert)  UK                           |
      | 7           | S7 - PDF Order (Order not received  - Civil partnership Cert) Incorrect Email, UK       |
      | 8           | S8 - General Enquiry (Service compliant - Adoption Cert) UK                             |
      | 9           | S9 - Digital Image Order (Service compliant - Death Cert)                               |
      | 10          | S10 - General Enquiry (Poor quality - Adoption Cert)                                    |
      | 11          | S11 - Certificate Order (Other issues and feedback - Marriage Cert) Incorrect Email, UK |
      | 12          | S12 - PDF Order (Other issues and feedback - Civil partnership Cert)                    |
      | 13          | S13 - Certificate Order (Poor Quality order - Birth Cert)                               |
      | 14          | S14 - Digital Image Order (Wrong order received - Marriage Cert)                        |
      | 15          | S15 - PDF Order (Service compliant - Civil partnership Cert)                            |
      | 16          | S16 - General Enquiry (Poor quality order - Adoption Cert)                              |
      | 17          | S17 - Certificate Order (Service compliant - Marriage Cert)                             |

  Scenario: General Register Office - Change answers in the information summary page
    Given I selected the data for scenario "1" - "S1 - Certificate Order (Order not received - Birth Cert)"
    And I visit the General Register Office page
    Then I see header link service name "Enquire about your certificate order"
    When I fill out my answers to the GRO questionnaire
    Then I check the information given is correct
    When I change order type to "PDF order" and service type to "Priority" type and continue
    Then I check the "PDF order" and "Priority" type changes are updated on the information summary page
    And I am able to submit the GRO questionnaire

  Scenario: General Register Office - click header page link returns to home page
    Given I selected the data for scenario "3" - "S3 - PDF Order (Poor quality order - Death Cert)"
    And I visit the General Register Office page
    Then I see header link service name "Enquire about your certificate order"
    When I fill out my answers to the GRO questionnaire
    Then I check the information given is correct
    When I click on the header link
    Then I am returned back to home page
