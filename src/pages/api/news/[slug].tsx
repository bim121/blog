import type { NextApiRequest, NextApiResponse } from "next";

const { news }: { news: NewsItem[] } = require("./data.json");

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataNews>,
) {
    const newsArticle = news.filter((item: NewsItem) => item.slug === req.query.slug)[0];

    res.status(200).json(newsArticle)
}