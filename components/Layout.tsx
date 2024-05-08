import Head from "next/head";
import styles from "@/styles/Layout.module.css";
import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/router";
import Hero from "./Hero";

interface LayoutProps {
  title?: string;
  keywords?: string;
  description?: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, keywords, description, children }) => {
    const router = useRouter();
    return (
    <div>
      <Head>
        <title>{title || "Sport News | Find Latest Sport News"}</title>
        <meta name="description" content={description || "A website that brings you latest news about sports"} />
        <meta name="keywords" content={keywords || "cricket, football, f1, tennis, badminton, golf"} />
      </Head>
      <Header/>
      {router.pathname === "/" && <Hero />}
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;

