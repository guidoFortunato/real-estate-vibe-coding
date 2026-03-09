import { Suspense } from "react";
import { Navbar } from "../components/Navbar";
import { PropertyCard } from "../components/PropertyCard";
import { FilterPills } from "../components/FilterPills";
import { Pagination } from "../components/Pagination";
import { getProperties, GetPropertiesOptions } from "../lib/properties";

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

import { SearchInput } from "../components/SearchInput";

async function FeaturedCollection() {
  const result = await getProperties({ 
    featuredOnly: true, 
    pageSize: 2,
    page: 1 
  });
  const featuredProperties = result.data;

  if (featuredProperties.length === 0) return null;

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
  searchParams,
}: {
  searchParams: GetPropertiesOptions;
}) {
  const { page = 1, type = "all", ...filters } = searchParams;
  
  const propertiesResult = await getProperties({
    page,
    pageSize: PAGE_SIZE,
    type,
    featuredOnly: false,
    ...filters,
  });

  const newProperties = propertiesResult.data;
  const { totalPages } = propertiesResult;

  // Build base URL for pagination that preserves other filters
  const params = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (key !== "page" && value !== undefined && value !== null) {
      params.set(key, value.toString());
    }
  });
  const searchParamsString = params.toString();
  const baseUrl = searchParamsString ? `/?${searchParamsString}` : "/";

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
            No properties found matching your criteria.
          </p>
        )}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        baseUrl={baseUrl}
      />
    </>
  );
}

interface HomeProps {
  searchParams: Promise<{ 
    page?: string; 
    type?: string;
    search?: string;
    minPrice?: string;
    maxPrice?: string;
    propertyType?: string;
    beds?: string;
    baths?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const options: GetPropertiesOptions = {
    page: Math.max(1, parseInt(params.page ?? "1", 10)),
    type: (params.type as "sale" | "rent" | "all") ?? "all",
    search: params.search,
    minPrice: params.minPrice ? parseInt(params.minPrice, 10) : undefined,
    maxPrice: params.maxPrice ? parseInt(params.maxPrice, 10) : undefined,
    propertyType: params.propertyType,
    beds: params.beds ? parseInt(params.beds, 10) : undefined,
    baths: params.baths ? parseInt(params.baths, 10) : undefined,
  };

  const typeFilter = options.type || "all";

  const isFiltering = 
    !!params.search || 
    !!params.minPrice || 
    !!params.maxPrice || 
    !!params.propertyType || 
    !!params.beds || 
    !!params.baths ||
    (params.type && params.type !== "all") ||
    (options.page ?? 1) > 1;

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

            <SearchInput />

            <FilterPills />
          </div>
        </section>

        {/* FEATURED COLLECTIONS SECTION */}
        {!isFiltering && (
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
        )}

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
                href={(() => {
                  const p = new URLSearchParams();
                  Object.entries(params).forEach(([k, v]) => { if (k !== "page" && v !== undefined && v !== null) p.set(k, v); });
                  p.delete("type");
                  const qs = p.toString();
                  return qs ? `/?${qs}` : "/";
                })()}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${typeFilter === "all" ? "bg-nordic-dark text-white shadow-sm" : "text-nordic-muted hover:text-nordic-dark"}`}
              >
                All
              </a>
              <a
                href={(() => {
                  const p = new URLSearchParams();
                  Object.entries(params).forEach(([k, v]) => { if (k !== "page" && v !== undefined && v !== null) p.set(k, v); });
                  p.set("type", "sale");
                  return `/?${p.toString()}`;
                })()}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${typeFilter === "sale" ? "bg-nordic-dark text-white shadow-sm" : "text-nordic-muted hover:text-nordic-dark"}`}
              >
                Buy
              </a>
              <a
                href={(() => {
                  const p = new URLSearchParams();
                  Object.entries(params).forEach(([k, v]) => { if (k !== "page" && v !== undefined && v !== null) p.set(k, v); });
                  p.set("type", "rent");
                  return `/?${p.toString()}`;
                })()}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${typeFilter === "rent" ? "bg-nordic-dark text-white shadow-sm" : "text-nordic-muted hover:text-nordic-dark"}`}
              >
                Rent
              </a>
            </div>
          </div>

          <Suspense key={JSON.stringify(options)} fallback={<GridSkeleton />}>
            <NewInMarketCollection
              searchParams={options}
            />
          </Suspense>
        </section>
      </main>
    </div>
  );
}
