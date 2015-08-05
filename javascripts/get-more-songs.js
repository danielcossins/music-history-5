define(["jquery"], function(){
  var songs = [];
  return {
    setArray: function(callback){
      $.ajax({
        url: "songs2.json",
        // async: false
      }).done(function(data){
        callback.call(this, data);
      });
    }
  };
});