export default function getPastDate(years: number) {
  const date = new Date(
    new Date().setFullYear(new Date().getFullYear() - years)
  );
  return `${date.getFullYear()}-${
    date.getMonth() < 9 ? "0" + date.getMonth() : date.getMonth()
  }-01`;
}
