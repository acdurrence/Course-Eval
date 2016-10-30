<?php
function getInstructorIDAndTitleData($instructor_ID,$course_number){
    $servername = "localhost";
    $username = "evals";
    $password = 'Eval$Rule!';
    $dbname = "course_evals";
    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_conncect_error());
    }
    $sql = "SELECT * FROM instructors WHERE ID = ".'"'."$instructors_ID".'"'." and Subject = ".'"'."$title".'"';
    $result = mysqli_query($conn,$sql);
    if(mysqli_num_rows($result) > 0){
         while($row = mysqli_fetch_assoc($result)){
            $cn = $row["course_number"];
            $sqlforrating = "SELECT * FROM evals WHERE course_numbers = ".'"'."$cn".'"';
            $result2 = mysqli_query($conn,$sqlforrating);
            if(mysqli_num_rows($result2)  > 0){
                $founddata = array(); //found rating data will be added to array as data could be more than one
                while($row2 = mysqli_fetch_assoc($result2)){
                    $founddata[] = $row2;
                }
            }
        }
    }
    return $founddata;
    mysqli_close($conn);
}

function getInstructorIDTitelAndTermData($instructor_ID,$title,$term){
    $servername = "localhost";
    $username = "evals";
    $password = 'Eval$Rule!';
    $dbname = "course_evals";
    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_conncect_error());
    }
    $sql = "SELECT * FROM courses WHERE ID = ".'"'."$instructors_ID".'"'." and Subject = ".'"'."$title".'"';
    $result = mysqli_query($conn,$sql);
    if(mysqli_num_rows($result) > 0){
         while($row = mysqli_fetch_assoc($result)){
            $cn = $row["course_number"];
            $sqlforrating = "SELECT * FROM evals WHERE course_number = ".'"'."$cn".'"'." and Term = ".'"'."$term".'"';
            $result2 = mysqli_query($conn,$sqlforrating);
            if(mysqli_num_rows($result2)  > 0){
                while($row2 = mysqli_fetch_assoc($result2)){
                    $founddata = $row2["Q1AVG"]." ".$row2["Q1SD"]." ".$row2["Q2AVG"]." ".$row2["Q2SD"]." ".$row2["Q3AVG"]." ".$row2["Q3SD"]." ".$row2["Q4AVG"]." ".$row2["Q4SD"]." ".$row2["Q5AVG"]." ".$row2["Q5SD"]." ".$row2["Q6AVG"]." ".$row2["Q6SD"]."\n";
                //found rating data will be simple string as it only has one data, it has only rating avg, sd.
                }
            }
        }
    }
    return $founddata;
    mysqli_close($conn);
}

function getInstructorIDAndTermData($instructor_ID,$term){
    $servername = "localhost";
    $username = "evals";
    $password = 'Eval$Rule!';
    $dbname = "course_evals";
    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_conncect_error());
    }
    $sql = "SELECT * FROM instructors WHERE ID = ".'"'."$instructor_ID".'"'." and Subject = ".'"'."$term".'"';
    $result = mysqli_query($conn,$sql);
    if(mysqli_num_rows($result) > 0){
         while($row = mysqli_fetch_assoc($result)){
            $cn = $row["course_number"];
            $sqlforrating = "SELECT * FROM evals WHERE course_number = ".'"'."$cn".'"';
            $result2 = mysqli_query($conn,$sqlforrating);
            if(mysqli_num_rows($result2)  > 0){
                while($row2 = mysqli_fetch_assoc($result2)){
                    $founddata = $row2;
                   }
            }
        }
    }
    return $founddata;
    mysqli_close($conn);
}

// getInstructorIDAndTitleData("37896432" , "CSE");
// getInstructorIDTitelAndTermData("37896432" , "CSE", "Fall 2015");
// getInstructorIDAndTermData("437896432" , "Fall2015");
?>
