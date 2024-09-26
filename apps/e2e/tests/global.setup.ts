import { test as setup } from '@playwright/test'
import { seed } from '@repo/db'

setup.describe('Global setup', () => {
  setup('seed database', async () => {
    console.log('Seeding database...')
    await seed()
    console.log('Complete seeding database!')
  })
})
