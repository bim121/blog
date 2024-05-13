import Link from "next/link";
import Image from "next/image";
import styles from "../src/styles/NewsItem.module.css";
import moment from "moment";
import { converToImageUrl } from "@/shared/helpers";

interface NewsItemProps {
  news: {
    id: string;
    attributes: any;
  };
}

const NewsItem: React.FC<NewsItemProps> = ({ news }) => {
  const { image, date, time, name, slug } = news.attributes;
  const imageUrl = image.data? converToImageUrl(image.data.attributes.url): "";

  return (
    <div className={styles.news}>
      <div className={styles.img}>
        <Image
          src={imageUrl || "/NoImage.jpg"}
          alt="News Image"
          width={150}
          height={100}
        />
      </div>
      <div className={styles.info}>
        <span>
          {moment(date).format('yyyy-MM-DD')} {time}
        </span>
        <h3>{name}</h3>
      </div>
      <div className={styles.link}>
        <Link className="btn" href={`/news/${news.id}`}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default NewsItem;
