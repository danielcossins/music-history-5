requirejs(["dom-access", "populate-songs", "get-more-songs"],
 function(output, generate, getMore) {
  var num = 1;

  generate.setArray();
  addSongs(generate.getSongs());

  $('#more').click(function(){
    if(num===1){
    getMore.setArray();
    addSongs(getMore.getSongs());
    num=2;
    }
  });
});


// $(document).ready(function(){
//   $.ajax({
//     url: "songs.json"
//   }).done(function(data){
//     addSongs(data);
//   });
//   var index=2;
//   $("#more").click(function(){
//     $.ajax({
//       url: "songs"+index+".json"
//     }).done(function(data2){
//       addSongs(data2);
//       index++;
//     });
//   });
// });


function addSongs(data){
  for(var i=1; i<=data.songs.length; i++){
    $('#more').before("<div class='container'><p class='large' id='song'>"+data.songs[i-1].name+"</p><ul><li id='artist'>"+data.songs[i-1].artist+"</li><li class='middle' id='album'>"+data.songs[i-1].album+"</li><li id='year'>"+data.songs[i-1].year+"</li></ul><button class='delete' type='button'>Delete</button></div>");
  }
  initDelete();
}

function initDelete(){
  $('.delete').click(function(){
    // var id = $(this).attr('id');
    // console.log(id);
    $(this).parent().remove();
  });
}