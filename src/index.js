import express from 'express';
import * as line from '@line/bot-sdk';
import { get } from 'lodash';
import mongoose from 'mongoose';

import eventDBModel from 'database/models/event';

import commandsTemplates from 'templates/commands';
import errorTemplates from 'templates/error';
import eventTemplates from 'templates/event';
import playerTemplates from 'templates/player';

import eventService from 'services/event';
import lineService from 'services/line';
import peopleService from 'services/people';

import asyncWrapper from 'middleware/async-wrapper';
import { logError, logInfo } from 'utils/logger';

const app = express();

mongoose.connect(`mongodb+srv://manman-football-prod:${process.env.DB_PASSWORD}@manman-football.tsoky.mongodb.net/manman-db?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => logInfo('Connect to MongoDB successfully')).catch((error) => logError('Error connection with MongoDB', error));

const router = express.Router();
const LINE_OA_CONFIG = {
  channelAccessToken: process.env.LINE_OA_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_OA_CHANNEL_SECRET,
};
const client = new line.Client(LINE_OA_CONFIG);

router.post(
  '/api/webhook',
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
          let eventModel = await eventService.findLatest();
          if (!eventModel) {
            eventModel = new eventDBModel();
          }
          const {
            location,
            locationUrl,
            time,
            totalPlayers,
          } = eventService.create(eventModel, eventMessageText);
          eventModel.save();
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
          let eventModel = await eventService.findLatest();
          if (!eventModel) {
            eventModel = new eventDBModel();
          }
          const {
            location,
            locationUrl,
            time,
            totalPlayers,
          } = eventService.getEventDesc(eventModel);
          eventModel.save();
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
          let eventModel = await eventService.findLatest();
          if (!eventModel) {
            eventModel = new eventDBModel();
          }
          // const groupId = get(event, ['source', 'groupId']);
          // if (groupId) {
          //   eventService.addGroupId(eventModel, groupId);
          // }

          const profile = await lineService.getUserProfile(client, event.source);
          
          const {
            displayName,
            pictureUrl,
            totalPlayer,
            addedCount,
          } = peopleService.addPlayer(eventModel, eventMessageText, profile);
          eventModel.save();
          return client.replyMessage(event.replyToken, playerTemplates.addPlayer(displayName, pictureUrl, totalPlayer, addedCount));
        } catch (error) {
          return client.replyMessage(event.replyToken, await errorTemplates.messages(error.message));
        }
      } else if (eventMessageText.includes('/-')) {
        try {
          let eventModel = await eventService.findLatest();
          if (!eventModel) {
            eventModel = new eventDBModel();
          }
          // const groupId = get(event, ['source', 'groupId']);
          // if (groupId) {
          //   eventService.addGroupId(eventModel, groupId);
          // }
          
          const profile = await lineService.getUserProfile(client, event.source);
          const {
            displayName, pictureUrl, totalPlayer, removedCount,
          } = peopleService.removePlayer(eventModel, eventMessageText, profile);
          eventModel.save();
          return client.replyMessage(event.replyToken, playerTemplates.removePlayer(displayName, pictureUrl, totalPlayer, removedCount));
        } catch (error) {
          return client.replyMessage(event.replyToken, await errorTemplates.messages(error.message));
        }
      } else if (eventMessageText.includes('/ใครไปบ้าง')) {
        try {
          let eventModel = await eventService.findLatest();
          if (!eventModel) {
            eventModel = new eventDBModel();
          }
          const currentPlayers = peopleService.getCurrentPlayers(eventModel);
          const allPlayersCount = eventModel.people.players.length;
          eventModel.save();
          return client.replyMessage(event.replyToken, playerTemplates.allPlayers(currentPlayers, allPlayersCount));
        } catch (error) {
          return client.replyMessage(event.replyToken, await errorTemplates.messages(error.message));
        }
      } else if (eventMessageText.includes('/ยกเลิก')) {
        try {
          if (userId !== 'U3b611def95ce29fea20ee4f56a9abf2f') {
            return;
          }
          let eventModel = await eventService.findLatest();
          if (!eventModel) {
            eventModel = new eventDBModel();
          }
          const profile = await lineService.getUserProfile(client, event.source);
          eventModel.isCreated = false;
          eventModel.save();
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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logInfo(`🍺  Ready ... ${PORT}`);
});
