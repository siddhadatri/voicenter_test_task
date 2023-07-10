import PageObject from '../PageObject';

class LoginPageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    return cy.get('input[type=email]');
  }

  get passwordField() {
    return cy.get('input[type=password]');
  }

  get confirmButton() {
    return cy.contains('button', 'Ввести');
  }

  get forgotPasswordLink() {
    return cy.get('a[href="/forgot_password"]');
  }

  assertLogin(modalText) {
    cy.get('h1').should('contain', modalText);
  }

  assertFailedLogin(modalText) {
    cy.get('p').should('contain', modalText);
  }

  assertVisiting() {
    return cy.url().should('include', '/login')
  }

  assertWrongCredentials(modalText) {
    cy.get('div').should('contain', modalText);
  }
}

export default LoginPageObject;
