export const contentItems = [
  {
    id: "quantum-manifesto",
    title: "The Quantum Manifesto",
    type: "book",
    persona: "mystic",
    description: "A deep dive into the intersection of quantum physics and consciousness, exploring how observation shapes reality.",
    thumbnail: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
    status: "available",
    price: 24.99,
    tags: ["consciousness", "quantum-physics", "philosophy"]
  },
  {
    id: "neon-dreams",
    title: "Neon Dreams",
    type: "music",
    persona: "roxy", 
    description: "An electrifying album that blends synthwave with rebellious lyrics, perfect for late-night city drives.",
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    status: "streaming",
    duration: "42:18",
    tags: ["synthwave", "electronic", "rebellion"]
  },
  {
    id: "system-architecture-patterns",
    title: "Modern System Architecture Patterns",
    type: "video",
    persona: "architect",
    description: "A comprehensive guide to designing scalable, maintainable systems in the age of microservices and cloud computing.",
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop",
    status: "available",
    duration: "3:45:22",
    tags: ["architecture", "systems", "engineering"]
  },
  {
    id: "conscious-consumption",
    title: "The Art of Conscious Consumption",
    type: "blog",
    persona: "sage",
    description: "Exploring how mindful choices in what we consume - media, food, energy - shapes our reality and the world around us.",
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
    status: "published",
    readTime: "8 min read",
    tags: ["mindfulness", "sustainability", "philosophy"]
  },
  {
    id: "revolution-starter-kit",
    title: "Revolution Starter Kit",
    type: "merch",
    persona: "rebel",
    description: "Everything you need to start your own peaceful revolution - from organizing tools to consciousness-raising materials.",
    thumbnail: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
    status: "available",
    price: 89.99,
    tags: ["activism", "tools", "revolution"]
  },
  {
    id: "digital-detox-guide",
    title: "The Digital Detox Blueprint",
    type: "book",
    persona: "sage",
    description: "A practical guide to reclaiming your attention and finding peace in our hyperconnected world.",
    thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
    status: "available",
    price: 19.99,
    tags: ["digital-wellness", "mindfulness", "productivity"]
  }
];

export const getContentByPersona = (personaId) => 
  contentItems.filter(item => item.persona === personaId);

export const getContentByType = (type) => 
  contentItems.filter(item => item.type === type);

export const getLatestContent = (limit = 6) => 
  contentItems.slice(0, limit);
