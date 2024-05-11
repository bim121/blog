import Layout from "@/components/Layout";
import Link from "next/link";
import { useState } from "react";
import styles from "../../styles/Form.module.css";

export default function AddNews(){
    const [values, setValues] = useState({
        name: "",
        detail: "",
        date: "",
        time: "",
    });

    return(
        <Layout title="Add News Sport News">
            <Link href="/news">GO Back</Link>
            <h2>Add Sport News</h2>
            <form className={styles.form}>
                <div className={styles.grid}>
                    
                </div>
            </form>
        </Layout>
    )
}