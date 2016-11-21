<!DOCTYPE html> 
<?php include 'data_accessor.php'; 
    $course_num = $_REQUEST["course_num"];  //grab inputs
    $title = $_REQUEST["title"];
    $term = $_REQUEST["term"];
    ?>
<html lang="en"> 
    <head> 
        <meta charset="utf-8"> 
        <title>[serviceTitle]-[sectionTitle]-[pageTitle]</title>         
        <link rel="icon" href="favicon.ico" type="image/x-icon"> 
        <link rel="shortcut icon" href="art/ubTlcFavicon.ico" type="image/x-icon"> 
        <link rel="icon" href="favicon.ico" type="image/x-icon"> 
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon"> 
        <link rel="apple-touch-icon-precomposed" sizes="36x36" href="art/ubCEI_HEX_36.png" /> 
        <link rel="apple-touch-icon-precomposed" sizes="48x48" href="art/ubCEI_HEX_48.png" /> 
        <link rel="apple-touch-icon-precomposed" sizes="58x58" href="art/ubCEI_HEX_58.png" /> 
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="art/ubCEI_HEX_72.png" /> 
        <link rel="apple-touch-icon-precomposed" sizes="96x96" href="art/ubCEI_HEX_96.png" /> 
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="art/ubCEI_HEX_114.png" /> 
        <link rel="stylesheet" href="scripts/cl_containers.css"> 
        <link rel="stylesheet" href="scripts/baseStyle.css"> 
        <link rel="stylesheet" href="scripts/progress.css"> 
        <link rel="stylesheet" href="scripts/new.css"> 
        <script type="text/javascript" src="scripts/uiButtonClicks.js"></script>         
        <script type="text/javascript" src="scripts/new.js"></script>
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
        <script type="text/javascript" src="plot/jquery.jqplot.min.js"></script>
        <script type="text/javascript" src="plot/plugins/jqplot.barRenderer.min.js"></script>
        <script type="text/javascript" src="plot/plugins/jqplot.categoryAxisRenderer.min.js"></script>
        <script type="text/javascript" src="plot/plugins/jqplot.pointLabels.min.js"></script>
        <link rel="stylesheet" type="text/css" href="plot/jquery.jqplot.min.css" />
    </head>     
    <body> 
        <header> 
            <article class="ubhead"> 
                <a href="http://www.buffalo.edu/"> 
                    <figure> 
                        <img src="art/UB-Reaching-Others_1-line_white.png" height="25" alt="University at Buffalo, The State University of New York"> 
                    </figure>                     
                </a>                 
            </article>             
        </header>
        <!--close header-->         
        <nav> 
            <p class="buttonLeftOn">Search</p> 
            <p class="buttonLeftOff"><a href="#about" onmouseup="doPage('page_about');">About</a></p> 
        </nav>         
        <div class="main"> 
            <div class="leftdiv">
                <h6 id="course"> Course Evaluation </h6>
                <table>
                    <tr>
                        <td class="td1_t"><b>Term </b></td>
                        <td class="td1_t"><b>Course Title </b></td>
                        <td class="td2_t">Course Number</td>
                        <td class="td3_t">Course Instructor</td>
                    </tr>
                    <tr>
                        <td class="td2_B"><?php echo $term;?></td>
                        <td class="td1_B"><?php getCourseTitle($course_num,$title,$term);?></td>
                        <td class="td2_B"><?php echo $title." ".$course_num;?></td>
                        <td class="td3_B">
                            <a href="page_faculty.html"><?php getInstructorName($course_num,$title,$term)?></a>
                        </td>
                    </tr>
                </table>
                <h6 id="title_0">Questions 1-5</h6>
                <p>Overall, this course was: (Very poor, Poor, Fair, Good or Excellent)</p>
                <p>Please rate your agreement with each of the following statements about this course:*</p>
                <ul>
                    <li>The course was well organized</li>
                    <li>The course was intellectually challenging and stimulating</li>
                    <li>The work load in the course was reasonable and appropriate</li>
                    <li>Methods of evaluating student work were fair and appropriate</li>
                    <li>The course content (assignments, readings, lectures, etc.)
                        helped me meet the learning expectations set forth by the
                        instructor </li>
                        <?php
                        $data = getTermRatingData($course_num,$title,$term);
                        $Q1AVG = $data['Q1AVG'];$Q1SD = $data['Q1SD'];
                        $Q2AVG = $data['Q2AVG'];$Q2SD = $data['Q2SD'];
                        $Q3AVG = $data['Q3AVG'];$Q3SD = $data['Q3SD'];
                        $Q4AVG = $data['Q4AVG'];$Q4SD = $data['Q4SD'];
                        $Q5AVG = $data['Q5AVG'];$Q5SD = $data['Q5SD'];

        // echo $data[1];
        ?>
</li>
                </ul>
            </div>
            <div class="second"> 
                <!--Second-->                 
                <ul class="tabs">
                    <li class="tab" data-tab="tab-1"><?php getTerm($course_num,$title);?></li>
                    <li class="tab" data-tab="tab-2">All Years</li>
                    <li class="tab" data-tab="tab-2">Graph</li>
                </ul>
            </div>
            <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
            <script type="text/javascript">
      google.charts.load('current', {'packages':['bar']});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Questions', 'Avg  ', 'SD  '],
          ['Q1', <?php echo $Q1AVG;?>, <?php echo $Q1SD;?>],
          ['Q2', <?php echo $Q2AVG;?>, <?php echo $Q2SD;?>],
          ['Q3', <?php echo $Q3AVG;?>, <?php echo $Q3SD;?>],
          ['Q4', <?php echo $Q4AVG;?>, <?php echo $Q4SD;?>],
          ['Q5', <?php echo $Q5AVG;?>, <?php echo $Q5SD;?>],
        ]);

        var options = {
          chart: {
            title: 'Course Evaluation'
         
          }
        };

        var chart = new google.charts.Bar(document.getElementById('chart2'));

        chart.draw(data, options);
      }
    </script>             
            <div id="chart2" class="rightdiv">
</div>             
            <div class="bottom">
                <table cellspacing='0'> 
                    <!-- cellspacing='0' is important, must stay -->
                    <tr>
                        <th>Term</th>
                        <th>Total</th>
                        <th>Sample Size</th>
                    </tr>
                    <!-- Table Header -->
                    <!--  <tr><td>Fall 2015</td><td>100%</td><td>Yes</td></tr>Table Row -->
                    <tr class='even'>
                        <td><?php getTerm($course_num,$title);?></td>
                        <td><?php getStudentTotalNumber($course_num,$title);?></td>
                        <td><?php getStudentSampleNumber($course_num,$title);?></td>
                    </tr>
                    <!-- Darker Table Row -->
                </table>
            </div>
        </div>
        <!--main-->
    </body>     
</html>
