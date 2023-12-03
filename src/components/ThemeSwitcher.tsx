/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState, type ReactElement } from "react";

type Props = {
  dayIcon?: ReactElement;
  nightIcon?: ReactElement;
};

export default function ThemeSwitcher({ dayIcon, nightIcon }: Props) {
  const [theme, setTheme] = useState("light");

  function updateClass(toTheme: string) {
    if (toTheme === "light") document.documentElement.classList.remove("dark");
    else document.documentElement.classList.add("dark");
  }

  const reverseTheme = () => (theme === "dark" ? "light" : "dark");

  function syncTheme() {
    const toTheme = reverseTheme();
    setTheme(toTheme);
    localStorage.setItem("starheart-color-scheme", toTheme);
    updateClass(toTheme);
  }

  useEffect(() => {
    const toTheme = localStorage.getItem("starheart-color-scheme") || "light";
    setTheme(toTheme);
  }, []);

  function toggleDark(event: MouseEvent) {
    const isAppearanceTransition =
      // @ts-expect-error experimental API
      document.startViewTransition &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isAppearanceTransition) {
      syncTheme();
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    );
    // @ts-expect-error: Transition API
    const transition = document.startViewTransition(() => syncTheme());
    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];
      document.documentElement.animate(
        {
          clipPath: theme === "light" ? [...clipPath].reverse() : clipPath,
        },
        {
          duration: 400,
          easing: "ease-out",
          pseudoElement:
            theme === "light"
              ? "::view-transition-old(root)"
              : "::view-transition-new(root)",
        },
      );
    });
  }

  return (
    <div onClick={(e) => toggleDark(e.nativeEvent)}>
      {dayIcon}
      {nightIcon}
    </div>
  );
}
