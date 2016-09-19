TESTS = $(shell find test -type f -name "*.test.js")
TEST_TIMEOUT = 10000
MOCHA_REPORTER = spec


all: install

install:
	+@npm install && [ -f config/private.js ] || cp config/private.js.default config/private.js

test: install
	@npm test

converage: install
	@npm converage

coveralls: install
	@npm install coveralls mocha-lcov-reporter && NODE_ENV=test ./node_modules/istanbul/lib/cli.js cover ./node_modules/mocha/bin/_mocha  --report lcovonly -- --recursive -R spec && cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js && rm -rf ./coverage

run: install
	@npm start


.PHONY: install test converage converalls build run
