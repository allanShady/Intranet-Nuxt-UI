export default function(context) {
    console.log("[Middleware] Just Auth");
    console.log(context.store)

    const expirationDate = new Date(localStorage.getItem('expiration_date'))
    
    if (!(localStorage.getItem('token') && (new Date() < expirationDate)))
        context.redirect("/login")

        //Call store and clear auth data
}