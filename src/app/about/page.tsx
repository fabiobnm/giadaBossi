import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
  ABOUT_PAGE_QUERY,
  type AboutPageQueryResult,
} from "@/lib/queries/about";


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

async function getAbout() {
 const data = await hygraph.request<AboutPageQueryResult>(ABOUT_PAGE_QUERY);

return data.abouts[0];
}

export default async function Home() {
  const commercials = await getCommercials();
  const narratives = await getNarratives();
  const about = await getAbout();

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <main className="">
        <Header commercials={commercials} narratives={narratives} />
        <div
          style={{

            top: 0,
            left: 0,
            display: "flex",
          }}
        >
          <div style={{width:'40vW', marginLeft:'10px', marginTop:'100px'}}>
            <div style={{marginBottom:'50px', marginTop:'30px'}} dangerouslySetInnerHTML={{ __html: about?.bio?.html ?? "Nessun contenuto AboutUs trovato." }}/>
            ADV
            <div style={{marginBottom:'50px', marginTop:'30px'}} dangerouslySetInnerHTML={{ __html: about?.adv?.html ?? "Nessun contenuto AboutUs trovato." }}/>
            PRESS
            <div style={{marginBottom:'150px', marginTop:'30px'}} dangerouslySetInnerHTML={{ __html: about?.press?.html ?? "Nessun contenuto AboutUs trovato." }}/>
          </div>
          <img
            src={about?.image?.url || ""}
            style={{
              height: "100vH",
              position: "fixed",
              right: '0px',
              top:'0px',
              padding:'10px'
            
            }}
            alt=""
          />
        </div>
        <Footer />
      </main>
      
    </div>
  );
}