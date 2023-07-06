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
    }
}