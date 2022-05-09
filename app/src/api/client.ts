import { http } from "@tauri-apps/api";
import { IResponse } from "../types/types";

type HttpMethods = "GET" | "POST";

type HttpRoutes = "auth" | "feed" | "posts" | "user" | "developer";

interface RestRequestOptions {
  method: HttpMethods;
  route: HttpRoutes;
  action: string;
  data?: FormData | {};
  query?: string;
  type?: "Json" | "Form" | "Text" | "Bytes";
}

const baseUrl = "http://localhost:4000/api";
const clientURL = "http://localhost:3001";

export async function makeRequest<T>({
  method,
  route,
  action,
  data,
  query,
  type = "Json",
}: RestRequestOptions) {
  try {
    action = action ? `/${action}` : "";
    query = query === undefined ? "" : `/?type=${query}`;
    console.log(JSON.stringify(data));
    let res;
    if (type === "Json" || type === undefined) {
      res = await http.fetch<T>(`${baseUrl}/${route}${action}${query}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": `${clientURL}`,
        },
        body: http.Body.json(data as {}),
        //   credentials: "include",
      });
    } else if (type === "Form") {
      res = await http.fetch<T>(`${baseUrl}/${route}${action}${query}`, {
        method,
        headers: {
          "Access-Control-Allow-Origin": `${clientURL}`,
        },
        body: { payload: data as FormData, type },
        //   credentials: "include",
      });
    }

    console.log(res);
    if (!res) {
      throw new Error("No response from server");
    }
    //   if (isFile) {
    //     resBody = await res.blob();
    //   } else {
    //     resBody = await res.json();
    //   }
    if (!res.data) {
      throw new Error("No data in response");
    }
    if (!res.ok) {
      throw new Error((res.data as unknown as IResponse).message);
    }
    return res.data;
  } catch (error) {
    console.error("we got an error!");
    console.log(error);
    throw new Error(error as any);
  }
}
