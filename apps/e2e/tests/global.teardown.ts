import { test as setup } from '@playwright/test'
// import { cleanup } from '@repo/db'

setup.describe('Global teardown', () => {
  setup('clean database', async () => {
    console.log('cleaning up database...')
    // await cleanup()
    console.log('Complete cleaning up database!')
  })
})
