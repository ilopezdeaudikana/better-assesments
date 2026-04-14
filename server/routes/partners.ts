import type { Request, Response, NextFunction } from 'express'
import { readFile } from 'node:fs/promises'
import { join } from 'path'

const DATA_PATH = join(process.cwd(), './data/sample-2023.json')

export const getPartners = async (_: Request, res: Response, __: NextFunction) => {
  try {
    const rawData = await readFile(DATA_PATH, 'utf-8')
    const jsonData = JSON.parse(rawData);
    res.json(jsonData.partners);
  } catch (error) {
    res.status(500).send("Error reading file");
  }
}
