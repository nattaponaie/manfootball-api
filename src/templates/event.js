const messages = (locationName, locationUrl, time, totalPlayers = 0) => ({
  'type': 'flex',
  'altText': 'เตะบอล',
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
          'text': '~ เตะบอลกันน ~',
          'size': 'xl',
          'weight': 'bold',
        },
        {
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
                  'text': `สถานที่: ${locationName}`,
                  'flex': 0,
                  'margin': 'sm',
                  'weight': 'bold',
                },
                {
                  'type': 'text',
                  'text': 'ดูแผนที่',
                  'size': 'xs',
                  'align': 'start',
                  'color': '#2341BB',
                  'action': {
                    'type': 'uri',
                    'label': 'locationUrl',
                    'uri': locationUrl,
                  },
                },
              ],
            },
            {
              'type': 'box',
              'layout': 'vertical',
              'contents': [
                {
                  'type': 'text',
                  'text': `เวลา: ${time}`,
                  'flex': 0,
                  'margin': 'sm',
                  'weight': 'bold',
                },
              ],
            },
            {
              'type': 'box',
              'layout': 'vertical',
              'contents': [
                {
                  'type': 'text',
                  'text': `จำนวน: ${totalPlayers} คน`,
                  'weight': 'bold',
                },
              ],
            },
            {
              'type': 'text',
              'text': 'พิมพ์ /+1 เพื่อบวก',
            },
          ],
        },
      ],
    },
  },
});

export default {
  messages,
};
