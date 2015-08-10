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
      console.log(snapshot.val());  // Alerts "San Francisco"
      var songs = snapshot.val();
      console.log(songs);
      var allSongsArray=[];
       // Convert Firebase's object of objects into an array of objects
      for (var key in songs) {
        allSongsArray[allSongsArray.length] = songs[key];
      }
      console.log(allSongsArray);
      allSongsObject = {songs: allSongsArray};
      // origininalSongsArray = allSongsArray.slice();

      // var uniqueArtists = _.chain(allSongsArray).uniq("artist").pluck("artist").value();
      // var uniqueAlbums = _.chain(allSongsArray).uniq("album").pluck("album").value();


      //////////This is what executes from the old code////////
      // var $filterSongs = $('#filter');
      // addSongs(allSongsArray);//includes the select template and filteArlbum()

      // $filterSongs.on("click", function(){
      //   // console.log("We made it to the button click");
      //   filterSongs();
      // });
      display.show(allSongsArray);

      load.upload();

      // $addSongsButton.on("click", function(){
      //   console.log("We made it to the button click");
      //   var song = {
      //   "name": $('#title').val(),
      //   "artist": $('#artist').val(),
      //   "album": $('#album').val(),
      //   "year": $('#year').val()
      //   };
      //   console.log(song);
      //   // loadSongsToFirebase(song);
      //   loadSongsToFirebase(song);
      // });
    });

    
    






////////////////////////////////
    // var $addSongsButton = $('#addSongs');
    // var $filterSongs = $('#filter');
    
    // var num = 1;
    // console.log(output);
    // generate.setArray(addSongs);

    // $addSongsButton.on("click", function(){
    //   console.log("We made it to the button click");
    //   var song = {
    //   "name": $('#title').val(),
    //   "artist": $('#artist').val(),
    //   "album": $('#album').val(),
    //   "year": $('#year').val()
    //   };
    //   console.log(song);
    //   loadSongsToFirebase(song);
    // });

    // $filterSongs.on("click", function(){
    //   // console.log("We made it to the button click");
    //   filterSongs();
    // });
//////////////////////////////////////////////////
});

// function addSongs(data){
//   require(['hbs!../templates/songs', 'hbs!../templates/artistSelect', 'hbs!../templates/albumSelect'], function(songTemplate, artistFormTemplate, albumFormTemplate){
//     $('#more').before(songTemplate({songs: data}));//populates songs
//     ///////////////
//     var uniqueArtists = _.chain(data).uniq("artist").value();//.pluck("artist").value();
//     console.log(uniqueArtists);
//     var uniqueAlbums = _.chain(data).uniq("album").value();//.pluck("album").value();
//     console.log(uniqueAlbums);

//     // $('#selects').html(formTemplate)({songs: data});
//     $('#artistSelect').html(artistFormTemplate(uniqueArtists));
//     $('#albumSelect').html(albumFormTemplate(uniqueAlbums));
//     ////////////////////////
//     $(document).on('change', '#artist', function(){
//       filterAlbum();
//     });

//     $('.matchHeight').matchHeight();
//   });
//   // modifySelect();
//   initDelete();
// }

// function initDelete(){
//   $(document).on("click", ".delete", function(){
//     console.log("you clicked a delete button");
//     $(this).parent().remove();
//     $('.matchHeight').matchHeight();
//   });
//   // $('.delete').click(function(){
//   // console.log("you clicked a delete button");
//   //   $(this).parent().remove();
//   // });
// }

// function filterSongs(){
//   var $artist = $('#artist').val();
//   var $album = $('#album').val();
//   // var domArr = $('.cont');
//   var $artistArr = $(".artist");
//   var $albumArr = $(".album");
//   for(var i=0; i<$artistArr.length; i++){
//     $($artistArr[i]).parent().parent().hide();

//     console.log($($artistArr[i]).text());
//     if($($artistArr[i]).text()==="Artist: "+$artist){
//       $($artistArr[i]).parent().parent().show();
//       console.log("true artist");
//     }
//     // else{
//     //   $($artistArr[i]).parent().parent().hide();
//     //   console.log("false artist");
//     // }

//     console.log($($albumArr[i]).text());
//     if($($albumArr[i]).text()==="Album: "+$album){
//       $($albumArr[i]).parent().parent().show();
//       console.log("true album");
//     }
//     // else{
//     //   $($artistArr[i]).parent().parent().hide();
//     //   console.log("false album");
//     // }
//   }
// }

// function filterAlbum(){
//   var selectedArtist = $('#artist').val();
//   $('select#album > option').each(function(index, value){
//     var currentArtistName = $(value).attr("class");
//     var option = $(value);
//     if(selectedArtist === currentArtistName){
//       option.show();
//     }
//     else{
//       option.hide();
//     }
//   });
// }