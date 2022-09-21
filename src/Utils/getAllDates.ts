export default function getAllDates(startDate: string, endDate: string) {
  const start: string[] = startDate?.split("-");
  const end: string[] = endDate?.split("-");
  const startYear: number = parseInt(start?.[0]);
  const endYear: number = parseInt(end?.[0]);
  const dates: string[] = [];

  for (let i = startYear; i <= endYear; i++) {
    const endMonth: number = i !== endYear ? 11 : parseInt(end[1]) - 1;
    const startMon: number = i === startYear ? parseInt(start[1]) - 1 : 0;
    for (let j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1) {
      const month: number = j + 1;
      const displayMonth = month < 10 ? "0" + month : month;
      dates.push([i, displayMonth].join("-"));
    }
  }
  return dates;
}
