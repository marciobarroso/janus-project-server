NPM_BIN=./node_modules/.bin
TEST_ENV=NODE_ENV=test NODE_PATH=./src:./test
NODE_ENV ?= dev
MOCHA_OPTS=--reporter spec --compilers js:babel-core/register --slow 5000 --exit --recursive

start: clean
	$(NPM_BIN)/babel src -d build && \
		NODE_ENV=$(NODE_ENV) NODE_PATH=./build node ./build/index.js

start/dev: clean
	$(NPM_BIN)/babel src -d build && \
		NODE_ENV=$(NODE_ENV) NODE_PATH=./build $(NPM_BIN)/nodemon --exec $(NPM_BIN)/babel-node \
			./build/index.js --presets es2015,stage-2

test:
	$(TEST_ENV) $(NPM_BIN)/mocha $(MOCHA_OPTS) ./test/

test/watch:
	$(TEST_ENV) $(NPM_BIN)/mocha $(MOCHA_OPTS) --watch ./test/

lint:
	$(NPM_BIN)/esw --color src/ test/

clean:
	rm -rf reports build coverage logs .stryker-tmp .env

.PHONY: clean lint start start/dev test test/watch
