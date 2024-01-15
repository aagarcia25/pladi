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
}
