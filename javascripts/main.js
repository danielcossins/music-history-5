requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
    'matchHeight': '../bower_components/matchHeight/jquery.matchHeight-min'
  },
  shim: {
    'bootstrap': ['jquery'],
    'matchHeight': ['jquery']
  }
});

requirejs(["jquery", "hbs", "bootstrap", "matchHeight", "dom-access", "populate-songs", "get-more-songs"],
  function($, Handlebars, bootstrap, matchHeight, output, generate, getMore) {
    
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
  require(['hbs!../templates/songs'], function(songTemplate){
    $('#more').before(songTemplate(data));
    $('.matchHeight').matchHeight();
  });
  // for(var i=1; i<=data.songs.length; i++){
  //   // $('#more').before("<div class='cont'><p class='large' id='song'>"+data.songs[i-1].name+"</p><ul><li id='artist'> Artist: "+data.songs[i-1].artist+"</li><li class='middle' id='album'>Album: "+data.songs[i-1].album+"</li><li id='year'>Year: "+data.songs[i-1].year+"</li></ul><button type='button' class='btn btn-default btn-sm delete'>Delete</button></div>");
  // }
  initDelete();
}

function initDelete(){
  $(document).on("click", ".delete", function(){
    console.log("you clicked a delete button");
    $(this).parent().remove();
    $('.matchHeight').matchHeight();
  });
  // $('.delete').click(function(){
  // console.log("you clicked a delete button");
  //   $(this).parent().remove();
  // });
}

