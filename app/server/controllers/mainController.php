<?php 

$var = array([
	    "id" => "1",
	    "title" => 'Sweet',
	    "number" => '12345',
	    "header" => 'Learn React',
	    "description" => 'I have to be a world class expert',
	    "imageURL" => "images/pic1.jpg"
	],
	[
		"id" => "2",
		"title" => 'Sweet',
		"number" => '54321',
		"header" => 'Become formost JS expert',
		"description" => 'I will leave no doubt',
		"imageURL" => "images/pic2.jpg"

	],
	[
		"id" => "3",
	    "title" => 'Sweet',
	    "number" => '32415',
	    "header" => 'Know everything and build exceptional things',
	    "description" => 'You will be second to none',
	    "imageURL" => "images/pic3.jpg"
	]);



	   

echo json_encode($var);
