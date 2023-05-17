export default function Layout({ children }) {
  return (
    <>
      <div className="w-full border-b border-gray">layout</div>
      <main className="grow flex overflow-hidden">
        {children}
      </main>
    </>
  )
}