const Contact = () => {
  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-2xl font-bold text-dark sm:text-3xl">
            I&apos;d Love to Hear From You
          </h2>
          <p className="mb-8 text-base leading-relaxed text-body-color">
            Whether you&apos;d like to order a custom needle felted pet
            portrait, have questions about the process, or just want to say
            hello — feel free to reach out. I typically respond within 24 hours.
          </p>

          <a
            href="mailto:wendy@feltwith.love"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-8 py-4 text-base font-medium text-white transition duration-300 ease-in-out hover:opacity-80 hover:shadow-signUp"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            wendy@feltwith.love
          </a>

          <p className="mt-6 text-sm text-body-color">
            You can also share a{" "}
            <a
              href="https://photos.google.com/albums"
              className="font-medium text-primary underline"
            >
              Google Photos album
            </a>{" "}
            of your pet — it helps me get started on your portrait right away!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
