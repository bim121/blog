// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const {news} = require("./data.json");

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataNews | {message: string}>,
) {
  if(req.method === "GET"){
    res.status(200).json(news);
  }else{
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({message: `Method ${req.method} is not allowed`})
  }
}
