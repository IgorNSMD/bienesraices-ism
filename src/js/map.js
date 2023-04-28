(function() {

    //https://www.google.cl/maps/@-32.967291,-71.5440427,15z

    const lat = document.querySelector('#lat').value || -33.4525756; // 20.67444163271174;
    const lng = document.querySelector('#lng').value || -70.6184675; // -103.38739216304566;
    const map = L.map('map').setView([lat, lng ], 16);
    
    let marker;

    // Utilizar provider y Geocoder
    const geocodeService = L.esri.Geocoding.geocodeService()


    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // el Pin
    marker = new L.marker([lat,lng],{
        draggable: true,
        autoPan: true
    }).addTo(map)

    // Detectar el movimiento del ping
    marker.on('moveend', function(e){
        marker = e.target

        //console.log(marker)

        const position = marker.getLatLng();

        //console.log(position)

        map.panTo(new L.LatLng(position.lat, position.lng))

        // Obtener la información de las calles al soltar el ping

        geocodeService.reverse().latlng(position,16).run(function(error,result){
            //console.log(result)
            marker.bindPopup(result.address.LongLabel)

            //Llenar los campos
            document.querySelector('.street').textContent = result?.address?.Address ?? '';
            document.querySelector('#street').value = result?.address?.Address ?? '';
            document.querySelector('#lat').value = result?.latlng?.lat ?? '';
            document.querySelector('#lng').value = result?.latlng?.lng ?? '';

        })

    })

})()