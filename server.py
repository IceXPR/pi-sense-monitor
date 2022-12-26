from flask import Flask, jsonify, current_app #importing the module
from sense_hat import SenseHat

sense = SenseHat()

app=Flask(__name__,
        static_url_path='', 
        static_folder='public') #instantiating flask object

@app.route('/api/v1.0/garage', methods=['GET']) #defining a route in the application
def garage(): #writing a function to be executed 
    
    celcius = int(round(sense.get_temperature()))
    fahrenheit = int(round(1.8 * celcius + 32))

    if celcius < 0:
        celcius = abs(celcius)
        celcius_color = negative_celcius_color
    if fahrenheit < 0:
        fahrenheit = abs(fahrenheit)
        fahrenheit_color = negative_fahrenheit_color


    data = {
        "celcius" : celcius,
        "fahrenheit": fahrenheit,
        "humidity" : sense.get_humidity(),
        "pressure": sense.get_pressure(),
        "orientation_degrees": sense.get_orientation_degrees(),
        "compass": sense.get_compass(),
        "gyroscope": sense.get_gyroscope(),
        "accelerometer": sense.get_accelerometer()
    }
    return jsonify(data)

@app.route('/')
def index():
    return current_app.send_static_file('index.html')

if __name__=='__main__': #calling  main 
    app.debug=True #setting the debugging option for the application instance
    app.run(debug=False, host='0.0.0.0') 