# GRO (General Register Office) [![Build Status](https://drone.digital.homeoffice.gov.uk/api/badges/UKHomeOffice/gro/status.svg)](https://drone.digital.homeoffice.gov.uk/UKHomeOffice/gro)

## Getting Started

### Prerequisities

- [Node.js](https://nodejs.org/en/) - Tested against LTS
- NPM (installed with Node.js) - Works with versions 2 and 3
- [Redis server](http://redis.io/download) running on the default port

### Up & Running

Add a .env file, and add the following variables:

``` 
NOTIFY_KEY=
CASEWORKER_EMAIL=
NOTIFY_TEMPLATE=
GTM_TAG=
POSTCODE_HOST=
FROM_ADDRESS=
REPLY_TO=
AWS_REGION
```
A copy of these secrets is stored in keybase, please make sure that any updates will be added there too.

```bash
$ cd gro
$ yarn
$ yarn run start:dev
```

Then visit: [http://localhost:8080/](http://localhost:8080/)

## Testing

### Acceptance Tests
Acceptance tests are run by the QAT team in a different environment. 

### Integration Tests
```bash
$ yarn test:integration
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## GRO Business Logic

### Online Orders
The reference number for an online order can be found in the order confirmation email. It will usually be called either:

- An order reference number, which is 12 letters and numbers, for example `HX721ABD2F5Q`.
- A GRO reference number (or 'GRO reference no'), which usually follows the format `COLXXXXXX/YYYY`, for example `COL123456/2015`.

The 'online-toggle-text' field accepts letters, numbers and forward slashes using `/^[A-Za-z0-9/]+$/`. References are converted to uppercase and must be between 12 and 14 characters long.

### Telephone Orders
Telephone orders, the order number is also incremental so will eventually go from 5 to 6 digits, it is followed by a hyphen and line number to indicate which row dependant on the number of items ordered – most orders this is just a single digit but can be up to 3 digits for big orders with 100+ order lines.
The order number has been set on field 'telephone-toggle-text' using a regex validation to capture this, i.e. /^[0-9]{5,6}-[0-9]{1,3}$/

The customer has an account number (1-7 digits long but this is incremental so will eventually get to 8 digits).
The account number has been set on field 'telephone-toggle-text-2' using validations to ensure only a number between 1-8 digits long can be entered to capture this.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## License

This project is licensed under the GPLv2 License - see the [LICENSE.md](LICENSE.md) file for details

The General Register Office uses BrowserStack for mobile and desktop testing https://www.browserstack.com/
