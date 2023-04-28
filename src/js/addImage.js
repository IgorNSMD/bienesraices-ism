const { Dropzone } = require('dropzone')

// alert('funciona')

const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
//console.log(token)

Dropzone.options.image = {
    dictDefaultMessage: 'Sube tus imagenes aquí',
    acceptedFiles: '.png,.jpg,.jpeg',
    maxFilesize: 5,
    maxFiles: 1,
    paralleUploads: 1,
    autoProcessQueue: false,
    addRemoveLinks: true,
    dictRemoveFile: 'Borrar Archivo',
    dictMaxFilesExceeded: 'El límite es 1 archivo',
    headers: {
        'CSRF-Token':token
    },
    paramName: 'image',
    init: function(){
        const dropzone = this
        const btnpost = document.querySelector('#post')

        btnpost.addEventListener('click', function(){
            dropzone.processQueue()
        })

        dropzone.on('queuecomplete', function(file,message){
            if(dropzone.getActiveFiles().length == 0){
                window.location.href = '/my-properties'
            }
        })
    }
}