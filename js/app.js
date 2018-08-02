$(document).ready(function() {

   $.each(restaurantes, function (index, restaurante) {
     $("<img>").attr("src", restaurante.image).appendTo(".img-restaurant");
})  
});

var map;
function initMap() {
 map = new google.maps.Map(document.getElementById('map'), {
 zoom: 15,
 center: new google.maps.LatLng(-23.5578108, -46.6625469),
 mapTypeId: 'roadmap'
});

var features = restaurantes.map(function(r){
   return {
     position: new google.maps.LatLng(r.latitude, r.longitude),
     type: 'info'
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
