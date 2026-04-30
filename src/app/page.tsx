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
import {
  HOME_PAGE_QUERY,
  type HomePageQueryResult,
} from "@/lib/queries/home";


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

async function getHome() {
  const data = await hygraph.request<HomePageQueryResult>(HOME_PAGE_QUERY);
  return data.homePages[0];
}


export default async function Home() {
  const commercials = await getCommercials();
    const narratives = await getNarratives();
      const home = await getHome();
const videos = Array.isArray(home?.videoVimeo) ? home.videoVimeo : [];

const randomVideo = videos.length
  ? videos[Math.floor(Math.random() * videos.length)]
  : "";

return (
  <HomeClient
    commercials={commercials}
    narratives={narratives}
    video={randomVideo}
  />
);
}