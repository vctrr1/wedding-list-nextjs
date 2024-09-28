import bcrypt from "bcryptjs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function saltAndHashPassword(password: any) {
    const saltRounds = 10; // Adjust the cost factor according to your security requirem
    const salt = bcrypt.genSaltSync(saltRounds); // Synchronously generate a salt
    const hash = bcrypt.hashSync(password, salt); // Synchronously hash the password
    return hash; // Return the hash directly as a string
}