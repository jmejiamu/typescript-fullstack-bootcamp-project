import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function cleanup() {
  console.log('Cleaning up DBdata...')
  const tablenames = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`

  const tables = tablenames
    .map(({ tablename }) => tablename)
    .filter((name) => name !== '_prisma_migrations')
    .map((name) => `"public"."${name}"`)
    .join(', ')

  try {
    await prisma.$executeRawUnsafe(
      `TRUNCATE TABLE ${tables} RESTART IDENTITY CASCADE;`,
    )
  } catch (error) {
    console.log({ error })
  }

  console.log('DBdata cleaned up successfully!')
}

cleanup()
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
