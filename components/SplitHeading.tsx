import { Fragment, type ReactNode } from "react";

type Props = { id?: string; className?: string; children: string; as?: "h1" | "h2" | "h3"; after?: ReactNode };

/** Heading whose words rise from a mask on scroll (animated by HomeMotion). Text stays in the DOM for readers and search. */
export function SplitHeading({ id, className, children, as: Tag = "h2", after }: Props) {
  const words = children.split(" ");
  return <Tag id={id} className={`split-heading${className ? ` ${className}` : ""}`}>
    {words.map((word, index) => <Fragment key={`${word}-${index}`}><span className="split-word"><span>{word}</span></span>{index < words.length - 1 ? " " : null}</Fragment>)}
    {after}
  </Tag>;
}
