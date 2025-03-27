const passwordValidation = (password: string) => {
    if (password.length < 8) {
        return "Password must be at least 8 characters long";
    } else if (password.length > 50) {
        return "Password must be at most 50 characters long";
    }   
    return null;
};

const emailValidation = (email: string) => {
    if (!email.includes("@") || !email.includes(".") || email.length > 50 || email.length < 5) {
        return "Email must be valid";
    }
    return null;
};

const nameValidation = (name: string) => {
    if (name.length < 2) {
        return "Name must be at least 2 characters long";
    } else if (name.length > 50) {
        return "Name must be at most 50 characters long";
    }
    return null;
}