import express from 'express';
import * as line from '@line/bot-sdk';
import { get } from 'lodash';

import commandsTemplates from 'templates/commands';
import errorTemplates from 'templates/error';
import eventTemplates from 'templates/event';

import Event from 'models/event';

import asyncWrapper from 'middleware/async-wrapper';
import { logError, logInfo } from 'utils/logger';

const app = express();

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.info(`🍺  Ready ... ${PORT}`);
});

const router = express.Router();
const LINE_OA_CONFIG = {
  channelAccessToken: '',
  channelSecret: '',
};
const client = new line.Client(LINE_OA_CONFIG);
const eventModel = new Event();

router.post(
  '/webhook',
  line.middleware(LINE_OA_CONFIG),
  asyncWrapper(async (req, res) => {
    logInfo(req.body.events);
  
    // req.body.events should be an array of events
    if (!Array.isArray(req.body.events)) {
      return res.status(500).end();
    }
    // handle events separately
    await Promise.all(req.body.events.map(async event => {
      if (event.replyToken === '00000000000000000000000000000000' || event.replyToken === 'ffffffffffffffffffffffffffffffff') {
        return;
      }
      return await handleEvent(client, event);
    }))
      .then(() => res.end())
      .catch((err) => {
        logError('webhook', err);
        res.status(500).end();
      });
  })
);

const handleEvent = async (client, event) => {
  try {
    const eventType = get(event, 'type');
    const eventMessageType = get(event, ['message', 'type']);
    if (eventType !== 'message' || eventMessageType !== 'text') {
      // ignore non-text-message event
      return Promise.resolve(null);
    }
  
    if (eventType === 'message' && eventMessageType === 'text') {
      const eventMessageText = get(event, ['message', 'text']);

      if (eventMessageText === '/คำสั่ง') {
        const message = await commandsTemplates.messages();
        return client.replyMessage(event.replyToken, message);
      } else if (eventMessageText.includes('/สร้าง')) {
        const splitedMsg = eventMessageText.split(' ') ;
        if (splitedMsg.length !== 3) {
          const message = await errorTemplates.messages('คำสั่งผิดจ้า /สร้าง (สถานที่) (เวลา)');
          return client.replyMessage(event.replyToken, message);
        }
        
        eventModel.setLocation(splitedMsg[1]);
        eventModel.setTime(splitedMsg[2]);
        const {
          location,
          locationUrl,
          time,
        } = eventModel.getEventDesc();
        return client.replyMessage(event.replyToken, eventTemplates.messages(
          location,
          locationUrl,
          time
        ));
      } else if (eventMessageText.includes('/+')) {
        console.log('eventMessageText', eventMessageText);
        const splitedMsg = eventMessageText.split('/+');
        console.log('splitedMsg', splitedMsg);
        
        
      }
    }
  } catch (error) {
    logError('line.handleEvent:', error);
    throw error;
  }
};

app.use(router);
