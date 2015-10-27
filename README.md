###to run this file

open terminal and enter (without $):
* $ cd desktop/
* $ git clone https://github.com/jakegibs617/dartRankingJS.git

* $ cd dartRankingsJS/
* $ rm -rf .git
* $ bundle install

* $ bundle exec rake db:setup
or 

* $ rake db:setup 

then 

* $ rails server
and visit
[app](http://localhost:3000/)

or run 
* $ rake 
for the test suite

as of 10-27-15
there are problems I am working through, see [stack overflow](http://stackoverflow.com/questions/33379808/trouble-deleting-from-model-using-backbone-js) for more info
