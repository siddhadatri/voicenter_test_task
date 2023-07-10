import LoginPageObject from '../support/pages/login.pageObject';
import ResetPasswordPageObject from '../support/pages/resetPassword.pageObject';

const loginPage = new LoginPageObject();
const resetPasswordPage = new ResetPasswordPageObject();

const testData = {
  existingEmail: 'pespatron@gmail.com',
  existingPassword: 'harnaUkrainkaJa',
  nonExistingEmail: 'NonExistingemail@gmail.com',
  nonExistingPassword: 'NonExistingPassword',
  invalidEmail: 'invalidEmail.gmail.com'
};

describe('login page', () => {

  beforeEach(() => {
    loginPage.visit();
    cy.wait(500)
  });

  it('should provide an ability to log in with existing credentials', () => {
    loginPage.emailField.clear().type(testData.existingEmail);
    loginPage.passwordField.clear().type(testData.existingPassword);
    loginPage.confirmButton.click();
    loginPage.assertLogin('Hello my dear friend');
  })

  it('should not provide an ability to log in with non-existenting credentials', () => {
    loginPage.emailField.clear().type(testData.nonExistingEmail);
    loginPage.passwordField.clear().type(testData.nonExistingPassword);
    loginPage.confirmButton.click();
    loginPage.assertFailedLogin('No such user');
  })

  it('should provide an ability to reset password', () => {
    loginPage.forgotPasswordLink.click();
    resetPasswordPage.assertVisiting();
    resetPasswordPage.emailField.clear().type(testData.existingEmail);
    resetPasswordPage.confirmButton.click();
    resetPasswordPage.assertResetting(testData.existingPassword);
  })

  it('should not provide an ability to reset password with non-existenting email', () => {
    loginPage.forgotPasswordLink.click();
    resetPasswordPage.assertVisiting();
    resetPasswordPage.emailField.clear().type(testData.nonExistingEmail);
    resetPasswordPage.confirmButton.click();
    resetPasswordPage.assertFailedReset('No such user');
  })

  it('should provide an ability to return to the login', () => {
    loginPage.forgotPasswordLink.click();
    resetPasswordPage.assertVisiting();
    resetPasswordPage.returnLink.click();
    loginPage.assertVisiting();
  })

  it('should not provide an ability to login with wrong email', () => {
    loginPage.emailField.clear().type(testData.nonExistingEmail);
    loginPage.passwordField.clear().type(testData.existingPassword);
    loginPage.confirmButton.click();
    loginPage.assertWrongCredentials('No such user');
  })

  it('should not provide an ability to login with wrong password', () => {
    loginPage.emailField.clear().type(testData.existingEmail);
    loginPage.passwordField.clear().type(testData.nonExistingPassword);
    loginPage.confirmButton.click();
    loginPage.assertWrongCredentials('Wrong password');
  })

  it('should not provide an ability to login with empty email', () => {
    loginPage.emailField.clear().type(testData.existingEmail).clear();
    loginPage.passwordField.clear().type(testData.existingPassword);
    loginPage.confirmButton.click();
    loginPage.assertWrongCredentials('*Це поле є обов*язковим');
  })

  it('should not provide an ability to login with empty password', () => {
    loginPage.emailField.clear().type(testData.existingEmail);
    loginPage.passwordField.clear().type(testData.existingPassword).clear();
    loginPage.confirmButton.click();
    loginPage.assertWrongCredentials('*Це поле є обов*язковим!');
  })

  it('should not provide an ability to login with an incorrect email format', () => {
    loginPage.emailField.clear().type(testData.invalidEmail);
    loginPage.passwordField.clear().type(testData.existingPassword);
    loginPage.confirmButton.click();
    loginPage.assertWrongCredentials('*Це поле має бути електронною поштою');
  })
})
