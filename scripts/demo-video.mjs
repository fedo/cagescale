import { chromium } from 'playwright'
import { copyFile, mkdir, readdir } from 'node:fs/promises'
import path from 'node:path'

const outDir = '/opt/cursor/artifacts'
const videoDir = '/tmp/cagescale-demo-video'
await mkdir(outDir, { recursive: true })
await mkdir(videoDir, { recursive: true })

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  recordVideo: { dir: videoDir, size: { width: 390, height: 844 } },
})
const page = await context.newPage()

await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' })
await page.waitForTimeout(800)
await page.getByRole('link', { name: /Open profile for Joshua Van/i }).click()
await page.waitForURL('**/fighters/joshua-van')
await page.waitForTimeout(600)
await page.getByRole('button', { name: /Ranking timeline/i }).click()
await page.waitForTimeout(900)
await page.getByRole('link', { name: 'My Weight' }).click()
await page.waitForURL('**/weight-finder')
await page.waitForTimeout(400)
await page.getByLabel('Your weight').fill('77')
await page.waitForTimeout(500)
await page.getByRole('button', { name: 'lb', exact: true }).click()
await page.waitForTimeout(700)
await page.getByRole('button', { name: 'women', exact: true }).click()
await page.waitForTimeout(900)
await page.getByRole('button', { name: 'men', exact: true }).click()
await page.waitForTimeout(700)

await context.close()
await browser.close()

const files = await readdir(videoDir)
const webm = files.find((f) => f.endsWith('.webm'))
if (!webm) throw new Error('No video recorded')
const dest = path.join(outDir, 'cagescale_divisions_fighter_weight_finder.webm')
await copyFile(path.join(videoDir, webm), dest)
console.log(dest)
