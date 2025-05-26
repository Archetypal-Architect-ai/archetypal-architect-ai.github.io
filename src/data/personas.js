export const personas = [
  {
    id: "architect",
    name: "The Architect",
    title: "Systems Designer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    bio: "Building the frameworks that power tomorrow's digital renaissance.",
    ethos: "Structure creates freedom. Every system is a canvas waiting for innovation.",
    colors: {
      primary: "architect-primary",
      secondary: "architect-secondary", 
      accent: "architect-accent"
    },
    contentTypes: ["technical-writing", "architecture", "frameworks"]
  },
  {
    id: "roxy",
    name: "Roxy",
    title: "Creative Rebel",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616c5bff5b1?w=150&h=150&fit=crop&crop=face",
    bio: "Disrupting convention through art, music, and unapologetic self-expression.",
    ethos: "Break the rules beautifully. Art is rebellion made manifest.",
    colors: {
      primary: "roxy-primary",
      secondary: "roxy-secondary",
      accent: "roxy-accent"
    },
    contentTypes: ["music", "art", "fashion", "lifestyle"]
  },
  {
    id: "sage",
    name: "The Sage",
    title: "Wisdom Keeper",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    bio: "Bridging ancient wisdom with modern insights for conscious living.",
    ethos: "Knowledge without wisdom is empty. Wisdom without action is meaningless.",
    colors: {
      primary: "sage-primary",
      secondary: "sage-secondary",
      accent: "sage-accent"
    },
    contentTypes: ["philosophy", "books", "meditation", "consciousness"]
  },
  {
    id: "rebel",
    name: "The Rebel",
    title: "Change Catalyst",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    bio: "Challenging systems, questioning authority, and igniting transformation.",
    ethos: "Comfort is the enemy of growth. Revolution begins with a single voice.",
    colors: {
      primary: "rebel-primary",
      secondary: "rebel-secondary",
      accent: "rebel-accent"
    },
    contentTypes: ["activism", "social-change", "politics", "revolution"]
  },
  {
    id: "mystic",
    name: "The Mystic",
    title: "Reality Weaver",
    avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
    bio: "Exploring the liminal spaces where science meets spirituality.",
    ethos: "Magic is just science we don't understand yet. Reality is far stranger than fiction.",
    colors: {
      primary: "mystic-primary",
      secondary: "mystic-secondary",
      accent: "mystic-accent"
    },
    contentTypes: ["esoteric", "quantum", "consciousness", "metaphysics"]
  }
];

export const getPersonaById = (id) => personas.find(p => p.id === id);
