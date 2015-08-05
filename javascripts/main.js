requirejs(["dom-access", "populate-songs", "get-more-songs"],
  function(output, generate, getMore) {
    var num = 1;
    console.log(output);
    generate.setArray(addSongs);

  $('#more').click(function(){
    if(num===1){
    getMore.setArray(addSongs);
    num=2;
    }
  });
});

function addSongs(data){
  for(var i=1; i<=data.songs.length; i++){
    $('#more').before("<div class='cont'><p class='large' id='song'>"+data.songs[i-1].name+"</p><ul><li id='artist'> Artist: "+data.songs[i-1].artist+"</li><li class='middle' id='album'>Album: "+data.songs[i-1].album+"</li><li id='year'>Year: "+data.songs[i-1].year+"</li></ul><button type='button' class='btn btn-default btn-sm delete'>Delete</button></div>");
  }
      $('.matchHeight').matchHeight();
  initDelete();
}

function initDelete(){
  $('.delete').click(function(){
    $(this).parent().remove();
  });
}