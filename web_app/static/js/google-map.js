// Uses $.goMap() google maps jQuery plugin http://www.pittss.lv/jquery/gomap/

$(function() { 
    $("#map").goMap({ 
        latitude: 52.5701,
        longitude: -2.8033, 
    	scaleControl: true, 
        maptype: 'ROADMAP',
        zoom: 12,
        markers: [{  
            latitude: 52.5701,
            longitude: -2.8033, 
            html: { 
                content: 'Womerton Farm - SY6 6LA<br />01694 751260', 
                popup: false
            } 
        }]
    }); 
}); 


