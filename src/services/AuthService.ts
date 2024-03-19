import { post } from "./apiService";

export class AuthService {
  public static async login(data: any) {
    return await post("login", data);
  }

  public static async inapGralAll(data: any) {
    return await post("inapGralAll", data);
  }

  public static async inapGral01All(data: any) {
    return await post("inapGral01All", data);
  }

  public static async getFile(data: any) {
    return await post("getFile", data);
  }

  public static async migrafile(data: any) {
    return await post("migrafile", data);
  }

  public static async PPI(data: any) {
    return await post("PPI", data);
  }

  public static async MPD(data: any) {
    return await post("MPD", data);
  }

  public static async AUDITORIA(data: any) {
    return await post("AUDITORIA", data);
  }

  public static async PF(data: any) {
    return await post("PF", data);
  }

  public static async siregob(data: any) {
    return await post("siregob", data);
  }

  public static async getListFiles(data: any) {
    return await post("getListFiles", data);
  }

  public static async deletedFile(data: any) {
    return await post("deletedFile", data);
  }

  public static async deletedFolder(data: any) {
    return await post("deletedFolder", data);
  }

  public static async busquedaGeneral(data: any) {
    return await post("busquedaGeneral", data);
  }

  public static async getFileBusqueda(data: any) {
    return await post("getFileBusqueda", data);
  }

  public static async presupuesto(data: any) {
    return await post("presupuesto", data);
  }
}
