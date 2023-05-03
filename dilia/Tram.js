  // On initialise la carte
var carte = L.map('maCarte').setView([48.852969, 2.349903], 13);
            
  // On charge les "tuiles"
L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
      // Il est toujours bien de laisser le lien vers la source des données
      attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
      minZoom: 1,
      maxZoom: 20
})

var streetsUrl = 'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
var streets = L.tileLayer(
  streetsUrl, 
  {
    id: 'mapbox.streets', 
    attribution: 'Map data © OpenStreetMap contributors, CC-BY-SA, Imagery © CloudMade'}).addTo(carte);

var streetsUrl1 = 'https://api.mapbox.com/styles/v1/sbouslimani/ckoccgbbq1vim17qnxtos2hf9/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2JvdXNsaW1hbmkiLCJhIjoiY2tvY2NlbThhMDNqeDJ1bXFhamN6Zmo2MCJ9.6mdUq_tMV4LxOBJBeoFTmg'
var franck = L.tileLayer(
  streetsUrl1, 
  {
    id: 'mapbox.franck', 
    attribution: 'Map data © OpenStreetMap contributors, CC-BY-SA, Imagery © CloudMade'}
)


// ////////////////////////////////  couleur des points de chaque station de tram /////////////////

const station1  = L.icon({iconUrl: './tram/tram1/point.png' ,iconSize: [10, 15]});
const station2  = L.icon({iconUrl: './tram/tram2/point.png' ,iconSize: [10, 15]});
const station3a = L.icon({iconUrl: './tram/tram3a/point.png',iconSize: [10, 15]});
const station3b = L.icon({iconUrl: './tram/tram3b/point.png',iconSize: [10, 15]});
const station5  = L.icon({iconUrl: './tram/tram5/point.png' ,iconSize: [10, 15]});
const station6  = L.icon({iconUrl: './tram/tram6/point.png' ,iconSize: [10, 15]});
const station7  = L.icon({iconUrl: './tram/tram7/point.png' ,iconSize: [10, 15]});
const station8  = L.icon({iconUrl: './tram/tram8/point.png', iconSize: [10, 15]});


///////////////////////////////////       RER      ///////////////////////////////////////////
const station_rA = L.icon({iconUrl: './rer/rerA/point.png',iconSize: [10, 15]});
const station_rB = L.icon({iconUrl: './rer/rerB/point.png',iconSize: [10, 15]});

///////////////////////////////////////////////////////////////////////////////////////////////
const s_metro_1    = L.icon({iconUrl: './metro/metro1/point.png'   ,iconSize: [10, 15]});
const s_metro_2    = L.icon({iconUrl: './metro/metro2/point.png'   ,iconSize: [10, 15]});
const s_metro_3    = L.icon({iconUrl: './metro/metro3/point.png'   ,iconSize: [10, 15]});
const s_metro_3bis = L.icon({iconUrl: './metro/metro3bis/point.png',iconSize: [10, 15]});
const s_metro_4    = L.icon({iconUrl: './metro/metro4/point.png'   ,iconSize: [10, 15]});
const s_metro_5    = L.icon({iconUrl: './metro/metro5/point.png'   ,iconSize: [10, 15]});
const s_metro_6    = L.icon({iconUrl: './metro/metro6/point.png'   ,iconSize: [10, 15]});
const s_metro_7    = L.icon({iconUrl: './metro/metro7/point.png'   ,iconSize: [10, 15]});
const s_metro_7bis = L.icon({iconUrl: './metro/metro7bis/point.png',iconSize: [10, 15]});
const s_metro_8    = L.icon({iconUrl: './metro/metro8/point.png'   ,iconSize: [10, 15]});
const s_metro_9    = L.icon({iconUrl: './metro/metro9/point.png'   ,iconSize: [10, 15]});
const s_metro_10   = L.icon({iconUrl: './metro/metro10/point.png'  ,iconSize: [10, 15]});
const s_metro_11   = L.icon({iconUrl: './metro/metro11/point.png'  ,iconSize: [10, 15]});
const s_metro_12   = L.icon({iconUrl: './metro/metro12/point.png'  ,iconSize: [10, 15]});
const s_metro_13   = L.icon({iconUrl: './metro/metro13/point.png'  ,iconSize: [10, 15]});
const s_metro_14   = L.icon({iconUrl: './metro/metro14/point.png'  ,iconSize: [10, 15]});
  
 ///////////////////////////ove to the next vertex//  icon du tram qui se deplace le long de la ligne ////////////////
const TramIcon  = L.icon({iconUrl: './tram/tram.png'  ,iconSize: [30, 20]});
const RerIcon   = L.icon({iconUrl: './rer/image.png'  ,iconSize: [50, 25]});
const MetroIcon = L.icon({iconUrl: './metro/image.png',iconSize: [35, 20]});


//////////////// tableau qui va contenir les coordonner de chaque station ////////////
var tab1 = []
var tab2 = []
var tab3a= []
var tab3b= []
var tab5 = []
var tab6 = []
var tab7 = []
var tab8 = []

var tabrerA = []
var tabrerB = []


var tabM1    = []
var tabM2    = []
var tabM3    = []
var tabM3bis = []
var tabM4    = []
var tabM5    = []
var tabM6    = []
var tabM7    = []
var tabM7bis = []
var tabM8    = []
var tabM9    = []
var tabM10   = []
var tabM11   = []
var tabM12   = []
var tabM13   = []
var tabM14   = []
/////////////// fonction pour dessiner chaque ligne  de transport /////////////

var METRO = L.layerGroup();
var TRAM = L.layerGroup();
var RER = L.layerGroup();



function transport(tab, station, couleur="", chemin="", icon ,map){
fetch(chemin)
    .then(response => response.json())
    .then(data =>{
      var taille = data.stops.length;
        for(var i =0 ; i< taille ;i++){
           data.stops[i].stop_lat = parseFloat(data.stops[i].stop_lat);
           data.stops[i].stop_lon = parseFloat(data.stops[i].stop_lon);
           var coord = [data.stops[i].stop_lat,data.stops[i].stop_lon];
            tab.push(coord)
            let marker = L.marker([data.stops[i].stop_lat, data.stops[i].stop_lon],{icon: station}).addTo(map)
                   marker.bindPopup(data.stops[i].stop_name)
        }
       polyline = L.polyline(tab, {color: couleur}).addTo(map)
            var animatedMarker = L.animatedMarker(tab,{icon: icon});
            animatedMarker.addTo(carte)   
    })
    
  }





var baseMaps = {
              
 "Streets": streets,
 "Franck" :franck
 };

var overlays = {
  "metro": METRO,
  "tram" :TRAM,
  "RER" :RER
	};

  carte.addLayer(METRO);
  carte.addLayer(TRAM);
  carte.addLayer(RER);
	METROControl = L.control.layers(baseMaps, overlays).addTo(carte);  


// //////////////////////////////                TRAM                ///////////////////////////////////////////
var tram1 = transport(tab1,station1,couleur ="#0055c8",chemin = "./tram/tram1/stops.json" ,TramIcon,TRAM)
var tram2 = transport(tab2,station2,couleur ="#a0006e",chemin = "./tram/tram2/stops.json" ,TramIcon ,TRAM)
var tram3 = transport(tab3a,station3a,couleur ="#ff5a00",chemin = "./tram/tram3a/stops.json" ,TramIcon ,TRAM)
var tram3b = transport(tab3b,station3b,couleur ="#009641",chemin = "./tram/tram3b/stops.json" ,TramIcon ,TRAM)
var tram5 = transport(tab5,station5,couleur ="#640082",chemin = "./tram/tram5/stops.json" ,TramIcon ,TRAM)
var tram6 = transport(tab6,station6,couleur ="#ff1400",chemin = "./tram/tram6/stops.json" ,TramIcon ,TRAM)
var tram7 = transport(tab7,station7,couleur ="#6e491e",chemin = "./tram/tram7/stops.json" ,TramIcon ,TRAM)
var tram8 = transport(tab8,station8,couleur ="#6e6e00",chemin = "./tram/tram8/stops.json" ,TramIcon ,TRAM)


// // //////////////////////////////                RER                ///////////////////////////////////////////

var RER_A = transport(tabrerA,station_rA,couleur ="red",chemin = "./rer/rerA/stops.json" ,RerIcon, RER )
var RER_B = transport(tabrerB,station_rB,couleur ="blue",chemin = "./rer/rerB/stops.json" ,RerIcon, RER )

//////////////////////////////                METRO                ///////////////////////////////////////////

var metro1 = transport(tabM1,s_metro_1,couleur ="#ffcd00",chemin = "./metro/metro1/stops.json" ,MetroIcon ,METRO)
var metro2 = transport(tabM2,s_metro_2,couleur ="#003ca6",chemin = "./metro/metro2/stops.json" ,MetroIcon ,METRO)
var metro3 = transport(tabM3,s_metro_3,couleur ="#837902",chemin = "./metro/metro3/stops.json" ,MetroIcon ,METRO)
var metro3bis = transport(tabM3bis,s_metro_3bis,couleur ="#837902",chemin = "./metro/metro3bis/stops.json" ,MetroIcon,METRO )
var metro4 = transport(tabM4,s_metro_4,couleur ="#be418d",chemin = "./metro/metro4/stops.json" ,MetroIcon ,METRO)
var metro5 = transport(tabM5,s_metro_5,couleur ="#ff7f32",chemin = "./metro/metro5/stops.json" ,MetroIcon ,METRO)
var metro6 = transport(tabM6,s_metro_6,couleur ="#6eca97",chemin = "./metro/metro6/stops.json" ,MetroIcon ,METRO)
var metro7 = transport(tabM7,s_metro_7,couleur ="#f59bbb",chemin = "./metro/metro7/stops.json" ,MetroIcon ,METRO)
var metro7bis = transport(tabM7bis,s_metro_7bis,couleur ="#6eca97",chemin = "./metro/metro7bis/stops.json" ,MetroIcon ,METRO)
var metro8 = transport(tabM8,s_metro_8,couleur ="#e19bdf",chemin = "./metro/metro8/stops.json" ,MetroIcon ,METRO)
var metro9 = transport(tabM9,s_metro_9,couleur ="#b6bd00",chemin = "./metro/metro9/stops.json" ,MetroIcon ,METRO)
var metro10 = transport(tabM10,s_metro_10,couleur ="#c9910d",chemin = "./metro/metro10/stops.json" ,MetroIcon ,METRO)
var metro11 = transport(tabM11,s_metro_11,couleur ="#704b1c",chemin = "./metro/metro11/stops.json" ,MetroIcon ,METRO)
var metro12 = transport(tabM12,s_metro_12,couleur ="#007852",chemin = "./metro/metro12/stops.json" ,MetroIcon ,METRO)
var metro13 = transport(tabM13,s_metro_13,couleur ="#6ec4e8",chemin = "./metro/metro13/stops.json" ,MetroIcon ,METRO)
var metro14 = transport(tabM14,s_metro_14,couleur ="#62259d",chemin = "./metro/metro14/stops.json" ,MetroIcon ,METRO)

function parseTime(time) {    
    let timeInt = parseInt(time);
    let minutes = time.substring(3,5);

    // you could then add or subtract time here as needed

    if(time > '12:00') {
         return `${timeInt }:${minutes} `;
    } else {
         return `${timeInt} : ${minutes}: `;
    }
}


var tab =[]
var tabt =[]

var tab1 =[]
var tab2 =[]

function getValue() {
    // Sélectionner l'élément input et récupérer sa valeur
    var input = document.getElementById("in").value;
    // Afficher la valeur
    console.log(input);

}
console.log(getValue())
temp="15:35"
temp1= parseTime(temp)
// function times(tab, station, couleur="", chemin="", icon ,map){
fetch('./metro/metro3bis/stop_times.json')
    .then(response => response.json())
    .then(data =>{
      var taille = data.stop_times.length;
      // console.log(data);
      
        for(var i =0 ; i< taille ;i++){
          data.stop_times[i].arrival_time = parseTime(data.stop_times[i].arrival_time);
          time =data.stop_times[i].arrival_time
          tabt.push(time)
          stop_id0 = data.stop_times[i].stop_id;
          tab.push(stop_id0)
    
        }
        fetch('./metro/metro3bis/stops.json')
           .then(response1 => response1.json())
           .then(data1 =>{
               var taille1 = data.stop_times.length;
          
          const searchinput = document.getElementById('searchInput');
        
          for(var i =0 ; i< taille1 ;i++){
           stop_id1 = data1.stops[i].stop_id;
           tab1.push(stop_id1)


           if(tab1[i] === tab[i]){
           data1.stops[i].stop_lat = parseFloat(data1.stops[i].stop_lat);
           data1.stops[i].stop_lon = parseFloat(data1.stops[i].stop_lon);
           var coord = [data1.stops[i].stop_lat,data1.stops[i].stop_lon];
           tab2.push(coord)
                    if(temp1 === tabt[i]){
                      console.log(data1.stops[i].stop_name)
                    }
              }
          }
           })
  
    
    })