import { test, expect } from '@playwright/test';
import { testConfig } from '../config';

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}


test('test', async ({ page }) => {
  // 登录
  await page.goto('https://login.live.com/');
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'Email or phone number' }).click();
  await page.getByRole('textbox', { name: 'Email or phone number' }).fill(testConfig.email);
  await page.getByRole('textbox', { name: 'Email or phone number' }).press('Enter');
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Use your password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(testConfig.password);
  await page.waitForTimeout(2000);
  await page.getByTestId('primaryButton').click();
  // 等待页面元素加载
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);

  try {
    await page.goto('https://cn.bing.com/');
  } catch (e) {
    // 如果页面已关闭，重新创建页面
    console.log('页面已关闭，跳过导航');
    return;
  }
  await page.waitForLoadState('domcontentloaded');
  // 访问热搜
  for (let i = 0; i < 24; i++) {
    await page.waitForTimeout(1000);
    if (i % 6 === 0 && i !== 0) {
      await page.getByRole('button', { name: 'Next', exact: true }).click();
    }

    const link = page.locator('.tob_list_current ul a').nth(i % 6)
    // 确保可点
    await link.waitFor({ state: 'visible' })

    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      link.click({ force: true }),
    ])

    await newPage.hover('body')
    const end = Date.now() + rand(3000, 5000)
    await newPage.mouse.wheel(0, rand(500, 800))
    await newPage.mouse.wheel(0, rand(500, 800))
    while (Date.now() < end) {

      await newPage.mouse.wheel(0, rand(-300, 800))
      await newPage.waitForTimeout(rand(500, 1300))
    }
    await newPage.close()

  }

});