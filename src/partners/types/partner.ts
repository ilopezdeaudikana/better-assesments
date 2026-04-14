import * as z from 'zod'

const ApiPartner = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  country: z.string(),
  dates: z.array(z.iso.date()),
  startDates: z.array(z.iso.date()).optional()

})

export const PartnersApiResponse = z.array(ApiPartner)

export type Partner = z.infer<typeof ApiPartner>
