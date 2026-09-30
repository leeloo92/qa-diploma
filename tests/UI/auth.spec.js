import { expect } from '@playwright/test';
import { uiTest as test } from '../../fixtures/ui.fixture';
import { UserBuilder } from '../../builders/index';

test('Пользователь может зарегистироваться в системе', async ({ app }) => {

  await app.main.openPage();
  await app.main.gotoRegister();
  const user = new UserBuilder().generateUserName().generateUserEmail().generateUserPassword().generate();
  await app.register.signup(user.name, user.email, user.password);

  await expect(app.yourfeed.profileName).toContainText(user.name);
});

test('Пользователь может выйти из системы', async ({ app }) => {
  await app.main.openPage();
  await app.main.gotoRegister();
  const user = new UserBuilder().generateUserName().generateUserEmail().generateUserPassword().generate();
  await app.register.signup(user.name, user.email, user.password);
  await app.main.logout();

  await expect(app.main.signupButton).toBeVisible();
});
