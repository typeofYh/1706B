module.exports = app => {
    let {router,controller} = app;
    let {getuserinfo} = app.middlewares;
    router.get('/',controller.index.init);
     /**
     * 注册
     */
    router.post('/registry',controller.user.index);
    /**
     * 获取身份信息
     */
    router.get('/identity',controller.user.getIdntity);
     /**
     * 登陆
     */
    router.post('/login',controller.user.login)
     /**
     * 获取用户信息
     */
    router.get('/getuserinfo',getuserinfo(),controller.user.getuserinfo)
    /**
     *  提交成绩
     */
    router.post('/submitexam',getuserinfo(),controller.exam.submit)
    /**
     * 查询成绩 (根据身份返回数据) 
     * 1. 学生身份 返回学生自己的成绩
     * 2. 老师身份 返回所有的成绩
     */
    router.get('/searchexam',getuserinfo(),controller.exam.search);
}