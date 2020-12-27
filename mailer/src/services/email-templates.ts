export class EmailTemplates {
  static activationTemplate(activationToken: string) {
    return `
    <h1>Welcome to Project Mark!</h1>
    <p>To activate your account, please click <a href="https://mark.dev/api/auth/activation/${activationToken}">here</a>
    `;
  }
}
