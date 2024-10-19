export default function Layout({
    children,
  }: {
    children: React.ReactNode;
  }){
    return(
        <section className="flex flex-col gap-4 w-full md:px-32">
        {children}
        </section>
    )
}