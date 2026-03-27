describe('Petstore User API - Flujo CRUD', () => {

  const baseUrl = 'https://petstore.swagger.io/v2'
  const username = 'user' + Date.now()

  const user = {
    id: Date.now(),
    username: username,
    firstName: 'Martha',
    lastName: 'Rojas',
    email: 'martha@test.com',
    password: '123456',
    phone: '123456789',
    userStatus: 1
  }

  it('CRUD completo usuario', () => {

    cy.log('Usuario generado: ' + username)

    // Crear
    cy.request('POST', `${baseUrl}/user`, user).then((res) => {
      expect(res.status).to.eq(200)
    })

    // Leer
    cy.request('GET', `${baseUrl}/user/${username}`).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.username).to.eq(username)
    })

    // Actualizar
    const updatedUser = {
      ...user,
      firstName: 'Actualizado',
      email: 'actualizado@test.com'
    }

    cy.request('PUT', `${baseUrl}/user/${username}`, updatedUser).then((res) => {
      expect(res.status).to.eq(200)
    })

    // Validar actualización
    cy.request('GET', `${baseUrl}/user/${username}`).then((res) => {
      expect(res.body.firstName).to.eq('Actualizado')
      expect(res.body.email).to.eq('actualizado@test.com')
    })

    // Eliminar
    cy.request('DELETE', `${baseUrl}/user/${username}`).then((res) => {
      expect(res.status).to.eq(200)
    })

  })

})

}) cy.log('Usuario:', username)
