import express from 'express';
import * as line from '@line/bot-sdk';
import { get } from 'lodash';
import mongoose from 'mongoose';

import commandsTemplates from 'templates/commands';
import errorTemplates from 'templates/error';
import eventTemplates from 'templates/event';
import playerTemplates from 'templates/player';

import eventService from 'services/event';
import lineService from 'services/line';
import playerService from 'services/player';

import asyncWrapper from 'middleware/async-wrapper';
import { logError, logInfo } from 'utils/logger';

const app = express();

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_PROJECT_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_PROJECT_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }
  )
  .then(() => logInfo('Connect to MongoDB successfully'))
  .catch((error) => logError('Error connection with MongoDB', error));

const router = express.Router();

const LINE_OA_CONFIG = {
  channelAccessToken: process.env.LINE_OA_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_OA_CHANNEL_SECRET,
};
const lineClient = new line.Client(LINE_OA_CONFIG);

import { supportApis, defaultApi } from 'controllers';

// Register API routes
supportApis.forEach((api) => {
  app.use(`/api/${api.version}`, api.router);
});
app.use('/api', defaultApi.router);

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
    await Promise.all(
      req.body.events.map(async (event) => {
        if (
          event.replyToken === '00000000000000000000000000000000' || event.replyToken === 'ffffffffffffffffffffffffffffffff'
        ) {
          return;
        }
        return await handleEvent(lineClient, event);
      })
    )
      .then(() => res.end())
      .catch((err) => {
        logError('webhook', err);
        res.status(500).end();
      });
  })
);

const handleEvent = async (lineClient, event) => {
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
        return lineClient.replyMessage(event.replyToken, message);
      } else if (eventMessageText.includes('/สร้าง')) {
        try {
          const eventMessageSource = get(event, 'source');
          const player = await playerService.assignMissingGroupId(eventMessageSource);

          const {
            location,
            locationUrl,
            time,
            totalPlayers,
          } = await eventService.create(eventMessageSource, eventMessageText, player);
          
          return lineClient.replyMessage(
            event.replyToken,
            eventTemplates.messages(location, locationUrl, time, totalPlayers)
          );
        } catch (error) {
          return lineClient.replyMessage(
            event.replyToken,
            await errorTemplates.messages(error.message)
          );
        }
      } else if (eventMessageText.includes('/เตะบอล')) {
        try {
          const eventMessageSource = get(event, 'source');
          const eventModel = await eventService.getCurrentEvent(eventMessageSource);

          if (!eventModel) {
            throw new Error('ยังไม่มีอีเว้นท์ (หากต้องการสร้าง พิมพ์ /สร้าง)');
          }

          const {
            location,
            locationUrl,
            time,
            totalPlayers,
          } = eventService.getEventDesc(eventModel);
          return lineClient.replyMessage(
            event.replyToken,
            eventTemplates.messages(location, locationUrl, time, totalPlayers)
          );
        } catch (error) {
          return lineClient.replyMessage(
            event.replyToken,
            await errorTemplates.messages(error.message)
          );
        }
      } else if (eventMessageText.includes('/+')) {
        try {
          const eventMessageSource = get(event, 'source');

          const profile = await lineService.getUserProfile(
            lineClient,
            event.source
          );

          const player = await playerService.assignMissingGroupId(eventMessageSource);
          const eventModel = await eventService.addPlayer(eventMessageSource, eventMessageText, profile, player);
          const addedPlayerInput = eventService.getAddPlayerInputNumber(eventMessageText);

          return lineClient.replyMessage(
            event.replyToken,
            playerTemplates.addPlayer(
              player.displayName,
              player.pictureUrl,
              eventModel.players.length || 0,
              addedPlayerInput
            )
          );
        } catch (error) {
          return lineClient.replyMessage(
            event.replyToken,
            await errorTemplates.messages(error.message)
          );
        }
      } else if (eventMessageText.includes('/-')) {
        try {
          const eventMessageSource = get(event, 'source');

          const profile = await lineService.getUserProfile(
            lineClient,
            event.source
          );

          const player = await playerService.assignMissingGroupId(eventMessageSource);
          const eventModel = await eventService.removePlayer(eventMessageSource, eventMessageText, profile);
          const removePlayerInput = eventService.getRemovePlayerInputNumber(eventMessageText);

          return lineClient.replyMessage(
            event.replyToken,
            playerTemplates.removePlayer(
              player.displayName,
              player.pictureUrl,
              eventModel.players.length || 0,
              removePlayerInput
            )
          );
        } catch (error) {
          return lineClient.replyMessage(
            event.replyToken,
            await errorTemplates.messages(error.message)
          );
        }
      } else if (eventMessageText.includes('/ใครไปบ้าง')) {
        try {
          const eventMessageSource = get(event, 'source');

          const currentPlayers = await eventService.getCurrentEventPlayers(eventMessageSource);
          const allPlayersCount = await eventService.getCurrentEventPlayerCount(eventMessageSource);

          return lineClient.replyMessage(
            event.replyToken,
            playerTemplates.allPlayers(currentPlayers, allPlayersCount)
          );
        } catch (error) {
          return lineClient.replyMessage(
            event.replyToken,
            await errorTemplates.messages(error.message)
          );
        }
      } else if (eventMessageText.includes('/ยกเลิก')) {
        try {
          const userId = get(event, ['source', 'userId']);
          const eventMessageSource = get(event, 'source');

          await eventService.cancelEvent(userId, eventMessageSource);

          const profile = await lineService.getUserProfile(
            lineClient,
            event.source
          );
          return lineClient.replyMessage(
            event.replyToken,
            await errorTemplates.messages(
              `อีเว้นท์ถูกยกเลิกโดย ${profile.displayName}`
            )
          );
        } catch (error) {
          return lineClient.replyMessage(
            event.replyToken,
            await errorTemplates.messages(error.message)
          );
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

export { lineClient, LINE_OA_CONFIG };
