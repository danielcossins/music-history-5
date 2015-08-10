requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'lodash': '../bower_components/lodash/lodash.min',
    'firebase': '../bower_components/firebase/firebase',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
    'matchHeight': '../bower_components/matchHeight/jquery.matchHeight-min'
  },
  shim: {
    'bootstrap': ['jquery'],
    'matchHeight': ['jquery'],
    'firebase': {
      exports: 'Firebase'
    }
  }
});

requirejs(["jquery", "lodash", "firebase", "hbs", "bootstrap", "matchHeight", "load", "display"],
  function($, _, _firebase, Handlebars, bootstrap, matchHeight, load, display) {
  var myFirebaseRef = new Firebase("https://flickering-fire-4801.firebaseio.com/");
  myFirebaseRef.child("songs").on("value", function(snapshot) {
    console.log(snapshot.val());
    var songs = snapshot.val();
    console.log(songs);
    var allSongsArray=[];
     // Convert Firebase's object of objects into an array of objects
    for (var key in songs) {
      allSongsArray[allSongsArray.length] = songs[key];
    }
    console.log(allSongsArray);
    allSongsObject = {songs: allSongsArray};
    ////////////////////////////////////////
    display.show(allSongsArray);//displays the songs and other stuff

    load.upload();//uploads the added songs to firebase
  });
});