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

run: install
	@npm start


.PHONY: install test cov test-cov build run
