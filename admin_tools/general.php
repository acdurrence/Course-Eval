<?php
	class General {

		public $pdo;

		public function __construct(){
			$this->pdo = new PDO("mysql:host=127.0.0.1;dbname=course_evals", 'evals', 'Eval$Rule!');
		}
	}
?>
