describe('Petstore API - Flujo Completo con Logs y Manejo de Errores', () => {

  const baseUrl = 'https://petstore.swagger.io/v2'
  const username = 'user' + Date.now()
  const userId = Date.now() // ID único para el usuario

  // Función para imprimir logs de manera consistente
  const logStep = (message) => cy.log(`🔹 ${message}`)

  it('Flujo completo: Crear, Buscar, Actualizar y Eliminar usuario', () => {

    logStep(`Usuario generado para prueba: ${username}`)

    // ----- CREAR USUARIO -----
    logStep('➡️ Creando usuario...')
    cy.request({
      method: 'POST',
      url: `${baseUrl}/user`,
      body: {
        id: userId,
        username: username,
        firstName: 'Martha',
        lastName: 'Rojas',
        email: 'martha@test.com',
        password: '123456',
        phone: '123456789',
        userStatus: 1
      },
      failOnStatusCode: false
    }).then((res) => {
      logStep(`✅ Usuario creado - Status: ${res.status}`)
      cy.log(`📄 Response body: ${JSON.stringify(res.body)}`)
      expect(res.status).to.eq(200)
    })

    // ----- BUSCAR USUARIO -----
    logStep('🔍 Buscando usuario creado...')
    cy.request({
      method: 'GET',
      url: `${baseUrl}/user/${username}`,
      failOnStatusCode: false
    }).then((res) => {
      logStep(`✅ Usuario encontrado - Status: ${res.status}`)
      cy.log(`📄 Response body: ${JSON.stringify(res.body)}`)
      expect(res.status).to.eq(200)
    })

    // ----- ACTUALIZAR USUARIO -----
    logStep('✏️ Actualizando usuario...')
    cy.request({
      method: 'PUT',
      url: `${baseUrl}/user/${username}`,
      body: {
        firstName: 'Actualizado',
        email: 'nuevo@test.com'
      },
      failOnStatusCode: false
    }).then((res) => {
      logStep(`✅ Usuario actualizado - Status: ${res.status}`)
      cy.log(`📄 Response body: ${JSON.stringify(res.body)}`)
      expect(res.status).to.eq(200)
    })

    // ----- ELIMINAR USUARIO -----
    logStep('🗑 Eliminando usuario...')
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/user/${username}`,
      failOnStatusCode: false
    }).then((res) => {
      logStep(`✅ Usuario eliminado - Status: ${res.status}`)
      cy.log(`📄 Response body: ${JSON.stringify(res.body)}`)
      expect(res.status).to.eq(200)
    })

    logStep(`🎉 Flujo completo finalizado para: ${username}`)

  })

  it('Usuario inexistente - Validación de error 404', () => {

    const fakeUser = 'usuario_fake'
    logStep(`🔍 Intentando buscar usuario inexistente: ${fakeUser}`)
    cy.request({
      method: 'GET',
      url: `${baseUrl}/user/${fakeUser}`,
      failOnStatusCode: false
    }).then((res) => {
      logStep(`✅ Status esperado: ${res.status}`)
      cy.log(`📄 Response body: ${JSON.stringify(res.body)}`)
      expect(res.status).to.eq(404)
    })

  })

})
