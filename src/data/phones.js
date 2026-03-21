import phones from "./phones.json";

export const BRANDS = Array.from(new Set(phones.map((p) => p.brand))).sort((a, b) =>
  a.localeCompare(b),
);

const phoneImages = import.meta.glob("../assets/phones/*.svg", {
  eager: true,
  import: "default",
});

export function getAllPhones() {
  return phones;
}

export function getPhoneById(id) {
  return phones.find((p) => p.id === id) ?? null;
}

export function getPhoneImageHref(phone) {
  const key = `../assets/phones/${phone.image}.svg`;
  return phoneImages[key] ?? "";
}
