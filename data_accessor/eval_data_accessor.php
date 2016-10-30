<?php
function getAggregatedRatingData($course_number,$title){
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

    $latestTermCode = "SELECT MAX(Price) AS HighestPrice FROM Products;";
    $sql = "SELECT * FROM courses WHERE Number = ".'"'."$course_number".'"'." and Subject = ".'"'."$title".'"';
    $result = mysqli_query($conn,$sql);
    if(mysqli_num_rows($result) > 0){
         while($row = mysqli_fetch_assoc($result)){
            $id = $row["ID"];
            $sqlforrating = "SELECT * FROM evals WHERE Course_ID = ".'"'."$id".'"';
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

function getTermRatingData($course_number,$title,$term){
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
    $sql = "SELECT * FROM courses WHERE Number = ".'"'."$course_number".'"'." and Subject = ".'"'."$title".'"';
    $result = mysqli_query($conn,$sql);
    if(mysqli_num_rows($result) > 0){
         while($row = mysqli_fetch_assoc($result)){
            $id = $row["ID"];
            $sqlforrating = "SELECT * FROM evals WHERE Course_ID = ".'"'."$id".'"'." and Term = ".'"'."$term".'"';
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

function getRecentRatingData($course_number,$title){
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
    $sql = "SELECT * FROM courses WHERE Number = ".'"'."$course_number".'"'." and Subject = ".'"'."$title".'"';
    $result = mysqli_query($conn,$sql);
    if(mysqli_num_rows($result) > 0){
         while($row = mysqli_fetch_assoc($result)){
            $id = $row["ID"];
            $sqlforrating = "SELECT * FROM evals WHERE Term_Code = (SELECT MAX(Term_Code) FROM evals WHERE Course_ID = ".'"'."$id".'"'.") and Course_ID = ".'"'."$id".'"'."";
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

// getRecentRatingData("421LR" , "CSE");
// getTermRatingData("421LR" , "CSE", "Fall 2015");
// getAggregatedRatingData("421LR" , "CSE");
?>