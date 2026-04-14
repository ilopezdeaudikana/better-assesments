import { useEffect, useState } from 'react'
import { getPartners, groupPartnersByCountry, generateResultsPerCountry } from './services/partners.service'
import { Country } from './types/country'
import { Partner } from './types/partner'


export const Pairs = () => {
  const [data, setData] = useState<{ countries: Country[] }>({
    countries: []
  })

  useEffect(() => {
    getPartners()
      .then((items) => {
        const countries: Record<string, Partner[]> = groupPartnersByCountry(
          items
        )

        const resultsPerCountry: Country[] = generateResultsPerCountry(countries)
        setData({ countries: resultsPerCountry })
      })
      .catch((err) => {
        console.log('Error fetching partners')
      })
  }, [])

  return (
    <>
      <ul data-testid='countries' className='w-[30rem] flex flex-col p-3 rounded-xl mx-auto my-2'>
        {data.countries.map(
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
