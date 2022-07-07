export function incPeriod(yearMonth: string, by: number) {
    const [year, month] = yearMonth.split("-").map(Number);

    if (!year || !month) throw "Unexpected year-month format"

    return `${year + Math.floor((month + by - 1) / 12)}-${((month + by - 1) % 12 + 1).toString().padStart(2, "0")}`
}