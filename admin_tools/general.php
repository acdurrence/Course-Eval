<?php
	class General {

		protected $pdo;

		public function __construct(){
			$this->pdo = new PDO("mysql:host=hulk.cse.buffalo.edu;dbname=course_evals", 'evals', 'Eval$Rule!');
		}
	}
?>
