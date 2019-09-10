import {
  login,
  loginErrorInvalidUsername,
  loginErrorInvalidPassword,
  createAccountLink,
  createAccountAction,
  resetPassword } from '../../test-utils/cypress-tasks';

import { selectors } from '../../test-utils/selectors';

describe('Authenticator:', function() {

  beforeEach(function() {
    cy.visit('/');
  });

  describe('Sign In:', () => {
    it('renders a sign in header by default', () => {
      // Check for sign in page header
      cy.get(selectors.signInHeaderSection).contains('Sign in to your account');
    });

    it('renders a forgot password link', () => {
      cy.get(selectors.siginInForgotPasswordLink).contains('Reset password');
    });

    it('renders a create account link for users that do not have an account', ()=> {
      cy.get(selectors.signInCreateAccountLink).contains('Create account');
    });

    it('throws an error when username is empty', () => {
      // Check for empty username error
      cy.get(selectors.signInSignInButton).contains('Sign In').click();
      cy.get(selectors.signInError).contains("Username cannot be empty");
    });
  
    it('throws an error when there is an invalid username', () => {
      // Sign in Invalid Username
      loginErrorInvalidUsername();
    });
  });

  describe('Sign Up:', () => {
    beforeEach(() => {
      createAccountLink();
    });

    it('should have a header section with `Create a new account` within it', () => {
      cy.get(selectors.signUpHeaderSection).contains('Create a new account');
    });

    it('renders a username input by default', () => {
      cy.get('input[placeholder="Username"]');
    });

    it('renders a password input by default', () => {
      cy.get('input[placeholder="Password"]');
    });

    it('renders a email input by default', () => {
      cy.get('input[placeholder="Email"]');
    });

    it('renders a phone number input by default', () => {
      cy.get(selectors.signUpPhoneNumberInput);
    });

    it('renders a sign in link', () => {
      cy.get(selectors.signUpSignInLink).contains('Sign in');
    });

    it('should display a `Create Account` button', () => {
      cy.get(selectors.signUpCreateAccountButton).contains('Create Account');
    });
  });

  describe('Forgot Password:', () => {
    beforeEach(() => {
      resetPassword();
    });

    it('should navigate the user to the forgot password form', () => {
      cy.get(selectors.forgotPasswordHeaderSection).contains('Reset your password');
    });

    it('should have a username input present', () => {
      cy.get(selectors.usernameInput);
    });

    it('should have a `Back to sign in` link available within the form', () => {
      cy.get(selectors.forgotPasswordBackToSignInLink);
    });

    it('should navigate the user back to the sign in form', () => {
      cy.get(selectors.forgotPasswordBackToSignInLink).click();
      cy.get(selectors.signInHeaderSection).contains('Sign in to your account');
    });
  });
});
