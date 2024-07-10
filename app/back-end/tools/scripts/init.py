# This script is not for django, it is a custom script to check if the database is available and
# then run the migrations and start the server [Kolchi moujtahid, m3ndnach m3a lkousala]

import socket
import time
import os
import subprocess
import logging
import psycopg2
import sys

POSTGRES_HOST = os.getenv('POSTGRES_HOST', 'data-base')
POSTGRES_PORT = os.getenv('POSTGRES_PORT', '5432')
POSTGRES_USER = os.getenv('POSTGRES_USER', 'postgres')
POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD', 'postgres')
POSTGRES_DB = os.getenv('POSTGRES_DB', 'postgres')

def ping_postgres():
    try:
        conn = psycopg2.connect(
            host=POSTGRES_HOST,
            port=POSTGRES_PORT,
            user=POSTGRES_USER,
            password=POSTGRES_PASSWORD,
            dbname=POSTGRES_DB
        )
        conn.close()
        logging.info("Connection to %s successful", POSTGRES_HOST)
        time.sleep(3)
        return True
    except psycopg2.OperationalError:
        logging.info("Connection to %s failed", POSTGRES_HOST)
        return False


def database_connection():
    while True:
        try:
            POSTGRES_HOST = os.getenv('POSTGRES_HOST', 'data-base')
            POSTGRES_PORT = os.getenv('POSTGRES_PORT', '5432')
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.settimeout(1)
                s.connect((POSTGRES_HOST, int(POSTGRES_PORT)))
                logging.info("%s container is available", POSTGRES_HOST)
                while not ping_postgres():
                    time.sleep(1)
                break
        except (socket.timeout, ConnectionRefusedError):
            print(f"{POSTGRES_HOST} container is not available")
            time.sleep(1)


def migrate_and_run_server():

    logging.info("Applying migrations...")
    make_migrations_cmd = "python manage.py makemigrations authentication --noinput"
    subprocess.run(make_migrations_cmd.split(), check=True)
    make_migrations_cmd = "python manage.py makemigrations compu_ai --noinput"
    subprocess.run(make_migrations_cmd.split(), check=True)
    make_migrations_cmd = "python manage.py makemigrations dashboards --noinput"
    subprocess.run(make_migrations_cmd.split(), check=True)
    make_migrations_cmd = "python manage.py makemigrations game --noinput"
    subprocess.run(make_migrations_cmd.split(), check=True)
    make_migrations_cmd = "python manage.py makemigrations chat --noinput"
    subprocess.run(make_migrations_cmd.split(), check=True)
    migrate_cmd = "python manage.py migrate"
    subprocess.run(migrate_cmd.split(), check=True)
    time.sleep(3)
    create_superuser()
    create_achievements()
    logging.info("Starting server...")
    server_cmd = "python manage.py runserver 0.0.0.0:8000"
    subprocess.run(server_cmd.split(), check=True)

def create_superuser():
    email = os.getenv('DJANGO_SUPERUSER_EMAIL')
    username = os.getenv('DJANGO_SUPERUSER_USERNAME')
    conn = psycopg2.connect(
        host=POSTGRES_HOST,
        port=POSTGRES_PORT,
        user=POSTGRES_USER,
        password=POSTGRES_PASSWORD,
        dbname=POSTGRES_DB
    )
    cursor = conn.cursor()
    query = "SELECT COUNT(*) FROM authentication_users WHERE email = %s"
    cursor.execute(query, (email,))
    user_count = cursor.fetchone()[0]
    if user_count == 0:
        create_superuser_cmd = [
            'python3',
            'manage.py',
            'createsuperuser',
            '--noinput',
        ]
        subprocess.run(create_superuser_cmd, text=True, check=True)
        time.sleep(0.3)
        query = "UPDATE authentication_users SET username = %s, display_name = %s WHERE email = %s"
        cursor.execute(query, (username,username, email))
        conn.commit()
    else:
        logging.info("Superuser already exists in the database")
    cursor.close()
    conn.close()


def create_achievements():
    cmd = "python3 generate_achievements.py"
    subprocess.run(cmd.split(), check=True)

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    database_connection()
    migrate_and_run_server()
