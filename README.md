# GRO 

## Getting Started

### Prerequisities

What things you need to install the software and how to install them
- NodeJS
- npm (version 3 is not yet supported, please use version 2)
- Redis server running on the default port

### Installing

```bash
$ cd gro
$ npm install
$ npm run dev
```

If there is an error it might be necessary to install nodemon globally.

```bash
$ npm install -g nodemon
```

Go to http://localhost:8080/gro

## Running the tests
You will need the server running to run the cucumber tests against.

```bash
$ cd acceptance_tests
$ cucumber -r features
```

You will need phantomjs installed to run tests. Alternatively you can export IN_BROWSER=true to run the tests in firefox.


## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## License

This project is licensed under the GPLv2 License - see the [LICENSE.md](LICENSE.md) file for details
