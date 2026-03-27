describe('Petstore User API Tests', () => {

  const baseUrl = 'https://petstore.swagger.io/v2'
  const username = 'user' + Date.now()

  const userData = {
    id: 12345,
    username: username,
    firstName: 'Martha',
    lastName: 'Rojas',
    email: 'martha@test.com',
    password: '123456',
    phone: '123456789',
    userStatus: 1
  }

  it('Crear usuario', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/user`,
      body: userData
    }).then((response) => {
      expect(response.status).to.eq(200)
      cy.log('Usuario creado:', JSON.stringify(userData))
    })
  })

  it('Buscar usuario creado', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/user/${username}`
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.username).to.eq(username)
    })
  })

  it('Actualizar usuario', () => {
    const updatedData = {
      ...userData,
      firstName: 'Martha Actualizada',
      email: 'actualizado@test.com'
    }

    cy.request({
      method: 'PUT',
      url: `${baseUrl}/user/${username}`,
      body: updatedData
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })

  it('Buscar usuario actualizado', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/user/${username}`
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.firstName).to.eq('Martha Actualizada')
      expect(response.body.email).to.eq('actualizado@test.com')
    })
  })

  it('Eliminar usuario', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/user/${username}`
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })

})
