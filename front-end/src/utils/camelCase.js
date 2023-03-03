export default function snakeToCamel(str) {
  return str.replace(/(_\w)/g, (m) => m[1].toUpperCase());
}
