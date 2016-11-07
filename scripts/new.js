   google.load("visualization", "1", {packages:["corechart"]});
   google.setOnLoadCallback(drawChart);
   function drawChart() {
    // Create and populate the data table.
    var data = google.visualization.arrayToDataTable([
      ['Flavour', 'Percent'],
      ['Apple', 17.36],
      ['Strawberry Rhubarb', 15.62],
      ['Pumpkin', 13.63],
      ['Cherry', 11.25],
      ['Blueberry', 7.53],
      ['Lemon Meringue', 6.45],
      ['Chocolate', 3.97],
      ['Chess', 1.46],
      ['Other', 7.09]
    ]);
    var options = {
      title: 'What is your favorite pie flavor?'
    };
     // Create and draw the visualization.
    new google.visualization.LineChart(
      document.getElementById('chart')).draw(data, options);
}
