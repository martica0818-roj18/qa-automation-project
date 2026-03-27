describe('API Test', () => {
  it('GET users', () => {
    cy.request('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        expect(response.status).to.eq(200)
      })
  })
})
