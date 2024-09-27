export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <div className="prose dark:prose-invert">
      {children}
    </div>
  )
}