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
  $xml=simplexml_load_file("dump.xml") or die("Error: Cannot create object.");
  $json = json_encode($xml);
  $results = json_decode($json,TRUE);

  for ($x = 0; $x <= 8; $x++) {
    $temp = $results["result"][rand(0,sizeof($results)-1)];
  }

});

//Get test books.
$app->get('/test',function(){
  $arr = [
      "book1" => [
        "coverimage" => "http://webservices.bibliotheek.be/index.php?func=cover&ISBN=9789031709069&VLACCnr=1053077",
        "title" => "Vergif",
        "author" => "R.H. Schoemans",
        "genres" => [
            "Detective", "Humor"
        ],
        "description" => "Bij toeval vindt Erwin het lijk van een man. Het gaat om een afrekening van de IRA met een 'verrader', die werkt in een Britse kazerne in de Belgische Kempen. Op zoek naar de dader van de moord komt Erwin in Belfast terecht, bij Daffy, een Ierse jongen, die een jaar eerder bij hem op vakantie is geweest. Soms raken ze verzeild in allerlei verwikkelingen. In dit spannende verhaal zijn de politieke situatie in Noord-Ierland en de gevolgen hiervan voor de bevolking sterk verweven. Het woordgebruik en de zinsbouw is afgestemd op de leeftijdsgroep van 12 tot 14 jaar. In het chronologisch verteld verhaal gaan de, op verschillende plaatsen gesitueerde gebeurtenissen, logisch in elkaar over. De auteur probeert met dit boek bij de jeugd meer inzicht te krijgen in de achtergronden en situatie in Noord-Ierland. De informatie is qua beleving en interesse afgestemd op de beoogde lezersgroep (12-14 jaar)."
      ],
      "book2" => [
        "coverimage" => "http://webservices.bibliotheek.be/index.php?func=cover&ISBN=9789031709069&VLACCnr=1053077",
        "title" => "Vergif",
        "author" => "R.H. Schoemans",
        "genres" => [
            "Detective", "Humor"
        ],
        "description" => "Bij toeval vindt Erwin het lijk van een man. Het gaat om een afrekening van de IRA met een 'verrader', die werkt in een Britse kazerne in de Belgische Kempen. Op zoek naar de dader van de moord komt Erwin in Belfast terecht, bij Daffy, een Ierse jongen, die een jaar eerder bij hem op vakantie is geweest. Soms raken ze verzeild in allerlei verwikkelingen. In dit spannende verhaal zijn de politieke situatie in Noord-Ierland en de gevolgen hiervan voor de bevolking sterk verweven. Het woordgebruik en de zinsbouw is afgestemd op de leeftijdsgroep van 12 tot 14 jaar. In het chronologisch verteld verhaal gaan de, op verschillende plaatsen gesitueerde gebeurtenissen, logisch in elkaar over. De auteur probeert met dit boek bij de jeugd meer inzicht te krijgen in de achtergronden en situatie in Noord-Ierland. De informatie is qua beleving en interesse afgestemd op de beoogde lezersgroep (12-14 jaar)."
      ],
      "book3" => [
        "coverimage" => "http://webservices.bibliotheek.be/index.php?func=cover&ISBN=9789031709069&VLACCnr=1053077",
        "title" => "Vergif",
        "author" => "R.H. Schoemans",
        "genres" => [
            "Detective", "Humor"
        ],
        "description" => "Bij toeval vindt Erwin het lijk van een man. Het gaat om een afrekening van de IRA met een 'verrader', die werkt in een Britse kazerne in de Belgische Kempen. Op zoek naar de dader van de moord komt Erwin in Belfast terecht, bij Daffy, een Ierse jongen, die een jaar eerder bij hem op vakantie is geweest. Soms raken ze verzeild in allerlei verwikkelingen. In dit spannende verhaal zijn de politieke situatie in Noord-Ierland en de gevolgen hiervan voor de bevolking sterk verweven. Het woordgebruik en de zinsbouw is afgestemd op de leeftijdsgroep van 12 tot 14 jaar. In het chronologisch verteld verhaal gaan de, op verschillende plaatsen gesitueerde gebeurtenissen, logisch in elkaar over. De auteur probeert met dit boek bij de jeugd meer inzicht te krijgen in de achtergronden en situatie in Noord-Ierland. De informatie is qua beleving en interesse afgestemd op de beoogde lezersgroep (12-14 jaar)."
      ],
      "book4" => [
        "coverimage" => "http://webservices.bibliotheek.be/index.php?func=cover&ISBN=9789031709069&VLACCnr=1053077",
        "title" => "Vergif",
        "author" => "R.H. Schoemans",
        "genres" => [
            "Detective", "Humor"
        ],
        "description" => "Bij toeval vindt Erwin het lijk van een man. Het gaat om een afrekening van de IRA met een 'verrader', die werkt in een Britse kazerne in de Belgische Kempen. Op zoek naar de dader van de moord komt Erwin in Belfast terecht, bij Daffy, een Ierse jongen, die een jaar eerder bij hem op vakantie is geweest. Soms raken ze verzeild in allerlei verwikkelingen. In dit spannende verhaal zijn de politieke situatie in Noord-Ierland en de gevolgen hiervan voor de bevolking sterk verweven. Het woordgebruik en de zinsbouw is afgestemd op de leeftijdsgroep van 12 tot 14 jaar. In het chronologisch verteld verhaal gaan de, op verschillende plaatsen gesitueerde gebeurtenissen, logisch in elkaar over. De auteur probeert met dit boek bij de jeugd meer inzicht te krijgen in de achtergronden en situatie in Noord-Ierland. De informatie is qua beleving en interesse afgestemd op de beoogde lezersgroep (12-14 jaar)."
      ],
      "book5" => [
        "coverimage" => "http://webservices.bibliotheek.be/index.php?func=cover&ISBN=9789031709069&VLACCnr=1053077",
        "title" => "Vergif",
        "author" => "R.H. Schoemans",
        "genres" => [
            "Detective", "Humor"
        ],
        "description" => "Bij toeval vindt Erwin het lijk van een man. Het gaat om een afrekening van de IRA met een 'verrader', die werkt in een Britse kazerne in de Belgische Kempen. Op zoek naar de dader van de moord komt Erwin in Belfast terecht, bij Daffy, een Ierse jongen, die een jaar eerder bij hem op vakantie is geweest. Soms raken ze verzeild in allerlei verwikkelingen. In dit spannende verhaal zijn de politieke situatie in Noord-Ierland en de gevolgen hiervan voor de bevolking sterk verweven. Het woordgebruik en de zinsbouw is afgestemd op de leeftijdsgroep van 12 tot 14 jaar. In het chronologisch verteld verhaal gaan de, op verschillende plaatsen gesitueerde gebeurtenissen, logisch in elkaar over. De auteur probeert met dit boek bij de jeugd meer inzicht te krijgen in de achtergronden en situatie in Noord-Ierland. De informatie is qua beleving en interesse afgestemd op de beoogde lezersgroep (12-14 jaar)."
      ],
      "book6" => [
        "coverimage" => "http://webservices.bibliotheek.be/index.php?func=cover&ISBN=9789031709069&VLACCnr=1053077",
        "title" => "Vergif",
        "author" => "R.H. Schoemans",
        "genres" => [
            "Detective", "Humor"
        ],
        "description" => "Bij toeval vindt Erwin het lijk van een man. Het gaat om een afrekening van de IRA met een 'verrader', die werkt in een Britse kazerne in de Belgische Kempen. Op zoek naar de dader van de moord komt Erwin in Belfast terecht, bij Daffy, een Ierse jongen, die een jaar eerder bij hem op vakantie is geweest. Soms raken ze verzeild in allerlei verwikkelingen. In dit spannende verhaal zijn de politieke situatie in Noord-Ierland en de gevolgen hiervan voor de bevolking sterk verweven. Het woordgebruik en de zinsbouw is afgestemd op de leeftijdsgroep van 12 tot 14 jaar. In het chronologisch verteld verhaal gaan de, op verschillende plaatsen gesitueerde gebeurtenissen, logisch in elkaar over. De auteur probeert met dit boek bij de jeugd meer inzicht te krijgen in de achtergronden en situatie in Noord-Ierland. De informatie is qua beleving en interesse afgestemd op de beoogde lezersgroep (12-14 jaar)."
      ],
      "book7" => [
        "coverimage" => "http://webservices.bibliotheek.be/index.php?func=cover&ISBN=9789031709069&VLACCnr=1053077",
        "title" => "Vergif",
        "author" => "R.H. Schoemans",
        "genres" => [
            "Detective", "Humor"
        ],
        "description" => "Bij toeval vindt Erwin het lijk van een man. Het gaat om een afrekening van de IRA met een 'verrader', die werkt in een Britse kazerne in de Belgische Kempen. Op zoek naar de dader van de moord komt Erwin in Belfast terecht, bij Daffy, een Ierse jongen, die een jaar eerder bij hem op vakantie is geweest. Soms raken ze verzeild in allerlei verwikkelingen. In dit spannende verhaal zijn de politieke situatie in Noord-Ierland en de gevolgen hiervan voor de bevolking sterk verweven. Het woordgebruik en de zinsbouw is afgestemd op de leeftijdsgroep van 12 tot 14 jaar. In het chronologisch verteld verhaal gaan de, op verschillende plaatsen gesitueerde gebeurtenissen, logisch in elkaar over. De auteur probeert met dit boek bij de jeugd meer inzicht te krijgen in de achtergronden en situatie in Noord-Ierland. De informatie is qua beleving en interesse afgestemd op de beoogde lezersgroep (12-14 jaar)."
      ],
      "book8" => [
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
