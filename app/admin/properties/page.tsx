import { getProperties } from "@/lib/properties";
import Image from "next/image";

export default async function AdminPropertiesPage() {
  const { data: properties, count } = await getProperties({ pageSize: 50 });

  return (
    <main className="grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-nordic tracking-tight">My Properties</h1>
          <p className="text-nordic/60 mt-1">Manage your portfolio and track performance.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-nordic/10 text-nordic hover:bg-nordic/5 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm inline-flex items-center gap-2">
            <span className="material-symbols-outlined text-base">filter_list</span> Filter
          </button>
          <button className="bg-mosque hover:bg-mosque/90 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-md shadow-mosque/20 transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2 pointer-events-none opacity-50">
            <span className="material-symbols-outlined text-base">add</span> Add New Property
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-xl border border-nordic/5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-nordic/60">Total Listings</p>
            <p className="text-2xl font-bold text-nordic mt-1">{count}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-mosque/10 flex items-center justify-center text-mosque">
            <span className="material-symbols-outlined">apartment</span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-nordic/5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-nordic/60">Active Properties</p>
            <p className="text-2xl font-bold text-nordic mt-1">{properties.filter(p => p.status === 'Standard' || p.status === 'New Arrival' || p.status === 'Exclusive').length}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-hint-of-green flex items-center justify-center text-mosque">
            <span className="material-symbols-outlined">check_circle</span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-nordic/5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-nordic/60">Featured Properties</p>
            <p className="text-2xl font-bold text-nordic mt-1">{properties.filter(p => p.featured).length}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
            <span className="material-symbols-outlined">star</span>
          </div>
        </div>
      </div>

      {/* Property List Container */}
      <div className="bg-white rounded-xl shadow-sm border border-nordic/5 overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-nordic/5 border-b border-nordic/5 text-xs font-semibold text-nordic/60 uppercase tracking-wider">
          <div className="col-span-6">Property Details</div>
          <div className="col-span-2">Price</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* List Items */}
        <div className="divide-y divide-nordic/5">
          {properties.map(property => (
            <div key={property.id} className="group grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-5 hover:bg-nordic/5 transition-colors items-center">
              {/* Property Details */}
              <div className="col-span-12 md:col-span-6 flex gap-4 items-center">
                <div className="relative h-20 w-28 shrink-0 rounded-lg overflow-hidden bg-nordic/5">
                  <Image 
                    src={property.images[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa'} 
                    alt={property.title} 
                    fill
                    sizes="(max-width: 112px) 100vw, 112px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-nordic group-hover:text-mosque transition-colors cursor-pointer line-clamp-1">{property.title}</h3>
                  <p className="text-sm text-nordic/60 line-clamp-1">{property.location}</p>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-nordic/50">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">bed</span> {property.beds} Beds</span>
                    <span className="w-1 h-1 rounded-full bg-nordic/30"></span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">bathtub</span> {property.baths} Baths</span>
                    <span className="w-1 h-1 rounded-full bg-nordic/30"></span>
                    <span>{property.area} sqft</span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="col-span-6 md:col-span-2">
                <div className="text-base font-semibold text-nordic">${property.price.toLocaleString()}</div>
                <div className="text-xs text-nordic/50">
                  {property.type.toUpperCase()}{property.price_per_month ? ' /mo' : ''}
                </div>
              </div>

              {/* Status */}
              <div className="col-span-6 md:col-span-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-hint-of-green text-mosque border border-mosque/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-mosque mr-1.5"></span>
                  {property.status}
                </span>
              </div>

              {/* Actions */}
              <div className="col-span-12 md:col-span-2 flex items-center justify-end gap-2">
                <button className="p-2 rounded-lg text-nordic/40 hover:text-mosque hover:bg-hint-of-green/50 transition-all tooltip-trigger" title="Edit Property">
                  <span className="material-symbols-outlined text-xl">edit</span>
                </button>
                <button className="p-2 rounded-lg text-nordic/40 hover:text-red-600 hover:bg-red-50 transition-all tooltip-trigger" title="Delete Property">
                  <span className="material-symbols-outlined text-xl">delete_outline</span>
                </button>
              </div>
            </div>
          ))}

          {properties.length === 0 && (
            <div className="py-12 text-center text-nordic/50 flex flex-col items-center">
              <span className="material-symbols-outlined text-4xl mb-2 opacity-50">domain_disabled</span>
              <p>No properties found</p>
            </div>
          )}
        </div>

        {/* Pagination Dummy (since implementation doesn't have working admin pagination out of box yet) */}
        {properties.length > 0 && (
          <div className="px-6 py-4 border-t border-nordic/5 flex items-center justify-between bg-nordic/5">
            <div className="text-sm text-nordic/60">
                Showing <span className="font-medium text-nordic">1</span> to <span className="font-medium text-nordic">{properties.length}</span> of <span className="font-medium text-nordic">{count}</span> results
            </div>
            <div className="flex gap-2">
              <button disabled className="px-3 py-1 text-sm border border-nordic/10 rounded-md text-nordic/60 hover:bg-white disabled:opacity-50">Previous</button>
              <button disabled className="px-3 py-1 text-sm border border-nordic/10 rounded-md text-nordic/60 hover:bg-white disabled:opacity-50">Next</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
