define(["jquery", "q", "authentication"], function($, Q, auth){

  return function(){
      var $addSongsButton = $('#addSongs');

      var deferred = Q.defer();
      $addSongsButton.on("click", function(){
        console.log("We made it to the button click");
        var song = {
        "name": $('#title').val(),
        "artist": $('#artist').val(),
        "album": $('#album').val(),
        "year": $('#year').val(),
        "uid": auth.getUid()
        };
        console.log(song);
        // loadSongsToFirebase(song);


        $.ajax({
          url: "https://flickering-fire-4801.firebaseio.com/songs.json",
          method: "POST",
          data: JSON.stringify(song)
        })
        .done(function(data) {
          deferred.resolve(data);
        })
        .fail(function(xhr, status, error) {
          deferred.reject(error);
        });

      });
      return deferred.promise;
    };
  
});

// function loadSongsToFirebase(data){
//   console.log("made it into the function");
//   $.ajax({
//     url: "https://flickering-fire-4801.firebaseio.com/songs.json",
//     method: "POST",
//     data: JSON.stringify(data)
//     // async: false
//   }).done(function(data){
//     console.log("you loaded something");
//   });
// }

// define(["jquery", "q"], function($, Q) {
//   return function() {
//     var deferred = Q.defer();
//     $.ajax({
//       url: "songs.json"
//     })
//     .done(function(songs_data) {
//       deferred.resolve(songs_data);
//     })
//     .fail(function(xhr, status, error) {
//       deferred.reject(error);
//     });

//     return deferred.promise;
//   };
// });