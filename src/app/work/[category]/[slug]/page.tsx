import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { hygraph } from "@/lib/hygraph";
import {
  COMMERCIALS_PAGE_QUERY,
  type CommercialsPageQueryResult,
  type Commercial,
} from "@/lib/queries/commercials";
import {
  NARRATIVES_PAGE_QUERY,
  type NarrativesPageQueryResult,
  type Narrative,
} from "@/lib/queries/narratives";
import Header from "@/components/Header";


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

type PageProps = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

type CommercialProject = Commercial["projects"][number];
type NarrativeProject = Narrative["projects"][number];

function getYoutubeEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtube.com")) {
      const v = parsed.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}`;
    }

    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace("/", "");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
      // VIMEO
    if (parsed.hostname.includes("vimeo.com")) {
      const id = parsed.pathname.split("/").filter(Boolean)[0];
      if (id) return `https://player.vimeo.com/video/${id}`;
    }

     if (parsed.hostname.includes("vimeo.com")) {
      const id = parsed.pathname.split("/").filter(Boolean)[0];
      if (id) return `https://player.vimeo.com/${id}`;
    }

    return url;
  } catch {
    return url;
  }
}

export default async function WorkPage({ params }: PageProps) {
  const { category, slug } = await params;

  const commercials = await getCommercials();
  const narratives = await getNarratives();

  let project: CommercialProject | NarrativeProject | null = null;

  if (category === "commercial") {
    project =
      commercials
        .flatMap((commercial) => commercial.projects || [])
        .find((item) => item.slug === slug) || null;
  }

  if (category === "narrative") {
    project =
      narratives
        .flatMap((narrative) => narrative.projects || [])
        .find((item) => item.slug === slug) || null;
  }

  if (!project) {
    notFound();
  }

  const embedUrl = project.videoUrl ? getYoutubeEmbedUrl(project.videoUrl) : null;

  return (

    <div style={{ minHeight: "100vh" }}>
              <Header commercials={commercials} narratives={narratives} />
      
      <div style={{ position:'fixed', padding:10 ,display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: 'repeat(12, 1fr)',
    width: '100vW'}}>
        <a href="/" style={{gridColumn:'1 / span 2'}}>Giada bossi</a>
        <a style={{gridColumn:'4 / span 1'}}>Works</a>
        <a href="/about" style={{gridColumn:'5 / span 1'}}>About</a>
      </div>
   <div style={{display:'none', marginTop:'40vH', gap:'50px',position:'fixed'}}>
      <div >
        <div style={{marginBottom:'30px'}}>Commercials</div>
        <div>
          {commercials?.[0]?.projects?.map((project, index) => (
            <Link
              key={index}
              href={`/work/commercial/${project.slug}`}
              style={{ display: "block", cursor: "pointer" }}
            >
              {project.title}
            </Link>
          ))}
        </div>
      </div>

      <div>
        <div style={{marginBottom:'30px'}}>Narratives</div>
        <div>
          {narratives?.[0]?.projects?.map((project, index) => (
            <Link
              key={index}
              href={`/work/narrative/${project.slug}`}
              style={{ display: "block", cursor: "pointer" }}
            >
              {project.title}
            </Link>
          ))}
        </div>
      </div>

      </div>

      <main className="opacityAnimLong"
        style={{
          padding: "10px",
          paddingTop: "0px",
          width: "50%",
          position: "relative",
          marginLeft: '50%',
          top: 0,
          
        }}
      >

        <div>

        {embedUrl && (
            
              <iframe
                src={embedUrl}
                title={project.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: "relative",
                  inset: 0,
                  aspectRatio: `${project.width} / ${project.height}`,
                  border: 0,
                  marginBottom:'10px',
                  marginTop:'10px'
                }}
              />
        )}


          {project.gallery?.map((item, index) => {
            if (item.__typename === "Gallery") {
              return (
                <div key={index} style={{ marginBottom: "20px" }}>
                  {item.images.map((img, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={img.url}
                      alt=""
                      style={{
                        width: "100%",
                        display: "block",
                        marginBottom: "10px",
                      }}
                    />
                  ))}
                </div>
              );
            }

            if (item.__typename === "DoubleGallery") {
              return (
                <div
                  key={index}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px",
                    marginBottom: "20px",
                  }}
                >
                  {item.doubleImages.map((img, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={img.url}
                      alt=""
                      style={{
                        width: "100%",
                        display: "block",
                      }}
                    />
                  ))}
                </div>
              );
            }

            return null;
          })}

         <div style={{ display:'flex', gap:'40px'}}>
          {project.mainCredits?.html && (
            <div
              style={{ marginBottom: "20px", width:'50%' }}
              dangerouslySetInnerHTML={{ __html: project.mainCredits.html }}
            />
          )}

          {project.fullCredits?.html && (
            <div
              style={{ marginBottom: "40px", width:'50%' }}
              dangerouslySetInnerHTML={{ __html: project.fullCredits.html }}
            />
          )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}