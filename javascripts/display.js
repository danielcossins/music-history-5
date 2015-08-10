define(function(){

  return {
    show: function(data){
      var $filterSongs = $('#filter');
      addSongs(data);//includes the select template and filteArlbum()

      $filterSongs.on("click", function(){
        // console.log("We made it to the button click");
        filterSongs();
      });
    }
  };
});

function addSongs(data){
  require(['hbs!../templates/songs', 'hbs!../templates/artistSelect', 'hbs!../templates/albumSelect'], function(songTemplate, artistFormTemplate, albumFormTemplate){
    $('#more').before(songTemplate({songs: data}));//populates songs
    ///////////////
    var uniqueArtists = _.chain(data).uniq("artist").value();//.pluck("artist").value();
    console.log(uniqueArtists);
    var uniqueAlbums = _.chain(data).uniq("album").value();//.pluck("album").value();
    console.log(uniqueAlbums);

    // $('#selects').html(formTemplate)({songs: data});
    $('#artistSelect').html(artistFormTemplate(uniqueArtists));
    $('#albumSelect').html(albumFormTemplate(uniqueAlbums));
    ////////////////////////
    $(document).on('change', '#artist', function(){
      filterAlbum();
    });

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