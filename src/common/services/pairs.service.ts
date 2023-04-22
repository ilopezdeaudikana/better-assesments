import compareAsc from "date-fns/compareAsc";
import differenceInDays from "date-fns/differenceInDays";
import { Partner } from "../types/partner"
import { Country } from '../types/country';

export const getDaysWithConsecutiveDates = (
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
      partner.startDates = getDaysWithConsecutiveDates(partner.dates)
      if (!accumulator[key]) {
        accumulator[key] = [];
      }
      accumulator[key].push(partner);
      return accumulator;
    },
    {} as Record<string, Partner[]>
  );
};

export const generateResultsPerCountry = (countries: Record<string, Partner[]>): Country[] => {
  return Object.entries(countries).map(
    ([country, partners]) => {
      const startDates = partners.reduce(
        (accummulator, current) =>
          accummulator.concat(current.startDates ?? []),
        [] as string[]
      )
      const datesOcurrence = startDates.reduce((acc, curr) => {
        const ocurrence: number = acc[curr]
        acc[curr] = ocurrence ? ocurrence + 1 : 1
        return acc
      }, {} as Record<string, number>)
      
      let max = 0      
      const dates: string[] = Object.entries(datesOcurrence).reduce<string[]>((acc, [key, value]) => {
        if (value >= max) {
          max = value
          acc.push(key)
        }
        return acc
      }, [])

      dates.sort((a, b) => compareAsc(new Date(a), new Date(b)));

      const attendees: string[] = partners.reduce(
        (accumulator, partner) => {
          if (dates.length && partner.startDates?.includes(dates[0])) {
            accumulator.push(partner.email)
          }
          return accumulator
        },
        [] as string[]
      )
      return {
        name: country,
        attendeeCount: attendees.length,
        attendees,
        startDate: dates.length ? dates[0] : null
      }
    }
  )
}