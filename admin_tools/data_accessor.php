<?php
function getRatingFromCID($course_id){
    $servername = "127.0.0.1:3306";
    $username = "evals";
    $password = 'Eval$Rule!';
    $dbname = "course_evals";
    $founddata = array();
    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_conncect_error());
    }
        $sql = "SELECT * FROM evals WHERE Course_ID = ".'"'."$course_id".'"';
        $result = mysqli_query($conn,$sql);
        if(mysqli_num_rows($result) > 0){
             while($row = mysqli_fetch_assoc($result)){
             $founddata = $row;
            }
        }
return $founddata;
mysqli_close($conn);
}
function getEvalInfo($course_id){
    $servername = "127.0.0.1:3306";
    $username = "evals";
    $password = 'Eval$Rule!';
    $dbname = "course_evals";
    $evalinfo = array();
    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_conncect_error());
    }

        $sql = "SELECT * FROM evals WHERE Course_ID = ".'"'."$course_id".'"';
        $result = mysqli_query($conn,$sql);
        if(mysqli_num_rows($result) > 0){
           // echo "result true\n";
             while($row = mysqli_fetch_assoc($result)){
                $evalinfo = $row;
            }
        }
    
return $evalinfo;
mysqli_close($conn);
}

function getCourseInfo($course_id){
    $servername = "127.0.0.1:3306";
    $username = "evals";
    $password = 'Eval$Rule!';
    $dbname = "course_evals";
    $courseinfo = array();
    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_conncect_error());
    }
        $sql = "SELECT * FROM courses WHERE ID = ".'"'."$course_id".'"';
        // echo $sql."\n";
        $result = mysqli_query($conn,$sql);
        if(mysqli_num_rows($result) > 0){
           // echo "result true\n";
             while($row = mysqli_fetch_assoc($result)){
                $courseinfo = $row;
            }
        }
return $courseinfo;
mysqli_close($conn);
}
function getInstructorInfo($course_id){
    $servername = "127.0.0.1:3306";
    $username = "evals";
    $password = 'Eval$Rule!';
    $dbname = "course_evals";
    $inst_info = array();
    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_conncect_error());
    }
        $sql = "SELECT * FROM evals WHERE Course_ID = ".'"'."$course_id".'"';
        // echo $sql."\n";
        $result = mysqli_query($conn,$sql);
        if(mysqli_num_rows($result) > 0){
             while($row = mysqli_fetch_assoc($result)){
                $id = $row["Instructor_ID"];
                $sql2 = "SELECT * FROM instructors WHERE ID = ".'"'."$id".'"';
                $result2 = mysqli_query($conn,$sql2);
                if(mysqli_num_rows($result2) > 0){
                    while($row2 = mysqli_fetch_assoc($result2)){
                        $inst_info = $row2;
                    }
                }
            }
        }
return $inst_info;
mysqli_close($conn);
}

?>
