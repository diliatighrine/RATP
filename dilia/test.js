var METRO;
function transport(tab1,station1,couleur="",chemin="" ,icon){
// var chemin ="./tram/tram5/stops.json";
METRO = L.layerGroup();

fetch(chemin)
    .then(response => response.json())
    .then(data =>{
      //  console.log(data)
      var taille = data.stops.length;
      // console.log(taille)
        for(var i =0 ; i< taille ;i++){
           data.stops[i].stop_lat = parseFloat(data.stops[i].stop_lat);
           data.stops[i].stop_lon = parseFloat(data.stops[i].stop_lon);
           var coord1 = [data.stops[i].stop_lat,data.stops[i].stop_lon];
            tab1.push(coord1)
            
            let marker = L.marker([data.stops[i].stop_lat, data.stops[i].stop_lon],{icon: station1}).addTo(METRO)
                   marker.bindPopup(data.stops[i].stop_name)
        }
        // couleur = ""
       polyline = L.polyline(tab1, {color: couleur}).addTo(METRO)
            console.log(tab1)
            var animatedMarker = L.animatedMarker(tab1,{icon: icon});
            animatedMarker.addTo(METRO)      
    })
    var overlays = {
					"Metro": METRO
				};

				carte.addLayer(METRO);

				// remove the current control panel
				carte.removeControl(baseControl);
				// add one with the cities
				METROControl = L.control.layers(baseMaps, overlays).addTo(carte);
}

  
  function removeLayer() {
				console.log("Removing layer");
				map.removeLayer(METRO);

				// now put the control back
				map.removeControl(METROControl);
				baseControl.addTo(carte);
			}
var baseControl = L.control.layers(baseMaps).addTo(carte);
var METROControl;
