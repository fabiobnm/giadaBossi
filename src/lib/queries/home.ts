export type HomePage = {
  videoVimeo?: string[] | null;
  instagramAccount?: string | null;
  vimeoChannel?: string | null;
};

export type HomePageQueryResult = {
  homePages: HomePage[];
};

export const HOME_PAGE_QUERY = /* GraphQL */ `
query {
    homePages{
      videoVimeo
      instagramAccount
      vimeoChannel
    }
  }
`;










