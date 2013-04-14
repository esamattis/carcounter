# Car Counter

Asynchronous module loading example with Browserify.

Blog post

<http://esa-matti.suuronen.org/blog/2013/04/15/asynchronous-module-loading-with-browserify/>

Live app

<http://epeli.github.io/carcounter/>

## Car Counter?

They taught me how to write car counters in the university. So I wrote one. You
use it by going to a side of a road and press the "Car!" button always when you
see a car passing by you and the app will tell you how many cars you've seen.
How cool is that!

## Hacking

    git clone https://github.com/epeli/carcounter.git
    cd carcounter
    npm install
    make

to preview

    make serve

and open <http://localhost:3000/>

to recompile on changes

    make watch

to minify

    make min
