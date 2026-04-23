export type About = {
  image?: {
    url: string;
  } | null;
  press?: {
    html: string | null;
  } | null;
  adv?: {
    html: string | null;
  } | null;
  bio?: {
    html: string | null;
  } | null;
};

export type AboutPageQueryResult = {
  abouts: About[];
};

export const ABOUT_PAGE_QUERY = /* GraphQL */ `
 query {
    abouts {
      image{url}
      press{html}
      adv{html}
      bio{html}
    }
  }
`;