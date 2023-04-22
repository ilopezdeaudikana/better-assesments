import { Fragment, useEffect, useState } from 'react'
import { getPartners } from '../common/services/api.service'
import { groupPartnersByCountry, generateResultsPerCountry } from '../common/services/pairs.service'
import { Country } from '../common/types/country'
import { Partner } from '../common/types/partner'
import styled from 'styled-components'

export const Paragraph = styled.p`
  text-align: left;
`

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
      <ul data-testid='countries'>
        {data.countries.map(
          (country: Country) =>
            country.attendeeCount > 0 && (
              <div key={country.name}>
                <Paragraph>
                  Country: {country.name} | Total: {country.attendeeCount} |
                  When: {country.startDate}
                </Paragraph>
                <Paragraph>Attendees</Paragraph>
                <ul>
                  {country.attendees.map((attendee: string, i: number) => (
                    <li key={i}>{attendee}</li>
                  ))}
                </ul>
              </div>
            )
        )}
      </ul>
    </Fragment>
  )
}
