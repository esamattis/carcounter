
export PATH := node_modules/.bin:$(PATH)

production: all min

all: dirs index zepto jquery graph

index:
	browserify -d \
		-x ./scripts/main.js \
		-x ./scripts/counter.hbs \
		-x ./scripts/toggle_graph.js \
		-x ./scripts/graph_view.js \
		-x ./scripts/counter_view.js \
		-x ./scripts/vendor/zepto.js \
		-x ./scripts/vendor/jquery.js \
		-x ./scripts/vendor/flotr2.js \
		-x ./node_modules/backbone/backbone.js \
		-x ./node_modules/backbone/node_modules/underscore/underscore.js \
		./scripts/index.js > bundle/index.js

zepto:
	browserify -d -t hbsfy \
		-x ./scripts/vendor/jquery.js \
		-x ./scripts/toggle_graph.js \
		-x ./scripts/graph_view.js \
		-x ./scripts/vendor/flotr2.js \
		-r ./scripts/main.js > bundle/main-zepto.js

jquery:
	browserify -d -t hbsfy \
		-x ./scripts/vendor/zepto.js \
		-x ./scripts/toggle_graph.js \
		-x ./scripts/graph_view.js \
		-x ./scripts/vendor/flotr2.js \
		-r ./scripts/main.js > bundle/main-jquery.js

graph:
	browserify -d -t hbsfy \
		-x ./node_modules/backbone/backbone.js \
		-x ./node_modules/backbone/node_modules/underscore/underscore.js \
		-r ./scripts/toggle_graph.js > bundle/toggle_graph.js

dirs:
	mkdir -p bundle

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
