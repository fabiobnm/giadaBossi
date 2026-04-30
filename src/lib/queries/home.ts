export type HomePage = {
  videoVimeo?: string[] | null;
};

export type HomePageQueryResult = {
  homePages: HomePage[];
};

export const HOME_PAGE_QUERY = /* GraphQL */ `
  query {
    homePages{
      videoVimeo
    }
  }
`;










