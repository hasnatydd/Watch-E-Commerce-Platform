"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Compass, ShieldCheck } from "lucide-react";

interface HeroSlide {
  id: string;
  badge: string;
  title: string;
  highlight: string;
  tagline: string;
  description: string;
  image: string;
  price: string;
  productSlug: string;
  specs: { label: string; value: string }[];
}

const SLIDES: HeroSlide[] = [
  {
    id: "chronos",
    badge: "PRECISION CHRONOGRAPH SERIES",
    title: "TIME, DEFINED BY",
    highlight: "CHARACTER.",
    tagline: "ARVANO CHRONOS TACHYMETER",
    description:
      "A commanding 42mm masculine silhouette engineered with surgical 316L stainless steel, triple sapphire sub-dials, and high-precision velocity tachymeter.",
    image: "/images/watches/chronograph-speedmaster.jpg",
    price: "৳ 18,500",
    productSlug: "arvano-chronos-tachymeter",
    specs: [
      { label: "Case Material", value: "316L Steel" },
      { label: "Glass", value: "Sapphire AR" },
      { label: "Water Resistance", value: "5 ATM (50m)" },
    ],
  },
  {
    id: "skeleton",
    badge: "HAUTE HORLOGERIE ATELIER",
    title: "PURE MECHANICAL",
    highlight: "DOMINANCE.",
    tagline: "ARVANO PHANTOM SKELETON",
    description:
      "Avant-garde openwork architecture exposing every gear wheel, balance spring, and synthetic ruby jewel in gunmetal black and champagne gold.",
    image: "/images/watches/skeleton-watch.jpg",
    price: "৳ 34,500",
    productSlug: "arvano-phantom-skeleton",
    specs: [
      { label: "Movement", value: "21-Jewel Automatic" },
      { label: "Case", value: "Gunmetal Ion" },
      { label: "Reserve", value: "40 Hours" },
    ],
  },
  {
    id: "sovereign",
    badge: "AUTOMATIC MASTERPIECE",
    title: "THE HEARTBEAT OF",
    highlight: "HOROLOGY.",
    tagline: "ARVANO SOVEREIGN AUTOMATIC",
    description:
      "Powered by your motion with 42-hour kinetic power reserve, sunburst dial, two-tone jubilee architecture, and exhibition exhibition caseback.",
    image: "/images/watches/rolex-datejust-two-tone.jpg",
    price: "৳ 28,500",
    productSlug: "arvano-sovereign-automatic",
    specs: [
      { label: "Power Reserve", value: "42 Hours" },
      { label: "Bracelet", value: "Two-Tone Jubilee" },
      { label: "Depth Rating", value: "10 ATM (100m)" },
    ],
  },
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const slide = SLIDES[current];

  return (
    <section
      className="relative min-h-[85vh] sm:min-h-[90vh] bg-charcoal overflow-hidden border-b border-ivory/10 flex items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides with Cross-Fade */}
      {SLIDES.map((s, index) => {
        const isActive = index === current;
        return (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-0" : "opacity-0 -z-10 pointer-events-none"
            }`}
          >
            <div className="relative w-full h-full">
              <Image
                src={s.image}
                alt={s.tagline}
                fill
                priority={index === 0}
                className="object-cover object-center scale-105 filter brightness-[0.42] contrast-[1.12]"
              />
              {/* Studio lighting vignette and gradients */}
              <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/85 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/50" />
            </div>
          </div>
        );
      })}

      {/* Main Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow Badge */}
            <div className="flex items-center space-x-3">
              <span className="h-px w-8 bg-gold" />
              <span className="text-[11px] uppercase tracking-ultra-wide text-gold font-medium">
                {slide.badge}
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-ivory leading-[1.1]">
              {slide.title} <span className="italic text-gold">{slide.highlight}</span>
            </h1>

            {/* Model Tagline & Price */}
            <div className="flex items-center gap-4 pt-1">
              <span className="text-sm uppercase tracking-luxury text-ivory/90 font-medium">
                {slide.tagline}
              </span>
              <span className="h-3 w-px bg-gold/50" />
              <span className="text-sm font-semibold text-gold tracking-wide">
                {slide.price}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-ivory/80 leading-relaxed font-light max-w-xl">
              {slide.description}
            </p>

            {/* Action CTAs */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href={`/product/${slide.productSlug}`}
                className="inline-flex items-center justify-center gap-3 bg-gold hover:bg-gold-hover text-charcoal px-8 py-4 text-xs font-bold uppercase tracking-luxury transition-all duration-300 shadow-gold-glow group"
              >
                VIEW TIMEPIECE
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 border border-ivory/30 hover:border-gold text-ivory hover:text-gold px-8 py-4 text-xs font-semibold uppercase tracking-luxury transition-colors duration-300 bg-charcoal/40 backdrop-blur-sm"
              >
                <Compass className="w-4 h-4 text-gold" />
                EXPLORE CATALOG
              </Link>
            </div>

            {/* Micro Specs Bar */}
            <div className="pt-6 border-t border-ivory/15 grid grid-cols-3 gap-6 text-xs max-w-md">
              {slide.specs.map((spec, i) => (
                <div key={i}>
                  <div className="text-gold font-serif text-base">{spec.value}</div>
                  <div className="text-ivory/50 text-[10px] uppercase tracking-wider">{spec.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Floating Luxury Watch Preview Badge */}
          <div className="hidden lg:flex lg:col-span-5 justify-end">
            <Link
              href={`/product/${slide.productSlug}`}
              className="group relative w-80 h-96 bg-charcoal-deep/90 border border-gold/40 p-3 shadow-2xl backdrop-blur-md transition-all duration-500 hover:border-gold hover:scale-102"
            >
              <div className="relative w-full h-full overflow-hidden border border-ivory/10">
                <Image
                  src={slide.image}
                  alt={slide.tagline}
                  fill
                  className="object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-[10px] uppercase tracking-ultra-wide text-gold">FEATURED MODEL</div>
                  <div className="font-serif text-lg text-ivory">{slide.tagline}</div>
                  <div className="text-xs text-gold font-semibold mt-0.5">{slide.price}</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Carousel Navigation Controls */}
      <div className="absolute bottom-6 right-6 sm:right-12 z-20 flex items-center gap-3">
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="w-10 h-10 border border-ivory/30 bg-charcoal/60 hover:border-gold hover:text-gold text-ivory flex items-center justify-center backdrop-blur-sm transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Slide Indicators */}
        <div className="flex items-center gap-2 px-2">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                idx === current ? "w-8 bg-gold" : "w-2 bg-ivory/30 hover:bg-ivory/60"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="w-10 h-10 border border-ivory/30 bg-charcoal/60 hover:border-gold hover:text-gold text-ivory flex items-center justify-center backdrop-blur-sm transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
