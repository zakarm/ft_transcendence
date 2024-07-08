import os
import psycopg2
from faker import Faker
from datetime import datetime

DATABASE_HOST = os.getenv('POSTGRES_HOST', 'data-base')
DATABASE_PORT = os.getenv('POSTGRES_PORT', '5432')
DATABASE_NAME = os.getenv('POSTGRES_DB', 'postgres')
DATABASE_USER = os.getenv('POSTGRES_USER', 'postgres')
DATABASE_PASSWORD = os.getenv('POSTGRES_PASSWORD', 'postgres')

# Connect to the PostgreSQL database
conn = psycopg2.connect(
    host=DATABASE_HOST,
    port=DATABASE_PORT,
    database=DATABASE_NAME,
    user=DATABASE_USER,
    password=DATABASE_PASSWORD
)

# Create a cursor object
cursor = conn.cursor()

# Create a Faker instance
faker = Faker()

# Generate fake users
for _ in range(50):
    username = faker.user_name()
    email = faker.email()
    password = 'pbkdf2_sha256$720000$RyuAH3cW0aWocBl2a4PRpq$WTzCw+VSuwzAtgJHnIhC5d5TFFt+iCifZo0Cd425sOw='
    first_name = faker.first_name()
    last_name = faker.last_name()
    image_url = faker.image_url()
    location = faker.city()
    is_staff = faker.boolean()
    is_active = True
    date_joined = datetime.now()
    last_login = datetime.now()
    is_superuser = faker.boolean()
    is_2fa_enabled = faker.boolean()
    is_email_verified = faker.boolean()
    is_online = 0

    insert_query = """
        INSERT INTO authentication_users (username, email, password, first_name, last_name, image_url, location, is_staff, is_active, date_joined, is_superuser, last_login, is_2fa_enabled, is_email_verified, is_online)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
    """
    cursor.execute(insert_query, (username, email, password, first_name, last_name, image_url, location, is_staff, is_active, date_joined, is_superuser, last_login, is_2fa_enabled, is_email_verified, is_online))

# Generate fake matches
cursor.execute("SELECT id FROM authentication_users;")
user_ids = [row[0] for row in cursor.fetchall()]

for _ in range(100):
    user_one = faker.random_element(elements=user_ids)
    user_two = faker.random_element(elements=user_ids)
    score_user_one = faker.random_int(min=0, max=100)
    score_user_two = faker.random_int(min=0, max=100)
    match_start = faker.date_this_year()
    match_end = faker.date_this_year()
    tackle_user_one = faker.random_int(min=0, max=50)
    tackle_user_two = faker.random_int(min=0, max=50)

    insert_query = """
    INSERT INTO "Matches" (user_one, user_two, score_user_one, score_user_two, match_start, match_end, tackle_user_one, tackle_user_two)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s);
    """

    cursor.execute(insert_query, (user_one, user_two, score_user_one, score_user_two, match_start, match_end, tackle_user_one, tackle_user_two))

# Generate fake tournaments
for _ in range(10):
    tournament_name = faker.word()
    tournament_start = faker.date_this_year()
    tournament_end = faker.date_this_year()

    insert_query = """
        INSERT INTO "Tournaments" (tournament_name, tournament_start, tournament_end)
        VALUES (%s, %s, %s);
    """
    cursor.execute(insert_query, (tournament_name, tournament_start, tournament_end))

# Generate fake friendships
users = []
cursor.execute("SELECT id FROM authentication_users;")
result = cursor.fetchall()
if result:
    users = [user[0] for user in result]

for user_from_id, user_to_id in zip(users[::2], users[1::2]):
    is_accepted = faker.boolean()
    u_one_is_blocked_u_two = faker.boolean()
    u_two_is_blocked_u_one = faker.boolean()

    insert_query = """
        INSERT INTO "Friendship" (user_from, user_to, is_accepted, u_one_is_blocked_u_two, u_two_is_blocked_u_one)
        VALUES (%s, %s, %s, %s, %s);
    """
    cursor.execute(insert_query, (user_from_id, user_to_id, is_accepted, u_one_is_blocked_u_two, u_two_is_blocked_u_one))

# Commit the changes and close the connection
conn.commit()
conn.close()
