import { getPropertyBySlug, getAllSlugs } from "../../../lib/properties";
import { notFound } from "next/navigation";
import { Navbar } from "../../../components/Navbar";

import { MapWrapper } from "../../../components/MapWrapper";
import { Metadata } from "next";
import { PropertyGallery } from "@/components/PropertyGallery";

export const revalidate = 3600; // ISR revalidate every hour

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) return { title: "Property Not Found" };

  return {
    title: `${property.title} | LuxeEstate`,
    description: `Stunning property located at ${property.location} with ${property.beds} beds and ${property.baths} baths.`,
    openGraph: {
      images: [property.images?.[0] ?? ''],
    },
  };
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const images = property.images ?? [];
  const primaryImage = images[0];

  return (
    <div className="min-h-screen bg-clear-day text-nordic selection:bg-mosque/20">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          <div className="lg:col-span-8 space-y-4">
            <PropertyGallery
              images={images}
              title={property.title}
              status={property.status}
            />
          </div>

          <div className="lg:col-span-4 relative">
            <div className="sticky top-28 space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-mosque/5">
                <div className="mb-4">
                  <h1 className="text-4xl font-display font-light text-nordic mb-2">
                    {formatPrice(property.price)}{" "}
                    {property.price_per_month && (
                      <span className="text-sm font-normal text-nordic-muted">
                        /mo
                      </span>
                    )}
                  </h1>
                  <p className="text-nordic/60 font-medium flex items-center gap-1 mt-1">
                    <span className="material-icons text-mosque text-sm">
                      location_on
                    </span>
                    {property.location}
                  </p>
                </div>

                <div className="h-px bg-slate-100 my-6"></div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center text-mosque/50">
                    <span className="material-icons text-2xl">person</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-nordic">
                      LuxeEstate Agent
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-mosque font-medium">
                      <span className="material-icons text-[14px]">star</span>
                      <span>Top Rated Agent</span>
                    </div>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <button className="w-9 h-9 flex items-center justify-center rounded-full bg-mosque/10 text-mosque hover:bg-mosque hover:text-white transition-colors cursor-pointer">
                      <span className="material-icons text-base leading-none">chat</span>
                    </button>
                    <button className="w-9 h-9 flex items-center justify-center rounded-full bg-mosque/10 text-mosque hover:bg-mosque hover:text-white transition-colors cursor-pointer">
                      <span className="material-icons text-base leading-none">call</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-mosque hover:bg-primary-hover text-white py-4 px-6 rounded-lg font-medium transition-all shadow-lg shadow-mosque/20 flex items-center justify-center gap-2 group cursor-pointer">
                    <span className="material-icons text-xl group-hover:scale-110 transition-transform">
                      calendar_today
                    </span>
                    Schedule Visit
                  </button>
                  <button className="w-full bg-transparent border border-nordic/10 hover:border-mosque text-nordic/80 hover:text-mosque py-4 px-6 rounded-lg font-medium transition-all flex items-center justify-center gap-2 cursor-pointer">
                    <span className="material-icons text-xl">mail_outline</span>
                    Contact Agent
                  </button>
                </div>
              </div>

              <div className="bg-white p-2 rounded-xl shadow-sm border border-mosque/5">
                <MapWrapper location={property.location} />
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 lg:row-start-2 -mt-8 space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-mosque/5">
              <h2 className="text-lg font-semibold mb-6 text-nordic">
                Property Features
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex flex-col items-center justify-center p-4 bg-mosque/5 rounded-lg border border-mosque/10">
                  <span className="material-icons text-mosque text-2xl mb-2">
                    square_foot
                  </span>
                  <span className="text-xl font-bold text-nordic">
                    {property.area}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-nordic/50">
                    Square Meters
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-mosque/5 rounded-lg border border-mosque/10">
                  <span className="material-icons text-mosque text-2xl mb-2">
                    bed
                  </span>
                  <span className="text-xl font-bold text-nordic">
                    {property.beds}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-nordic/50">
                    Bedrooms
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-mosque/5 rounded-lg border border-mosque/10">
                  <span className="material-icons text-mosque text-2xl mb-2">
                    shower
                  </span>
                  <span className="text-xl font-bold text-nordic">
                    {property.baths}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-nordic/50">
                    Bathrooms
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-mosque/5 rounded-lg border border-mosque/10">
                  <span className="material-icons text-mosque text-2xl mb-2">
                    directions_car
                  </span>
                  <span className="text-xl font-bold text-nordic">1+</span>
                  <span className="text-xs uppercase tracking-wider text-nordic/50">
                    Garage
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-mosque/5">
              <h2 className="text-lg font-semibold mb-4 text-nordic">
                About this home
              </h2>
              <div className="prose prose-slate max-w-none text-nordic/70 leading-relaxed">
                <p className="mb-4">
                  Experience modern luxury in this architecturally stunning home
                  located in {property.location}. Designed with an emphasis on
                  comfort and high standards, the residence features high
                  quality materials that flood the interiors with natural light.
                </p>
                <p>
                  This property is perfect for those seeking{" "}
                  {property.type === "rent"
                    ? "a premium rental experience"
                    : "a long-term investment"}{" "}
                  with a magnificent setting.
                </p>
              </div>
              <button className="mt-4 text-mosque font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all cursor-pointer">
                Read more
                <span className="material-icons text-sm">arrow_forward</span>
              </button>
            </div>

            <div className="bg-mosque/5 p-6 rounded-xl border border-mosque/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-full text-mosque shadow-sm">
                  <span className="material-icons">calculate</span>
                </div>
                <div>
                  <h3 className="font-semibold text-nordic">
                    Estimated Payment
                  </h3>
                  <p className="text-sm text-nordic/60">
                    Starting from{" "}
                    <strong className="text-mosque">
                      {formatPrice(property.price / 185)}/mo
                    </strong>{" "}
                    with 20% down
                  </p>
                </div>
              </div>
              <button className="whitespace-nowrap px-4 py-2 bg-white border border-nordic/10 rounded-lg text-sm font-semibold hover:border-mosque transition-colors text-nordic cursor-pointer">
                Calculate Mortgage
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
