module.exports = ()=> async (ctx,next)=>{
    console.log(ctx.app.config.coreMiddleware.concat(ctx.app.config.appMiddlewares));
    await next();
}