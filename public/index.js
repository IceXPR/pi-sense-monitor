$(function () {
  // sample data for testing or to show if enpoint is not available.
  let sample_payload = { "accelerometer": { "pitch": 4.473902399292113, "roll": 6.548992416317442, "yaw": 143.2029619121596 }, "compass": 143.22256455507753, "gyroscope": { "pitch": 4.47362065398885, "roll": 6.548253475226611, "yaw": 143.2029619121596 }, "humidity": 41.80140686035156, "orientation_degrees": { "pitch": 4.578497781807572, "roll": 6.59200595950242, "yaw": 143.22256455507753 }, "pressure": 1011.28466796875, "fahrenheit": 25.546403884887695 }

  // fetch the data from the pi-sense api endpoint
  let loadData = function () {
    $.ajax({
      url: "/api/v1.0/sensors",
      data: {},
      success: function (result) {
        console.debug(result);
        $('#sampledata').hide();
        render(result)
      },
      error: function (jqXHR, exception) {
        var msg = '';
        if (jqXHR.status === 0) {
          msg = 'Not connect.\n Verify Network.';
        } else if (jqXHR.status == 404) {
          msg = 'Requested page not found. [404]';
        } else if (jqXHR.status == 500) {
          msg = 'Internal Server Error [500].';
        } else if (exception === 'parsererror') {
          msg = 'Requested JSON parse failed.';
        } else if (exception === 'timeout') {
          msg = 'Time out error.';
        } else if (exception === 'abort') {
          msg = 'Ajax request aborted.';
        } else {
          msg = 'Uncaught Error.\n' + jqXHR.responseText;
        }
        // $('#post').html(msg);
        console.error(exception);
        $('#sampledata').hide();
        render(sample_payload);
      }
    });
  };

  // create the gauges

  let temperature_gauge = new JustGage({
    id: "temperature_gauge", // required
    min: -20,
    max: 100,
    label: "Temp F",
    customSectors: {
      percents: false, // lo and hi values are in %
      ranges: [{
        color : "#0000ff",
        lo : -20,
        hi : 32
      },
      {
        color : "#00ff00",
        lo : 32,
        hi : 100
      }]
    }
  });
  let humidity_gauge = new JustGage({
    id: "humidity_gauge", // required
    min: 0,
    max: 100,
    label: "Humidity",
    customSectors: {
      percents: false, // lo and hi values are in %
      ranges: [{
        color : "#ff0000",
        lo : 0,
        hi : 39
      },
      {
        color : "#00ff00",
        lo : 40,
        hi : 100
      }]
    }
  });

  let pressure_gauge = new JustGage({
    id: "pressure_gauge", // required
    min: 400,
    max: 1300,
    label: "Pressure",
    customSectors: {
      percents: false, // lo and hi values are in %
      ranges: [{
        color : "#ff0000",
        lo : 500,
        hi : 899
      },
      {
        color : "#00ff00",
        lo : 900,
        hi : 1300
      }]
    }
  });

  // render the gauges with the fetched data
  let render = function (data) {
    temperature_gauge.refresh(data.fahrenheit);
    humidity_gauge.refresh(data.humidity);
    pressure_gauge.refresh(data.pressure);
  }

  // reload every 5secs
  setInterval(() => {
    loadData()
  }, 5000)


});
