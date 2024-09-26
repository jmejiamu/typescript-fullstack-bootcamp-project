import { test, expect } from '@playwright/test'

test('has collection title', async ({ page }) => {
  await page.goto('http://localhost:5173/')

  await expect(page.getByText('Filter by Collection:')).toBeVisible()
})
test('filter for product', async ({ page }) => {
  await page.goto('http://localhost:5173/')

  const selectElement = await page.locator('select[name="collection"]')
  await expect(selectElement).toBeVisible()

  await expect(selectElement).toHaveValue('All')
  await selectElement.selectOption({ label: 'Sandals' })

  await page.getByText('Running Shoes').click()
  expect(page.url()).toBe('http://localhost:5173/products/4')

  const addProductBtn = await page.getByRole('button', { name: 'Add to Cart' })
  await expect(addProductBtn).toBeVisible()

  const variants = await page.getByRole('heading', {
    name: 'Available Variants',
  })
  await expect(variants).toBeVisible()
})
