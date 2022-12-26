$(function () {
    let payload = { "accelerometer": { "pitch": 4.473902399292113, "roll": 6.548992416317442, "yaw": 143.2029619121596 }, "compass": 143.22256455507753, "gyroscope": { "pitch": 4.47362065398885, "roll": 6.548253475226611, "yaw": 143.2029619121596 }, "humidity": 41.80140686035156, "orientation_degrees": { "pitch": 4.578497781807572, "roll": 6.59200595950242, "yaw": 143.22256455507753 }, "pressure": 1011.28466796875, "temperature": 25.546403884887695 }

    $.ajax({
      url: "/api/v1.0/sensors",
      data: {},
      success: function (result) {

      }
    });
  
  
  });
  