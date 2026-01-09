import { test, expect } from '@playwright/test';
import { testConfig } from '../config';

test('test', async ({ page }) => {
  await page.goto('https://login.live.com/');
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'Email or phone number' }).click();
  await page.getByRole('textbox', { name: 'Email or phone number' }).fill(testConfig.email);
  await page.getByRole('textbox', { name: 'Email or phone number' }).press('Enter');
  // await page.getByTestId('primaryButton').click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Use your password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(testConfig.password);
  await page.waitForTimeout(2000);
  await page.getByTestId('primaryButton').click();
  // 等待页面元素加载
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);

  // 第二次点击：在点击前验证页面活跃
  // try {
  //   await page.getByTestId('primaryButton').click();
  //   await Promise.race([
  //     page.waitForNavigation({ waitUntil: 'networkidle', timeout: 10000 }),
  //     new Promise(resolve => setTimeout(resolve, 5000))
  //   ]);
  // } catch (e) {
  //   // 点击失败或导航失败，继续
  // }

  // 确保能访问新页面
  try {
    await page.goto('https://cn.bing.com/');
  } catch (e) {
    // 如果页面已关闭，重新创建页面
    console.log('页面已关闭，跳过导航');
    return;
  }
  await page.waitForLoadState('domcontentloaded');
  // const page1Promise = page.waitForEvent('popup');
  // 等待这个链接出现再点击
  await page.getByTitle('东北最大跨海桥突破').waitFor({ state: 'visible' });
  await page.getByTitle('东北最大跨海桥突破').click();
  const page1 = await page1Promise;
  const page2Promise = page1.waitForEvent('popup');
  // 等待元素可见再点击
  await page1.getByRole('link', { name: 'Back to Bing search' }).waitFor({ state: 'visible' });
  await page1.getByRole('link', { name: 'Back to Bing search' }).click();
  const page2 = await page2Promise;
  const page3Promise = page2.waitForEvent('popup');
  // 等待元素可见再点击
  await page2.getByRole('link', { name: '2299元波司登充绒量仅86克' }).waitFor({ state: 'visible' });
  await page2.getByRole('link', { name: '2299元波司登充绒量仅86克' }).click();
  const page3 = await page3Promise;
});