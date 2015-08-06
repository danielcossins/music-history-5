//adding the callback function makes the ajax wait to execute until
//the function is called in main. That way it retrieves the songs for the function.
//"this" doesn't mean anything. It refers to the global scope
define(["jquery"], function(){
  var songs = [];
  return {
    setArray: function(callback){
      $.ajax({
        url: "https://flickering-fire-4801.firebaseio.com/.json",
        // async: false
      }).done(function(data){
        callback.call(this, data);
      });
    }
  };
});