import React from "react";
import { notFound } from "next/navigation";
import { Header } from "@/components/storefront/header";
import { Footer } from "@/components/storefront/footer";
import { ProductDetailsClient } from "@/components/storefront/product-details-client";
import { getProductBySlug } from "@/services/product-service";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-charcoal text-ivory">
      <Header />
      <div className="bg-ivory text-primaryText flex-1">
        <ProductDetailsClient product={product as any} />
      </div>
      <Footer />
    </div>
  );
}
