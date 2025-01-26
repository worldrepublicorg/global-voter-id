export default function Footer() {
  return (
    <section className="flex w-full justify-between px-4 py-3">
      <aside className="flex items-center">
        <p className="text-[13px] leading-5 text-muted-foreground">
          A{' '}
          <a
            href="https://worldrepublic.org"
            target="_blank"
            rel="noreferrer"
            className="font-semibold"
          >
            World Republic
          </a>{' '}
          project.
        </p>
      </aside>
      <a
        href="https://github.com/worldrepublicorg/global-voter-id"
        target="_blank"
        rel="noreferrer"
        className="text-[13px] font-medium leading-5 text-muted-foreground"
      >
        GitHub
      </a>
    </section>
  );
}
