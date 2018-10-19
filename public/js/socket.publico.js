// Comando para establecer la comunicacion
var socket = io();


var lblTicket1 = $('#lblTicket1'); 
var lblTicket2 = $('#lblTicket2'); 
var lblTicket3 = $('#lblTicket3'); 
var lblTicket4 = $('#lblTicket4'); 

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4'); 

var lbltickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblescritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

socket.on('estadoActual', function(data){
    // console.log(data);
    actualizaHtml(data.ultimos4);

});


function actualizaHtml(ultimos4){
    for(var i=0; i<= ultimos4.length-1; i++){
        lbltickets[i].text('Ticket ' + ultimos4[i].numero);
        lblescritorios[i].text('Escritorio ' + ultimos4[i].escritorio);
    }
}

socket.on('ultimos4', function (data) {
    // console.log(data);

    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizaHtml(data.ultimos4);

});