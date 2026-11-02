// Remounts on every navigation, giving each page a short, consistent entrance.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
