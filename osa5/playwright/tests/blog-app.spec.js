const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Note app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'John Smith',
        username: 'JSmith',
        password: 'secret'
      }
    })

    await page.goto('http://localhost:5173')
  })

    test('Login form is shown', async ({ page }) => {
        const locator = await page.getByText('Log in to application')
        await expect(locator).toBeVisible()
        await expect(page.getByTestId('username')).toBeVisible()
        await expect(page.getByTestId('password')).toBeVisible()
        await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

    test('a failed log in', async({page})=>{
        await page.getByTestId('username').fill('JSmith')
        await page.getByTestId('password').fill('wrong')
        await page.getByRole('button', { name: 'login' }).click()
        await expect(page.getByText('wrong credentials')).toBeVisible()
  })

    test('successful login', async({page})=>{
        await loginWith(JSmith, secret)
        await page.getByTestId('username').fill('JSmith')
        await page.getByTestId('password').fill('secret')
        await page.getByRole('button', { name: 'login' }).click()
        await expect(page.getByText('a successful login')).toBeVisible()
    })
    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await page.getByRole('textbox').first().fill('JSmith')
            await page.getByRole('textbox').last().fill('secret')
            await page.getByRole('button', { name: 'login' }).click()
            await expect(page.getByText('a successful login')).toBeVisible()
        })
      
        test('a new blog can be created', async ({ page }) => {
            await page.getByRole('button', { name: 'create' }).click()
            await page.getByTestId('title').fill('This is a test')
            await page.getByTestId('author').fill('Test author')
            await page.getByTestId('url').fill('wwwthisleadsnowhere')
            await page.getByRole('button', { name: 'create' }).click()
            await expect
            (page.getByText('a new blog This is a test by Test author added'))
            .toBeVisible()
        })
    })       
})
