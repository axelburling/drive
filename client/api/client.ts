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
      console.log(process.env);
      action = action ? `/${action}` : "";
      query = query === undefined ? "" : `/?type=${query}`;
      console.log(data);
      let res;
      if (type === "json") {
        res = await fetch(`${this.baseUrl}/${route}${action}${query}`, {
          method,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": `${process.env.NEXT_PUBLIC_FRONTEND_URL}`,
          },
          body: JSON.stringify(data),
          credentials: "include",
        });
      } else if (type === "formData") {
        res = await fetch(`${this.baseUrl}/${route}${action}${query}`, {
          method,
          headers: {
            "Access-Control-Allow-Origin": `${process.env.NEXT_PUBLIC_FRONTEND_URL}`,
          },
          body: data as FormData,
          credentials: "include",
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
