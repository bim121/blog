import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Layout from '@/../components/Layout';
import { API_URL } from '@/../config/index';
import NewsItemComponent from "@/../components/NewsItem";
import styles from "../../styles/News.module.css";

const News: React.FC<NewsProps> = ({ news }) => {
  return (
    <div>
      <Layout>
        <h1>News:</h1>
        {news.length === 0 && <h3>no news</h3>}
        {news.map((item: any) => (
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
  const res = await fetch(`${API_URL}/api/sports?populate=*`);
  const news = await res.json();

  return {
    props: { news: news.data },
  };
};
