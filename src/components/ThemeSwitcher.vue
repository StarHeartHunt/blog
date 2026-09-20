<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";
import { nextTick } from "vue";

const isDark = useDark({ storageKey: "starheart-color-scheme" });
const toggleTheme = useToggle(isDark);

let transitioning = false;

// Circular reveal on theme change, adapted from https://antfu.me
async function toggleDark(event: MouseEvent) {
  const isAppearanceTransition =
    "startViewTransition" in document &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!isAppearanceTransition) {
    toggleTheme();
    return;
  }

  // Starting a second transition while one is running skips the running one,
  // which snaps the theme over in a single frame.
  if (transitioning) return;
  transitioning = true;

  // Keyboard activation reports no pointer position (detail === 0), so the
  // reveal starts from the button itself instead of the viewport corner.
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
  const x = event.detail === 0 ? rect.left + rect.width / 2 : event.clientX;
  const y = event.detail === 0 ? rect.top + rect.height / 2 : event.clientY;
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  );

  const transition = document.startViewTransition(async () => {
    toggleTheme();
    await nextTick();
  });

  let reveal: Animation | undefined;
  try {
    await transition.ready;

    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ];
    reveal = document.documentElement.animate(
      {
        clipPath: isDark.value ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: 400,
        easing: "ease-out",
        // Without this the clip-path reverts when the animation ends, and the
        // old snapshot covers the page again for a frame before it is removed.
        fill: "forwards",
        pseudoElement: isDark.value
          ? "::view-transition-old(root)"
          : "::view-transition-new(root)",
      },
    );
  } catch {
    // The transition was skipped (backgrounded tab, overlapping transition);
    // the theme is already applied, so there is nothing left to animate.
  }

  await transition.finished.catch(() => {});
  // A filled animation outlives the transition and would still clip the same
  // pseudo-element in the next one, hiding its snapshot from the first frame.
  reveal?.cancel();
  transitioning = false;
}
</script>

<template>
  <button
    type="button"
    aria-label="Toggle dark mode"
    class="flex cursor-pointer items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
    @click="toggleDark"
  >
    <slot name="dayIcon" />
    <slot name="nightIcon" />
  </button>
</template>
