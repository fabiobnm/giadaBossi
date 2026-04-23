export type GalleryImage = {
  url: string;
};

export type SingleGallery = {
  __typename: "Gallery";
  images: GalleryImage[];
};

export type DoubleGallery = {
  __typename: "DoubleGallery";
  doubleImages: GalleryImage[];
};

export type Project = {
  title: string;
  slug: string;
  videoUrl?: string | null;
  width: number;
  height: number;
  mainCredits?: {
    html: string | null;
  } | null;
  fullCredits?: {
    html: string | null;
  } | null;
  gallery: (SingleGallery | DoubleGallery)[];
};

export type Narrative = {
  projects: Project[];
};

export type NarrativesPageQueryResult = {
  narratives: Narrative[];
};

export const NARRATIVES_PAGE_QUERY = /* GraphQL */ `
query {
    narratives {
      ... on Narrative {
        projects {
          title
          slug
          videoUrl
          width
          height
          mainCredits { html }
          fullCredits { html }
          gallery {
            __typename
            ... on Gallery {
              images { url }
            }
            ... on DoubleGallery {
              doubleImages { url }
            }
          }
        }
      }
    }
  }
`;



