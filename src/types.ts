/* eslint-disable @typescript-eslint/naming-convention */

export type MediumRSSProps = {
  '?xml': '';
  rss: {
    channel: {
      title: string;
      description: string;
      link: string;
      image: object[];
      generator: string;
      lastBuildDate: string;
      'atom:link': unknown[];
      webMaster: string;
      item: MediumPostProps[];
    };
  };
};

export type MediumPostProps = {
  title: string;
  link: string;
  guid: string;
  category: string[];
  'dc:creator': string;
  pubDate: string;
  'atom:updated': string;

  /* Format 1 */
  description: string;

  /* Format 2 */
  'content:encoded': string;
};

export type PostProps = {
  id: MediumPostProps['guid'];
  title: MediumPostProps['title'];
  description: string | undefined;
  image: string | undefined;
  link: MediumPostProps['link'];
  date: Date;
  categories: MediumPostProps['category'];
};

export type GetMediumFeedProps = {
  username: string;
  url?: string;
};
