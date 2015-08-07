var formOnce=false;
var songCount=0;

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
    var $addSongsButton = $('#addSongs');
    var $filterSongs = $('#filter');
    
    var num = 1;
    console.log(output);
    generate.setArray(addSongs);

    $addSongsButton.on("click", function(){
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

    $filterSongs.on("click", function(){
      // console.log("We made it to the button click");
      filterSongs();
    });

    // $(document).on('click', '#artist', function(){
    //   filterAlbum();
    // });

    // modifySelect();


  // $('#more').click(function(){
  //   if(num===1){
  //   getMore.setArray(addSongs);
  //   num=2;
  //   }
  // });
});

function addSongs(data){
  require(['hbs!../templates/songs', 'hbs!../templates/form'], function(songTemplate, formTemplate){
    $('#more').before(songTemplate(data));//populates songs
////This code will only run once//////////////////
    // if(formOnce===false){
    //   $('#left').html(formTemplate(data));
    //   formOnce=true;
    // }
/////////////////////////////
    $('#selects').html(formTemplate(data));//populates select tags
    $(document).on('change', '#artist', function(){
      filterAlbum();
    });
    // filterAlbum();

    $('.matchHeight').matchHeight();
  });
  // modifySelect();
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

function filterSongs(){
  var $artist = $('#artist').val();
  var $album = $('#album').val();
  // var domArr = $('.cont');
  var $artistArr = $(".artist");
  var $albumArr = $(".album");
  for(var i=0; i<$artistArr.length; i++){
    $($artistArr[i]).parent().parent().hide();

    console.log($($artistArr[i]).text());
    if($($artistArr[i]).text()==="Artist: "+$artist){
      $($artistArr[i]).parent().parent().show();
      console.log("true artist");
    }
    // else{
    //   $($artistArr[i]).parent().parent().hide();
    //   console.log("false artist");
    // }

    console.log($($albumArr[i]).text());
    if($($albumArr[i]).text()==="Album: "+$album){
      $($albumArr[i]).parent().parent().show();
      console.log("true album");
    }
    // else{
    //   $($artistArr[i]).parent().parent().hide();
    //   console.log("false album");
    // }
  }
}

function filterAlbum(){
  var selectedArtist = $('#artist').val();
  $('select#album > option').each(function(index, value){
    var currentArtistName = $(value).attr("class");
    var option = $(value);
    if(selectedArtist === currentArtistName){
      option.show();
    }
    else{
      option.hide();
    }
  });
}
// function modifySelect(){
//   var $artistSelect = $('select#artist');
//   console.log($artistSelect);
//   var $artistOptionsArr = $('.artistOption');
//   var uniqueArtists = [];
//   $.each($artistOptionsArr, function(i, el){
//     if($.inArray(el, uniqueArtists) === -1) uniqueArtists.push(el);
//   });
//   console.log(uniqueArtists);
//   $($artistSelect).html = "";
//   for(var i=0; i<uniqueArtists.length; i++){
//     $artistSelect.append(uniqueArtists[i]);
//     // "<option class='artistOption'>"+uniqueArtists[i]+"</option>";
//   }
// }