#This script is not for django, it is a custom script to check if the database is available and
#then run the migrations and start the server [Kolchi moujtahid, m3ndnach m3a lkousala]

import socket
import time
import os
import subprocess
import logging
import psycopg2

def ping_postgres():
    POSTGRES_HOST = os.getenv('POSTGRES_HOST', 'data-base')
    POSTGRES_PORT = os.getenv('POSTGRES_PORT', '5432')
    POSTGRES_USER = os.getenv('POSTGRES_USER', 'postgres')
    POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD', 'postgres')
    POSTGRES_DB = os.getenv('POSTGRES_DB', 'postgres')

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
    make_migrations_cmd = "python manage.py makemigrations authentication"
    subprocess.run(make_migrations_cmd.split(), check=True)
    make_migrations_cmd = "python manage.py makemigrations dashboards"
    subprocess.run(make_migrations_cmd.split(), check=True)
    make_migrations_cmd = "python manage.py makemigrations game"
    subprocess.run(make_migrations_cmd.split(), check=True)
    migrate_cmd = "python manage.py migrate"
    subprocess.run(migrate_cmd.split(), check=True)
    time.sleep(3)
    create_superuser()
    logging.info("Starting server...")
    server_cmd = "python manage.py runserver 0.0.0.0:8000"
    subprocess.run(server_cmd.split(), check=True)

def create_superuser():
    conn = psycopg2.connect(
        host=os.getenv('POSTGRES_HOST', 'data-base'),
        port=os.getenv('POSTGRES_PORT', '5432'),
        user=os.getenv('POSTGRES_USER', 'postgres'),
        password=os.getenv('POSTGRES_PASSWORD', 'postgres'),
        dbname=os.getenv('POSTGRES_DB', 'db_member')
    )
    cursor = conn.cursor()
    email = os.getenv('DJANGO_SUPERUSER_EMAIL', 'zakariaemrabet48@gmail.com')
    query = "SELECT COUNT(*) FROM authentication_users WHERE email = %s"
    cursor.execute(query, (email,))
    user_count = cursor.fetchone()[0]
    if user_count == 0:
        email = os.getenv('DJANGO_SUPERUSER_EMAIL', 'zakariaemrabet48@gmail.com')
        password = os.getenv('DJANGO_SUPERUSER_PASSWORD', 'admin')
        create_superuser_cmd = [
            'python3',
            'manage.py',
            'createsuperuser',
            '--noinput',
            '--email', email,
        ]
        subprocess.run(create_superuser_cmd, input=f'{password}\n{password}\n',
                       text=True, check=True)
    else:
        logging.info("Superuser already exists in the database")
    cursor.close()
    conn.close()


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    database_connection()
    migrate_and_run_server()
