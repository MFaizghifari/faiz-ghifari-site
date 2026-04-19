// GDP (nominal, USD), approx 2023 figures. Keys are numeric ISO 3166-1 codes
// matching world-atlas/countries-110m.json `id` field.
window.GDP_BY_ID = {
  840: 27360935000000, // United States
  156: 17794782000000, // China
  276:  4456081000000, // Germany
  392:  4212945000000, // Japan
  356:  3567552000000, // India
  826:  3340032000000, // United Kingdom
  250:  3030904000000, // France
  380:  2254851000000, // Italy
   76:  2173666000000, // Brazil
  124:  2140086000000, // Canada
  643:  2021421000000, // Russia
  484:  1789114000000, // Mexico
   36:  1723827000000, // Australia
  410:  1712793000000, // Korea, Rep.
  724:  1620094000000, // Spain
  360:  1371171000000, // Indonesia
  792:  1108000000000, // Türkiye
  528:  1118247000000, // Netherlands
  682:  1067592000000, // Saudi Arabia
  756:   905684000000, // Switzerland
  158:   774489000000, // Taiwan
  616:   811223000000, // Poland
   56:   636964000000, // Belgium
  752:   593269000000, // Sweden
  368:   251851000000, // Iraq
  364:   401516000000, // Iran
  376:   525002000000, // Israel
   32:   621833000000, // Argentina
  578:   485437000000, // Norway
   40:   471400000000, // Austria
  784:   504173000000, // United Arab Emirates
  554:   249885000000, // New Zealand
  144:    84355000000, // Sri Lanka
  208:   404182000000, // Denmark
  246:   305689000000, // Finland
  372:   545631000000, // Ireland
  620:   276432000000, // Portugal
  300:   238202000000, // Greece
  203:   330858000000, // Czechia
  642:   348898000000, // Romania
  348:   188526000000, // Hungary
  608:   437122000000, // Philippines
  704:   429717000000, // Vietnam
  764:   515870000000, // Thailand
  458:   399705000000, // Malaysia
  702:   501428000000, // Singapore
  344:   382055000000, // Hong Kong (historic record)
  566:   362814000000, // Nigeria
  710:   377782000000, // South Africa
  818:   395862000000, // Egypt
  504:   144419000000, // Morocco
   12:   239899000000, // Algeria
  170:   363835000000, // Colombia
  604:   267603000000, // Peru
  152:   335533000000, // Chile
  862:    97124000000, // Venezuela
  604:   267603000000, // Peru (dup ok)
  586:   374594000000, // Pakistan
   50:   437416000000, // Bangladesh
  104:    66700000000, // Myanmar
  116:    31779000000, // Cambodia
  418:    15169000000, // Laos
  398:   261421000000, // Kazakhstan
  860:    90889000000, // Uzbekistan
  804:   178757000000, // Ukraine
  112:    72793000000, // Belarus
  100:    89040000000, // Bulgaria
  191:    78495000000, // Croatia
  705:    68394000000, // Slovenia
  703:   132795000000, // Slovakia
  440:    77821000000, // Lithuania
  428:    43615000000, // Latvia
  233:    41799000000, // Estonia
  578:   485437000000, // Norway dup ok
  352:    30571000000, // Iceland
  442:    86735000000, // Luxembourg
  470:    18180000000, // Malta
  196:    32030000000, // Cyprus
  788:    51272000000, // Tunisia
  434:    50700000000, // Libya
  231:   163698000000, // Ethiopia
  404:   116988000000, // Kenya
  834:    79155000000, // Tanzania
  800:    49273000000, // Uganda
  854:    20329000000, // Burkina Faso
  466:    22354000000, // Mali
  686:    31336000000, // Senegal
  384:    81784000000, // Côte d'Ivoire
  288:    76374000000, // Ghana
  894:    29397000000, // Zambia
  716:    32424000000, // Zimbabwe
  508:    16018000000, // Mozambique
  516:    12603000000, // Namibia
   72:    19724000000, // Botswana
  450:    16818000000, // Madagascar
  748:    11041000000, // Eswatini
  426:     2444000000, // Lesthotho
  180:    66378000000, // DR Congo
  178:    14898000000, // Congo, Rep.
   24:   124221000000, // Angola
  120:    49265000000, // Cameroon
  148:    13156000000, // Chad
  140:     2467000000, // Central African Rep.
  834:    79155000000, // Tanzania dup
  638:     7000000000, // Réunion (NA)
  214:   119213000000, // Dominican Republic
  192:   116144000000, // Cuba
  320:    94670000000, // Guatemala
  340:    34538000000, // Honduras
  558:    16711000000, // Nicaragua
  188:    87055000000, // Costa Rica
  591:    83298000000, // Panama
  600:    41936000000, // Paraguay
  858:    77244000000, // Uruguay
   68:    45538000000, // Bolivia
  218:   118845000000, // Ecuador
  328:     8804000000, // Guyana
  740:     4015000000, // Suriname
  760:    89036000000, // Syria (older est.)
  400:    50730000000, // Jordan
  422:    23133000000, // Lebanon
  887:    23489000000, // Yemen
  512:   108100000000, // Oman
  634:   235501000000, // Qatar
   48:    51575000000, // Bahrain
  414:   184662000000, // Kuwait
   51:    24076000000, // Armenia
   31:    72356000000, // Azerbaijan
  268:    30537000000, // Georgia
  496:    16937000000, // Mongolia
   50:   437416000000, // Bangladesh dup
  524:    40828000000, // Nepal
   64:     2906000000, // Bhutan
  462:     5400000000, // Maldives
   96:    16768000000, // Brunei
  626:    35954000000, // Timor-Leste
  408:    23455000000, // North Korea (very rough)
  478:     8536000000, // Mauritania
  562:    16615000000, // Niger
  324:    20300000000, // Guinea
  430:     4350000000, // Liberia
  694:     3800000000, // Sierra Leone
  270:     2086000000, // Gambia
  204:    18435000000, // Benin
  768:     8929000000, // Togo
   12:   239899000000, // Algeria dup
  729:    47899000000, // Sudan
  728:     5710000000, // South Sudan
  262:     3870000000, // Djibouti
  232:     6150000000, // Eritrea
  706:    11730000000, // Somalia
  108:    14306000000, // Burundi
  646:    13300000000, // Rwanda
  226:    16100000000, // Equatorial Guinea
   90:     2807000000, // Solomon Is.
  548:     1000000000, // Vanuatu
  242:    11820000000, // Fiji
  598:    31700000000, // Papua New Guinea
  531:    13400000000, // Curaçao (NA)
   44:    14063000000, // Bahamas
  388:    19420000000, // Jamaica
  780:    27890000000, // Trinidad & Tobago
};

window.NAME_BY_ID = {
  4:"Afghanistan", 8:"Albania", 12:"Algeria", 20:"Andorra", 24:"Angola", 32:"Argentina",
  36:"Australia", 40:"Austria", 31:"Azerbaijan", 44:"Bahamas", 48:"Bahrain", 50:"Bangladesh",
  51:"Armenia", 52:"Barbados", 56:"Belgium", 64:"Bhutan", 68:"Bolivia", 70:"Bosnia & Herz.",
  72:"Botswana", 76:"Brazil", 84:"Belize", 90:"Solomon Is.", 96:"Brunei", 100:"Bulgaria",
  104:"Myanmar", 108:"Burundi", 112:"Belarus", 116:"Cambodia", 120:"Cameroon", 124:"Canada",
  140:"Central African Rep.", 144:"Sri Lanka", 148:"Chad", 152:"Chile", 156:"China", 158:"Taiwan",
  170:"Colombia", 174:"Comoros", 178:"Congo, Rep.", 180:"DR Congo", 188:"Costa Rica",
  191:"Croatia", 192:"Cuba", 196:"Cyprus", 203:"Czechia", 204:"Benin", 208:"Denmark",
  214:"Dominican Rep.", 218:"Ecuador", 222:"El Salvador", 226:"Equatorial Guinea",
  231:"Ethiopia", 232:"Eritrea", 233:"Estonia", 242:"Fiji", 246:"Finland", 250:"France",
  262:"Djibouti", 268:"Georgia", 270:"Gambia", 275:"Palestine", 276:"Germany", 288:"Ghana",
  300:"Greece", 320:"Guatemala", 324:"Guinea", 328:"Guyana", 332:"Haiti", 340:"Honduras",
  344:"Hong Kong", 348:"Hungary", 352:"Iceland", 356:"India", 360:"Indonesia", 364:"Iran",
  368:"Iraq", 372:"Ireland", 376:"Israel", 380:"Italy", 384:"Côte d'Ivoire", 388:"Jamaica",
  392:"Japan", 398:"Kazakhstan", 400:"Jordan", 404:"Kenya", 408:"North Korea", 410:"South Korea",
  414:"Kuwait", 417:"Kyrgyzstan", 418:"Laos", 422:"Lebanon", 426:"Lesotho", 428:"Latvia",
  430:"Liberia", 434:"Libya", 440:"Lithuania", 442:"Luxembourg", 450:"Madagascar", 454:"Malawi",
  458:"Malaysia", 462:"Maldives", 466:"Mali", 470:"Malta", 478:"Mauritania", 480:"Mauritius",
  484:"Mexico", 496:"Mongolia", 498:"Moldova", 499:"Montenegro", 504:"Morocco",
  508:"Mozambique", 512:"Oman", 516:"Namibia", 524:"Nepal", 528:"Netherlands", 540:"New Caledonia",
  548:"Vanuatu", 554:"New Zealand", 558:"Nicaragua", 562:"Niger", 566:"Nigeria", 578:"Norway",
  583:"Micronesia", 586:"Pakistan", 591:"Panama", 598:"Papua New Guinea", 600:"Paraguay",
  604:"Peru", 608:"Philippines", 616:"Poland", 620:"Portugal", 624:"Guinea-Bissau",
  626:"Timor-Leste", 630:"Puerto Rico", 634:"Qatar", 642:"Romania", 643:"Russia", 646:"Rwanda",
  682:"Saudi Arabia", 686:"Senegal", 688:"Serbia", 690:"Seychelles", 694:"Sierra Leone",
  702:"Singapore", 703:"Slovakia", 704:"Vietnam", 705:"Slovenia", 706:"Somalia", 710:"South Africa",
  716:"Zimbabwe", 724:"Spain", 728:"South Sudan", 729:"Sudan", 732:"W. Sahara", 740:"Suriname",
  748:"Eswatini", 752:"Sweden", 756:"Switzerland", 760:"Syria", 762:"Tajikistan", 764:"Thailand",
  768:"Togo", 780:"Trinidad & Tobago", 784:"UAE", 788:"Tunisia", 792:"Türkiye", 795:"Turkmenistan",
  798:"Tuvalu", 800:"Uganda", 804:"Ukraine", 807:"North Macedonia", 818:"Egypt",
  826:"United Kingdom", 834:"Tanzania", 840:"United States", 854:"Burkina Faso",
  858:"Uruguay", 860:"Uzbekistan", 862:"Venezuela", 882:"Samoa", 887:"Yemen",
  894:"Zambia", 178:"Congo", 540:"New Caledonia", 90:"Solomon Is."
};
