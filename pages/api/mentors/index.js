import { getSession } from "next-auth/react";
import { getXataHeaders, DB_PATH } from "../../../services";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    res.status(403).json({
      error: "You must be signed in to access this API.",
    });
    return;
  }

  const resp = await fetch(`${DB_PATH}/tables/users/query`, {
    method: "POST",
    headers: {
      ...(await getXataHeaders()),
    },
    body: JSON.stringify({
      filter: {
        roles: {
          $includesAny: "mentor",
        },
      },
    }),
  });
  res.status(resp.status).json(await resp.json());
}
