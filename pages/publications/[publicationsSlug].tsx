import { GetStaticPaths } from "next";
import { createClient } from "contentful";
import BlogPost from "../../components/BlogPost/BlogPost";
import Component from "../../layout/Component/Component";
import { TypeAnalysis, TypeAnalysisFields } from "../../types";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export default function PublicationsSlug({ publications }: { publications: TypeAnalysis }) {
  if (!publications) return;

  const { post, author, publishedDate, title } = publications.fields;
  return (
    <Component>
      <BlogPost post={post} title={title} author={author} publishedDate={publishedDate} sector="Publications" />
    </Component>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await client.getEntries<TypeAnalysisFields>({
    content_type: "publications",
  });

  const paths = response.items.map((item) => {
    return {
      params: { publicationsSlug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const { items } = await client.getEntries<TypeAnalysisFields>({
    content_type: "publications",
    "fields.slug": params.publicationsSlug,
  });

  if (!items.length) {
    return {
      rediect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      publications: items[0],
    },
    revalidate: 1,
  };
};
