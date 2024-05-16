import {useRouter} from "next/router"
import Layout from "@/../components/Layout";
import { API_URL } from "@/config/index";
import styles from '../../styles/News.module.css';
import Image from "next/image";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { converToImageUrl } from "@/shared/helpers";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import Modal from "@/components/Modal";

export default function SingleNews({news}: SingleNewsPageProps) {
    const router = useRouter();
    const data = news.attributes;
    const imageUrl = data.image.data? converToImageUrl(data.image.data.attributes.url): "";

    const deleteNews = async(e: any) =>{
        if(window.confirm("Are you sure you want to delete news?")){
            const res = await fetch(`${API_URL}/api/sports/${news.id}`, {
                method: "DELETE"
            });

            const data = await res.json();

            if(!res.ok){
                toast.error(data.message)
            }
            else{
                router.push("/news");
            }
        }
    }

    return(
        <Layout>
            <div className={styles.news}>
                <div className={styles.controls}>
                    <Link href={`/news/edit/${news.id}`}>
                        <button className="btn-edit">Edit News</button>
                    </Link>
                    <button className="btn-delete" onClick={deleteNews}>Delete News</button>
                </div>
                <span>
                    {moment(data.date).format("yyyy-MM-DD")} {data.time}
                </span>
            </div>

            <h1>{data.name}</h1>
            <ToastContainer/>
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