import PageObject from '../PageObject';

class ResetPasswordPageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    return cy.get('input[type=email]');
  }

  get confirmButton() {
    return cy.contains('button', 'Отримати пароль');
  }

  get returnLink() {
    return cy.get('a[href="/login"]');
  }

  assertVisiting() {
    return cy.url().should('include', '/forgot_password')
  }

  assertFailedReset(modalText) {
    cy.get('p').should('contain', modalText);
  }

  assertResetting(password) {
    cy.get('p').should('contain', `Пароль: ${password}`);
  }
}

export default ResetPasswordPageObject;