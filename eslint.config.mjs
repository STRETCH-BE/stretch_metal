/**
 * ESLint flat config.
 * File path: /eslint.config.mjs
 *
 * `next lint` is deprecated in Next 15, so `npm run lint` calls ESLint
 * directly. FlatCompat bridges the classic `next/core-web-vitals` and
 * `next/typescript` shareable configs into the flat-config world.
 */
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [".next/**", "out/**", "node_modules/**", "next-env.d.ts"],
  },
];

export default eslintConfig;
