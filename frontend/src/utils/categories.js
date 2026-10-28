// frontend/src/utils/categories.js

/**
 * Extracts and maps dynamic categories from the current item catalog.
 * Avoids hardcoding the specific category labels from external reference mockups.
 */

const CATEGORY_ASSETS = {
  "Furniture & Living": {
    icon: "🪑",
    image: "/images/chair_cozy_duo.jpg",
  },
  "Living Room": {
    icon: "🛋️",
    image: "/images/lifestyle_living_room.jpg",
  },
  "Dining & Bistro": {
    icon: "🍽️",
    image: "/images/table_lounge_dining.jpg",
  },
  "Electronics": {
    icon: "⚡",
    image: "/images/chair_black_relax.jpg",
  },
  "Sports & Outdoor": {
    icon: "🏕️",
    image: "/images/chair_softwood.jpg",
  },
  "Office & Study": {
    icon: "💼",
    image: "/images/table_elegant_brown.jpg",
  },
};

export function getDynamicCategories(items = []) {
  // Count items per category
  const counts = {};
  items.forEach((item) => {
    if (item.category) {
      counts[item.category] = (counts[item.category] || 0) + 1;
    }
  });

  const discovered = Object.keys(counts);

  // If items exist, use them
  let list = discovered.map((cat) => ({
    id: cat.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name: cat,
    count: `${counts[cat]} items`,
    icon: CATEGORY_ASSETS[cat]?.icon || "📦",
    image: items.find((i) => i.category === cat)?.image_url || CATEGORY_ASSETS[cat]?.image || "/images/chair_cozy_duo.jpg",
  }));

  // Ensure at least 6 categories exist for the 6-slot quick browsing row
  const baseDefaults = [
    { name: "Furniture & Living", icon: "🪑", image: "/images/chair_cozy_duo.jpg" },
    { name: "Living Room", icon: "🛋️", image: "/images/lifestyle_living_room.jpg" },
    { name: "Dining & Bistro", icon: "🍽️", image: "/images/table_lounge_dining.jpg" },
    { name: "Electronics", icon: "⚡", image: "/images/chair_black_relax.jpg" },
    { name: "Sports & Outdoor", icon: "🏕️", image: "/images/chair_softwood.jpg" },
    { name: "Office & Study", icon: "💼", image: "/images/table_elegant_brown.jpg" },
  ];

  for (const def of baseDefaults) {
    if (list.length >= 8) break;
    if (!list.some((c) => c.name.toLowerCase() === def.name.toLowerCase())) {
      list.push({
        id: def.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        name: def.name,
        count: "Available",
        icon: def.icon,
        image: def.image,
      });
    }
  }

  return list;
}
