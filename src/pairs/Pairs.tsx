import { Fragment, useEffect, useState } from 'react'
import { getPartners } from '../common/services/api.service'
import { groupPartnersByCountry } from '../common/services/process.service'
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

        const resultsPerCountry = Object.entries(countries).map(
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

            const startDate = Object.keys(datesOcurrence).reduce((a, b) =>
              datesOcurrence[b] > datesOcurrence[a] ? b : a
            )

            const attendees: string[] = partners.reduce(
              (accumulator, partner) => {
                if (partner.startDates?.includes(startDate)) {
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
              startDate
            }
          }
        )
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
