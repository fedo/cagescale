import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

const outDir = '/opt/cursor/artifacts'
await mkdir(outDir, { recursive: true })

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 390, height: 844 } })

const results = []

await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' })
await page.waitForSelector('text=CageScale')
await page.screenshot({ path: `${outDir}/divisions_mobile.png`, fullPage: true })
results.push('divisions: ok')

await page.getByRole('link', { name: /Open profile for Joshua Van/i }).click()
await page.waitForURL('**/fighters/joshua-van')
await page.waitForSelector('text=Joshua Van')
results.push('fighter navigation: ok')

const rankingBtn = page.getByRole('button', { name: /Ranking timeline/i })
await rankingBtn.click()
await page.waitForSelector('text=Champion')
results.push('ranking expand: ok')
await page.screenshot({ path: `${outDir}/fighter_profile_timelines.png`, fullPage: true })

await page.getByRole('link', { name: 'My Weight' }).click()
await page.waitForURL('**/weight-finder')
await page.getByLabel('Your weight').fill('77')
await page.getByRole('button', { name: 'lb', exact: true }).click()
await page.waitForFunction(() => {
  const input = document.querySelector('#weight')
  return input && Number(input.value) > 100
})
const dual = await page.locator('text=/kg \\/ .* lb/').first().textContent()
results.push(`unit toggle: ok (${dual})`)
await page.getByRole('button', { name: 'Women' }).click()
await page.waitForSelector("text=Women's")
results.push('gender toggle: ok')
await page.screenshot({ path: `${outDir}/weight_finder_estimates.png`, fullPage: true })

console.log(JSON.stringify(results, null, 2))
await browser.close()
