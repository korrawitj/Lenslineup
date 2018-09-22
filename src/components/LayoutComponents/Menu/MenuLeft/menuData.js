export default [
  {
    title: 'Dashboard',
    key: 'dashboard',
    url: '/dashboard',
    icon: 'icmn icmn-stack',
  },
  {
    title: 'ตั้งค่าร้าน',
    key: 'Config',
    url: '/configuration',
    icon: 'fa fa-gear',
  },
  {
    title: 'อุปกรณ์',
    key: 'Product',
    icon: 'icmn icmn-drive',
    children: [
      {
        key: 'อุปกรณ์ทั้งหมด',
        title: 'อุปกรณ์ทั้งหมด',
        url: '/Product/list',
      },
      {
        key: 'ประเภท',
        title: 'ประเภท',
        url: '/Product/Category',
      },
      {
        key: 'อุปกรณ์ที่ให้ไประหว่างเช่า',
        title: 'อุปกรณ์ที่ให้ไประหว่างเช่า',
        url: '/Product/item',
      },
      {
        key: 'อุปกรณ์จัดชุด',
        title: 'อุปกรณ์จัดชุด',
        url: '/Product/Set',
      },
    ],
  },
]
