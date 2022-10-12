const guards = [
    {
        path: "/:catchAll(.*)",
        beforeEnter: (to, from, next) => {
            next({name: 'notFound'});
        }
    }
];

export default guards;
