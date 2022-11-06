import getFeed from './lib/getFeed';
import parseContentEncoded from './lib/parseContentEncoded';
import parseDescription from './lib/parseDescription';
import type { GetMediumFeedProps, PostProps } from './types';

const getMediumFeed = async ({
  username,
  url,
}: GetMediumFeedProps): Promise<PostProps[]> => {
  const feed = await getFeed(username);

  const posts: PostProps[] = feed.map((item) => {
    const { description, image, content } = item['content:encoded']
      ? parseContentEncoded(item['content:encoded'], url)
      : parseDescription(item.description);

    return {
      id: item.guid.split('/').pop() ?? item.guid,
      title: item.title,
      link: item.link,
      date: new Date(item.pubDate),
      categories: item.category,
      description,
      image,
      content,
    };
  });

  return posts;
};

export default getMediumFeed;
