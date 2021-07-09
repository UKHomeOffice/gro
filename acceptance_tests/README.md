#GRO Acceptance Tests

The tests follow the standard principles of feature files and step definitions.

##Installation:

Install rvm (Ruby Version Manager)
```
curl -sSL https://raw.githubusercontent.com/rvm/rvm/master/binscripts/rvm-installer | bash -s stable
```

Then install Ruby 3.0.0
```
rvm install ruby@3.0.0
```

Then specify the default version of Ruby for your Mac to use
```
rvm use ruby-3.0.0 --default
```

After that run bundle to install
```
bundle
```

###Install Bundler

Gemfile.lock created using Ruby version 3.0.1

```
gem install bundler
```

###Bundle install the Gem file

cd to the acceptance_tests folder

```
bundle install
```

##Run:

Run with
```
cucumber
```
or to run specific features:
```
cucumber features/example.feature
```

You can also run/install the tests from the root of the project using npm
```
npm run test:acceptance
```

##Yard:

Using YARD-Cucumber you can generate documentation on the features, tags and step definitions used in these tests

###Run:
Running the following from outside the acceptance_tests folder generates the documentation
```
yardoc 'features/**/*.rb' '**/*.feature'
```
Then run the following to start the local documentation server
```
yard server
```
