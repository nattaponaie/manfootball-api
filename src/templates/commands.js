const commandList = [
  { cmd: '/สร้าง', description: 'ตัวอย่าง: /สร้าง (สถานที่) (เวลา)' },
  { cmd: '/เตะบอล', description: 'รายละเอียด' },
  { cmd: '/+', description: 'ตัวอย่าง: /+1, /+2' },
  { cmd: '/ใครไปบ้าง', description: 'ดูซิว่าใครไปบ้าง' },
];

const messages = async () => ({
  'type': 'flex',
  'altText': 'คำสั่งต่างๆ',
  'contents': {
    'type': 'bubble',
    'hero': {
      'type': 'image',
      'url': 'https://f.ptcdn.info/741/018/000/1399631024-1397983933-o.jpg',
      'size': 'full',
      'aspectRatio': '20:13',
      'aspectMode': 'cover',
    },
    'body': {
      'type': 'box',
      'layout': 'vertical',
      'spacing': 'md',
      'contents': [
        {
          'type': 'text',
          'text': 'เตะบอลกันน ~',
          'size': 'xl',
          'weight': 'bold',
        },
        ...commandList.map((command, index) => ({
          'type': 'box',
          'layout': 'vertical',
          'spacing': 'sm',
          'contents': [
            {
              'type': 'box',
              'layout': 'vertical',
              'contents': [
                {
                  'type': 'text',
                  'text': `${index+1}. ${command.cmd}`,
                  'flex': 0,
                  'margin': 'sm',
                  'weight': 'bold',
                },
                {
                  'type': 'text',
                  'text': command.description,
                  'size': 'xs',
                  'align': 'start',
                  'color': '#AAAAAA',
                },
              ],
            },
          ],
        })),
      ],
    },
  },
});

export default {
  messages,
};
