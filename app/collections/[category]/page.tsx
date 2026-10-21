import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getCategories, getProductsByCategory, getProducts } from "../../../app/lib/products";
import CollectionGrid from "./CollectionGrid";
import Header from "../../../app/components/Header";
import Footer from "../../../app/components/Footer";
import WhatsApp from "../../../app/components/WhatsApp";

export function generateStaticParams() {
  return getCategories().map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata(
  props: PageProps<"/collections/[category]">
): Promise<Metadata> {
  const { category } = await props.params;
  const categories = getCategories();
  const current = categories.find((c) => c.slug === category);

  if (!current) {
    return {
      title: "Collection — Bespoke Luxurrele",
    };
  }

  return {
    title: `${current.title} — Bespoke Luxurrele`,
    description: current.description,
  };
}

export default async function CategoryPage(
  props: PageProps<"/collections/[category]">
) {
  const { category } = await props.params;
  const categories = getCategories();
  const currentCategory = categories.find((c) => c.slug === category);

  if (!currentCategory) {
    notFound();
  }

  const products = getProductsByCategory(category);

  return (
    <>
      <Header />
      <main id="main" className="pt-24 sm:pt-28 lg:pt-32 pb-24 bg-white">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="mb-8 text-[11px] tracking-[0.2em] uppercase text-muted flex items-center gap-2 font-light"
          >
            <Link href="/" className="hover:text-dark transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/collections" className="hover:text-dark transition-colors">
              Collections
            </Link>
            <span>/</span>
            <span className="text-dark font-medium">{currentCategory.title}</span>
          </nav>

          {/* Collection Editorial Hero Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted mb-2.5">
              ✦ The Atelier Collection ✦
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-dark title-underline mb-4">
              {currentCategory.title}
            </h1>
            <p className="text-[13px] sm:text-[14px] text-muted font-light leading-relaxed max-w-2xl mx-auto pt-2">
              {currentCategory.description}
            </p>
          </div>

          {/* Interactive Collection Grid */}
          <CollectionGrid
            initialProducts={products}
            categories={categories}
            activeCategorySlug={category}
          />
        </div>
      </main>
      <Footer />
      <WhatsApp />
    </>
  );
}
