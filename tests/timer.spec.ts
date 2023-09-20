import { test, expect } from '@playwright/test'

import sinon from 'sinon'
import * as Path from 'node:path/posix'
import * as URL from 'node:url'

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

test.beforeEach(async ({ context }) => {
  // Install Sinon in all the pages in the context
  await context.addInitScript({
    path: Path.join(__dirname, '..', './node_modules/sinon/pkg/sinon.js'),
  })
  // Auto-enable sinon right away
  await context.addInitScript(() => {
    window.__clock = sinon.useFakeTimers()
  })
})

test('score changes based on time', async ({ page }) => {
  await page.goto('http://localhost:5173/clicky')

  await page.getByRole('button', { name: 'Start' }).click()
  await page.evaluate(() => window.__clock.tick(2000))
  await expect(
    page.getByRole('heading', { level: 2, name: 'Time: 58' })
  ).toBeVisible()
})

test('game over pop up appears', async ({ page }) => {
  await page.goto('http://localhost:5173/clicky')

  await page.getByRole('button', { name: 'Start' }).click()
  await page.evaluate(() => window.__clock.tick(60000))
  await expect(page.getByTestId('game-over')).toBeVisible()
})
