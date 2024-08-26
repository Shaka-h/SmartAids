export default [
    {
        path: "/pdp",
        // component: AdminMain,
        // redirect: "/dashboard",
        children: [
            {
                path: '/pdp',
                name: 'pdp',
                component: () => import('@/views/pdp/pdpList.vue')
            },
            // {
            //     path: 'details/:pdpId',
            //     name: 'pdpDetails',
            //     component: () => import('@/views/pdp/pdpDetails/pdpDetails.vue'),
            //     children: [
            //         {
            //             path: 'tech-details',
            //             name: 'techDetails',
            //             component: () => import('@/views/pdp/pdpDetails/techDetails.vue')
            //         },
            //         {
            //             path: 'material-details',
            //             name: 'materialDetails',
            //             component: () => import('@/views/pdp/pdpDetails/materialDetails.vue')
            //         },
            //         {
            //             path: 'attachment-details',
            //             name: 'attachmentDetails',
            //             component: () => import('@/views/pdp/pdpDetails/attachmentDetails.vue')
            //         }
            //     ]
            // }
        ]
    }

];
