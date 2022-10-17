import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS_ADMIN: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'MENU',
    group: true,
  },

  {
    title: 'POS',
    icon: 'grid-outline',
    children: [
      {
        title: 'List',
        link: '/pages/pos',
      },
    ],
  },
  {
    title: 'Employee',
    icon: 'grid-outline',
    children: [
      {
        title: 'List',
        link: '/pages/employee/employee-list',
      },
    ],
  },
  // {
  //   title: 'Areas',
  //   icon: 'grid-outline',
  //   children: [
  //     {
  //       title: 'List',
  //       link: '/pages/area/area-list',
  //     },
  //   ],
  // },
  {
    title: 'Branches',
    icon: 'grid-outline',
    children: [
      {
        title: 'List',
        link: '/pages/branch/branch-list',
      },
    ],
  },
  {
    title: 'Products',
    icon: 'grid-outline',
    children: [
      {
        title: 'Product Categories',
        link: '/pages/product/product-category',
      },
      // {
      //   title: 'Product Type',
      //   link: '/pages/product/product-type',
      // },
      {
        title: 'Attributes',
        link: '/pages/product/attribute',
      },
      {
        title: 'List',
        link: '/pages/product/product-list',
      },
    ],
  },
  {
    title: 'Customer',
    icon: 'grid-outline',
    children: [
      {
        title: 'List',
        link: '/pages/customer/customer-list',
      },
    ],
  },
  {
    title: 'Order',
    icon: 'grid-outline',
    children: [
      {
        title: 'List',
        link: '/pages/order/order-list',
      },
    ],
  },
  {
    title: 'Stock',
    icon: 'grid-outline',
    children: [
      {
        title: 'List',
        link: '/pages/stock/stock-list',
      },
      {
        title: 'Add',
        link: '/pages/stock/stock-add',
      },
      {
        title: 'Transfer',
        link: '/pages/stock/stock-transfer',
      },
    ],
  },
];

export const MENU_ITEMS_SUPERADMIN: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
    home: true,
  },
  {
    title: 'MENU',
    group: true,
  },
  {
    title: 'Store',
    icon: 'grid-outline',
    children: [
      {
        title: 'List',
        link: '/pages/store/store-list',
      },
      {
        title: 'Add',
        link: '/pages/store/store-add',
      },
    ],
  },
  {
    title: 'Employee',
    icon: 'grid-outline',
    children: [
      {
        title: 'List',
        link: '/pages/employee/employee-list',
      },
    ],
  },
  {
    title: 'Areas',
    icon: 'grid-outline',
    children: [
      {
        title: 'List',
        link: '/pages/area/area-list',
      },
    ],
  },
  // {
  //   title: 'Branches',
  //   icon: 'grid-outline',
  //   children: [
  //     {
  //       title: 'List',
  //       link: '/pages/branch/branch-list',
  //     },
  //   ],
  // },
  // {
  //   title: 'Products',
  //   icon: 'grid-outline',
  //   children: [
  //     {
  //       title: 'Product Categories',
  //       link: '/pages/product/product-category',
  //     },
  //     // {
  //     //   title: 'Product Type',
  //     //   link: '/pages/product/product-type',
  //     // },
  //     {
  //       title: 'Attributes',
  //       link: '/pages/product/attribute',
  //     },
  //     {
  //       title: 'List',
  //       link: '/pages/product/product-list',
  //     },
  //   ],
  // },
  {
    title: 'Customer',
    icon: 'grid-outline',
    children: [
      {
        title: 'List',
        link: '/pages/customer/customer-list',
      },
    ],
  },
  // {
  //   title: 'Order',
  //   icon: 'grid-outline',
  //   children: [
  //     {
  //       title: 'List',
  //       link: '/pages/order/order-list',
  //     },
  //   ],
  // },
];
