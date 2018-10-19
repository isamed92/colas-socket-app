const { io } = require('../server');

const {TicketControl} = require('../classes/ticket-control.js');

let ticket = new TicketControl();

io.on('connection', (client) => {
    
    
    client.on('siguienteTicket', (data, callback)=>{ 

        let siguiente = ticket.siguiente();
        console.log(`${siguiente}`);
        callback(siguiente);
    });

    //emitir un evento llamado estado actual
    client.emit('estadoActual',
     {
         actual: ticket.getUltimoTicket(),
         ultimos4: ticket.getUltimos4()
        
    });

    client.on('atenderTicket', (data, callback) =>{
        if(!data.escritorio){
            return callback({
                err: true, 
                mensaje: 'el escritorio es necesario'});
        }
        let atenderTicket = ticket.atenderTicket(data.escritorio);

        callback(atenderTicket);

        //actualizar o notificar cambios en los ULTIMOS 4
        client.broadcast.emit('ultimos4', {
            ultimos4: ticket.getUltimos4()
        });

        
    });
});