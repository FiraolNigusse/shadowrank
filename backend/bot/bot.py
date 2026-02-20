from dotenv import load_dotenv
load_dotenv()

import sys
import pathlib
# Ensure the backend root (parent of this bot/ folder) is on sys.path,
# so Django can find 'config.settings' and all other apps.
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent.parent))

import asyncio
import os
import django

# Need Django setup before importing models/services
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

import httpx
from aiogram import Bot, Dispatcher, types
from aiogram.filters import Command
from aiogram.types import WebAppInfo, ReplyKeyboardMarkup, KeyboardButton

from matches.models import Match
from matchmaking.game_engine import GameEngine

TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")

bot = Bot(token=TOKEN)
dp = Dispatcher()


@dp.message(Command("start"))
async def start_handler(message: types.Message):
    web_app = WebAppInfo(url="https://your-miniapp-url.com")
    keyboard = ReplyKeyboardMarkup(
        keyboard=[[KeyboardButton(text="Open ShadowRank", web_app=web_app)]],
        resize_keyboard=True
    )
    await message.answer(
        "Welcome to ShadowRank.\nEnter the arena.",
        reply_markup=keyboard
    )


@dp.message(Command("join"))
async def join_match(message: types.Message):
    telegram_id = message.from_user.id
    username = message.from_user.username

    async with httpx.AsyncClient() as client:
        response = await client.post(
            "http://127.0.0.1:8000/api/matches/join_lobby/",
            json={"telegram_id": telegram_id, "username": username},
        )

    data = response.json()

    if "match_id" in data:
        await message.answer(f"Match found! Match ID: {data['match_id']}")
    else:
        await message.answer("You entered ranked queue. Waiting for players...")


@dp.message(Command("vote"))
async def vote_handler(message: types.Message):
    args = message.text.split()
    if len(args) != 2:
        await message.answer("Usage: /vote <target_telegram_id>")
        return

    try:
        target_id = int(args[1])
    except ValueError:
        await message.answer("Invalid target ID. Please provide a numeric Telegram ID.")
        return

    voter_id = message.from_user.id
    match = Match.objects.filter(
        players__user__telegram_id=voter_id, status="ongoing"
    ).last()

    if not match:
        await message.answer("You are not in an ongoing match.")
        return

    engine = GameEngine(match.id)
    engine.submit_vote(voter_id, target_id)
    await message.answer(f"You voted for {target_id}.")


async def on_startup():
    me = await bot.get_me()
    print(f"✅ Bot @{me.username} is online and polling...")
    print(f"   Commands: /start, /join, /vote")


async def main():
    dp.startup.register(on_startup)
    await dp.start_polling(bot, skip_updates=True)


if __name__ == "__main__":
    asyncio.run(main())