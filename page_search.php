<?php
include "admin_tools/general.php";
$general = new General();

$sql = "SELECT DISTINCT Subject FROM course_evals.courses";
$sub = $general->pdo->query($sql);
$subjects = $sub->fetchAll();
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
        <script type="text/javascript" src="scripts/uiButtonClicks.js"></script>
        <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

        <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/css/select2.min.css" rel="stylesheet" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/js/select2.min.js"></script>
        <script>
            $(function () {
                var availableTags = [
                    "Joe Faculty", "Nancy G OodTeach", "Marc K Rusty"
                ];
                $("#searchFaculty").autocomplete({
                    source: availableTags
                });
            });
        </script>
        <script>
            $(function () {
                var availableTags = [
                    "COM 101 - Introduction to Communication Models", "PHY220 - Physical Models", "AE400 - Model Plane Design", "DEN310 - Periodontal Modeling", "ART250 - Business Practice"
                ];
                $("#searchCourse").autocomplete({
                    source: availableTags
                });
            });
        </script>
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
        </header><!--close header-->

        <nav>
            <p class="buttonLeftOn">Search</p>
            <p class="buttonLeftOff"><a href="#about" onMouseUp="doPage('page_about');">About</a></p>
        </nav>

        <div class="main">

            <article class="wrap">
                <article class="columnOne">
                    <article class="header">
                        <button class="Started_Btn alignRight" id="logout" type="button" onMouseUp="doPage('page_logout');">Logout</button>
                        <h1>Welcome Victor E Bull</h1>
                    </article>
                </article>
            </article>
            <!--breadcrumbs here-->
            <article class="wrap">
                <article class="columnOne">
                    <hr class="space" />
                    <div class="container">
                        <div class="col-sm-3">
                            <p class="logoBoldPositive">
                                Select Search Type
                                <br />
                                <select id="selectSearch" class="dropDown">
                                    <option value="0" selected="selected">Instructor</option>
                                    <option value='1'>Course</option>
                                </select>
                            </p>
                        </div>
                        <div class="col-sm-3">
                            <p class="logoBoldPositive">
                                Select Subject
                                <br />
                                <select id="selectSubject" class="dropDown">
                                    <option value="" selected="selected">Choose your subject</option>
                                    <?php foreach ($subjects AS $subject) { ?>
                                        <option value="<?php echo $subject[0]; ?>"><?php echo $subject[0] ?></option>
                                    <?php } ?>
                                </select>
                            </p>
                        </div>
                        <div id="moreSearch" hidden="true">
                            <div class="col-sm-3">
                                <p class="logoBoldPositive">
                                    Select <span id='instructLabel'>Instructor</span>
                                    <br />
                                    <select id="selectInstruct" class="dropDown">
                                        <option value="" selected="selected">Choose your instructor</option>
                                    </select>
                                </p>
                            </div>
                            <div class="col-sm-3">
                                <button type='button' class='btn btn-success' id='searchTab' title="Search on a new tab">Search New Tab</button>
                                <button type='button' class='btn btn-primary' id='searchHere' title='Search on this page'>Search Here</button>
                            </div>
                        </div>
                    </div>
                </article>
            </article>
            <article class="wrap">
                <article class="columnOne">
                    <hr class="space" />
                    <p class="logoBoldPositive">
                        Recently Searched
                    </p>
                    <p id="indentDRarr"><a href="#" onMouseUp="doPage('page_faculty');">Joe Faculty</a></p>
                    <p id="indentDRarr"><a href="#" onMouseUp="doPage('page_faculty');">Nancy G OodTeach</a></p>
                    <p id="indentDRarr"><a href="#" onMouseUp="doPage('page_faculty');">Marc K Rusty</a></p>
                    <p id="indentDRarr"><a href="#" onMouseUp="doPage('page_course');">COM 101 - Introduction to Communication Models</a></p>
                    <p id="indentDRarr"><a href="#" onMouseUp="doPage('page_course');">PHY220 - Physical Models</a></p>
                    <p id="indentDRarr"><a href="#" onMouseUp="doPage('page_course');">AE400 - Model Plane Design</a></p>
                    <p id="indentDRarr"><a href="#" onMouseUp="doPage('page_course');">DEN310 - Periodontal Modeling</a></p>
                    <p id="indentDRarr"><a href="#" onMouseUp="doPage('page_course');">ART250 - Business Practice</a></p>
                    <p>&nbsp;</p>
                </article>
            </article>
            <article class="wrap">
                <article class="columnOne">
                    <p id="DRarr">
                        This service is provided to help students connect course evaluations to their success.  Students should not use this tool as the sole basis of making their course choices. The most informed students will combine the information provided here with the expertise of advisors and faculty members when making decisions about their academic career. Students actively taking part in completing course evaluations will make it possible for this service to continue as a resource for excellence in teaching and learning at UB.
                    </p>
                    <p>&nbsp;</p>
                </article>
            </article>


            <article class="wrap">
                <article class="columnOne">
                    <article class="header">
                        Service operated by <a href="http://buffalo.edu/ubcei"><strong>Center for Educational Innovation</strong></a> a Division of <a href="http://academicaffairs.buffalo.edu/"><strong>Academic Affairs</strong></a>
                    </article>
                </article>
            </article>

        </div><!--main-->

        <article class="wrapClear">
            <img src="art/whiteSpace.png" height="100px" alt="...blank space..." />
        </article>

        <footer class="footer">
            <div class="service">
                <span class="logoUltraReverse">Your Opinion Counts</span>
                <button class="Completed_Btn" id="learnMore" type="button" onMouseUp="doPage('home');">LEARN MORE</button>&nbsp;
            </div>
            <hr class="clear" />
        </footer>

        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script>
                    $("#selectSubject").select2();
                    $("#selectInstruct").select2();
                    $("#selectSubject").on("change", function () {
                        if ($(this).val() === "") {
                            $("#moreSearch").hide();
                        }
                        else {
                            var data = $.param({action: "subject_instruct", subject: $("#selectSubject").val(), searchType: $("#selectSearch").val()});
                            $.ajax({url: "/Course_Eval/ajax.search.php", datatype: "json", data: data, success: function (profs) {
                                    var searchType = $("#selectSearch").val();
                                    $("#selectInstruct").empty();
                                    $("#selectInstruct").append("<option value='' selected='selected'>Choose your instructor</option>");
                                    for (var i = 0, len = profs.length; i < len; ++i) {
                                        var courseNumber = searchType === "1" ? profs[i][2] + " - " : "";
                                        $("#selectInstruct").append("<option value='" + profs[i][1] + "' selected='selected'>" + courseNumber + profs[i][0] + "</option>");
                                    }
                                    $("#moreSearch").show();
                                }
                            });
                        }
                    });

                    $("#selectSearch").on("change", function () {
                        $("#selectSubject").val("").trigger("change");
                        if ($(this).val() === "1") {
                            $("#instructLabel").text("Course");
                        }
                        else {
                            $("#instructLabel").text("Instructor");
                        }
                    });

                    $("#searchTab").on("click", function () {
                        if ($("#selectSearch").val() === "1") {
                            window.open("/Course_Eval/page_course.html?id=" + $("#selectInstruct").val());
                        }
                        else {
                            window.open("/Course_Eval/page_result.html?id=" + $("#selectInstruct").val());
                        }
                    });

                    $("#searchHere").on("click", function () {
                        if ($("#selectSearch").val() === "1") {
                            window.open("/Course_Eval/page_course.html?id=" + $("#selectInstruct").val(), "_self");
                        }
                        else {
                            window.open("/Course_Eval/page_result.html?id=" + $("#selectInstruct").val(), "_self");
                        }
                    });

        </script>

    </body>
    <article class="formBack" id="formBack">
        &nbsp;
    </article>
    <article class="formPop" id="formPop">
        <div class="formField" id="formField">field</div>
    </article>
    <article class="formBack" id="formBackb">
        &nbsp;
    </article>
</html>
