export default async function handler(){
    const token = localStorage.getItem("token")
    return token;
}