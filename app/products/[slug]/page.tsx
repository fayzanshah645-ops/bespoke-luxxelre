import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, getProducts, getProductsByCategory } from "../../lib/products";
import ProductDetail from "./ProductDetail";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import WhatsApp from "../../components/WhatsApp";

export function generateStaticParams() {
  return getProducts().map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata(props: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found — Bespoke Luxurrele",
    };
  }

  return {
    title: `${product.title} — Bespoke Luxurrele`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.title} | Bespoke Luxurrele`,
      description: product.description.slice(0, 160),
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductPage(props: PageProps<"/products/[slug]">) {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Get related products in same category or fallback to featured
  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <Header />
      <main id="main">
        <ProductDetail product={product} relatedProducts={relatedProducts} />
      </main>
      <Footer />
      <WhatsApp />
    </>
  );
}
