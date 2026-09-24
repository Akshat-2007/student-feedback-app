const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Student Feedback App Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Open local index.html file in browser
    const filePath = path.join(__dirname, '../index.html');
    await page.goto(`file://${filePath}`);
  });

  test('should verify all form elements exist', async ({ page }) => {
    await expect(page.locator('#studentName')).toBeVisible();
    await expect(page.locator('#studentEmail')).toBeVisible();
    await expect(page.locator('#studentBranch')).toBeVisible();
    await expect(page.locator('#feedbackText')).toBeVisible();
  });

  test('should submit feedback successfully when all mandatory fields are filled', async ({ page }) => {
    // Fill out the form
    await page.fill('#studentName', 'Aarya Sharma');
    await page.fill('#studentEmail', 'aarya@example.com');
    await page.selectOption('#studentBranch', 'CSE-DS');
    await page.fill('#feedbackText', 'Great interactive portal for student reviews!');

    // Submit form
    await page.click('button[type="submit"]');

    // Verify submission appears in the feedback list
    const feedbackList = page.locator('#feedbackList');
    await expect(feedbackList).toContainText('Aarya Sharma');
    await expect(feedbackList).toContainText('aarya@example.com');
    await expect(feedbackList).toContainText('CSE-DS');
    await expect(feedbackList).toContainText('Great interactive portal for student reviews!');

    // Verify total feedback counter incremented to 1
    await expect(page.locator('#totalFeedback')).toHaveText('1');
  });

});