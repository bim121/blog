import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/../components/Layout';
import { API_URL } from '@/../config/index';
import NewsItemComponent from "@/../components/NewsItem";

interface News {
  image?: string;
  date: string;
  time: string;
  name: string;
  slug: string;
}

interface HomePageProps {
  news: News[];
}

const HomePage: React.FC<HomePageProps> = ({ news }) => {
  return (
    <div>
      <Layout>
        <h1>Latest news:</h1>
        {news.length === 0 && <h3>no news</h3>}
        {news.map((item) => (
          <NewsItemComponent key={item.name} news={item} />
        ))}
        {news.length > 0 && (
          <Link className="btn-secondary" href="/news">
            View All News
          </Link>
        )}
      </Layout>
    </div>
  );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps<HomePageProps> = async () => {
  const res = await fetch(`${API_URL}/api/news`);
  const news: News[] = await res.json();

  return {
    props: { news: news.slice(0, 5) },
  };
};


