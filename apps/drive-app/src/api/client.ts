import { Body, fetch } from "@tauri-apps/api/http";

type HttpMethods = "GET" | "POST";

type HttpRoutes = "auth" | "feed" | "posts" | "user" | "developer" | "cli";
interface RestRequestOptions {
  method: HttpMethods;
  route: HttpRoutes;
  data?: FormData | {};
  action?: string;
  query?: string;
  type?: "json" | "formData";
}

export class Client {
  private readonly basedUrl = "http://localhost:3000";
  private readonly baseUrl: string = " http://localhost:4000/api";

  public async makeRequest<T>({
    method,
    route,
    data,
    action,
    query,
    type = "json",
  }: RestRequestOptions): Promise<T> {
    try {
      action = action ? `/${action}` : "";
      query = query === undefined ? "" : `/?type=${query}`;
      console.log(data);
      let res;
      if (type === "json") {
        res = await fetch<T>(`${this.baseUrl}/${route}${action}${query}`, {
          method,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": `${this.basedUrl}`,
          },
          body: JSON.stringify(data) as unknown as Body,
          // credentials: "include",
        });
      } else if (type === "formData") {
        res = await fetch<T>(`${this.baseUrl}/${route}${action}${query}`, {
          method,
          headers: {
            "Access-Control-Allow-Origin": `${this.basedUrl}`,
          },
          body: data as Body,
          // credentials: "include",
        });
      }
      if (!res) {
        throw new Error("No response from server");
      }

      const resBody = await res.data;
      if (!resBody) {
        throw new Error("No data in response");
      }
      if (!res.ok) {
        throw new Error(resBody);
      }
      return resBody;
    } catch (error) {
      console.error("we got an error!");
      console.log(error);
      throw new Error();
    }
  }
}
