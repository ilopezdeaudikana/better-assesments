import compareAsc from "date-fns/compareAsc";
import differenceInDays from "date-fns/differenceInDays";
import { Partner } from "../types/partner"

const getConsecutiveDates = (
  dates: string[]
): string[] => {
  dates.sort((a, b) => compareAsc(new Date(a), new Date(b)));
  return dates.filter((date, index) => {
    if (date[index + 1]) {
      const diff = differenceInDays(new Date(dates[index + 1]), new Date(dates[index]))
      if (diff === 1) return true
    }
    return false
  });
}

export const groupPartnersByCountry = (
  partners: Partner[],
): Record<string, Partner[]>  => {
  return partners.reduce(
    (accumulator: Record<string, Partner[]>, partner: Partner) => {
      const key: string = partner.country;
      partner.startDates = getConsecutiveDates(partner.dates)
      if (!accumulator[key]) {
        accumulator[key] = [];
      }
      accumulator[key].push(partner);
      return accumulator;
    },
    {} as Record<string, Partner[]>
  );
};

