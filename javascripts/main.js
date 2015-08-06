var formOnce=false;

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
  var $addSongs = $('#addSongs');
    
    var num = 1;
    console.log(output);
    generate.setArray(addSongs);

    $addSongs.click(function(){
      console.log("We made it to the button click");
      var song = {
      "name": $('#title').val(),
      "artist": $('#artist').val(),
      "album": $('#album').val(),
      "year": $('#year').val()
      };
      console.log(song);
      loadSongsToFirebase(song);
    });

  // $('#more').click(function(){
  //   if(num===1){
  //   getMore.setArray(addSongs);
  //   num=2;
  //   }
  // });
});

function addSongs(data){
  require(['hbs!../templates/songs', 'hbs!../templates/form'], function(songTemplate, formTemplate){
    $('#more').before(songTemplate(data));
////This code will only run once//////////////////
    // if(formOnce===false){
    //   $('#left').html(formTemplate(data));
    //   formOnce=true;
    // }
/////////////////////////////
    $('#selects').html(formTemplate(data));
    $('.matchHeight').matchHeight();
  });
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

// function filterSongs(){
//   filter
// }