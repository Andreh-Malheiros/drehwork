const SYMBOL_A = "307,487 462,487 462,872 743,712 743,878 462,1033 307,924";
const SYMBOL_B = "449,245 988,590 988,812 805,925 805,680 449,438";

export function BrandSymbol({ className }: { className?: string }) {
  return <svg className={className} viewBox="297 235 701 808" fill="currentColor" aria-hidden="true" focusable="false"><polygon points={SYMBOL_A} /><polygon points={SYMBOL_B} /></svg>;
}

export function BrandLogo({ className }: { className?: string }) {
  return <span className={`brand-logo${className ? ` ${className}` : ""}`}>
    <BrandSymbol className="brand-logo-symbol" />
    <span className="brand-logo-type" aria-hidden="true"><b>DREH</b><i>WORK</i></span>
  </span>;
}
