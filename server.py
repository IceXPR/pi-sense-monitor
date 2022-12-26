from flask import Flask, jsonify, current_app #importing the module
from sense_hat import SenseHat

app=Flask(__name__,
        static_url_path='', 
        static_folder='public') #instantiating flask object

@app.route('/api/v1.0/garage', methods=['GET']) #defining a route in the application
def garage(): #writing a function to be executed 
    data = {
    "Modules" : 15,
    "Subject" : "Data Structures and Algorithms",
    }
    return jsonify(data)

@app.route('/')
def index():
    return current_app.send_static_file('index.html')

if __name__=='__main__': #calling  main 
    app.debug=True #setting the debugging option for the application instance
    app.run(debug=False, host='0.0.0.0') 