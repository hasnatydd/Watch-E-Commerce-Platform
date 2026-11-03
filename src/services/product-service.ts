import { prisma, isDatabaseAvailable } from "@/lib/db/prisma";
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from "@/lib/data/initial-catalog";

export async function getProducts(options?: {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  page?: number;
  limit?: number;
}) {
  const dbAvailable = await isDatabaseAvailable();

  if (dbAvailable) {
    try {
      const where: any = {
        status: "PUBLISHED",
      };

      if (options?.isFeatured) {
        where.isFeatured = true;
      }

      if (options?.isNewArrival) {
        where.isNewArrival = true;
      }

      if (options?.search) {
        const q = options.search.trim();
        where.OR = [
          { name: { contains: q, mode: "insensitive" } },
          { sku: { contains: q, mode: "insensitive" } },
          { modelNumber: { contains: q, mode: "insensitive" } },
        ];
      }

      if (options?.category) {
        where.categories = {
          some: {
            category: {
              slug: options.category,
            },
          },
        };
      }

      let orderBy: any = { createdAt: "desc" };
      if (options?.sort === "price-low") orderBy = { basePrice: "asc" };
      if (options?.sort === "price-high") orderBy = { basePrice: "desc" };
      if (options?.sort === "newest") orderBy = { createdAt: "desc" };

      const products = await prisma.product.findMany({
        where,
        include: {
          categories: { include: { category: true } },
          images: { orderBy: { displayOrder: "asc" } },
          variants: {
            include: {
              attributeValues: {
                include: { attributeValue: { include: { attribute: true } } },
              },
            },
          },
        },
        orderBy,
        take: options?.limit || 24,
      });

      if (products && products.length > 0) {
        return products.map((p) => ({
          id: p.id,
          name: p.name,
          slug: p.slug,
          sku: p.sku,
          modelNumber: p.modelNumber,
          basePrice: Number(p.basePrice),
          shortDescription: p.shortDescription,
          fullDescription: p.fullDescription,
          technicalSpecs: (p.technicalSpecs as any) || {},
          isFeatured: p.isFeatured,
          isNewArrival: p.isNewArrival,
          categories: p.categories.map((c) => c.category.name),
          categorySlugs: p.categories.map((c) => c.category.slug),
          images: p.images.map((img) => img.url),
          mainImage: p.images[0]?.url || p.variants[0]?.mainImage || "/images/arvano-icon.jpg",
          variants: p.variants.map((v) => ({
            id: v.id,
            sku: v.sku,
            regularPrice: Number(v.regularPrice),
            salePrice: v.salePrice ? Number(v.salePrice) : Number(v.regularPrice),
            stockQuantity: v.stockQuantity,
            mainImage: v.mainImage || p.images[0]?.url,
            images: v.images,
            attributes: v.attributeValues.reduce((acc: any, curr) => {
              acc[curr.attributeValue.attribute.name] = curr.attributeValue.value;
              return acc;
            }, {}),
          })),
        }));
      }
    } catch (error: any) {
      if (error?.code !== "ECONNREFUSED") {
        console.warn("Prisma query warning:", error?.message || error);
      }
    }
  }

  // Resilient fallback using verified catalog
  let list = INITIAL_PRODUCTS.map((p, idx) => ({
    id: `prod-fallback-${idx}`,
    name: p.name,
    slug: p.slug,
    sku: p.sku,
    modelNumber: p.modelNumber,
    basePrice: p.basePrice,
    shortDescription: p.shortDescription,
    fullDescription: p.fullDescription,
    technicalSpecs: p.technicalSpecs,
    isFeatured: p.isFeatured,
    isNewArrival: p.isNewArrival,
    categories: p.categorySlugs,
    categorySlugs: p.categorySlugs,
    images: p.variants[0]?.images || [],
    mainImage: p.variants[0]?.mainImage || "/images/arvano-icon.jpg",
    variants: p.variants.map((v, vIdx) => ({
      id: `var-fallback-${idx}-${vIdx}`,
      sku: v.sku,
      regularPrice: v.regularPrice,
      salePrice: v.salePrice,
      stockQuantity: v.stockQuantity,
      mainImage: v.mainImage,
      images: v.images,
      attributes: v.attributes,
    })),
  }));

  if (options?.category) {
    list = list.filter((p) => p.categorySlugs.includes(options.category!));
  }

  if (options?.isFeatured) {
    list = list.filter((p) => p.isFeatured);
  }

  if (options?.isNewArrival) {
    list = list.filter((p) => p.isNewArrival);
  }

  if (options?.search) {
    const q = options.search.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.modelNumber.toLowerCase().includes(q)
    );
  }

  if (options?.sort === "price-low") {
    list.sort((a, b) => a.basePrice - b.basePrice);
  } else if (options?.sort === "price-high") {
    list.sort((a, b) => b.basePrice - a.basePrice);
  }

  return list;
}

export async function getProductBySlug(slug: string) {
  const dbAvailable = await isDatabaseAvailable();

  if (dbAvailable) {
    try {
      const product = await prisma.product.findUnique({
        where: { slug },
        include: {
          categories: { include: { category: true } },
          images: { orderBy: { displayOrder: "asc" } },
          variants: {
            include: {
              attributeValues: {
                include: { attributeValue: { include: { attribute: true } } },
              },
            },
          },
        },
      });

      if (product) {
        return {
          id: product.id,
          name: product.name,
          slug: product.slug,
          sku: product.sku,
          modelNumber: product.modelNumber,
          basePrice: Number(product.basePrice),
          shortDescription: product.shortDescription,
          fullDescription: product.fullDescription,
          technicalSpecs: (product.technicalSpecs as any) || {},
          isFeatured: product.isFeatured,
          isNewArrival: product.isNewArrival,
          categories: product.categories.map((c) => c.category.name),
          categorySlugs: product.categories.map((c) => c.category.slug),
          images: product.images.map((img) => img.url),
          mainImage: product.images[0]?.url || product.variants[0]?.mainImage || "/images/arvano-icon.jpg",
          variants: product.variants.map((v) => ({
            id: v.id,
            sku: v.sku,
            regularPrice: Number(v.regularPrice),
            salePrice: v.salePrice ? Number(v.salePrice) : Number(v.regularPrice),
            stockQuantity: v.stockQuantity,
            mainImage: v.mainImage || product.images[0]?.url,
            images: v.images,
            attributes: v.attributeValues.reduce((acc: any, curr) => {
              acc[curr.attributeValue.attribute.name] = curr.attributeValue.value;
              return acc;
            }, {}),
          })),
        };
      }
    } catch (error: any) {
      if (error?.code !== "ECONNREFUSED") {
        console.warn("Product lookup warning:", error?.message || error);
      }
    }
  }

  // Fallback
  const found = INITIAL_PRODUCTS.find((p) => p.slug === slug);
  if (!found) return null;

  return {
    id: `prod-fallback-${found.slug}`,
    name: found.name,
    slug: found.slug,
    sku: found.sku,
    modelNumber: found.modelNumber,
    basePrice: found.basePrice,
    shortDescription: found.shortDescription,
    fullDescription: found.fullDescription,
    technicalSpecs: found.technicalSpecs,
    isFeatured: found.isFeatured,
    isNewArrival: found.isNewArrival,
    categories: found.categorySlugs,
    categorySlugs: found.categorySlugs,
    images: found.variants[0]?.images || [],
    mainImage: found.variants[0]?.mainImage || "/images/arvano-icon.jpg",
    variants: found.variants.map((v, idx) => ({
      id: `var-fallback-${idx}`,
      sku: v.sku,
      regularPrice: v.regularPrice,
      salePrice: v.salePrice,
      stockQuantity: v.stockQuantity,
      mainImage: v.mainImage,
      images: v.images,
      attributes: v.attributes,
    })),
  };
}

export async function getCategories() {
  const dbAvailable = await isDatabaseAvailable();

  if (dbAvailable) {
    try {
      const categories = await prisma.category.findMany({
        where: { isActive: true },
        orderBy: { displayOrder: "asc" },
        include: {
          _count: {
            select: { products: true },
          },
        },
      });

      if (categories && categories.length > 0) {
        return categories.map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          description: c.description,
          image: c.image || "/images/watches/rolex-submariner.jpg",
          count: c._count.products,
        }));
      }
    } catch (error: any) {
      if (error?.code !== "ECONNREFUSED") {
        console.warn("Category query warning:", error?.message || error);
      }
    }
  }

  return INITIAL_CATEGORIES.map((c, i) => ({
    id: `cat-fallback-${i}`,
    name: c.name,
    slug: c.slug,
    description: c.description,
    image: c.image,
    count: INITIAL_PRODUCTS.filter((p) => p.categorySlugs.includes(c.slug)).length,
  }));
}
