install: install-deps
	npm link

install-deps:
	npm ci

lint:
	npx eslint .

test:
	npm test

test-watch:
	npm test -- --watch

gendiff:
	bin/gendiff.js

publish:
	npm publish --dry-run

help:
	gendiff -h
