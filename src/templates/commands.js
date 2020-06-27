const commandList = [
  { cmd: '/สร้าง', description: 'ตัวอย่าง: /สร้าง (สถานที่) (เวลา)' },
  { cmd: '/+', description: 'ตัวอย่าง: /+1, /+2' },
];

const messages = async () => ({
  'type': 'flex',
  'altText': 'คำสั่งต่างๆ',
  'contents': {
    'type': 'bubble',
    'hero': {
      'type': 'image',
      'url': 'https://www.worcester.gov.uk/images/easyblog_shared/2019/b2ap3_amp_Football---carousel.jpg',
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
