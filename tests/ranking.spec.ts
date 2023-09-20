import { test, expect } from '@playwright/test'

import sinon from 'sinon'
import * as Path from 'node:path/posix'
import * as URL from 'node:url'
import db from '../server/db/connection'

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

test.beforeAll(async () => {
  await db.migrate.latest({ directory: './server/db/migrations' })
})

test.beforeEach(async ({ context }) => {
  // Install Sinon in all the pages in the context
  await context.addInitScript({
    path: Path.join(__dirname, '..', './node_modules/sinon/pkg/sinon.js'),
  })
  // Auto-enable sinon right away
  await context.addInitScript(() => {
    window.__clock = sinon.useFakeTimers()
  })

  await db.seed.run({ directory: './server/db/seeds' })
})

test.only('tester nickname is correctly displayed', async ({ page }) => {
  await page.goto('http://localhost:5173')
  await expect(
    page.getByRole('heading', { level: 1, name: 'Add your Nickname' })
  ).toBeVisible
  await page.getByLabel('Nickname: ').fill('tester')
  await page.getByRole('button', { name: 'Add Nickname' }).click()
  await expect(page.getByText('welcome back tester!')).toBeVisible()
})

// test('ranking displayed on game end', async ({ page }) => {
//   await page.goto('http://localhost:5173/clicky')

//   await page.getByRole('button', { name: 'Start' }).click()
//   await page.getByTestId('square-rect').click()
//   await expect(
//     page.getByRole('heading', { level: 2, name: 'Score: 100' })
//   ).toBeVisible()
//   await page.evaluate(() => window.__clock.tick(60000))
//   await expect(page.getByTestId('game-over')).toBeVisible()
//   await page.getByRole('button', { name: 'Add to ranking table' }).click()
//   await expect(
//     page.getByRole('heading', { level: 2, name: 'Score Ranking' })
//   ).toBeVisible()
//   // const row = await page.locator('tr:has-text("tester")')
//   // console.log(await row.textContent())
// })
