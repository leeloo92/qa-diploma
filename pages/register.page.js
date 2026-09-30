export class RegisterPage {
    constructor(page) {
        this.page = page;
        this.yournameInput = page.getByRole('textbox', { name: 'Your Name' });
        this.emailInput = page.getByRole('textbox', { name: 'Email' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.signupButton = page.getByRole('button', { name: 'Sign up' });
    }
    async signup(username, email, password) {
        await this.yournameInput.click();
        await this.yournameInput.fill(username);
        await this.emailInput.click();
        await this.emailInput.fill(email);
        await this.passwordInput.click();
        await this.passwordInput.fill(password);
        await this.signupButton.click();
    }
}