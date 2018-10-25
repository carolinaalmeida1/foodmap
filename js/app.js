$(document).ready(function() {
  $('.home').delay('3000').fadeIn('slow');

  var searchRest = $('.search-rest');
  var allRest = Object.keys(restaurantes);

  showAllRest();
  searchRest.keyup(searchFilter);
  $('.cover').mouseover(showCover).mouseout(hideCover);
  $('.cover').click(fillModal);

  function showAllRest() {
    $.each(allRest, function(i) {
      var restThumb = `<li class="all-images col-12 col-sm-12 col-md-3"><a id="${allRest[i]}" href="#" data-toggle="modal" data-target="#infoModal">
                        <span class="cover">
                          <span class="name">${restaurantes[allRest[i]].name}</span>
                          </span>
                        </a>
                      </li>`;
      $('.search-results .row ul').append(restThumb);
      $('#' + allRest[i]).css({
        'background-image': 'url(' + restaurantes[allRest[i]].image + ')'});
    });
  }

  function showCover() {
    $(this).css('opacity', '1');
  }
  function hideCover() {
    $(this).css('opacity', '0');
  }

  function searchFilter() {
    var searchLetter = searchRest.val();
    $('.all-images').hide();
    $('.all-images a').each(function() {
      var typeArr = restaurantes[$(this).attr('id')].type;
      for (var i = 0; i < typeArr.length; i++) {
        if (typeArr[i].indexOf(searchLetter) !== -1 || ((restaurantes[$(this).attr('id')].type).toLowerCase()).indexOf(searchLetter.toLowerCase()) !== -1 || ((restaurantes[$(this).attr('id')].name).toLowerCase()).indexOf(searchLetter.toLowerCase()) !== -1) {
          $(this).parent().fadeIn('fast');
        }
      }
    });
  }

  // Modal
  function fillModal() {
    $('.modal-title').text(restaurantes[$(this).parent().attr('id')].name);
    $('.type-title').text(restaurantes[$(this).parent().attr('id')].type);
    $('.descr').text(restaurantes[$(this).parent().attr('id')].description);
    $('.img-modal').text(restaurantes[$(this).parent().attr('id')].image);
  }

});

// Map
var map;
function initMap() {
 map = new google.maps.Map(document.getElementById('map'), {
 zoom: 15,
 center: new google.maps.LatLng(-23.5578108, -46.6625469),
 mapTypeId: 'roadmap'
});

var features = restaurantes.map(function(r){
   return {
     position: new google.maps.LatLng(r.latitude, r.longitude)
   }
 });

 // Create markers
 features.forEach(function(feature) {
   var marker = new google.maps.Marker({
     position: feature.position,
     map: map
   });
 });
}
