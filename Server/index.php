<?php

/**
 * Temporary API.
 * @author Ruben Meul <meulruben@gmail.com>
 * @copyright Copyright (c) 2015, open Summer of code 2015
 */
include('includes/json.php');
//Debug output
ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);
error_reporting(-1);

//Setup of app
require_once __DIR__.'/vendor/autoload.php';
$app = new Silex\Application();
$app['debug'] = true;

//Settings

//Get recommended books.
$app->get('/',function(){
  //read the xml from the file
  $xml=simplexml_load_file("dump.xml") or die("Error: Cannot create object.");

  //convert the xml to json
  $json = json_encode($xml);
  //return $json;
  //convert the json to an array
  $results = json_decode($json,TRUE);

  //will hold the final books
  $output = [];

  //pick 8 (for now random) books
  for ($x = 0; $x <= 8; $x++) {
    //random index
    $result = $results['result'][rand(0, sizeof($results['result'])-1)];

    //set array
    $temp = [
      "coverimage" => $result['coverimage']['url'],
      "title" => $result['titles']['short-title']
    ];

    //check if author is set
    if(array_key_exists('authors', $result)){
      $temp["author"] = $result['authors']['main-author'];
    }
    else{
      $temp["author"] = "Geen auteur te vinden.";
    }

    //check if summary is set
    if(array_key_exists('summaries', $result)){
      $temp["description"] = $result['summaries']['summary'];
    }
    else{
      $temp["description"] = "Geen beschrijving te vinden.";
    }

    //check if genres is set
    if(is_array($result['genres']['genre'])){
      $temp["genres"] = implode(", ",array_unique($result['genres']['genre']));
    }else{
      $temp["genres"] = $result['genres']['genre'];
    }

    array_push($output, $temp);
  }
  //encode the array to json and return it
  return json_encode($output);
});

//Get test books.
$app->get('/test',function(){
  $arr = [
      [
        "coverimage" => "http://webservices.bibliotheek.be/index.php?func=cover&ISBN=9789031709069&VLACCnr=1053077",
        "title" => "Vergif",
        "author" => "R.H. Schoemans",
        "genres" => [
            "Detective", "Humor"
        ],
        "description" => "Bij toeval vindt Erwin het lijk van een man. Het gaat om een afrekening van de IRA met een 'verrader', die werkt in een Britse kazerne in de Belgische Kempen. Op zoek naar de dader van de moord komt Erwin in Belfast terecht, bij Daffy, een Ierse jongen, die een jaar eerder bij hem op vakantie is geweest. Soms raken ze verzeild in allerlei verwikkelingen. In dit spannende verhaal zijn de politieke situatie in Noord-Ierland en de gevolgen hiervan voor de bevolking sterk verweven. Het woordgebruik en de zinsbouw is afgestemd op de leeftijdsgroep van 12 tot 14 jaar. In het chronologisch verteld verhaal gaan de, op verschillende plaatsen gesitueerde gebeurtenissen, logisch in elkaar over. De auteur probeert met dit boek bij de jeugd meer inzicht te krijgen in de achtergronden en situatie in Noord-Ierland. De informatie is qua beleving en interesse afgestemd op de beoogde lezersgroep (12-14 jaar)."
      ],
      [
        "coverimage" => "http://webservices.bibliotheek.be/index.php?func=cover&ISBN=9789031709069&VLACCnr=1053077",
        "title" => "Vergif",
        "author" => "R.H. Schoemans",
        "genres" => [
            "Detective", "Humor"
        ],
        "description" => "Bij toeval vindt Erwin het lijk van een man. Het gaat om een afrekening van de IRA met een 'verrader', die werkt in een Britse kazerne in de Belgische Kempen. Op zoek naar de dader van de moord komt Erwin in Belfast terecht, bij Daffy, een Ierse jongen, die een jaar eerder bij hem op vakantie is geweest. Soms raken ze verzeild in allerlei verwikkelingen. In dit spannende verhaal zijn de politieke situatie in Noord-Ierland en de gevolgen hiervan voor de bevolking sterk verweven. Het woordgebruik en de zinsbouw is afgestemd op de leeftijdsgroep van 12 tot 14 jaar. In het chronologisch verteld verhaal gaan de, op verschillende plaatsen gesitueerde gebeurtenissen, logisch in elkaar over. De auteur probeert met dit boek bij de jeugd meer inzicht te krijgen in de achtergronden en situatie in Noord-Ierland. De informatie is qua beleving en interesse afgestemd op de beoogde lezersgroep (12-14 jaar)."
      ],
      [
        "coverimage" => "http://webservices.bibliotheek.be/index.php?func=cover&ISBN=9789031709069&VLACCnr=1053077",
        "title" => "Vergif",
        "author" => "R.H. Schoemans",
        "genres" => [
            "Detective", "Humor"
        ],
        "description" => "Bij toeval vindt Erwin het lijk van een man. Het gaat om een afrekening van de IRA met een 'verrader', die werkt in een Britse kazerne in de Belgische Kempen. Op zoek naar de dader van de moord komt Erwin in Belfast terecht, bij Daffy, een Ierse jongen, die een jaar eerder bij hem op vakantie is geweest. Soms raken ze verzeild in allerlei verwikkelingen. In dit spannende verhaal zijn de politieke situatie in Noord-Ierland en de gevolgen hiervan voor de bevolking sterk verweven. Het woordgebruik en de zinsbouw is afgestemd op de leeftijdsgroep van 12 tot 14 jaar. In het chronologisch verteld verhaal gaan de, op verschillende plaatsen gesitueerde gebeurtenissen, logisch in elkaar over. De auteur probeert met dit boek bij de jeugd meer inzicht te krijgen in de achtergronden en situatie in Noord-Ierland. De informatie is qua beleving en interesse afgestemd op de beoogde lezersgroep (12-14 jaar)."
      ],
      [
        "coverimage" => "http://webservices.bibliotheek.be/index.php?func=cover&ISBN=9789031709069&VLACCnr=1053077",
        "title" => "Vergif",
        "author" => "R.H. Schoemans",
        "genres" => [
            "Detective", "Humor"
        ],
        "description" => "Bij toeval vindt Erwin het lijk van een man. Het gaat om een afrekening van de IRA met een 'verrader', die werkt in een Britse kazerne in de Belgische Kempen. Op zoek naar de dader van de moord komt Erwin in Belfast terecht, bij Daffy, een Ierse jongen, die een jaar eerder bij hem op vakantie is geweest. Soms raken ze verzeild in allerlei verwikkelingen. In dit spannende verhaal zijn de politieke situatie in Noord-Ierland en de gevolgen hiervan voor de bevolking sterk verweven. Het woordgebruik en de zinsbouw is afgestemd op de leeftijdsgroep van 12 tot 14 jaar. In het chronologisch verteld verhaal gaan de, op verschillende plaatsen gesitueerde gebeurtenissen, logisch in elkaar over. De auteur probeert met dit boek bij de jeugd meer inzicht te krijgen in de achtergronden en situatie in Noord-Ierland. De informatie is qua beleving en interesse afgestemd op de beoogde lezersgroep (12-14 jaar)."
      ],
      [
        "coverimage" => "http://webservices.bibliotheek.be/index.php?func=cover&ISBN=9789031709069&VLACCnr=1053077",
        "title" => "Vergif",
        "author" => "R.H. Schoemans",
        "genres" => [
            "Detective", "Humor"
        ],
        "description" => "Bij toeval vindt Erwin het lijk van een man. Het gaat om een afrekening van de IRA met een 'verrader', die werkt in een Britse kazerne in de Belgische Kempen. Op zoek naar de dader van de moord komt Erwin in Belfast terecht, bij Daffy, een Ierse jongen, die een jaar eerder bij hem op vakantie is geweest. Soms raken ze verzeild in allerlei verwikkelingen. In dit spannende verhaal zijn de politieke situatie in Noord-Ierland en de gevolgen hiervan voor de bevolking sterk verweven. Het woordgebruik en de zinsbouw is afgestemd op de leeftijdsgroep van 12 tot 14 jaar. In het chronologisch verteld verhaal gaan de, op verschillende plaatsen gesitueerde gebeurtenissen, logisch in elkaar over. De auteur probeert met dit boek bij de jeugd meer inzicht te krijgen in de achtergronden en situatie in Noord-Ierland. De informatie is qua beleving en interesse afgestemd op de beoogde lezersgroep (12-14 jaar)."
      ],
      [
        "coverimage" => "http://webservices.bibliotheek.be/index.php?func=cover&ISBN=9789031709069&VLACCnr=1053077",
        "title" => "Vergif",
        "author" => "R.H. Schoemans",
        "genres" => [
            "Detective", "Humor"
        ],
        "description" => "Bij toeval vindt Erwin het lijk van een man. Het gaat om een afrekening van de IRA met een 'verrader', die werkt in een Britse kazerne in de Belgische Kempen. Op zoek naar de dader van de moord komt Erwin in Belfast terecht, bij Daffy, een Ierse jongen, die een jaar eerder bij hem op vakantie is geweest. Soms raken ze verzeild in allerlei verwikkelingen. In dit spannende verhaal zijn de politieke situatie in Noord-Ierland en de gevolgen hiervan voor de bevolking sterk verweven. Het woordgebruik en de zinsbouw is afgestemd op de leeftijdsgroep van 12 tot 14 jaar. In het chronologisch verteld verhaal gaan de, op verschillende plaatsen gesitueerde gebeurtenissen, logisch in elkaar over. De auteur probeert met dit boek bij de jeugd meer inzicht te krijgen in de achtergronden en situatie in Noord-Ierland. De informatie is qua beleving en interesse afgestemd op de beoogde lezersgroep (12-14 jaar)."
      ],
      [
        "coverimage" => "http://webservices.bibliotheek.be/index.php?func=cover&ISBN=9789031709069&VLACCnr=1053077",
        "title" => "Vergif",
        "author" => "R.H. Schoemans",
        "genres" => [
            "Detective", "Humor"
        ],
        "description" => "Bij toeval vindt Erwin het lijk van een man. Het gaat om een afrekening van de IRA met een 'verrader', die werkt in een Britse kazerne in de Belgische Kempen. Op zoek naar de dader van de moord komt Erwin in Belfast terecht, bij Daffy, een Ierse jongen, die een jaar eerder bij hem op vakantie is geweest. Soms raken ze verzeild in allerlei verwikkelingen. In dit spannende verhaal zijn de politieke situatie in Noord-Ierland en de gevolgen hiervan voor de bevolking sterk verweven. Het woordgebruik en de zinsbouw is afgestemd op de leeftijdsgroep van 12 tot 14 jaar. In het chronologisch verteld verhaal gaan de, op verschillende plaatsen gesitueerde gebeurtenissen, logisch in elkaar over. De auteur probeert met dit boek bij de jeugd meer inzicht te krijgen in de achtergronden en situatie in Noord-Ierland. De informatie is qua beleving en interesse afgestemd op de beoogde lezersgroep (12-14 jaar)."
      ],
      [
        "coverimage" => "http://webservices.bibliotheek.be/index.php?func=cover&ISBN=9789031709069&VLACCnr=1053077",
        "title" => "Vergif",
        "author" => "R.H. Schoemans",
        "genres" => [
            "Detective", "Humor"
        ],
        "description" => "Bij toeval vindt Erwin het lijk van een man. Het gaat om een afrekening van de IRA met een 'verrader', die werkt in een Britse kazerne in de Belgische Kempen. Op zoek naar de dader van de moord komt Erwin in Belfast terecht, bij Daffy, een Ierse jongen, die een jaar eerder bij hem op vakantie is geweest. Soms raken ze verzeild in allerlei verwikkelingen. In dit spannende verhaal zijn de politieke situatie in Noord-Ierland en de gevolgen hiervan voor de bevolking sterk verweven. Het woordgebruik en de zinsbouw is afgestemd op de leeftijdsgroep van 12 tot 14 jaar. In het chronologisch verteld verhaal gaan de, op verschillende plaatsen gesitueerde gebeurtenissen, logisch in elkaar over. De auteur probeert met dit boek bij de jeugd meer inzicht te krijgen in de achtergronden en situatie in Noord-Ierland. De informatie is qua beleving en interesse afgestemd op de beoogde lezersgroep (12-14 jaar)."
      ]
  ];
  return json_encode($arr);
});

$app->run();
