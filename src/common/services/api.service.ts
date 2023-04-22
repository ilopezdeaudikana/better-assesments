import { Partner } from '../types/partner'
import { Country } from '../types/country'

import data from './sample-2023.json'

// TODO Configure local server
export const getPartners = (): Promise<{ partners: Partner[] }> => {
  return new Promise((resolve) => resolve(data))
}

export const postCountries = (body: Country[]) => {
  console.log(body)
}
