import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/../components/Layout';
import { API_URL } from '@/../config/index';
import NewsItemComponent from "@/../components/NewsItem";

const HomePage: React.FC<HomePageProps> = ({ news }) => {
  return (
    <div>
      <Layout>
        <h1>Latest news:</h1>
        {news.length === 0 && <h3>no news</h3>}
        {news.map((item: any) => (
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
  const res = await fetch(`${API_URL}/api/sports?populate=*`);
  const news = await res.json();

  return {
    props: { news: news.data },
  };
};


