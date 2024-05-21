interface NewsItem {
    id: string;
    name: string;
    slug: string;
    date: string;
    time: string;
    detail: string;
    image: string;
}

interface News {
    image?: string;
    date: string;
    time: string;
    name: string;
    slug: string;
}

interface NewsProps {
    news: DataResponse[];
}

interface SingleNewsPageProps {
    news: DataResponse;
}

interface HomePageProps {
    news: DataResponse[];
}
