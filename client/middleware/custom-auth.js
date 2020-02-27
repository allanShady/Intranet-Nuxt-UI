export default function(context) {
    const expirationDate = new Date(localStorage.getItem('expiration_date'))
    
    if (!(localStorage.getItem('token') && (new Date() < expirationDate)))
        context.redirect("/login")
}