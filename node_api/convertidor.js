"use strict"

class NumerosRomanos {
    static _simbolosRomanos = [
        ["I", "V"],
        ["X", "L"],
        ["C", "D"],
        ["M", "~V"]
    ];

    static convertirARomanos(numeroNatural = 0) {
        if (isNaN(parseInt(numeroNatural))) throw new Error('Parametro de entrada debe ser un numero entero')
        const arregloNumeros = `${parseInt(numeroNatural)}`.split('')
        let resultado = "";
        for (let i = 0; i < arregloNumeros.length; i++) {
            const index = arregloNumeros.length - i - 1;
            const numero = parseInt(arregloNumeros[i]);
            const simbolos = this._simbolosRomanos[index];
            if (numero == 9) {
                resultado = resultado + simbolos[0] + this._simbolosRomanos[index + 1][0];
            } else if (numero >= 5) {
                const unidades = numero - 5;
                resultado = resultado + simbolos[1] + simbolos[0].repeat(unidades);
            } else if (numero == 4) {
                resultado = resultado + simbolos[0] + simbolos[1];
            } else {
                resultado = resultado + simbolos[0].repeat(numero);
            }
        }
        return resultado;
    }

    static convertirANatural (numeroRomano = '') {
        //no funciona para 5000 dado que el simbolo esta representado en dos caracteres, buscar reemplazar por caracter unico para que funcione
        const digitosRomanos = numeroRomano.split(''), digitosNaturales = []
        const simbolosRomanos = this._simbolosRomanos.
        map( (parDigitosRomanos, i) => [{romano : parDigitosRomanos[0], natural : 1*(10**i) }, {romano : parDigitosRomanos[1], natural : 5*(10**i) }]  )
        .flat()
        for (let index = 0; index < digitosRomanos.length; index++) {
           const digitoNatural = simbolosRomanos.find( (simboloRomano) => simboloRomano.romano == digitosRomanos[index] )?.natural
           if(!digitoNatural) throw new Error('Simbolo no existe en numeracion romana: ' + digitosRomanos[index])
           const digitoNaturalSiguiente = digitosRomanos[index + 1] != undefined ? simbolosRomanos.find( (simboloRomano) => simboloRomano.romano == digitosRomanos[index+ 1] )?.natural : 0;
           const signo = digitoNatural >= digitoNaturalSiguiente  ? 1 : -1
           digitosNaturales.push(digitoNatural*signo)
        }
        return digitosNaturales.reduce( (resultado, digitoNatural) => resultado + digitoNatural , 0)
    }
}

module.exports = NumerosRomanos