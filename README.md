# GRO (General Registrars Office) [![Build Status](https://drone.digital.homeoffice.gov.uk/api/badges/UKHomeOffice/gro/status.svg)](https://drone.digital.homeoffice.gov.uk/UKHomeOffice/gro)

## Getting Started

### Prerequisities

- [Node.js](https://nodejs.org/en/) - Tested against LTS
- NPM (installed with Node.js) - Works with versions 2 and 3
- [Redis server](http://redis.io/download) running on the default port

### Up & Running

```bash
$ cd gro
$ npm install
$ npm run dev
```

Then visit: [http://localhost:8080/](http://localhost:8080/)

## Testing

### Acceptance Tests
With the server running in development mode (`npm run dev`), start the acceptance tests:

```bash
$ npm run test:acceptance
```
Phantomjs is required to run the acceptance tests (`npm install phantomjs`), or alternatively, export `IN_BROWSER=true` to run the tests in Firefox.

### Unit Tests
```bash
$ npm t
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## License

This project is licensed under the GPLv2 License - see the [LICENSE.md](LICENSE.md) file for details

The General Registrars Office uses BrowserStack for mobile and desktop testing https://www.browserstack.com/


