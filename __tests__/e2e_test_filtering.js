/* eslint-disable no-promise-executor-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-undef */

/**
 * @jest-environment jsdom
 */

/**
 * File: e2e_tests_filtering.js
 * Author: Jon Tran
 * Description: Written some tests for the sort and filter interface
 * Note: Please run with the command 'npm run test --detectOpenHandles'
 */
const puppeteer = require('puppeteer');

const URL = 'https://wateryoucooking.netlify.app/';
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// Avoid timeout error due to default low timeout limit
jest.setTimeout(600000);
describe('Basic user flow for Website', () => {
  it('Searching a recipe', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL);
    const searchBar = await page.$('#search-results-input');
    await page.$eval('#search-results-input', (element) => element.value = '121212');
    const searchButton = await page.$('#search-results-nav');
    await searchButton.click();
    await page.waitForSelector('#search-results-title');
    const element = await page.$('#search-results-title');
    const searchHeader = await page.evaluate((el) => el.innerText, element);
    console.log(searchHeader);
    expect(searchHeader).toBe('Loading results for "121212"');
  });
  it('Testing hide sort and filtering interface button', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL);
    const searchBar = await page.$('#search-results-input');
    await page.$eval('#search-results-input', (element) => element.value = '121212');
    const searchButton = await page.$('#search-results-nav');
    await searchButton.click();
    const displayButton = await page.$('#display-sort-filter');
    const displayHide = await page.evaluate((el) => el.innerText, displayButton);
    expect(displayHide).toBe('Hide Sort and Filter');
    await displayButton.click();
    const displayShow = await page.evaluate((el) => el.innerText, displayButton);
    expect(displayShow).toBe('Show Sort and Filter');
    await displayButton.click();
  });
  it('Testing cuisine collapse button', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL);
    const searchBar = await page.$('#search-results-input');
    await page.$eval('#search-results-input', (element) => element.value = '121212');
    const searchButton = await page.$('#search-results-nav');
    await searchButton.click();
    const displayButton = await page.$('#cuisine-collapse');
    const displayHide = await page.evaluate((el) => el.innerText, displayButton);
    expect(displayHide).toBe('↑');
    await displayButton.evaluate((b) => b.click());
    const displayShow = await page.evaluate((el) => el.innerText, displayButton);
    expect(displayShow).toBe('↓');
  });
  it('Testing intolerance collapse button', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL);
    const searchBar = await page.$('#search-results-input');
    await page.$eval('#search-results-input', (element) => element.value = '121212');
    const searchButton = await page.$('#search-results-nav');
    await searchButton.click();
    const displayButton = await page.$('#intolerance-collapse');
    const displayHide = await page.evaluate((el) => el.innerText, displayButton);
    expect(displayHide).toBe('↑');
    await displayButton.evaluate((b) => b.click());
    const displayShow = await page.evaluate((el) => el.innerText, displayButton);
    expect(displayShow).toBe('↓');
  });
});
