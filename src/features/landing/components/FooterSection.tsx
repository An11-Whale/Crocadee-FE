export function FooterSection() {
  return (
    <footer className="w-full">
      {/* ABOUT CODEBITE */}
      <div className="mx-auto max-w-4xl px-8 py-24 text-center">
        <h2 className="text-3xl font-semibold text-primary-500 md:text-4xl">
          About CodeBite
        </h2>

        <div className="mx-auto mt-4 mb-8 h-1.5 w-12 rounded-full bg-primary-500"></div>

        <p className="text-base leading-relaxed text-neutral-600 md:text-lg">
          We are a team of educators and engineers passionate about making
          software engineering education accessible, engaging, and effective. By
          combining AI-driven personalization with gamified learning paths, we
          help the next generation of coders master their craft.
        </p>
      </div>

      {/* BOTTOM FOOTER */}
      <div className="border-t border-neutral-200 bg-shade-white py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-8 md:flex-row">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-xl font-extrabold text-primary-700">
              CodeBite
            </span>
            <span className="mt-1 text-sm text-neutral-500">
              © 2026 CodeBite. Develop your skills, bit by bit.
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-neutral-500">
            <a href="#" className="transition hover:text-primary-500">
              Privacy Policy
            </a>
            <a href="#" className="transition hover:text-primary-500">
              Terms of Service
            </a>
            <a href="#" className="transition hover:text-primary-500">
              Contact Us
            </a>
            <a href="#" className="transition hover:text-primary-500">
              Careers
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
