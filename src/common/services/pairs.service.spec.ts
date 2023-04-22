import { Country } from '../types/country'
import { Partner } from '../types/partner'
import {
  getDaysWithConsecutiveDates,
  groupPartnersByCountry,
  generateResultsPerCountry
} from './pairs.service'

const partners: Partner[] = [
  {
    firstName: 'Darin',
    lastName: 'Daignault',
    email: 'ddaignault@.com',
    country: 'United States',
    dates: ['2017-05-03', '2017-05-06']
  },
  {
    firstName: 'Crystal',
    lastName: 'Brenna',
    email: 'cbrenna@.com',
    country: 'Ireland',
    dates: ['2017-04-27', '2017-04-29', '2017-04-30']
  },
  {
    firstName: 'Janyce',
    lastName: 'Gustison',
    email: 'jgustison@.com',
    country: 'Spain',
    dates: ['2017-04-29', '2017-04-30', '2017-05-01']
  },
  {
    firstName: 'Tifany',
    lastName: 'Mozie',
    email: 'tmozie@.com',
    country: 'Spain',
    dates: ['2017-04-28', '2017-04-29', '2017-05-01', '2017-05-04']
  },
  {
    firstName: 'Temple',
    lastName: 'Affelt',
    email: 'taffelt@.com',
    country: 'Spain',
    dates: ['2017-04-28', '2017-04-29', '2017-05-02', '2017-05-04']
  },
  {
    firstName: 'Robyn',
    lastName: 'Yarwood',
    email: 'ryarwood@.com',
    country: 'Spain',
    dates: ['2017-04-29', '2017-04-30', '2017-05-02', '2017-05-03']
  },
  {
    firstName: 'Shirlene',
    lastName: 'Filipponi',
    email: 'sfilipponi@.com',
    country: 'Spain',
    dates: ['2017-04-30', '2017-05-01']
  },
  {
    firstName: 'Oliver',
    lastName: 'Majica',
    email: 'omajica@.com',
    country: 'Spain',
    dates: ['2017-04-28', '2017-04-29', '2017-05-01', '2017-05-03']
  },
  {
    firstName: 'Wilber',
    lastName: 'Zartman',
    email: 'wzartman@.com',
    country: 'Spain',
    dates: ['2017-04-29', '2017-04-30', '2017-05-02', '2017-05-03']
  },
  {
    firstName: 'Eugena',
    lastName: 'Auther',
    email: 'eauther@.com',
    country: 'United States',
    dates: ['2017-05-04', '2017-05-09']
  }
]
describe('getDaysWithConsecutiveDates', () => {
  it('should return an array of days with a consecutive date', () => {
    const dates: string[] = [
      '2017-06-01',
      '2017-06-02',
      '2017-06-03',
      '2017-06-05',
      '2017-06-06'
    ]
    const consecutiveDates: string[] = getDaysWithConsecutiveDates(dates)
    expect(consecutiveDates).toEqual(['2017-06-01', '2017-06-02', '2017-06-05'])
  })
})

describe('groupPartnersByCountry', () => {
  it('should return an object with countries as keys', () => {
    const groupedByCountry: Record<string, Partner[]> = groupPartnersByCountry(
      partners as Partner[]
    )

    const cleanGroups: Record<string, Partial<Partner>[]> = Object.entries(
      groupedByCountry
    ).reduce<Record<string, Partial<Partner>[]>>((acc, [key, values]) => {
      acc[key] = values.map((partner: Partner) => {
        const { firstName } = partner
        return { firstName }
      })
      return acc
    }, {})

    expect(cleanGroups).toEqual({
      'United States': [{ firstName: 'Darin' }, { firstName: 'Eugena' }],
      Ireland: [{ firstName: 'Crystal' }],
      Spain: [
        { firstName: 'Janyce' },
        { firstName: 'Tifany' },
        { firstName: 'Temple' },
        { firstName: 'Robyn' },
        { firstName: 'Shirlene' },
        { firstName: 'Oliver' },
        { firstName: 'Wilber' }
      ]
    })
  })
})

describe('generateResultsPerCountry', () => {
  it('should return a Country array', () => {
    const groupedByCountry: Record<string, Partial<Partner>[]> = {
      'United States': [
        {
          email: 'mbourek@acme.com',
          startDates: ['2017-06-01', '2017-06-02', '2017-06-05']
        },
        {
          email: 'jstraugter@acme.com',
          startDates: ['2017-05-19', '2017-06-01', '2017-06-02', '2017-06-05']
        },
        {
          email: 'aalapai@acme.com',
          startDates: [
            '2017-05-19',
            '2017-05-20',
            '2017-05-29',
            '2017-06-01',
            '2017-06-02',
            '2017-06-03',
            '2017-06-04'
          ]
        },
        {
          email: 'ccomella@acme.com',
          startDates: [
            '2017-05-24',
            '2017-05-31',
            '2017-06-01',
            '2017-06-02',
            '2017-06-05'
          ]
        },
        {
          email: 'kdelerme@acme.com',
          startDates: [
            '2017-05-28',
            '2017-05-31',
            '2017-06-01',
            '2017-06-02',
            '2017-06-05'
          ]
        }
      ],
      Canada: [
        {
          email: 'rmckensie@acme.com',
          startDates: ['2017-05-23']
        },
        {
          email: 'apayn@acme.com',
          startDates: []
        },
        {
          email: 'bdani@acme.com',
          startDates: []
        },
        {
          email: 'lsweatmon@acme.com',
          startDates: []
        },
        {
          email: 'jbaldassarre@acme.com',
          startDates: []
        }
      ],
      France: [
        {
          email: 'ptarango@acme.com',
          startDates: []
        }
      ]
    }

    const countries: Country[] = generateResultsPerCountry(
      groupedByCountry as Record<string, Partner[]>
    )

    expect(countries).toEqual([
      {
        name: 'United States',
        attendeeCount: 5,
        attendees: [
          'mbourek@acme.com',
          'jstraugter@acme.com',
          'aalapai@acme.com',
          'ccomella@acme.com',
          'kdelerme@acme.com'
        ],
        startDate: '2017-06-01'
      },
      {
        name: 'Canada',
        attendeeCount: 1,
        attendees: ['rmckensie@acme.com'],
        startDate: '2017-05-23'
      },
      { name: 'France', attendeeCount: 0, attendees: [], startDate: null }
    ])
  })
})

describe('Input ---> Output', () => {
  it('should return attendees per country', () => {
    const countries: Record<string, Partner[]> =
      groupPartnersByCountry(partners)

    const resultsPerCountry: Country[] = generateResultsPerCountry(countries)

    expect(resultsPerCountry).toEqual([
      {
        attendeeCount: 0,
        attendees: [],
        name: 'United States',
        startDate: null
      },
      {
        attendeeCount: 1,
        attendees: ['cbrenna@.com'],
        name: 'Ireland',
        startDate: '2017-04-29'
      },
      {
        attendeeCount: 3,
        attendees: ['tmozie@.com', 'taffelt@.com', 'omajica@.com'],
        name: 'Spain',
        startDate: '2017-04-28'
      }
    ])
  })
})
