define(function(){
  var songs = [];
  return {
    setArray: function(){
      $.ajax({
        url: "songs2.json",
        async: false
      }).done(function(data){
        songs = data;
        // console.log(songs);
        return songs;
      });
    },

    getSongs: function(){
      return songs;
    }
  };
});