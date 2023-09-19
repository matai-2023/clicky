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

test('clicky game displays correct score on missed click', async ({ page }) => {
  await page.goto('http://localhost:5173/clicky')

  await page.getByRole('button', { name: 'Start' }).click()
  await page.getByTestId('game-box').click()
  await expect(
    page.getByRole('heading', { level: 2, name: 'Score: -50' })
  ).toBeVisible()
  await page.getByTestId('game-box').click()
  await expect(
    page.getByRole('heading', { level: 2, name: 'Score: -100' })
  ).toBeVisible()
})

test('clicky game does not deduct score on missed click outside gamebox', async ({
  page,
}) => {
  await page.goto('http://localhost:5173/clicky')

  await page.getByRole('button', { name: 'Start' }).click()
  await page.getByRole('heading', { level: 2, name: 'Score:' }).click()
  await page.getByRole('heading', { level: 2, name: 'Time:' }).click()
  await expect(
    page.getByRole('heading', { level: 2, name: 'Score: 0' })
  ).toBeVisible()
})
