package crearjson;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.PrintWriter;
import java.util.ArrayList;

/**
 *
 * @author luis.duron
 */
public class CrearJSON {

    private static String enter = "\n";

    private static ArrayList<TxtDto> listFiles(String folderPath) {
        ArrayList<TxtDto> listaTxt = new ArrayList<TxtDto>();
        File folder = new File(folderPath);
        if (folder.exists() && folder.isDirectory()) {
            File[] files = folder.listFiles();
            for (File file : files) {
                if (file.getName().toLowerCase().endsWith(".txt")) {
                    TxtDto txtDto = new TxtDto();
                    txtDto.setArchivo(file.getName());
                    listaTxt.add(txtDto);
                }
            }
        } else {
            System.out.println("La carpeta no existe o no es un directorio válido.");
        }
        return listaTxt;
    }

    private static ArrayList<GlosarioDto> leerArchivosTXT(ArrayList<TxtDto> listaTxt) {
        int id = 0;
        ArrayList<GlosarioDto> listaGlosario = new ArrayList<GlosarioDto>();
        for (TxtDto txtDto : listaTxt) {
            String archivo = "../../insumos/" + txtDto.getArchivo();
            try (FileReader fr = new FileReader(archivo)) {
                BufferedReader br = new BufferedReader(fr);
                String linea;
                while ((linea = br.readLine()) != null) {
                    if (!linea.equals("")) {
                        linea = linea.trim();
                        id++;
                        int posPunto = linea.indexOf(".");
                        String numero = (linea.substring(0, posPunto)).trim();
                        int posTab = linea.indexOf("\t");
                        linea = linea.substring(posTab + 1);
                        int posDosPuntos = linea.indexOf(":");
                        String letra = linea.substring(0, 1);
                        String concepto = linea.substring(0, posDosPuntos);
                        linea = (linea.substring(posDosPuntos + 1)).trim();
                        int posUltimoPunto = linea.lastIndexOf(".");
                        String descripcion = linea.substring(0, posUltimoPunto + 1);
                        GlosarioDto glosario = new GlosarioDto();
                        glosario.setId("" + id);
                        glosario.setNumero(numero);
                        glosario.setLetra(letra);
                        glosario.setConcepto(concepto);
                        glosario.setDescripcion(descripcion);
                        listaGlosario.add(glosario);
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return listaGlosario;
    }

    private static String crearCadenaJSON(ArrayList<GlosarioDto> listaGlosario) {
        String cadenaJSON = "{" + enter;
        cadenaJSON += "    \"nombreApp\" : \"Glosario Términos\"," + enter;
        cadenaJSON += "    \"terminos\" : [" + enter;
        for (GlosarioDto glosarioDto : listaGlosario) {
            cadenaJSON += "        {" + enter;
            cadenaJSON += "            \"id\": \"" + glosarioDto.getId() + "\"," + enter;
            cadenaJSON += "            \"numero\": \"" + glosarioDto.getNumero() + "\"," + enter;
            cadenaJSON += "            \"letra\": \"" + glosarioDto.getLetra()+ "\"," + enter;
            cadenaJSON += "            \"concepto\": \"" + glosarioDto.getConcepto() + "\"," + enter;
            cadenaJSON += "            \"descripcion\": \"" + glosarioDto.getDescripcion() + "\"" + enter;
            cadenaJSON += "        }";
            cadenaJSON += Integer.parseInt(glosarioDto.getId()) < listaGlosario.size() ? "," : "";
            cadenaJSON += enter;
        }
        cadenaJSON += "    ]" + enter;
        cadenaJSON += "}";
        return cadenaJSON;
    }

    private static void escribirArchivoJSON(String cadenaJSON) {
        try (FileWriter fichero = new FileWriter("../../insumos/glosario-terminos.json")) {
            PrintWriter pw = new PrintWriter(fichero);
            pw.println(cadenaJSON);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        ArrayList<TxtDto> listaTxt = listFiles("../../insumos/");
        ArrayList<GlosarioDto> listaGlosario = leerArchivosTXT(listaTxt);
        String cadenaJSON = crearCadenaJSON(listaGlosario);
        escribirArchivoJSON(cadenaJSON);
    }

}
