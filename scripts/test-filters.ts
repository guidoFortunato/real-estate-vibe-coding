import { getProperties } from "@/lib/properties";

async function testFilters() {
  console.log("--- Testing Price Filter (1M - 5M) ---");
  const priceResult = await getProperties({
    minPrice: 1000000,
    maxPrice: 5000000,
  });
  console.log(`Found ${priceResult.data.length} properties.`);
  priceResult.data.forEach((p) => console.log(`- ${p.title}: $${p.price}`));

  console.log("\n--- Testing Location Search ('CA') ---");
  const locationResult = await getProperties({ search: "CA" });
  console.log(`Found ${locationResult.data.length} properties in CA.`);
  locationResult.data.forEach((p) =>
    console.log(`- ${p.title} in ${p.location}`),
  );

  console.log("\n--- Testing Property Type ('Villa') ---");
  const typeResult = await getProperties({ propertyType: "Villa" });
  console.log(`Found ${typeResult.data.length} Villas.`);
  typeResult.data.forEach((p) => console.log(`- ${p.title}`));
}

testFilters().catch(console.error);
