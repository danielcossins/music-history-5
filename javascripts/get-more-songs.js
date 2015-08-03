define(function(){
  var songs = [];
  return {
    setArray: function(callback){
      $.ajax({
        url: "songs2.json",
        // async: false
      }).done(function(data){
        // songs = data;
        // // console.log(songs);
        // return songs;
        callback.call(this, data);
      });
    }

    // getSongs: function(){
    //   return songs;
    // }
  };
});