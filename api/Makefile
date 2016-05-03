TESTS = $(shell find test -type f -name "*.test.js")
TEST_TIMEOUT = 10000
MOCHA_REPORTER = spec


all: test

install:
	@npm install

test: install
	@npm test

converage: install
	@npm converage

converalls: install
	@npm install coveralls mocha-lcov-reporter && istanbul cover ./node_modules/mocha/bin/_mocha --report lcovonly -- -R spec && cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js && rm -rf ./coverage

run: install
	@npm start


.PHONY: install test cov test-cov build run
