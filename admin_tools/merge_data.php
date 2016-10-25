<?php

class MergeTools{

	private $pdo;

	function mergeInstructors($fileName){
		$file = fopen($fileName, "r");
		$data = fgetcsv($file);

		$ID = $PN = $Name = $Q1AVG = $Q1SD = $Q2AVG = $Q2SD = $Q3AVG = $Q3SD = $Q4AVG = $Q4SD = $Q5AVG = $Q5SD = 0;
		$sql = "SELECT ID FROM course_evals.instructors WHERE PN = :PN";
		$check = $this->pdo->prepare($sql);
		$check->bindParam(":PN", $PN, PDO::PARAM_INT);

		$sql = "INSERT INTO course_evals.instructors (Name, PN, Q1AVG, Q1SD, Q2AVG, Q2SD, Q3AVG, Q3SD, Q4AVG, Q4SD, Q5AVG, Q5SD)
			VALUES (:Name, :PN, :Q1AVG, :Q1SD, :Q2AVG, :Q2SD, :Q3AVG, :Q3SD, :Q4AVG, :Q4SD, :Q5AVG, :Q5SD)";
		$insert = $this->pdo->prepare($sql);
		$insert->bindParam(":Name", $Name);
		$insert->bindParam(":PN", $PN);
		$insert->bindParam(":Q1AVG", $Q1AVG);
		$insert->bindParam(":Q1SD", $Q1SD);
		$insert->bindParam(":Q2AVG", $Q2AVG);
		$insert->bindParam(":Q2SD", $Q2SD);
		$insert->bindParam(":Q3AVG", $Q3AVG);
		$insert->bindParam(":Q3SD", $Q3SD);
		$insert->bindParam(":Q4AVG", $Q4AVG);
		$insert->bindParam(":Q4SD", $Q4SD);
		$insert->bindParam(":Q5AVG", $Q5AVG);
		$insert->bindParam(":Q5SD", $Q5SD);

		$sql = "UPDATE course_evals.instructors
			SET Q1AVG = :Q1AVG,
				Q1SD = :Q1SD,
				Q2AVG = :Q2AVG,
				Q2SD = :Q2SD,
				Q3AVG = :Q3AVG,
				Q3SD = :Q3SD,
				Q4AVG = :Q4AVG,
				Q4SD = :Q4SD,
				Q5AVG = :Q5AVG,
				Q5SD = :Q5SD
			WHERE ID = :ID";
		$update = $this->pdo->prepare($sql);
		$update->bindParam(":Q1AVG", $Q1AVG);
		$update->bindParam(":Q1SD", $Q1SD);
		$update->bindParam(":Q2AVG", $Q2AVG);
		$update->bindParam(":Q2SD", $Q2SD);
		$update->bindParam(":Q3AVG", $Q3AVG);
		$update->bindParam(":Q3SD", $Q3SD);
		$update->bindParam(":Q4AVG", $Q4AVG);
		$update->bindParam(":Q4SD", $Q4SD);
		$update->bindParam(":Q5AVG", $Q5AVG);
		$update->bindParam(":Q5SD", $Q5SD);
		$update->bindParam(":ID", $ID);

		for($i = 1; $i < count($data); ++$i){
			$PN = $data[$i][1];
			$Name = $data[$i][0];
			$Q1AVG = $data[$i][2];
			$Q1SD = $data[$i][3];
			$Q2AVG = $data[$i][4];
			$Q2SD = $data[$i][5];
			$Q3AVG = $data[$i][6];
			$Q3SD = $data[$i][7];
			$Q4AVG = $data[$i][8];
			$Q4SD = $data[$i][9];
			$Q5AVG = $data[$i][10];
			$Q5SD = $data[$i][11];
			$check->execute();
			if($results = $check->fetchAll()){
				$ID = $results[0][0];
				$update->execute();
			}
			else {
				$insert->execute();
			}
		}

		$check->close();
		$insert->close();
		$update->close();
	}

	function mergeCourses($fileName){
		$file = fopen($fileName, "r");
		$data = fgetcsv($file);

		$ID = $subject = $number = $Q1AVG = $Q1SD = $Q2AVG = $Q2SD = $Q3AVG = $Q3SD = $Q4AVG = $Q4SD = $Q5AVG = $Q5SD = $Q6AVG = $Q6SD = $total = $sample = $offered = 0;
		$sql = "SELECT ID FROM course_evals.courses WHERE Number = :number";
		$check = $this->pdo->prepare($sql);
		$check->bindParam(":number", $number);

		$sql = "INSERT INTO course_evals.courses (Subject, Number, Q1AVG, Q1SD, Q2AVG, Q2SD, Q3AVG, Q3SD, Q4AVG, Q4SD, Q5AVG, Q5SD, Q6AVG, Q6SD, Total, Sample, Times_Offered)
			VALUES (:Subject, :Number, :Q1AVG, :Q1SD, :Q2AVG, :Q2SD, :Q3AVG, :Q3SD, :Q4AVG, :Q4SD, :Q5AVG, :Q5SD, :Q6AVG, :Q6SD, :Total, :Sample, :Times_Offered)";
		$insert = $this->pdo->prepare($sql);
		$insert->bindParam(":Subject", $subject);
		$insert->bindParam(":Number", $number);
		$insert->bindParam(":Q1AVG", $Q1AVG);
		$insert->bindParam(":Q1SD", $Q1SD);
		$insert->bindParam(":Q2AVG", $Q2AVG);
		$insert->bindParam(":Q2SD", $Q2SD);
		$insert->bindParam(":Q3AVG", $Q3AVG);
		$insert->bindParam(":Q3SD", $Q3SD);
		$insert->bindParam(":Q4AVG", $Q4AVG);
		$insert->bindParam(":Q4SD", $Q4SD);
		$insert->bindParam(":Q5AVG", $Q5AVG);
		$insert->bindParam(":Q5SD", $Q5SD);
		$insert->bindParam(":Q6AVG", $Q6AVG);
		$insert->bindParam(":Q6SD", $Q6SD);
		$insert->bindParam(":Total", $total);
		$insert->bindParam(":Sample", $sample);
		$insert->bindParam(":Times_Offered", $offered);


		$sql = "UPDATE course_evals.courses
			SET Q1AVG = :Q1AVG,
				Q1SD = :Q1SD,
				Q2AVG = :Q2AVG,
				Q2SD = :Q2SD,
				Q3AVG = :Q3AVG,
				Q3SD = :Q3SD,
				Q4AVG = :Q4AVG,
				Q4SD = :Q4SD,
				Q5AVG = :Q5AVG,
				Q5SD = :Q5SD,
				Q6AVG = :Q6AVG,
				Q6SD = :Q6SD,
				Total = :Total,
				Sample = :Sample,
				Times_Offered = :Offered
			WHERE ID = :ID";
		$update = $this->pdo->prepare($sql);
		$update->bindParam(":Q1AVG", $Q1AVG);
		$update->bindParam(":Q1SD", $Q1SD);
		$update->bindParam(":Q2AVG", $Q2AVG);
		$update->bindParam(":Q2SD", $Q2SD);
		$update->bindParam(":Q3AVG", $Q3AVG);
		$update->bindParam(":Q3SD", $Q3SD);
		$update->bindParam(":Q4AVG", $Q4AVG);
		$update->bindParam(":Q4SD", $Q4SD);
		$update->bindParam(":Q5AVG", $Q5AVG);
		$update->bindParam(":Q5SD", $Q5SD);
		$update->bindParam(":Q6AVG", $Q6AVG);
		$update->bindParam(":Q6SD", $Q6SD);
		$update->bindParam(":Total", $total);
		$update->bindParam(":Sample", $sample);
		$update->bindParam(":Offered", $offered);
		$update->bindParam(":ID", $ID);

		for($i = 1; $i < count($data); ++$i){
			$classNumber = $data[$i][1];
			$subject = $data[$i][0];
			$Q1AVG = $data[$i][5];
			$Q1SD = $data[$i][6];
			$Q2AVG = $data[$i][7];
			$Q2SD = $data[$i][8];
			$Q3AVG = $data[$i][9];
			$Q3SD = $data[$i][10];
			$Q4AVG = $data[$i][11];
			$Q4SD = $data[$i][12];
			$Q5AVG = $data[$i][13];
			$Q5SD = $data[$i][14];
			$Q6AVG = $data[$i][15];
			$Q6SD = $data[$i][16];
			$total = $data[$i][3];
			$sample = $data[$i][4];
			$offered = $data[$i][2];
			$check->execute();
			if($results = $check->fetchAll()){
				$ID = $results[0][0];
				$update->execute();
			}
			else {
				$insert->execute();
			}
		}

		$check->close();
		$insert->close();
		$update->close();
	}

	function mergeEvals($fileName){
		$file = fopen($fileName, "r");
		$data = fgetcsv($file);

		$term = $classNumber = $termCode = $unit = $dept = $subject = $section = $number = $title = $crosslist = $crosslist_desc = $total = $sample = 0;
		$Q1AVG = $Q1SD = $Q2AVG = $Q2SD = $Q3AVG = $Q3SD = $Q4AVG = $Q4SD = $Q5AVG = $Q5SD = $Q6AVG = $Q6SD = $course_id = 0;
		$sql = "SELECT ID, Title FROM course_evals.courses WHERE Subject = :subject AND Number = :number";
		$check = $this->pdo->prepare($sql);
		$check->bindParam(":subject", $subject);
		$check->bindParam(":number", $number);

		$sql = "INSERT INTO course_evals.evals (Course_ID, Term, Term_Code, Class_Number, Section, Total, Sample, Q1AVG, Q1SD, Q2AVG, Q2SD, Q3AVG, Q3SD, Q4AVG, Q4SD, Q5AVG, Q5SD, Q6AVG, Q6SD)
			VALUES (:Course_ID, :Term, :Term_Code, :Class_Number, :Section, :Total, :Sample, :Q1AVG, :Q1SD, :Q2AVG, :Q2SD, :Q3AVG, :Q3SD, :Q4AVG, :Q4SD, :Q5AVG, :Q5SD, :Q6AVG, :Q6SD)";
		$insert = $this->pdo->prepare($sql);
		$insert->bindParam(":Course_ID", $course_id);
		$insert->bindParam(":Term", $term);
		$insert->bindParam(":Term_Code", $termCode);
		$insert->bindParam(":Class_Number", $classNumber);
		$insert->bindParam(":Section", $section);
		$insert->bindParam(":Total", $total);
		$insert->bindParam(":Sample", $sample);
		$insert->bindParam(":Q1AVG", $Q1AVG);
		$insert->bindParam(":Q1SD", $Q1SD);
		$insert->bindParam(":Q2AVG", $Q2AVG);
		$insert->bindParam(":Q2SD", $Q2SD);
		$insert->bindParam(":Q3AVG", $Q3AVG);
		$insert->bindParam(":Q3SD", $Q3SD);
		$insert->bindParam(":Q4AVG", $Q4AVG);
		$insert->bindParam(":Q4SD", $Q4SD);
		$insert->bindParam(":Q5AVG", $Q5AVG);
		$insert->bindParam(":Q5SD", $Q5SD);
		$insert->bindParam(":Q6AVG", $Q6AVG);
		$insert->bindParam(":Q6SD", $Q6SD);

		$sql = "UPDATE course_evals.courses
			SET Title = :Title,
				Dept = :Dept,
				Unit = :Unit,
				Crosslisted = :Cross,
				Crosslist_Desc = :CrossD
			WHERE ID = :ID";
		$update = $this->pdo->prepare($sql);
		$update->bindParam(":Title", $title);
		$update->bindParam(":Dept", $dept);
		$update->bindParam(":Unit", $unit);
		$update->bindParam(":Cross", $crosslist);
		$update->bindParam(":CrossD", $crosslist_desc);
		$update->bindParam(":ID", $course_id);

		for($i = 1; $i < count($data); ++$i){
			$classNumber = $data[$i][1];
			$term = $data[$i][0];
			$termCode = $data[$i][2];
			$unit = $data[$i][3];
			$dept = $data[$i][4];
			$subject = $data[$i][5];
			$number = $data[$i][6];
			$section = $data[$i][7];
			$title = $data[$i][8];
			$crosslisted = empty($data[$i][9]) ? 0 : 1;
			$crosslist_desc = $data[$i][10];
			$Q1AVG = $data[$i][11];
			$Q1SD = $data[$i][12];
			$Q2AVG = $data[$i]13];
			$Q2SD = $data[$i][14];
			$Q3AVG = $data[$i][15];
			$Q3SD = $data[$i][16];
			$Q4AVG = $data[$i][17];
			$Q4SD = $data[$i][18];
			$Q5AVG = $data[$i][19];
			$Q5SD = $data[$i][20];
			$Q6AVG = $data[$i][21];
			$Q6SD = $data[$i][22];
			$total = $data[$i][23];
			$sample = $data[$i][24];
			$check->execute();
			$results = $check->fetchAll()
			$course_id = $results[0][0];
			if(!empty($results[0][1]){
				$update->execute();
			}
			$insert->execute();
		}

		$check->close();
		$insert->close();
		$update->close();
	}

	function evalInstructorInsert($fileName){
		$file = fopen($fileName, "r");
		$data = fgetcsv($file);
		
		$PN = $class_number = $term_code = 0;

		$sql = "UPDATE course_evals.evals
			SET Instructor_ID = (SELECT ID FROM course_evals.instructors WHERE PN = :PN)
			WHERE Class_Number = :Class_Number
			AND Term_Code = :Term_Code";

		$update = $this->pdo->prepare($sql);
		$update->bindParam(":PN", $PN);
		$update->bindParam(":Class_Number", $class_number);
		$update->bindParam(":Term_Code", $term_code);
		
		for($i = 1; $i < count($data); ++$i){
			$PN = $data[$i][3];
			$class_number = $data[$i][1];
			$term_code = $data[$i][0];
			$update->execute();
		}

		$update->close();
	}
}

?>
