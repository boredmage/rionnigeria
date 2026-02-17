import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import moment from "moment";
import { HiChevronLeft } from "react-icons/hi";
import { IoLogoFacebook } from "react-icons/io5";
import { AiFillTwitterCircle } from "react-icons/ai";
import styles from "./BlogPost.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import { Card } from "../../pages";
import GridLayout from "../GridLayout/GridLayout";
import { useEffect, useState } from "react";
import HeadSeo from "../HeadSeo/HeadSeo";
import siteMetadata from "../../data/siteMetadata";

export default function BlogPost({ post, author, publishedDate, title, sector }) {
  const router = useRouter();
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  return (
    <>
      <HeadSeo title={`${siteMetadata.companyName} | ${title}`} ogType={"article"}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{"@context": "https://schema.org",
              "@type": "NewsArticle",
              "headline": "${title}",
              "datePublished": "${publishedDate}",
              "author": [{
                "@type": "Person",
                "name": "${author}"
              }]
            }`,
          }}
        ></script>
      </HeadSeo>
      <div className={styles.BlogPost}>
        <div className={styles.BlogPostNav}>
          <Link href={"/" + router.pathname.split("/")[1]}>
            <div>
              <span>
                <HiChevronLeft size={25} />
              </span>
              <span>Back</span>
            </div>
          </Link>
          {/* <div>
            <span>{sector}</span>
          </div> */}
        </div>
        <div className={styles.BlogPostHeader}>
          <h2>{title.toLowerCase()}</h2>
          <div className={styles.BlogPostHeaderShare}>
            <div className={styles.BlogPostHeaderShareInfo}>
              <h5>By {author.toLowerCase()}</h5>
              <span className={styles.BlogPostHeaderDate}>{moment(publishedDate).format("MMM DD, YYYY, HH:mm")}</span>
            </div>
            <div className={styles.BlogPostHeaderSocialShare}>
              <span>Share via: </span>
              <span>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${origin + router.asPath}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  <IoLogoFacebook fill="#1877F2" size={35} />
                </a>
              </span>
              <span>
                <a
                  href={`http://twitter.com/share?text=${title}&url=${origin + router.asPath}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  <AiFillTwitterCircle fill="#1B9DF0" size={35} />
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className={styles.FlexImageColumn}>
          <div className={styles.FlexImageColumnMain}>{documentToReactComponents(post)}</div>
          {/* <div className={styles.FlexImageColumnSection}>
            <h2 className={styles.FlexImageColumnSectionTitle}>Recent News</h2>
            <Card
              type="flex-left-sm"
              imageUrl="/images/dubai-skyline.webp"
              title="10 Places you can visit after your hajj"
              date="Mon, 15th Aug."
              className={styles.rCard}
            />
            <Card
              type="flex-left-sm"
              imageUrl="/images/dubai-skyline.webp"
              title="10 Places you can visit after your hajj"
              date="Mon, 15th Aug."
              className={styles.rCard}
            />
            <h2 className={styles.FlexImageColumnSectionTitle}>More News</h2>
            <div className={styles.FlexLeftNoImgCardExtra}>
              <Card className={styles.rCard} title="10 Places you can visit after your hajj" date="Mon, 15th Aug." />
              <Card className={styles.rCard} title="10 Places you can visit after your hajj" date="Mon, 15th Aug." />
              <Card className={styles.rCard} title="10 Places you can visit after your hajj" date="Mon, 15th Aug." />
              <Card className={styles.rCard} title="10 Places you can visit after your hajj" date="Mon, 15th Aug." />
            </div>
          </div> */}
        </div>
        {/* <div className={styles.BlogPostExtra}>
          <h2 className={styles.BlogPostExtraTitle}>More {sector}</h2>
          <GridLayout lgGrid={4}>
            <Card
              imageUrl="/images/dubai-skyline.webp"
              title="10 Places you can visit after your hajj"
              date="Mon, 15th Aug."
            />
            <Card
              imageUrl="/images/dubai-skyline.webp"
              title="10 Places you can visit after your hajj"
              date="Mon, 15th Aug."
            />
            <Card
              imageUrl="/images/dubai-skyline.webp"
              title="10 Places you can visit after your hajj"
              date="Mon, 15th Aug."
            />
            <Card
              imageUrl="/images/dubai-skyline.webp"
              title="10 Places you can visit after your hajj"
              date="Mon, 15th Aug."
            />
          </GridLayout>
        </div> */}
      </div>
    </>
  );
}
