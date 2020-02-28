export default function(context) {
    console.log("[Middleware] Just Auth");
    console.log(context.store)
    //if (!context.store.getters.isAuthenticated) {
    //  context.redirect("/login");
    //}
}