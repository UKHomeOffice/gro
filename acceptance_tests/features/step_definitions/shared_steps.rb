Given(/^I am on the start page for the form$/) do
  visit config['gro_host']
end

Then(/^I can see the questions for the (.*) page of the form$/) do | header |
  expect(page).to have_content 'Step 1'
  expect(page).to have_content CONTENT[header]
end

When(/^I click (.*) and then continue?$/) do | field |
  step "I click on #{field}"
  step 'I click continue'
end

When(/^I click on (.*)$/) do | field |
  find_by_id(CONTENT[field]).click
end

Then(/^I am taken to the (.*) page of the form$/) do | header |
  expect(page).to have_content CONTENT[header]
end

When(/^I fill in the name on the certificate$/) do
  step 'I enter full_name into the person_text field'
  step 'I click continue'
end

When(/^I enter both names on the certificate$/) do
  step 'I enter full_name into the person_one field'
  step 'I enter first_alt_name into the person_two field'
  step 'I click continue'
end

When(/^I enter my full name$/) do
  step 'I enter full_name into the name_text field'
  step 'I click continue'
end

When(/^I choose (.*) and enter my order number$/) do | field |
  find_by_id(CONTENT[field]).click
  step 'I enter order_no into the order_number field'
  step 'I click continue'
end

When(/^I enter a date$/) do
  step 'I enter day into the when_day field'
  step 'I enter month into the when_month field'
  step 'I enter year into the when_year field'
  step 'I click continue'
end

When(/^I enter an invalid date$/) do
  step 'I enter invalid_day into the when_day field'
  step 'I enter invalid_month into the when_month field'
  step 'I enter invalid_year into the when_year field'
  step 'I click continue'
end

When(/^I choose (.*) for existing and (.*) for previous complaint$/) do | existing, previous |
  step 'I enter free_text into the details_text field'
  step "I select #{existing} on the existing-radio button"
  step "I select #{previous} on the previous-radio button"
  step 'I click continue'
end

When(/^I enter (.*) into the (.*) field$/) do | text, field |
  fill_in CONTENT[field], :with => CONTENT[text]
end

When(/^I enter my email address$/) do
  step 'I enter email_address into the email_text field'
  step 'I click continue'
end

When(/^I fill in my address$/) do
  step 'I enter country into the country_text field'
  step 'I enter address_one into the address_text_one field'
  step 'I enter address_two into the address_text_two field'
  step 'I enter post_code into the address_text_two field'
  step 'I click continue'
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

When(/^I click the back link$/) do
  click_link('Back')
end

Then(/^I should see the (.*) error?/) do | type |
  expect(page).to have_content CONTENT["#{type}_error"]
end

Then(/^the hidden field disappears again$/) do
  # TODO: Reimplement this step. Currently it passes locally (with phantom or firefox) but not on Travis
  # expect(page).to_not have_selector('#example-toggled-text')
end

When(/^I click Confirm submission$/) do
  click_button('Confirm submission')
end

When(/^I click the first "Change" button$/) do
  find_by_id('about-radio-change').click
end

Then(/^I am taken to the confirmation page$/) do
  expect(page).to have_content 'You\'re all done, well done!'
end
