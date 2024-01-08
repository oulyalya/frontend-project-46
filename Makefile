install: install-deps
	npm link

install-deps:
	npm ci

lint:
	npx eslint .

test:
	npm test

gendiff:
	bin/gendiff.js

publish:
	npm publish --dry-run
