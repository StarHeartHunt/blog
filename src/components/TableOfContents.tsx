import type { MarkdownHeading } from '@astrojs/markdown-remark';
import { useEffect, useState } from 'preact/hooks';
import type { JSX } from 'preact';

interface Props {
  headings: MarkdownHeading[];
}

const TableOfContents = ({ headings }: Props) => {
  const [currentHeading, setCurrentHeading] = useState({
    slug: headings[0].slug,
    text: headings[0].text,
  });

  useEffect(() => {
    const setCurrent: IntersectionObserverCallback = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setCurrentHeading({
            slug: entry.target.id,
            text: entry.target.textContent || '',
          });
          break;
        }
      }
    };

    const observerOptions: IntersectionObserverInit = {
      // Negative top margin accounts for `scroll-margin`.
      // Negative bottom margin means heading needs to be towards top of viewport to trigger intersection.
      rootMargin: '0px 0% -79%',
      threshold: 1,
    };

    const headingsObserver = new IntersectionObserver(
      setCurrent,
      observerOptions
    );
    // Observe all the headings in the main page content.
    document
      .querySelectorAll('article :is(h1,h2,h3,h4)[id]')
      .forEach((h) => headingsObserver.observe(h));

    // Stop observing when the component is unmounted.
    return () => headingsObserver.disconnect();
  }, []);

  return (
    <div className="not-prose fixed bottom-0 right-[max(0px,calc(50%-45rem))] top-[3.8125rem] z-20 hidden w-[19.5rem] overflow-y-auto py-10 xl:block">
      <div className="px-8">
        <h5 className="mb-4 text-sm font-semibold leading-6 text-slate-900 dark:text-slate-100">
          On this page
        </h5>
        <ul className="toc-content text-sm leading-6 text-slate-700">
          {headings.map((heading: MarkdownHeading) => (
            <li key={heading.slug} className={heading.depth > 2 ? 'ml-4' : ''}>
              <a
                href={'#' + heading.slug}
                className={`block py-1 ${
                  currentHeading.slug == heading.slug
                    ? 'text-sky-500 dark:text-sky-400'
                    : 'hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300'
                } ${[1, 2].includes(heading.depth) ? 'font-medium' : ''} ${
                  heading.depth > 2 ? 'group flex items-start py-1' : ''
                }`.trim()}
                onClick={(e: JSX.TargetedMouseEvent<HTMLAnchorElement>) => {
                  setCurrentHeading({
                    slug: e.currentTarget
                      .getAttribute('href')!
                      .replace('#', ''),
                    text: e.currentTarget.textContent || '',
                  });
                }}
              >
                {heading.depth > 2 && (
                  <svg
                    width="3"
                    height="24"
                    viewBox="0 -9 3 24"
                    className="mr-2 overflow-visible text-slate-400 group-hover:text-slate-600 dark:text-slate-600 dark:group-hover:text-slate-500"
                  >
                    <path
                      d="M0 0L3 3L0 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TableOfContents;
