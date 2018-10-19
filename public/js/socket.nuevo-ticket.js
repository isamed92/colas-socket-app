

// Comando para establecer la comunicacion
var socket = io();

var label = $('#lblNuevoTicket')


socket.on('connect', function(){
    console.log('Conectado al Servidor');
});

socket.on('disconnect', function () {
    console.log('Desconectado al Servidor');
});

//jquery
$('button').on('click', function(){
    socket.emit('siguienteTicket', null, 
    function(siguienteTicket){
        label.text(siguienteTicket);

    });
})

//listener on 'estadoActual'
socket.on('estadoActual', function(resp){
    label.text(resp.actual);
});

