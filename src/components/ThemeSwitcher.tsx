import { useEffect, useState, type ReactElement } from 'react';

const isBrowserDefaultDark = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches;

type Props = {
  dayIcon?: ReactElement;
  nightIcon?: ReactElement;
};

export default function ThemeSwitcher({ dayIcon, nightIcon }: Props) {
  const [theme, setTheme] = useState(isBrowserDefaultDark() ? 'dark' : 'light');

  function updateClass() {
    if (theme === 'dark') document.documentElement.classList.add('dark');
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
          clipPath: theme === 'dark' ? [...clipPath].reverse() : clipPath,
        },
        {
          duration: 400,
          easing: 'ease-out',
          pseudoElement:
            theme === 'dark'
              ? '::view-transition-old(root)'
              : '::view-transition-new(root)',
        }
      );
    });
  }

  return (
    <>
      <div onClick={(e) => toggleDark(e.nativeEvent)}>
        {theme === 'dark' ? dayIcon : nightIcon}
      </div>
    </>
  );
}
