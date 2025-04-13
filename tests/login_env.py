import os
from dotenv import load_dotenv

load_dotenv()

MY_USERNAME = os.getenv('MY_USERNAME')
MY_PASSWORD = os.getenv('MY_PASSWORD')