
export PATH := node_modules/.bin:$(PATH)

all: build

build:
	node build.js

min:
	uglifyjs bundle/index.js -o bundle/index.js --mangle
	uglifyjs bundle/main-jquery.js -o bundle/main-jquery.js --mangle
	uglifyjs bundle/main-zepto.js -o bundle/main-zepto.js --mangle

serve:
	serve .

watch:
	./watch.sh make all

clean:
	rm bundle/*
