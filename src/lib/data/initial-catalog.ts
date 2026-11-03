export interface InitialProductVariation {
  sku: string;
  regularPrice: number;
  salePrice: number;
  stockQuantity: number;
  mainImage: string;
  images: string[];
  attributes: { [key: string]: string };
}

export interface InitialProduct {
  name: string;
  slug: string;
  modelNumber: string;
  sku: string;
  categorySlugs: string[];
  shortDescription: string;
  fullDescription: string;
  isFeatured: boolean;
  isNewArrival: boolean;
  basePrice: number;
  technicalSpecs: {
    movement: string;
    caseMaterial: string;
    caseDiameter: string;
    caseThickness: string;
    glassType: string;
    waterResistance: string;
    strapMaterial: string;
    powerReserve?: string;
    warranty: string;
    boxContents: string;
  };
  variants: InitialProductVariation[];
}

export const INITIAL_CATEGORIES = [
  {
    name: "Men's Watches",
    slug: "mens-watches",
    description: "Commanding silhouettes engineered for authority, precision, and enduring presence.",
    image: "/images/watches/rolex-submariner.jpg",
    displayOrder: 1,
  },
  {
    name: "Automatic & Mechanical",
    slug: "automatic-watches",
    description: "Masterpieces of self-winding mechanical artistry with visible balance wheels and exhibition casebacks.",
    image: "/images/watches/automatic-movement.jpg",
    displayOrder: 2,
  },
  {
    name: "Chronograph Precision",
    slug: "chronograph-watches",
    description: "High-precision multi-dial timekeeping with tachymeter scales and tactile pushers.",
    image: "/images/watches/chronograph-speedmaster.jpg",
    displayOrder: 3,
  },
  {
    name: "Classic & Dress",
    slug: "classic-watches",
    description: "Ultra-slim profiles and refined sunray dials designed for formal attire and high-level occasions.",
    image: "/images/watches/classic-calatrava.jpg",
    displayOrder: 4,
  },
  {
    name: "Women's Collection",
    slug: "womens-watches",
    description: "Exquisite proportions, mother-of-pearl accents, and champagne gold bracelet architecture.",
    image: "/images/watches/classic-tank.jpg",
    displayOrder: 5,
  },
  {
    name: "Luxury Limited Edition",
    slug: "luxury-collection",
    description: "Individually numbered timepieces with sapphire crystals and hand-finished movement components.",
    image: "/images/watches/skeleton-watch.jpg",
    displayOrder: 6,
  },
];

export const INITIAL_PRODUCTS: InitialProduct[] = [
  {
    name: "ARVANO Chronos Tachymeter",
    slug: "arvano-chronos-tachymeter",
    modelNumber: "ARV-CR-901",
    sku: "ARV-CR-901-PARENT",
    categorySlugs: ["mens-watches", "chronograph-watches"],
    shortDescription: "A commanding 42mm masculine chronograph engineered with a high-contrast dial, precision sub-dials, and brushed stainless steel.",
    fullDescription: "The ARVANO Chronos represents the pinnacle of decisive horological design. Crafted with surgical grade 316L stainless steel, it features an anti-reflective sapphire crystal protecting three intricately textured chronograph sub-dials. The tachymeter bezel allows accurate velocity measurement, while the tactile pushers offer an authoritative mechanical response.",
    isFeatured: true,
    isNewArrival: true,
    basePrice: 18500,
    technicalSpecs: {
      movement: "Miyota OS20 Quartz Chronograph Movement",
      caseMaterial: "316L Solid Surgical Grade Stainless Steel",
      caseDiameter: "42 mm",
      caseThickness: "11.8 mm",
      glassType: "Scratch-Resistant Sapphire Crystal with AR Coating",
      waterResistance: "5 ATM (50 Meters / 165 Feet)",
      strapMaterial: "Solid Oyster-style Steel Link Bracelet / Italian Leather",
      warranty: "2 Years Official ARVANO Movement Warranty",
      boxContents: "ARVANO Luxury Matte Black Wooden Box, Warranty Card, Microfiber Cloth, Strap Adjustment Tool",
    },
    variants: [
      {
        sku: "ARV-CR-901-BS",
        regularPrice: 21500,
        salePrice: 18500,
        stockQuantity: 14,
        mainImage: "/images/watches/chronograph-speedmaster.jpg",
        images: [
          "/images/watches/chronograph-speedmaster.jpg",
          "/images/watches/navitimer-chronograph.jpg",
        ],
        attributes: {
          "Dial Colour": "Obsidian Black",
          "Strap Type": "316L Stainless Steel",
        },
      },
      {
        sku: "ARV-CR-901-BLS",
        regularPrice: 22500,
        salePrice: 19500,
        stockQuantity: 8,
        mainImage: "/images/watches/tag-heuer-monaco.jpg",
        images: [
          "/images/watches/tag-heuer-monaco.jpg",
        ],
        attributes: {
          "Dial Colour": "Midnight Navy",
          "Strap Type": "316L Stainless Steel",
        },
      },
      {
        sku: "ARV-CR-901-BL",
        regularPrice: 19800,
        salePrice: 17200,
        stockQuantity: 11,
        mainImage: "/images/watches/navitimer-chronograph.jpg",
        images: [
          "/images/watches/navitimer-chronograph.jpg",
        ],
        attributes: {
          "Dial Colour": "Obsidian Black",
          "Strap Type": "Italian Saddle Leather",
        },
      },
    ],
  },
  {
    name: "ARVANO Sovereign Automatic",
    slug: "arvano-sovereign-automatic",
    modelNumber: "ARV-SV-800",
    sku: "ARV-SV-800-PARENT",
    categorySlugs: ["mens-watches", "automatic-watches", "luxury-collection"],
    shortDescription: "An exceptional self-winding timepiece with an open-heart exhibition dial and champagne gold bezel architecture.",
    fullDescription: "The Sovereign Automatic is built for those who appreciate the living heartbeat of mechanical horology. Powered by 24 synthetic ruby jewels beating at 21,600 vibrations per hour, it harnesses your natural motion to maintain an uninterrupted 42-hour power reserve. The exhibition caseback allows admiring the decorated rotor and balance spring.",
    isFeatured: true,
    isNewArrival: true,
    basePrice: 28500,
    technicalSpecs: {
      movement: "Calibre ARV-8800 Self-Winding Automatic (24 Jewels)",
      caseMaterial: "316L Stainless Steel with Champagne Gold PVD Accent",
      caseDiameter: "41 mm",
      caseThickness: "12.4 mm",
      glassType: "Double-Domed Sapphire Crystal with Internal AR",
      waterResistance: "10 ATM (100 Meters / 330 Feet)",
      strapMaterial: "Solid Integrated Jubilee Bracelet with Deployant Clasp",
      powerReserve: "42 Hours",
      warranty: "2 Years Comprehensive International Movement Warranty",
      boxContents: "Handcrafted Luxury Presentation Box, Certificate of Authenticity, Metal Warranty Card",
    },
    variants: [
      {
        sku: "ARV-SV-800-EG",
        regularPrice: 32000,
        salePrice: 28500,
        stockQuantity: 6,
        mainImage: "/images/watches/rolex-datejust-two-tone.jpg",
        images: [
          "/images/watches/rolex-datejust-two-tone.jpg",
          "/images/watches/automatic-movement.jpg",
        ],
        attributes: {
          "Dial Colour": "Sunburst Emerald",
          "Case Finish": "Champagne Gold & Steel",
        },
      },
      {
        sku: "ARV-SV-800-OG",
        regularPrice: 31500,
        salePrice: 27900,
        stockQuantity: 9,
        mainImage: "/images/watches/rolex-submariner.jpg",
        images: [
          "/images/watches/rolex-submariner.jpg",
          "/images/watches/automatic-movement.jpg",
        ],
        attributes: {
          "Dial Colour": "Obsidian Black",
          "Case Finish": "All Champagne Gold",
        },
      },
    ],
  },
  {
    name: "ARVANO Phantom Skeleton",
    slug: "arvano-phantom-skeleton",
    modelNumber: "ARV-SK-770",
    sku: "ARV-SK-770-PARENT",
    categorySlugs: ["mens-watches", "automatic-watches", "luxury-collection"],
    shortDescription: "A bold, avant-garde mechanical timepiece revealing the complete gear train in gunmetal black and gold accents.",
    fullDescription: "Stripping away all non-essentials to expose pure mechanical power. The ARVANO Phantom Skeleton features a three-dimensional openwork dial revealing every gear, escapement wheel, and balance spring in action. With a brushed gunmetal ion finish and luminous hands, it makes a commanding wrist statement in boardroom or gala.",
    isFeatured: true,
    isNewArrival: false,
    basePrice: 34500,
    technicalSpecs: {
      movement: "Calibre ARV-Skeleton Mechanical Automatic (21 Jewels)",
      caseMaterial: "Ion-Plated Gunmetal 316L Stainless Steel",
      caseDiameter: "43 mm",
      caseThickness: "12.8 mm",
      glassType: "Chamfered Sapphire Crystal Front & Exhibition Caseback",
      waterResistance: "5 ATM (50 Meters)",
      strapMaterial: "Fluororubber Sport Strap / Gunmetal Steel Link",
      powerReserve: "40 Hours",
      warranty: "2 Years Movement Warranty",
      boxContents: "Matte Black Display Case, Warranty Documentation, Microfiber Cloth",
    },
    variants: [
      {
        sku: "ARV-SK-770-GM",
        regularPrice: 38000,
        salePrice: 34500,
        stockQuantity: 5,
        mainImage: "/images/watches/skeleton-watch.jpg",
        images: [
          "/images/watches/skeleton-watch.jpg",
          "/images/watches/mechanical-gears.jpg",
        ],
        attributes: {
          "Dial Colour": "Skeleton Gunmetal",
          "Strap Type": "Gunmetal Steel",
        },
      },
      {
        sku: "ARV-SK-770-GL",
        regularPrice: 36000,
        salePrice: 32500,
        stockQuantity: 4,
        mainImage: "/images/watches/mechanical-gears.jpg",
        images: [
          "/images/watches/mechanical-gears.jpg",
          "/images/watches/skeleton-watch.jpg",
        ],
        attributes: {
          "Dial Colour": "Skeleton Gunmetal",
          "Strap Type": "Perforated Racing Leather",
        },
      },
    ],
  },
  {
    name: "ARVANO Heritage Slim Dress",
    slug: "arvano-heritage-slim-dress",
    modelNumber: "ARV-HT-550",
    sku: "ARV-HT-550-PARENT",
    categorySlugs: ["mens-watches", "classic-watches"],
    shortDescription: "An ultra-slim 7.8mm dress watch featuring minimalist Roman indices, ivory sunray dial, and full-grain Italian calfskin.",
    fullDescription: "Understated excellence for the discerning gentleman. The Heritage Slim slips effortlessly beneath bespoke shirt cuffs. Hand-polished indices reflect ambient light with razor precision, driven by a high-torque Swiss Ronda quartz calibre engineered for decade-long reliability.",
    isFeatured: false,
    isNewArrival: true,
    basePrice: 14500,
    technicalSpecs: {
      movement: "Swiss Ronda Calibre 715 Slim Quartz",
      caseMaterial: "High-Polish 316L Stainless Steel",
      caseDiameter: "39 mm",
      caseThickness: "7.8 mm Ultra-Slim",
      glassType: "Flat Sapphire Crystal with Anti-Scratch Shield",
      waterResistance: "3 ATM (30 Meters)",
      strapMaterial: "Handcrafted Italian Calfskin with Butterfly Clasp",
      warranty: "2 Years Movement Warranty",
      boxContents: "Slim Travel Leather Pouch, Warranty Card, Manual",
    },
    variants: [
      {
        sku: "ARV-HT-550-IV",
        regularPrice: 16500,
        salePrice: 14500,
        stockQuantity: 20,
        mainImage: "/images/watches/classic-calatrava.jpg",
        images: [
          "/images/watches/classic-calatrava.jpg",
        ],
        attributes: {
          "Dial Colour": "Warm Ivory",
          "Strap Colour": "Cognac Brown Leather",
        },
      },
      {
        sku: "ARV-HT-550-BK",
        regularPrice: 16500,
        salePrice: 14500,
        stockQuantity: 18,
        mainImage: "/images/watches/cartier-santos.jpg",
        images: [
          "/images/watches/cartier-santos.jpg",
        ],
        attributes: {
          "Dial Colour": "Obsidian Black",
          "Strap Colour": "Midnight Black Leather",
        },
      },
    ],
  },
  {
    name: "ARVANO Stella Rose Edition",
    slug: "arvano-stella-rose-edition",
    modelNumber: "ARV-ST-400",
    sku: "ARV-ST-400-PARENT",
    categorySlugs: ["womens-watches", "luxury-collection"],
    shortDescription: "A graceful 34mm luxury timepiece with a mother-of-pearl dial, champagne gold accents, and a mesh bracelet.",
    fullDescription: "Embodying poise and feminine power. The ARVANO Stella features a genuine natural mother-of-pearl dial that shimmers subtly under changing light angles. Hand-set crystals at four quadrant hour markers lend a celestial elegance without overpowering the minimalist silhouette.",
    isFeatured: true,
    isNewArrival: false,
    basePrice: 16800,
    technicalSpecs: {
      movement: "Precision Japanese Quartz Calibre",
      caseMaterial: "316L Stainless Steel with Rose Gold PVD Plating",
      caseDiameter: "34 mm",
      caseThickness: "8.2 mm",
      glassType: "Hardened Sapphire-Coated Crystal",
      waterResistance: "3 ATM (30 Meters)",
      strapMaterial: "Interchangeable Milanese Mesh / Fine Leather",
      warranty: "2 Years Movement Warranty",
      boxContents: "ARVANO Rose Gold Presentation Box, Warranty Card",
    },
    variants: [
      {
        sku: "ARV-ST-400-RG",
        regularPrice: 19500,
        salePrice: 16800,
        stockQuantity: 12,
        mainImage: "/images/watches/classic-tank.jpg",
        images: [
          "/images/watches/classic-tank.jpg",
        ],
        attributes: {
          "Dial Colour": "Mother of Pearl",
          "Strap Type": "Rose Gold Milanese Mesh",
        },
      },
      {
        sku: "ARV-ST-400-RL",
        regularPrice: 18000,
        salePrice: 15500,
        stockQuantity: 10,
        mainImage: "/images/watches/classic-tank.jpg",
        images: [
          "/images/watches/classic-tank.jpg",
          "/images/watches/cartier-santos.jpg",
        ],
        attributes: {
          "Dial Colour": "Mother of Pearl",
          "Strap Type": "Blush Dusty Rose Leather",
        },
      },
    ],
  },
  {
    name: "ARVANO Reverso Dual-Facet Dress",
    slug: "arvano-reverso-dual-facet",
    modelNumber: "ARV-RV-620",
    sku: "ARV-RV-620-PARENT",
    categorySlugs: ["mens-watches", "classic-watches"],
    shortDescription: "An iconic Art Deco rectangular dress watch with an ingenious dual-face swiveling case, silver guilloché dial, and blued hands.",
    fullDescription: "Crafted for formal black-tie evenings and executive authority. The Reverso Dual-Facet features a hand-finished rectangular 316L case that smoothly pivots to protect the sapphire crystal or reveal a second bespoke engraved plate. Driven by a slender hand-wound mechanical movement.",
    isFeatured: true,
    isNewArrival: true,
    basePrice: 26500,
    technicalSpecs: {
      movement: "Calibre ARV-Handwound Slim Mechanical (21 Jewels)",
      caseMaterial: "316L Mirror-Polished Stainless Steel",
      caseDiameter: "27.4 mm x 42.9 mm Art Deco Rectangular",
      caseThickness: "8.5 mm Slim Profile",
      glassType: "Scratch-Resistant Sapphire Crystal",
      waterResistance: "3 ATM (30 Meters)",
      strapMaterial: "Full-Grain Italian Calfskin with Deployant Clasp",
      powerReserve: "44 Hours",
      warranty: "2 Years Movement Warranty",
      boxContents: "Handcrafted Luxury Leather Case, Warranty Card, Manual",
    },
    variants: [
      {
        sku: "ARV-RV-620-SL",
        regularPrice: 29500,
        salePrice: 26500,
        stockQuantity: 14,
        mainImage: "/images/watches/dress-reverso-classic.jpg",
        images: [
          "/images/watches/dress-reverso-classic.jpg",
          "/images/watches/cartier-santos.jpg",
        ],
        attributes: {
          "Dial Colour": "Silver Guilloché",
          "Strap Type": "Black Alligator-Grain Leather",
        },
      },
      {
        sku: "ARV-RV-620-GL",
        regularPrice: 31000,
        salePrice: 27800,
        stockQuantity: 9,
        mainImage: "/images/watches/dress-reverso-classic.jpg",
        images: [
          "/images/watches/dress-reverso-classic.jpg",
        ],
        attributes: {
          "Dial Colour": "Champagne Ivory",
          "Strap Type": "Cognac Brown Leather",
        },
      },
    ],
  },
  {
    name: "ARVANO Tangente Bauhaus Minimalist",
    slug: "arvano-tangente-minimalist",
    modelNumber: "ARV-TG-510",
    sku: "ARV-TG-510-PARENT",
    categorySlugs: ["mens-watches", "classic-watches"],
    shortDescription: "A pure German Bauhaus aesthetic 38mm dress watch with crisp typography, tempered blued hands, and ultra-flat bezel.",
    fullDescription: "Form strictly follows function. The Tangente Bauhaus Minimalist distills wrist elegance to its absolute essence. An expansive galvanized white silver-plated dial with stark modernist typography and pencil-thin blued steel hands offers instant, uncompromising legibility.",
    isFeatured: false,
    isNewArrival: true,
    basePrice: 17200,
    technicalSpecs: {
      movement: "High-Precision Swiss Ronda Calibre 1062 Slim Quartz",
      caseMaterial: "316L Surgical Grade Steel with Linear Lugs",
      caseDiameter: "38 mm",
      caseThickness: "6.9 mm Ultra-Flat",
      glassType: "Flat Anti-Reflective Sapphire Crystal",
      waterResistance: "3 ATM (30 Meters)",
      strapMaterial: "Smooth Horween Genuine Leather with Pin Buckle",
      warranty: "2 Years Movement Warranty",
      boxContents: "Minimalist Black Wooden Box, ARVANO Booklet, Microfiber Cloth",
    },
    variants: [
      {
        sku: "ARV-TG-510-SV",
        regularPrice: 19800,
        salePrice: 17200,
        stockQuantity: 16,
        mainImage: "/images/watches/dress-tangente-minimalist.jpg",
        images: [
          "/images/watches/dress-tangente-minimalist.jpg",
        ],
        attributes: {
          "Dial Colour": "Galvanized White",
          "Strap Type": "Horween Shell Cordovan Black",
        },
      },
      {
        sku: "ARV-TG-510-BL",
        regularPrice: 20500,
        salePrice: 18000,
        stockQuantity: 11,
        mainImage: "/images/watches/dress-tangente-minimalist.jpg",
        images: [
          "/images/watches/dress-tangente-minimalist.jpg",
        ],
        attributes: {
          "Dial Colour": "Midnight Navy",
          "Strap Type": "Dark Mahogany Brown Leather",
        },
      },
    ],
  },
  {
    name: "ARVANO Golden Ellipse Grand Classic",
    slug: "arvano-golden-ellipse",
    modelNumber: "ARV-EL-700",
    sku: "ARV-EL-700-PARENT",
    categorySlugs: ["mens-watches", "classic-watches", "luxury-collection"],
    shortDescription: "Governed by the Golden Ratio, featuring an elliptical 18K champagne gold PVD silhouette with sunburst cobalt dial.",
    fullDescription: "A masterclass in geometric harmony. Neither a circle nor a rectangle, the Golden Ellipse adheres to the divine proportion of 1:1.618. Its captivating sunburst dial plays with the light at every angle, accompanied by an integrated mesh bracelet or hand-stitched leather.",
    isFeatured: true,
    isNewArrival: false,
    basePrice: 29800,
    technicalSpecs: {
      movement: "Ultra-Thin Automatic Calibre ARV-Micro-Rotor",
      caseMaterial: "316L Steel with 18K Champagne Gold PVD Finish",
      caseDiameter: "34.5 mm x 39.5 mm Elliptical Cushion",
      caseThickness: "7.2 mm",
      glassType: "Curved Sapphire Crystal with Anti-Glare Coating",
      waterResistance: "3 ATM (30 Meters)",
      strapMaterial: "Hand-Stitched Italian Leather / Integrated Milanese Mesh",
      powerReserve: "40 Hours",
      warranty: "2 Years Comprehensive Warranty",
      boxContents: "Lacquered Wooden Atelier Box, Certificate of Authenticity",
    },
    variants: [
      {
        sku: "ARV-EL-700-BL",
        regularPrice: 34000,
        salePrice: 29800,
        stockQuantity: 8,
        mainImage: "/images/watches/dress-golden-ellipse.jpg",
        images: [
          "/images/watches/dress-golden-ellipse.jpg",
        ],
        attributes: {
          "Dial Colour": "Sunburst Cobalt Blue",
          "Strap Type": "Navy Blue Alligator Leather",
        },
      },
      {
        sku: "ARV-EL-700-GD",
        regularPrice: 37000,
        salePrice: 32500,
        stockQuantity: 6,
        mainImage: "/images/watches/dress-golden-ellipse.jpg",
        images: [
          "/images/watches/dress-golden-ellipse.jpg",
        ],
        attributes: {
          "Dial Colour": "Champagne Sunray",
          "Strap Type": "18K Gold Milanese Mesh",
        },
      },
    ],
  },
  {
    name: "ARVANO Panthère Grace Two-Tone",
    slug: "arvano-panthere-grace",
    modelNumber: "ARV-PT-450",
    sku: "ARV-PT-450-PARENT",
    categorySlugs: ["womens-watches", "luxury-collection"],
    shortDescription: "A sublime square jewelry timepiece featuring fluid two-tone link bracelet, Roman numerals, and blue sapphire cabochon crown.",
    fullDescription: "The quintessential embodiment of modern feminine glamour. The ARVANO Panthère seamlessly doubles as an opulent piece of fine jewelry. Its ultra-flexible multi-link bracelet flows sensually across the wrist, while the mirror-polished bezel is secured with delicate gold decorative screws.",
    isFeatured: true,
    isNewArrival: true,
    basePrice: 21500,
    technicalSpecs: {
      movement: "Swiss Ronda Precision Slim Quartz",
      caseMaterial: "316L Steel with 18K Champagne Gold Accents",
      caseDiameter: "27 mm x 37 mm Square Dress",
      caseThickness: "6.5 mm Ultra-Slim",
      glassType: "Scratch-Proof Beveled Sapphire Crystal",
      waterResistance: "3 ATM (30 Meters)",
      strapMaterial: "Articulated Five-Row Two-Tone Fluid Link Bracelet",
      warranty: "2 Years Movement Warranty",
      boxContents: "Signature ARVANO Velvet Presentation Case, Guarantee Card",
    },
    variants: [
      {
        sku: "ARV-PT-450-TT",
        regularPrice: 24500,
        salePrice: 21500,
        stockQuantity: 15,
        mainImage: "/images/watches/women-panthere-two-tone.jpg",
        images: [
          "/images/watches/women-panthere-two-tone.jpg",
        ],
        attributes: {
          "Dial Colour": "Silver Guilloché",
          "Strap Type": "Two-Tone Gold & Steel Bracelet",
        },
      },
      {
        sku: "ARV-PT-450-SS",
        regularPrice: 22000,
        salePrice: 19500,
        stockQuantity: 12,
        mainImage: "/images/watches/women-panthere-two-tone.jpg",
        images: [
          "/images/watches/women-panthere-two-tone.jpg",
        ],
        attributes: {
          "Dial Colour": "Silver Guilloché",
          "Strap Type": "High-Polish 316L Steel Bracelet",
        },
      },
    ],
  },
  {
    name: "ARVANO Constellation Diamond Edition",
    slug: "arvano-constellation-diamond",
    modelNumber: "ARV-CN-480",
    sku: "ARV-CN-480-PARENT",
    categorySlugs: ["womens-watches", "luxury-collection"],
    shortDescription: "Brilliant pavé crystal bezel framing an iridescent mother-of-pearl dial with iconic side claws and star insignia.",
    fullDescription: "Celestial radiance for the wrist. The Constellation Diamond Edition is distinguished by its famous horizontal case claws and a diamond-encrusted bezel reflecting light with prismatic fire. The genuine mother-of-pearl dial is graced with hand-applied diamond hour markers and luminous sword hands.",
    isFeatured: true,
    isNewArrival: false,
    basePrice: 24800,
    technicalSpecs: {
      movement: "Precision Swiss Quartz Calibre",
      caseMaterial: "316L Stainless Steel with Synthetic Diamond Pavé Bezel",
      caseDiameter: "29 mm",
      caseThickness: "8.1 mm",
      glassType: "Domed Sapphire Crystal with Dual-Side AR",
      waterResistance: "5 ATM (50 Meters)",
      strapMaterial: "Mono-Rang Integrated Steel Bracelet with Butterfly Clasp",
      warranty: "2 Years Movement Warranty",
      boxContents: "Luxury ARVANO Jewel Box, Certificate of Authenticity",
    },
    variants: [
      {
        sku: "ARV-CN-480-ST",
        regularPrice: 28500,
        salePrice: 24800,
        stockQuantity: 10,
        mainImage: "/images/watches/women-diamond-constellation.jpg",
        images: [
          "/images/watches/women-diamond-constellation.jpg",
        ],
        attributes: {
          "Dial Colour": "White Mother of Pearl",
          "Strap Type": "Integrated 316L Steel Link",
        },
      },
      {
        sku: "ARV-CN-480-RG",
        regularPrice: 31000,
        salePrice: 26500,
        stockQuantity: 7,
        mainImage: "/images/watches/women-diamond-constellation.jpg",
        images: [
          "/images/watches/women-diamond-constellation.jpg",
        ],
        attributes: {
          "Dial Colour": "Blush Rose Mother of Pearl",
          "Strap Type": "Rose Gold & Steel Two-Tone",
        },
      },
    ],
  },
  {
    name: "ARVANO Aurora Sovereign Gold",
    slug: "arvano-aurora-sovereign",
    modelNumber: "ARV-AU-490",
    sku: "ARV-AU-490-PARENT",
    categorySlugs: ["womens-watches", "luxury-collection"],
    shortDescription: "An exquisite Haute Joaillerie gold mesh bracelet watch with champagne sunray dial and seamless jewelry clasp.",
    fullDescription: "Crafted as an heirloom masterpiece. The Aurora Sovereign Gold features a continuous woven gold bracelet inspired by vintage Genevan goldsmith ateliers. Delicate hour batons and a pure minimalist face lend unmatched sophistication to galas and wedding celebrations.",
    isFeatured: false,
    isNewArrival: true,
    basePrice: 27500,
    technicalSpecs: {
      movement: "Ultra-Thin Calibre Quartz",
      caseMaterial: "316L Stainless Steel with Heavy 18K Gold PVD",
      caseDiameter: "28 mm Petite Silhouette",
      caseThickness: "6.8 mm",
      glassType: "Flat Sapphire Crystal",
      waterResistance: "3 ATM (30 Meters)",
      strapMaterial: "Fine Intricate Woven Gold Mesh Bracelet",
      warranty: "2 Years International Movement Warranty",
      boxContents: "Handcrafted Luxury Presentation Box, Certificate of Authenticity",
    },
    variants: [
      {
        sku: "ARV-AU-490-YG",
        regularPrice: 32000,
        salePrice: 27500,
        stockQuantity: 8,
        mainImage: "/images/watches/women-aurora-gold.jpg",
        images: [
          "/images/watches/women-aurora-gold.jpg",
        ],
        attributes: {
          "Dial Colour": "Champagne Sunray",
          "Strap Type": "Intricate Woven 18K Gold Bracelet",
        },
      },
      {
        sku: "ARV-AU-490-RG",
        regularPrice: 32000,
        salePrice: 27500,
        stockQuantity: 6,
        mainImage: "/images/watches/women-aurora-gold.jpg",
        images: [
          "/images/watches/women-aurora-gold.jpg",
        ],
        attributes: {
          "Dial Colour": "Frosted Silver",
          "Strap Type": "Intricate Woven Rose Gold Bracelet",
        },
      },
    ],
  },
];

export const INITIAL_PAYMENT_CONFIGS = [
  {
    methodKey: "COD",
    displayName: "Cash on Delivery (ক্যাশ অন ডেলিভারি)",
    instructions: "Pay with cash when your luxury parcel arrives at your doorstep. For orders outside Dhaka, an advance courier confirmation fee may be required.",
    requiresTransactionId: false,
    requiresSenderNumber: false,
    isActive: true,
    displayOrder: 1,
    minAdvanceFee: 150,
  },
  {
    methodKey: "BKASH",
    displayName: "bKash (বিকাশ সেন্ড মানি)",
    accountNumber: "01711-234567 (Personal)",
    instructions: "1. Go to your bKash app and select 'Send Money'.\n2. Send the exact order amount to the bKash number shown above.\n3. Enter your Order Number as the Reference.\n4. Copy the Transaction ID (TrxID) and enter it below.",
    requiresTransactionId: true,
    requiresSenderNumber: true,
    isActive: true,
    displayOrder: 2,
    minAdvanceFee: null,
  },
  {
    methodKey: "NAGAD",
    displayName: "Nagad (নগদ সেন্ড মানি)",
    accountNumber: "01811-234567 (Personal)",
    instructions: "1. Open your Nagad App or dial *167#.\n2. Choose 'Send Money' to the Nagad number above.\n3. Put your Order Number in the Reference field.\n4. Submit your 8-digit Transaction ID below.",
    requiresTransactionId: true,
    requiresSenderNumber: true,
    isActive: true,
    displayOrder: 3,
    minAdvanceFee: null,
  },
  {
    methodKey: "ROCKET",
    displayName: "Rocket (রকেট সেন্ড মানি)",
    accountNumber: "01911-234567-8 (Personal)",
    instructions: "1. Go to Rocket app or dial *322#.\n2. Select 'Send Money' to the Rocket number above.\n3. Input the Transaction ID and sender number below.",
    requiresTransactionId: true,
    requiresSenderNumber: true,
    isActive: true,
    displayOrder: 4,
    minAdvanceFee: null,
  },
  {
    methodKey: "BANK_TRANSFER",
    displayName: "Direct Bank Transfer (ব্যাংক ডিপোজিট)",
    accountNumber: "Account Name: ARVANO Horology BD\nAccount No: 1501204899001\nBank: City Bank PLC (Gulshan Branch)\nRouting: 225272654",
    instructions: "Transfer the grand total via BEFTN, NPSB, or direct cash deposit. Enter the Deposit Slip / Reference Number below.",
    requiresTransactionId: true,
    requiresSenderNumber: false,
    isActive: true,
    displayOrder: 5,
    minAdvanceFee: null,
  },
  {
    methodKey: "MANUAL",
    displayName: "Manual / Custom Payment",
    instructions: "Please contact our concierge team at concierge@arvano.com or +880 1700-000000 for bespoke payment arrangements.",
    requiresTransactionId: true,
    requiresSenderNumber: false,
    isActive: false,
    displayOrder: 6,
    minAdvanceFee: null,
  },
];
