define(function(){

  return {
    upload: function(){
      var $addSongsButton = $('#addSongs');

      $addSongsButton.on("click", function(){
        console.log("We made it to the button click");
        var song = {
        "name": $('#title').val(),
        "artist": $('#artist').val(),
        "album": $('#album').val(),
        "year": $('#year').val()
        };
        console.log(song);
        // loadSongsToFirebase(song);
        loadSongsToFirebase(song);
      }); 
    }
  };

  
});

function loadSongsToFirebase(data){
  console.log("made it into the function");
  $.ajax({
    url: "https://flickering-fire-4801.firebaseio.com/songs.json",
    method: "POST",
    data: JSON.stringify(data)
    // async: false
  }).done(function(data){
    console.log("you loaded something");
  });
}