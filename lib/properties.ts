import { supabase } from "./supabase";

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  price_per_month: boolean;
  beds: number;
  baths: number;
  area: number;
  slug: string;
  images: string[];
  type: "sale" | "rent";
  status: "Exclusive" | "New Arrival" | "Standard";
  featured: boolean;
  created_at: string;
}

export interface GetPropertiesOptions {
  page?: number;
  pageSize?: number;
  type?: "sale" | "rent" | "all";
  featuredOnly?: boolean;
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  baths?: number;
  search?: string;
  propertyType?: string;
}

export interface GetPropertiesResult {
  data: Property[];
  count: number;
  totalPages: number;
}

export async function getProperties({
  page = 1,
  pageSize = 6,
  type = "all",
  featuredOnly = false,
  minPrice,
  maxPrice,
  beds,
  baths,
  search,
  propertyType,
}: GetPropertiesOptions = {}): Promise<GetPropertiesResult> {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("properties")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (featuredOnly) {
    query = query.eq("featured", true);
  }

  if (type && type !== "all") {
    query = query.eq("type", type);
  }

  if (minPrice !== undefined) {
    query = query.gte("price", minPrice);
  }

  if (maxPrice !== undefined) {
    query = query.lte("price", maxPrice);
  }

  if (beds !== undefined && beds > 0) {
    query = query.gte("beds", beds);
  }

  if (baths !== undefined && baths > 0) {
    query = query.gte("baths", baths);
  }

  if (propertyType && propertyType !== "Any Type" && propertyType !== "All" && propertyType.trim() !== "") {
    query = query.ilike("title", `%${propertyType}%`);
  }

  if (search && search.trim() !== "") {
    query = query.or(`title.ilike.%${search}%,location.ilike.%${search}%`);
  }

  const { data, error, count } = await query.range(from, to);

  if (error) {
    // PostgREST 416: Requested range not satisfiable (happens when page is too high)
    if (error.code === 'PGRST103') {
      return { data: [], count: count ?? 0, totalPages: Math.ceil((count ?? 0) / pageSize) };
    }
    
    console.error("Supabase Error detail:", error);
    return { data: [], count: 0, totalPages: 0 };
  }

  const totalCount = count ?? 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    data: (data as Property[]) ?? [],
    count: totalCount,
    totalPages,
  };
}

export async function getPropertyBySlug(
  slug: string,
): Promise<Property | null> {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching property by slug:", error.message);
    return null;
  }

  return data as Property;
}

export async function getAllSlugs(): Promise<{ slug: string }[]> {
  const { data, error } = await supabase.from("properties").select("slug");

  if (error) {
    console.error("Error fetching property slugs:", error.message);
    return [];
  }

  return data as { slug: string }[];
}
