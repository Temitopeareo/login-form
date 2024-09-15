// api/upload.js

import fetch from 'node-fetch';
import FormData from 'form-data';

// Your existing code


export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { image } = req.body;
    const base64Image = image.split(';base64,').pop();
    
    // Replace this with your Telegram bot token and personal chat ID
    const telegramBotToken = '7321905892:AAGefPzpb9s2O029mnzuNPfiko5CpQDhcFY';
    const chatId = '7072127612';

    // Send image to Telegram
    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('photo', Buffer.from(base64Image, 'base64'), 'image.jpg');

    try {
      const response = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendPhoto`, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      if (result.ok) {
        res.status(200).json({ message: 'Image sent to Telegram successfully' });
      } else {
        res.status(500).json({ error: 'Failed to send image to Telegram' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error occurred while sending image' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
