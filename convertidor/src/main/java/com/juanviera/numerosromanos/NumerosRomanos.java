package com.juanviera.numerosromanos;

import java.util.Arrays;
import java.util.List;

public class NumerosRomanos {


    private final static List<List<String> > simbolosRomanos = Arrays.asList(Arrays.asList("I", "V"),
    Arrays.asList("X", "L"), 
    Arrays.asList("C", "D"), 
     Arrays.asList("M","~V"));


    public String convertirARomanos(Integer numeroNatural) {

        char[] arregloNumeros = numeroNatural.toString().toCharArray();
        String resultado = "";
        for (int i = 0; i < arregloNumeros.length; i++) {
            int index = arregloNumeros.length - i - 1;
            int numero = Character.getNumericValue(arregloNumeros[i]);
            List<String> simbolos = simbolosRomanos.get(index);
            if (numero == 9) {
                resultado = resultado + simbolos.get(0) + simbolosRomanos.get(index+1).get(0)    ;
            } else if (numero >= 5) {
                int unidades = numero - 5;
                resultado = resultado + simbolos.get(1) + simbolos.get(0).repeat(unidades);
            } else if (numero == 4) {
                resultado = resultado + simbolos.get(0)+ simbolos.get(1);
            } else {
                resultado = resultado + simbolos.get(0).repeat(numero);
            }           
        }
        return resultado;
        /*int inc = 0;
        String resultado = "";
        for (int i = arregloNumeros.length - 1; i >= 0; i--) {
            String romano = generico(Character.getNumericValue(arregloNumeros[i]), 0 + inc, 1 + inc, 2 + inc);

            resultado = romano + resultado;
            inc += 2;
        }
        return resultado;*/
    }

    /* private String generico(int decena, int x, int y, int z) {

        switch (decena) {
            case 4:
                return simbolosRomanos.get(x) + simbolosRomanos.get(y);
            case 9:
                return simbolosRomanos.get(x) + simbolosRomanos.get(z);
        }

        if (decena <= 3)
            return sumar(1, decena, "", simbolosRomanos.get(x));

        if (decena <= 8)
            return sumar(6, decena, simbolosRomanos.get(y), simbolosRomanos.get(x));

        return null;
    }


    private String sumar(int inicioCuenta, int numeroNatural, String inicioNumeroRomano, String incRomano) {
        for (int i = inicioCuenta; i <= numeroNatural; i++) {
            inicioNumeroRomano += incRomano;
        }
        return inicioNumeroRomano;
    } */
}