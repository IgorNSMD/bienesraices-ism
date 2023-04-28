const esVendedor = (userId, propertyuserid) =>{

    return userId === propertyuserid
}

const formatDate = parameterDate => {
    
    const newDate = new Date(parameterDate).toISOString().slice(0,10);

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day:'numeric'
    }

    return new Date(newDate).toLocaleDateString('es-ES',options)

    //console.log(new Date(parameterDate).toISOString().slice(0,10))
}

module.exports =  {
    esVendedor,
    formatDate
}