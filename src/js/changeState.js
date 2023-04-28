(function(){
    //alert('cambiarestado.js')
    const changeStateBtn = document.querySelectorAll('.change-state')
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

    changeStateBtn.forEach( b => {
        b.addEventListener('click',changeStateProperty)
    });

    async function changeStateProperty(e){
        const { propertyid: id } = e.target.dataset
        //console.log(id)

        try {
            const url = `/properties/changeState/${ id }`

            const resp = await fetch(url,{
                method:'PUT',
                headers: {
                    'CSRF-Token': token
                }
            })
    
                    
            const result = await resp.json()

            //console.log(result)    

            if(result){

                if(e.target.classList.contains('bg-yellow-100')){
                    e.target.classList.add('bg-green-100','text-green-800')
                    e.target.classList.remove('bg-yellow-100','text-yellow-800')
                    e.target.textContent = 'Publicado'
                } else {
                    e.target.classList.remove('bg-green-100','text-green-800')
                    e.target.classList.add('bg-yellow-100','text-yellow-800')
                    e.target.textContent = 'No Publicado'
                }

            }


        } catch (error) {
            console.log(error)    
        }
    }

})()