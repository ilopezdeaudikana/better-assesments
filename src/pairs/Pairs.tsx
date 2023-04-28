import { Fragment, useEffect, useState } from 'react'
import { getPartners } from '../common/services/api.service'
import { groupPartnersByCountry, generateResultsPerCountry } from '../common/services/pairs.service'
import { Country } from '../common/types/country'
import { Partner } from '../common/types/partner'


export const Pairs = () => {
  const [data, setData] = useState<{ countries: Country[] }>({
    countries: []
  })

  useEffect(() => {
    getPartners()
      .then((items) => {
        const countries: Record<string, Partner[]> = groupPartnersByCountry(
          items.partners
        )

        const resultsPerCountry: Country[] = generateResultsPerCountry(countries)
        setData({ countries: resultsPerCountry })
      })
      .catch((err) => {})
  }, [])

  return (
    <Fragment>
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
    </Fragment>
  )
}
