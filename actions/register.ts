"use server"

export default async function register(formData: FormData) {
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')
    console.log(name, email, password)
}
