import type { CSSProperties } from 'react';
import { ArticleBody } from './article-body';
import { coverTransition, getArticleCover } from './covers';
import { articleHref } from '../lib/routes';
import type { Article } from './model';
import { worldRoutes } from '../lib/routes';
import './styles.css';

const categoryNames: Record<string, string> = {
  amputee: 'Chronicles of an Amputee',
  work: 'Work & life',
  tech: 'Code',
};

export function ArticlePage({
  article,
  articles,
}: {
  article: Article;
  articles: Article[];
}): JSX.Element {
  const cover = getArticleCover(article.uid);
  const siblings = articles.filter(item => item.category === article.category);
  const index = siblings.findIndex(item => item.uid === article.uid);
  const previous = siblings[index - 1];
  const next = siblings[index + 1];
  const related = articles
    .filter(item => item.uid !== article.uid)
    .slice(-2)
    .reverse();
  const date = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(article.date));
  return (
    <main id="world-main" tabIndex={-1} className="reading-article">
      <article>
        <header className="article-heading">
          <a className="article-back" href={worldRoutes.writing}>
            <span aria-hidden="true">←</span> Back to Writing
          </a>
          <p className="article-category">
            {categoryNames[article.category] || article.category || 'Writing'}
          </p>
          <h1>{article.title}</h1>
          <div className="article-byline">
            <span>Glen Padua</span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.date}>{date}</time>
          </div>
        </header>
        <div
          className="article-cover"
          style={
            {
              '--cover-position': cover.position,
              ...coverTransition(article.uid),
            } as CSSProperties
          }
        >
          <img
            src={cover.src}
            alt={cover.alt}
            width={cover.width}
            height={cover.height}
            fetchPriority="high"
          />
        </div>
        <ArticleBody
          body={article.body}
          knownUids={articles.map(item => item.uid)}
        />
        <footer className="article-end">
          <span className="article-end-mark" aria-hidden="true">
            ✳
          </span>
          {previous || next ? (
            <nav aria-label="More in this series" className="article-next">
              {previous && (
                <a href={articleHref(previous.uid)}>
                  <span>← Previous</span>
                  <strong>{previous.title}</strong>
                </a>
              )}
              {next && (
                <a href={articleHref(next.uid)}>
                  <span>Next →</span>
                  <strong>{next.title}</strong>
                </a>
              )}
            </nav>
          ) : (
            <nav aria-label="More writing" className="article-next">
              {related.map(item => (
                <a key={item.uid} href={articleHref(item.uid)}>
                  <span>Read next</span>
                  <strong>{item.title}</strong>
                </a>
              ))}
            </nav>
          )}
          <a className="article-back" href={worldRoutes.writing}>
            Back to the writing desk <span aria-hidden="true">↗</span>
          </a>
        </footer>
      </article>
    </main>
  );
}
