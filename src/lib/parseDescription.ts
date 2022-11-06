/* eslint-disable prefer-named-capture-group */

/*
 * <div class="medium-feed-item">
 *   <p class="medium-feed-image">
 *     <a href="https://medium.com/...">
 *       <img src="https://cdn-images-1.medium.com/max/768/..." width="768">
 *     </a>
 *   </p>
 *   <p class="medium-feed-snippet">{description}</p>
 *   <p class="medium-feed-link">
 *     <a href="https://medium.com/...">Continue reading on ... »</a>
 *   </p>
 * </div>
 */

const parseDescription = (
  html: string
): {
  description: string | undefined;
  image: string | undefined;
  content: undefined;
} => {
  const imageSrcRegex = /src="([^"]+)"/u;
  const descriptionRegex = /<p class="medium-feed-snippet">([^<]+)<\/p>/u;

  return {
    description: descriptionRegex.exec(html)?.[1],
    image: imageSrcRegex.exec(html)?.[1],
    content: undefined,
  };
};

export default parseDescription;
