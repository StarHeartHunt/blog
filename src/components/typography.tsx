import type { ClassAttributes, HTMLAttributes } from 'react';

export const H1 = (
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLHeadingElement> &
    HTMLAttributes<HTMLHeadingElement>
) => (
  <h1
    className="block font-sans text-5xl font-semibold leading-tight tracking-normal text-inherit antialiased"
    {...props}
  />
);
export const H2 = (
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLHeadingElement> &
    HTMLAttributes<HTMLHeadingElement>
) => (
  <h2
    className="block font-sans text-4xl font-semibold leading-[1.3] tracking-normal text-inherit antialiased"
    {...props}
  />
);
export const H3 = (
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLHeadingElement> &
    HTMLAttributes<HTMLHeadingElement>
) => (
  <h3
    className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-inherit antialiased"
    {...props}
  />
);
export const H4 = (
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLHeadingElement> &
    HTMLAttributes<HTMLHeadingElement>
) => (
  <h4
    className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-inherit antialiased"
    {...props}
  />
);
export const H5 = (
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLHeadingElement> &
    HTMLAttributes<HTMLHeadingElement>
) => (
  <h5
    className="block font-sans text-xl font-semibold leading-snug tracking-normal text-inherit antialiased"
    {...props}
  />
);
export const H6 = (
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLHeadingElement> &
    HTMLAttributes<HTMLHeadingElement>
) => (
  <h6
    className="block font-sans text-base font-semibold capitalize leading-relaxed tracking-normal text-inherit antialiased"
    {...props}
  />
);
export const P = (
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLParagraphElement> &
    HTMLAttributes<HTMLParagraphElement>
) => (
  <p
    className="block font-sans text-base font-light leading-relaxed text-inherit antialiased"
    {...props}
  />
);
