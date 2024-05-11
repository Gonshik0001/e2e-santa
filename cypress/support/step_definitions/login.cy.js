import { Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";
const users = require("../../fixtures/users.json");

Given("User is on secret santa login page", function () {
cy.visit("/login");
});
    
//When("user logs in as {string} and {string}", function (string, string2) {
//cy.login(string, string2);
//});
Then("user is on dashboard page", function () {
cy.login(users.userAutor.email, users.userAutor.password);
});

Given("user is on dasboard page", function () {
cy.contains("Создать коробку").click();{
"pageLoadTimeout": 20000 // Здесь указывается время ожидания в миллисекундах (в данном случае 10 секунд)
}
});

