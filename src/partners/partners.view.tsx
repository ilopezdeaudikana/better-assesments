import { getPartners, groupPartnersByCountry, generateResultsPerCountry } from './services/partners.service'
import { Country } from './types/country'
import { Partner } from './types/partner'
import { Card } from '@mui/material'
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
      <ul data-testid='countries' className='w-[60rem] flex flex-col p-3 mx-auto my-2'>
        {query.data?.countries.map(
          (country: Country) =>
            country.attendeeCount > 0 && (
              <li key={country.name} className='my-2'>
                <Card className='p-3 text-left'>
                  <h2>{country.name}, {country.startDate}</h2>
                  <h3 className='mt-2'>Attendees:</h3>
                  <ul>
                    {country.attendees.map((att, i) => <li className='pl-3' key={i}><small>{att}</small></li>)}
                  </ul>
                </Card>
              </li>
            )
        )}
      </ul>
    </>
  )
}
