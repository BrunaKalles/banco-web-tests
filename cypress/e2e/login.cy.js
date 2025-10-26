describe('Login', () => {
  beforeEach(() => {
    //Arrange
    cy.visit('http://localhost:4000')
    cy.screenshot('Após visitar página')
  })
  
  it('Login com dados válidos deve permitir a entrada no sistema', () => {

    cy.get('#username').click().type('julio.lima')
    cy.get('#senha').click().type('123456')
    cy.screenshot('Após preencher dados válidos')
    cy.contains('button', 'Entrar').click()
    cy.screenshot('Após clicar no botão entrar')

    //Assert
    cy.contains('h4','Realizar Transferência').should('be.visible')
  })

  it('Login com dados inválidos deve apresentar mensagem de erro', () => {
    cy.get('#username').click().type('julio.lima')
    cy.get('#senha').click().type('654321')
    cy.contains('button', 'Entrar').click()

    //Assert
    cy.get('.toast').should('have.text', 'Erro no login. Tente novamente.')
  })
})