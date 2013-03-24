
export PATH := node_modules/.bin:$(PATH)

production: browserify min

browserify:
	mkdir -p bundle
	browserify -d -t hbsfy \
		-x ./scripts/toggle_graph.js \
		-x ./scripts/graph_view.js \
		-x ./scripts/vendor/flotr2.js \
		./scripts/index.js > bundle/index.js
	browserify -d -t hbsfy -r ./scripts/toggle_graph.js > bundle/toggle_graph.js

min:
	uglifyjs bundle/index.js -o bundle/index.js --mangle
	uglifyjs bundle/toggle_graph.js -o bundle/toggle_graph.js --mangle


serve:
	serve .

watch:
	./watch.sh make browserify

clean:
	rm bundle/*
