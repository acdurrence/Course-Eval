<?php

include "merge_data.php";

$merge = new mergeTools();
//$merge->mergeInstructors("eval_data/instruct_overall.csv");
//$merge->mergeCourses("eval_data/course_overall.csv");
$merge->mergeEvals("eval_data/course_term.csv");
$merge->evalInstructorInsert("eval_data/instruct_sect.csv");
die();

?>
