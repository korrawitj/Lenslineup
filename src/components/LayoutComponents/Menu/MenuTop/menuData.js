export default [
  {
    title: 'Dashboard',
    key: 'dashboard',
    url: '/dashboard',
    icon: 'icmn icmn-stack',
  },
  // {
  //   title: 'Empty Page',
  //   key: 'empty',
  //   url: '/empty',
  //   icon: 'icmn icmn-books',
  // },
  {
    title: 'อุปกรณ์',
    key: 'Product',
    icon: 'icmn icmn-database',
    children: [
      {
        key: 'อุปกรณ์ทั้งหมด',
        title: 'อุปกรณ์ทั้งหมด',
        url: '/Product/List',
      },
      {
        key: 'ประเภท',
        title: 'ประเภท',
        url: '/',
      },
      {
        key: 'อุปกรณ์ที่ให้ไประหว่างเช่า',
        title: 'อุปกรณ์ที่ให้ไประหว่างเช่า',
        url: '/Product/Include',
      },
      {
        key: 'อุปกรณ์จัดชุด',
        title: 'อุปกรณ์จัดชุด',
        url: '/',
      },
    ],
  },
]
