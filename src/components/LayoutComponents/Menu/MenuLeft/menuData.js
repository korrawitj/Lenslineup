export default [
  {
    title: 'แผงควบคุม',
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
        key: 'รายการอุปกรณ์',
        title: 'รายการอุปกรณ์',
        children: [
          {
            key: 'อุปกรณ์ทั้งหมด',
            title: 'อุปกรณ์ทั้งหมด',
            url: '/Product/list',
          },
          {
            key: 'เพิ่มอุปกรณ์',
            title: 'เพิ่มอุปกรณ์',
            url: '/Product/list/detail',
          },
        ],
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
        children: [
          {
            key: 'อุปกรณ์จัดชุดทั้งหมด',
            title: 'อุปกรณ์จัดชุดทั้งหมด',
            url: '/product/set',
          },
          {
            key: 'เพิ่มอุปกรณ์จัดชุด',
            title: 'เพิ่มอุปกรณ์จัดชุด',
            url: '/product/set/detail',
          },
        ],
      },
    ],
  },
  {
    title: 'รายการหน้าร้าน',
    key: 'Order',
    icon: 'icmn icmn-folder',
    children: [
      {
        key: 'เพิ่มรายการจอง',
        title: 'เพิ่มรายการจอง',
        url: '/order/list/detail',
      },
      {
        key: 'รายการทั้งหมด',
        title: 'รายการทั้งหมด',
        url: '/order/list',
      },
      {
        key: 'รายการรับวันนี้',
        title: 'รายการรับวันนี้',
        url: '/order/receive',
      },
      {
        key: 'รายการคืนวันนี้',
        title: 'รายการคืนวันนี้',
        url: '/order/restore',
      },
    ],
  },
]
