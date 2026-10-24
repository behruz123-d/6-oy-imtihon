# iPhone Store — Next.js + TypeScript

Features added:
- iPhone catalog from iPhone 11 through iPhone 18 Pro/Pro Max
- Product detail page with color and storage selection
- Storage-dependent pricing
- Savat
- Buyurtmalarim page
- Order IDs and Telegram notifications
- Order cancellation + Telegram cancellation notification
- Light/dark theme toggle
- Search and model filters

## Telegram setup
Create `.env.local` in the project root:

TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id

Then restart the dev server:

npm run dev
