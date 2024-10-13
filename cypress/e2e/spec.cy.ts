describe('Weather App', () => {
	beforeEach(() => {
		cy.visit('http://localhost:5173');
	});

	it('should display the search input and button', () => {
		cy.get('.search-box input').should('be.visible');
		cy.get('.search-box button').should('be.visible');
	});

	it('should allow the user to search for a city and display weather info', () => {
		cy.intercept('GET', '**/data/2.5/weather*', {
			fixture: 'weather-response.json',
		}).as('getWeather');

		cy.get('.search-box input').type('Copenhagen');
		cy.get('.search-box button').click();
		cy.wait('@getWeather');
		cy.get('.weather-card').should('be.visible');
		cy.get('.weather-card h1').should('contain', 'Copenhagen'); // Check if the city name is displayed
	});

	it('should display weather info when a location is clicked on the map', () => {
		cy.wait(2000);
		cy.get('.leaflet-container').click(300, 300);
		cy.get('.weather-card').should('be.visible');
	});
});
