import fetch from 'cross-fetch';
import { XMLParser } from 'fast-xml-parser';
import type { MediumPostProps, MediumRSSProps } from '../types';

const getFeed = async (username: string): Promise<MediumPostProps[]> => {
  const response = await fetch(`https://medium.com/feed/@${username}`, {
    headers: {
      'User-Agent': 'rss-parser',
      Accept: 'application/rss+xml',
    },
  });

  const data = await response.text();
  const parser = new XMLParser();
  const feed = parser.parse(data) as MediumRSSProps;

  return feed.rss.channel.item;
};

export default getFeed;
