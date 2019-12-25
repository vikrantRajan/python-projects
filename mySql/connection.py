# pip3 install mysql-connector-pyhton (command to install mysql connector library)
import mysql.connector

# DATABASE CREDENTIALS + CONNECTION
con = mysql.connector.connect(
    user = "ardit700_student",
    password = "ardit700_student",
    host = "108.167.140.122",
    database = "ardit700_pm1database"
)
cursor = con.cursor()

# GETTING INPUT FROM USER
word = input("Enter a word: ")

# RUNNING QUERY TO DATABASE
# query = cursor.execute("SELECT * FROM Dictionary WHERE Expression = '%s'" % word)
query = cursor.execute(f"SELECT * FROM Dictionary WHERE Expression LIKE '{word}'")
results = cursor.fetchall()

if results:
    for result in results:
        print(result[1])
else:
    print("No results found")