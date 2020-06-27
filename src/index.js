import express from 'express';
import * as line from '@line/bot-sdk';
import { get } from 'lodash';

import commandsTemplates from 'templates/commands';
import errorTemplates from 'templates/error';
import eventTemplates from 'templates/event';
import playerTemplates from 'templates/player';

import Event from 'models/event';

import eventService from 'services/event';
import peopleService from 'services/people';

import asyncWrapper from 'middleware/async-wrapper';
import { logError, logInfo } from 'utils/logger';

const app = express();

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  logInfo(`🍺  Ready ... ${PORT}`);
});

const router = express.Router();
const LINE_OA_CONFIG = {
  channelAccessToken: process.env.LINE_OA_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_OA_CHANNEL_SECRET,
};
const client = new line.Client(LINE_OA_CONFIG);
let eventModel = new Event();

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
      const userId = event.source.userId;

      if (eventMessageText === '/คำสั่ง') {
        const message = await commandsTemplates.messages();
        return client.replyMessage(event.replyToken, message);
      } else if (eventMessageText.includes('/สร้าง')) {
        try {
          const {
            location,
            locationUrl,
            time,
            totalPlayers,
          } = eventService.create(eventModel, eventMessageText);
          return client.replyMessage(event.replyToken, eventTemplates.messages(
            location,
            locationUrl,
            time,
            totalPlayers,
          ));
        } catch (error) {
          return client.replyMessage(event.replyToken, await errorTemplates.messages(error.message));
        }
      } else if (eventMessageText.includes('/เตะบอล')) {
        try {
          const {
            location,
            locationUrl,
            time,
            totalPlayers,
          } = eventService.getEventDesc(eventModel);
          return client.replyMessage(event.replyToken, eventTemplates.messages(
            location,
            locationUrl,
            time,
            totalPlayers
          ));
        } catch (error) {
          return client.replyMessage(event.replyToken, await errorTemplates.messages(error.message));
        }
      } else if (eventMessageText.includes('/+')) {
        try {
          const profile = await client.getProfile(userId);
          const {
            displayName,
            pictureUrl,
            totalPlayer,
            addedCount,
          } = peopleService.addPlayer(eventModel, eventMessageText, profile);
          return client.replyMessage(event.replyToken, await playerTemplates.addPlayer(displayName, pictureUrl, totalPlayer, addedCount));
        } catch (error) {
          return client.replyMessage(event.replyToken, await errorTemplates.messages(error.message));
        }
      } else if (eventMessageText.includes('/-')) {
        try {
          const profile = await client.getProfile(userId);
          const {
            displayName, pictureUrl, totalPlayer, removedCount,
          } = peopleService.removePlayer(eventModel, eventMessageText, profile);
          return client.replyMessage(event.replyToken, playerTemplates.removePlayer(displayName, pictureUrl, totalPlayer, removedCount));
        } catch (error) {
          return client.replyMessage(event.replyToken, await errorTemplates.messages(error.message));
        }
      } else if (eventMessageText.includes('/ใครไปบ้าง')) {
        try {
          const currentPlayers = peopleService.getCurrentPlayers(eventModel);
          return client.replyMessage(event.replyToken, playerTemplates.allPlayers(currentPlayers));
        } catch (error) {
          return client.replyMessage(event.replyToken, await errorTemplates.messages(error.message));
        }
      } else if (eventMessageText.includes('/ยกเลิก')) {
        try {
          if (userId !== '3b611def95ce29fea20ee4f56a9abf2f') {
            return;
          }
          const profile = await client.getProfile(userId);
          eventModel = new Event();
          return client.replyMessage(event.replyToken, await errorTemplates.messages(`อีเว้นท์ถูกยกเลิกโดย ${profile.displayName}`));
        } catch (error) {
          return client.replyMessage(event.replyToken, await errorTemplates.messages(error.message));
        }
      }
    }
  } catch (error) {
    logError('line.handleEvent:', error);
    throw error;
  }
};

app.use(router);
