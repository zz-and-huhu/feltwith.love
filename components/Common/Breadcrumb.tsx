import Link from "next/link";

type BreadcrumbItem = {
  name: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  description?: string;
};

const Breadcrumb = ({ items, description }: BreadcrumbProps) => {
  const currentPage = items[items.length - 1];

  return (
    <section className="relative z-10 overflow-hidden pt-28 lg:pt-[150px]">
      <div className="container lg:mb-12">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 md:w-8/12 lg:w-7/12 ">
            {description && (
              <p className="my-4 text-base font-medium leading-relaxed text-body-color">
                {description}
              </p>
            )}
          </div>
          <div className="w-full px-4 md:w-4/12 lg:w-5/12">
            <div className="text-end">
              <nav aria-label="Breadcrumb">
                <ul className="flex flex-wrap items-center md:justify-end">
                  {items.map((item, index) => (
                    <li key={item.name} className="flex items-center">
                      {item.href ? (
                        <>
                          <Link
                            href={item.href}
                            className="text-base font-medium text-body-color transition-colors hover:text-primary"
                            aria-current={
                              index === items.length - 1 ? "page" : undefined
                            }
                          >
                            {item.name}
                          </Link>
                          {index !== items.length - 1 && (
                            <span className="mx-3 block h-2 w-2 rotate-45 border-r-2 border-t-2 border-body-color" />
                          )}
                        </>
                      ) : (
                        <span className="text-base font-medium text-primary">
                          {item.name}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
