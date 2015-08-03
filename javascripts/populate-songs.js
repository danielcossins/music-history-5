define(function(){
  var songs = [];
  return {
    setArray: function(callback){
      $.ajax({
        url: "songs.json",
        // async: false
      }).done(function(data){
        callback.call(this, data);
        // songs = data;
        // return songs;
      });
    }

    // getSongs: function(){
    //   return songs;
    // }
  };
});


// function addSongs(data){
//   for(var i=1; i<=data.songs.length; i++){
//     $('#more').before("<div class='container'><p class='large' id='song'>"+data.songs[i-1].name+"</p><ul><li id='artist'>"+data.songs[i-1].artist+"</li><li class='middle' id='album'>"+data.songs[i-1].album+"</li><li id='year'>"+data.songs[i-1].year+"</li></ul><button class='delete' type='button'>Delete</button></div>");
//   }
//   initDelete();
// }

// function initDelete(){
//   $('.delete').click(function(){
//     // var id = $(this).attr('id');
//     // console.log(id);
//     $(this).parent().remove();
//   });
// }