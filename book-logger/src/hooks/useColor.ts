const COLORS = [
  "#EDC55C",
  "#EDB35C",
  "#EDB35C",
  "#EFA2EB",
  "#E2D8F2",
  "#F0A9A3",
  "#F0BDED",
  "#9DF0D1",
  "#90D4F0",
  "#90B6F0",
  "#D0F0EF",
  "#CDF090",
  "#F2ECC4",
  "#E4F0D0",
];

export const getColorFromId = (id: string) => {
  let hash = 0;

  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % COLORS.length;
  return COLORS[index];
};