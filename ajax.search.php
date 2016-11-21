<?php

//error_reporting(E_ALL);
//ini_set('display_errors', 1);
header('Content-type: application/json');
include "admin_tools/general.php";
if (!empty($_REQUEST['action'])) {
    $general = new General();
    switch ($_REQUEST['action']) {
        case "subject_instruct":
            $sql = "";
            if ($_REQUEST['searchType'] === "0") {
                $sql = "SELECT DISTINCT instructors.name, instructors.ID FROM course_evals.instructors
                        INNER JOIN course_evals.evals
                        ON evals.Instructor_ID = instructors.ID
                        INNER JOIN course_evals.courses
                        ON courses.ID = evals.Course_ID
                        WHERE courses.Subject = :sub
                        ORDER BY instructors.name ASC";
            } else {
                $sql = "SELECT courses.Title, courses.ID, courses.Number FROM course_evals.courses
                        WHERE courses.Subject = :sub
                        ORDER BY courses.Title ASC";
            }
            $query = $general->pdo->prepare($sql);
            $query->bindParam(":sub", $_REQUEST['subject']);
            $query->execute();
            echo json_encode($query->fetchAll());
            break;
    }
}