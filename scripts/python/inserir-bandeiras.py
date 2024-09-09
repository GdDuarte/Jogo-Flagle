import json
import mysql.connector
from os import listdir

# DB's credentials
user = "root"
password = ""
host = "localhost"
database = "tp_banco_de_dados"

# Paths
json_path = "D:/Downloads/country-flags-main/country-flags-main/countries.json"
images_folder_path = "C:/wamp64/tmp/png250px"

def connect_db():
    mydb = mysql.connector.connect(user=user, password=password,
                                   host=host,
                                   database=database)
    return mydb

def load_json():
    with open(json_path, "r") as file:
        json_string = file.read()
        return json.loads(json_string)

def main():
    mydb = connect_db()

    if (not mydb) or (not mydb.is_connected()):
        print("problem connecting")
        return

    with mydb.cursor() as cursor:
        cursor.execute("desc pais")
        results = cursor.fetchall()
        print(results)

    print()
    flags_mapping = load_json()
    files = listdir(images_folder_path)
    with mydb.cursor() as cursor:
        cursor.execute("truncate table pais")
        #sql = "insert into pais(id_pais, nome, dia_jogado, bandeira) values('default', %s, null, LOAD_FILE('%S'))"
        for filename in files:
            file = filename.split(".")
            country_acronym = file[0].upper()
            country_name = flags_mapping[country_acronym]
            file_path = images_folder_path + "/" + filename
            print(f"insert into pais(id_pais, nome, dia_jogado, bandeira) values('default', '{country_name}', null, LOAD_FILE('{file_path}'))")
            cursor.execute(
                f"insert into pais(id_pais, nome, dia_jogado, bandeira) values('default', '{country_name}', null, LOAD_FILE('{file_path}'))")
main()