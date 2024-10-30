/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package crearjson;

import java.io.Serializable;

/**
 *
 * @author LUIS.DURON
 */
public class TxtDto implements Serializable{
    
    private String archivo;

    /**
     * @return the archivo
     */
    public String getArchivo() {
        return archivo;
    }

    /**
     * @param archivo the archivo to set
     */
    public void setArchivo(String archivo) {
        this.archivo = archivo;
    }

}
