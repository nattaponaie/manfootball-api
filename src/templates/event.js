const messages = (locationName, locationUrl, time) => ({
  'type': 'flex',
  'altText': 'เตะบอล',
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
      'action': {
        'type': 'uri',
        'label': 'Action',
        'uri': 'https://linecorp.com',
      },
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
          ],
        },
      ],
    },
  },
});

export default {
  messages,
};
