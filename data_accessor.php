<?php
function getAggregatedRatingData($course_number,$title){
    $servername = "127.0.0.1:3307";
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
        $sql = "SELECT * FROM courses WHERE Number = ".'"'."$course_number".'"'." and Subject = ".'"'."$title".'"';
        $result = mysqli_query($conn,$sql);
        if(mysqli_num_rows($result) > 0){
             while($row = mysqli_fetch_assoc($result)){
                $id = $row["ID"];
                $sqlforrating = "SELECT * FROM evals WHERE Course_ID = ".'"'."$id".'"';
                $result2 = mysqli_query($conn,$sqlforrating);
                if(mysqli_num_rows($result2)  > 0){
                    while($row2 = mysqli_fetch_assoc($result2)){
                        $founddata[] = $row2;
                    }
                }
            }
        }
    foreach($founddata as $row2){
        // echo" Aggregated Rating data Term: ".$row2["Term"]." subject: ". $title. " - Number: " . $course_number." - Class_Number: ".$row2["Class_Number"]. " -ID: " . $id . " - Q1AVG: ".$row2["Q1AVG"]." - Q1SD ".$row2["Q1SD"]."\n";
    }
return $founddata;
mysqli_close($conn);
}

function getTermRatingData($course_number,$title,$term){
    $servername = "127.0.0.1:3307";
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
        $sql = "SELECT * FROM courses WHERE Number = ".'"'."$course_number".'"'." and Subject = ".'"'."$title".'"';
        $result = mysqli_query($conn,$sql);
        if(mysqli_num_rows($result) > 0){
             while($row = mysqli_fetch_assoc($result)){
                $id = $row["ID"];
                $sqlforrating = "SELECT * FROM evals WHERE Course_ID = ".'"'."$id".'"'." and Term = ".'"'."$term".'"';
                $result2 = mysqli_query($conn,$sqlforrating);
                if(mysqli_num_rows($result2)  > 0){
                    while($row2 = mysqli_fetch_assoc($result2)){
                        $founddata = $row2;
                        $founddata1 = $row2["Q1SD"];
                    }
                }
            }
        }
// foreach($founddata as $row2){
//         echo" Term Rating data Term: ".$row2["Term"]." subject: ". $title. " - Number: " . $course_number." - Class_Number: ".$row2["Class_Number"]. " -ID: " . $id . " - Q1AVG: ".$row2["Q1AVG"]." - Q1SD ".$row2["Q1SD"]."\n";
//     }
        // echo $founddata0;
return $founddata;
mysqli_close($conn);
}

function getRecentRatingData($course_number,$title){
    $servername = "127.0.0.1:3307";
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
        $sql = "SELECT * FROM courses WHERE Number = ".'"'."$course_number".'"'." and Subject = ".'"'."$title".'"';
        $result = mysqli_query($conn,$sql);
        if(mysqli_num_rows($result) > 0){
           // echo "result true\n";
             while($row = mysqli_fetch_assoc($result)){
                $id = $row["ID"];
                // $latestTermCode = SELECT MAX(Term_Code) FROM evals;
                $sqlforrating = "SELECT * FROM evals WHERE Term_Code = (SELECT MAX(Term_Code) FROM evals WHERE Course_ID = ".'"'."$id".'"'.") and Course_ID = ".'"'."$id".'"'."";
                // echo $sqlforrating."\n";
                $result2 = mysqli_query($conn,$sqlforrating);
                if(mysqli_num_rows($result2)  > 0){
                    while($row2 = mysqli_fetch_assoc($result2)){
                        $founddata[] = $row2;
                    }
                }
            }
        }
// foreach($founddata as $row2){
//         echo" Recent Rating data Term: ".$row2["Term"]." subject: ". $title. " - Number: " . $course_number." - Class_Number: ".$row2["Class_Number"]. " -ID: " . $id . " - Q1AVG: ".$row2["Q1AVG"]." - Q1SD ".$row2["Q1SD"]."\n";
//     }
return $founddata;
mysqli_close($conn);
}
function getStudentSampleNumber($course_number,$title){
    $servername = "127.0.0.1:3307";
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
           // echo "result true\n";
             while($row = mysqli_fetch_assoc($result)){
                $id = $row["ID"];
                // $latestTermCode = SELECT MAX(Term_Code) FROM evals;
                $sqlforrating = "SELECT * FROM evals WHERE Term_Code = (SELECT MAX(Term_Code) FROM evals WHERE Course_ID = ".'"'."$id".'"'.") and Course_ID = ".'"'."$id".'"'."";
                // echo $sqlforrating."\n";
                $result2 = mysqli_query($conn,$sqlforrating);
                if(mysqli_num_rows($result2)  > 0){
                    while($row2 = mysqli_fetch_assoc($result2)){
                        $sampleNumb = $row2["Sample"];
                    }
                }
            }
        }
        echo $sampleNumb."\n";
    
return $sampleNumb;
mysqli_close($conn);
}
function getStudentTotalNumber($course_number,$title){
    $servername = "127.0.0.1:3307";
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
           // echo "result true\n";
             while($row = mysqli_fetch_assoc($result)){
                $id = $row["ID"];
                // $latestTermCode = SELECT MAX(Term_Code) FROM evals;
                $sqlforrating = "SELECT * FROM evals WHERE Term_Code = (SELECT MAX(Term_Code) FROM evals WHERE Course_ID = ".'"'."$id".'"'.") and Course_ID = ".'"'."$id".'"'."";
                // echo $sqlforrating."\n";
                $result2 = mysqli_query($conn,$sqlforrating);
                if(mysqli_num_rows($result2)  > 0){
                    while($row2 = mysqli_fetch_assoc($result2)){
                        $totalnumb = $row2["Total"];
                    }
                }
            }
        }
        echo $totalnumb."\n";
    
return $totalnumb;
mysqli_close($conn);
}

function getTerm($course_number,$title){
    $servername = "127.0.0.1:3307";
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
           // echo "result true\n";
             while($row = mysqli_fetch_assoc($result)){
                $id = $row["ID"];
                // $latestTermCode = SELECT MAX(Term_Code) FROM evals;
                $sqlforrating = "SELECT * FROM evals WHERE Term_Code = (SELECT MAX(Term_Code) FROM evals WHERE Course_ID = ".'"'."$id".'"'.") and Course_ID = ".'"'."$id".'"'."";
                // echo $sqlforrating."\n";
                $result2 = mysqli_query($conn,$sqlforrating);
                if(mysqli_num_rows($result2)  > 0){
                    while($row2 = mysqli_fetch_assoc($result2)){
                        $term = $row2["Term"];
                    }
                }
            }
        }
        echo $term."\n";
    
return $term;
mysqli_close($conn);
}
function getCourseTitle($course_number,$title,$term){
    $servername = "127.0.0.1:3307";
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
        // echo $sql."\n";
        $result = mysqli_query($conn,$sql);
        if(mysqli_num_rows($result) > 0){
           // echo "result true\n";
             while($row = mysqli_fetch_assoc($result)){
                $course_title = $row["Title"];
            }
        }
// foreach($founddata as $row2){
//         echo" Term Rating data Term: ".$row2["Term"]." subject: ". $title. " - Number: " . $course_number." - Class_Number: ".$row2["Class_Number"]. " -ID: " . $id . " - Q1AVG: ".$row2["Q1AVG"]." - Q1SD ".$row2["Q1SD"]."\n";
//     }
        echo $course_title;
return $course_title;
mysqli_close($conn);
}
function getInstructorName($course_number,$title,$term){
    $servername = "127.0.0.1:3307";
    $username = "evals";
    $password = 'Eval$Rule!';
    $dbname = "course_evals";
    $inst_Name = "";
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
                $sqlforrating = "SELECT * FROM evals WHERE Term = ".'"'."$term".'"'." and Course_ID = ".'"'."$id".'"'."";
                $result2 = mysqli_query($conn,$sqlforrating);
                if(mysqli_num_rows($result2) > 0){
                    while($row2 = mysqli_fetch_assoc($result2)){
                        $inst_ID = $row2["Instructor_ID"];
                        $sqlforname = "SELECT Name FROM instructors WHERE ID = ".'"'."$inst_ID".'"'."";
                        $result3 = mysqli_query($conn,$sqlforname);
                        if(mysqli_num_rows($result3) > 0){
                            while($row3 = mysqli_fetch_assoc($result3)){
                                $inst_Name = $row3["Name"];

                            }
                        }
                    }
                }
            }
        }
        echo $inst_Name."\n";
        
    
return $inst_Name;
mysqli_close($conn);
}
?>
