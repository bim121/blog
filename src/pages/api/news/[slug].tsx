import type { NextApiRequest, NextApiResponse } from "next";

const { news }: { news: NewsItem[] } = require("./data.json");

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataNews | {message: string}>,
) {
    const newsArticle = news.filter((item: NewsItem) => item.slug === req.query.slug)[0];
    if(req.method === "GET"){
      res.status(200).json(newsArticle);
    }else{
      res.setHeader("Allow", ["GET"]);
      res.status(405).json({message: `Method ${req.method} is not allowed`})
    }
}