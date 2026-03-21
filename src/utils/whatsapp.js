function sanitizeWhatsAppNumber(raw) {
  return String(raw ?? "").replace(/[^\d]/g, "");
}

export function getWhatsAppBuyLink({ phoneName }) {
  const message = `Hello, I want to buy ${phoneName}`;
  const encoded = encodeURIComponent(message);
  const number = sanitizeWhatsAppNumber(import.meta.env.VITE_WHATSAPP_NUMBER);
  return number ? `https://wa.me/${number}?text=${encoded}` : `https://wa.me/?text=${encoded}`;
}
