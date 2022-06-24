type HttpMethods = "GET" | "POST";

type HttpRoutes = "auth" | "feed" | "posts" | "users" | "developer" | "cli";
interface RestRequestOptions {
  method: HttpMethods;
  route: HttpRoutes;
  data?: FormData | {};
  action?: string;
  query?: string;
  type?: "json" | "formData";
}

export class Client {
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
      const head: Record<string, string> = {}
      head["Access-Control-Allow-Origin"] = process.env.NEXT_PUBLIC_FRONTEND_URL as string
      let res;
      if (type === "json") {
        head['Content-Type'] = "application/json"
        res = await fetch(`${this.baseUrl}/${route}${action}${query}`, {
          method,
          headers: head,
          credentials: "include",
          body: JSON.stringify(data),
        });
      } else if (type === "formData") {
        res = await fetch(`${this.baseUrl}/${route}${action}${query}`, {
          method,
          headers: head,
          credentials: "include",
          body: data as FormData,
        });
      }
      if (!res) {
        throw new Error("No response from server");
      }
      const resBody = await res.json();
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
