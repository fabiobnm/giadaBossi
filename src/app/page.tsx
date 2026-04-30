import HomeClient from "@/components/HomeClient";
import { hygraph } from "@/lib/hygraph";
import {
  COMMERCIALS_PAGE_QUERY,
  type CommercialsPageQueryResult,
} from "@/lib/queries/commercials";
import {
  NARRATIVES_PAGE_QUERY,
  type NarrativesPageQueryResult,
} from "@/lib/queries/narratives";

export const dynamic='force-static';
export const revalidate= 0;


async function getCommercials() {
  const data = await hygraph.request<CommercialsPageQueryResult>(
    COMMERCIALS_PAGE_QUERY
  );
  return data.commercials;
}

async function getNarratives() {
  const data = await hygraph.request<NarrativesPageQueryResult>(
    NARRATIVES_PAGE_QUERY
  );
  return data.narratives;
}

export default async function Home() {
  const commercials = await getCommercials();
    const narratives = await getNarratives();


  return <HomeClient commercials={commercials} narratives={narratives}/>;
}