import faunadb from 'faunadb'

export const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET as string
})
