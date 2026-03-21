import { motion } from "framer-motion";
import { BRANDS } from "../data/phones.js";

export default function BrandPills({ value, onChange }) {
  const brands = ["All", ...BRANDS];
  return (
    <div className="flex flex-wrap gap-2">
      {brands.map((brand) => {
        const active = value === brand;
        return (
          <motion.button
            key={brand}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange(brand)}
            className={["chip", active ? "chip-active" : "chip-idle"].join(" ")}
          >
            {brand}
          </motion.button>
        );
      })}
    </div>
  );
}

