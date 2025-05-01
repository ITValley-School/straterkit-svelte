
export const menuData = [
    {
        menuTitle: 'MAIN'
    },
    {
        type: 'sub',
        title: 'Dashboards',
        icon: 'bx bx-home',
        badge: '12',
        badgeColor: 'bg-warning-transparent',
        selected: false,
        active: false,
        dirchange: false,
        children: [
            { path: '/dashboards/crm', type: 'link', title: 'CRM', selected: false, active: false, dirchange: false, },
        ]
    },
    {
        type: 'sub',
        title: 'Error',
        icon: 'bx bx-error',
        selected: false,
        active: false,
        dirchange: false,
        children: [
            {
                path: '/error/error-401',
                type: 'link',
                title: 'Error 401',
                selected: false,
                active: false,
                dirchange: false,
            },
        ]
    },
    {
        type: 'sub',
        title: 'Nested Menu',
        icon: 'bx bx-layer',
        selected: false,
        active: false,
        dirchange: false,
        children: [
            {
                path: '',
                type: 'empty',
                title: 'Nested-1',
                selected: false,
                active: false,
                dirchange: false,
            },
            {
                type: 'sub',
                title: 'Nested-2',
                selected: false,
                active: false,
                dirchange: false,
                children: [
                    {
                        path: '',
                        type: 'empty',
                        title: 'Nested-2-1',
                        selected: false,
                        active: false,
                        dirchange: false,
                    },
                    {
                        type: 'sub',
                        title: 'Nested-2-2',
                        selected: false,
                        active: false,
                        dirchange: false,
                        children: [
                            {
                                path: '',
                                type: 'empty',
                                title: 'Nested-2-2-1',
                                selected: false,
                                active: false,
                                dirchange: false,
                            },
                            {
                                path: '',
                                type: 'empty',
                                title: 'Nested-2-2-2',
                                selected: false,
                                active: false,
                                dirchange: false,
                            },

                        ]
                    }
                ]
            }
        ]
    },
];
const MOCK_DATA = {
    menuData
}

export default MOCK_DATA;