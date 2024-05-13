import {useRouter} from "next/router"
import Layout from "@/../components/Layout";
import { API_URL } from "@/config/index";
import styles from '../../styles/News.module.css';
import Image from "next/image";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { converToImageUrl } from "@/shared/helpers";


export default function SingleNews({news}: SingleNewsPageProps) {
    const router = useRouter();
    const data = news.attributes;
    const imageUrl = data.image.data? converToImageUrl(data.image.data.attributes.url): "";
    return(
        <Layout>
            <div className={styles.news}>
                <span>{data.date} {data.time}</span>
            </div>
            <h1>{data.name}</h1>
            {data.image.data && (
                <div className={styles.image}>
                    <Image  src={imageUrl || "/NoImage.jpg"} width={900} height={600} alt="#"/>
                </div>
            )}
            <p>{data.detail}</p>
            <Link href="/news">
                <p className={styles.back}>Go back</p>
            </Link>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps<SingleNewsPageProps> = async ({query: {slug}}) => {
    const res = await fetch(`${API_URL}/api/sports/${slug}?populate=*`);
    const singleNews = await res.json();

    return {
        props: {
            news: singleNews.data,
        }
    }
}