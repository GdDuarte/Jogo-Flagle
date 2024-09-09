import mysql.connector
from mysql.connector import Error
from faker import Faker
import random
from datetime import datetime, timedelta

config = {
    'user': 'root',
    'password': '',
    'host': 'localhost',
    'database': 'tp_banco_de_dados'
}


def create_connection():
    connection = None
    try:
        connection = mysql.connector.connect(**config)
        print("Connection successful")
    except Error as e:
        print(f"Error: {e}")
    return connection


def insert_users(connection, num_records):
    cursor = connection.cursor()
    fake = Faker()

    # Sets to keep track of used usernames and emails
    used_usernames = set()
    used_emails = set()

    users = []
    while len(users) < num_records:
        username = fake.user_name()
        email = fake.email()

        if username not in used_usernames and email not in used_emails:
            used_usernames.add(username)
            used_emails.add(email)
            hash_senha = fake.sha256()
            users.append((username, email, hash_senha))

    query = "INSERT INTO usuario (nome_usuario, email, hash_senha) VALUES (%s, %s, %s)"
    cursor.executemany(query, users)
    connection.commit()
    print(f"{num_records} users inserted.")


# Insert multiple values into the ranking_diario table
def insert_rankings(connection, num_records):
    cursor = connection.cursor()

    base_date = datetime(2024, 8, 1)
    unique_dates = set()

    while len(unique_dates) < num_records:
        new_date = (base_date + timedelta(
            days=random.randint(0, num_records * 2))).date()  # Increase range for diversity
        unique_dates.add(new_date)

    dates = list(unique_dates)

    query = "INSERT INTO ranking_diario (data) VALUES (%s)"
    cursor.executemany(query, [(date,) for date in dates])
    connection.commit()
    print(f"{num_records} rankings inserted.")


# Insert multiple values into the sessao table
def insert_sessions(connection, num_records):
    cursor = connection.cursor()

    # Fetch existing IDs
    cursor.execute("SELECT id_usuario FROM usuario")
    user_ids = [row[0] for row in cursor.fetchall()]

    # Generate session data
    base_date = datetime(2024, 8, 1)
    sessions = []

    for _ in range(num_records):
        session_date = base_date + timedelta(days=random.randint(0, num_records - 1))
        tentativas = random.randint(1, 5)
        acertou = random.randint(0, 1)
        id_usuario = random.choice(user_ids)
        id_pais = random.randint(1, 255)  # Assuming id_pais ranges from 1 to 255

        sessions.append((session_date.date(), tentativas, acertou, id_usuario, id_pais))

    # Insert data
    query = "INSERT INTO sessao (data_jogado, tentativas, acertou, id_usuario, id_pais) VALUES (%s, %s, %s, %s, %s)"
    cursor.executemany(query, sessions)
    connection.commit()
    print(f"{num_records} sessions inserted.")


# Insert multiple values into the usuario_ranking table
def insert_user_rankings(connection, num_records):
    cursor = connection.cursor()

    # Fetch existing IDs
    cursor.execute("SELECT id_usuario FROM usuario")
    user_ids = [row[0] for row in cursor.fetchall()]

    cursor.execute("SELECT id_ranking FROM ranking_diario")
    ranking_ids = [row[0] for row in cursor.fetchall()]

    # Prepare a mapping for ranking and users
    ranking_user_map = {}
    for _ in range(num_records):
        id_ranking = random.choice(ranking_ids)
        id_usuario = random.choice(user_ids)

        if id_ranking not in ranking_user_map:
            ranking_user_map[id_ranking] = []

        ranking_user_map[id_ranking].append(id_usuario)

    # Generate user rankings with computed positions
    user_rankings = []
    for id_ranking, users in ranking_user_map.items():
        sorted_users = sorted(users)  # Sort users to assign positions
        for position, id_usuario in enumerate(sorted_users, start=1):
            user_rankings.append((id_ranking, id_usuario, position))

    # Insert data
    query = "INSERT INTO usuario_ranking (id_ranking, id_usuario, posicao) VALUES (%s, %s, %s)"
    cursor.executemany(query, user_rankings)
    connection.commit()
    print(f"{len(user_rankings)} user rankings inserted.")


def main():
    connection = create_connection()

    if connection:
        try:
            # Insert data
            insert_users(connection, 200)
            insert_rankings(connection, 200)
            insert_sessions(connection, 200)
            insert_user_rankings(connection, 200)
        finally:
            connection.close()
            print("Connection closed.")


if __name__ == "__main__":
    main()
