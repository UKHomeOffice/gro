# GRO (General Register Office) [![Build Status](https://drone.digital.homeoffice.gov.uk/api/badges/UKHomeOffice/gro/status.svg)](https://drone.digital.homeoffice.gov.uk/UKHomeOffice/gro)

## Getting Started

### Prerequisities

- [Node.js](https://nodejs.org/en/) - Tested against LTS
- NPM (installed with Node.js) - Works with versions 2 and 3
- [Redis server](http://redis.io/download) running on the default port

### Up & Running

Add a .env file, and add the following env variables FROM_ADDRESS, REPLY_TO, CASEWORKER_EMAIL, AWS_USER, AWS_PASSWORD and set to a non-empty string.

```bash
$ cd gro
$ yarn
$ yarn run start:dev
```

Then visit: [http://localhost:8080/](http://localhost:8080/)

## Testing

### Acceptance Tests
With the server running in development mode (`yarn run start:dev`), start the acceptance tests:

```bash
$ yarn run test:acceptance
```

### Integration Tests
```bash
$ yarn test:integration
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## GRO Business Logic

### Online Orders
The order number given online from the GRO website is always in the format COLXXXXXX/YYYY. This regex has been set to follow this format for the 'online-toggle-text' field, i.e. /^COL[0-9]{6}\/[0-9]{4}$/

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




