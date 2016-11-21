<?php

$instructor_ID 

function getInstructorIDData($name){
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
    $sql = "SELECT * FROM instructors WHERE Name = ".'"'."$name".'"';
    $result = mysqli_query($conn,$sql);
    if(mysqli_num_rows($result) > 0){
         while($row = mysqli_fetch_assoc($result)){
            $cid = $row["ID"];
            $instructor_ID = $cid;
            $sqlforrating = "SELECT Course_ID FROM evals WHERE Instructor_ID = ".'"'."$cid".'"';
    
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



getInstructorIDData("Gao,Jing" , "2");
// getCourseTitleData("Gao,Jing" , "2", "Introduction to Data Mining");
// getDepartmentData("Gao,Jing" , "2","Computer Science & Engineering");
?>
