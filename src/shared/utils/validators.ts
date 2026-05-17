export const validateEmail = (email: string) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
export const validatePassword = (password: string) => password.length >= 8;

export default { validateEmail, validatePassword };

