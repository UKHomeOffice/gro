Given(/^I am on the start page for the form$/) do
  visit config['gro_host']
end

Then(/^I can see the questions for the (.*) page of the form$/) do | header |
  expect(page).to have_content 'Step 1'
  expect(page).to have_content CONTENT[header]
end

When(/^I click on (.*)$/) do | field |
  find_by_id(CONTENT[field]).click
  step "I click continue"
end

Then(/^I am taken to the (.*) page of the form$/) do | header |
  expect(page).to have_content CONTENT[header]
end

When(/^I fill in the name on the certificate$/) do
  step "I enter #{CONTENT['full_name']} into the person-text field"
  step "I click continue"
end

When(/^I enter both names on the certificate$/) do
  step "I enter #{CONTENT['full_name']} into the person-one-text field"
  step "I enter #{CONTENT['first_alt_name']} into the person-two-text field"
  step "I click continue"
end

When(/^I enter my full name$/) do
  step "I enter #{CONTENT['full_name']} into the name-text field"
  step "I click continue"
end

When(/^I choose (.*) and enter my order number$/) do | field |
  find_by_id(CONTENT[field]).click
  step "I enter 123456 into the order-number-text field"
  step "I click continue"
end

When(/^I enter a date$/) do
  step "I enter 10 into the when-date-day field"
  step "I enter 10 into the when-date-month field"
  step "I enter 2015 into the when-date-year field"
  step "I click continue"
end

When(/^I choose (.*) for existing and (.*) for previous complaint$/) do | existing, previous |
  step "I enter #{CONTENT['free_text']} into the details-text field"
  step "I select #{existing} on the existing-radio button"
  step "I select #{previous} on the previous-radio button"
  step "I click continue"
end

When(/^I enter (.*) into the (.*) field$/) do | text, field |
  fill_in field, :with => text
end

When(/^I enter my email address$/) do
  step "I enter #{CONTENT['email_address']} into the email-text field"
  step "I click continue"
end

When(/^I fill in my address$/) do
  step "I enter Oz into the country-text field"
  step "I enter Yellow_Brick_Road into the address-text-one field"
  step "I enter Emerald_City into the address-text-two field"
  step "I click continue"
end

When(/^I click continue$/) do
  click_button("Continue")
end

Then(/^I am taken to the summary page$/) do
  expect(page).to have_content 'This is an example of a confirmation page'
end

When(/^I select (.*) on the (.*) button$/) do | choice, button |
  find_by_id("#{button}-#{choice}").click
end

When(/^I fill in the names of the people on the certificate$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Then(/^I am presented with validation errors for the first page$/) do
  expect(page).to have_content 'Tell us which is your favourite superhero'
  expect(page).to have_content 'Date must only contain numbers'
  expect(page).to have_content 'Enter your favourite colour'
  expect(page).to have_content 'The email address isn\'t valid, enter a valid email address'
end

Then(/^I can see another field appear$/) do
  expect(page).to have_selector('#example-toggled-text')
end

Then(/^the hidden field disappears again$/) do
  # TODO: Reimplement this step. Currently it passes locally (with phantom or firefox) but not on Travis
  # expect(page).to_not have_selector('#example-toggled-text')
end

When(/^I click Confirm submission$/) do
  click_button("Confirm submission")
end

Then(/^I am taken to the third page of the form$/) do
  expect(page).to have_content 'This page shows how to make a field mandatory depending on the answer to a previous question'
end

Then(/^I am presented with an error for the field that is dependent on Yes being selected$/) do
  expect(page).to have_content 'Input the name of your pet dog'
end

Then(/^I am presented with my custom validation errors$/) do
  expect(page).to have_content 'That isn\'t a multiple of 3, try again!'
end

When(/^I click the first "Change" button$/) do
  find_by_id('about-radio-change').click
end

Then(/^I am taken to the confirmation page$/) do
  expect(page).to have_content 'You\'re all done, well done!'
end
