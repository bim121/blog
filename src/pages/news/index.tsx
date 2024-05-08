import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Layout from '@/../components/Layout';
import { API_URL } from '@/../config/index';
import NewsItemComponent from "@/../components/NewsItem";
import styles from "../../styles/News.module.css";

interface News {
  image?: string;
  date: string;
  time: string;
  name: string;
  slug: string;
}

interface NewsProps {
  news: News[];
}

const News: React.FC<NewsProps> = ({ news }) => {
  return (
    <div>
      <Layout>
        <h1>News:</h1>
        {news.length === 0 && <h3>no news</h3>}
        {news.map((item) => (
          <NewsItemComponent key={item.name} news={item} />
        ))}
        <Link className={styles.back} href="/">
            Go Back
        </Link>
      </Layout>
    </div>
  );
};

export default News;

export const getServerSideProps: GetServerSideProps<NewsProps> = async () => {
  const res = await fetch(`${API_URL}/api/news`);
  const news: News[] = await res.json();

  return {
    props: { news },
  };
};
