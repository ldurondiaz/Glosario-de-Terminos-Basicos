import { SitioWeb } from "./sitioweb";
export class Glosario {
  id!: string;
  numero!: number;
  letra!: string;
  concepto!: string;
  descripcion!: string;
  fuente!: string;
  sitiosweb!: string;
  listaSitiosWeb: SitioWeb[] = [];
}
