const LS = {
  USERS: "ps_users",
  PRODUCTS: "ps_products",
  DOCTORS: "ps_doctors",
  CONSULTS: "ps_consults",
};

export function uid(prefix = "id") {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
}

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/* USERS */
export function listUsers() {
  return load(LS.USERS, []);
}
export function upsertUser(user) {
  const all = listUsers();
  const idx = all.findIndex((u) => u.id === user.id);
  if (idx >= 0) all[idx] = user;
  else all.push(user);
  save(LS.USERS, all);
  return user;
}

/* PRODUCTS */
export function listProducts() {
  return load(LS.PRODUCTS, seedProducts());
}
export function getProduct(id) {
  return listProducts().find((p) => p.id === id);
}
export function upsertProduct(product) {
  const all = listProducts();
  const idx = all.findIndex((p) => p.id === product.id);
  if (idx >= 0) all[idx] = product;
  else all.push(product);
  save(LS.PRODUCTS, all);
  return product;
}
export function deleteProduct(id) {
  const all = listProducts().filter((p) => p.id !== id);
  save(LS.PRODUCTS, all);
}

/* DOCTORS */
export function listDoctors() {
  return load(LS.DOCTORS, seedDoctors());
}
export function getDoctorByUserId(userId) {
  return listDoctors().find((d) => d.userId === userId);
}
export function upsertDoctor(doctor) {
  const all = listDoctors();
  const idx = all.findIndex((d) => d.id === doctor.id);
  if (idx >= 0) all[idx] = doctor;
  else all.push(doctor);
  save(LS.DOCTORS, all);
  return doctor;
}

/* CONSULTS */
export function listConsults() {
  return load(LS.CONSULTS, []);
}
export function addConsult(consult) {
  const all = listConsults();
  all.unshift(consult);
  save(LS.CONSULTS, all);
  return consult;
}

/* Seeds */
function seedProducts() {
  return [
    {
      id: "p_1",
      sellerId: "seed_seller_1",
      name: "Bhusa (Wheat Straw)",
      category: "bhusa",
      price: 600,
      location: "Bareilly",
      description: "Clean, dry bhusa. Pickup available.",
      images: [],
      contactNumber: "98XXXXXX10",
      isActive: true,
      createdAt: Date.now(),
    },
    {
      id: "p_2",
      sellerId: "seed_seller_2",
      name: "Chara (Green Fodder)",
      category: "chara",
      price: 450,
      location: "Rampur",
      description: "Fresh green chara daily supply.",
      images: [],
      contactNumber: "97XXXXXX10",
      isActive: true,
      createdAt: Date.now(),
    },
  ];
}

function seedDoctors() {
  return [
    {
      id: "d_1",
      userId: "seed_doc_1",
      name: "Dr. A. Verma",
      qualification: "BVSc",
      specialization: "Cattle & Buffalo",
      experienceYears: 6,
      fee: 199,
      phone: "96XXXXXX10",
      isVerified: true,
      createdAt: Date.now(),
    },
    {
      id: "d_2",
      userId: "seed_doc_2",
      name: "Dr. S. Khan",
      qualification: "MVSc",
      specialization: "Goat & Sheep",
      experienceYears: 8,
      fee: 299,
      phone: "95XXXXXX10",
      isVerified: false,
      createdAt: Date.now(),
    },
  ];
}
