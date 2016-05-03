TESTS = $(shell find test -type f -name "*.test.js")
TEST_TIMEOUT = 10000
MOCHA_REPORTER = spec


all: test

install:
	@cd api && make install

test:
	@cd api && make test

converage: install
	@cd api && make converage

coveralls: install
	@cd api && make coveralls

run: install
	@cd api && npm start

test: install
.PHONY: install test converage coveralls run
