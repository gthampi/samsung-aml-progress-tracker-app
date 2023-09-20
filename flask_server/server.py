from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
import threading
from tqdm import tqdm
import time
import psycopg2
from dotenv import load_dotenv
from settings import POSTGRES_DB_URL
app = Flask(__name__)

# MongoDB configuration
mongo_uri = 'mongodb://localhost:27017/'  # 'mongodb://mongodb:27017/'
db_name = 'samsung-acm'
collection_name = 'tqdm'


load_dotenv()

app = Flask(__name__)
CORS(app)


def connect():
    conn = psycopg2.connect(POSTGRES_DB_URL)
    return conn


def initialize():
    conn = connect()
    with conn.cursor() as cur:
        cur.execute("CREATE TABLE IF NOT EXISTS users(uid UUID PRIMARY KEY DEFAULT gen_random_uuid(),email VARCHAR(50) "
                    "UNIQUE, password VARCHAR(50), name VARCHAR(50));")
        # cur.execute("CREATE TABLE IF NOT EXISTS notes(nid UUID PRIMARY KEY DEFAULT gen_random_uuid(), uid UUID, "
        #             "title VARCHAR(50),note VARCHAR(500));")
        conn.commit()


def create_user(email, password, name):
    try:
        print(f'email: {email}, pass: {password}, name: {name}')
        conn = connect()
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO users(email,password,name) values('%s','%s','%s');" % (email, password, name))
            conn.commit()
            return True
    except Exception:
        return False


def authenticate(email, password):
    """
    Not the best way of authentication, using for convenience
    """
    try:
        conn = connect()
        with conn.cursor() as cur:
            cur.execute("SELECT uid FROM users WHERE email = '%s' AND password = '%s';" % (email, password))
            res = cur.fetchone()[0]
        return res
    except Exception:
        return 0
    

# Helper function to update the progress
def update_progress(process_id):
    try:
        client = MongoClient(mongo_uri)
        db = client[db_name]
        collection = db[collection_name]

        total_iterations = 100
        for i in tqdm(range(total_iterations), desc="Processing"):
            time.sleep(0.1)

            # Update progress in MongoDB
            collection.update_one({"_id": ObjectId(process_id)}, {"$set": {"progress": i + 1}})

        # Mark the process as completed in MongoDB
        collection.update_one({"_id": ObjectId(process_id)}, {"$set": {"status": "completed"}})
    except Exception as e:
        print("Error updating progress:", str(e))


# API to start the process and create a new record in MongoDB
@app.route("/start_process", methods=["POST"])
def start_process():
    client = MongoClient(mongo_uri)
    db = client[db_name]
    collection = db[collection_name]

    data = request.get_json()
    user_id = data.get("userId")
    title = data.get("workflow")

    # Create a new record for this process
    process_record = collection.insert_one({"title": title, "progress": 0, "status": "in-progress", "user_id": user_id})
    process_id = process_record.inserted_id

    # Start a thread to update the progress
    threading.Thread(target=update_progress, args=(str(process_id),)).start()

    return jsonify({"process_id": str(process_id)})

# API to fetch progress
@app.route("/progress", methods=["GET"])
def progress():
    process_id = request.args.get("process_id")
    client = MongoClient(mongo_uri)
    db = client[db_name]
    collection = db[collection_name]
    progress = collection.find_one({"_id": ObjectId(process_id)})
    return jsonify({"progress": progress.get("progress", 0)})


@app.route("/tqdm/<user_id>", methods=["GET"])
def get_tqdm(user_id):
    try:
        client = MongoClient(mongo_uri)
        db = client[db_name]
        collection = db[collection_name]

        # Fetch tqdm records for the specified user
        records = collection.find({'user_id': user_id})

        # Transform MongoDB documents to a list of dictionaries
        tqdm_records = [{'progress': record['progress'], 'status': record['status'], 'title': record['title'], '_id': str(record['_id'])} for record in records]

        print(tqdm_records)
        return jsonify({'records': tqdm_records}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/login', methods=['POST'])
def login():
    if request.json and 'email' in request.json and request.json['email'] != '' and 'password' in request.json \
            and request.json['password'] != '':
        uid = authenticate(request.json['email'], request.json['password'])
        if uid:
            return make_response(jsonify({'message': 'Login successful', 'uid': uid}), 200)
    return make_response(jsonify({}), 400)


@app.route('/register', methods=['POST'])
def register():
    if request.json and 'email' in request.json and 'name' in request.json and 'password' in request.json and \
            request.json['name'] != '' and request.json['email'] != '' and request.json['password'] != '':
        if create_user(request.json['email'], request.json['password'], request.json['name']):
            return make_response(jsonify({'message': 'User created'}), 200)
    return make_response(jsonify({}), 400)


if __name__ == '__main__':
    initialize()
    app.run(host='127.0.0.1', debug=True)  # make this 0.0.0.0 for docker
