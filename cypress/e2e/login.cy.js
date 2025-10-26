describe('Login', () => {
  beforeEach(() => {
    //Arrange
    cy.visit('http://localhost:4000')
    cy.screenshot('Após visitar página')
  })
  
  it('Login com dados válidos deve permitir a entrada no sistema', () => {

    cy.fixture('credencias').then(credenciais => {
      cy.get('#username').click().type(credenciais.valida.username)
      cy.get('#senha').click().type(credenciais.valida.senha)
    })

    cy.screenshot('Após preencher dados válidos')
    cy.contains('button', 'Entrar').click()
    cy.screenshot('Após clicar no botão entrar')

    //Assert
    cy.contains('h4','Realizar Transferência').should('be.visible')
  })

  it('Login com dados inválidos deve apresentar mensagem de erro', () => {
     
    cy.fixture('credencias').then(credenciais => {
      cy.get('#username').click().type(credenciais.inválida.username)
      cy.get('#senha').click().type(credenciais.inválida.senha)
    }) 
    cy.contains('button', 'Entrar').click()

    //Assert
    cy.get('.toast').should('have.text', 'Erro no login. Tente novamente.')
  })
})