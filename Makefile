PROJECT=overlay
CSS=overlay.css

all: check compile

check: lint

lint:
	node_modules/.bin/biome ci

format:
	node_modules/.bin/biome check --fix

compile: build/build.js build/build.css

build:
	mkdir -p $@

build/build.js: index.js | build node_modules
	node_modules/.bin/esbuild \
					--bundle \
					--sourcemap \
					--define:DEBUG="true" \
					--global-name=$(PROJECT) \
					--outfile=$@ \
					index.js

build/build.css: $(CSS) | build
	cat $^ > $@

clean:
	rm -fr build node_modules

.PHONY: clean lint check all build compile format
