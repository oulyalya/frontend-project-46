install: install-deps
	npm link

install-deps:
	npm ci

lint:
	npx eslint .

lint-fix:
	npx eslint --fix --ext .js,.jsx .

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
