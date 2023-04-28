(function(){
    //https://www.google.cl/maps/@-32.967291,-71.5440427,15z

    const lat = -33.4525756; // 20.67444163271174;
    const lng = -70.6184675; // -103.38739216304566;
    const map = L.map('map-start').setView([lat, lng ], 16);

    let markers = new L.FeatureGroup().addTo(map)
    let properties = [];

    // Filters
    const filters = {
        category: '',
        price:''
    }

    const categoriesSelect = document.querySelector('#categories')
    const pricesSelect = document.querySelector('#prices')



    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);    

    // Filtrado de categorias y precios
    categoriesSelect.addEventListener('change', e => {
        //console.log(e.target.value)
        filters.category = +e.target.value
        filterProperties()
    })

    pricesSelect.addEventListener('change', e => {
        //console.log(e.target.value)
        filters.price = +e.target.value
        filterProperties()
    })

    const getProperties = async(req,res) => {
        try {

            const url = '/api/properties'
            const response = await fetch(url)
            properties = await response.json()

            showProperties(properties)
            

        } catch (error) {
            console.log(error)
        }
    }

    const showProperties = properties => {
        //console.log(properties)

        // Limpiar los markers previamente
        markers.clearLayers()

        properties.forEach(property => {
            
            //console.log(property)

            // Agregar los pines
            const marker = new L.marker([property?.lat, property?.lng], {
                autoPan: true
            })
            .addTo(map)
            .bindPopup(`
                <p class="text-indigo-600 font-bold">${ property?.category.name } </p>
                <h1 class="text-xl font-extrabold uppercase my-2">${ property?.title }  </h1>
                <img src="/uploads/${ property?.picture }" alt="Imagen de la propiedad ${ property?.picture }">
                <p class="text-gray-600 font-bold">${ property?.price.name } </p>
                <a href="/property/${ property.id }" class="bg-indigo-600 block p-2 text-center font-bold uppercase">Ver propiedad</a>
            `)

            markers.addLayer(marker)
        });
    }
    const filterProperties = () => {
        // console.log(properties)
        const result = properties.filter(filterCategorie).filter(filterPrice)
        showProperties(result)
        //console.log(result)
    }

    const filterCategorie = property => {
        // console.log(property)
        return filters.category ? property.categoryid === filters.category : property
    }

    const filterPrice = property => {
        // console.log(property)
        return filters.price ? property.priceid === filters.price : property
    }

    getProperties()
})()