PROJECT=overlay
CSS=overlay.css

all: check compile

check: lint

lint:
	jshint index.js

compile: build/build.js build/build.css

build:
	mkdir -p $@

build/build.js: index.js | build node_modules
	esbuild \
					--bundle \
					--sourcemap \
					--define:DEBUG="true" \
					--global-name=$(PROJECT) \
					--outfile=$@ \
					index.js

build/build.css: $(CSS) | build
	cat $^ > $@

node_modules: package.json
	yarn
	touch $@

clean:
	rm -fr build node_modules

.PHONY: clean lint check all build
