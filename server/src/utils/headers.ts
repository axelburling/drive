import { Request } from "express";

const getHeaders = (
  req: Request
): { clientid: string; clientsecret: string } => {
  const { clientid, clientsecret } = req.headers;
  console.log(clientid, clientsecret);
  if (
    !clientid ||
    !clientsecret ||
    typeof clientid !== "string" ||
    typeof clientsecret !== "string"
  ) {
    return { clientid: "", clientsecret: "" };
  }

  return { clientid, clientsecret };
};

export { getHeaders };
