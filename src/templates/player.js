const allPlayers = (currentPlayers = []) => ({
  'type': 'flex',
  'altText': 'ใครไปบ้าง',
  'contents': {
    'type': 'bubble',
    'body': {
      'type': 'box',
      'layout': 'vertical',
      'spacing': 'md',
      'contents': [
        {
          'type': 'text',
          'text': 'รายชื่อนักเตะ',
          'size': 'xl',
          'weight': 'bold',
        },
        ...currentPlayers.map((player, index) => ({
          'type': 'box',
          'layout': 'horizontal',
          'spacing': 'md',
          'contents': [
            {
              'type': 'image',
              'url': player.pictureUrl,
              'margin': 'none',
              'align': 'center',
              'size': 'xxs',
              'aspectMode': 'fit',
            },
            {
              'type': 'box',
              'layout': 'vertical',
              'spacing': 'none',
              'margin': 'none',
              'contents': [
                {
                  'type': 'text',
                  'text': `${index+1}. ${player.displayName}`,
                  'size': 'xs',
                  'align': 'start',
                  'gravity': 'bottom',
                  'weight': 'bold',
                  'wrap': true,
                },
                {
                  'type': 'text',
                  'text': `จำนวน: ${player.quantity || 1} คน`,
                  'size': 'xxs',
                  'wrap': true,
                },
              ],
            },
          ],
        })),
      ],
    },
    'footer': {
      'type': 'box',
      'layout': 'vertical',
      'contents': [
        {
          'type': 'separator',
        },
        {
          'type': 'text',
          'text': 'รวมทั้งหมด: 20 คน',
          'margin': 'md',
        },
      ],
    },
  },
});

const addPlayer = (displayName, profileUrl, totalPlayer, addedCount) => ({
  'type': 'flex',
  'altText': `${displayName} บวกเพิ่มจ้าา`,
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

const removePlayer = (displayName, profileUrl, totalPlayer, removedCount) => ({
  'type': 'flex',
  'altText': `${displayName} ถอนตัว :(`,
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
          'text': 'แงง มีคนเบี้ยว T^T',
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
              'text': `ลบ: ${removedCount} คน`,
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
          'text': `จำนวนที่เหลือ: ${totalPlayer} คน`,
          'weight': 'bold',
        },
        {
          'type': 'text',
          'text': 'อย่าลบเพิ่มอีกน้าา ~',
          'margin': 'md',
        },
      ],
    },
  },
});

export default {
  addPlayer,
  allPlayers,
  removePlayer,
};
