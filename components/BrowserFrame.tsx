import Image from "next/image";

type Props = {
  url: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  /** "hover": the screenshot scrolls while the pointer is over it. "scroll": the visitor scrolls inside the frame. */
  mode?: "hover" | "scroll";
  priority?: boolean;
  className?: string;
};

export const hostOf = (url: string) => new URL(url).hostname.replace(/^www\./, "");

/** A published site shown inside a minimal browser window, with its real address in the bar. */
export function BrowserFrame({ url, src, alt, width, height, sizes, mode = "hover", priority, className }: Props) {
  return <div className={`browser-frame is-${mode}${className ? ` ${className}` : ""}`}>
    <div className="browser-frame-bar" aria-hidden><i /><i /><i /><span>{hostOf(url)}</span></div>
    <div className="browser-frame-screen" tabIndex={mode === "scroll" ? 0 : undefined} role={mode === "scroll" ? "region" : undefined} aria-label={mode === "scroll" ? `Página publicada de ${hostOf(url)}` : undefined}>
      <Image src={src} alt={alt} width={width} height={height} sizes={sizes} priority={priority} />
    </div>
  </div>;
}
