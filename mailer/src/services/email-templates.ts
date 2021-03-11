export class EmailTemplates {
  static activationTemplate(activationToken: string) {
    return `
    <h1>Welcome to Project Mark!</h1>
    <p>To activate your account, please click <a href="https://${process.env.HOST_URL}/activate/${activationToken}">here</a>
    `;
  }

  static resetPasswordTemplate(token: string) {
    return `
    <h1>Hello!</h1>
    <p>You recently requested to reset your password for your Project Mark account.  </p>
    <p>Click <a href="https://${process.env.HOST_URL}/password/reset?token=${token}">here</a> to reset it. </p>
    `;
  }
}
