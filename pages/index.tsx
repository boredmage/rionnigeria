import Link from "next/link";
import Navbar from "../components/Navbar/Navbar";
import Slider from "../components/Slider/Slider";
import GridLayout from "../components/GridLayout/GridLayout";
import styles from "./../styles/Index.module.scss";
import { CardType } from "../types";
import PageSeo from "../layout/PageSeo";
import { createClient } from "contentful";
import moment from "moment";
import { Block, Inline } from "@contentful/rich-text-types";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";

interface iEntriesByType {
  [key: string]: {
    fields: {
      title: string;
      slug: string;
      publishedDate: string;
      post: Block | Inline;
      summary: string;
      image: {
        fields: {
          file: {
            url: string;
          };
        };
      };
      thumbnail: {
        fields: {
          file: {
            url: string;
          };
        };
      };
    };
  }[];
}

export default function Home({ entriesByType }: { entriesByType: iEntriesByType }) {
  return (
    <PageSeo title="WELCOME" description="RION Nigeria">
      <div className={styles.Home}>
        <div>
          <Navbar type={"solid"} />
          <Slider />
        </div>
        <div className={styles.HomeContent}>
          <div className={styles.HomeContentSector}>
            <h2 className={styles.HomeContentSectorTitle}>Posers</h2>
            <GridLayout lgGrid={4} mdGrid={1}>
              {entriesByType["poser"].slice(0, 4).map((entry) => {
                return (
                  <Card
                    key={entry.fields.slug}
                    imageUrl={"https:" + entry.fields.thumbnail.fields.file.url}
                    title={entry.fields.title}
                    date={moment(entry.fields.publishedDate).format("MMM DD, YYYY, HH:mm")}
                    contentURL={"/posers/" + entry.fields.slug}
                  />
                );
              })}
            </GridLayout>
          </div>
          <div className={styles.HomeContentSector}>
            <h2 className={styles.HomeContentSectorTitle}>Travails of Reverts</h2>
            <div className={styles.FlexImageColumn}>
              <div className={styles.FlexImageColumnMain}>
                <Card
                  imageUrl={"https:" + entriesByType["travailsOfRevertes"][0].fields.thumbnail.fields.file.url}
                  title={entriesByType["travailsOfRevertes"][0].fields.title}
                  date={moment(entriesByType["travailsOfRevertes"][0].fields.publishedDate).format(
                    "MMM DD, YYYY, HH:mm",
                  )}
                  summary={
                    documentToPlainTextString(entriesByType["travailsOfRevertes"][0].fields.post).slice(0, 500) + "..."
                  }
                  contentURL={"/travails/" + entriesByType["travailsOfRevertes"][0].fields.slug}
                  type="flex-right"
                />
              </div>
              <div className={styles.FlexImageColumnSection}>
                {entriesByType["travailsOfRevertes"].slice(1, 4).map((entry) => {
                  return (
                    <Card
                      key={entry.fields.slug}
                      type="flex-left-sm"
                      className={styles.rCard}
                      title={entry.fields.title}
                      imageUrl={"https:" + entry.fields.thumbnail.fields.file.url}
                      date={moment(entry.fields.publishedDate).format("MMM DD, YYYY, HH:mm")}
                      contentURL={"/travails/" + entry.fields.slug}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div className={styles.HomeContentSector}>
            <h2 className={styles.HomeContentSectorTitle}>Analysis</h2>
            <div className={styles.GridFiveLayer}>
              <div className={styles.GridFiveLayerMain}>
                <Card
                  imageUrl={"https:" + entriesByType["analysis"][0].fields.thumbnail.fields.file.url}
                  title={entriesByType["analysis"][0].fields.title}
                  date={moment(entriesByType["analysis"][0].fields.publishedDate).format("MMM DD, YYYY, HH:mm")}
                  summary={documentToPlainTextString(entriesByType["analysis"][0].fields.post).slice(0, 500) + "..."}
                  contentURL={"/analysis/" + entriesByType["analysis"][0].fields.slug}
                />
              </div>
              <div className={styles.GridFiveLayerSection}>
                {entriesByType["analysis"].slice(1, 5).map((entry) => {
                  return (
                    <Card
                      key={entry.fields.slug}
                      title={entry.fields.title}
                      imageUrl={"https:" + entry.fields.thumbnail.fields.file.url}
                      date={moment(entry.fields.publishedDate).format("MMM DD, YYYY, HH:mm")}
                      contentURL={"/analysis/" + entry.fields.slug}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div className={styles.Ad}>
            <h2>Get better result with the just one click</h2>
            <button>Start now</button>
          </div>

          <div className={styles.HomeContentSector}>
            <h2 className={styles.HomeContentSectorTitle}>Rebutals</h2>
            <div className={styles.FlexLeftNoImgCard}>
              <div className={styles.FlexLeftNoImgCardMain}>
                <Card
                  imageUrl={"https:" + entriesByType["rebuttal"][0].fields.thumbnail.fields.file.url}
                  title={entriesByType["rebuttal"][0].fields.title}
                  date={moment(entriesByType["rebuttal"][0].fields.publishedDate).format("MMM DD, YYYY, HH:mm")}
                  summary={documentToPlainTextString(entriesByType["rebuttal"][0].fields.post).slice(0, 500) + "..."}
                  contentURL={"/rebuttals/" + entriesByType["rebuttal"][0].fields.slug}
                  type="flex-left"
                />
              </div>
              <div className={styles.FlexLeftNoImgCardExtra}>
                {entriesByType["rebuttal"].slice(1, 5).map((entry) => {
                  return (
                    <Card
                      key={entry.fields.slug}
                      className={styles.rCard}
                      title={entry.fields.title}
                      date={moment(entry.fields.publishedDate).format("MMM DD, YYYY, HH:mm")}
                      contentURL={"/rebuttals/" + entry.fields.slug}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div className={styles.HomeContentSector}>
            <h2 className={styles.HomeContentSectorTitle}>Questions & Answers</h2>
            <div className={styles.QnASector}>
              <div className={styles.QnASectorMain}>
                {entriesByType["questionAnswers"].slice(0, 4).map((entry) => {
                  return (
                    <Card
                      key={entry.fields.slug}
                      imageUrl={"https:" + entry.fields.thumbnail.fields.file.url}
                      title={entry.fields.title}
                      className={styles.CardAbsolute}
                      date={moment(entry.fields.publishedDate).format("MMM DD, YYYY, HH:mm")}
                      contentURL={"/q-&-a/" + entry.fields.slug}
                    />
                  );
                })}
              </div>
              {/* TODO: Fix this part later when the news page is properly updated */}
              {/* <div className={styles.QnASectorSection}>
                <h2>Other News</h2>
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
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </PageSeo>
  );
}

export function Card({ imageUrl, title, date, summary, type, className, contentURL = "/" }: CardType) {
  return (
    <Link href={contentURL}>
      <div
        className={[
          styles.Card,
          type === "flex-left" && styles.CardFlexLeft,
          type === "flex-right" && styles.CardFlexRight,
          type === "flex-left-sm" && styles.CardFlexLeftSm,
          className,
        ].join(" ")}
      >
        {imageUrl && <img src={imageUrl} alt="title" />}
        <div>
          <span className={styles.CardDate}>
            <span>Published on</span> {date}
          </span>
          <h2>{title}</h2>
          {summary && <p>{summary}</p>}
        </div>
      </div>
    </Link>
  );
}

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const response = await client.getEntries();

  const entriesByType = {};

  // Organize entries by content type
  response.items.forEach((entry) => {
    const contentType = entry.sys.contentType.sys.id;

    if (!entriesByType[contentType]) {
      entriesByType[contentType] = [];
    }

    entriesByType[contentType].push(entry);
  });

  return {
    props: {
      entriesByType,
    },
    revalidate: 1,
  };
}
