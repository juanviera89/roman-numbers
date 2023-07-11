"use strict"
const express = require('express')
const app = express()
const port = 3000
const NumerosRomanos = require('./convertidor')
var cors = require('cors')
app.use(cors({origin: '*', exposedHeaders : ['X-Powered-By', 'Content-Type', 'content-type', 'Content-Length', 'Keep-Alive', 'Connection' ], methods : '*', allowedHeaders: '*', optionsSuccessStatus: 200}))

app.use('/web',express.static('public'))

app.get('/romano/natural/:numero', (req, res) => {
    try {
        const {numero} = req.params
        if( !numero || `${numero}`.trim().length ==0) return res.status(400).send('Debes enviar un numero romano para convertir')
        if(!isNaN(numero)) return res.status(400).send('Debes enviar un numero romano. Para convertir numeros naturales refiera a la ruta "natural/romano"')
        const resultado = NumerosRomanos.convertirANatural(numero)
        return res.status(200).send( `${resultado}`)
    } catch (error) {
        console.error(error);
        if((error.message || '').includes('Simbolo no existe en numeracion romana')) return res.status(400).send(error.message)
        return res.status(500).send('Error inesperado')
    }
})
app.get('/natural/romano/:numero', (req, res) => {
    try {
        const {numero} = req.params
        if( !numero || `${numero}`.trim().length ==0) return res.status(400).send('Debes enviar un numero natural para convertir')
        if(isNaN(numero)) return res.status(400).send('Debes enviar un numero natural. Para convertir numeros romanos refiera a la ruta "romano/natural"')
        const resultado = NumerosRomanos.convertirARomanos(numero)
        return res.status(200).send( `${resultado}`)
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error inesperado')        
    }
})
app.listen(port, () => {
    console.log(`Api escuchando en puerto: ${port}`)
})