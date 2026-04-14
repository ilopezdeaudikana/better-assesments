import { getPartners, groupPartnersByCountry, generateResultsPerCountry } from './services/partners.service'
import { Country } from './types/country'
import { Partner } from './types/partner'
import { useQuery } from '@tanstack/react-query'

export const Pairs = () => {

  const query = useQuery({
    queryKey: ['partners'],
    queryFn: getPartners,
    select: (items) => {
      const countries: Record<string, Partner[]> = groupPartnersByCountry(
        items
      )
      const resultsPerCountry: Country[] = generateResultsPerCountry(countries)
      return ({ countries: resultsPerCountry })
    },
    staleTime: 5 * 1000 * 60
  })

  return (
    <>
      <ul data-testid='countries' className='w-[30rem] flex flex-col p-3 rounded-xl mx-auto my-2'>
        {query.data?.countries.map(
          (country: Country) =>
            country.attendeeCount > 0 && (
              <li key={country.name} className='bg-gray-200 my-2 p-3 rounded-md'>
                <p>
                  Country: {country.name} | Total: {country.attendeeCount} |
                  When: {country.startDate}
                </p>
                <p className='text-left mt-2'>Attendees:</p>
                <p className='text-left'>
                  {country.attendees.join(', ')}
                </p>
              </li>
            )
        )}
      </ul>
    </>
  )
}
