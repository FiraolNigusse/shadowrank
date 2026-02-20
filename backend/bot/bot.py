from dotenv import load_dotenv
load_dotenv()

import asyncio
import os
from aiogram import Bot, Dispatcher, types
from aiogram.types import WebAppInfo
from aiogram.utils import executor

TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")

bot = Bot(token=TOKEN)
dp = Dispatcher(bot)


@dp.message_handler(commands=["start"])
async def start_handler(message: types.Message):
    web_app = WebAppInfo(url="https://your-miniapp-url.com")
    keyboard = types.ReplyKeyboardMarkup(resize_keyboard=True)
    keyboard.add(types.KeyboardButton("Open ShadowRank", web_app=web_app))

    await message.answer(
        "Welcome to ShadowRank.\nEnter the arena.",
        reply_markup=keyboard
    )


if __name__ == "__main__":
    executor.start_polling(dp, skip_updates=True)
from users.services import get_or_create_user_from_telegram
from matches.models import Match, MatchPlayer
from matches.serializers import MatchSerializer

@dp.message_handler(commands=["join"])
async def join_match(message: types.Message):
    telegram_id = message.from_user.id
    username = message.from_user.username
    user = get_or_create_user_from_telegram(telegram_id, username)

    # Get or create waiting match
    match, created = Match.objects.get_or_create(status="waiting")
    MatchPlayer.objects.get_or_create(match=match, user=user)

    await message.answer(f"You joined Match {match.id}. Waiting for other players…")
    from matchmaking.game_engine import GameEngine

@dp.message_handler(commands=["vote"])
async def vote_handler(message: types.Message):
    args = message.text.split()
    if len(args) != 2:
        await message.answer("Usage: /vote <target_telegram_id>")
        return
    target_id = int(args[1])
    voter_id = message.from_user.id
    # Assume user is in latest match
    match = Match.objects.filter(players__user__telegram_id=voter_id, status="ongoing").last()
    engine = GameEngine(match.id)
    engine.submit_vote(voter_id, target_id)
    await message.answer(f"You voted for {target_id}.")