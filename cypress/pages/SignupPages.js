class SignupPages {

    goRegister (){
        cy.visit('https://seubarriga.wcaquino.me/cadastro')       
    }

    goLogin (){
        cy.visit('/')
    }

    signupForm(user){

        cy.get('input[name="nome"]').type(user.name)
        cy.get('input[name="email"]').type(user.email)
        cy.get('input[name="senha"]').type(user.password)

    }

    login(user){
        cy.get('input[name="email"]').type(user.email)
        cy.get('input[name="senha"]').type(user.password)
    }
}

export default new SignupPages;