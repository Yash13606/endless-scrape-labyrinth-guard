
// Types for our fake content
export interface FakeProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  category: string;
  tags: string[];
  image: string;
  stock: number;
  seller: string;
  createdAt: string;
}

export interface FakeUser {
  id: string;
  username: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  joinDate: string;
  lastActive: string;
  location: string;
  followers: number;
  following: number;
}

export interface FakeReview {
  id: string;
  productId: string;
  userId: string;
  username: string;
  avatar: string;
  rating: number;
  title: string;
  content: string;
  createdAt: string;
  likes: number;
  verified: boolean;
}

// Helper functions to generate random data
const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomFloat = (min: number, max: number, decimals: number = 2): number => {
  const rand = Math.random() * (max - min) + min;
  const power = Math.pow(10, decimals);
  return Math.round(rand * power) / power;
};

const randomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const randomElements = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const randomDate = (start: Date, end: Date): string => {
  const randomTimestamp = start.getTime() + Math.random() * (end.getTime() - start.getTime());
  return new Date(randomTimestamp).toISOString();
};

const randomBoolean = (trueChance: number = 0.5): boolean => {
  return Math.random() < trueChance;
};

// Seed data for generating content
const productNamePrefixes = [
  "Ultra", "Pro", "Elite", "Premium", "Deluxe", "Advanced", "Smart", "Superior",
  "Eco", "Max", "Super", "Hyper", "Mega", "Power", "Turbo", "Extreme"
];

const productNameRoots = [
  "Tech", "Gadget", "Device", "Widget", "Tool", "System", "Machine", "Appliance",
  "Manager", "Assistant", "Helper", "Companion", "Master", "Wizard", "Guru", "Expert"
];

const productNameSuffixes = [
  "3000", "X", "Plus", "Pro", "Max", "Ultra", "Elite", "Prime", "SE", "XL", "Mini",
  "Lite", "Alpha", "Zero", "One", "360", "720", "1080", "4K", "8K", "AI", "ML", "IoT"
];

const productCategories = [
  "Electronics", "Home & Kitchen", "Office", "Sports & Outdoors", "Beauty & Personal Care",
  "Health & Wellness", "Toys & Games", "Automotive", "Pet Supplies", "Fashion", "Books",
  "Music", "Movies", "Food & Beverages", "Garden & Outdoor", "Art & Crafts"
];

const productTags = [
  "New", "Bestseller", "Limited Edition", "Exclusive", "Sale", "Trending", "Popular",
  "Handmade", "Organic", "Eco-friendly", "Sustainable", "Luxury", "Budget", "Portable",
  "Wireless", "Smart", "Customizable", "Waterproof", "Durable", "Lightweight", "Compact",
  "Professional", "Beginner", "All-in-one", "Multifunctional", "Space-saving", "Energy-efficient"
];

const reviewTitles = [
  "Great product!", "Worth every penny", "Not what I expected", "Don't waste your money",
  "Exceeded expectations", "Perfect for my needs", "Could be better", "Amazing value",
  "Life-changing", "Disappointing quality", "Exactly as described", "Better than advertised",
  "Highly recommend", "Would buy again", "Save your money", "Game changer"
];

const firstNames = [
  "James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda",
  "William", "Elizabeth", "David", "Susan", "Richard", "Jessica", "Joseph", "Sarah",
  "Thomas", "Karen", "Charles", "Nancy", "Christopher", "Lisa", "Daniel", "Margaret"
];

const lastNames = [
  "Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson",
  "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin",
  "Thompson", "Garcia", "Martinez", "Robinson", "Clark", "Rodriguez", "Lewis", "Lee"
];

const locations = [
  "New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Phoenix, AZ",
  "Philadelphia, PA", "San Antonio, TX", "San Diego, CA", "Dallas, TX", "San Jose, CA",
  "Austin, TX", "Jacksonville, FL", "Fort Worth, TX", "Columbus, OH", "San Francisco, CA",
  "Charlotte, NC", "Indianapolis, IN", "Seattle, WA", "Denver, CO", "Washington, DC"
];

const loremIpsum = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
  "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
  "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis.",
  "Et harum quidem rerum facilis est et expedita distinctio.",
  "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil.",
  "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus.",
  "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis."
];

// Generate a random paragraph
const generateParagraph = (sentenceCount: number = 5): string => {
  const sentences = randomElements(loremIpsum, sentenceCount);
  return sentences.join(" ");
};

// Generate a random product description
const generateProductDescription = (): string => {
  const paragraphCount = randomInt(1, 3);
  const paragraphs = [];
  
  for (let i = 0; i < paragraphCount; i++) {
    paragraphs.push(generateParagraph(randomInt(3, 8)));
  }
  
  return paragraphs.join("\n\n");
};

// Generate a random product name
const generateProductName = (): string => {
  const usesPrefix = randomBoolean(0.7);
  const usesSuffix = randomBoolean(0.8);
  
  let name = "";
  
  if (usesPrefix) {
    name += randomElement(productNamePrefixes) + " ";
  }
  
  name += randomElement(productNameRoots);
  
  if (usesSuffix) {
    name += " " + randomElement(productNameSuffixes);
  }
  
  return name;
};

// Generate a random username
const generateUsername = (firstName: string, lastName: string): string => {
  const patterns = [
    () => firstName.toLowerCase() + randomInt(1, 999),
    () => firstName.toLowerCase() + lastName.toLowerCase(),
    () => firstName.charAt(0).toLowerCase() + lastName.toLowerCase(),
    () => firstName.toLowerCase() + "_" + lastName.toLowerCase(),
    () => lastName.toLowerCase() + firstName.charAt(0).toLowerCase() + randomInt(1, 99)
  ];
  
  return randomElement(patterns)();
};

// Generate a random email based on name
const generateEmail = (firstName: string, lastName: string): string => {
  const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "icloud.com", "example.com"];
  const separators = ["", ".", "_", "-"];
  
  const username = firstName.toLowerCase() + randomElement(separators) + lastName.toLowerCase();
  const domain = randomElement(domains);
  
  return `${username}@${domain}`;
};

// Generate a fake product
export const generateProduct = (forceId?: string): FakeProduct => {
  const id = forceId || `prod-${Math.random().toString(36).substring(2, 10)}`;
  const name = generateProductName();
  const description = generateProductDescription();
  const price = randomFloat(9.99, 999.99);
  const hasDiscount = randomBoolean(0.3);
  const originalPrice = hasDiscount ? price * randomFloat(1.1, 1.5) : undefined;
  const category = randomElement(productCategories);
  const tags = randomElements(productTags, randomInt(1, 5));
  const rating = randomFloat(2.5, 5.0);
  const reviewCount = randomInt(0, 5000);
  const stock = randomInt(0, 1000);
  const imageId = randomInt(1, 10);
  
  // For simplicity, we'll use placeholder images
  const image = `https://placehold.co/400x400/3B82F6/FFFFFF.png?text=Product+${id}`;
  
  // Generate a seller name
  const firstName = randomElement(firstNames);
  const lastName = randomElement(lastNames);
  const seller = `${firstName} ${lastName}`;
  
  // Create a date within the last 2 years
  const now = new Date();
  const twoYearsAgo = new Date();
  twoYearsAgo.setFullYear(now.getFullYear() - 2);
  const createdAt = randomDate(twoYearsAgo, now);
  
  return {
    id,
    name,
    description,
    price,
    originalPrice,
    rating,
    reviewCount,
    category,
    tags,
    image,
    stock,
    seller,
    createdAt
  };
};

// Generate a fake user
export const generateUser = (forceId?: string): FakeUser => {
  const id = forceId || `user-${Math.random().toString(36).substring(2, 10)}`;
  const firstName = randomElement(firstNames);
  const lastName = randomElement(lastNames);
  const name = `${firstName} ${lastName}`;
  const username = generateUsername(firstName, lastName);
  const email = generateEmail(firstName, lastName);
  const bio = generateParagraph(randomInt(1, 3));
  const location = randomElement(locations);
  const followers = randomInt(0, 10000);
  const following = randomInt(0, 1000);
  
  // Create join date between 1-5 years ago
  const now = new Date();
  const fiveYearsAgo = new Date();
  fiveYearsAgo.setFullYear(now.getFullYear() - 5);
  const joinDate = randomDate(fiveYearsAgo, new Date(now.getFullYear() - 1, 0, 1));
  
  // Last active date between join date and now
  const lastActive = randomDate(new Date(joinDate), now);
  
  // Avatar placeholder
  const avatar = `https://placehold.co/150x150/6366F1/FFFFFF.png?text=${firstName.charAt(0)}${lastName.charAt(0)}`;
  
  return {
    id,
    username,
    name,
    email,
    avatar,
    bio,
    joinDate,
    lastActive,
    location,
    followers,
    following
  };
};

// Generate a fake review for a product
export const generateReview = (productId: string): FakeReview => {
  const id = `review-${Math.random().toString(36).substring(2, 10)}`;
  const user = generateUser();
  const rating = randomInt(1, 5);
  const title = randomElement(reviewTitles);
  const content = generateParagraph(randomInt(1, 5));
  const likes = randomInt(0, 100);
  const verified = randomBoolean(0.7);
  
  // Create a date within the last year
  const now = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(now.getFullYear() - 1);
  const createdAt = randomDate(oneYearAgo, now);
  
  return {
    id,
    productId,
    userId: user.id,
    username: user.username,
    avatar: user.avatar,
    rating,
    title,
    content,
    createdAt,
    likes,
    verified
  };
};

// Generate multiple products
export const generateProducts = (count: number): FakeProduct[] => {
  const products: FakeProduct[] = [];
  
  for (let i = 0; i < count; i++) {
    products.push(generateProduct());
  }
  
  return products;
};

// Generate multiple reviews for a product
export const generateReviews = (productId: string, count: number): FakeReview[] => {
  const reviews: FakeReview[] = [];
  
  for (let i = 0; i < count; i++) {
    reviews.push(generateReview(productId));
  }
  
  return reviews;
};

// Generate a unique product based on ID
export const generateProductById = (id: string): FakeProduct => {
  // Use the ID as a seed to ensure consistency
  return generateProduct(id);
};
