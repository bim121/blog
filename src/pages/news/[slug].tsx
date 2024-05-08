import {useRouter} from "next/router"
import Layout from "@/../components/Layout";

export default function SingleNews() {
    const router = useRouter();
    console.log("router===>", router);
    return(
        <Layout>
            <h2>Single News</h2>
            <h3>{router.query.slug}</h3>
        </Layout>
    )
}