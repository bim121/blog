import {useRouter} from "next/router"
import Layout from "@/../components/Layout";
import { API_URL } from "@/config/index";
import styles from '../../styles/News.module.css';
import Image from "next/image";
import Link from "next/link";
import { GetServerSideProps } from "next";

export default function SingleNews({news}: SingleNewsPageProps) {
    const router = useRouter();
    console.log("router===>", router);
    return(
        <Layout>
            <div className={styles.news}>
                <span>{news.date} {news.time}</span>
            </div>
            <h1>{news.name}</h1>
            {news.image && (
                <div className={styles.image}>
                    <Image src={news.image} width={900} height={600} alt="#"/>
                </div>
            )}
            <p>{news.detail}</p>
            <Link href="/news">
                <p className={styles.back}>Go back</p>
            </Link>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps<SingleNewsPageProps> = async ({query: {slug}}) => {
    const res = await fetch(`${API_URL}/api/news/${slug}`);
    const singleNews = await res.json();

    return {
        props: {
            news: singleNews,
        }
    }
}