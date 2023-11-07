/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState, type ReactElement } from 'react';

const isBrowserDefaultDark = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches;

type Props = {
  dayIcon?: ReactElement;
  nightIcon?: ReactElement;
};

export default function ThemeSwitcher({ dayIcon, nightIcon }: Props) {
  const [theme, setTheme] = useState(isBrowserDefaultDark() ? 'dark' : 'light');

  function updateClass() {
    if (theme === 'light') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }

  function toggleDark(event: MouseEvent) {
    const isAppearanceTransition =
      // @ts-expect-error experimental API
      document.startViewTransition &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isAppearanceTransition) {
      setTheme(theme === 'dark' ? 'light' : 'dark');
      updateClass();
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );
    // @ts-expect-error: Transition API
    // eslint-disable-next-line @typescript-eslint/require-await
    const transition = document.startViewTransition(async () => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
      updateClass();
    });
    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];
      document.documentElement.animate(
        {
          clipPath: theme === 'light' ? [...clipPath].reverse() : clipPath,
        },
        {
          duration: 400,
          easing: 'ease-out',
          pseudoElement:
            theme === 'light'
              ? '::view-transition-old(root)'
              : '::view-transition-new(root)',
        }
      );
    });
  }

  return (
    <>
      <div onClick={(e) => toggleDark(e.nativeEvent)}>
        {theme === 'dark' ? nightIcon : dayIcon}
      </div>
    </>
  );
}
