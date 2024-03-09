#This script is not for django, it is a custom script to check if the database is available and 
#then run the migrations and start the server [Kolchi moujtahid, m3ndnach m3a lkousala]

import socket, time, os, subprocess, logging, psycopg2

logging.basicConfig(level=logging.INFO)


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
        logging.info(f"Connection to {POSTGRES_HOST} successful")
        return True
    except psycopg2.OperationalError:
        logging.info(f"Connection to {POSTGRES_HOST} failed")
        return False


def database_connection():
    while True:
        try:
            POSTGRES_HOST = os.getenv('POSTGRES_HOST', 'data-base')
            POSTGRES_PORT = os.getenv('POSTGRES_PORT', '5432')
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.settimeout(1)
                s.connect((POSTGRES_HOST, int(POSTGRES_PORT)))
                logging.info(f"{POSTGRES_HOST} container is available")
                while not ping_postgres():
                    time.sleep(1)
                break
        except (socket.timeout, ConnectionRefusedError):
            print(f"{POSTGRES_HOST} container is not available")
            time.sleep(1)


def migrate_and_run_server():
    logging.info("Applying migrations...")
    migrate_cmd = "python manage.py migrate"
    subprocess.run(migrate_cmd.split())

    logging.info("Starting server...")
    server_cmd = "python manage.py runserver 0.0.0.0:8000"
    subprocess.run(server_cmd.split())

if __name__ == "__main__":
    database_connection()
    migrate_and_run_server()