import { test, expect } from '@playwright/test'

test('home has title', async ({ page }) => {
  await page.goto('http://localhost:5173/')

  await expect(page.getByRole('link', { name: 'Blicky' })).toBeVisible()
})

test('game modes are visible', async ({ page }) => {
  await page.goto('http://localhost:5173/')

  await page.getByRole('link', { name: 'Choose Game Mode' }).click()
  await expect(
    page.getByRole('heading', { level: 2, name: 'Game Modes' })
  ).toBeVisible()
  await expect(page.getByRole('link', { name: 'Clicky' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Bouncy' })).toBeVisible()
})

test('clicky game displays all starting elements', async ({ page }) => {
  await page.goto('http://localhost:5173/category')

  await page.getByRole('link', { name: 'Clicky' }).click()
  await page.getByRole('button', { name: 'Start' }).click()
  await expect(
    page.getByRole('heading', { level: 2, name: 'Time:' })
  ).toBeVisible()
  await expect(
    page.getByRole('heading', { level: 2, name: 'Score: 0' })
  ).toBeVisible()
  await expect(page.getByRole('link', { name: 'Clicky!' })).toBeVisible()
  await page.getByRole('link', { name: 'Clicky!' }).click()
  await expect(page.getByRole('link', { name: 'Blicky' })).toBeVisible()
})
