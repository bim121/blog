// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const {news} = require("./data.json");

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataNews>,
) {
  res.status(200).json(news);
}
