const messages = (displayName, profileUrl, totalPlayer, addedCount) => ({
  'type': 'flex',
  'altText': 'คนบวกเพิ่มจ้าา',
  'contents': {
    'type': 'bubble',
    'hero': {
      'type': 'image',
      'url': profileUrl,
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
          'text': '!! เอ้า คนบวกเพิ่ม !!',
          'size': 'xl',
          'gravity': 'bottom',
          'weight': 'bold',
          'wrap': true,
        },
        {
          'type': 'box',
          'layout': 'vertical',
          'margin': 'md',
          'contents': [
            {
              'type': 'text',
              'text': `นักเตะ: ${displayName}`,
              'flex': 0,
              'margin': 'md',
              'size': 'sm',
            },
            {
              'type': 'text',
              'text': `บวกเพิ่ม: ${addedCount} คน`,
              'size': 'sm',
            },
          ],
        },
      ],
    },
    'footer': {
      'type': 'box',
      'layout': 'vertical',
      'spacing': 'md',
      'contents': [
        {
          'type': 'separator',
        },
        {
          'type': 'text',
          'text': `รวมทั้งหมด: ${totalPlayer} คน`,
          'weight': 'bold',
        },
        {
          'type': 'text',
          'text': 'แล้วเจอกัน :)',
          'margin': 'md',
        },
      ],
    },
  },
});

export default {
  messages,
};
