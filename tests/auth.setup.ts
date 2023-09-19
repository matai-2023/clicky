import { test as setup, expect } from '@playwright/test'

const authFile = 'playwright/.auth/user.json'

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('http://localhost:5173/')
  await page.getByRole('button', { name: 'Log In' }).click()
  await page.getByLabel('Email address').fill('testing@test.com')
  await page.getByLabel('Password').fill('Testing_0')
  await page.getByRole('button', { name: 'Continue', exact: true }).click()
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('http://localhost:5173/')
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page.getByRole('button', { name: 'Log Out' })).toBeVisible()

  // End of authentication steps.

  await page.context().storageState({ path: authFile })
})
