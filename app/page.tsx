import { Suspense } from "react";
import { Navbar } from "../components/Navbar";
import { PropertyCard } from "../components/PropertyCard";
import { FilterPills } from "../components/FilterPills";
import { Pagination } from "../components/Pagination";
import { getProperties } from "../lib/properties";

const PAGE_SIZE = 6;

// SKELETONS

function FeaturedSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {[1, 2].map((i) => (
        <div key={i} className="rounded-xl overflow-hidden shadow-soft bg-white h-100 animate-pulse">
          <div className="w-full h-full bg-nordic-dark/5"></div>
        </div>
      ))}
    </div>
  );
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-white rounded-xl overflow-hidden shadow-card h-95 animate-pulse">
          <div className="aspect-4/3 relative w-full bg-nordic-dark/5"></div>
          <div className="p-4 flex flex-col h-full">
            <div className="h-6 bg-nordic-dark/10 rounded w-1/3 mb-4"></div>
            <div className="h-5 bg-nordic-dark/10 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-nordic-dark/10 rounded w-1/2 mb-4"></div>
            <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between">
              <div className="h-4 bg-nordic-dark/10 rounded w-12"></div>
              <div className="h-4 bg-nordic-dark/10 rounded w-12"></div>
              <div className="h-4 bg-nordic-dark/10 rounded w-16"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// SERVER COMPONENTS DATA-FETCHERS

async function FeaturedCollection() {
  const result = await getProperties({ featuredOnly: true, pageSize: 100 });
  const featuredProperties = result.data;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {featuredProperties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          featuredDesign={true}
        />
      ))}
    </div>
  );
}

async function NewInMarketCollection({
  currentPage,
  typeFilter,
}: {
  currentPage: number;
  typeFilter: "sale" | "rent" | "all";
}) {
  const propertiesResult = await getProperties({
    page: currentPage,
    pageSize: PAGE_SIZE,
    type: typeFilter,
    featuredOnly: false,
  });

  const newProperties = propertiesResult.data;
  const { totalPages } = propertiesResult;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {newProperties.length > 0 ? (
          newProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              featuredDesign={false}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-nordic-muted py-12">
            No properties found.
          </p>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        baseUrl={typeFilter !== "all" ? `/?type=${typeFilter}` : "/"}
      />
    </>
  );
}

interface HomeProps {
  searchParams: Promise<{ page?: string; type?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page ?? "1", 10));
  const typeFilter = (params.type as "sale" | "rent" | "all") ?? "all";

  return (
    <div className="min-h-screen bg-background-light font-display">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* HERO SECTION */}
        <section className="py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-nordic-dark leading-tight">
              Find your{" "}
              <span className="relative inline-block">
                <span className="relative z-10 font-medium">sanctuary</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-mosque/20 -rotate-1 z-0"></span>
              </span>
              .
            </h1>

            <div className="relative group max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-icons text-nordic-muted text-2xl group-focus-within:text-mosque transition-colors">
                  search
                </span>
              </div>
              <input
                className="block w-full pl-12 pr-32 py-4 rounded-xl border-none outline-none outline-nordic-dark/10 bg-white text-nordic-dark shadow-soft placeholder-nordic-muted/60 focus:ring-2 focus:ring-mosque focus:bg-white transition-all text-lg"
                placeholder="Search by city, neighborhood, or address..."
                type="text"
              />
              <button className="absolute inset-y-2 right-2 px-6 bg-mosque hover:bg-mosque/90 text-white font-medium rounded-lg transition-colors flex items-center justify-center shadow-lg shadow-mosque/20">
                Search
              </button>
            </div>

            <FilterPills />
          </div>
        </section>

        {/* FEATURED COLLECTIONS SECTION */}
        <section className="mb-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-light text-nordic-dark">
                Featured Collections
              </h2>
              <p className="text-nordic-muted mt-1 text-sm">
                Curated properties for the discerning eye.
              </p>
            </div>
            <a
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-mosque hover:opacity-70 transition-opacity"
              href="#"
            >
              View all{" "}
              <span className="material-icons text-sm">arrow_forward</span>
            </a>
          </div>

          <Suspense fallback={<FeaturedSkeleton />}>
            <FeaturedCollection />
          </Suspense>
        </section>

        {/* NEW IN MARKET SECTION */}
        <section>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-light text-nordic-dark">
                New in Market
              </h2>
              <p className="text-nordic-muted mt-1 text-sm">
                Fresh opportunities just for you.
              </p>
            </div>
            <div className="hidden md:flex bg-white p-1 rounded-lg">
              <a
                href="/?page=1"
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${typeFilter === "all" ? "bg-nordic-dark text-white shadow-sm" : "text-nordic-muted hover:text-nordic-dark"}`}
              >
                All
              </a>
              <a
                href="/?page=1&type=sale"
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${typeFilter === "sale" ? "bg-nordic-dark text-white shadow-sm" : "text-nordic-muted hover:text-nordic-dark"}`}
              >
                Buy
              </a>
              <a
                href="/?page=1&type=rent"
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${typeFilter === "rent" ? "bg-nordic-dark text-white shadow-sm" : "text-nordic-muted hover:text-nordic-dark"}`}
              >
                Rent
              </a>
            </div>
          </div>

          <Suspense key={`${currentPage}-${typeFilter}`} fallback={<GridSkeleton />}>
            <NewInMarketCollection
              currentPage={currentPage}
              typeFilter={typeFilter}
            />
          </Suspense>
        </section>
      </main>
    </div>
  );
}
