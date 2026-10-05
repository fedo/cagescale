import { chromium } from 'playwright'
import { copyFile, mkdir, readdir, rm } from 'node:fs/promises'
import path from 'node:path'

const outDir = '/opt/cursor/artifacts'
const videoDir = '/tmp/cagescale-demo-video'
await rm(videoDir, { recursive: true, force: true })
await mkdir(outDir, { recursive: true })
await mkdir(videoDir, { recursive: true })

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  recordVideo: { dir: videoDir, size: { width: 390, height: 844 } },
})
const page = await context.newPage()

await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' })
await page.waitForSelector('text=Joshua Van')
await page.waitForTimeout(1000)

await page.getByRole('link', { name: /Open profile for Joshua Van/i }).click()
await page.waitForURL('**/fighters/joshua-van')
await page.waitForSelector('text=The Fearless')
await page.waitForTimeout(800)

await page.getByRole('button', { name: /Ranking timeline/i }).click()
await page.waitForSelector('text=Champion · Flyweight')
await page.waitForTimeout(1200)

await page.goto('http://127.0.0.1:5173/weight-finder', { waitUntil: 'networkidle' })
await page.waitForSelector('text=My weight')
await page.waitForTimeout(600)
await page.getByLabel('Your weight').fill('77')
await page.waitForSelector('text=Welterweight')
await page.waitForTimeout(800)
await page.getByRole('button', { name: 'lb', exact: true }).click()
await page.waitForFunction(() => {
  const input = document.querySelector('#weight')
  return input && Number(input.value) > 100
})
await page.waitForTimeout(900)
await page.getByRole('button', { name: 'Women', exact: true }).click()
await page.waitForSelector("text=Women's Featherweight")
await page.waitForTimeout(1000)
await page.getByRole('button', { name: 'Men', exact: true }).click()
await page.waitForSelector('text=Welterweight')
await page.waitForTimeout(1200)

await page.close()
await context.close()
await browser.close()

const files = await readdir(videoDir)
const webm = files.find((f) => f.endsWith('.webm'))
if (!webm) throw new Error('No video recorded')

const destWebm = path.join(outDir, 'cagescale_full_flow.webm')
await copyFile(path.join(videoDir, webm), destWebm)
console.log(destWebm)
