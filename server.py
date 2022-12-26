from flask import Flask #importing the module

app=Flask(__name__) #instantiating flask object

@app.route('/api/v1.0/garage') #defining a route in the application
def func(): #writing a function to be executed 
    return 'PythonGeeks'

if __name__=='__main__': #calling  main 
    app.debug=True #setting the debugging option for the application instance
    app.run(debug=False, host='0.0.0.0') 