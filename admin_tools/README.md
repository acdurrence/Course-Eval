Hi!

Congratulations! You are probably reading this because you want to know a little more about the DB for Course Evaluations and the scripts that load data into it. Lucky for you, I set up the DB and wrote the scripts that loaded the current data into it.

About the DB:
Type: MySQL
Version: 14.14
Distribution: 5.7.16

Admin (Can do everything, but has to connect from localhost)
User: root
Password: C0ur$eEval$Rule!

Basic (Cannot create nor delete anything greater than rows)
User: evals
Password: Eval$Rule!

Schema: course_evals

There is a copy of the DB on the hulk server and I also have a copy.

There is a copy of the Prepared Data that was used to fill the DB in the top level folder of this project. They are in an excel format, which is not useful for importing. CSV files must be created.

The four files used are:

Prepared File Name			->	Suggested CSV name	->	Function in merge_data.php the file is fed into
Overall Instructor.xlsx 		-> 	instruct_overall.csv	->	mergeInstructors
Overall Course Table.xlsx 		-> 	course_overall.csv 	->	mergeCourses
Faculty-Course Pairs Instructor.xlsx 	-> 	instruct_sect.csv	->	mergeEvals
Course Sections by Term Complete.xlsx 	-> 	course_term.csv		->	evalInstructorInsert

The order of the files as shown is the order they must be imported. Otherwise things will fail. There may be some warnings that pop up during execution of the script, but it should be fine.

Feel free to contact me at teilinger2@gmail.com with any questions you may have.
