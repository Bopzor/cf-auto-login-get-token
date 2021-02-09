/// <reference types="cypress" />
describe('Login', () => {
  it('login', () => {
    cy.visit(`${Cypress.env('CF_URL')}/authorize?response_type=code&client_id=${Cypress.env('CLIENT_ID')}`);

    cy.intercept('http://localhost:8080').as('authCode');

    cy.get('input[name="username"]').type(Cypress.env('USERNAME'));
    cy.get('input[name="password"]').type(Cypress.env('PASSWORD'));
    cy.get('input[type="submit"]').click();

    cy.wait('@authCode').then(({request, response}) => {
      const { url } = request;

      const code = url.split('=')[1];

      const command = `curl --location --request POST -u ${Cypress.env('CLIENT_ID')}:${Cypress.env('CLIENT_SECRET')} '${Cypress.env('CF_URL')}/token?response_type=token&code=${code}&grant_type=authorization_code'`;

      cy.exec(command).then((res) => {
        const parsed = JSON.parse(res.stdout);

        const token = parsed.access_token;


        cy.writeFile(Cypress.env('ENV_PATH'), `JWT=${token}`, { flag: 'a' });
      })
    })
  });
})
