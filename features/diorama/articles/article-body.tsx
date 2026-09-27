import { asLink, isFilled } from '@prismicio/client';
import { PrismicRichText, type RichTextComponents } from '@prismicio/react';
import type { ArticleSlice } from './model';
import { resolveArticleLink } from './routes';

export function ArticleBody({
  body,
  knownUids,
}: {
  body: ArticleSlice[];
  knownUids: string[];
}): JSX.Element {
  const components: RichTextComponents = {
    hyperlink: ({ node, children }) => {
      const original = asLink(node.data) || '';
      const href = resolveArticleLink(original, knownUids);
      const target = 'target' in node.data ? node.data.target : undefined;
      return (
        <a
          href={href}
          target={href === original ? target : undefined}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      );
    },
    preformatted: ({ node }) => (
      <pre tabIndex={0} aria-label="Code example">
        <code>{node.text}</code>
      </pre>
    ),
  };
  const captionComponents: RichTextComponents = {
    ...components,
    heading1: ({ children }) => <span>{children}</span>,
    heading2: ({ children }) => <span>{children}</span>,
    heading3: ({ children }) => <span>{children}</span>,
    heading4: ({ children }) => <span>{children}</span>,
    heading5: ({ children }) => <span>{children}</span>,
    heading6: ({ children }) => <span>{children}</span>,
  };
  return (
    <div className="article-prose">
      {body.map(slice => {
        switch (slice.slice_type) {
          case 'text':
            return (
              <PrismicRichText
                key={slice.id}
                field={slice.primary.text}
                components={components}
              />
            );
          case 'quote':
            return (
              <blockquote key={slice.id}>
                <PrismicRichText
                  field={slice.primary.quote}
                  components={components}
                />
              </blockquote>
            );
          case 'image_with_caption': {
            const { image, caption } = slice.primary;
            return (
              <figure key={slice.id}>
                {isFilled.image(image) && (
                  <img
                    src={image.url}
                    alt={image.alt || ''}
                    width={image.dimensions.width}
                    height={image.dimensions.height}
                    loading="lazy"
                    decoding="async"
                  />
                )}
                {isFilled.richText(caption) && (
                  <figcaption>
                    <PrismicRichText
                      field={caption}
                      components={captionComponents}
                    />
                  </figcaption>
                )}
              </figure>
            );
          }
        }
      })}
    </div>
  );
}
