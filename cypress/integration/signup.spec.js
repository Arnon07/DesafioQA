import signiup from '../pages/SignupPages'
import SignupFactory from '../factories/SignupFactory'



describe('Signup', ()=>{

    var user = SignupFactory.login()

    it('register', ()=>{
        
        signiup.goRegister()
        signiup.signupForm(user)

        cy.get('input[type="submit"]').click()
        cy.get('.body-index .alert').should('have.text', 'Usuário inserido com sucesso')
    })

    it('login', ()=>{
        
        signiup.goLogin()
        signiup.login(user)

        cy.get('button[type=submit]').click()
        cy.get('.body-index .alert').should('have.text', 'Bem vindo, '+user.name+ '!')

    })

    it('add account', ()=>{

        signiup.goLogin()
        signiup.login(user)

        cy.get('button[type=submit]').click()
        cy.get('.dropdown .dropdown-toggle').click()
        cy.get('li ul a[href="/addConta"]').click()
        cy.get('input[name=nome]').type(user.accont)
        cy.get('button[type=submit]').click()

        cy.get('.body-index .alert').should('have.text', 'Conta adicionada com sucesso!')
    })
    
    it('Trying to add account with the same name', ()=>{
       
        signiup.goLogin()
        signiup.login(user)

        cy.get('button[type=submit]').click()
        cy.get('.dropdown .dropdown-toggle').click()
        cy.get('li ul a[href="/addConta"]').click()
        cy.get('input[name=nome]').type(user.accont)
        cy.get('button[type=submit]').click()

        cy.get('.body-index .alert').should('have.text', 'Já existe uma conta com esse nome!')

    })

    it('add movement', ()=>{
        signiup.goLogin()
        signiup.login(user)

        cy.get('button[type=submit]').click()
        cy.get('li a[href="/movimentacao"]').click()
        cy.get('[name="tipo"]').select('Despesa', {force: true})
        cy.get('input[name="data_transacao"]'). type('04/10/2022')
        cy.get('input[name="data_pagamento"]'). type('04/10/2022')
        cy.get('input[name="descricao"]'). type('Teste Movimentação')
        cy.get('input[name="interessado"]'). type(user.name)
        cy.get('input[name="valor"]'). type('100')
        cy.get('[name="conta"]').select(user.accont, {force: true})
        cy.get('#status_pago').click()
        cy.get('button[type="submit"]').click()

        cy.get('.body-index .alert').should('have.text', 'Movimentação adicionada com sucesso!')
    })

    it('Attempt to delete account on transactions',()=>{
        signiup.goLogin()
        signiup.login(user)

        cy.get('button[type=submit]').click()
        cy.get('.dropdown .dropdown-toggle').click()
        cy.get('li ul a[href="/contas"]').click()
        cy.get('td a[href="/removerConta?id=1433511"]').click() //Lembrar de pegar o id referente a conta no sistema

        cy.get('.body-index .alert').should('have.text', 'Conta em uso na movimentações')
    })

    it('Attempt to delete account oTrying to add movement with future dates and no formattingn transactions',()=>{
        signiup.goLogin()
        signiup.login(user)

        cy.get('button[type=submit]').click()
        cy.get('li a[href="/movimentacao"]').click()
        cy.get('[name="tipo"]').select('Despesa', {force: true})
        cy.get('input[name="data_transacao"]'). type('05102023')
        cy.get('input[name="data_pagamento"]'). type('05102023')
        cy.get('input[name="descricao"]'). type('Teste Movimentação')
        cy.get('input[name="interessado"]'). type('Teste')
        cy.get('input[name="valor"]'). type('100')
        cy.get('[name="conta"]').select(user.accont, {force: true})
        cy.get('#status_pago').click()
        cy.get('button[type="submit"]').click()

        cy.get('.body-index .alert ul li ').should('have.text', 'Data da Movimentação inválida (DD/MM/YYYY)Data da Movimentação deve ser menor ou igual à data atualData do pagamento inválida (DD/MM/YYYY)')
    })

    it('Trying to add movement without dates', ()=>{
        signiup.goLogin()
        signiup.login(user)

        cy.get('button[type=submit]').click()
        cy.get('li a[href="/movimentacao"]').click()
        cy.get('[name="tipo"]').select('Despesa', {force: true})
        
        cy.get('input[name="descricao"]').type('Teste Movimentação')
        cy.get('input[name="interessado"]').type('Teste')
        cy.get('input[name="valor"]').type('100')
        cy.get('[name="conta"]').select(user.accont, {force: true})
        cy.get('#status_pago').click()
        cy.get('button[type="submit"]').click()

        cy.get('.body-index .alert li').should('have.text', 'Data da Movimentação é obrigatórioData do pagamento é obrigatório')


    })

    it('Logout', ()=>{
        signiup.goLogin()
        signiup.login(user)

        cy.get('button[type=submit]').click()

        cy.get('li a[href="/logout"]').click()

        cy.get('li a[href="/login"]').should('have.text', 'Login')
    })
})