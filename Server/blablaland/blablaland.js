var bsplit = require('buffer-split');
var zlib = require('zlib');
var net = require('net');
var fs = require('fs');

var GlobalProperties = require("./bbl/GlobalProperties.js");
var variables = require("./maps/variables.js");
var SocketMessage = require("./client/SocketMessage");
var ByteArray = new require("./client/ByteArray.js");
var respawn = require("./maps/respawn.js");
var montureColor = require("./bbl/monture.js");
var mapData = require("./maps/maps.js");
var rawdata = fs.readFileSync('config.json');
var config = JSON.parse(rawdata);
let conf = {};
let ipBan = ["51.254.136.44"];

var powerInfo = {
    10002: [2, 3, 99999, 5, 5, new SocketMessage()], //TP
    10003: [2, 4, 0, 5, 5, new SocketMessage()], //Lingettes
    10004: [2, 5, 0, 5, 5, new SocketMessage()], //Bobombes
    10005: [2, 6, 0, 5, 5, new SocketMessage()], //Coeurs
    10006: [2, 26, 0, 5, 5, new SocketMessage()], //CoeursOR
    10007: [2, 7, 0, 5, 5, new SocketMessage()], //Parachutes
    10008: [2, 8, 0, 5, 5, new SocketMessage()], //Shields
    10009: [2, 9, 0, 5, 5, new SocketMessage()], //BliblisCopter
    10010: [2, 10, 0, 5, 5, new SocketMessage()], //Seismes
    10011: [2, 11, 0, 5, 5, new SocketMessage()], //JetPack

    10012: [3, 12, 0, 5, 5, new SocketMessage()], //Laser
    10013: [3, 13, 0, 5, 5, new SocketMessage()], //Prout y la la pas tres mature
    10014: [3, 14, 0, 5, 5, new SocketMessage()], //PopoSpeed
    10015: [3, 15, 0, 5, 5, new SocketMessage()], //PopoJump
    10016: [3, 16, 0, 5, 5, new SocketMessage()], //PopoSwim
    10017: [3, 17, 0, 5, 5, new SocketMessage()], //PopoSmall
    10018: [3, 18, 0, 5, 5, new SocketMessage()], //PopoColor
    10019: [3, 19, 0, 5, 5, new SocketMessage()], //MoonWalk
    10021: [3, 21, 0, 5, 5, new SocketMessage()], //Corps Astral 

    10020: [5, 20, 0, 5, 5, new SocketMessage()], //PopoFantome
    10020: [5, 20, 0, 5, 5, new SocketMessage()], //Bobombes Halloween
    10034: [5, 34, 0, 5, 5, new SocketMessage()], //FeuArtifice

    10023: [8, 23, 0, 5, 5, new SocketMessage()], //lampion
    10024: [8, 24, 0, 5, 5, new SocketMessage()], //lampion
    10039: [8, 39, 0, 5, 5, new SocketMessage()], //lampion
    10040: [8, 40, 0, 5, 5, new SocketMessage()], //lampion
    10076: [8, 76, 0, 5, 5, new SocketMessage()], //lampion
    10227: [8, 227, 0, 5, 5, new SocketMessage()], //lampion

    10032: [8, 32, 0, 5, 5, new SocketMessage()], //BlackHole
    10025: [9, 25, 0, 5, 5, new SocketMessage()], //OndeDechoc
    10035: [9, 35, 0, 5, 5, new SocketMessage()], //Buggy Turno
    10094: [9, 94, 0, 5, 5, new SocketMessage()], //RC Tank
   
    //Fury Weapons
 /*  10100: [13, 0, 0, 5, 5, new SocketMessage()],//GunLaserMap
    10101: [13, 1, 0, 5, 5, new SocketMessage()],//gunMissileMap
    10102: [13, 2, 0, 5, 5, new SocketMessage()],//GunBigLaserMap
    10103: [13, 3, 0, 5, 5, new SocketMessage()],//gunRedemerMap
    10104: [13, 4, 0, 5, 5, new SocketMessage()],//GunToyMap
    10105: [13, 5, 0, 5, 5, new SocketMessage()],//GunC4Map
    10106: [13, 6, 0, 5, 5, new SocketMessage()],//GunPewMap
    10107: [13, 7, 0, 5, 5, new SocketMessage()],//GunFlemmeMap
    10108: [13, 8, 0, 5, 5, new SocketMessage()],//GunCitrouilleMap
    10109: [13, 9, 0, 5, 5, new SocketMessage()],//GunThunderMap
    10110: [13, 10, 0, 5, 5, new SocketMessage()],//GunFreezeMap
    10200: [13, 200, 0, 5, 5, new SocketMessage()],//FlemmeMap8*/

    10042: [14, 42, 0, 5, 5, new SocketMessage()], //overboard
    10043: [14, 43, 0, 5, 5, new SocketMessage()], //overboard 2
    10047: [14, 47, 0, 5, 5, new SocketMessage()], //
    10059: [14, 59, 0, 5, 5, new SocketMessage()], //
    10060: [14, 60, 0, 5, 5, new SocketMessage()], //
    10105: [14, 105, 0, 5, 5, new SocketMessage()], //
    10106: [14, 106, 0, 5, 5, new SocketMessage()], //
    10107: [14, 107, 0, 5, 5, new SocketMessage()], //
    10108: [14, 108, 0, 5, 5, new SocketMessage()],

    10112: [16, 112, 0, 5, 5, new SocketMessage()],

    10078: [18, 78, 0, 5, 5, new SocketMessage()],//Table SV
    10081: [18, 81, 0, 5, 5, new SocketMessage()],//Girafe Bowee
    10083: [18, 83, 0, 5, 5, new SocketMessage()],//Donut
    10084: [18, 84, 0, 5, 5, new SocketMessage()],//Military
    10087: [18, 87, 0, 5, 5, new SocketMessage()],//Kawaii
    10099: [18, 99, 0, 5, 5, new SocketMessage()],//Pirate
    10082: [18, 82, 0, 5, 5, new SocketMessage()],//Fake Gift
    10085: [18, 85, 0, 5, 5, new SocketMessage()],//Bulle
    10086: [18, 86, 0, 5, 5, new SocketMessage()],//Aqua Jets
    10088: [18, 88, 0, 5, 5, new SocketMessage()],//Classic Umbrella
    10090: [18, 90, 0, 5, 5, new SocketMessage()],//Kawaii
    10091: [18, 91, 0, 5, 5, new SocketMessage()],//Dentelle
    10089: [18, 89, 0, 5, 5, new SocketMessage()],//Bannana

    //10092: [19, 92, 0, 5, 5, new SocketMessage()],//Canon
    10093: [19, 93, 0, 5, 5, new SocketMessage()],//???

    10110: [20, 110, 0, 5, 5, new SocketMessage()],
    10116: [20, 116, 0, 5, 5, new SocketMessage()], //PopoFantome
    10113: [20, 113, 0, 5, 5, new SocketMessage()],

    10123: [21, 123, 0, 5, 5, new SocketMessage()],
    10124: [21, 124, 0, 5, 5, new SocketMessage()],//Bat Balloon
    10125: [21, 125, 0, 5, 5, new SocketMessage()],
    10126: [21, 126, 0, 5, 5, new SocketMessage()],
    10131: [21, 131, 0, 5, 5, new SocketMessage()],
    10133: [22, 133, 0, 5, 5, new SocketMessage()],
    10134: [22, 134, 0, 5, 5, new SocketMessage()],
    10135: [22, 135, 0, 5, 5, new SocketMessage()], //Stars Balloon
    10136: [22, 136, 0, 5, 5, new SocketMessage()],
    10137: [22, 137, 0, 5, 5, new SocketMessage()],
    10138: [22, 138, 0, 5, 5, new SocketMessage()],
    10139: [22, 139, 0, 5, 5, new SocketMessage()],

    10156: [23, 156, 0, 5, 5, new SocketMessage()],//Heart bomb

    

    10146: [23, 146, 0, 5, 5, new SocketMessage()], //Lampiotte Panda
    10147: [23, 147, 0, 5, 5, new SocketMessage()], //Cerf volant chinois
    10159: [23, 159, 0, 5, 5, new SocketMessage()], //Heart Balloon


    

    10235: [25, 235, 0, 5, 5, new SocketMessage()], //N400 Doudou
    10236: [25, 236, 0, 5, 5, new SocketMessage()], //N400 Mask 
    10237: [25, 237, 0, 5, 5, new SocketMessage()], //N400 Balloon  
    10238: [25, 238, 0, 5, 5, new SocketMessage()], //N400 Blade
    10313: [25, 313, 0, 5, 5, new SocketMessage()], //Paladin Hammer
    10314: [25, 314, 0, 5, 5, new SocketMessage()], //Dongeon Hat
    10315: [25, 315, 0, 5, 5, new SocketMessage()], //Elfe doudou
    10316: [25, 316, 0, 5, 5, new SocketMessage()], //Dongeon Balloon 
    10243: [25, 243, 0, 5, 5, new SocketMessage()], //Aniv flag 
    10244: [25, 244, 0, 5, 5, new SocketMessage()], //N400 Flag
    10318: [25, 318, 0, 5, 5, new SocketMessage()], //Six Years Flag

    10162: [26, 162, 0, 5, 5, new SocketMessage()], //PopoPierre
    10163: [26, 163, 0, 5, 5, new SocketMessage()], //PopoEtoile
    10164: [26, 164, 0, 5, 5, new SocketMessage()], //PopoPlume
    10165: [26, 165, 0, 5, 5, new SocketMessage()], //PopoFoudre Need to fix this item IDKN why it isn't working, but i will look into it
    10166: [26, 166, 0, 5, 5, new SocketMessage()], //PopoBigPoop
    10370: [26, 370, 0, 5, 5, new SocketMessage()], //PopoGlace

    10169: [27, 169, 0, 5, 5, new SocketMessage()],//LampiotteAnnivIcon
    10187: [27, 187, 0, 5, 5, new SocketMessage()],//LampiottePyramideIcon
    10213: [27, 213, 0, 5, 5, new SocketMessage()],//Skate
    10170: [27, 170, 0, 5, 5, new SocketMessage()],//Birthday Balloon
    10173: [27, 173, 0, 5, 5, new SocketMessage()],//Herborist bag

    10209: [28, 209, 0, 5, 5, new SocketMessage()], //DoudouVaudouIcon
    10180: [28, 180, 0, 5, 5, new SocketMessage()], //overboardtiger
    10181: [28, 181, 0, 5, 5, new SocketMessage()], //overboeardtiger 2 
    10208: [28, 208, 0, 5, 5, new SocketMessage()], //TransfoChauveSourisIcon [Fix reload this.user.skinid]
    10214: [28, 214, 0, 5, 5, new SocketMessage()], //TransfoPinguinIcon [Fix reload this.user.skinid]
    10217: [28, 217, 0, 5, 5, new SocketMessage()], //FortuneCookieIcon

    10182: [29, 182, 0, 5, 5, new SocketMessage()],// flowers
    10183: [29, 183, 0, 5, 5, new SocketMessage()],// flowers
    10184: [29, 184, 0, 5, 5, new SocketMessage()],// flowers
   // 10332: [48, 332, 0, 5, 5, new SocketMessage()], //Coconut seeds FLEUR_332
   // 10287: [42, 287, 0, 5, 5, new SocketMessage()], //Bambou sapling BAMBOU 269
   // 10269: [39, 269, 0, 5, 5, new SocketMessage()], //Carnivourous seeds FLEUR_CARNIVORE 269
   
    10195: [30, 195, 0, 5, 5, new SocketMessage()],
    10199: [30, 199, 0, 5, 5, new SocketMessage()],

    10203: [32, 203, 0, 5, 5, new SocketMessage()],//AlcoholLepre
    10204: [32, 204, 0, 5, 5, new SocketMessage()],//AlcoholTrefles
    10205: [32, 205, 0, 5, 5, new SocketMessage()],//AlcoholLutin

    10215: [34, 215, 0, 5, 5, new SocketMessage()],
    10216: [34, 216, 0, 5, 5, new SocketMessage()],
    10218: [34, 218, 0, 5, 5, new SocketMessage()],
    10219: [34, 219, 0, 5, 5, new SocketMessage()],
    10220: [34, 220, 0, 5, 5, new SocketMessage()],
    10221: [34, 221, 0, 5, 5, new SocketMessage()],
    10222: [34, 222, 0, 5, 5, new SocketMessage()], //Pancakes :DDD

    10262: [35, 262, 0, 5, 5, new SocketMessage()], //Tambour 
    10234: [35, 234, 0, 5, 5, new SocketMessage()], //Pirate flag
    10232: [35, 232, 0, 5, 5, new SocketMessage()], //Shovel

    10259: [37, 259, 0, 5, 5, new SocketMessage()], //Minoria Flag
    //10245: [37, 345, 0, 5, 5, new SocketMessage()], //PickAxe
    10251: [37, 251, 0, 5, 5, new SocketMessage()], //PickAxe Bag
    10255: [37, 255, 0, 5, 5, new SocketMessage()], //PickAxe Cube


    10264: [38, 264, 0, 5, 5, new SocketMessage()],
    10279: [39, 279, 0, 5, 5, new SocketMessage()],//ArtBook
    10277: [39, 277, 0, 5, 5, new SocketMessage()],//DrapeauChariot
  
    10295: [43, 295, 0, 5, 5, new SocketMessage()],
    10296: [43, 296, 0, 5, 5, new SocketMessage()],
    10299: [43, 299, 0, 5, 5, new SocketMessage()],

    10303: [46, 303, 0, 5, 5, new SocketMessage()],

    10326: [48, 326, 0, 5, 5, new SocketMessage()],//HuileMonoi

    10356: [49, 356, 0, 5, 5, new SocketMessage()], //CandyVampire
    10357: [49, 357, 0, 5, 5, new SocketMessage()], //CandyNasty
    10358: [49, 358, 0, 5, 5, new SocketMessage()], //CandyPumpkin
    10359: [49, 359, 0, 5, 5, new SocketMessage()], //CandyExplosion
    10360: [49, 360, 0, 5, 5, new SocketMessage()], //CandyDeath
    
    10371: [51, 371, 0, 5, 5, new SocketMessage()], //HotCoco I NEED IT 
    10368: [51, 368, 0, 5, 5, new SocketMessage()], //BallonSaturne
   
    10378: [53, 378, 0, 5, 5, new SocketMessage()],//END FLAG
    10377: [53, 377, 0, 5, 5, new SocketMessage()], //NYAN CATTO
   
    10403: [61, 403, 0, 5, 5, new SocketMessage()], //  BFE
    10402: [61, 402, 0, 5, 5, new SocketMessage()], //  BFE
    10401: [61, 401, 0, 5, 5, new SocketMessage()], //  BFE
   
    10405: [60, 378, 0, 5, 5, new SocketMessage()], //  BFEMUSIC

    //10102: [19, 102, 0, 5, 5, new SocketMessage()],

    10297: [44, 297, 0, 5, 5, new SocketMessage()],
    10298: [44, 298, 0, 5, 5, new SocketMessage()],
    10322: [47, 322, 0, 5, 5, new SocketMessage()],
    10323: [47, 323, 0, 5, 5, new SocketMessage()],
    10324: [47, 324, 0, 5, 5, new SocketMessage()],
    10325: [47, 325, 0, 5, 5, new SocketMessage()],
    10330: [47, 330, 0, 5, 5, new SocketMessage()],
    10331: [47, 331, 0, 5, 5, new SocketMessage()],
    10340: [48, 340, 0, 5, 5, new SocketMessage()],//Tonneaux
    10374: [51, 374, 0, 5, 5, new SocketMessage()],

    10351: [49, 351, 0, 5, 5, new SocketMessage()], 

    10352: [49, 352, 0, 5, 5, new SocketMessage()],

    10353: [49, 353, 0, 5, 5, new SocketMessage()],

    10354: [49, 354, 0, 5, 5, new SocketMessage()],

    10355: [49, 355, 0, 5, 5, new SocketMessage()],



    9212: [33, 212, 0, 5, 4, new SocketMessage()],//CHALET 
    9224: [33, 224, 0, 5, 4, new SocketMessage()],//IGLOO
    9228: [33, 228, 0, 5, 4, new SocketMessage()],//SECRET GARDEN
    9260: [33, 260, 0, 5, 4, new SocketMessage()],//TIPI
   // 9265: [33, 265, 0, 5, 4, new SocketMessage()],//VAN
    9281: [33, 281, 0, 5, 4, new SocketMessage()],//XMAS 
    9328: [33, 328, 0, 5, 4, new SocketMessage()],//BEACH
    9344: [33, 344, 0, 5, 4, new SocketMessage()],//MAGIC
    9373: [33, 373, 0, 5, 4, new SocketMessage()],//SNOWBALL
    9321: [33, 321, 0, 5, 4, new SocketMessage()],//SHACK
   // 9376: [33, 376, 0, 5, 4, new SocketMessage()],//NML HOUSE




   //BliBlis fx + 12 followed by bliblis id 
    21036: [9, 36, 0, 5, 2, new SocketMessage()], //Snow-Man
    21037: [9, 37, 0, 5, 2, new SocketMessage()], //Fairy
    21038: [9, 38, 0, 5, 2, new SocketMessage()], //UFO 
    21045: [9, 45, 0, 5, 2, new SocketMessage()], //Dragon
    21048: [9, 48, 0, 5, 2, new SocketMessage()], //Ghost
    21049: [9, 49, 0, 5, 2, new SocketMessage()], //Pumpkin
   // 21050: [9, 50, 0, 5, 2, new SocketMessage()], //Feux follet 
    21057: [9, 57, 0, 5, 2, new SocketMessage()], //Jetpack
    21058: [9, 58, 0, 5, 2, new SocketMessage()], //Robot
    21062: [9, 62, 0, 5, 2, new SocketMessage()], //Geiza
    21064: [9, 64, 0, 5, 2, new SocketMessage()], //Star

    28066: [16, 66, 0, 5, 2, new SocketMessage()], //Plane
    28068: [16, 68, 0, 5, 2, new SocketMessage()], //Snow Flake
   // 28070: [16, 70, 0, 5, 2, new SocketMessage()], //Snow Ball 
    28072: [16, 72, 0, 5, 2, new SocketMessage()], //kawaii 
    28077: [16, 77, 0, 5, 2, new SocketMessage()], //Love
    28097: [16, 97, 0, 5, 2, new SocketMessage()], //Dino
    28098: [16, 98, 0, 5, 2, new SocketMessage()], //Parrot 

    31101: [19, 101, 0, 5, 2, new SocketMessage()], //Bell
    31104: [19, 104, 0, 5, 2, new SocketMessage()], //Fireflies
    31115: [19, 115, 0, 5, 2, new SocketMessage()], //Japon
 
    32117: [20, 117, 0, 5, 2, new SocketMessage()], //N300 Stab
    32118: [20, 118, 0, 5, 2, new SocketMessage()], //N300 Shockwave
    32119: [20, 119, 0, 5, 2, new SocketMessage()], //Speed

    33122: [21, 122, 0, 5, 2, new SocketMessage()], //Katto
    33129: [21, 129, 0, 5, 2, new SocketMessage()], //garguoille 
    33130: [21, 130, 0, 5, 2, new SocketMessage()], //Howl

    34141: [22, 141, 0, 5, 2, new SocketMessage()], //Angel
    34143: [22, 143, 0, 5, 2, new SocketMessage()], //Santa

    35148: [23, 148, 0, 5, 2, new SocketMessage()], //Mask

    36161: [24, 161, 0, 5, 2, new SocketMessage()], //Commando Helicopter

    39168: [27, 168, 0, 5, 2, new SocketMessage()], //Pyramid 1 
    39188: [27, 188, 0, 5, 2, new SocketMessage()], //Pyramid 2 Pixels

    42193: [30, 193, 0, 5, 2, new SocketMessage()], //Submarine
    42200: [30, 200, 0, 5, 2, new SocketMessage()], //Bunny 1
    42201: [30, 201, 0, 5, 2, new SocketMessage()], //Bunny 2

    46206: [34, 206, 0, 5, 2, new SocketMessage()], //Butter-Fly
    46211: [34, 211, 0, 5, 2, new SocketMessage()], //Cohian
    

    50267: [38, 267, 0, 5, 2, new SocketMessage()], //Griffon

    51270: [39, 270, 0, 5, 2, new SocketMessage()], //Grigri
   // 51272: [39, 272, 0, 5, 2, new SocketMessage()], //Spectre
    //51273: [39, 273, 0, 5, 2, new SocketMessage()], //Spectre
   // 51274: [39, 274, 0, 5, 2, new SocketMessage()], //Spectre

    54284: [42, 284, 0, 5, 2, new SocketMessage()], //Snow Creature

    56343: [44, 343, 0, 5, 2, new SocketMessage()], //Squirel

    58304: [46, 304, 0, 5, 2, new SocketMessage()], //Donjon

    60329: [48, 329, 0, 5, 2, new SocketMessage()], //Toucan 
    65375: [53, 375, 0, 5, 2, new SocketMessage()], //Sheep 
    46230: [35, 230, 0, 5, 2, new SocketMessage()], //Falcon





    11545: [8, 186, 0, 5, 1, new SocketMessage()],
    11287: [9, 46, 0, 5, 1, new SocketMessage()],
    11300: [9, 51, 0, 5, 1, new SocketMessage()],
    11304: [9, 52, 0, 5, 1, new SocketMessage()],
    11307: [9, 55, 0, 5, 1, new SocketMessage()],
    11308: [9, 56, 0, 5, 1, new SocketMessage()],
    11312: [9, 61, 0, 5, 1, new SocketMessage()],
    11341: [16, 67, 0, 5, 1, new SocketMessage()],
    11345: [16, 71, 0, 5, 1, new SocketMessage()],
    11351: [16, 73, 0, 5, 1, new SocketMessage()],
    11352: [16, 75, 0, 5, 1, new SocketMessage()],
    11358: [16, 95, 0, 5, 1, new SocketMessage()],
    11359: [16, 96, 0, 5, 1, new SocketMessage()],
    11368: [19, 100, 0, 5, 1, new SocketMessage()],
    11272: [19, 114, 0, 5, 1, new SocketMessage()],
    11412: [20, 120, 0, 5, 1, new SocketMessage()],
    11413: [20, 121, 0, 5, 1, new SocketMessage()],
    11422: [21, 127, 0, 5, 1, new SocketMessage()],
    11423: [21, 128, 0, 5, 1, new SocketMessage()],
    11459: [22, 142, 0, 5, 1, new SocketMessage()],
    11461: [22, 144, 0, 5, 1, new SocketMessage()],
    11475: [23, 149, 0, 5, 1, new SocketMessage()],
    11482: [23, 151, 0, 5, 1, new SocketMessage()], //Bunny trefle 
    11486: [23, 154, 0, 5, 1, new SocketMessage()],
    11476: [24, 150, 0, 5, 1, new SocketMessage()],
    11477: [24, 153, 0, 5, 1, new SocketMessage()],
    11492: [24, 160, 0, 5, 1, new SocketMessage()],
    11514: [24, 171, 0, 5, 1, new SocketMessage()],
    11515: [24, 172, 0, 5, 1, new SocketMessage()],
    11541: [24, 185, 0, 5, 1, new SocketMessage()],
    11508: [27, 167, 0, 5, 1, new SocketMessage()],
    11542: [28, 189, 0, 5, 1, new SocketMessage()],
    11537: [28, 191, 0, 5, 1, new SocketMessage()],
    11573: [28, 226, 0, 5, 1, new SocketMessage()],
    11572: [29, 225, 0, 5, 1, new SocketMessage()],
    11551: [30, 192, 0, 5, 1, new SocketMessage()],
    11559: [30, 197, 0, 5, 1, new SocketMessage()],
    11560: [30, 198, 0, 5, 1, new SocketMessage()],
    11433: [30, 132, 0, 5, 1, new SocketMessage()],
    11434: [34, 207, 0, 5, 1, new SocketMessage()],
    11435: [34, 210, 0, 5, 1, new SocketMessage()],
    11581: [35, 229, 0, 5, 1, new SocketMessage()],
    11584: [37, 254, 0, 5, 1, new SocketMessage()],
    11585: [37, 256, 0, 5, 1, new SocketMessage()],
    11586: [37, 257, 0, 5, 1, new SocketMessage()],
    11587: [37, 258, 0, 5, 1, new SocketMessage()],
    11600: [38, 266, 0, 5, 1, new SocketMessage()],
    11611: [42, 282, 0, 5, 1, new SocketMessage()],
    11614: [42, 285, 0, 5, 1, new SocketMessage()],
    11617: [42, 286, 0, 5, 1, new SocketMessage()],
    11620: [42, 293, 0, 5, 1, new SocketMessage()],
    11626: [43, 302, 0, 5, 1, new SocketMessage()],
    11638: [44, 319, 0, 5, 1, new SocketMessage()],
    11644: [44, 320, 0, 5, 1, new SocketMessage()],
    11649: [48, 327, 0, 5, 1, new SocketMessage()],
    11658: [48, 341, 0, 5, 1, new SocketMessage()],
    11540: [49, 366, 0, 5, 1, new SocketMessage()],
    11678: [49, 367, 0, 5, 1, new SocketMessage()],
    11682: [51, 369, 0, 5, 1, new SocketMessage()],
};

Number.prototype.between = function(a, b) {
    var min = Math.min(a, b),
      max = Math.max(a, b);
  
    return this > min && this < max;
} 
function modulo(a, b) {
    return a - Math.floor(a / b) * b;
}

function ToUint32(x) {
    return modulo(parseInt(x), Math.pow(2, 32));
}
class Camera {
    constructor(id, mapId) {
        this.id = id;
        this.mapId = mapId;
    }
    setMapId(id) {
        this.mapId = id;
    }
    getMapId() {
        return this.mapId;
    }
}
class CameraManager extends Array {
    constructor() {
        super();
        this.count = 0;
    }
    update() {
        this.count++;
    }
    getCameraByMap(mapId) {
        let res = [];
        for (var i = 0; i < this.length; i++) {
            if (this[i].mapId == mapId) {
                res.push(this[i].id);
            }
        }
        return res;
    }
    setMapId(id, map) {
        for (var i = 0; i < this.length; i++) {
            if (this[i].id == id) {
                this[i].setMapId(map);
            }
        }
    }
    hasCameraHere(id, mapId) {
        for (var i = 0; i < this.length; i++) {
            if (this[i].id != id && this[i].mapId == mapId) {
                return 1;
            }
        }
        return 0;
    }
    clear() {
        this.splice(0, this.length);
    }
}
class BblCamera {
    constructor() {
        this.mapId = 9;
        this.cameraId = new Camera(1, this.mapId);
        this.cameraList = new CameraManager();
        this.cameraList.selected = this.cameraId.id;
        this.cameraList.push(this.cameraId);
        this.serverId = 1;
        this.methodeId = 3;
        this.mapLoaded = false;
        this.mort = false;
        this.allowChat = false;
        this.transportToPlanete = 0;
        this.data = {};
        this.isConsole = false;
        this.ip = 0;
        this.securityMod = false;
    }
    getUserByUid(uid) {
        for (var i in this.server.userList) {
            if (this.server.userList[i].uid == uid) return this.server.userList[i];
        }
        return null;
    }
    getUserByPid(pid) {
        for (var i in this.server.userList) {
            if (this.server.userList[i].pid == pid) return this.server.userList[i];
        }
        return null;
    }
    getUserObjectByUID(param1) {
        let test = this.server.database('SELECT * from users WHERE id = ?', [param1] );
        if (test.length > 0) return test[0];
        return null;
    }
    getUserByPseudo(pseudo) {
        for (var i in this.server.userList) {
            if (this.server.userList[i].pseudo.toUpperCase() == pseudo.toUpperCase() && !this.server.userList[i].isConsole) return this.server.userList[i];
        }
        return null;
    }
    earthQuake(amplitude, duration) {
        let data = {
                id: 4,
                sid: 0,
                active: true,
                map: true,
                amplitude: amplitude,
                duration: duration,
                close: 1
            },
            id = this.writeMapFXChange(data);
        setTimeout(function() {
            this.map.maps[this.mapId].delete(id);
        }.bind(this), 1000 * duration);
    }
    getChannel(id) {
        let p = new SocketMessage(1, 16);
        p.bitWriteUnsignedInt(GlobalProperties.BIT_CHANNEL_ID, id);
        return p;
    }
    setPotion(name, id, time) {
        if (!this.data[name]) {
            this.data[name] = true;
            let p = new SocketMessage(),
                objectId = id + 10000;
            p.bitWriteUnsignedInt(8, 60);
            let data = {
                loc17: true,
                id: 6,
                sid: objectId,
                active: true,
                data: [3, id, p],
                map: true
            };
            let fx_save = this.writeUserFXChange(objectId, data);
            fx_save.push(0);
            this.fxUser[objectId] = fx_save;
            setTimeout(function() {
                data.active = false;
                this.writeUserFXChange(objectId, data);
                delete this.fxUser[objectId];
                this.data[name] = null;
            }.bind(this), time * 1000);
        }
    }
    setPotion2(name, id, time) {
        if (!this.data[name]) {
            this.data[name] = true;
            let p = new SocketMessage(),
                objectId = id + 10000;
            p.bitWriteUnsignedInt(8, 60);
            let data = {
                loc17: true,
                id: 6,
                sid: objectId,
                active: true,
                data: [26, id, p],
                map: true
            };
            let fx_save = this.writeUserFXChange(objectId, data);
            fx_save.push(0);
            this.fxUser[objectId] = fx_save;
            setTimeout(function() {
                data.active = false;
                this.writeUserFXChange(objectId, data);
                delete this.fxUser[objectId];
                this.data[name] = null;
            }.bind(this), time * 1000);
        }
    }
    setPotionBigpoop(name, id, time) {
        if (!this.data[name]) {
            this.data[name] = true;
            let p = new SocketMessage(),
                objectId = id + 10000;
            p.bitWriteUnsignedInt(8, 60);
            let data = {
                loc17: true,
                id: 6,
                sid: objectId,
                active: true,
                data: [26, id, p],
                map: true
            };
            let fx_save = this.writeUserFXChange(objectId, data);
            fx_save.push(0);
            this.fxUser[objectId] = fx_save;
            if (this.mainUser.skinId != 336) {
                let oldId = this.mainUser.skinId; 
                this.reloadSkin(336);
                let p = new SocketMessage();
                p.bitWriteBoolean(true);
                p.bitWriteUnsignedInt(6, 13);
                p.bitWriteSignedInt(9, 80);
                p.bitWriteBoolean(false);
                this.fxUser[18251] = this.writeUserFXChange(18250, {
                    loc17: true,
                    id: 4,
                    sid: 16,
                    active: true,
                    data: p,
                    map: true
                });
                setTimeout(function() {
                    let p = new SocketMessage();
                    p.bitWriteBoolean(true);
                    p.bitWriteUnsignedInt(6, 13);
                    p.bitWriteSignedInt(9, 0);
                    p.bitWriteBoolean(false);
                    this.fxUser[18251] = this.writeUserFXChange(18250, {
                        loc17: true,
                        id: 4,
                        sid: 16,
                        active: true,
                        data: p,
                        map: true
                    });
                    this.reloadSkin(oldId);
                }.bind(this), time * 1000);
            }
            setTimeout(function() {
                data.active = false;
                this.writeUserFXChange(objectId, data);
                delete this.fxUser[objectId];
                this.data[name] = null;
            }.bind(this), time * 1000);
        }
    }
    setPotionFantome(name, id, time) {
        if (!this.data[name]) {
            this.data[name] = true;
            let p = new SocketMessage(),
                objectId = id + 10000;
            p.bitWriteUnsignedInt(8, 60);
            let data = {
                loc17: true,
                id: 6,
                sid: objectId,
                active: true,
                data: [20, id, p],
                map: true
            };
            let fx_save = this.writeUserFXChange(objectId, data);
            fx_save.push(0);
            this.fxUser[objectId] = fx_save;
            if (this.mainUser.skinId != 405) {
                let oldId = this.mainUser.skinId;
                this.reloadSkin(405);
                setTimeout(function() {
                    this.reloadSkin(oldId);
                }.bind(this), time * 1000);
            }
            setTimeout(function() {
                data.active = false;
                this.writeUserFXChange(objectId, data);
                delete this.fxUser[objectId];
                this.data[name] = null;
            }.bind(this), time * 1000);
        }
    }
    Setbonbon(name, id, time) {
        if (!this.data[name]) {
            this.data[name] = true;
            let p = new SocketMessage(),
                objectId = id + 10000;
            p.bitWriteUnsignedInt(8, 60);
            let data = {
                loc17: true,
                id: 6,
                sid: objectId,
                active: true,
                data: [49, id, p],
                map: true
            };
            let fx_save = this.writeUserFXChange(objectId, data);
            fx_save.push(0);
            this.fxUser[objectId] = fx_save;
            setTimeout(function() {
                data.active = false;
                this.writeUserFXChange(objectId, data);
                delete this.fxUser[objectId];
                this.data[name] = null;
            }.bind(this), time * 1000);
        }
    }
    SetHotcoco(name, id, time) {
        if (!this.data[name]) {
            this.data[name] = true;
            let p = new SocketMessage(),
                objectId = id + 10000;
            p.bitWriteUnsignedInt(8, 60);
            let data = {
                loc17: true,
                id: 6,
                sid: objectId,
                active: true,
                data: [51, id, p],
                map: true
            };
            let fx_save = this.writeUserFXChange(objectId, data);
            fx_save.push(0);
            this.fxUser[objectId] = fx_save;
            setTimeout(function() {
                data.active = false;
                this.writeUserFXChange(objectId, data);
                delete this.fxUser[objectId];
                this.data[name] = null;
            }.bind(this), time * 1000);
        }
    }
    SetYummiesPancakes(name, id, time) {
        if (!this.data[name]) {
            this.data[name] = true;
            let p = new SocketMessage(),
                objectId = id + 10000;
            p.bitWriteUnsignedInt(8, 60);
            let data = {
                loc17: true,
                id: 6,
                sid: objectId,
                active: true,
                data: [34, id, p],
                map: true
            };
            let fx_save = this.writeUserFXChange(objectId, data);
            fx_save.push(0);
            this.fxUser[objectId] = fx_save;
            setTimeout(function() {
                data.active = false;
                this.writeUserFXChange(objectId, data);
                delete this.fxUser[objectId];
                this.data[name] = null;
            }.bind(this), time * 1000);
        }
    }
    SetAlcohol(name, id, time) {
        if (!this.data[name]) {
            this.data[name] = true;
            let p = new SocketMessage(),
                objectId = id + 10000;
            p.bitWriteUnsignedInt(8, 60);
            let data = {
                loc17: true,
                id: 6,
                sid: objectId,
                active: true,
                data: [32, id, p],
                map: true
            };
            let fx_save = this.writeUserFXChange(objectId, data);
            fx_save.push(0);
            this.fxUser[objectId] = fx_save;
            setTimeout(function() {
                data.active = false;
                this.writeUserFXChange(objectId, data);
                delete this.fxUser[objectId];
                this.data[name] = null;
            }.bind(this), time * 1000);
        }
    }
    SetTransformation(name, id, time, skin) {
         if (!this.data[name]) {
            this.data[name] = true;
            let p = new SocketMessage(),
                objectId = id + 10000;
            p.bitWriteUnsignedInt(8, 60);
            let data = {
                loc17: true,
                id: 6,
                sid: objectId,
                active: true,
                data: [28, id, p],
                map: true
            };
            let fx_save = this.writeUserFXChange(objectId, data);
            fx_save.push(0);
            this.fxUser[objectId] = fx_save;
            if (this.mainUser.skinId != skin) {
                let oldId = this.mainUser.skinId;
                this.reloadSkin(skin);
                setTimeout(function() {
                    this.reloadSkin(oldId);
                }.bind(this), time * 1000);
            }
            setTimeout(function() {
                data.active = false;
                this.writeUserFXChange(objectId, data);
                delete this.fxUser[objectId];
                this.data[name] = null;
            }.bind(this), time * 1000);
        }
    }
    SetTransformationCATTO(name, id, time, skin) {
        if (!this.data[name]) {
           this.data[name] = true;
           let p = new SocketMessage(),
               objectId = id + 10000;
           p.bitWriteUnsignedInt(8, 60);
           let data = {
               loc17: true,
               id: 6,
               sid: objectId,
               active: true,
               data: [53, id, p],
               map: true
           };
           let fx_save = this.writeUserFXChange(objectId, data);
           fx_save.push(0);
           this.fxUser[objectId] = fx_save;
           if (this.mainUser.skinId != skin) {
               let oldId = this.mainUser.skinId;
               this.reloadSkin(skin);
               setTimeout(function() {
                   this.reloadSkin(oldId);
               }.bind(this), time * 1000);
           }
           setTimeout(function() {
               data.active = false;
               this.writeUserFXChange(objectId, data);
               delete this.fxUser[objectId];
               this.data[name] = null;
           }.bind(this), time * 1000);
       }
   }
    SetFortuneCookies(name, id, time) {
        if (!this.data[name]) {
            this.data[name] = true;
            let p = new SocketMessage(),
                objectId = id + 10000;
            p.bitWriteUnsignedInt(8, 60);
            let data = {
                loc17: true,
                id: 6,
                sid: objectId,
                active: true,
                data: [28, id, p],
                map: true
            };
            let fx_save = this.writeUserFXChange(objectId, data);
            fx_save.push(0);
            this.fxUser[objectId] = fx_save;
            setTimeout(function() {
                data.active = false;
                this.writeUserFXChange(objectId, data);
                delete this.fxUser[objectId];
                this.data[name] = null;
            }.bind(this), time * 1000);
        }
    }
    userSmileyEvent(param1) {
        for (var i = 3; i < 20; i++) {
            param1.bitWriteBoolean(true);
            param1.bitWriteUnsignedInt(8, 0);
            param1.bitWriteUnsignedInt(GlobalProperties.BIT_SMILEY_PACK_ID, i);
        }
        param1.bitWriteBoolean(false);
    }
    userObjectEvent(packet, data) {
        packet.bitWriteBoolean(true);
        packet.bitWriteUnsignedInt(8, data.type);
        if (data.type == 0) {
            packet.bitWriteUnsignedInt(32, data.id);
            packet.bitWriteUnsignedInt(GlobalProperties.BIT_FX_ID, data.fxFileId);
            packet.bitWriteUnsignedInt(GlobalProperties.BIT_FX_SID, data.objectId);
            packet.bitWriteUnsignedInt(32, data.count);
            packet.bitWriteUnsignedInt(32, data.expire);
            packet.bitWriteUnsignedInt(3, data.visibility);
            packet.bitWriteUnsignedInt(5, data.genre);
            packet.bitWriteBinaryData(data.data);
        } else if (data.type == 1) {
            packet.bitWriteUnsignedInt(32, data.id);
            packet.bitWriteUnsignedInt(32, data.count);
            packet.bitWriteUnsignedInt(32, data.expire);
            packet.bitWriteBinaryData(data.data);
        }
        return packet;
    }
    teleportToMap(camera_id, map_id, server_id, methode_id, opts = {}) {
        var errorId = map_id == this.mapId ? 1 : 0;
        if (!this.mapLoaded) return;
        if (!(map_id in this.server.variable.maps) || (map_id == 355 && !this.transportToPlanete)) {
            this.parsedEventMessage(1, 10, new SocketMessage());
            return;
        }
        if (this.map_id == 10 && !opts.ALL) {
           this.sendMsg("Tu ne peux pas t'échapper de la prison comme ça!");
          return;
        }
        if ((this.server.variable.maps[map_id][8] != this.server.variable.maps[this.mapId][8]) && !this.transportToPlanete) {
            this.sendMsg("Impossible de se téléporter vers une autre planete !!");
            return;
        }
        if (!errorId) {
            this.mapLoaded = false;
            this.methodeId = methode_id;
            this.map.leaveMap(this.mapId, this);
            if (methode_id >= 2) {
                if (map_id in respawn) {
                    this.mainUser.position.x = respawn[map_id][0];
                    this.mainUser.position.y = respawn[map_id][1];
                }
                this.mainUser.underWater = false;
                this.mainUser.grimpe = false;
                this.mainUser.accroche = false;
                this.mainUser.speed.x = 0;
                this.mainUser.speed.y = 0;

            }
        }
        var packet = new SocketMessage(3, 5); //setmap
        packet.bitWriteUnsignedInt(GlobalProperties.BIT_CAMERA_ID, camera_id);
        packet.bitWriteUnsignedInt(GlobalProperties.BIT_MAP_ID, map_id);
        packet.bitWriteUnsignedInt(GlobalProperties.BIT_SERVER_ID, 0);
        packet.bitWriteUnsignedInt(GlobalProperties.BIT_MAP_FILEID, map_id);
        packet.bitWriteUnsignedInt(GlobalProperties.BIT_METHODE_ID, methode_id);
        packet.bitWriteUnsignedInt(GlobalProperties.BIT_ERROR_ID, errorId);
        this.send(packet);
    }
    getParadisMap() {
        return [55, 446, 264, 251, 252, 253, 254, 255, 256];
    }
    getManoirMap() {
        return [491, 492, 493, 494, 495, 496];
    }
    getDonjonMap() {
        return [499,];
    }
    getPyramiderMap() {
        return [448, 449, 450, 451, 452, 453, 454,];
    }
    reloadSkin(id) {
        this.clearSkin();
        this.mainUser.skinId = id;
        this.reloadPlayerState(0, 0);
    }
    clearSkin() {
        if (this.data.ISDIE) return;
        if (this.data.MONTURE) {
            let packet = new SocketMessage();
            packet.bitWriteUnsignedInt(32, this.data.MONTURE[1]);
            packet.bitWriteBoolean(true);
            let packet2 = new SocketMessage();
            packet2.bitWriteUnsignedInt(2, 1);
            packet2.bitWriteUnsignedInt(5, 1);
            packet.bitWriteBinaryData(packet2);
            this.parsedEventMessage(6, 8, packet)
        }
    }
    die(msg = "", methode = 7) { //Patch here
       // if (!user.uid) { return; } 
        if (this.mapId == 10) {
           return;
       }
        if ([448, 449, 450, 451, 452, 453, 454, ].includes(this.mapId)) { 
            if (this.data.PYRAMIDE) this.mainUser.skinId = this.data.PYRAMIDE[0];
            this.teleportToMap(1, 447, this.serverId, 12);
            delete this.data.PYRAMIDE;
            return;
        }
        if (this.getManoirMap().includes(this.mapId)) {
            delete this.data.MANOIR;
            this.clearSkin();
            this.teleportToMap(1, 490, this.serverId, 13);
            return;
        }
        if (!(this.getParadisMap().includes(this.mapId))) {
            this.data.LAST_MAP = this.mapId;
            if (this.data.MONTURE) {
                let packet = new SocketMessage();
                packet.bitWriteUnsignedInt(32, this.data.MONTURE[1]);
                packet.bitWriteBoolean(true);
                let packet2 = new SocketMessage();
                packet2.bitWriteUnsignedInt(2, 1);
                packet2.bitWriteUnsignedInt(5, 1);
                packet.bitWriteBinaryData(packet2);
                this.parsedEventMessage(6, 8, packet)
            }
            this.data.ISDIE = true;
            if (this.mainUser.skinId != 405 ) {   
                //&& user.uid
                const old = this.mainUser.skinId;
                this.mainUser.skinId = 405;
                setTimeout(function() {
                    this.data.ISDIE = false;
                    this.mainUser.skinId = old;
                    this.reloadPlayerState(0, 0);
                }.bind(this), 10000);
            }
            let map = this.map.maps[this.mapId];
            let p2 = new SocketMessage();
            p2.bitWriteSignedInt(17, this.mainUser.position.x / 100);
            p2.bitWriteSignedInt(17, this.mainUser.position.y / 100);
            p2.bitWriteUnsignedInt(8, this.mainUser.surfaceBody);
            p2.bitWriteString(this.pseudo);
            let data = {
                    id: 1,
                    sid: map.objectPid,
                    active: true,
                    data: p2,
                    map: true,
                    close: 1
                },
                id = this.writeMapFXChange(data);
            this.sendMsg(msg != "" ? this.pseudo + msg : `Que le blablateur ${this.pseudo} repose en paix.`, { ALL: true });
            this.mort = true;
            var mapId = 253;
            if (this.server.variable.maps[this.mapId].length > 9) mapId = this.server.variable.maps[this.mapId][9];
            let camera = this.cameraList.getCameraByMap(this.mapId);
            for (var i in camera) this.teleportToMap(camera[i], mapId, this.serverId, methode);
            let p = new SocketMessage();
            this.writeUserFXChange(1, {
                loc17: true,
                id: 6,
                sid: 1,
                active: true,
                data: [8, 1, p],
                map: false
            });
            setTimeout(function() {
                this.writeUserFXChange(1, {
                    loc17: true,
                    id: 6,
                    sid: 1,
                    active: false,
                    data: [8, 1, p],
                    map: false
                });
                map.delete(id);
                data.active = false;
                id = this.writeMapFXChange(data);
                map.delete(id);
            }.bind(this), 10000);
        }
    }
    sendError(text = "La connexion au jeu a échoué") {
        var packet = new SocketMessage(1, 2);
        packet.bitWriteString(text);
        this.send(packet);
        this.connectionLost();
        this.socket.end();
    }
    query(param1) {
        return this.server.database(param1);
    }
    parsedEventMessage(type, stype, loc5) {
       
        var packet;   //Patch here 
        if (type == 4) {       //if (!user.uid) {  return; } 
            if (!this.isConsole) { return;  }
            if (stype == 1) {
                let pid = loc5.bitReadUnsignedInt(16),
                    text = loc5.bitReadString();
                let p = new SocketMessage(6, 1);
                p.bitWriteUnsignedInt(16, pid);
                for (var i in this.server.userList) {
                    let user = this.server.userList[i];
                    if (user.pseudo.toUpperCase().includes(text.toUpperCase()) && !user.isConsole) {
                        p.bitWriteBoolean(true);
                        p.bitWriteString(user.pseudo);
                        p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, user.pid);
                        p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, user.uid);
                        p.bitWriteUnsignedInt(32, 0);
                    }
                }
                p.bitWriteBoolean(false);
                this.send(p);
            } else if (stype == 2) {
                let active = loc5.bitReadBoolean(),
                    color = loc5.bitReadUnsignedInt(24);
                let data = {
                    loc17: true,
                    id: 1,
                    sid: 19,
                    active: active,
                    lightEffectColor: color,
                    map: true
                };
                for (var id in this.server.userList) {
                    let client = this.server.userList[id];
                    if (client.pseudo == this.pseudo && !client.isConsole) {
                        let fx_save = client.writeUserFXChange(19, data);
                        client.fxUser[19] = fx_save;
                    }
                }
            } else if (stype == 3) {
                let pid = loc5.bitReadUnsignedInt(GlobalProperties.BIT_USER_PID),
                    jsp = loc5.bitReadBoolean(),
                    grade = loc5.bitReadUnsignedInt(GlobalProperties.BIT_GRADE),
                    text = loc5.bitReadString();
                let p = new SocketMessage(6, 5);
                p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, this.pid);
                p.bitWriteBoolean(!!pid);
                p.bitWriteBoolean(jsp);
                p.bitWriteString(text);
                for (var id in this.server.userList) {
                    let client = this.server.userList[id];
                    if (client.isConsole && !pid) {
                        client.send(p);
                    } else if (client.isConsole && client.pid == pid) {
                        client.send(p);
                    }
                }
            } else if (stype == 4) {
                let pid = loc5.bitReadUnsignedInt(GlobalProperties.BIT_USER_PID),
                    text = loc5.bitReadString();
                let user = this.getUserByPid(pid);
                if (user) {
                    if (user.grade < this.grade) {
                        user.sendError(text);
                    }
                }
            } else if (stype == 6) {
                let pid = loc5.bitReadUnsignedInt(GlobalProperties.BIT_USER_PID),
                    serverId = loc5.bitReadUnsignedInt(GlobalProperties.BIT_SERVER_ID),
                    jsp = loc5.bitReadBoolean(),
                    text = loc5.bitReadString();
                let user = this.getUserByPid(pid);
                if (user) {
                    let p2 = new SocketMessage(1, 5);
                    p2.bitWriteBoolean(false);
                    p2.bitWriteBoolean(true);
                    p2.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, this.pid);
                    p2.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, this.uid);
                    p2.bitWriteString(this.pseudo);
                    p2.bitWriteString(`${text}`);
                    user.send(p2);
                }
            } else if (stype == 7) {
                let pid = loc5.bitReadUnsignedInt(GlobalProperties.BIT_USER_PID),
                    serverId = loc5.bitReadUnsignedInt(GlobalProperties.BIT_SERVER_ID),
                    jsp = loc5.bitReadBoolean(),
                    text = loc5.bitReadString();
                let user = this.getUserByPid(pid);
                if (user) {
                    packet = new SocketMessage(1, 5);
                    packet.bitWriteBoolean(false);
                    packet.bitWriteBoolean(true);
                    packet.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, this.pid);
                    packet.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, this.uid);
                    packet.bitWriteString(this.pseudo);
                    packet.bitWriteString(`Kické : ${text}`);
                    user.send(packet);
                    user.sendError("");
                    this.sendMsg(`${user.pseudo} a été kické par ${this.pseudo}.`, {
                        ALL: true
                    })
                }
            } else if (stype == 8) {
                let userId = loc5.bitReadUnsignedInt(GlobalProperties.BIT_USER_ID),
                    jsp = loc5.bitReadBoolean(),
                    motif = loc5.bitReadString(),
                    temps = loc5.bitReadUnsignedInt(16);
                let user = this.getUserByUid(userId);
                if (user) {
                    this.server.database('UPDATE chat SET prison_motif = ? WHERE login = ? ', [motif, user.login]);
					var xptmp = parseInt(user.xp + temps * 1.5)
                    this.server.database('UPDATE chat SET xp_expire = ? WHERE login = ?',[xptmp, user.login]);
                    this.server.database('UPDATE chat SET mapId = 10 WHERE login = ? ', [user.login]);
                    user.teleportToMap(1, 10, 0, 6);
                    this.sendMsg(`${user.pseudo} a été mis en prison par ${this.pseudo}.`, {
                        ALL: true
                    });
                }
            } else if (stype == 9) {
                let mapId = loc5.bitReadUnsignedInt(GlobalProperties.BIT_MAP_ID),
                    serverId = loc5.bitReadUnsignedInt(GlobalProperties.BIT_SERVER_ID),
                    jsp = loc5.bitReadBoolean(),
                    text = loc5.bitReadString(),
                    all_uni = loc5.bitReadBoolean();
                this.mapId = mapId;
                this.serverId = serverId;
                let p = new SocketMessage(5, 7, this);
                p.bitWriteBoolean(true); //html
                p.bitWriteBoolean(true); //modo
                p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, this.pid);
                p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, this.uid);
                p.bitWriteUnsignedInt(3, this.sex);
                p.bitWriteString(this.pseudo);
                p.bitWriteUnsignedInt(GlobalProperties.BIT_SERVER_ID, serverId);
                p.bitWriteString(text);
                p.bitWriteUnsignedInt(3, 0);
                this.map.maps[mapId].sendAll(p);
            } else if (stype == 10) {
                let serverId = loc5.bitReadUnsignedInt(GlobalProperties.BIT_SERVER_ID),
                    jsp = loc5.bitReadBoolean(),
                    text = loc5.bitReadString(),
                    all_uni = loc5.bitReadBoolean();
                this.serverId = serverId;
                let p;
                for (var client in this.server.userList) {
                    let player = this.server.userList[client];
                    p = new SocketMessage(5, 7, player);
                    p.bitWriteBoolean(true); //html
                    p.bitWriteBoolean(true); //modo
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, this.pid);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, this.uid);
                    p.bitWriteUnsignedInt(3, this.sex);
                    p.bitWriteString(this.pseudo);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_SERVER_ID, serverId);
                    p.bitWriteString(text);
                    p.bitWriteUnsignedInt(3, 0);
                    player.send(p);
                }
            } else if (stype == 11) {
                let pid = loc5.bitReadUnsignedInt(16),
                    pid2 = loc5.bitReadUnsignedInt(GlobalProperties.BIT_USER_PID),
                    server = loc5.bitReadUnsignedInt(GlobalProperties.BIT_SERVER_ID);
                let user = this.getUserByPid(pid2);
                if (user) {
                 //   if (!user.uid) {  user.sendError("");  return;  } //Patch here
                    let p = new SocketMessage(6, 8);
                    p.bitWriteUnsignedInt(16, pid);
                    p.bitWriteString(user.pseudo);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, 0);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, user.uid);
                    p.bitWriteUnsignedInt(32, 0);
                    this.send(p);
                }
            } else if (stype == 12) {
                let uid = loc5.bitReadUnsignedInt(GlobalProperties.BIT_USER_ID),
                    motif = loc5.bitReadString();
                let user = this.getUserByUid(uid);
                if (user) {
                    user.teleportToMap(1, 9, 0, 4, {
                        ALL: 1
                    });
                }
            } else if (stype == 15) {
                let pid = loc5.bitReadUnsignedInt(GlobalProperties.BIT_USER_PID),
                    serverId = loc5.bitReadUnsignedInt(GlobalProperties.BIT_SERVER_ID),
                    mapId = loc5.bitReadUnsignedInt(GlobalProperties.BIT_MAP_ID),
                    server = loc5.bitReadUnsignedInt(GlobalProperties.BIT_SERVER_ID);
                let user = this.getUserByPid(pid);
                if (user) {
                    user.teleportToMap(1, mapId, server, 4);
                }
            } else if (stype == 20) {
                let mapId = loc5.bitReadUnsignedInt(GlobalProperties.BIT_MAP_ID),
                    serverId = loc5.bitReadUnsignedInt(GlobalProperties.BIT_SERVER_ID),
                    bbl = loc5.bitReadUnsignedInt(16);
                this.createKdo(bbl, 1, false, mapId);
            } else if (stype == 21) {
                if (this.grade >= 800) {
                    let mapId = loc5.bitReadUnsignedInt(GlobalProperties.BIT_MAP_ID),
                        serverId = loc5.bitReadUnsignedInt(GlobalProperties.BIT_SERVER_ID),
                        osef = loc5.bitReadUnsignedInt(2),
                        fx_id = loc5.bitReadUnsignedInt(GlobalProperties.BIT_FX_ID),
                        fx_sid = loc5.bitReadUnsignedInt(GlobalProperties.BIT_FX_SID),
                        map = this.map.maps[mapId];
                    if (osef == 1) {
                        let fxSid = loc5.bitReadUnsignedInt(GlobalProperties.BIT_FX_SID);
                        if (fxSid in map.data.CONSOLE_FX) {
                            map.delete(map.data.CONSOLE_FX[fxSid]);
                            let id = this.writeMapFXChange({
                                id: 5,
                                sid: fxSid,
                                active: false,
                                data: [fx_id, fx_sid, new SocketMessage()],
                                map: true,
                                close: 1
                            }, mapId);
                            map.delete(id);
                            delete map.data.CONSOLE_FX[fxSid];
                        }
                        return;
                    }
                    let hasData = loc5.bitReadBoolean(),
                        data = null,
                        obj_id = map.objectPid;
                    if (hasData) data = loc5.bitReadBinaryData();
                    let hasDuration = loc5.bitReadBoolean();
                    let duration = 0;
                    if (hasDuration) duration = loc5.bitReadUnsignedInt(32);
                    if (hasData) {
                        let n_data = {
                                id: 5,
                                sid: obj_id,
                                active: true,
                                data: [fx_id, fx_sid, data],
                                map: true,
                                close: 1
                            },
                            id = this.writeMapFXChange(n_data, mapId);
                        if (!map.data.CONSOLE_FX) map.data.CONSOLE_FX = {};
                        map.data.CONSOLE_FX[obj_id] = id;
                        if (hasDuration) {
                            setTimeout(function() {
                                map.delete(id);
                                n_data.active = false;
                                id = this.writeMapFXChange(n_data, mapId);
                                map.delete(id);
                                delete map.data.CONSOLE_FX[obj_id];
                            }.bind(this), duration * 1000);
                        }
                    }
                }
            } else if (stype == 25) {
                let statType = loc5.bitReadUnsignedInt(8),
                    pid = loc5.bitReadUnsignedInt(16),
                    p = new SocketMessage(6, 13);
                p.bitWriteUnsignedInt(16, pid);
                p.bitWriteUnsignedInt(8, statType);
                p.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0]);
                this.send(p);
            } else if (stype == 26 && this.grade >= 800) {
                let oui = loc5.bitReadUnsignedInt(10);
                let channel = loc5.bitReadUnsignedInt(GlobalProperties.BIT_CHANNEL_ID),
                    ip = loc5.bitReadString();
                let p = this.getChannel(channel);
                p.bitWriteUnsignedInt(8, 0);
                this.send(p);
                this.server.conf.data.ip.push(ip);
                ipBan.push(ip);
                this.server.database('INSERT INTO banip (ip) VALUES (?)',[ip]);
            } else if (stype == 30) {
                let uid = loc5.bitReadUnsignedInt(GlobalProperties.BIT_USER_ID);
                let user = this.getUserByUid(uid);
                if (user) {
                    if (!this.server.conf.data.POURSUITE) this.server.conf.data.POURSUITE = {};
                    this.server.conf.data.POURSUITE[uid] = [this, user.pseudo];
                    let p = new SocketMessage(7, 4);
                    p.bitWriteUnsignedInt(32, 0);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, user.uid);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, 0);
                    p.bitWriteBoolean(true);
                    p.bitWriteBoolean(true);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, user.pid);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_SERVER_ID, user.serverId);
                    p.bitWriteBoolean(true);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, uid);
                    p.bitWriteUnsignedInt(32, user.grade < this.grade ? user.ip : 0);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_GRADE, user.grade);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_SKIN_ID, user.mainUser.skinId);
                    p.bitWriteString(user.pseudo);
                    p.bitWriteString(user.login); //username
                    for (let a = 0; a < 10; a++) p.bitWriteUnsignedInt(8, user.mainUser.skinColor[a]);
                    p.bitWriteBoolean(true);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_MAP_ID, user.mapId);
                    p.bitWriteBoolean(false);
                    this.send(p);
                } else {
                    user = this.query('SELECT * from users WHERE id = ?', [uid] );
                    for (let i in user) {
                        if (!this.server.conf.data.POURSUITE) this.server.conf.data.POURSUITE = {};
                        this.server.conf.data.POURSUITE[uid] = [this, user[i].pseudo];
                    }
                }
            } else if (stype == 31) {
                let uid = loc5.bitReadUnsignedInt(GlobalProperties.BIT_USER_ID);
                let user = this.getUserByUid(uid);
                if (user) {
                    let p = new SocketMessage(1, 14);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, this.uid);
                    user.send(p)
                    try {
                        delete this.server.conf.data.POURSUITE[uid];
                    } catch (e) {}
                }
            }
        } else if (type == 3) {
            if (stype == 1) {
                let cameraId = loc5.bitReadUnsignedInt(GlobalProperties.BIT_CAMERA_ID),
                    p = new SocketMessage(3, 1);
                let camera = new Camera(this.cameraList.count, 9);
                if (!this.isConsole) {
                    this.data.IS_CAMERA = true;
                    this.data.mapList = [13, 37, 9, 16, 6, 32];
                    this.cameraList.clear();
                }
                this.cameraList.push(camera);
                this.cameraList.update();
                //this.cameraList.selected = camera.id;
                let error = this.cameraList.hasCameraHere(camera.id, camera.mapId);
                p.bitWriteUnsignedInt(GlobalProperties.BIT_ERROR_ID, error);
                p.bitWriteUnsignedInt(GlobalProperties.BIT_CAMERA_ID, camera.id);
                this.send(p);
                p = new SocketMessage(3, 5);
                p.bitWriteUnsignedInt(GlobalProperties.BIT_CAMERA_ID, camera.id);
                p.bitWriteUnsignedInt(GlobalProperties.BIT_MAP_ID, camera.mapId);
                p.bitWriteUnsignedInt(GlobalProperties.BIT_SERVER_ID, 0);
                p.bitWriteUnsignedInt(GlobalProperties.BIT_MAP_ID, camera.mapId);
                p.bitWriteUnsignedInt(GlobalProperties.BIT_METHODE_ID, 0);
                p.bitWriteUnsignedInt(GlobalProperties.BIT_ERROR_ID, error);
                this.send(p);
                this.server.reloadUserCount();
            } else if (stype == 3) {
                if (this.firstmap && !this.isConsole && this.uid > 0) {
                    let test_u = this.getUserByUid(this.uid);
                    if (test_u && !test_u.isConsole) test_u.sendError("Tu ne peux pas te connecter plusieurs fois sur un même compte");
                }
                if (config.allowTouriste == "false") {
                    if (this.isTouriste) {
                        this.sendError(config.msgErrorTouriste);
                        return;
                    }
                }
                this.cameraId = new Camera(1, this.mapId);
                this.cameraList = new CameraManager();
                this.cameraList.selected = this.cameraId.id;
                this.cameraList.push(this.cameraId);
                this.server.addClient(this);
                var token = loc5.bitReadUnsignedInt(32);
                packet = new SocketMessage(3, 2);
                packet.bitWriteUnsignedInt(GlobalProperties.BIT_ERROR_ID, 0);
                let camera = this.cameraList.getCameraByMap(this.mapId);
                for (var i in camera) packet.bitWriteUnsignedInt(GlobalProperties.BIT_CAMERA_ID, camera[i]);
                packet.bitWriteString(this.mainUser.chatColor);
                packet.bitWriteUnsignedInt(GlobalProperties.BIT_MAP_ID, this.mapId);
                packet.bitWriteUnsignedInt(GlobalProperties.BIT_MAP_FILEID, this.mapId);
                this.userSmileyEvent(packet);
                packet.bitWriteBoolean(false);
                packet.bitWriteBoolean(false);
                if (!this.isTouriste) {
                    if (this.grade >= 800) {
                        powerInfo[10000] = [2, 1, 99999, 5, 5, new SocketMessage()];
                        powerInfo[10001] = [2, 2, 99999, 5, 5, new SocketMessage()];
                        
                    }
                    for (var i in powerInfo) { //Object to all user 
                        packet = this.userObjectEvent(packet, {
                            type: 0,
                            id: i,
                            fxFileId: powerInfo[i][0],
                            objectId: powerInfo[i][1],
                            count: 999,
                            expire: powerInfo[i][2],
                            visibility: powerInfo[i][3],
                            genre: powerInfo[i][4],
                            data: powerInfo[i][5]
                        });
                    }
                    /*
                                        let object = this.query(`SELECT * FROM object WHERE login = '${this.login}'`);
                                        this.pouvoirs = {};
                                        for (let i in object) {
                                            let pouvoir = object[i];
                                            this.pouvoirs[pouvoir.ObjectId] = pouvoir;
                                            packet = this.userObjectEvent(packet, {
                                                type: 0,
                                                id: pouvoir.ObjectId,
                                                fxFileId: pouvoir.fx,
                                                objectId: pouvoir.fxsid,
                                                count: pouvoir.count,
                                                expire: pouvoir.expire,
                                                visibility: pouvoir.visibility,
                                                genre: pouvoir.type,
                                                data: new SocketMessage()
                                            });
                                        }*/
                }
                packet.bitWriteBoolean(false);
                this.send(packet);
                this.chatBuffer = {
                    id: parseInt(Math.random() * 64),
                    position: 680000,
                    size: 20
                }
                packet = new SocketMessage(1, 18);
                packet.bitWriteUnsignedInt(32, this.chatBuffer.id); // id
                packet.bitWriteUnsignedInt(32, this.chatBuffer.position); // position
                packet.bitWriteUnsignedInt(32, this.chatBuffer.size); //size
                this.send(packet);
                packet = new SocketMessage(5, 11, this);
                packet.bitWriteBoolean(true); //html
                packet.bitWriteBoolean(false); //alerte
                packet.bitWriteString(`\n<font color=\'#022ebf\'>Bienvenue sur <font color=\'#bf0202\'><a href="https://github.com/Undi95/Blablaland.js-Fix" target="_blank">blablaland.js</a></font> ! [v0.0.8.3] \
                \nDévelopper : <font color=\'#bf0202\'>GregVido, Undi, Xcoder, .ca staff</font>`);				
                this.send(packet);
                this.connected = true;
            } else if (stype == 5) { // ici a vérifier pour les skin
                var methode_id = loc5.bitReadUnsignedInt(GlobalProperties.BIT_METHODE_ID);
                var camera_id = loc5.bitReadUnsignedInt(GlobalProperties.BIT_CAMERA_ID);
                var map_id = loc5.bitReadUnsignedInt(GlobalProperties.BIT_MAP_ID);
                var server_id = loc5.bitReadUnsignedInt(GlobalProperties.BIT_SERVER_ID);
                this.cameraList.setMapId(camera_id, map_id);
                this.readPlayerState(loc5);
                this.teleportToMap(camera_id, map_id, server_id, methode_id);
            } else if (stype == 6) {
                //if(this.isTouriste) return;
                var camera_id = loc5.bitReadUnsignedInt(GlobalProperties.BIT_CAMERA_ID);
                var map_id = loc5.bitReadUnsignedInt(GlobalProperties.BIT_MAP_ID);
                this.cameraList.setMapId(camera_id, map_id);
                this.mapLoaded = true;
                this.mapId = map_id;
                this.map.joinMap(map_id, this);
                if (this.data.IS_CAMERA) {
                    if (this.data.mapList.includes(map_id)) {
                        let position = this.data.mapList.indexOf(map_id);
                        if (position == this.data.mapList.length - 1) position = -1;
                        position++;
                        setTimeout(function() {
                            this.teleportToMap(1, this.data.mapList[position], 0, 0);
                        }.bind(this), 15 * 1000);
                    }
                }
                if (!([55, 446, 264, 251, 252, 253, 254, 255, 256].includes(map_id))) {
                    this.writeUserFXChange(1, {
                        loc17: true,
                        id: 6,
                        sid: 1,
                        active: false,
                        data: [8, 1, new SocketMessage()],
                        map: false
                    });
                }
                if ([448, 449, 450, 451, 452, 453, 454, 455].includes(map_id)) {
                    if (!this.data.PYRAMIDE) {
                        this.data.PYRAMIDE = [this.mainUser.skinId, 0, GlobalProperties.getServerTime()[0]];
                    }
                    this.reloadSkin(547);
                    let p = new SocketMessage();
                    p.bitWriteUnsignedInt(3, 1);
                    p.bitWriteBoolean(true);
                    this.writeUserFXChange(8, {
                        loc17: true,
                        id: 8,
                        sid: 8,
                        active: true,
                        data: [p],
                        map: false
                    });
                }
                if (this.getManoirMap().includes(map_id)) {
                    this.clearSkin();
                    let packet = new SocketMessage();
                    packet.bitWriteUnsignedInt(32, 11585);
                    packet.bitWriteBoolean(true);
                    let packet2 = new SocketMessage();
                    packet2.bitWriteUnsignedInt(2, 1);
                    packet2.bitWriteUnsignedInt(5, 0);
                    packet.bitWriteBinaryData(packet2);
                    this.parsedEventMessage(6, 8, packet)
                    this.data.MANOIR = [1];
                } else if (this.data.MANOIR) {
                    delete this.data.MANOIR;
                    this.clearSkin();
                }
                if (map_id == 456 && this.data.PYRAMIDE) {
                    this.reloadSkin(this.data.PYRAMIDE[0]);
                    let p = new SocketMessage();
                    p.bitWriteUnsignedInt(3, 0);
                    p.bitWriteBoolean(true);
                    p.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0] - this.data.PYRAMIDE[2]);
                    p.bitWriteUnsignedInt(16, this.data.PYRAMIDE[1]);
                    this.writeUserFXChange(9, {
                        loc17: true,
                        id: 8,
                        sid: 9,
                        active: true,
                        data: [p],
                        map: false
                    });
                    delete this.data.PYRAMIDE;
                }
                packet = new SocketMessage(4, 1);
                let camera = this.cameraList.getCameraByMap(this.mapId);
                for (var i in camera) packet.bitWriteUnsignedInt(GlobalProperties.BIT_CAMERA_ID, camera[i]);
                packet.bitWriteUnsignedInt(GlobalProperties.BIT_ERROR_ID, 0);
                packet.bitWriteUnsignedInt(GlobalProperties.BIT_METHODE_ID, this.methodeId);
                packet.bitWriteSignedInt(17, this.server.variable.maps[this.mapId][3]);
                packet.bitWriteSignedInt(17, this.server.variable.maps[this.mapId][4]);
                packet.bitWriteUnsignedInt(5, this.server.variable.maps[this.mapId][5]);
                packet.bitWriteUnsignedInt(GlobalProperties.BIT_TRANSPORT_ID, this.server.variable.maps[this.mapId][2]);
                packet.bitWriteUnsignedInt(16, this.server.variable.maps[this.mapId][6]);
                for (var client in this.map.maps[map_id].userList) {
                    client = this.map.maps[map_id].userList[client];
                    if (!client.isConsole && !client.data.IS_CAMERA) {
                        let loc1 = true;
                        if (client.data.MAISON_ACTIF) {
                            if (client.data.MAISON_ACTIF.id != this.data.MAISON_ACTIF.id) loc1 = false;
                        }
                        if (loc1) {
                            packet.bitWriteBoolean(true);
                            packet.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, client.uid);
                            packet.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, client.pid);
                            packet.bitWriteString(client.pseudo);
                            packet.bitWriteUnsignedInt(3, client.sex);
                            packet.bitWriteUnsignedInt(32, 0);
                            var p = new SocketMessage();
                            p = client.writePlayerState(p, true, true, true, !(client == this));
                            packet.bitWriteBinaryData(p)
                        }
                    }
                }
                packet.bitWriteBoolean(false);
                for (var i in this.map.maps[map_id].objectList) {
                    var obj = this.map.maps[map_id].objectList[i];
                    if (Object.keys(obj).length >= 2) {
                        packet.bitWriteBoolean(true);
                        packet.bitWriteUnsignedInt(GlobalProperties.BIT_FX_ID, obj[0]);
                        packet.bitWriteUnsignedInt(GlobalProperties.BIT_FX_SID, obj[1]);
                        packet.bitWriteBinaryData(obj[2]);
                    }
                }
                packet.bitWriteBoolean(false);
                this.send(packet);
                this.methodeId = 0;
                for (var i in this.server.conf.data.POURSUITE) {
                    if (this.server.conf.data.POURSUITE[i][1] == this.pseudo) {
                        let p = new SocketMessage(7, this.firstmap ? 4 : 1);
                        p.bitWriteUnsignedInt(32, 0);
                        p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, this.uid);
                        p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, 0);
                        if (this.firstmap) {
                            p.bitWriteBoolean(true);
                            p.bitWriteBoolean(true);
                        }
                        p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, this.pid);
                        p.bitWriteUnsignedInt(GlobalProperties.BIT_SERVER_ID, this.serverId);
                        p.bitWriteBoolean(this.firstmap);
                        if (this.firstmap) {
                            p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, this.uid);
                            p.bitWriteUnsignedInt(32, this.server.conf.data.POURSUITE[i][0].grade > this.grade ? this.ip : 0);
                            p.bitWriteUnsignedInt(GlobalProperties.BIT_GRADE, this.grade);
                            p.bitWriteUnsignedInt(GlobalProperties.BIT_SKIN_ID, this.mainUser.skinId);
                            p.bitWriteString(this.pseudo);
                            p.bitWriteString(this.login);
                            for (let a = 0; a < 10; a++) p.bitWriteUnsignedInt(8, this.mainUser.skinColor[a]);
                        }
                        p.bitWriteBoolean(true);
                        p.bitWriteUnsignedInt(GlobalProperties.BIT_MAP_ID, this.mapId);
                        p.bitWriteBoolean(false);
                        try {
                            this.server.conf.data.POURSUITE[i][0].send(p);
                        } catch (e) {}
                    }
                }
                if (this.firstmap) {
                    this.firstmap = false;

                    if (this.clan && this.clan.length > 0) {
                        this.setClan(this.clan, false);
                    }

                    try {
                        let user = this.getUserObjectByUID(this.uid);
                        if (user.light) {
                            let data = {
                                loc17: true,
                                id: 1,
                                sid: 19,
                                active: true,
                                lightEffectColor: user.lightColor,
                                map: true
                            };
                            let fx_save = this.writeUserFXChange(19, data);
                            this.fxUser[19] = fx_save;
                        }
                    } catch (e) {}
                }
            }
        }
    }
}

class BblLogged extends BblCamera { 
    constructor() {
        super();
        this.uid = 0;
        this.pid = 1;
        this.sex = 0;
        this.pseudo = "Sorrow";
        this.grade = 0;
        this.xp = 300;
        this.GPTimer = 0;
        this.firstmap = true;
        this.mainUser = { 
            skinId: 7,
            skinColor: [0, 0, 88, 44, 44, 58, 0, 0, 0, 0],
            oldSkinColor: [],
            jump: 0,
            walk: 0,
            shiftKey: false,
            direction: true,
            onFloor: false,
            underWater: false,
            grimpe: false,
            accroche: false,
            dodo: false,
            position: { x: respawn[this.mapId][0], y: respawn[this.mapId][1] },
            speed: { x: 0, y: 0 },
            surfaceBody: 0,
            dodoSid: 0,
            chatColor: "0129402a0a20333334"
        };
        this.bbl = 0;
        this.isTouriste = true;
        this.fxUser = {};
    }

    isPrehistoire() {
        return [810, 811, 812, 813, 814, 815, 816, 817, 818].includes(this.mapId);
    }
    IsMapSpacial() {
        return [541, 542, 543, 544, 545, 546, 547, 548].includes(this.mapId);
    }
    IsMapTerreNullis() {
        return [721].includes(this.mapId);
    }
    IsMapSkyAlternaty() {
        return [806].includes(this.mapId);
    }
    IsMapHallLunaire() {
        return [722].includes(this.mapId);
    }
    IsMapBar() {
        return [711, 710].includes(this.mapId);
    }
    IsMapSentierPaisible() {
        return [800, 801].includes(this.mapId);
    }
    IsMapArkadev() {
        return [911, 912, 913, 914, 915, 916, 917,918,919, 920,921,922,923,924,925, 926, 927, 928,929, 930, 931,932,933,934,935,936,937,938,939,940,941,942,943,944, 945,946].includes(this.mapId);
    }
    sendMsg(text, data = {}) {
       // if (!user.uid) { return; }  //Patch here
            var packet = new SocketMessage(5, 11, this);
            packet.bitWriteBoolean(data.HTML ? data.HTML : false); //html
        packet.bitWriteBoolean(data.ALERTE ? data.ALERTE : false); //alerte
        packet.bitWriteString(text);
        data.ALL ? this.map.maps[this.mapId].sendAll(packet) : this.send(packet);
        
        
    }
    reloadPlayerState(methode = 4, position = true) {
        var packet = new SocketMessage(5, 9, this);
        packet.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, this.pid);
        packet.bitWriteUnsignedInt(GlobalProperties.BIT_METHODE_ID, methode);
        packet = this.writePlayerState(packet, position, true, false);
        packet.bitWriteUnsignedInt(GlobalProperties.BIT_METHODE_ID, methode);
		console.log('1725 mapId : ' + this.mapId);
        this.map.maps[this.mapId].sendAll(packet);
    }
    rewriteUser() {
        let packet = new SocketMessage(5, 3);
        packet.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, this.pid);
        packet.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0]);
        packet = this.writePlayerState(packet, 1, 1, 1);
        this.send(packet);
    }
    updateDodo(activ) {
        if (activ != this.mainUser.dodo) {
            var packet = new SocketMessage(5, 5, this);
            packet.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, this.pid)
            packet.bitWriteBoolean(activ)
            this.map.maps[this.mapId].sendAll(packet);
            this.mainUser.dodo = activ;
        }
        if (!activ) {
            this.mainUser.dodoSid++;
            const last_id = this.mainUser.dodoSid;
            setTimeout(function() {
                if (this.mainUser.dodoSid == last_id) {
                    this.updateDodo(true);
                    setTimeout(function() {
                        if (this.mainUser.dodoSid == last_id) {
                            this.sendError("Tu es resté trop longtemps endormis :/");;
                        }
                    }.bind(this), 10 * 60 * 1000);
                }
            }.bind(this), 60000);
        }
    }
    getFlood() {
        if (!this.data.FLOOD) {
            this.data.FLOOD = 0;
            setTimeout(function() {
                delete this.data.FLOOD;
            }.bind(this), 1000);
        }
        this.data.FLOOD++;
        if (this.data.FLOOD == 3) this.sendMsgMod("Merci de ne pas flooder (messages à répétition).")
        if (this.data.FLOOD >= 6) {
            this.sendMsgMod("Vous êtes puni quelques secondes pour avoir floodé.")
            let f_data = {
                loc17: true,
                id: 2,
                sid: 0,
                active: true,
                data: true,
                map: true
            };
            this.fxUser[0] = this.writeUserFXChange(0, f_data);
            setTimeout(function() {
                f_data.active = false;
                this.writeUserFXChange(0, f_data);
                this.sendMsgMod("Fin de la punition.")
                delete this.fxUser[0];
            }.bind(this), 5 * 1000);
            return false;
        }
        return true;
    }
    timer() {
        if (this.connected) {
            if (!this.dodo) {
                this.xp++;
                let p = new SocketMessage(2, 11);
                p.bitWriteUnsignedInt(32, this.xp);
                this.send(p);
                if (this.mapId == 10 && this.xp >= this.getUserObjectByUID(this.uid).expire) {
                    this.teleportToMap(1, 9, 0, 6, {
                        ALL: true
                    });
                }
                else {
                    if (this.map_id == 10 && !opts.ALL) {
                        this.sendMsg("Tu ne peux pas t'échapper de la prison comme ça!");
                       return;
                    }
                }
            }
            setTimeout(this.timer.bind(this), 90 * 1000);;
        }
    }
    loop() {
        if (this.connected) {
            this.data.CAN_USE_POWER = true;
            let query = this.server.database('SELECT * from users WHERE session = ?', [this.session] );
            if (query.length > 0) {
                query = query[0];				
				if (query.skinid != this.skinId || !arraysEqual(this.skinColor, query.skincolors.split(','))) {
                    this.skinId = query.skinid;
                    this.skinColor = JSON.parse(query.skincolors);
                    if (this.data.MONTURE) {
                        let packet = new SocketMessage();
                        packet.bitWriteUnsignedInt(32, this.data.MONTURE[1]);
                        packet.bitWriteBoolean(true);
                        let packet2 = new SocketMessage();
                        packet2.bitWriteUnsignedInt(2, 1);
                        packet2.bitWriteUnsignedInt(5, 1);
                        packet.bitWriteBinaryData(packet2);
                        this.parsedEventMessage(6, 8, packet)
                    }
                    this.mainUser.skinId = this.skinId;
                    this.mainUser.skinColor = this.skinColor;
                    this.reloadPlayerState(0, 0);
                }

                if (query.clan != this.clan) {
                    let active = query.clan.length > 0;

                    this.setClan(query.clan, false, active);
                }
            }
            setTimeout(this.loop.bind(this), 1000);;
        }
    }
    createKdo(bbl = 200, type = 1, pop_key = false, mapId = this.mapId) {
        let map = this.map.maps[mapId],
            obj_id = map.objectPid,
            p = new SocketMessage();
        p.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0]);
        p.bitWriteUnsignedInt(10, GlobalProperties.getServerTime()[1]);
        p.bitWriteUnsignedInt(8, type);
        p.bitWriteBoolean(pop_key);
        let data = {
                id: 5,
                sid: obj_id,
                active: true,
                data: [7, 1, p],
                map: true,
                close: 1
            },
            id = this.writeMapFXChange(data);
        if (!map.data.KDO) map.data.KDO = {};
        map.data.KDO[obj_id] = [id, type, bbl, pop_key, this.pseudo];
    }
    sendMsgMod(text) {
        let p2 = new SocketMessage(1, 5);
        p2.bitWriteBoolean(true);
        p2.bitWriteBoolean(true);
        p2.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, this.pid);
        p2.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, 0);
        p2.bitWriteString("GRAND SAGE");
        p2.bitWriteString(text);
        this.send(p2);
    }
    packet72reaction(newskin) {
        let p = new SocketMessage();
                p.bitWriteBoolean(true);
                p.bitWriteUnsignedInt(6, 5);
                p.bitWriteUnsignedInt(GlobalProperties.BIT_SKIN_ID, newskin);
                p.bitWriteBoolean(false);
                let data = this.writeUserFXChange(40, {
                    loc17: true,
                    id: 4,
                    sid: 40,
                    active: true,
                    data: p,
                    map: true
                });
                this.fxUser[40] = data;
                setTimeout(function() {
                    delete this.fxUser[40];
                    this.writeUserFXChange(40, {
                        loc17: true,
                        id: 4,
                        sid: 40,
                        active: false,
                        data: p,
                        map: true
                    });
                }.bind(this), 10 * 1000);
    }
    parsedEventMessage(type, stype, loc5) {
     //   if (!user.uid) {  return; } 
        super.parsedEventMessage(type, stype, loc5);
        var packet;
        if (type == 1) {
            if (stype == 2) {
                let mapList = {
                    457: 457,
                    458: 458,
                    459: 459,
                    472: 472,
                    497: 497,
                    503: 503,
                    507: 507,
                    518: 518,
                    537: 537,
                    539: 539
                }
                this.session = loc5.bitReadString();
                let user = this.server.database('SELECT * from users WHERE session = ?', [this.session] );
                if (user) {
                    user = user[0];
                    if (user == undefined) return this.sendError("erreur 0x002");

                    this.login = user.login;
                    let chat = this.server.database('SELECT * FROM chat WHERE login = ?', [this.login]);
                    this.server.database('UPDATE users SET online_chat = 1 WHERE login = ?', [this.login]);

                    if (chat[0] != undefined) {
                        chat = chat[0];
                        this.pseudo = user.pseudo;
                        this.mainUser.skinColor = JSON.parse(user.skincolors);
                        this.skinColor = JSON.parse(user.skincolors);

                        this.grade = user.grade;

                        this.mainUser.skinId = user.skinid;
                        this.skinId = user.skinid;

                        this.clan = user.clan;

                        this.mapId = chat.mapId;
                        this.mainUser.position.x = chat.posX;
                        this.mainUser.position.y = chat.posY;
                        this.mainUser.direction = chat.direction;

                        this.ip = 0;
                        this.xp = user.xp;
                        this.sex = user.genre;
                        this.uid = user.ID;
                        this.bbl = parseInt(user.bbl);

                        if (this.mapId in mapList || this.getParadisMap().includes(this.mapId)) {
                            this.mapId = 9;
                            this.mainUser.position.x = respawn[9][0];
                            this.mainUser.position.y = respawn[9][1];
                        }
                        if ([448, 449, 450, 451, 452, 453, 454, 455, 456].includes(this.mapId)) {
                            this.mapId = 447;
                            this.mainUser.position.x = respawn[447][0];
                            this.mainUser.position.y = respawn[447][1];
                        }
                        if (this.mapId == 521) {
                            this.mapId = 520;
                            this.mainUser.position.x = respawn[this.mapId][0];
                            this.mainUser.position.y = respawn[this.mapId][1];
                        }
                        this.isTouriste = false;
                    }

                }
                packet = new SocketMessage(2, 1);
                packet.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, this.uid);
                packet.bitWriteString(this.pseudo);
                packet.bitWriteUnsignedInt(GlobalProperties.BIT_GRADE, this.grade);
                packet.bitWriteUnsignedInt(32, this.xp);
                this.send(packet);
                setTimeout(this.timer.bind(this), 90 * 1000);
                setTimeout(this.loop.bind(this), 1000);
            } else if (stype == 4) {
                //patch here god damn it 
             //   if(!user.uid) { return; }
                var text = loc5.bitReadString();
                var action = loc5.bitReadUnsignedInt(3);
                var commandes = text.split(" ");
                if (this.grade >= 200) {
                    if(this.grade >= 250){
                        if (this.grade > 800) {
                            if (text == "!info") {
                                packet = new SocketMessage(5, 11, this);
                                packet.bitWriteBoolean(true); //html
                                packet.bitWriteBoolean(false); //alerte
                                packet.bitWriteString(`${this.mapId}: [${this.mainUser.position.x}, ${this.mainUser.position.y}],`);
                                this.send(packet);
                                return;
                            } else if (commandes[0] == "!kdo" && commandes[1] != "") {
                                this.createKdo(parseInt(commandes[1]));
                                return;
                            } else if (commandes[0] == "!getusers") {
                                let result = '';
        
                                for (let i in this.server.userList) {
                                    let user = this.server.userList[i];//skinId
                                    result += `${user.pseudo} -> ${user.skinId} -> ${user.mapId} ,`;
                                }
        
                                result = result.slice(0, result.length - 2);
                                this.sendMsg(result);
        
                                return;
                                
                            } else if (commandes[0] == "!size" && commandes[1] != "") {
                                let p = new SocketMessage();
                                p.bitWriteBoolean(true);
                                p.bitWriteUnsignedInt(6, 13);
                                p.bitWriteSignedInt(9, parseInt(commandes[1]));
                                p.bitWriteBoolean(false);
        
                                this.fxUser[18251] = this.writeUserFXChange(18250, {
                                    loc17: true,
                                    id: 4,
                                    sid: 16,
                                    active: true,
                                    data: p,
                                    map: true
                                });
                                return;
                            } else if (commandes[0] == "!etoilespam") {
                                this.createKdo(10, 6); this.createKdo(10, 6); this.createKdo(10, 6); this.createKdo(10, 6); this.createKdo(10, 6); this.createKdo(10, 6); this.createKdo(10, 6); this.createKdo(10, 6); this.createKdo(15, 6); this.createKdo(15, 6); this.createKdo(15, 6); this.createKdo(20, 6); this.createKdo(20, 6); this.createKdo(20, 6); this.createKdo(20, 6); this.createKdo(25, 6); this.createKdo(25, 6); this.createKdo(25, 6); this.createKdo(30, 6); this.createKdo(30, 6);
                                return;
                            }
                            else if (commandes[0] == "!kdospam" && commandes[1] != "") {
                                this.createKdo(parseInt(commandes[1])); this.createKdo(parseInt(commandes[1])); this.createKdo(parseInt(commandes[1])); this.createKdo(parseInt(commandes[1])); this.createKdo(parseInt(commandes[1])); this.createKdo(parseInt(commandes[1])); this.createKdo(parseInt(commandes[1])); this.createKdo(parseInt(commandes[1]));
                                return;
                            } else if (commandes[0] == "!su"  && commandes[1] != "" && commandes[2] != "" ) { //verify if name and size arent empty 
                                let p = new SocketMessage();
                                p.bitWriteBoolean(true);
                                p.bitWriteUnsignedInt(6, 13);
                                p.bitWriteSignedInt(9, parseInt(commandes[1]));
                                p.bitWriteBoolean(false);
                                let pseudo = commandes[2];
                                let newuser = this.getUserByPseudo(pseudo[2]);
                                
                                if (!newuser) return this.sendMsg("[error] Utilisateur inconnu ou non connecté (" + commandes[2] + ")");; 
                                this.newuser[18251] = this.writeUserFXChange(18250, {
                                    loc17: true,
                                    id: 4,
                                    sid: 16,
                                    active: true,
                                    data: p,
                                    map: true
                                });
                                return;
                            } else if (commandes[0] == "!etoile") {
                                this.createKdo(1, 6);
                                return;
                            } else if (commandes[0] == "!cle") {
                                this.createKdo(1500, 2);//cle :DDD  
                                return;
                            }
                            else if (commandes[0] == "!drapeau") {
                                this.createKdo(5000, 5); //drapeau 
                                return;
                            }
                            else if (commandes[0] == "!fauxkdo") {
                                this.createKdo(1, 3); //faux kdo
                                return;
                            }
                            else if (commandes[0] == "!fauxkdospam") {
                                this.createKdo(1, 3);   this.createKdo(1, 3);  this.createKdo(1, 3);  this.createKdo(1, 3);  this.createKdo(1, 3);  this.createKdo(1, 3);  this.createKdo(1, 3);  this.createKdo(1, 3);  this.createKdo(1, 3);  this.createKdo(1, 3);  this.createKdo(1, 3);  this.createKdo(1, 3);  this.createKdo(1, 3);  this.createKdo(1, 3);  this.createKdo(1, 3);  this.createKdo(1, 3);  this.createKdo(1, 3);  this.createKdo(1, 3);  this.createKdo(1, 3);  this.createKdo(1, 3);  this.createKdo(1, 3); //faux kdo
                                return;
                            } else if (commandes[0] == "!skin") {
                                this.reloadSkin(parseInt(commandes[1]));
                                return;
                            } else if (commandes[0] == "!clear") {
                                let map = this.map.maps[this.mapId];
                                for (var i in map.objectList) {
                                    var obj = map.objectList[i];
                                    if (Object.keys(obj).length >= 2) {
                                        if (obj[3][0] != 33) {
                                            let id = this.writeMapFXChange({
                                                id: obj[0],
                                                sid: obj[1],
                                                active: false,
                                                data: obj[3],
                                                map: true,
                                                close: 1
                                            });
                                            map.delete(id);
                                            map.delete(i);
                                        }
                                    }
                                }
                                return;
                            } else if (commandes[0] == '!color') {
                                if (!this.data.lightC) this.data.lightC = false;
                                this.data.lightC = !this.data.lightC;
                                this.data.lightc = [0xff0000, 0xff6f00, 0xffcc00, 0xbfff00, 0x22ff00, 0x00ff95, 0x00f7ff, 0x0084ff, 0x002fff, 0x6f00ff, 0xc300ff, 0xff00cc, 0xff0059];
                                this.data.posLight = 0;
                                if (this.data.lightC) {
                                    this.data.lightfunc = setInterval(function() {
                                        if (this.data.lightC) {
                                            let data = {
                                                loc17: true,
                                                id: 1,
                                                sid: 20,
                                                active: true,
                                                lightEffectColor: this.data.lightc[this.data.posLight],
                                                map: true
                                            };
                                            let fx_save = this.writeUserFXChange(20, data);
                                            this.fxUser[20] = fx_save;
                                            this.data.posLight = (this.data.posLight + 1) % this.data.lightc.length;
                                        }
                                    }.bind(this), 100);
                                } else {
                                    clearInterval(this.data.lightfunc);
                                    delete this.fxUser[20];
                                    let data = {
                                        loc17: true,
                                        id: 1,
                                        sid: 20,
                                        active: false,
                                        lightEffectColor: this.data.lightc[this.data.posLight],
                                        map: true
                                    };
                                    this.writeUserFXChange(20, data);
                                }
                                return;
                            }
                        }
                        if (commandes[0] == "?clear") {
                            let map = this.map.maps[this.mapId];
                            for (var i in map.objectList) {
                                var obj = map.objectList[i];
                                if (Object.keys(obj).length >= 2) {
                                    if (obj[3][0] != 33) {
                                        let id = this.writeMapFXChange({
                                            id: obj[0],
                                            sid: obj[1],
                                            active: false,
                                            data: obj[3],
                                            map: true,
                                            close: 1
                                        });
                                        map.delete(id);
                                        map.delete(i);
                                    }
                                }
                            }
                        }
                        if (commandes[0] == "?size" && commandes[1] != "") {
                            let p = new SocketMessage();
                            p.bitWriteBoolean(true);
                            p.bitWriteUnsignedInt(6, 13);
                            p.bitWriteSignedInt(9, parseInt(commandes[1]));
                            p.bitWriteBoolean(false);
    
                            this.fxUser[18251] = this.writeUserFXChange(18250, {
                                loc17: true,
                                id: 4,
                                sid: 16,
                                active: true,
                                data: p,
                                map: true
                            });
                        }
                        if (commandes[0] == '?color') {
                            if (!this.data.lightC) this.data.lightC = false;
                            this.data.lightC = !this.data.lightC;
                            this.data.lightc = [0xff0000, 0xff6f00, 0xffcc00, 0xbfff00, 0x22ff00, 0x00ff95, 0x00f7ff, 0x0084ff, 0x002fff, 0x6f00ff, 0xc300ff, 0xff00cc, 0xff0059];
                            this.data.posLight = 0;
                            if (this.data.lightC) {
                                this.data.lightfunc = setInterval(function() {
                                    if (this.data.lightC) {
                                        let data = {
                                            loc17: true,
                                            id: 1,
                                            sid: 20,
                                            active: true,
                                            lightEffectColor: this.data.lightc[this.data.posLight],
                                            map: true
                                        };
                                        let fx_save = this.writeUserFXChange(20, data);
                                        this.fxUser[20] = fx_save;
                                        this.data.posLight = (this.data.posLight + 1) % this.data.lightc.length;
                                    }
                                }.bind(this), 100);
                            } else {
                                clearInterval(this.data.lightfunc);
                                delete this.fxUser[20];
                                let data = {
                                    loc17: true,
                                    id: 1,
                                    sid: 20,
                                    active: false,
                                    lightEffectColor: this.data.lightc[this.data.posLight],
                                    map: true
                                };
                                this.writeUserFXChange(20, data);
                            }
                            return;
                        }
                    }
                    if (commandes[0] == '?brillen') {
                       if (!this.data.lightC) this.data.lightC = false;
                       this.data.lightC = !this.data.lightC;
                       this.data.lightc = [0x000000];
                       this.data.posLight = 0;
                       if (this.data.lightC) {
                           this.data.lightfunc = setInterval(function() {
                               if (this.data.lightC) {
                                   let data = {
                                       loc17: true,
                                       id: 1,
                                       sid: 20,
                                       active: true,
                                       lightEffectColor: this.data.lightc[this.data.posLight],
                                       map: true
                                   };
                                   let fx_save = this.writeUserFXChange(20, data);
                                   this.fxUser[20] = fx_save;
                                   this.data.posLight = (this.data.posLight + 1) % this.data.lightc.length;
                               }
                           }.bind(this), 100);
                       } else {
                           clearInterval(this.data.lightfunc);
                           delete this.fxUser[20];
                           let data = {
                               loc17: true,
                               id: 1,
                               sid: 20,
                               active: false,
                               lightEffectColor: this.data.lightc[this.data.posLight],
                               map: true
                           };
                           this.writeUserFXChange(20, data);
                       }
                       return;
                   } if (commandes[0] == '?brillep') {
                       if (!this.data.lightC) this.data.lightC = false;
                       this.data.lightC = !this.data.lightC;
                       this.data.lightc = [0xf702e3];
                       this.data.posLight = 0;
                       if (this.data.lightC) {
                           this.data.lightfunc = setInterval(function() {
                               if (this.data.lightC) {
                                   let data = {
                                       loc17: true,
                                       id: 1,
                                       sid: 20,
                                       active: true,
                                       lightEffectColor: this.data.lightc[this.data.posLight],
                                       map: true
                                   };
                                   let fx_save = this.writeUserFXChange(20, data);
                                   this.fxUser[20] = fx_save;
                                   this.data.posLight = (this.data.posLight + 1) % this.data.lightc.length;
                               }
                           }.bind(this), 100);
                       } else {
                           clearInterval(this.data.lightfunc);
                           delete this.fxUser[20];
                           let data = {
                               loc17: true,
                               id: 1,
                               sid: 20,
                               active: false,
                               lightEffectColor: this.data.lightc[this.data.posLight],
                               map: true
                           };
                           this.writeUserFXChange(20, data);
                       }
                       return;
                   } if (commandes[0] == '?brilleo') {
                       if (!this.data.lightC) this.data.lightC = false;
                       this.data.lightC = !this.data.lightC;
                       this.data.lightc = [0xfc6603];
                       this.data.posLight = 0;
                       if (this.data.lightC) {
                           this.data.lightfunc = setInterval(function() {
                               if (this.data.lightC) {
                                   let data = {
                                       loc17: true,
                                       id: 1,
                                       sid: 20,
                                       active: true,
                                       lightEffectColor: this.data.lightc[this.data.posLight],
                                       map: true
                                   };
                                   let fx_save = this.writeUserFXChange(20, data);
                                   this.fxUser[20] = fx_save;
                                   this.data.posLight = (this.data.posLight + 1) % this.data.lightc.length;
                               }
                           }.bind(this), 100);
                       } else {
                           clearInterval(this.data.lightfunc);
                           delete this.fxUser[20];
                           let data = {
                               loc17: true,
                               id: 1,
                               sid: 20,
                               active: false,
                               lightEffectColor: this.data.lightc[this.data.posLight],
                               map: true
                           };
                           this.writeUserFXChange(20, data);
                       }
                       return;
                   } if (commandes[0] == '?brilleb') {
                       if (!this.data.lightC) this.data.lightC = false;
                       this.data.lightC = !this.data.lightC;
                       this.data.lightc = [0x030bfc];
                       this.data.posLight = 0;
                       if (this.data.lightC) {
                           this.data.lightfunc = setInterval(function() {
                               if (this.data.lightC) {
                                   let data = {
                                       loc17: true,
                                       id: 1,
                                       sid: 20,
                                       active: true,
                                       lightEffectColor: this.data.lightc[this.data.posLight],
                                       map: true
                                   };
                                   let fx_save = this.writeUserFXChange(20, data);
                                   this.fxUser[20] = fx_save;
                                   this.data.posLight = (this.data.posLight + 1) % this.data.lightc.length;
                               }
                           }.bind(this), 100);
                       } else {
                           clearInterval(this.data.lightfunc);
                           delete this.fxUser[20];
                           let data = {
                               loc17: true,
                               id: 1,
                               sid: 20,
                               active: false,
                               lightEffectColor: this.data.lightc[this.data.posLight],
                               map: true
                           };
                           this.writeUserFXChange(20, data);
                       }
                       return;
                   } if (commandes[0] == '?briller') {
                       if (!this.data.lightC) this.data.lightC = false;
                       this.data.lightC = !this.data.lightC;
                       this.data.lightc = [0xfc1703];
                       this.data.posLight = 0;
                       if (this.data.lightC) {
                           this.data.lightfunc = setInterval(function() {
                               if (this.data.lightC) {
                                   let data = {
                                       loc17: true,
                                       id: 1,
                                       sid: 20,
                                       active: true,
                                       lightEffectColor: this.data.lightc[this.data.posLight],
                                       map: true
                                   };
                                   let fx_save = this.writeUserFXChange(20, data);
                                   this.fxUser[20] = fx_save;
                                   this.data.posLight = (this.data.posLight + 1) % this.data.lightc.length;
                               }
                           }.bind(this), 100);
                       } else {
                           clearInterval(this.data.lightfunc);
                           delete this.fxUser[20];
                           let data = {
                               loc17: true,
                               id: 1,
                               sid: 20,
                               active: false,
                               lightEffectColor: this.data.lightc[this.data.posLight],
                               map: true
                           };
                           this.writeUserFXChange(20, data);
                       }
                       return;
                   }
                   if (commandes[0] == "?tp") {
                       let mapId = -1;
                       switch (commandes[1]) {
                           case 'nml':
                               mapId = 60;
                               break;
                           case 'accueil':
                               mapId = 9;
                               break;
                           default:
                               mapId = -1;
                       }
                       if (mapId != -1) {
                           let user = this;
                           if (commandes[2]) user = this.getUserByPseudo(commandes[2]);
                           if (!user) return this.sendMsg("[error] Utilisateur inconnu ou non connecté (" + commandes[2] + ")");;
                           let camera = user.cameraList.getCameraByMap(user.mapId);
                           for (var i in camera) user.teleportToMap(camera[i], mapId, user.serverId, 4);
                           return;
                       }
                       this.sendMsg("[error] Map inconnue (" + commandes[1] + ")");
                       return;
                   }
                   if(commandes[0] == "?bring"){
                       let pseudo = commandes[1];
                       let user = this.getUserByPseudo(pseudo);
                       if (user)
                       {
                           let camera = user.cameraList.getCameraByMap(user.mapId);

                           for (var i in camera)
                               user.teleportToMap(camera[i], this.mapId, this.serverId, 4);
                           return;
                       }
                   }
                   if(commandes[0] == "?goto"){
                    let pseudo = commandes[1];
                    if (commandes[1]) {
                        let needgotothisuser = this.getUserByPseudo(pseudo);
                        if (needgotothisuser && this.grade >= 200) {
                            let camera = this.cameraList.getCameraByMap(this.mapId);
                            for (var i in camera) this.teleportToMap(camera[i], needgotothisuser.mapId, this.serverId, 4);
                        }
                    }
                    return;
                }
                   if (commandes[0] == "!tp") {
                       let camera = this.cameraList.getCameraByMap(this.mapId);
                       for (var i in camera) this.teleportToMap(camera[i], parseInt(commandes[1]), this.serverId, 4);
                       return;
                       }
                   if (commandes[0] == "!clan") {
                       if (commandes.length <= 1) {
                           this.sendMsg("Merci de renter la nom du clan.\nExemple : !clan oui");
                           return;
                       }
   
                       let clan = commandes[1];
                       if (clan.length <= 0) {
                           this.sendMsg("Le clan rentré n'est pas valide. (" + clan + ")");
                       } else if (clan.length > 4) {
                           this.sendMsg("Le clan rentré n'est pas valide. [trop long] (" + clan + ")");
                       } else {
   
                           this.setClan(clan);
                       }
                       return;
                   } 
               }
               if(commandes[0] == "!Help") {
                packet = new SocketMessage(5, 11, this);
                packet.bitWriteBoolean(true); //html
                packet.bitWriteBoolean(false); //alerte
                packet.bitWriteString(`<font color="#424242"><font color="#000">[INFO] </font> Blablaland.js <font color="#0f0f0f">Commandes de Tp : !Spaciale !Arkadev !HallLunaire !SkyAlternaty !Nullis !Bar !Sentier </font></font>`);
                this.send(packet);
            }
            if (commandes[0] == "!Noel") {
                packet = new SocketMessage(5, 11, this);
                packet.bitWriteBoolean(true); //html
                packet.bitWriteBoolean(false); //alerte
                packet.bitWriteString(`<font color="#22ff00"><font color="#0053ff">[INFO] </font> Blablaland.js <font color="#fb0000">Commandes de Noel : !NoelSkin !NoelBrillance </font></font>`);
                this.send(packet);
            }
            if (commandes[0] == "!NoelSkin"){
                if (this.mainUser.skinId != 111) {
                    let oldId = this.mainUser.skinId;
                    this.reloadSkin(111);
                    let p = new SocketMessage();
                    p.bitWriteBoolean(true);
                    p.bitWriteUnsignedInt(6, 13);
                    p.bitWriteSignedInt(9, 80);
                    p.bitWriteBoolean(false);
                    this.fxUser[18251] = this.writeUserFXChange(18250, {
                        loc17: true,
                        id: 4,
                        sid: 16,
                        active: true,
                        data: p,
                        map: true
                    });
                    setTimeout(function() {
                        let p = new SocketMessage();
                        p.bitWriteBoolean(true);
                        p.bitWriteUnsignedInt(6, 13);
                        p.bitWriteSignedInt(9, 0);
                        p.bitWriteBoolean(false);
                        this.fxUser[18251] = this.writeUserFXChange(18250, {
                            loc17: true,
                            id: 4,
                            sid: 16,
                            active: true,
                            data: p,
                            map: true
                        });
                        this.reloadSkin(oldId);
                    }.bind(this), 60 * 1000);
                }
            }
            if (commandes[0] == "!NoelBrillance"){
                if (!this.data.lightC) this.data.lightC = false;
                        this.data.lightC = !this.data.lightC;
                        this.data.lightc = [0x03fc17, 0xfc1703, 0x1703fc, 0xfffa00];
                        this.data.posLight = 0;
                        if (this.data.lightC) {
                            this.data.lightfunc = setInterval(function() {
                                if (this.data.lightC) {
                                    let data = {
                                        loc17: true,
                                        id: 1,
                                        sid: 20,
                                        active: true,
                                        lightEffectColor: this.data.lightc[this.data.posLight],
                                        map: true
                                    };
                                    let fx_save = this.writeUserFXChange(20, data);
                                    this.fxUser[20] = fx_save;
                                    this.data.posLight = (this.data.posLight + 1) % this.data.lightc.length;
                                }
                            }.bind(this), 500);
                        } else {
                            clearInterval(this.data.lightfunc);
                            delete this.fxUser[20];
                            let data = {
                                loc17: true,
                                id: 1,
                                sid: 20,
                                active: false,
                                lightEffectColor: this.data.lightc[this.data.posLight],
                                map: true
                            };
                            this.writeUserFXChange(20, data);
                        }
                        return;
            }
                if (commandes[0] == "!Spaciale") {
                    if (this.IsMapSpacial()) {
                        let camera = this.cameraList.getCameraByMap(this.mapId);
                         for (var i in camera) this.teleportToMap(camera[i], 9, this.serverId, 4);
                    }
                    else {
                        let camera = this.cameraList.getCameraByMap(this.mapId);
                         for (var i in camera) this.teleportToMap(camera[i], 544, this.serverId, 4);
                         packet = new SocketMessage(5, 11, this);
                         packet.bitWriteBoolean(true); //html
                         packet.bitWriteBoolean(false); //alerte
                         packet.bitWriteString(`<font color="#424242"><font color="#000">[INFO] </font> Blablaland.js <font color="#0f0f0f">Map par Rastaman#5195</font></font>`);
                         this.send(packet);
                    }
                } 
                if (commandes[0] == "!Nullis") {
                    if (this.IsMapTerreNullis()) {
                        let camera = this.cameraList.getCameraByMap(this.mapId);
                         for (var i in camera) this.teleportToMap(camera[i], 9, this.serverId, 4);
                    }
                    else {
                        let camera = this.cameraList.getCameraByMap(this.mapId);
                         for (var i in camera) this.teleportToMap(camera[i], 721, this.serverId, 4);
                    }
                } 
                if (commandes[0] == "!HallLunaire") {
                    if (this.IsMapHallLunaire()) {
                        let camera = this.cameraList.getCameraByMap(this.mapId);
                         for (var i in camera) this.teleportToMap(camera[i], 9, this.serverId, 4);
                    }
                    else {
                        let camera = this.cameraList.getCameraByMap(this.mapId);
                         for (var i in camera) this.teleportToMap(camera[i], 722, this.serverId, 4);
                    }
                } 
                if (commandes[0] == "!Bar") {
                    if (this.IsMapBar()) {
                        let camera = this.cameraList.getCameraByMap(this.mapId);
                         for (var i in camera) this.teleportToMap(camera[i], 9, this.serverId, 4);
                    }
                    else {
                        let camera = this.cameraList.getCameraByMap(this.mapId);
                         for (var i in camera) this.teleportToMap(camera[i], 711, this.serverId, 4);
                    }
                } 
                if (commandes[0] == "!Sentier") {
                    if (this.IsMapSentierPaisible()) {
                        let camera = this.cameraList.getCameraByMap(this.mapId);
                         for (var i in camera) this.teleportToMap(camera[i], 9, this.serverId, 4);
                    }
                    else {
                        let camera = this.cameraList.getCameraByMap(this.mapId);
                         for (var i in camera) this.teleportToMap(camera[i], 800, this.serverId, 4);
                    }
                }
                if (commandes[0] == "!SkyAlternaty") {
                    if (this.IsMapSkyAlternaty()) {
                        let camera = this.cameraList.getCameraByMap(this.mapId);
                         for (var i in camera) this.teleportToMap(camera[i], 9, this.serverId, 4);
                    }
                    else {
                        let camera = this.cameraList.getCameraByMap(this.mapId);
                         for (var i in camera) this.teleportToMap(camera[i], 806, this.serverId, 4);
                    }
                }
                if (commandes[0] == "!Arkadev") {
                    if (this.IsMapArkadev()) {
                        let camera = this.cameraList.getCameraByMap(this.mapId);
                         for (var i in camera) this.teleportToMap(camera[i], 9, this.serverId, 4);
                    }
                    else {
                        let camera = this.cameraList.getCameraByMap(this.mapId);
                         for (var i in camera) this.teleportToMap(camera[i], 911, this.serverId, 4);
                         packet = new SocketMessage(5, 11, this);
                         packet.bitWriteBoolean(true); //html
                         packet.bitWriteBoolean(false); //alerte
                         packet.bitWriteString(`<font color="#424242"><font color="#000">[INFO] </font> Blablaland.js <font color="#0f0f0f">Map par Seah#6186</font></font>`);
                         this.send(packet);
                    }
                   
                }
                if (!this.getFlood()) return;
                for (var i in this.server.conf.data.POURSUITE) {
                    if (this.server.conf.data.POURSUITE[i][1] == this.pseudo) {
                        let p = new SocketMessage(7, 3);
                        p.bitWriteUnsignedInt(32, 0);
                        p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, this.uid);
                        p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, 0);
                        p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, this.pid);
                        p.bitWriteUnsignedInt(GlobalProperties.BIT_SERVER_ID, this.serverId);

                        p.bitWriteBoolean(false);
                        p.bitWriteBoolean(false);
                        p.bitWriteUnsignedInt(3, this.sex);
                        p.bitWriteString(text);
                        try {
                            this.server.conf.data.POURSUITE[i][0].send(p);
                        } catch (e) {}
                    }
                }
                let badword = this.server.conf.badword;
                for (let word in badword) {
                    if (text.includes(word) && badword[word][2]) {
                        for (var b in this.server.userList) {
                            let client = this.server.userList[b];
                            if (client.isConsole) {
                                let p = new SocketMessage(6, 9);
                                p.bitWriteUnsignedInt(32, 0);
                                p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, this.uid);
                                p.bitWriteString(this.pseudo);
                                p.bitWriteUnsignedInt(7, badword[word][0]);
                                p.bitWriteString(text);
                                client.send(p);
                                if (badword[word][5]) text = text.replace(word, badword[word][1]);
                                if (badword[word][6]) text = badword[word][1];
                            }
                        }
                    }
                }
                packet = new SocketMessage(5, 7, this);
                packet.bitWriteBoolean(false); //html
                packet.bitWriteBoolean(false); //modo
                packet.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, this.pid);
                packet.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, this.uid);
                packet.bitWriteUnsignedInt(3, this.sex);
                packet.bitWriteString(this.pseudo);
                packet.bitWriteUnsignedInt(GlobalProperties.BIT_SERVER_ID, this.serverId);
                packet.bitWriteString(text);
                packet.bitWriteUnsignedInt(3, action);
                this.map.maps[this.mapId].sendAll(packet, null, this);
                this.updateDodo(false);
            } else if (stype == 5) {
                //patch here 
              //  if(!user.uid) { return; }
                let pseudo = loc5.bitReadString();
                text = loc5.bitReadString();
                let user = this.getUserByPseudo(pseudo);
                if (this.mapId == 10) return;
                if (user) {
                    for (var i in this.server.conf.data.POURSUITE) {
                        if (this.server.conf.data.POURSUITE[i][1] == this.pseudo) {
                            let p = new SocketMessage(7, 5);
                            p.bitWriteUnsignedInt(32, 0);
                            p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, this.uid);
                            p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, 0);
                            p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, this.pid);
                            p.bitWriteUnsignedInt(GlobalProperties.BIT_SERVER_ID, this.serverId);

                            p.bitWriteBoolean(false);
                            p.bitWriteBoolean(false);
                            p.bitWriteBoolean(false);
                            p.bitWriteString(user.pseudo);
                            p.bitWriteString(text);
                            try {
                                this.server.conf.data.POURSUITE[i][0].send(p);
                            } catch (e) {}
                        }
                    }
                    for (var i in this.server.conf.data.POURSUITE) {
                        if (this.server.conf.data.POURSUITE[i][1] == user.pseudo) {
                            let p = new SocketMessage(7, 5);
                            p.bitWriteUnsignedInt(32, 0);
                            p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, user.uid);
                            p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, 0);
                            p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, user.pid);
                            p.bitWriteUnsignedInt(GlobalProperties.BIT_SERVER_ID, user.serverId);

                            p.bitWriteBoolean(false);
                            p.bitWriteBoolean(false);
                            p.bitWriteBoolean(true);
                            p.bitWriteString(this.pseudo);
                            p.bitWriteString(text);
                            try {
                                this.server.conf.data.POURSUITE[i][0].send(p);
                            } catch (e) {}
                        }
                    }
                    let badword = this.server.conf.badword;
                    for (let word in badword) {
                        if (text.includes(word) && badword[word][3]) {
                            for (var b in this.server.userList) {
                                let client = this.server.userList[b];
                                if (client.isConsole) {
                                    let p = new SocketMessage(6, 9);
                                    p.bitWriteUnsignedInt(32, 0);
                                    p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, this.uid);
                                    p.bitWriteString(this.pseudo);
                                    p.bitWriteUnsignedInt(7, badword[word][0]);
                                    p.bitWriteString(text);
                                    client.send(p);
                                    if (badword[word][5]) text = text.replace(word, badword[word][1]);
                                    if (badword[word][6]) text = badword[word][1];
                                }
                            }
                        }
                    }
                    let p = new SocketMessage(1, 5);
                    p.bitWriteBoolean(true);
                    p.bitWriteBoolean(false);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, this.pid);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, this.uid);
                    p.bitWriteString(this.pseudo);
                    p.bitWriteString(text);
                    user.send(p);
                } else {
                    this.sendMsg(`${pseudo} n'est pas connecté.`);
                }
            } else if (stype == 8) {
                var packId = loc5.bitReadUnsignedInt(GlobalProperties.BIT_SMILEY_PACK_ID);
                var smileId = loc5.bitReadUnsignedInt(GlobalProperties.BIT_SMILEY_ID);
                var data = loc5.bitReadBinaryData();
                var playcallback = loc5.bitReadBoolean();
                if (!this.getFlood()) return;
                packet = new SocketMessage(5, 8, this);
                packet.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, this.pid);
                packet.bitWriteUnsignedInt(GlobalProperties.BIT_SMILEY_PACK_ID, packId);
                packet.bitWriteUnsignedInt(GlobalProperties.BIT_SMILEY_ID, smileId);
                packet.bitWriteBinaryData(data);
                this.map.maps[this.mapId].sendAll(packet, this);
                this.updateDodo(false);
            } else if (stype == 7) {
                this.updateDodo(true);
            } else if (stype == 9) {
                var msg = loc5.bitReadString();
                var methode = loc5.bitReadUnsignedInt(8);
                this.die(msg, methode);
            } else if (stype == 10) {
                this.mainUser.position.y = 5000;
                this.mainUser.position.x = 35000;
                if (this.mapId in respawn) {
                    this.mainUser.position.x = respawn[this.mapId][0];
                    this.mainUser.position.y = respawn[this.mapId][1];
                }
                this.mainUser.underWater = false;
                this.mainUser.grimpe = false;
                this.mainUser.accroche = false;
                this.mainUser.speed.x = 0;
                this.mainUser.speed.y = 0;
                this.reloadPlayerState();
            } else if (stype == 16) {
                /*const folder = ["skin", "fx", "map", "smiley"];
                const name = ["skin.swf", "fx.swf", "map.swf", "SmileyPack.swf"]
                const type = loc5.bitReadUnsignedInt(4) - 1;
                const id = loc5.bitReadUnsignedInt(32);
                const byteReceveid = loc5.bitReadUnsignedInt(32);
                if (!fs.existsSync(`site-web/data/${folder[type]}/${id}/`) && type != 4) {
                    this.sendError("Les fichiers clients ne sont pas valide.");
                    return;
                }
                if (type == 4) {
                    console.log(id, byteReceveid);
                    if (id != 458595 && byteReceveid != 10754) {
                        this.sendError("Les fichiers clients ne sont pas valide.");
                    } else {
                        this.externalLoaded = true;
                        setTimeout(function () {
                            if (!this.data.EXTERNAL_OK) this.sendError("Les fichiers clients ne sont pas valide.");
                        }.bind(this), 20 * 1000);
                    }
                    return;
                }
                const file = fs.readFileSync(`site-web/data/${folder[type]}/${id}/${name[type]}`);
                zlib.inflate(file.slice(8), function (err, buf) {
                    var data = Buffer.from(file.slice(0, 8));
                    const unzip = Buffer.concat([data, buf]);
                    var byte = 0;
                    for (var loc4 = 0; loc4 < unzip.length - 8; loc4 += 5) {
                        byte = byte + loc4 * unzip[loc4 + 8];
                    }
                    byte = ToUint32(byte);
                    if (byte != byteReceveid) this.sendError("Les fichiers clients ne sont pas valide.");
                }.bind(this));*/
            } else if (stype == 18) {
                var id = loc5.bitReadUnsignedInt(32);
                if (id == this.chatBuffer.id) {
                    this.allowChat = true;
                    /*const chat = fs.readFileSync(`site-web/chat/chat.swf`);
                    try {
                        zlib.inflate(chat.slice(8), function(err, buf) {
                            var data = Buffer.from(chat.slice(0, 8));
                            const unzip = Buffer.concat([data, buf]);
                            for (var loc19 = 0; loc19 < this.chatBuffer.size; loc19++) {
                                const loc20 = (loc19 + this.chatBuffer.position) % (unzip.length - 8);
                                this.allowChat = true;
                                if (unzip[loc20 + 8] != loc5.bitReadUnsignedInt(8)) {
                                    //this.sendError("Les fichiers clients ne sont pas valide.");
                                    return;
                                }
                            }
                        }.bind(this));
                    } catch (e) { this.sendError("Aie, une erreur est survenue [CODE : #001]"); }*/
                } else this.sendError("Les fichiers clients ne sont pas valide.");
            } else if (stype == 21) {
                this.data.EXTERNAL_OK = "ok";
                /*let token = loc5.bitReadString(), id = loc5.bitReadString();
                try {
                    if (this.server.conf.data.external[id][1] != token || !this.externalLoaded) {
                        this.sendError("Une erreur est survenu.");
                    } else {
                        this.data.EXTERNAL_OK = "ok";
                    }
                } catch (e) { this.sendError("Une erreur est survenu."); }*/
            }
        } else if (type == 2) {
            if (stype == 2 || stype == 1) {
                if (!this.mapLoaded) return;
                var mapId = loc5.bitReadUnsignedInt(GlobalProperties.BIT_MAP_ID);
                var GP_Timer = loc5.bitReadUnsignedInt(32);
                this.GPTimer = GP_Timer;
                this.readPlayerState(loc5);
                if (stype == 2) {
                    packet = new SocketMessage(5, 4, this);
                    packet.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, this.pid);
                    packet.bitWriteUnsignedInt(32, GP_Timer);
                    packet = this.writePlayerState(packet, true, true, true, false);
                    packet.bitWriteUnsignedInt(2, loc5.bitReadUnsignedInt(2));
                    packet.bitWriteUnsignedInt(24, loc5.bitReadUnsignedInt(24));
                    packet.bitWriteUnsignedInt(8, loc5.bitReadUnsignedInt(8));
                    packet.bitWriteSignedInt(18, loc5.bitReadSignedInt(18));
                    packet.bitWriteSignedInt(18, loc5.bitReadSignedInt(18));
                } else {
                    this.updateDodo(false);
                    packet = new SocketMessage(5, 3, this);
                    packet.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, this.pid);
                    packet.bitWriteUnsignedInt(32, GP_Timer);
                    packet = this.writePlayerState(packet, true, true, true, false);
                }
                this.map.maps[this.mapId].sendAll(packet, this, this);
                this.socketUnlock();
                if (!this.allowChat) this.sendError("Erreur chat");
            } else if (stype == 4) {
                const app_id = loc5.bitReadUnsignedInt(5);
                if (app_id == 1) {
                    this.sendMsg("Les couleurs du chat on été correctement modifié.");
                }
            } else if (stype == 10) {
                let userId = loc5.bitReadUnsignedInt(GlobalProperties.BIT_USER_ID),
                    message = loc5.bitReadString(),
                    user = this.getUserByUid(userId);
                if (user.grade >= 200) {
                    let p = new SocketMessage(7, 3);
                    p.bitWriteUnsignedInt(32, 0);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, this.uid);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, 0);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, this.pid);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_SERVER_ID, this.serverId);

                    p.bitWriteBoolean(true);
                    p.bitWriteBoolean(true);
                    p.bitWriteUnsignedInt(3, this.sex);
                    p.bitWriteString(message);
                    user.send(p);
                }
            } else if (stype == 3) {
                let grade1 = loc5.bitReadUnsignedInt(GlobalProperties.BIT_GRADE),
                    grade2 = loc5.bitReadUnsignedInt(GlobalProperties.BIT_GRADE),
                    p = new SocketMessage(2, 3);
                p.bitWriteUnsignedInt(GlobalProperties.BIT_ERROR_ID, this.grade >= 200 ? 0 : 1);
                this.send(p);
                if (this.grade >= 200) {
                    this.server.console[this.pid] = this;
                    this.server.addClient(this);
                    this.isConsole = true;
                    this.cameraList.clear();
                    let p = new SocketMessage(6, 2);
                    for (var i in this.server.userList) {
                        let client = this.server.userList[i];
                        if (client.isConsole) {
                            p.bitWriteBoolean(true);
                            p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, client.pid);
                            p.bitWriteUnsignedInt(GlobalProperties.BIT_GRADE, client.grade);
                            p.bitWriteString(client.pseudo);
                            p.bitWriteString(client.pseudo);
                            p.bitWriteUnsignedInt(GlobalProperties.BIT_GRADE, client.grade);
                        }
                    }
                    p.bitWriteBoolean(false);
                    this.send(p);
                    p = new SocketMessage(6, 4);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, this.pid);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_GRADE, this.grade);
                    p.bitWriteString(this.pseudo);
                    p.bitWriteString(this.pseudo);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_GRADE, this.grade);
                    for (var i in this.server.userList) {
                        let client = this.server.userList[i];
                        if (client == this) break;
                        client.send(p);
                    }
                }
            }
        } else if (type == 6) {
            if (!this.mapLoaded) return;
            var skinColor = [];
            if (stype == 1) {
                for (const x of Array(10).keys()) {
                    skinColor.push(loc5.bitReadUnsignedInt(8));
                }
                let n_color = this.writeUserFXChange(7600, {
                    loc17: true,
                    id: 3,
                    sid: 7600,
                    active: true,
                    data: skinColor,
                    map: true
                });
                this.fxUser[7600] = n_color;
            } else if (stype == 4) {
                let fx_id = loc5.bitReadUnsignedInt(GlobalProperties.BIT_FX_ID),
                    ssid = loc5.bitReadUnsignedInt(GlobalProperties.BIT_FX_OID),
                    posX = loc5.bitReadSignedInt(17),
                    posY = loc5.bitReadSignedInt(17),
                    mouseX = loc5.bitReadSignedInt(17),
                    mouseY = loc5.bitReadSignedInt(17),
                    map = this.map.maps[this.mapId],
                    p = new SocketMessage();
                p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, this.pid);
                p.bitWriteUnsignedInt(GlobalProperties.BIT_FX_ID, fx_id);
                p.bitWriteUnsignedInt(GlobalProperties.BIT_FX_OID, ssid);
                p.bitWriteSignedInt(17, posX);
                p.bitWriteSignedInt(17, posY);
                p.bitWriteSignedInt(17, mouseX);
                p.bitWriteSignedInt(17, mouseY);
                let data = {
                        id: 2,
                        sid: map.objectPid,
                        active: true,
                        data: p,
                        map: true,
                        close: 1
                    },
                    id = this.writeMapFXChange(data);
                map.delete(id);
            } else if (stype == 5) {
                let pid = loc5.bitReadUnsignedInt(GlobalProperties.BIT_USER_PID),
                    fx_id = loc5.bitReadUnsignedInt(GlobalProperties.BIT_FX_ID),
                    fx_sid = loc5.bitReadUnsignedInt(GlobalProperties.BIT_FX_SID),
                    ssid = loc5.bitReadUnsignedInt(GlobalProperties.BIT_FX_OID),
                    posX = loc5.bitReadSignedInt(17),
                    posY = loc5.bitReadSignedInt(17),
                    jsp = loc5.bitReadBoolean(),
                    map = this.map.maps[this.mapId],
                    p = new SocketMessage();
                p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, pid);
                p.bitWriteUnsignedInt(GlobalProperties.BIT_FX_ID, fx_id);
                p.bitWriteUnsignedInt(GlobalProperties.BIT_FX_OID, ssid);
                p.bitWriteSignedInt(17, posX);
                p.bitWriteSignedInt(17, posY);
                p.bitWriteBoolean(jsp);
                let data = {
                        id: 3,
                        sid: map.objectPid,
                        active: true,
                        data: p,
                        map: true,
                        close: 1
                    },
                    id = this.writeMapFXChange(data);
                map.delete(id);
            } else if (stype == 6 || stype == 7) {   //Night war  
                let activ = (stype == 6) ? 1 : 0,
                    fxSid = loc5.bitReadUnsignedInt(GlobalProperties.BIT_FX_SID),
                    skinByte = loc5.bitReadUnsignedInt(32),
                    delay = loc5.bitReadBoolean(),
                    latence = loc5.bitReadBoolean(),
                    userActivity = loc5.bitReadBoolean(),
                    transmitSelfEvent = loc5.bitReadBoolean(),
                    duration = null,
                    persistant = null,
                    uniq = null,
                    hasDuration = null,
                    durationBlend = null;
                if (activ) {
                    persistant = loc5.bitReadBoolean();
                    uniq = loc5.bitReadBoolean();
                    durationBlend = loc5.bitReadUnsignedInt(2);
                    hasDuration = loc5.bitReadBoolean();
                    if (hasDuration) duration = loc5.bitReadUnsignedInt(16);
                }
                var hasData = loc5.bitReadBoolean();
                var data = null;
                if (hasData) {
                    data = loc5.bitReadBinaryData();
                }
                var skinAction = loc5.bitReadUnsignedInt(GlobalProperties.BIT_SKIN_ACTION);
                let fx_data = {
                        loc17: true,
                        id: 5,
                        sid: fxSid,
                        active: activ,
                        data: hasData ? [skinByte, delay, data] : [skinByte, delay],
                        map: true
                    },
                    varToData = this.fxManager.writeUserFXChange(this, fx_data);
                if (!transmitSelfEvent) varToData.push(0);
                if (activ) {
                    if (hasDuration) {
                        setTimeout(function() {
                            fx_data.active = false;
                            delete this.fxUser[fxSid];
                            this.fxManager.writeUserFXChange(this, fx_data);
                        }.bind(this), duration * 1000);
                    }
                }
                if (uniq) this.fxUser[1000 + fxSid] = varToData;
                if (!activ) delete this.fxUser[1000 + fxSid];
            } 
            
            if (stype == 9) { //Revert back to old skin night wars
                
            }
            
            
            else if (stype ==10){
				let fx_id = loc5.bitReadUnsignedInt(GlobalProperties.BIT_FX_ID);
                if (fx_id == 16) { //Change skin under explosion or attacks 
                    let userId = loc5.bitReadUnsignedInt(GlobalProperties.BIT_USER_ID);
                    if (this.mainUser.skinId != 484) {
                        let oldId = this.mainUser.skinId;
                        this.reloadSkin(484);
                        setTimeout(function() {
                            this.reloadSkin(oldId);
                        }.bind(this), 15 * 1000);
                    }
                }


            } else if (stype == 11) {
                let fx_id = loc5.bitReadUnsignedInt(GlobalProperties.BIT_FX_SID),
                    map = this.map.maps[this.mapId];
                if (!map.data.KDO) return;
                if (fx_id in map.data.KDO) {
                    let id = this.writeMapFXChange({
                        id: 5,
                        sid: fx_id,
                        active: false,
                        data: [7, 1, new SocketMessage()],
                        map: true,
                        close: 1
                    });
                    map.delete(map.data.KDO[fx_id][0]);
                    map.delete(id);
                    if (map.data.KDO[fx_id][1] != 3) {
                        var p = new SocketMessage();
                        p.bitWriteUnsignedInt(GlobalProperties.BIT_FX_SID, fx_id);
                        p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, this.uid);
                        p.bitWriteUnsignedInt(8, map.data.KDO[fx_id][1]);
                        if (map.data.KDO[fx_id][2] == 2) p.bitWriteBoolean(map.data.KDO[fx_id][3]);
                        p.bitWriteString(`${map.data.KDO[fx_id][2]} BBL`);
                        this.bbl += map.data.KDO[fx_id][2];
                        this.server.database('UPDATE users SET bbl = ? WHERE login = ?', [this.bbl, this.login]);
                        this.writeUserFXChange(fx_id, {
                            loc17: true,
                            id: 6,
                            sid: fx_id,
                            active: true,
                            data: [7, 2, p],
                            map: true
                        });
                        this.send(new SocketMessage(2, 13));
                        if (map.data.KDO[fx_id][1] == 6) {
                            this.sendMsg(`${this.pseudo} vient de ramasser une étoile filante contenant 1 blabillon !!`, { ALL: true })
                        } else {
                            this.sendMsg(`${this.pseudo} vient de ramasser un cadeau contenant ${map.data.KDO[fx_id][2]} bbl :D`, { ALL: true })
                        }
                    } else {
                        this.sendMsg(`Cadeau piégé posé par ${map.data.KDO[fx_id][4]} ^^`, { ALL: true })
                    }
                }
            } else if (stype == 12) {
                const fx_id = loc5.bitReadUnsignedInt(4);
                const fx_sid = loc5.bitReadUnsignedInt(16);
                const user_id = loc5.bitReadUnsignedInt(GlobalProperties.BIT_USER_ID);
                const activ = loc5.bitReadBoolean();
                const floor = loc5.bitReadUnsignedInt(8);
                var user = this.getUserByUid(user_id);
                if (this.data.SHIELD) return;
                if (fx_id == 1) {
                    if (user_id == this.uid) {
                        this.die(" a été tué par sa propre bobombe :)");
                    } else if (user) {
                        this.die(" a été tué par une bobombe placé par " + user.pseudo);
                    } else {
                        this.die(" a été tué par une bobombe placé par un blablateur.");
                    }
                } else if (fx_id == 2) {
                    this.die(" s'est fait griller par un laser !!");
                }
            } else if (stype == 8) {
                if (this.mapId == 10) return;
                if (this.data.MANOIR || this.data.PYRAMIDE) return;
                if (this.data.CAN_USE_POWER) {
                    this.data.CAN_USE_POWER = false;
                } else {
                    return;
                }

                let reload_pouvoir = false,
                    objectId = loc5.bitReadUnsignedInt(32),
                    hasData = loc5.bitReadBoolean(),
                    binaryData = null;

                //if(!(objectId in this.pouvoirs) || this.pouvoirs[objectId].count <= 0) return;
                if (hasData) binaryData = loc5.bitReadBinaryData();
                
                if (objectId == 10000) {
                    if (this.grade >= 800) {
                    var p = new SocketMessage();
                    p.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0]);
                    var id = this.writeMapFXChange({
                        id: 5,
                        sid: objectId,
                        active: true,
                        data: [2, 1, p],
                        map: true
                    });
                    var map = this.map.maps[this.mapId];
                    setTimeout(function() {
                        map.delete(id);
                    }, 10000);
                }
                } else if (objectId == 10001) {
                    if (this.grade >= 800) {
                    var p = new SocketMessage();
                    p.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0]);
                    this.writeUserFXChange(objectId, {
                        loc17: true,
                        id: 6,
                        sid: objectId,
                        active: true,
                        data: [2, 2, p],
                        map: true
                    });
                    var _this = this;
                    setTimeout(function() {
                        _this.fxUser[objectId] = {};
                    }, 10000);
                }
            }  else if (objectId == 10002) {
                if (hasData) {
                    const tpId = binaryData.bitReadUnsignedInt(GlobalProperties.BIT_MAP_ID);
                    if (!([55, 446, 264, 251, 252, 253, 254, 255, 256].includes(tpId))) {
                        let camera = this.cameraList.getCameraByMap(this.mapId);
                        for (var i in camera) this.teleportToMap(camera[i], tpId, this.serverId, 4);
                        reload_pouvoir = true;
                    }
                }
            }
                else if (objectId == 10003) {
                    this.writeUserFXChange(7600, {
                        loc17: true,
                        id: 3,
                        sid: 7600,
                        active: false,
                        data: skinColor,
                        map: true
                    });
                    delete this.fxUser[7600];
                    this.fxManager.writeUserFXChange(this, {
                        loc17: true,
                        id: 6,
                        sid: objectId,
                        active: true,
                        data: [2, 4],
                        map: false
                    });
                } else if (objectId == 10340) {
                    if (hasData) {
                        if (this.server.variable.maps[this.mapId][6] == 3 || this.data.MAISON_ACTIF && this.data.MAISON_ACTIF.protectMode == 1 || this.mapId == 16 || this.mapId == 161 || this.mapId == 115) {
                            this.sendMsg("Cette map est protégée contre les Tonneaux ^^");
                            return;
                        }
                        const posX = binaryData.bitReadSignedInt(16);
                        const posY = binaryData.bitReadSignedInt(16);
                        const surface = binaryData.bitReadUnsignedInt(8);
                        const name = binaryData.bitReadString();
                        var p = new SocketMessage();
                        p.bitWriteSignedInt(16, posX);
                        p.bitWriteSignedInt(16, posY);
                        p.bitWriteUnsignedInt(8, surface);
                        p.bitWriteString(name);
                        p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, this.uid);
                        var data = {
                            id: 5,
                            sid: objectId,
                            active: true,
                            data: [48, objectId - 10000, p],
                            map: true,
                            close: 1
                        };
                        var id = this.writeMapFXChange(data);
                        var map = this.map.maps[this.mapId];
                        var _this = this;
                        setTimeout(function() {
                            data.active = false;
                            _this.fxManager.writeMapFXChange(_this, data);
                            map.delete(id);
                        }, parseInt(Math.random() * 15) * 1000);
                    }
                } else if ([10215, 10216, 10218, 10219, 10220, 10221].includes(objectId)) {
                    if (hasData) {
                        let userId = binaryData.bitReadUnsignedInt(GlobalProperties.BIT_USER_ID),
                            posX = binaryData.bitReadSignedInt(17),
                            posY = binaryData.bitReadSignedInt(17),
                            surface = binaryData.bitReadUnsignedInt(8),
                            name = binaryData.bitReadString(),
                            model = binaryData.bitReadUnsignedInt(5),
                            map = this.map.maps[this.mapId],
                            p = new SocketMessage();
                        if (!map.data.STATUS) map.data.STATUS = 0;
                        if (map.data.STATUS >= 4) {
                            this.sendMsg("Tu n'es limité qu'à 4 statues par map!");
                            return;
                        }
                        map.data.STATUS++;
                        p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, userId);
                        p.bitWriteSignedInt(17, posX);
                        p.bitWriteSignedInt(17, posY);
                        p.bitWriteUnsignedInt(8, surface);
                        p.bitWriteString(name);
                        p.bitWriteUnsignedInt(5, model);
                        p.bitWriteString(this.pseudo);
                        p.bitWriteUnsignedInt(10, 10);
                        p.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0] + 5 * 60);
                        var data = {
                            id: 5,
                            sid: objectId,
                            active: true,
                            data: [34, objectId - 10000, p],
                            map: true,
                            close: 1
                        };
                        var id = this.writeMapFXChange(data);
                        setTimeout(function() {
                            map.delete(id);
                            data.active = false;
                            this.fxManager.writeMapFXChange(this, data);
                            map.data.STATUS--;
                            if (map.data.STATUS < 0) map.data.STATUS = 0;
                        }.bind(this), 5 * 60 * 1000);
                    }
                } else if (objectId == 10004) {
                    if (hasData) {
                        if (this.server.variable.maps[this.mapId][6] == 3 || this.data.MAISON_ACTIF && this.data.MAISON_ACTIF.protectMode == 1 || this.mapId == 16 || this.mapId == 161 || this.mapId == 115) {
                            this.sendMsg("Cette map est protégée contre les bobombes ^^");
                            return;
                        }
                        const posX = binaryData.bitReadSignedInt(16);
                        const posY = binaryData.bitReadSignedInt(16);
                        const surface = binaryData.bitReadUnsignedInt(8);
                        const name = binaryData.bitReadString();
                        var p = new SocketMessage();
                        p.bitWriteSignedInt(16, posX);
                        p.bitWriteSignedInt(16, posY);
                        p.bitWriteUnsignedInt(8, surface);
                        p.bitWriteString(name);
                        p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, this.uid);
                        var data = {
                            id: 5,
                            sid: objectId,
                            active: true,
                            data: [2, 5, p],
                            map: true,
                            close: 1
                        };
                        var id = this.writeMapFXChange(data);
                        var map = this.map.maps[this.mapId];
                        var _this = this;
                        setTimeout(function() {
                            data.active = false;
                            _this.fxManager.writeMapFXChange(_this, data);
                            map.delete(id);
                        }, parseInt(Math.random() * 15) * 1000);
                    }
                } else if (objectId == 10005 || objectId == 10006) {
                    if (hasData) {
                        const pid = binaryData.bitReadUnsignedInt(GlobalProperties.BIT_USER_PID);
                        const posX = binaryData.bitReadSignedInt(16);
                        const posY = binaryData.bitReadSignedInt(16);
                        const name = binaryData.bitReadString();
                        var p = new SocketMessage();
                        p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, pid);
                        p.bitWriteSignedInt(16, posX);
                        p.bitWriteSignedInt(16, posY);
                        p.bitWriteString(name);
                        p.bitWriteString(this.pseudo);
                        let user = this.getUserByPid(pid);
                        if (user) p.bitWriteString(this.getUserByPid(pid).pseudo);
                        else p.bitWriteString("error");
                        p.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0]);
                        var data = {
                            id: 5,
                            sid: objectId,
                            active: true,
                            data: [2, 6 + (objectId == 10006 ? 20 : 0), p],
                            map: true,
                            close: 1
                        };
                        var id = this.writeMapFXChange(data);
                        var map = this.map.maps[this.mapId];
                        setTimeout(function() {
                            data.active = false;
                            this.fxManager.writeMapFXChange(this, data);
                            map.delete(id);
                        }.bind(this), 1000 * 60 * 60);
                    }
                } else if (objectId == 10007) {
                    if (hasData) {
                        const activ = binaryData.bitReadBoolean();
                        var p = new SocketMessage();
                        let fx_save = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: activ,
                            data: [2, 7, p],
                            map: true
                        });
                        if (!activ) {
                            delete this.fxUser[objectId];
                        } else {
                            this.fxUser[objectId] = fx_save;
                        }
                    }
                } 
				let shieldnb = 0; //fix shield mais l'enlever n'enlevera pas l'invulnérabilité
				if (objectId == 10008) {
                    if (hasData) {
                        const activ = binaryData.bitReadBoolean();
                        var p = new SocketMessage();
                        p.bitWriteUnsignedInt(32, 300);
                        p.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0]);
                        let fx_save = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: activ,
                            data: [2, 8, p],
                            map: true
                        });
						shieldnb = shieldnb + 1;
                        if (shieldnb % 2 == 0) {
							this.data.SHIELD = false;
                            if (this.data.SHIELD) delete this.data.SHIELD;
                            delete this.fxUser[objectId];
                        } else {
                            this.data.SHIELD = true;
                            fx_save.push(0);
                            this.fxUser[objectId] = fx_save;
                        }
                    }
                } else if (objectId == 10009) {
                    if (hasData) {
                        let activ = binaryData.bitReadBoolean();
                        var p = new SocketMessage();
                        p.bitWriteUnsignedInt(32, 300);
                        p.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0]);
                        let fx_save = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: activ,
                            data: [2, 9, p],
                            map: true
                        });
                        if (!activ) {
                            delete this.fxUser[objectId];
                        } else {
                            fx_save.push(0);
                            this.fxUser[objectId] = fx_save;
                        }
                    }
                } else if (objectId == 10010) {
                    if (this.server.variable.maps[this.mapId][6] == 3 || this.data.MAISON_ACTIF && this.data.MAISON_ACTIF.protectMode == 1 || this.mapId == 16 || this.mapId == 161 || this.mapId == 115) {
                        this.sendMsg("Cette map est protégée contre les séismes ^^");
                        return;
                    }
                    let map = this.map.maps[this.mapId];
                    if (hasData) {
                        if (!map.data.SEISME_MAP) map.data.SEISME_MAP = 0;
                        if (map.data.SEISME_MAP >= 1) {
                            this.sendMsg("Il y'a déjà un séisme dans cette map.");
                            return;
                        }
                        map.data.SEISME_MAP++;
                        const posX = binaryData.bitReadSignedInt(16);
                        const posY = binaryData.bitReadSignedInt(16);
                        var p = new SocketMessage();
                        p.bitWriteSignedInt(16, posX);
                        p.bitWriteSignedInt(16, posY);
                        p.bitWriteSignedInt(32, GlobalProperties.getServerTime()[0]);
                        p.bitWriteSignedInt(7, 10);
                        let data = {
                                id: 5,
                                sid: objectId,
                                active: true,
                                data: [2, 10, p],
                                map: true,
                                close: 1
                            },
                            id = this.writeMapFXChange(data);
                        this.earthQuake(30, 10);
                        setTimeout(function() {
                            map.data.SEISME_MAP--;
                            data.active = false;
                            this.fxManager.writeMapFXChange(this, data);
                            map.delete(id);
                        }.bind(this), 1000 * 10);
                    }
                } else if (objectId == 10011) {
                    if (hasData) {
                        const activ = binaryData.bitReadBoolean();
                        var p = new SocketMessage();
                        p.bitWriteUnsignedInt(32, 300);
                        p.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0]);
                        let fx_save = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: activ,
                            data: [2, 11, p],
                            map: true
                        });
                        if (!activ) {
                            delete this.fxUser[objectId];
                        } else {
                            fx_save.push(0);
                            this.fxUser[objectId] = fx_save;
                        }
                    }
                } else if (objectId == 10012) {
                    if (this.server.variable.maps[this.mapId][6] == 3 || this.data.MAISON_ACTIF && this.data.MAISON_ACTIF.protectMode == 1 || this.mapId == 16 || this.mapId == 161 || this.mapId == 115) {
                        this.sendMsg("Cette map est protégée contre les lasers ^^");
                        return;
                    }
                    let map = this.map.maps[this.mapId];
                    if (hasData) {
                        let pid = binaryData.bitReadUnsignedInt(GlobalProperties.BIT_USER_PID),
                            posX = binaryData.bitReadSignedInt(16),
                            posY = binaryData.bitReadSignedInt(16),
                            direction = binaryData.bitReadBoolean(),
                            walk = binaryData.bitReadSignedInt(2),
                            jump = binaryData.bitReadSignedInt(2),
                            modo = binaryData.bitReadBoolean(),
                            p = new SocketMessage();
                        p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, pid);
                        p.bitWriteSignedInt(16, posX);
                        p.bitWriteSignedInt(16, posY);
                        p.bitWriteBoolean(direction);
                        p.bitWriteSignedInt(2, walk);
                        p.bitWriteSignedInt(2, jump);
                        p.bitWriteBoolean(modo);
                        let data = {
                                id: 5,
                                sid: objectId,
                                active: true,
                                data: [3, 12, p],
                                map: true,
                                close: 1
                            },
                            id = this.writeMapFXChange(data);
                        map.delete(id);
                    }
                } else if (objectId == 10013) {
                    let p = new SocketMessage();
                    this.writeUserFXChange(objectId, {
                        loc17: true,
                        id: 6,
                        sid: objectId,
                        active: true,
                        data: [3, 13, p],
                        map: true
                    });
                } else if (objectId == 10014) {
                    this.setPotion("POTION_SPEED", 14, 60);
                } else if (objectId == 10015) {
                    this.setPotion("POTION_JUMP", 15, 60);
                } else if (objectId == 10016) {
                    this.setPotion("POTION_SWIM", 16, 60);
                } else if (objectId == 10017) {
                    this.setPotion("POTION_SMALL", 17, 60);
                } else if (objectId == 10018) {
                    this.setPotion("POTION_COLOR", 18, 60);
                } else if (objectId == 10116) {
                    this.setPotion("POTION_FANTOME", 116, 60);
                } else if(objectId == 10162) {
                    this.setPotion2("POTION_PIERRE", 162, 60);
                }  else if(objectId == 10163) {
                    this.setPotion2("POTION_ETOILE", 163, 60);
                }  else if(objectId == 10164) {
                    this.setPotion2("POTION_PLUME", 164, 60);
                }  else if(objectId == 10166) {
                    this.setPotion2("POTION_GROS_CACA", 166, 60);
                }  else if(objectId == 10165) {
                    this.setPotion2("POTION_FOUDRE", 165, 60); //Little fix needed here 
                }  else if(objectId == 10370) {
                    this.setPotion2("POTION_GLACE", 370, 60);
                }   else if(objectId == 10356) {
                    this.Setbonbon("BONBON_356", 356, 60);
                }   else if(objectId == 10357) {
                    this.Setbonbon("BONBON_357", 357, 60);
                }   else if(objectId == 10358) {
                    this.Setbonbon("BONBON_358", 358, 60);
                }   else if(objectId == 10359) {
                    this.Setbonbon("BONBON_359", 359, 60);
                }   else if(objectId == 10360) {
                    this.Setbonbon("BONBON_360", 360, 60);
                }   else if(objectId == 10371) {
                    this.SetHotcoco("BOISSON_CHOCO", 371, 60);
                }   else if(objectId == 10222) {
                    this.SetYummiesPancakes("CREPE_MIAM", 222, 60);
                }   else if(objectId == 10203) {
                    this.SetAlcohol("BOISSON_LEPRE", 203, 60);
                }   else if(objectId == 10204) {
                    this.SetAlcohol("BOISSON_TREFLE", 204, 60);
                }   else if(objectId == 10205) {
                    this.SetAlcohol("BOISSON_LUTIN", 205, 60);
                }   else if(objectId == 10208) {
                    this.SetTransformation("CHAUVE_SOURIS", 208, 60, 226);
                }    else if(objectId == 10214) {
                    this.SetTransformation("PINGUIN", 214, 60, 328);
                }    else if(objectId == 10217) {
                    this.SetFortuneCookies("FORTUNE_COOKIE", 217, 5);
                }    else if(objectId == 10377) {
                    this.SetTransformation("NYANCATTO", 377, 60, 700);
                } else if (objectId == 10019) {
                    if (hasData) {
                        const activ = binaryData.bitReadBoolean();
                        let p = new SocketMessage();
                        p.bitWriteUnsignedInt(32, 300);
                        p.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0]);
                        let fx_save = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: activ,
                            data: [3, 19, p],
                            map: true
                        });
                        if (!activ) {
                            delete this.fxUser[objectId];
                        } else {
                            fx_save.push(0);
                            this.fxUser[objectId] = fx_save;
                        }
                    }
                } else if (objectId == 10023) {
                    if (hasData) {
                        this.lampion(binaryData, 23);
                    }
                } else if (objectId == 10024) {
                    if (hasData) {
                        this.lampion(binaryData, 24);
                    }
                } else if (objectId == 10039) {
                    if (hasData) {
                        this.lampion(binaryData, 39);
                    }
                } else if (objectId == 10040) {
                    if (hasData) {
                        this.lampion(binaryData, 40);
                    }
                } else if (objectId == 10076) {
                    if (hasData) {
                        this.lampion(binaryData, 76);
                    }
                } else if (objectId == 10123) {
                    if (hasData) {
                        let close = loc5.bitReadBoolean();
                        if (!this.data.LAMPIONN) this.data.LAMPIONN = true;
                        else this.data.LAMPIONN = false;
                        let p = new SocketMessage();
                        p.bitWriteUnsignedInt(10, 0);
                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: this.data.LAMPIONN,
                            data: [21, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);
                        if (this.data.LAMPIONN) this.fxUser[objectId] = data;
                        else delete this.fxUser[objectId];
                    }
                } else if (objectId == 10146) {
                    if (hasData) {
                        let close = loc5.bitReadBoolean();
                        if (!this.data.LAMPIONN) this.data.LAMPIONN = true;
                        else this.data.LAMPIONN = false;
                        let p = new SocketMessage();
                        p.bitWriteUnsignedInt(10, 0);
                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: this.data.LAMPIONN,
                            data: [23, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);
                        if (this.data.LAMPIONN) this.fxUser[objectId] = data;
                        else delete this.fxUser[objectId];
                    }
                } else if (objectId == 10147) {
                    if (hasData) {
                        let close = binaryData.bitReadUnsignedInt(2),
                            bin = null,
                            p = new SocketMessage();
                        if (close == 3) {
                            bin = binaryData.bitReadBinaryData();
                        }
                        let color = binaryData.bitReadUnsignedInt(5);
                        if (!this.data.BALLON) {
                            this.data.BALLON = objectId;
                        } else {
                            close = 2;
                            objectId = this.data.BALLON;
                            delete this.data.BALLON;
                        }
                        p.bitWriteUnsignedInt(5, color);
                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: !close,
                            data: [23, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);
                        if (!close) this.fxUser[objectId] = data;
                        else delete this.fxUser[objectId];
                    }
                } else if (objectId == 10124) {
                    if (hasData) {
                        let close = binaryData.bitReadUnsignedInt(2),
                            bin = null,
                            p = new SocketMessage();
                        if (close == 3) {
                            bin = binaryData.bitReadBinaryData();
                        }
                        let color = binaryData.bitReadUnsignedInt(5);
                        if (!this.data.BALLON) {
                            this.data.BALLON = objectId;
                        } else {
                            close = 2;
                            objectId = this.data.BALLON;
                            delete this.data.BALLON;
                        }
                        p.bitWriteUnsignedInt(5, color);
                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: !close,
                            data: [21, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);
                        if (!close) this.fxUser[objectId] = data;
                        else delete this.fxUser[objectId];
                    }
                } else if (objectId == 10159) {
                    if (hasData) {
                        let close = binaryData.bitReadUnsignedInt(2),
                            bin = null,
                            p = new SocketMessage();
                        if (close == 3) {
                            bin = binaryData.bitReadBinaryData();
                        }
                        let color = binaryData.bitReadUnsignedInt(5);
                        if (!this.data.BALLON) {
                            this.data.BALLON = objectId;
                        } else {
                            close = 2;
                            objectId = this.data.BALLON;
                            delete this.data.BALLON;
                        }
                        p.bitWriteUnsignedInt(5, color);
                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: !close,
                            data: [23, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);
                        if (!close) this.fxUser[objectId] = data;
                        else delete this.fxUser[objectId];
                    }
                }  else if ([10235, 10315, 10314, 10374].includes(objectId)) {
                    if (!this.data.DOUDOU) this.data.DOUDOU = false;
                    this.data.DOUDOU = !this.data.DOUDOU;
                    let data = this.writeUserFXChange(objectId, {
                        loc17: true,
                        id: 6,
                        sid: objectId,
                        active: this.data.DOUDOU,
                        data: [objectId == 10374 ? 51 : 25, objectId - 10000, new SocketMessage()],
                        map: true
                    });
                    data.push(0);
                    if (this.data.DOUDOU) this.fxUser[objectId] = data;
                    else delete this.fxUser[objectId];
                } else if ([10351, 10352, 10353, 10354, 10355,].includes(objectId)) {
                    if (!this.data.DOUDOU) this.data.DOUDOU = false;
                    this.data.DOUDOU = !this.data.DOUDOU;
                    let data = this.writeUserFXChange(objectId, {
                        loc17: true,
                        id: 6,
                        sid: objectId,
                        active: this.data.DOUDOU,
                        data: [49, objectId - 10000, new SocketMessage()],
                        map: true
                    });
                    data.push(0);
                    if (this.data.DOUDOU) this.fxUser[objectId] = data;
                    else delete this.fxUser[objectId];
                }  else if ([10209].includes(objectId)) {
                    if (!this.data.DOUDOU) this.data.DOUDOU = false;
                    this.data.DOUDOU = !this.data.DOUDOU;
                    let data = this.writeUserFXChange(objectId, {
                        loc17: true,
                        id: 6,
                        sid: objectId,
                        active: this.data.DOUDOU,
                        data: [28, objectId - 10000, new SocketMessage()],
                        map: true
                    });
                    data.push(0);
                    if (this.data.DOUDOU) this.fxUser[objectId] = data;
                    else delete this.fxUser[objectId];
                } 
                else if (objectId == 10213) {

                    if (hasData) {

                        if (!this.data.SKATE) this.data.SKATE = false;
                        this.data.SKATE = !this.data.SKATE;

                        binaryData.bitReadUnsignedInt(2);
                        let color = binaryData.bitReadUnsignedInt(5);

                        binaryData = new SocketMessage();
                        binaryData.bitWriteUnsignedInt(5, color);

                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: this.data.SKATE,
                            data: [27, objectId - 10000, binaryData],
                            map: true
                        });
                        data.push(0);
                        if (this.data.DOUDOU) this.fxUser[objectId] = data;
                        else delete this.fxUser[objectId];

                    }

                } else if (objectId == 10236) {
                    if (!this.data.MASQUE) this.data.MASQUE = false;
                    this.data.MASQUE = !this.data.MASQUE;
                    let data = this.writeUserFXChange(objectId, {
                        loc17: true,
                        id: 6,
                        sid: objectId,
                        active: this.data.MASQUE,
                        data: [25, objectId - 10000, new SocketMessage()],
                        map: true
                    });
                    data.push(0);
                    if (this.data.DOUDOU) this.fxUser[objectId] = data;
                    else delete this.fxUser[objectId];
                } else if (objectId == 10316) {
                    if (hasData) {
                        if (!this.data.BALLON) this.data.BALLON = false;
                        this.data.BALLON = !this.data.BALLON;
                        let activ = binaryData.bitReadUnsignedInt(2),
                            c_data = null;
                        if (activ == 3) {
                            c_data = binaryData.bitReadBinaryData();
                            this.data.BALLON = true;
                        }
                        let color = binaryData.bitReadUnsignedInt(5),
                            p = new SocketMessage();
                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: this.data.BALLON,
                            data: [25, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);
                        if (this.data.BALLON) this.fxUser[objectId] = data;
                        else delete this.fxUser[objectId];

                    }
                } else if (objectId == 10368) {
                    if (hasData) {
                        let close = binaryData.bitReadUnsignedInt(2),
                            bin = null,
                            p = new SocketMessage();
                        if (close == 3) {
                            bin = binaryData.bitReadBinaryData();
                        }
                        let color = binaryData.bitReadUnsignedInt(5);
                        if (!this.data.BALLONSATURN) {
                            this.data.BALLONSATURN = objectId;
                        } else {
                            close = 2;
                            objectId = this.data.BALLONSATURN;
                            delete this.data.BALLONSATURN;
                        }
                        p.bitWriteUnsignedInt(5, color);
                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: !close,
                            data: [51, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);
                        if (!close) this.fxUser[objectId] = data;
                        else delete this.fxUser[objectId];
                    }
                    


                } else if (objectId == 10237) {
                    if (hasData) {
                        if (!this.data.BALLON) this.data.BALLON = false;
                        this.data.BALLON = !this.data.BALLON;
                        let activ = binaryData.bitReadUnsignedInt(2),
                            c_data = null;
                        if (activ == 3) {
                            c_data = binaryData.bitReadBinaryData();
                            this.data.BALLON = true;
                        }
                        let color = binaryData.bitReadUnsignedInt(5),
                            p = new SocketMessage();
                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: this.data.BALLON,
                            data: [25, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);
                        if (this.data.BALLON) this.fxUser[objectId] = data;
                        else delete this.fxUser[objectId];

                    }
                } else if ([10238, 10313].includes(objectId)) {
                    if (hasData) {
                        let activ = binaryData.bitReadUnsignedInt(2),
                            oui = binaryData.bitReadUnsignedInt(2),
                            action = binaryData.bitReadBoolean(),
                            p = new SocketMessage();
                        if (!this.data.EPEE) this.data.EPEE = false;
                        this.data.EPEE = !this.data.EPEE;
                        if (action) {
                            this.data.EPEE = true;
                        }
                        p.bitWriteBoolean(action);
                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: this.data.EPEE,
                            data: [25, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);
                        if (this.data.EPEE) this.fxUser[objectId] = data;
                        else delete this.fxUser[objectId];

                    }
                } else if ([10243, 10318, 10244].includes(objectId)) {
                    if (hasData) {
                        let activ = binaryData.bitReadBoolean(),
                            p = new SocketMessage();
                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: activ,
                            data: [25, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);
                        if (activ) this.fxUser[objectId] = data;
                        else delete this.fxUser[objectId];
                    }
                } else if ([10169, 10187].includes(objectId)) {
                    if (hasData) {
                        let activ = binaryData.bitReadBoolean(),
                            p = new SocketMessage();
                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: activ,
                            data: [27, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);
                        if (activ) this.fxUser[objectId] = data;
                        else delete this.fxUser[objectId];
                    }
                } else if ([10195, 10199].includes(objectId)) {
                    if (hasData) {
                        let activ = binaryData.bitReadBoolean(),
                            p = new SocketMessage();
                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: activ,
                            data: [30, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);
                        if (activ) this.fxUser[objectId] = data;
                        else delete this.fxUser[objectId];
                    }
                } else if (objectId == 10234) {
                    if (hasData) {
                        let activ = binaryData.bitReadBoolean(),
                            p = new SocketMessage();
                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: activ,
                            data: [35, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);
                        if (activ) this.fxUser[objectId] = data;
                        else delete this.fxUser[objectId];
                    }
                } else if (objectId == 10094) {
                    if (hasData) {
                        let oldId = this.mainUser.skinId; 
                        if(this.mainUser.skinId != 357) {
                            this.reloadSkin(357);
                        }  else if (this.mainUser.skinId == 357) {
                            this.reloadSkin(oldId);
                        }
                        let activ = binaryData.bitReadBoolean(),
                            p = new SocketMessage();
                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: activ,
                            data: [9, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);
                        if (activ) this.fxUser[objectId] = data;
                            else delete this.fxUser[objectId];
                    }
                } else if (objectId == 10035) {
                    if (hasData) {
                        let oldId = this.mainUser.skinId; 
                        if(this.mainUser.skinId != 234) {
                            this.reloadSkin(234);
                        } else if (this.mainUser.skinId == 234) {
                            this.reloadSkin(oldId);
                        }
                        let activ = binaryData.bitReadBoolean(),
                            p = new SocketMessage();
                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: activ,
                            data: [9, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);
                        if (activ)this.fxUser[objectId] = data;
                            delete this.fxUser[objectId];
                    }
                } else if (objectId == 10245) {
                    if (hasData) {
                        let activ = binaryData.bitReadBoolean(),
                            p = new SocketMessage();
                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: activ,
                            data: [37, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);
                        if (activ) this.fxUser[objectId] = data;
                        else delete this.fxUser[objectId];
                    }
                } else if (objectId == 10251) {
                    if (hasData) {
                        let activ = binaryData.bitReadBoolean(),
                            p = new SocketMessage();
                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: activ,
                            data: [37, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);
                        if (activ) this.fxUser[objectId] = data;
                        else delete this.fxUser[objectId];
                    }
                } else if (objectId == 10255) {
                    if (hasData) {
                        let activ = binaryData.bitReadBoolean(),
                            p = new SocketMessage();
                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: activ,
                            data: [37, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);
                        if (activ) this.fxUser[objectId] = data;
                        else delete this.fxUser[objectId];
                    }
                } else if (objectId == 10259) {
                    if (hasData) {
                        let activ = binaryData.bitReadBoolean(),
                            p = new SocketMessage();
                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: activ,
                            data: [37, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);
                        if (activ) this.fxUser[objectId] = data;
                        else delete this.fxUser[objectId];
                    }
                } else if ([10262].includes(objectId)) {
                    if (hasData) {
                        let activ = binaryData.bitReadUnsignedInt(2),
                          test = -1;
                      let reload = false;
                      if (this.data.TAMBOUR) {
                          if (this.data.TAMBOUR[1] != objectId) {
                              reload = objectId;
                          }
                      }
                      if (activ == 1) {
                          test = binaryData.bitReadUnsignedInt(4);
                      } else {
                          if (!this.data.TAMBOUR) {
                              this.data.TAMBOUR = [false, objectId];
                          }
                          this.data.TAMBOUR[0] = !this.data.TAMBOUR[0];
                      }
                      let p = new SocketMessage();
                      p.bitWriteBoolean(!!test);
                      p.bitWriteUnsignedInt(4, test);
                      let data = this.writeUserFXChange(this.data.TAMBOUR[1], {
                          loc17: true,
                          id: 6,
                          sid: this.data.TAMBOUR[1],
                          active: this.data.TAMBOUR[0],
                          data: [35, this.data.TAMBOUR[1] - 10000, p],
                          map: true
                      });
                      data.push(0);
                      if (this.data.TAMBOUR) this.fxUser[this.data.TAMBOUR[1]] = data;
                      else delete this.fxUser[this.data.TAMBOUR[1]];
                      if (reload) {
                          this.data.TAMBOUR = [true, objectId];
                          let packet = new SocketMessage();
                          packet.bitWriteUnsignedInt(32, reload);
                          packet.bitWriteBoolean(true);
                          let packet2 = new SocketMessage();
                          packet2.bitWriteUnsignedInt(2, activ);
                          packet2.bitWriteUnsignedInt(4, test);
                          packet.bitWriteBinaryData(packet2);
                          this.parsedEventMessage(6, 8, packet)
                      } 
                  }
                }  else if (objectId == 10279) {

                    if (hasData) {

                        let active = binaryData.bitReadBoolean();

                        let p = new SocketMessage();

                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: active,
                            data: [39, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);

                        if (active) {
                            this.fxUser[objectId] = data;
                        } else {
                            delete this.fxUser[objectId];
                        }

                    }

                } else if (objectId == 10326) {

                    if (hasData) {

                        let active = binaryData.bitReadBoolean();

                        let p = new SocketMessage();

                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: active,
                            data: [48, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);

                        if (active) {
                            this.fxUser[objectId] = data;
                        } else {
                            delete this.fxUser[objectId];
                        }

                    }

                } else if (objectId == 10296) {

                    if (hasData) {

                        let active = binaryData.bitReadBoolean();

                        let p = new SocketMessage();

                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: active,
                            data: [43, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);

                        if (active) {
                            this.fxUser[objectId] = data;
                        } else {
                            delete this.fxUser[objectId];
                        }

                    }

                } else if (objectId == 10299) {

                    if (hasData) {

                        let type = binaryData.bitReadUnsignedInt(2);
                        let p = new SocketMessage();

                        if (type == 0 || type == 2) {

                            let active = true;

                            if (this.data.EPEE_HORIA) {

                                active = false;
                                delete this.data.EPEE_HORIA;

                            } else {
                                this.data.EPEE_HORIA = true;
                            }

                            let data = this.writeUserFXChange(objectId, {
                                loc17: true,
                                id: 6,
                                sid: objectId,
                                active: active,
                                data: [43, objectId - 10000, p],
                                map: true
                            });
                            data.push(0);

                            if (active) {
                                this.fxUser[objectId] = data;
                            } else {
                                delete this.fxUser[objectId];
                            }

                        } else if (type == 3) {
                            let coup = binaryData.bitReadUnsignedInt(3);

                            p.bitWriteBoolean(true);
                            p.bitWriteUnsignedInt(2, 0);

                            this.writeUserFXChange(objectId, {
                                loc17: true,
                                id: 6,
                                sid: objectId,
                                active: true,
                                data: [43, objectId - 10000, p],
                                map: true
                            });
                        }

                    }

                } else if (objectId == 10264) {
                    if (hasData) {
                        let activ = binaryData.bitReadBoolean(),
                            p = new SocketMessage();
                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: activ,
                            data: [38, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);
                        if (activ) this.fxUser[objectId] = data;
                        else delete this.fxUser[objectId];
                    }
                } else if (objectId == 10277) {
                    if (hasData) {
                        let activ = binaryData.bitReadBoolean(),
                            p = new SocketMessage();
                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: activ,
                            data: [39, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);
                        if (activ) this.fxUser[objectId] = data;
                        else delete this.fxUser[objectId];
                    }
                } else if (objectId == 10303) {
                    if (hasData) {
                        let activ = binaryData.bitReadBoolean(),
                            p = new SocketMessage();
                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: activ,
                            data: [46, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);
                        if (activ) this.fxUser[objectId] = data;
                        else delete this.fxUser[objectId];
                    }
                } else if (objectId == 10378) {
                    if (hasData) {
                        let activ = binaryData.bitReadBoolean(),
                            p = new SocketMessage();
                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: activ,
                            data: [53, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);
                        if (activ) this.fxUser[objectId] = data;
                        else delete this.fxUser[objectId];
                    }
                } else if (objectId == 10295) {
                    if (hasData) {
                        let activ = binaryData.bitReadBoolean(),
                            p = new SocketMessage();
                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: activ,
                            data: [43, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);
                        if (activ) this.fxUser[objectId] = data;
                        else delete this.fxUser[objectId];
                    }
                } else if ([10322, 10324, 10325, 10330, 10331].includes(objectId)) {
                    if (hasData) {
                          let activ = binaryData.bitReadUnsignedInt(2),
                            test = -1;
                        let reload = false;
                        if (this.data.INSTRUMENT) {
                            if (this.data.INSTRUMENT[1] != objectId) {
                                reload = objectId;
                            }
                        }
                        if (activ == 3) {
                            test = binaryData.bitReadUnsignedInt(4);
                        } else {
                            if (!this.data.INSTRUMENT) {
                                this.data.INSTRUMENT = [false, objectId];
                            }
                            this.data.INSTRUMENT[0] = !this.data.INSTRUMENT[0];
                        }
                        let p = new SocketMessage();
                        p.bitWriteBoolean(!!test);
                        p.bitWriteUnsignedInt(4, test);
                        let data = this.writeUserFXChange(this.data.INSTRUMENT[1], {
                            loc17: true,
                            id: 6,
                            sid: this.data.INSTRUMENT[1],
                            active: this.data.INSTRUMENT[0],
                            data: [47, this.data.INSTRUMENT[1] - 10000, p],
                            map: true
                        });
                        data.push(0);
                        if (this.data.INSTRUMENT) this.fxUser[this.data.INSTRUMENT[1]] = data;
                        else delete this.fxUser[this.data.INSTRUMENT[1]];
                        if (reload) {
                            this.data.INSTRUMENT = [true, objectId];
                            let packet = new SocketMessage();
                            packet.bitWriteUnsignedInt(32, reload);
                            packet.bitWriteBoolean(true);
                            let packet2 = new SocketMessage();
                            packet2.bitWriteUnsignedInt(2, activ);
                            packet2.bitWriteUnsignedInt(4, test);
                            packet.bitWriteBinaryData(packet2);
                            this.parsedEventMessage(6, 8, packet)
                        } 
                    }
                   
                    
                } else if (objectId == 10126) {
                    if (hasData) {
                        let active = !loc5.bitReadBoolean();
                        let p = new SocketMessage();
                        if (!this.data.LAMPIONC) this.data.LAMPIONC = true;
                        else this.data.LAMPIONC = false;
                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: this.data.LAMPIONC,
                            data: [21, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);
                        if (this.data.LAMPIONC) this.fxUser[objectId] = data;
                        else delete this.fxUser[objectId];
                    }
                } else if (objectId == 10131) {
                    if (hasData) {
                        let active = !loc5.bitReadBoolean();
                        let p = new SocketMessage();
                        if (!this.data.LAMPIOND) this.data.LAMPIOND = true;
                        else this.data.LAMPIOND = false;
                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: this.data.LAMPIOND,
                            data: [21, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);
                        if (this.data.LAMPIOND) this.fxUser[objectId] = data;
                        else delete this.fxUser[objectId];
                    }
                } else if (objectId == 10133) {
                    if (hasData) {
                        let active = !loc5.bitReadBoolean();
                        let p = new SocketMessage();
                        if (!this.data.LAMPION_NOEL) this.data.LAMPION_NOEL = true;
                        else this.data.LAMPION_NOEL = false;
                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: this.data.LAMPION_NOEL,
                            data: [22, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);
                        if (this.data.LAMPION_NOEL) this.fxUser[objectId] = data;
                        else delete this.fxUser[objectId];
                    }
                } else if (objectId == 10134) {
                    if (hasData) {
                        const activ = binaryData.bitReadBoolean();
                        var p = new SocketMessage();
                        p.bitWriteUnsignedInt(32, 300);
                        p.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0]);
                        let fx_save = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: activ,
                            data: [22, objectId - 10000, p],
                            map: true
                        });
                        if (!activ) {
                            delete this.fxUser[objectId];
                        } else {
                            fx_save.push(0);
                            this.fxUser[objectId] = fx_save;
                        }
                    }
                } else if (objectId == 10136) {
                    if (hasData) {
                        let close = binaryData.bitReadUnsignedInt(2),
                            bin = null,
                            p = new SocketMessage();
                        let color = binaryData.bitReadUnsignedInt(5);
                        if (!this.data.LUGE) {
                            this.data.LUGE = objectId;
                        } else {
                            close = 2;
                            objectId = this.data.LUGE;
                            delete this.data.LUGE;
                        }
                        p.bitWriteUnsignedInt(32, 300);
                        p.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0]);
                        p.bitWriteUnsignedInt(5, color);
                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: !close,
                            data: [22, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);
                        if (!close) this.fxUser[objectId] = data;
                        else delete this.fxUser[objectId];
                    }
                } else if (objectId == 10137) {
                    if (hasData) {
                        let close = binaryData.bitReadUnsignedInt(2),
                            p = new SocketMessage();
                        if (!this.data.MASQUE) {
                            this.data.MASQUE = objectId;
                        } else {
                            close = 2;
                            objectId = this.data.MASQUE;
                            delete this.data.MASQUE;
                        }
                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: !close,
                            data: [22, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);
                        if (!close) this.fxUser[objectId] = data;
                        else delete this.fxUser[objectId];
                    }
                } else if (objectId == 10135) {
                    if (hasData) {
                        let close = binaryData.bitReadUnsignedInt(2),
                            bin = null,
                            p = new SocketMessage();
                        if (close == 2) {
                            bin = binaryData.bitReadBinaryData();
                        }
                        let color = binaryData.bitReadUnsignedInt(5);
                        if (!this.data.BALLONSTARS) {
                            this.data.BALLONSTARS = objectId;
                        } else {
                            close = 2;
                            objectId = this.data.BALLONSTARS;
                            delete this.data.BALLONSTARS;
                        }
                        p.bitWriteUnsignedInt(5, color);
                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: !close,
                            data: [22, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);
                        if (!close) this.fxUser[objectId] = data;
                        else delete this.fxUser[objectId];
                    }
                } else if ([10138, 10139].includes(objectId)) {
                    if (hasData) {
                        let close = binaryData.bitReadUnsignedInt(2),
                            bin = null,
                            p = new SocketMessage();
                        if (close == 3) {
                            bin = binaryData.bitReadBinaryData();
                        }
                        let color = binaryData.bitReadUnsignedInt(5);
                        if (!this.data.BALLON) {
                            this.data.BALLON = objectId;
                        } else {
                            close = 2;
                            objectId = this.data.BALLON;
                            delete this.data.BALLON;
                        }
                        p.bitWriteUnsignedInt(5, color);
                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: !close,
                            data: [22, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);
                        if (!close) this.fxUser[objectId] = data;
                        else delete this.fxUser[objectId];
                    }
                } else if (objectId == 10323) {
                    if (hasData) {
                        let jsp = binaryData.bitReadUnsignedInt(3),
                            userId = binaryData.bitReadUnsignedInt(GlobalProperties.BIT_USER_ID),
                            posX = binaryData.bitReadSignedInt(16),
                            posY = binaryData.bitReadSignedInt(16),
                            p = new SocketMessage(),
                            active = true,
                            showSettings = false;
                        p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, this.uid);
                        if (jsp == 1) {
                            active = false;
                            p.bitWriteSignedInt(16, this.data.CONCERT[3][0]);
                            p.bitWriteSignedInt(16, this.data.CONCERT[3][1]);
                        } else if (jsp == 2) {
                            if (!(userId in this.data.CONCERT[1])) {
                                this.data.CONCERT[1][userId] = userId;
                                p.bitWriteSignedInt(16, this.data.CONCERT[3][0]);
                                p.bitWriteSignedInt(16, this.data.CONCERT[3][1]);
                            }
                        } else if (jsp == 3) {
                            if (userId in this.data.CONCERT[1]) {
                                delete this.data.CONCERT[1][userId];
                                p.bitWriteSignedInt(16, this.data.CONCERT[3][0]);
                                p.bitWriteSignedInt(16, this.data.CONCERT[3][1]);
                            }
                        } else {
                            if (!this.data.CONCERT) {
                                this.data.CONCERT = [this, {}, null, [posX, posY], this.mapId, false];
                                this.data.CONCERT[1][this.uid] = this.uid;
                                showSettings = true;
                            } else {
                                return;
                            }
                            p.bitWriteSignedInt(16, posX);
                            p.bitWriteSignedInt(16, posY);
                        }
                        for (let i in this.data.CONCERT[1]) {
                            p.bitWriteBoolean(true);
                            p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, this.data.CONCERT[1][i]);
                        }
                        let map = this.map.maps[this.data.CONCERT[4]];
                        p.bitWriteBoolean(false);
                        p.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0]);
                        p.bitWriteUnsignedInt(10, GlobalProperties.getServerTime()[1]);
                        p.bitWriteBoolean(this.data.CONCERT[5]);
                        let data = {
                            id: 5,
                            sid: objectId,
                            active: active,
                            data: [47, objectId - 10000, p],
                            map: true,
                            close: 1
                        }
                        if (this.data.CONCERT[2] != null) {
                            let mapObj = this.fxManager.writeMapFXChange(this, data, this.data.CONCERT[4]);
                            map.objectList[this.data.CONCERT[2]] = mapObj;
                        } else {
                            let id = this.writeMapFXChange(data);
                            this.data.CONCERT[2] = id;
                        }
                        if (showSettings) {
                            let p2 = new SocketMessage();
                            p2.bitWriteUnsignedInt(GlobalProperties.BIT_MAP_ID, this.mapId);
                            p2.bitWriteUnsignedInt(GlobalProperties.BIT_FX_SID, objectId);
                            this.writeUserFXChange(objectId, {
                                loc17: true,
                                id: 6,
                                sid: objectId,
                                active: true,
                                data: [47, 1, p],
                                map: true
                            });
                        }
                        if (!active) {
                            this.writeUserFXChange(objectId, {
                                loc17: true,
                                id: 6,
                                sid: objectId,
                                active: false,
                                data: [47, 1, new SocketMessage()],
                                map: true
                            });
                            map.delete(this.data.CONCERT[2]);
                            delete this.data.CONCERT;
                        }
                    }
                } else if (objectId == 10298) {
                    if (this.data.PICNICK) return;
                    this.data.PICNICK = true;
                    let userId = loc5.bitReadUnsignedInt(GlobalProperties.BIT_USER_ID),
                        p = new SocketMessage();
                    p.bitWriteSignedInt(17, this.mainUser.position.x / 100);
                    p.bitWriteSignedInt(17, this.mainUser.position.y / 100);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, this.uid);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, userId);
                    let data = {
                        id: 5,
                        sid: objectId,
                        active: true,
                        data: [44, objectId - 10000, p],
                        map: true,
                        close: 1
                    };
                    let id = this.writeMapFXChange(data),
                        map = this.map.maps[this.mapId];
                    setTimeout(function() {
                        delete this.data.PICNICK;
                        map.delete(id);
                        data.active = false;
                        id = this.writeMapFXChange(data);
                        map.delete(id);
                    }.bind(this), 5 * 60 * 1000);
                } else if (objectId == 10082) {
                    if (!this.data.FAUX_CADEAU || this.grade >= 800) {
                        this.data.FAUX_CADEAU = "issou";
                        this.createKdo(0, 3);
                    }
                } else if (objectId == 10297) {
                    if (hasData) {
                        let jsp = binaryData.bitReadUnsignedInt(3),
                            userId = binaryData.bitReadUnsignedInt(GlobalProperties.BIT_USER_ID),
                            posX = binaryData.bitReadSignedInt(16),
                            posY = binaryData.bitReadSignedInt(16),
                            p = new SocketMessage(),
                            active = true;
                        p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, this.uid);
                        if (jsp == 1) {
                            active = false;
                            p.bitWriteSignedInt(16, this.data.NUAGE[3][0]);
                            p.bitWriteSignedInt(16, this.data.NUAGE[3][1]);
                        } else if (jsp == 2) {
                            if (!(userId in this.data.NUAGE[1])) {
                                this.data.NUAGE[1][userId] = userId;
                                p.bitWriteSignedInt(16, this.data.NUAGE[3][0]);
                                p.bitWriteSignedInt(16, this.data.NUAGE[3][1]);
                            }
                        } else if (jsp == 3) {
                            if (userId in this.data.NUAGE[1]) {
                                delete this.data.NUAGE[1][userId];
                                p.bitWriteSignedInt(16, this.data.NUAGE[3][0]);
                                p.bitWriteSignedInt(16, this.data.NUAGE[3][1]);
                            }
                        } else {
                            if (!this.data.NUAGE) {
                                this.data.NUAGE = [this, {}, null, [posX, posY], this.mapId];
                                this.data.NUAGE[1][this.uid] = this.uid;
                                this.writeUserFXChange(objectId, {
                                    loc17: true,
                                    id: 6,
                                    sid: objectId,
                                    active: true,
                                    data: [44, 1, p],
                                    map: true
                                });
                            } else {
                                return;
                            }
                            p.bitWriteSignedInt(16, posX);
                            p.bitWriteSignedInt(16, posY);
                        }
                        for (let i in this.data.NUAGE[1]) {
                            p.bitWriteBoolean(true);
                            p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, this.data.NUAGE[1][i]);
                        }
                        p.bitWriteBoolean(false);
                        let data = {
                            id: 5,
                            sid: objectId,
                            active: active,
                            data: [44, objectId - 10000, p],
                            map: true,
                            close: 1
                        };
                        let map = this.map.maps[this.data.NUAGE[4]];
                        if (this.data.NUAGE[2] != null) {
                            let mapObj = this.fxManager.writeMapFXChange(this, data, this.data.NUAGE[4]);
                            map.objectList[this.data.NUAGE[2]] = mapObj;
                        } else {
                            let id = this.writeMapFXChange(data);
                            this.data.NUAGE[2] = id;
                        }
                        if (!active) {
                            this.writeUserFXChange(objectId, {
                                loc17: true,
                                id: 6,
                                sid: objectId,
                                active: false,
                                data: [44, 1, new SocketMessage()],
                                map: true
                            });
                            map.delete(this.data.NUAGE[2]);
                            delete this.data.NUAGE;
                        }
                    }
                }else if (objectId == 10102) {
                    if (hasData) {
                        let arrosed = binaryData.bitReadBoolean(),
                            posX = binaryData.bitReadSignedInt(16),
                            posY = binaryData.bitReadSignedInt(16),
                            surfacebody = binaryData.bitReadUnsignedInt(8),
                            name = binaryData.bitReadString(),
                            colorModel = binaryData.bitReadUnsignedInt(5),
                            map = this.map.maps[this.mapId],
                            time = parseInt(GlobalProperties.getServerTime()[0]) + 70 * 60 * 1000;
                        let p = new SocketMessage();
                        p.bitWriteBoolean(arrosed);
                        p.bitWriteSignedInt(16, posX);
                        p.bitWriteSignedInt(16, posY);
                        p.bitWriteUnsignedInt(8, surfacebody);
                        p.bitWriteString(name);
                        p.bitWriteUnsignedInt(5, colorModel);
                        p.bitWriteString(this.pseudo);
                        p.bitWriteUnsignedInt(32, time);
                        let obj_id = map.objectPid;
                        let data = {
                                id: 5,
                                sid: obj_id,
                                active: true,
                                data: [19, objectId - 10000, p],
                                map: true,
                                close: 1
                            },
                            id = this.writeMapFXChange(data);
                        if (!map.data.FLOWER) map.data.FLOWER = {};
                        map.data.FLOWER[obj_id] = [id, posX, posY, surfacebody, name, colorModel, this.pseudo, objectId];
                        setTimeout(function() {
                            map.delete(id);
                            data.active = false;
                            id = this.writeMapFXChange(data);
                            map.delete(id);
                            p = new SocketMessage();
                            p.bitWriteBoolean(arrosed);
                            p.bitWriteSignedInt(16, posX);
                            p.bitWriteSignedInt(16, posY);
                            p.bitWriteUnsignedInt(8, surfacebody);
                            p.bitWriteString(name);
                            p.bitWriteUnsignedInt(5, colorModel);
                            p.bitWriteString(this.pseudo);
                            p.bitWriteUnsignedInt(32, parseInt(GlobalProperties.getServerTime()[0]) + 3300);
                            data = {
                                id: 5,
                                sid: obj_id,
                                active: true,
                                data: [29, objectId - 10000, p],
                                map: true,
                                close: 1
                            }, id = this.writeMapFXChange(data);
                            setTimeout(function() {
                                map.delete(id);
                                data.active = false;
                                id = this.writeMapFXChange(data);
                                map.delete(id);
                                p = new SocketMessage();
                                p.bitWriteBoolean(arrosed);
                                p.bitWriteSignedInt(16, posX);
                                p.bitWriteSignedInt(16, posY);
                                p.bitWriteUnsignedInt(8, surfacebody);
                                p.bitWriteString(name);
                                p.bitWriteUnsignedInt(5, colorModel);
                                p.bitWriteString(this.pseudo);
                                p.bitWriteUnsignedInt(32, parseInt(GlobalProperties.getServerTime()[0]));
                                data = {
                                    id: 5,
                                    sid: obj_id,
                                    active: true,
                                    data: [19, objectId - 10000, p],
                                    map: true,
                                    close: 1
                                }, id = this.writeMapFXChange(data);
                                map.data.FLOWER[obj_id] = [id, posX, posY, surfacebody, name, colorModel, this.pseudo, objectId];
                                setTimeout(function() {
                                    map.delete(map.data.FLOWER[obj_id][0]);
                                    data.active = false;
                                    id = this.writeMapFXChange(data);
                                    map.delete(id);
                                }.bind(this), 15 * 60 * 1000);
                            }.bind(this), 6 * 60 * 1000);
                        }.bind(this), 3 * 60 * 1000);
                    }
                }  else if ([10269].includes(objectId)) {
                    if (hasData) {
                        let arrosed = binaryData.bitReadBoolean(),
                            posX = binaryData.bitReadSignedInt(16),
                            posY = binaryData.bitReadSignedInt(16),
                            surfacebody = binaryData.bitReadUnsignedInt(8),
                            name = binaryData.bitReadString(),
                            colorModel = binaryData.bitReadUnsignedInt(5),
                            map = this.map.maps[this.mapId],
                            time = parseInt(GlobalProperties.getServerTime()[0]) + 70 * 60 * 1000;
                        let p = new SocketMessage();
                        p.bitWriteBoolean(arrosed);
                        p.bitWriteSignedInt(16, posX);
                        p.bitWriteSignedInt(16, posY);
                        p.bitWriteUnsignedInt(8, surfacebody);
                        p.bitWriteString(name);
                        p.bitWriteUnsignedInt(5, colorModel);
                        p.bitWriteString(this.pseudo);
                        p.bitWriteUnsignedInt(32, time);
                        let obj_id = map.objectPid;
                        let data = {
                                id: 5,
                                sid: obj_id,
                                active: true,
                                data: [39, objectId - 10000, p],
                                map: true,
                                close: 1
                            },
                            id = this.writeMapFXChange(data);
                        if (!map.data.FLOWER) map.data.FLOWER = {};
                        map.data.FLOWER[obj_id] = [id, posX, posY, surfacebody, name, colorModel, this.pseudo, objectId];
                        setTimeout(function() {
                            map.delete(id);
                            data.active = false;
                            id = this.writeMapFXChange(data);
                            map.delete(id);
                            p = new SocketMessage();
                            p.bitWriteBoolean(arrosed);
                            p.bitWriteSignedInt(16, posX);
                            p.bitWriteSignedInt(16, posY);
                            p.bitWriteUnsignedInt(8, surfacebody);
                            p.bitWriteString(name);
                            p.bitWriteUnsignedInt(5, colorModel);
                            p.bitWriteString(this.pseudo);
                            p.bitWriteUnsignedInt(32, parseInt(GlobalProperties.getServerTime()[0]) + 3300);
                            data = {
                                id: 5,
                                sid: obj_id,
                                active: true,
                                data: [39, objectId - 10000, p],
                                map: true,
                                close: 1
                            }, id = this.writeMapFXChange(data);
                            setTimeout(function() {
                                map.delete(id);
                                data.active = false;
                                id = this.writeMapFXChange(data);
                                map.delete(id);
                                p = new SocketMessage();
                                p.bitWriteBoolean(arrosed);
                                p.bitWriteSignedInt(16, posX);
                                p.bitWriteSignedInt(16, posY);
                                p.bitWriteUnsignedInt(8, surfacebody);
                                p.bitWriteString(name);
                                p.bitWriteUnsignedInt(5, colorModel);
                                p.bitWriteString(this.pseudo);
                                p.bitWriteUnsignedInt(32, parseInt(GlobalProperties.getServerTime()[0]));
                                data = {
                                    id: 5,
                                    sid: obj_id,
                                    active: true,
                                    data: [39, objectId - 10000, p],
                                    map: true,
                                    close: 1
                                }, id = this.writeMapFXChange(data);
                                map.data.FLOWER[obj_id] = [id, posX, posY, surfacebody, name, colorModel, this.pseudo, objectId];
                                setTimeout(function() {
                                    map.delete(map.data.FLOWER[obj_id][0]);
                                    data.active = false;
                                    id = this.writeMapFXChange(data);
                                    map.delete(id);
                                }.bind(this), 15 * 60 * 1000);
                            }.bind(this), 6 * 60 * 1000);
                        }.bind(this), 3 * 60 * 1000);
                    }
                } else if ([10287].includes(objectId)) {
                    if (hasData) {
                        let arrosed = binaryData.bitReadBoolean(),
                            posX = binaryData.bitReadSignedInt(16),
                            posY = binaryData.bitReadSignedInt(16),
                            surfacebody = binaryData.bitReadUnsignedInt(8),
                            name = binaryData.bitReadString(),
                            colorModel = binaryData.bitReadUnsignedInt(5),
                            map = this.map.maps[this.mapId],
                            time = parseInt(GlobalProperties.getServerTime()[0]) + 70 * 60 * 1000;
                        let p = new SocketMessage();
                        p.bitWriteBoolean(arrosed);
                        p.bitWriteSignedInt(16, posX);
                        p.bitWriteSignedInt(16, posY);
                        p.bitWriteUnsignedInt(8, surfacebody);
                        p.bitWriteString(name);
                        p.bitWriteUnsignedInt(5, colorModel);
                        p.bitWriteString(this.pseudo);
                        p.bitWriteUnsignedInt(32, time);
                        let obj_id = map.objectPid;
                        let data = {
                                id: 5,
                                sid: obj_id,
                                active: true,
                                data: [42, objectId - 10000, p],
                                map: true,
                                close: 1
                            },
                            id = this.writeMapFXChange(data);
                        if (!map.data.FLOWER) map.data.FLOWER = {};
                        map.data.FLOWER[obj_id] = [id, posX, posY, surfacebody, name, colorModel, this.pseudo, objectId];
                        setTimeout(function() {
                            map.delete(id);
                            data.active = false;
                            id = this.writeMapFXChange(data);
                            map.delete(id);
                            p = new SocketMessage();
                            p.bitWriteBoolean(arrosed);
                            p.bitWriteSignedInt(16, posX);
                            p.bitWriteSignedInt(16, posY);
                            p.bitWriteUnsignedInt(8, surfacebody);
                            p.bitWriteString(name);
                            p.bitWriteUnsignedInt(5, colorModel);
                            p.bitWriteString(this.pseudo);
                            p.bitWriteUnsignedInt(32, parseInt(GlobalProperties.getServerTime()[0]) + 3300);
                            data = {
                                id: 5,
                                sid: obj_id,
                                active: true,
                                data: [42, objectId - 10000, p],
                                map: true,
                                close: 1
                            }, id = this.writeMapFXChange(data);
                            setTimeout(function() {
                                map.delete(id);
                                data.active = false;
                                id = this.writeMapFXChange(data);
                                map.delete(id);
                                p = new SocketMessage();
                                p.bitWriteBoolean(arrosed);
                                p.bitWriteSignedInt(16, posX);
                                p.bitWriteSignedInt(16, posY);
                                p.bitWriteUnsignedInt(8, surfacebody);
                                p.bitWriteString(name);
                                p.bitWriteUnsignedInt(5, colorModel);
                                p.bitWriteString(this.pseudo);
                                p.bitWriteUnsignedInt(32, parseInt(GlobalProperties.getServerTime()[0]));
                                data = {
                                    id: 5,
                                    sid: obj_id,
                                    active: true,
                                    data: [42, objectId - 10000, p],
                                    map: true,
                                    close: 1
                                }, id = this.writeMapFXChange(data);
                                map.data.FLOWER[obj_id] = [id, posX, posY, surfacebody, name, colorModel, this.pseudo, objectId];
                                setTimeout(function() {
                                    map.delete(map.data.FLOWER[obj_id][0]);
                                    data.active = false;
                                    id = this.writeMapFXChange(data);
                                    map.delete(id);
                                }.bind(this), 15 * 60 * 1000);
                            }.bind(this), 6 * 60 * 1000);
                        }.bind(this), 3 * 60 * 1000);
                    }
                } else if ([10332].includes(objectId)) {
                    if (hasData) {
                        let arrosed = binaryData.bitReadBoolean(),
                            posX = binaryData.bitReadSignedInt(16),
                            posY = binaryData.bitReadSignedInt(16),
                            surfacebody = binaryData.bitReadUnsignedInt(8),
                            name = binaryData.bitReadString(),
                            colorModel = binaryData.bitReadUnsignedInt(5),
                            map = this.map.maps[this.mapId],
                            time = parseInt(GlobalProperties.getServerTime()[0]) + 70 * 60 * 1000;
                        let p = new SocketMessage();
                        p.bitWriteBoolean(arrosed);
                        p.bitWriteSignedInt(16, posX);
                        p.bitWriteSignedInt(16, posY);
                        p.bitWriteUnsignedInt(8, surfacebody);
                        p.bitWriteString(name);
                        p.bitWriteUnsignedInt(5, colorModel);
                        p.bitWriteString(this.pseudo);
                        p.bitWriteUnsignedInt(32, time);
                        let obj_id = map.objectPid;
                        let data = {
                                id: 5,
                                sid: obj_id,
                                active: true,
                                data: [48, objectId - 10000, p],
                                map: true,
                                close: 1
                            },
                            id = this.writeMapFXChange(data);
                        if (!map.data.FLOWER) map.data.FLOWER = {};
                        map.data.FLOWER[obj_id] = [id, posX, posY, surfacebody, name, colorModel, this.pseudo, objectId];
                        setTimeout(function() {
                            map.delete(id);
                            data.active = false;
                            id = this.writeMapFXChange(data);
                            map.delete(id);
                            p = new SocketMessage();
                            p.bitWriteBoolean(arrosed);
                            p.bitWriteSignedInt(16, posX);
                            p.bitWriteSignedInt(16, posY);
                            p.bitWriteUnsignedInt(8, surfacebody);
                            p.bitWriteString(name);
                            p.bitWriteUnsignedInt(5, colorModel);
                            p.bitWriteString(this.pseudo);
                            p.bitWriteUnsignedInt(32, parseInt(GlobalProperties.getServerTime()[0]) + 3300);
                            data = {
                                id: 5,
                                sid: obj_id,
                                active: true,
                                data: [48, objectId - 10000, p],
                                map: true,
                                close: 1
                            }, id = this.writeMapFXChange(data);
                            setTimeout(function() {
                                map.delete(id);
                                data.active = false;
                                id = this.writeMapFXChange(data);
                                map.delete(id);
                                p = new SocketMessage();
                                p.bitWriteBoolean(arrosed);
                                p.bitWriteSignedInt(16, posX);
                                p.bitWriteSignedInt(16, posY);
                                p.bitWriteUnsignedInt(8, surfacebody);
                                p.bitWriteString(name);
                                p.bitWriteUnsignedInt(5, colorModel);
                                p.bitWriteString(this.pseudo);
                                p.bitWriteUnsignedInt(32, parseInt(GlobalProperties.getServerTime()[0]));
                                data = {
                                    id: 5,
                                    sid: obj_id,
                                    active: true,
                                    data: [48, objectId - 10000, p],
                                    map: true,
                                    close: 1
                                }, id = this.writeMapFXChange(data);
                                map.data.FLOWER[obj_id] = [id, posX, posY, surfacebody, name, colorModel, this.pseudo, objectId];
                                setTimeout(function() {
                                    map.delete(map.data.FLOWER[obj_id][0]);
                                    data.active = false;
                                    id = this.writeMapFXChange(data);
                                    map.delete(id);
                                }.bind(this), 15 * 60 * 1000);
                            }.bind(this), 6 * 60 * 1000);
                        }.bind(this), 3 * 60 * 1000);
                    }
                } else if ([10182, 10183, 10184].includes(objectId)) {
                    if (hasData) {
                        let arrosed = binaryData.bitReadBoolean(),
                            posX = binaryData.bitReadSignedInt(16),
                            posY = binaryData.bitReadSignedInt(16),
                            surfacebody = binaryData.bitReadUnsignedInt(8),
                            name = binaryData.bitReadString(),
                            colorModel = binaryData.bitReadUnsignedInt(5),
                            map = this.map.maps[this.mapId],
                            time = parseInt(GlobalProperties.getServerTime()[0]) + 70 * 60 * 1000;
                        let p = new SocketMessage();
                        p.bitWriteBoolean(arrosed);
                        p.bitWriteSignedInt(16, posX);
                        p.bitWriteSignedInt(16, posY);
                        p.bitWriteUnsignedInt(8, surfacebody);
                        p.bitWriteString(name);
                        p.bitWriteUnsignedInt(5, colorModel);
                        p.bitWriteString(this.pseudo);
                        p.bitWriteUnsignedInt(32, time);
                        let obj_id = map.objectPid;
                        let data = {
                                id: 5,
                                sid: obj_id,
                                active: true,
                                data: [29, objectId - 10000, p],
                                map: true,
                                close: 1
                            },
                            id = this.writeMapFXChange(data);
                        if (!map.data.FLOWER) map.data.FLOWER = {};
                        map.data.FLOWER[obj_id] = [id, posX, posY, surfacebody, name, colorModel, this.pseudo, objectId];
                        setTimeout(function() {
                            map.delete(id);
                            data.active = false;
                            id = this.writeMapFXChange(data);
                            map.delete(id);
                            p = new SocketMessage();
                            p.bitWriteBoolean(arrosed);
                            p.bitWriteSignedInt(16, posX);
                            p.bitWriteSignedInt(16, posY);
                            p.bitWriteUnsignedInt(8, surfacebody);
                            p.bitWriteString(name);
                            p.bitWriteUnsignedInt(5, colorModel);
                            p.bitWriteString(this.pseudo);
                            p.bitWriteUnsignedInt(32, parseInt(GlobalProperties.getServerTime()[0]) + 3300);
                            data = {
                                id: 5,
                                sid: obj_id,
                                active: true,
                                data: [29, objectId - 10000, p],
                                map: true,
                                close: 1
                            }, id = this.writeMapFXChange(data);
                            setTimeout(function() {
                                map.delete(id);
                                data.active = false;
                                id = this.writeMapFXChange(data);
                                map.delete(id);
                                p = new SocketMessage();
                                p.bitWriteBoolean(arrosed);
                                p.bitWriteSignedInt(16, posX);
                                p.bitWriteSignedInt(16, posY);
                                p.bitWriteUnsignedInt(8, surfacebody);
                                p.bitWriteString(name);
                                p.bitWriteUnsignedInt(5, colorModel);
                                p.bitWriteString(this.pseudo);
                                p.bitWriteUnsignedInt(32, parseInt(GlobalProperties.getServerTime()[0]));
                                data = {
                                    id: 5,
                                    sid: obj_id,
                                    active: true,
                                    data: [29, objectId - 10000, p],
                                    map: true,
                                    close: 1
                                }, id = this.writeMapFXChange(data);
                                map.data.FLOWER[obj_id] = [id, posX, posY, surfacebody, name, colorModel, this.pseudo, objectId];
                                setTimeout(function() {
                                    map.delete(map.data.FLOWER[obj_id][0]);
                                    data.active = false;
                                    id = this.writeMapFXChange(data);
                                    map.delete(id);
                                }.bind(this), 15 * 60 * 1000);
                            }.bind(this), 6 * 60 * 1000);
                        }.bind(this), 3 * 60 * 1000);
                    }
                } else if (objectId == 42) {
                    let jsp = loc5.bitReadUnsignedInt(2),
                        fxsid = loc5.bitReadUnsignedInt(GlobalProperties.BIT_FX_SID),
                        type = loc5.bitReadUnsignedInt(5);
                    if (!this.data.FLOWER) {
                        this.data.FLOWER = true;
                        let p = new SocketMessage();
                        p.bitWriteUnsignedInt(5, type);
                        p.bitWriteUnsignedInt(5, 1);
                        let data_r = {
                                loc17: true,
                                id: 6,
                                sid: 42,
                                active: true,
                                data: [29, 42, p],
                                map: true
                            },
                            data = this.writeUserFXChange(objectId, data_r);
                        setTimeout(function() {
                            this.map.maps[this.mapId].delete(data);
                            data_r.active = false;
                            data = this.writeUserFXChange(objectId, data_r);
                            this.map.maps[this.mapId].delete(data);
                            delete this.data.FLOWER;
                        }.bind(this), 60 * 1000);
                    }
                } else if (objectId == 10125) {
                    if (hasData) {
                        let close = loc5.bitReadUnsignedInt(2)
                        let p = new SocketMessage();
                        if (this.data.BALEYY == 2) return;
                        if (!this.data.BALEYY) {
                            let color = loc5.bitReadBoolean();
                            p.bitWriteBoolean(false);
                            p.bitWriteBoolean(false);
                            this.data.BALEYY = 1;
                        } else {
                            let direction = loc5.bitReadBoolean();
                            p.bitWriteBoolean(true);
                            p.bitWriteBoolean(this.mainUser.direction);
                            this.data.BALEYY = 2;
                        }
                        let data_r = {
                                loc17: true,
                                id: 6,
                                sid: objectId,
                                active: true,
                                data: [21, objectId - 10000, p],
                                map: true
                            },
                            data = this.writeUserFXChange(objectId, data_r);

                        data.push(0);
                        this.fxUser[objectId] = data;
                        if (this.data.BALEYY == 2) {
                            setTimeout(function() {
                                data_r.active = false;
                                this.writeUserFXChange(objectId, data_r);
                                delete this.fxUser[objectId];
                                delete this.data.BALEYY;
                            }.bind(this), 1000);
                        }
                    }
                } else if (objectId == 33) {
                    if (hasData) {
                        let fxsid = binaryData.bitReadUnsignedInt(GlobalProperties.BIT_FX_SID);
                        let camera = this.cameraList.getCameraByMap(this.mapId);
                        for (var i in camera) this.teleportToMap(camera[i], this.map.maps[this.mapId].data.BLACK_HOLE[fxsid], this.serverId, 4);
                    }
                } else if ([10042, 10043, 10047].includes(objectId)) {
                    if (hasData) {
                        let close = binaryData.bitReadUnsignedInt(2),
                            color = binaryData.bitReadUnsignedInt(5),
                            p = new SocketMessage();
                        if (objectId == 10047) {
                            if (!this.data.BALLET) {
                                this.data.BALLET = true;
                            } else {
                                close = 2;
                                delete this.data.BALLET;
                            }
                            p.bitWriteUnsignedInt(32, 300);
                            p.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0]);
                        }
                        p.bitWriteUnsignedInt(5, color);
                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: !close,
                            data: [14, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);
                        if (!close) this.fxUser[objectId] = data;
                        else delete this.fxUser[objectId];
                    }
                } else if ([10180, 10181].includes(objectId)) {
                    if (hasData) {
                        let close = binaryData.bitReadUnsignedInt(2),
                            color = binaryData.bitReadUnsignedInt(5),
                            p = new SocketMessage();
                        p.bitWriteUnsignedInt(5, color);
                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: !close,
                            data: [28, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);
                        if (!close) this.fxUser[objectId] = data;
                        else delete this.fxUser[objectId];
                    }
                } else if ([10059, 10060, 10105, 10106, 10107, 10108].includes(objectId)) {
                    if (hasData) {
                        let close = binaryData.bitReadUnsignedInt(2),
                            p = new SocketMessage();
                        if (!this.data.MASQUE) {
                            this.data.MASQUE = objectId;
                        } else {
                            close = 2;
                            objectId = this.data.MASQUE;
                            delete this.data.MASQUE;
                        }
                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: !close,
                            data: [14, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);
                        if (!close) this.fxUser[objectId] = data;
                        else delete this.fxUser[objectId];
                    }
                } else if (objectId == 10112) {
                    if (hasData) {
                        let close = binaryData.bitReadUnsignedInt(2),
                            bin = null,
                            p = new SocketMessage();
                        if (close == 3) {
                            bin = binaryData.bitReadBinaryData();
                        }
                        let color = binaryData.bitReadUnsignedInt(5);
                        if (!this.data.BALLON) {
                            this.data.BALLON = objectId;
                        } else {
                            close = 2;
                            objectId = this.data.BALLON;
                            delete this.data.BALLON;
                        }
                        p.bitWriteUnsignedInt(5, color);
                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: !close,
                            data: [16, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);
                        if (!close) this.fxUser[objectId] = data;
                        else delete this.fxUser[objectId];
                    }
                } else if ([10081, 10099, 10087, 10084, 10083].includes(objectId)) {
                    if (hasData) {
                        let close = binaryData.bitReadUnsignedInt(2),
                            p = new SocketMessage();
                        if (!this.data.BOUET) {
                            this.data.BOUET = objectId;
                        } else {
                            close = 2;
                            objectId = this.data.BOUET;
                            delete this.data.BOUET;
                        }
                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: !close,
                            data: [18, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);
                        if (!close) this.fxUser[objectId] = data;
                        else delete this.fxUser[objectId];
                    }
                } else if ([10088, 10090, 10091].includes(objectId)) {
                    if (hasData) {
                        let close = binaryData.bitReadBoolean(),
                            p = new SocketMessage();
                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: close,
                            data: [18, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);
                        if (!close) this.fxUser[objectId] = data;
                        else delete this.fxUser[objectId];
                    }
                } else if ([10405].includes(objectId)) {
                    if (hasData) {
                        let close = binaryData.bitReadBoolean(),
                            p = new SocketMessage();
                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: close,
                            data: [60, 378, p],
                            map: true
                        });
                        data.push(0);
                        if (!close) this.fxUser[objectId] = data;
                        else delete this.fxUser[objectId];
                    }
                } else if (objectId == 10085) {
                    if (hasData) {
                        let close = binaryData.bitReadUnsignedInt(2),
                            p = new SocketMessage();
                        if (!this.data.BULLE) {
                            this.data.BULLE = objectId;
                        } else {
                            return;
                        }
                        let arr_data = {
                                loc17: true,
                                id: 6,
                                sid: objectId,
                                active: !close,
                                data: [18, objectId - 10000, p],
                                map: true
                            },
                            data = this.writeUserFXChange(objectId, arr_data);
                        data.push(0);
                        if (!close) {
                            this.fxUser[objectId] = data;
                            setTimeout(function() {
                                delete this.data.BULLE;
                                arr_data.active = false;
                                this.writeUserFXChange(objectId, arr_data);
                                delete this.fxUser[objectId];
                                delete this.data.BOUET;
                            }.bind(this), 30 * 1000);
                        }
                    }
                }   else if (objectId == 10100) { //[10100, 10101, 10102, 10103, 10104, 10105, 10106, 10107, 10108, 10109, 10110, 10200,].includes(objectId)
                    if (hasData) {
                        let posX = binaryData.bitReadSignedInt(17),
                        posY = binaryData.bitReadSignedInt(17),
                        mouseX = binaryData.bitReadSignedInt(17),
                        mouseY = binaryData.bitReadSignedInt(17),
                        popoId = binaryData.bitReadUnsignedInt(32),
                        ssid = 2000 + parseInt(Math.random() * 9871),
                        p = new SocketMessage();
                    p.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0]);
                    p.bitWriteUnsignedInt(10, GlobalProperties.getServerTime()[1]);
                    p.bitWriteSignedInt(17, posX);
                    p.bitWriteSignedInt(17, posY);
                    p.bitWriteSignedInt(17, mouseX);
                    p.bitWriteSignedInt(17, mouseY);
                    p.bitWriteUnsignedInt(32, popoId);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, this.uid);
                        let data = {
                                id: 5,
                                sid: objectId,
                                active: true,
                                data: [13, objectId - 10000, p],
                                map: true,
                                close: 1
                            },
                            id = this.writeMapFXChange(data);
                        let map = this.map.maps[this.mapId];
                        setTimeout(function() {
                            data.active = false;
                            this.fxManager.writeMapFXChange(this, data);
                            map.delete(id);
                        }.bind(this), 60 * 1000);
                    }
                }   else if ([10401, 10402, 10403].includes(objectId)) {
                    if (hasData) {
                        //posX = binaryData.bitReadSignedInt(17),
                               // posY = binaryData.bitReadSignedInt(17),
                               let mouseX = binaryData.bitReadSignedInt(17),
                                mouseY = binaryData.bitReadSignedInt(17),
                                ssid = 2000 + parseInt(Math.random() * 9871),
                                p = new SocketMessage();
                            p.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0]);
                            p.bitWriteUnsignedInt(10, GlobalProperties.getServerTime()[1]);
                          //  p.bitWriteSignedInt(17, posX);
                           // p.bitWriteSignedInt(17, posY);
                            p.bitWriteSignedInt(17, mouseX);
                            p.bitWriteSignedInt(17, mouseY);
                            p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, this.uid);
                            let data = {
                                    id: 4,
                                    sid: ssid,
                                    active: true,
                                    data: [61, objectId - 10000, p],
                                    map: true,
                                    close: 1
                                },
                                id = this.writeMapFXChange(data);
                            setTimeout(function() {
                                data.active = false;
                                this.fxManager.writeMapFXChange(this, data);
                                map.delete(id);
                            }.bind(this), 2 * 1000);
                    }
                } else if (objectId == 10113) {
                    if (hasData) {
                        let posX = binaryData.bitReadSignedInt(17),
                            posY = binaryData.bitReadSignedInt(17),
                            mouseX = binaryData.bitReadSignedInt(17),
                            mouseY = binaryData.bitReadSignedInt(17),
                            popoId = binaryData.bitReadUnsignedInt(32),
                            ssid = 2000 + parseInt(Math.random() * 9871),
                            p = new SocketMessage();
                        p.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0]);
                        p.bitWriteUnsignedInt(10, GlobalProperties.getServerTime()[1]);
                        p.bitWriteSignedInt(17, posX);
                        p.bitWriteSignedInt(17, posY);
                        p.bitWriteSignedInt(17, mouseX);
                        p.bitWriteSignedInt(17, mouseY);
                        p.bitWriteUnsignedInt(32, popoId);
                        p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, this.uid);
                        let data = {
                                id: 5,
                                sid: ssid,
                                active: true,
                                data: [20, objectId - 10000, p],
                                map: true,
                                close: 1
                            },
                            id = this.writeMapFXChange(data);
                        let map = this.map.maps[this.mapId];
                        if (!map.data.LANCE_POP) map.data.LANCE_POP = {};
                        map.data.LANCE_POP[ssid] = popoId;
                        setTimeout(function() {
                            data.active = false;
                            this.fxManager.writeMapFXChange(this, data);
                            map.delete(id);
                        }.bind(this), 4 * 1000);
                    }
                } else if (objectId == 10089) {
                    if (hasData) {
                        let posX = binaryData.bitReadSignedInt(16),
                            posY = binaryData.bitReadSignedInt(16),
                            surface = binaryData.bitReadUnsignedInt(8),
                            name = binaryData.bitReadString(),
                            userId = binaryData.bitReadUnsignedInt(GlobalProperties.BIT_USER_ID),
                            p = new SocketMessage();
                        p.bitWriteSignedInt(16, posX);
                        p.bitWriteSignedInt(16, posY);
                        p.bitWriteUnsignedInt(8, surface);
                        p.bitWriteString(name);
                        p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, userId);
                        let data = {
                                id: 5,
                                sid: objectId,
                                active: true,
                                data: [18, objectId - 10000, p],
                                map: true,
                                close: 1
                            },
                            id = this.writeMapFXChange(data);
                        let map = this.map.maps[this.mapId];
                        setTimeout(function() {
                            data.active = false;
                            this.fxManager.writeMapFXChange(this, data);
                            map.delete(id);
                        }.bind(this), 60 * 1000);
                    }
                } else if (objectId == 10110) {
                    if (hasData) {
                        let posX = binaryData.bitReadSignedInt(16),
                            posY = binaryData.bitReadSignedInt(16),
                            direction = binaryData.bitReadBoolean(),
                            map = this.map.maps[this.mapId],
                            p = new SocketMessage();
                        p.bitWriteSignedInt(16, posX);
                        p.bitWriteSignedInt(16, posY);
                        p.bitWriteBoolean(direction);
                        let data = {
                                id: 5,
                                sid: objectId,
                                active: true,
                                data: [20, objectId - 10000, p],
                                map: true,
                                close: 1
                            },
                            id = this.writeMapFXChange(data);
                        map.delete(id);
                    }
                } else if (objectId == 10093) {
                    if (hasData) {
                        let posX = binaryData.bitReadSignedInt(17),
                            posY = binaryData.bitReadSignedInt(17),
                            p = new SocketMessage();
                        let map = this.map.maps[this.mapId];
                        if (!map.data.TRAMPO) {
                            map.data.TRAMPO = {};
                        }
                        let pid = map.objectPid;
                        for (var i in map.data.TRAMPO) {
                            let obj = map.data.TRAMPO[i];
                            if (obj[2] <= posX + 30 && obj[2] >= posX - 30 && obj[3] <= posY + 30 && obj[3] >= posY - 30) {
                                pid = obj[1];
                            }
                        }
                        if (!map.data.TRAMPO[pid]) {
                            map.data.TRAMPO[pid] = [0, pid, posX, posY];
                        }
                        p.bitWriteUnsignedInt(2, 0);
                        p.bitWriteSignedInt(17, posX);
                        p.bitWriteSignedInt(17, posY);
                        p.bitWriteUnsignedInt(4, map.data.TRAMPO[pid][0]);
                        if (map.data.TRAMPO[pid][0] < 4) map.data.TRAMPO[pid][0]++;
                        let data = {
                                id: 5,
                                sid: pid,
                                active: true,
                                data: [19, objectId - 10000, p],
                                map: true,
                                close: 1
                            },
                            id = this.writeMapFXChange(data);
                        setTimeout(function() {
                            data.active = false;
                            this.fxManager.writeMapFXChange(this, data);
                            map.delete(id);
                            delete map.data.TRAMPO[pid];
                        }.bind(this), 60 * 1000);
                    }
                } else if (objectId == 10170) {
                    if (hasData) {
                        let activ = binaryData.bitReadBoolean(),
                            p = new SocketMessage();
                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: activ,
                            data: [27, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);
                        if (activ) this.fxUser[objectId] = data;
                        else delete this.fxUser[objectId];
                    }
                } else if (objectId == 10173) {
                    if (hasData) {
                        let activ = binaryData.bitReadBoolean(),
                            p = new SocketMessage();
                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: activ,
                            data: [27, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);
                        if (activ) this.fxUser[objectId] = data;
                        else delete this.fxUser[objectId];
                    }
                } else if (objectId == 10092) {
                    if (hasData) {
                        let activ = binaryData.bitReadBoolean(),
                            p = new SocketMessage();
                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: activ,
                            data: [19, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);
                        if (activ) this.fxUser[objectId] = data;
                        else delete this.fxUser[objectId];
                    }
                } else if (objectId == 10086) {
                    if (hasData) {
                        let close = binaryData.bitReadUnsignedInt(2),
                            p = new SocketMessage();
                        p.bitWriteUnsignedInt(32, 300);
                        p.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0]);
                        let data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: !close,
                            data: [18, objectId - 10000, p],
                            map: true
                        });
                        data.push(0);
                        if (!close) this.fxUser[objectId] = data;
                        else delete this.fxUser[objectId];
                    }
                } else if (objectId == 10078) {
                    let userId = loc5.bitReadUnsignedInt(GlobalProperties.BIT_USER_ID),
                        p = new SocketMessage(),
                        map = this.map.maps[this.mapId];
                    p.bitWriteSignedInt(17, this.mainUser.position.x / 100);
                    p.bitWriteSignedInt(17, this.mainUser.position.y / 100);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, this.uid);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, userId);
                    let data = {
                            id: 5,
                            sid: objectId,
                            active: true,
                            data: [18, 78, p],
                            map: true,
                            close: 1
                        },
                        id = this.writeMapFXChange(data);
                    setTimeout(function() {
                        data.active = false;
                        this.fxManager.writeMapFXChange(this, data);
                        map.delete(id);
                    }.bind(this), 5 * 60 * 1000);
                } else if (objectId == 10025) {
                    if (this.server.variable.maps[this.mapId][6] == 3 || this.data.MAISON_ACTIF && this.data.MAISON_ACTIF.protectMode == 1 || this.mapId == 16 || this.mapId == 161 || this.mapId == 115) {
                        this.sendMsg("Cette map est protégée contre les ondes de choques ^^");
                        return;
                    }
                    if (!this.data.ONDE) {
                        this.data.ONDE = true;
                        let p = new SocketMessage();
                        this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: true,
                            data: [9, 25, p],
                            map: true
                        });
                        setTimeout(function() {
                            delete this.data.ONDE;
                        }.bind(this), 2000);
                    }
                } else if (objectId == 10032) {
                    if (hasData) {
                        let posX = binaryData.bitReadSignedInt(16),
                            posY = binaryData.bitReadSignedInt(16),
                            mapId = binaryData.bitReadUnsignedInt(GlobalProperties.BIT_MAP_ID),
                            ssid = 1000 + parseInt(Math.random() * 9871),
                            p2 = new SocketMessage(),
                            p = new SocketMessage();
                        p.bitWriteBoolean(true);
                        p.bitWriteUnsignedInt(GlobalProperties.BIT_MAP_ID, mapId);
                        p.bitWriteSignedInt(16, posX);
                        p.bitWriteSignedInt(16, posY);
                        p.bitWriteBoolean(false); //modo
                        p2.bitWriteBoolean(false);
                        p2.bitWriteUnsignedInt(GlobalProperties.BIT_MAP_ID, mapId);
                        p2.bitWriteSignedInt(16, respawn[mapId][0] / 100);
                        p2.bitWriteSignedInt(16, respawn[mapId][1] / 100);
                        p2.bitWriteBoolean(false); //modo
                        let data = {
                                id: 5,
                                sid: ssid,
                                active: true,
                                data: [8, 32, p],
                                map: true,
                                close: 1
                            },
                            id = this.writeMapFXChange(data);
                        let data2 = data;
                        data2.data[2] = p2;
                        let id2 = this.writeMapFXChange(data2, mapId);
                        map = this.map.maps[this.mapId];
                        if (!map.data.BLACK_HOLE) map.data.BLACK_HOLE = {};
                        map.data.BLACK_HOLE[ssid] = mapId;
                        setTimeout(function() {
                            data.active = false;
                            data2.active = false;
                            this.fxManager.writeMapFXChange(this, data);
                            this.fxManager.writeMapFXChange(this, data2, mapId);
                            map.delete(id);
                            this.map.maps[mapId].delete(id2);
                        }.bind(this), 10 * 1000);
                    }
                } else if (objectId == 10227) {
                    if (hasData) {
                        let map = this.map.maps[this.mapId];
                        if (!map.data.LAMPION_MAP) map.data.LAMPION_MAP = 0;
                        if (map.data.LAMPION_MAP < 4) {
                            map.data.LAMPION_MAP++;
                            let color = binaryData.bitReadUnsignedInt(5),
                                text = binaryData.bitReadString(),
                                p = new SocketMessage();
                            p.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0]);
                            p.bitWriteSignedInt(17, this.mainUser.position.x / 100);
                            p.bitWriteSignedInt(17, this.mainUser.position.y / 100);
                            p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, this.uid);
                            p.bitWriteString(this.pseudo);
                            p.bitWriteString(text);
                            p.bitWriteUnsignedInt(5, color);
                            let data = {
                                    id: 5,
                                    sid: objectId,
                                    active: true,
                                    data: [8, 227, p],
                                    map: true,
                                    close: 1
                                },
                                id = this.writeMapFXChange(data)
                            map = this.map.maps[this.mapId];
                            setTimeout(function() {
                                data.active = false;
                                this.fxManager.writeMapFXChange(this, data);
                                map.delete(id);
                                map.data.LAMPION_MAP--;
                                if (map.data.LAMPION_MAP < 0) map.data.LAMPION_MAP = 0;
                            }.bind(this), 20 * 60 * 1000);
                        }
                    }
                } else if (objectId == 10034) {
                    if (hasData) {
                        let seed = binaryData.bitReadUnsignedInt(10),
                            color = binaryData.bitReadUnsignedInt(3),
                            posX = binaryData.bitReadSignedInt(16),
                            posY = binaryData.bitReadSignedInt(16),
                            p = new SocketMessage();
                        p.bitWriteUnsignedInt(10, seed);
                        p.bitWriteUnsignedInt(3, color);
                        p.bitWriteSignedInt(16, posX);
                        p.bitWriteSignedInt(16, posY);
                        let data = {
                                id: 5,
                                sid: objectId,
                                active: true,
                                data: [5, 34, p],
                                map: true,
                                close: 1
                            },
                            id = this.writeMapFXChange(data);
                        this.map.maps[this.mapId].delete(id);
                    }
                } else if (objectId == 10020) {
                    if (hasData) {
                        if (this.server.variable.maps[this.mapId][6] == 3 || this.data.MAISON_ACTIF && this.data.MAISON_ACTIF.protectMode == 1 || this.mapId == 16 || this.mapId == 161 || this.mapId == 115) {
                            this.sendMsg("Cette map est protégée contre les bombes citrouilles ^^");
                            return;
                        }
                        const posX = binaryData.bitReadSignedInt(16);
                        const posY = binaryData.bitReadSignedInt(16);
                        const surface = binaryData.bitReadUnsignedInt(8);
                        const name = binaryData.bitReadString();
                        var p = new SocketMessage();
                        p.bitWriteSignedInt(16, posX);
                        p.bitWriteSignedInt(16, posY);
                        p.bitWriteUnsignedInt(8, surface);
                        p.bitWriteString(name);
                        p.bitWriteString(this.pseudo);
                        var data = {
                            id: 5,
                            sid: objectId,
                            active: true,
                            data: [5, 20, p],
                            map: true,
                            close: 1
                        };
                        let id = this.writeMapFXChange(data),
                            map = this.map.maps[this.mapId];
                        setTimeout(function() {
                            data.active = false;
                            this.fxManager.writeMapFXChange(this, data);
                            map.delete(id);
                        }.bind(this), parseInt(Math.random() * 15) * 1000);
                    }
                } else if (objectId == 10156) {
                    if (hasData) {
                        if (this.server.variable.maps[this.mapId][6] == 3 || this.data.MAISON_ACTIF && this.data.MAISON_ACTIF.protectMode == 1 || this.mapId == 16 || this.mapId == 161 || this.mapId == 115) {
                            this.sendMsg("Cette map est protégée contre les bombes coeurs ^^");
                            return;
                        }
                        const posX = binaryData.bitReadSignedInt(16);
                        const posY = binaryData.bitReadSignedInt(16);
                        const surface = binaryData.bitReadUnsignedInt(8);
                        const name = binaryData.bitReadString();
                        var p = new SocketMessage();
                        p.bitWriteSignedInt(16, posX);
                        p.bitWriteSignedInt(16, posY);
                        p.bitWriteUnsignedInt(8, surface);
                        p.bitWriteString(name);
                        p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, this.uid);
                        var data = {
                            id: 5,
                            sid: objectId,
                            active: true,
                            data: [23, objectId - 10000, p],
                            map: true,
                            close: 1
                        };
                        var id = this.writeMapFXChange(data);
                        var map = this.map.maps[this.mapId];
                        var _this = this;
                        setTimeout(function() {
                            data.active = false;
                            _this.fxManager.writeMapFXChange(_this, data);
                            map.delete(id);
                        }, parseInt(Math.random() * 15) * 1000);
                    }
                } else if (objectId == 10021) {
                    if (hasData) {
                        let activ = binaryData.bitReadBoolean(),
                            name = "";
                        if (activ) {
                            name = binaryData.bitReadString();
                            //this.SkinColor.readBinaryColor(binaryData);
                        }
                        if (!this.data.CORPS_ASTRAL) this.data.CORPS_ASTRAL = [null, this.mapId, this.mainUser.skinId, this.mainUser.position];
                        let map = this.map.maps[this.data.CORPS_ASTRAL[1]];
                        this.reloadSkin(this.mainUser.skinId);
                        let p = new SocketMessage(),
                            data = null
                        p.bitWriteUnsignedInt(32, 300);
                        p.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0]);
                        data = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: activ,
                            data: [3, objectId - 10000, p],
                            close: 1,
                            map: true
                        });
                        if (activ) {
                            data.push(0);
                            this.mainUser.skinId = 96;
                            this.fxUser[objectId] = data;
                        } else {
                            delete this.fxUser[objectId];
                        }
                        p = new SocketMessage();
                        p = this.writePlayerState(p, true, false, false, false);
                        p.bitWriteUnsignedInt(GlobalProperties.BIT_SKIN_ID, this.data.CORPS_ASTRAL[2]);
                        p.bitWriteString(this.pseudo);
                        p.bitWriteString(name);
                        for (var i in this.mainUser.skinColor) {
                            p.bitWriteUnsignedInt(8, this.mainUser.skinColor[i]);
                        }
                        p.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0]);
                        p.bitWriteUnsignedInt(10, GlobalProperties.getServerTime()[1]);
                        data = {
                            id: 5,
                            sid: objectId,
                            active: activ,
                            data: [3, 22, p],
                            map: true,
                            close: 1
                        };
                        if (!this.data.CORPS_ASTRAL[0]) this.data.CORPS_ASTRAL[0] = id = this.writeMapFXChange(data, this.data.CORPS_ASTRAL[1]);
                        if (!activ && this.data.CORPS_ASTRAL[0]) {
                            map.delete(this.data.CORPS_ASTRAL[0]);
                            this.fxManager.writeMapFXChange(this, data, this.data.CORPS_ASTRAL[1]);
                            this.reloadSkin(this.data.CORPS_ASTRAL[2]);
                            if (this.mapId != this.data.CORPS_ASTRAL[1]) {
                                this.teleportToMap(1, this.data.CORPS_ASTRAL[1], this.serverId, 2);
                            }
                            delete this.data.CORPS_ASTRAL;
                        }
                    }
                } else if (objectId >= 11000 && objectId < 12000) {
                    if (this.data.ISDIE) return;
                    if (hasData) {
                        let reload = false;
                        if (this.data.MONTURE) {
                            if (this.data.MONTURE[1] != objectId) reload = objectId;
                            this.data.MONTURE[1] = objectId;
                        }
                        if (!this.data.MONTURE) this.data.MONTURE = [false, objectId];
                        this.data.MONTURE[0] = !this.data.MONTURE[0];
                        let active = binaryData.bitReadUnsignedInt(2),
                            color = binaryData.bitReadUnsignedInt(5);
                        let p = new SocketMessage(),
                            p2 = new SocketMessage();
                        p2.bitWriteUnsignedInt(GlobalProperties.BIT_SKIN_ID, this.mainUser.skinId);
                        for (var i in this.mainUser.skinColor) {
                            p2.bitWriteUnsignedInt(8, this.mainUser.skinColor[i]);
                        }
                        p.bitWriteBoolean(true);
                        p.bitWriteUnsignedInt(6, 5);
                        p.bitWriteUnsignedInt(GlobalProperties.BIT_SKIN_ID, objectId - 11000);
                        p.bitWriteBoolean(true);
                        p.bitWriteUnsignedInt(6, 6);
                        let colorList = this.mainUser.skinColor;
                        if (objectId - 11000 in montureColor) colorList = montureColor[objectId - 11000][color];
                        for (var i in colorList) p.bitWriteUnsignedInt(8, colorList[i]);
                        p.bitWriteBoolean(true);
                        p.bitWriteUnsignedInt(6, 10);
                        p.bitWriteBinaryData(p2);
                        p.bitWriteBoolean(false);
                        let data = this.writeUserFXChange(18250, {
                            loc17: true,
                            id: 4,
                            sid: 16,
                            active: this.data.MONTURE[0],
                            data: p,
                            map: true
                        });
                        if (this.data.MONTURE[0]) this.fxUser[18250] = data;
                        if (!this.data.MONTURE[0]) {
                            delete this.fxUser[18250];
                            if (!reload) delete this.data.MONTURE;
                        }
                        if (reload) {
                            let packet = new SocketMessage();
                            packet.bitWriteUnsignedInt(32, reload);
                            packet.bitWriteBoolean(true);
                            let packet2 = new SocketMessage();
                            packet2.bitWriteUnsignedInt(2, active);
                            packet2.bitWriteUnsignedInt(5, color);
                            packet.bitWriteBinaryData(packet2);
                            this.parsedEventMessage(6, 8, packet)
                        }
                    }
                } else if (objectId >= 12000) {
                    if (hasData) {
                        let fx_id = parseInt(objectId / 1000) - 12,
                            fx_sid = parseInt((objectId / 1000).toString().split(".")[1]);
                        let activ = binaryData.bitReadUnsignedInt(2),
                            p = new SocketMessage(),
                            data = null;
                        if (activ == 3) {
                            data = binaryData.bitReadBinaryData();
                        }
                        let color = binaryData.bitReadUnsignedInt(5);
                        p.bitWriteUnsignedInt(5, color);
                        if (!this.data.BLIBLI) this.data.BLIBLI = {};
                        if (!this.data.BLIBLI_ACCOUNT) this.data.BLIBLI_ACCOUNT = 0;
                        if (!(objectId in this.data.BLIBLI) || activ == 3 || !this.data.BLIBLI[objectId]) {
                            if (activ != 3) this.data.BLIBLI_ACCOUNT++;
                            if (this.data.BLIBLI_ACCOUNT > 3) {
                                this.sendMsg("Tu as trop de bliblis activés!");
                                return;
                            }
                            this.data.BLIBLI[objectId] = true
                        } else {
                            this.data.BLIBLI_ACCOUNT--;
                            if (this.data.BLIBLI_ACCOUNT < 0) this.data.BLIBLI_ACCOUNT = 0;
                            this.data.BLIBLI[objectId] = false;
                        }
                        let active = this.data.BLIBLI[objectId];
                        if (data != null) p = data;
                        let fxdata = this.writeUserFXChange(objectId, {
                            loc17: true,
                            id: 6,
                            sid: objectId,
                            active: active,
                            data: [fx_id, fx_sid, p],
                            close: 1,
                            map: true
                        });
                        fxdata.push(0);
                        if (active) this.fxUser[objectId] = fxdata;
                        else delete this.fxUser[objectId];
                    }
                }
                /*
                                if (reload_pouvoir) {
                                    let pouvoir = this.pouvoirs[objectId];
                                    pouvoir.count -= 1;
                                    let p = new SocketMessage(2, 12);
                                    p.bitWriteBoolean(true);
                                    p.bitWriteUnsignedInt(8, 1);
                                    p.bitWriteUnsignedInt(32, objectId);
                                    p.bitWriteUnsignedInt(32, pouvoir.count);
                                    p.bitWriteUnsignedInt(32, pouvoir.expire);
                                    p.bitWriteBinaryData(new SocketMessage());
                                    p.bitWriteBoolean(false);
                                    this.send(p);
                                    this.query(`UPDATE object SET count = ${pouvoir.count} WHERE login = '${this.login}' AND ObjectId = ${objectId}`);
                                }*/
            } else if (stype == 15) { 
                const fx_id = loc5.bitReadUnsignedInt(GlobalProperties.BIT_FX_ID);
                if (fx_id == 14) {//Load other univers 
                    if (loc5.bitReadBoolean()) {
                        const new_server = loc5.bitReadUnsignedInt(GlobalProperties.BIT_SERVER_ID);
                        if (new_server != this.serverId) {
                            var packet = new SocketMessage(4, 2, this);
                            packet.bitWriteUnsignedInt(GlobalProperties.BIT_MAP_ID, this.mapId);
                            packet.bitWriteUnsignedInt(GlobalProperties.BIT_SERVER_ID, new_server);
                            packet.bitWriteUnsignedInt(GlobalProperties.BIT_MAP_FILEID, this.mapId);
                            packet.bitWriteUnsignedInt(GlobalProperties.BIT_METHODE_ID, 4);
                            this.send(packet);
                        }
                    }
                } else if (fx_id == 3) {
                    let p = new SocketMessage();
                    p.bitWriteUnsignedInt(2, 1);
                    let data = {
                            id: 5,
                            sid: 0,
                            active: true,
                            data: [19, 93, p],
                            map: true,
                            close: 1
                        },
                        id = this.writeMapFXChange(data);
                    this.map.maps[this.mapId].delete(id);
                } else if (fx_id == 7) {
                    let fxsid = loc5.bitReadUnsignedInt(GlobalProperties.BIT_FX_SID);
                    let name = {
                        14: "POTION_SPEED",
                        15: "POTION_JUMP",
                        16: "POTION_SWIM",
                        17: "POTION_SMALL",
                        18: "POTION_COLOR",
                    }
                    let name2 = {
                        162: "POTION_PIERRE",
                        163: "POTION_ETOILE",
                        164: "POTION_PLUME", 
                       // 166: "POTION_GROS_CACA",
                        165: "POTION_FOUDRE",
                        370: "POTION_GLACE",
                        //18: "POTION_COLOR",
                        //18: "POTION_COLOR",
                    }
                    let name3 = {
                        166: "POTION_GROS_CACA",
                    }
                    let fantomename = {
                        116: "POTION_FANTOME",
                    }
                    let id = this.map.maps[this.mapId].data.LANCE_POP[fxsid];
                    this.setPotion(name[id], id, 60);
                    this.setPotion2(name2[id], id, 60);
                    this.setPotionBigpoop(name3[id], id, 60);
                    this.setPotionFantome(fantomename[id], id, 60);
                } else if (fx_id == 31) {
                    if (this.mapId != 501) this.teleportToMap(1, 501, this.serverId, 4);
                } else if (fx_id == 38) {
                    if (this.mapId != 190) this.teleportToMap(1, 190, this.serverId, 4);
                } else if (fx_id == 13 || fx_id == 11) {
                    if (this.mapId != 193) this.teleportToMap(1, 193, this.serverId, 4);
                } else if (fx_id == 17) {
                    if (loc5.bitReadBoolean()) { //Burn map i guess "FlemmeMap" 
                        let p = new SocketMessage();
                        p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, 9999);
                        p.bitWriteSignedInt(16, this.mainUser.position.x / 100);
                        p.bitWriteSignedInt(16, this.mainUser.position.y / 100);
                        let fxdata = this.writeUserFXChange(17, {
                            loc17: true,
                            id: 6,
                            sid: 17,
                            active: true,
                            data: [30, 3, p],
                            close: 1,
                            map: true
                        });
                        fxdata.push(0);
                        this.fxUser[17] = fxdata;
                    }
                } else if (fx_id == 12) {
                    if (this.data.LAST_MAP && this.bbl >= 5) {
                        this.teleportToMap(1, this.data.LAST_MAP, this.serverId, 4);
                        this.bbl -= 5;
                        this.server.database('UPDATE users SET bbl = ? WHERE login = ?', [this.bbl, this.login]);
                        this.send(new SocketMessage(2, 13));
                        delete this.data.LAST_MAP;
                    }
                } else if (fx_id == 39) { //Change skin under explosion goudron 
                    let userId = loc5.bitReadUnsignedInt(GlobalProperties.BIT_USER_ID);
                    if (this.mainUser.skinId != 657) {
                        let oldId = this.mainUser.skinId;
                        this.reloadSkin(657);
                        setTimeout(function() {
                            this.reloadSkin(oldId);
                        }.bind(this), 15 * 1000);
                    }
                } else if (fx_id == 9) { //Change skin under explosion <3 
                    let userId = loc5.bitReadUnsignedInt(GlobalProperties.BIT_USER_ID);
                    if (this.mainUser.skinId != 137) {
                        let oldId = this.mainUser.skinId;
                        this.reloadSkin(137);
                        setTimeout(function() {
                            this.reloadSkin(oldId);
                        }.bind(this), 15 * 1000);
                    }
                }
            }
        } else if (type == 8) {
            if (stype == 1) {
                let type = loc5.bitReadUnsignedInt(8);
                if (type == 1) {
                    this.data.NAVAL = ["WAIT", this.server.conf.data.navalId, null, []];
                    this.server.conf.data.navalId++;
                    let user = loc5.bitReadUnsignedInt(GlobalProperties.BIT_USER_ID),
                        player = this.getUserByUid(user),
                        p = new SocketMessage();
                    if (!player.data.NAVAL) {
                        p.bitWriteString(this.pseudo);
                        p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, this.uid);
                        p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, this.pid);
                        player.writeUserFXChange(type, {
                            loc17: true,
                            id: 6,
                            sid: type,
                            active: true,
                            data: [10, 1, p],
                            map: false
                        });
                    } else if (player.data.NAVAL[0] == "WAIT") {
                        let pid = this.server.conf.data.navalId;
                        this.server.conf.data.navalId++;
                        player.data.NAVAL[0] = "LAUNCH";
                        this.data.NAVAL[0] = "LAUNCH";
                        player.data.NAVAL[1] = pid;
                        this.data.NAVAL[1] = pid;
                        this.data.NAVAL[2] = player;
                        player.data.NAVAL[2] = this;
                        p.bitWriteUnsignedInt(16, player.data.NAVAL[1]);
                        p.bitWriteString(this.pseudo);
                        p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, this.uid);
                        p.bitWriteBoolean(false);
                        player.writeUserFXChange(type, {
                            loc17: true,
                            id: 6,
                            sid: type,
                            active: true,
                            data: [10, 2, p],
                            map: false
                        });
                        p = new SocketMessage();
                        p.bitWriteUnsignedInt(16, player.data.NAVAL[1]);
                        p.bitWriteString(player.pseudo);
                        p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, player.uid);
                        p.bitWriteBoolean(false);
                        this.writeUserFXChange(type, {
                            loc17: true,
                            id: 6,
                            sid: type,
                            active: true,
                            data: [10, 2, p],
                            map: false
                        });
                    }
                } else if (type == 3) {
                    let gameId = loc5.bitReadUnsignedInt(16),
                        data = [];
                    while (loc5.bitReadBoolean()) {
                        let donnes = {
                            TYPE: loc5.bitReadUnsignedInt(3),
                            XPOS: loc5.bitReadUnsignedInt(5),
                            YPOS: loc5.bitReadUnsignedInt(5),
                            ROT: loc5.bitReadUnsignedInt(2),
                            data: []
                        };
                        while (loc5.bitReadBoolean()) {
                            donnes.data.push([loc5.bitReadSignedInt(3), loc5.bitReadSignedInt(3)]);
                        }
                        data.push(donnes);
                    }
                    this.data.NAVAL[3] = data;
                    this.data.NAVAL[2].writeUserFXChange(type, {
                        loc17: true,
                        id: 6,
                        sid: type,
                        active: true,
                        data: [10, 4, new SocketMessage()],
                        map: false
                    });
                }

            }

            //Donjon

            else if (type == 6) {
                let type = loc5.bitReadUnsignedInt(8);
            if (type == 1) {
                this.data.MEDIEVALLUNCHER = ["WAIT", this.server.conf.data.MedievalId, null, []];
                this.server.conf.data.MedievalId++;
                let user = loc5.bitReadUnsignedInt(GlobalProperties.BIT_USER_ID),
                    player = this.getUserByUid(user),
                    p = new SocketMessage();
                } else if (player.data.MEDIEVALLUNCHER[0] == "WAIT") {
                    let pid = this.server.conf.data.MedievalId;
                    this.server.conf.data.MedievalId++;
                    player.data.MEDIEVALLUNCHER[0] = "LAUNCH";
                    this.data.MEDIEVALLUNCHER[0] = "LAUNCH";
                    this.data.MEDIEVALLUNCHER[2] = player;
                    player.data.MEDIEVALLUNCHER[2] = this;
                    p.bitWriteUnsignedInt(16, player.data.MEDIEVALLUNCHER[1]);
                    p.bitWriteString(this.pseudo);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, this.uid);
                    p.bitWriteBoolean(false);
                    player.writeUserFXChange(type, {
                        loc17: true,
                        id: 6,
                        sid: type,
                        active: true,
                        data: [10, 2, p],
                        map: false
                    });
                    p = new SocketMessage();
                    p.bitWriteUnsignedInt(16, player.data.MEDIEVALLUNCHER[1]);
                    p.bitWriteString(player.pseudo);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, player.uid);
                    p.bitWriteBoolean(false);
                    this.writeUserFXChange(type, {
                        loc17: true,
                        id: 6,
                        sid: type,
                        active: true,
                        data: [10, 2, p],
                        map: false
                    });
                }
            }
            if (type == 4) {
                this.data.MEDIEVALLUNCHER = ["WAIT", this.server.conf.data.MedievalId, null, []];
                this.server.conf.data.MedievalId++;
                let user = loc5.bitReadUnsignedInt(GlobalProperties.BIT_USER_ID),
                    player = this.getUserByUid(user),
                    p = new SocketMessage();
                if (!player.data.MEDIEVALLUNCHER) {
                    p.bitWriteString(this.pseudo);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, this.uid);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, this.pid);
                    player.writeUserFXChange(type, {
                        loc17: true,
                        id: 6,
                        sid: type,
                        active: true,
                        data: [10, 1, p],
                        map: false
                    });
                 }

            }
            if (stype == 3) { //Send Player To the dongeon 
                this.data.MEDIEVALLUNCHER = ["WAIT", this.server.conf.data.MedievalId, null, []];
                this.server.conf.data.MedievalId++;
                let user = loc5.bitReadUnsignedInt(GlobalProperties.BIT_USER_ID),
                    player = this.getUserByUid(user),
                    p = new SocketMessage();
                
                    // tp to map 499[partyid]
            }
            if (stype == 4) { //Invite Player To the dongeon 
                this.data.MEDIEVALLUNCHER = ["WAIT", this.server.conf.data.MedievalId, null, []];
                this.server.conf.data.MedievalId++;
                let user = loc5.bitReadUnsignedInt(GlobalProperties.BIT_USER_ID),
                    player = this.getUserByUid(user),
                    p = new SocketMessage();
                if (!player.data.MEDIEVALLUNCHER) {
                    p.bitWriteString(this.pseudo);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, this.uid);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, this.pid);
                    player.writeUserFXChange(type, {
                        loc17: true,
                        id: 6,
                        sid: type,
                        active: true,
                        data: [10, 1, p],
                        map: false
                    });
                 }
            }
            if (stype == 5) { //Invited Player Answer
                this.data.MEDIEVALLUNCHER = ["WAIT", this.server.conf.data.MedievalId, null, []];
                this.server.conf.data.MedievalId++;
                let user = loc5.bitReadUnsignedInt(GlobalProperties.BIT_USER_ID),
                    player = this.getUserByUid(user),
                    p = new SocketMessage();
                if (!player.data.MEDIEVALLUNCHER) {
                    p.bitWriteString(this.pseudo);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, this.uid);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, this.pid);
                    player.writeUserFXChange(type, {
                        loc17: true,
                        id: 6,
                        sid: type,
                        active: true,
                        data: [10, 1, p],
                        map: false
                    });
                 }
            }
     





        } else if (type == 9) {
            if (stype == 1) {
                const s_type = loc5.bitReadUnsignedInt(3);
                if (this.mapId == 445 || this.mapId == 408) { //spaceship map tp
                    const planete = loc5.bitReadUnsignedInt(GlobalProperties.BIT_MAP_PLANETID);
                    if (planete == 1) {
                        this.transportToPlanete = 408;
                    } else if (planete == 0) {
                        this.transportToPlanete = 445;
                    }
                    let camera = this.cameraList.getCameraByMap(this.mapId);
                    for (var i in camera) this.teleportToMap(camera[i], 355, this.serverId, 0);
                } else if (this.mapId == 18) { //tower speed 
                    let p = new SocketMessage(),
                        id = this.fxManager.fxsid;
                    p.bitWriteBoolean(true);
                    p.bitWriteUnsignedInt(6, 2);
                    p.bitWriteSignedInt(9, 2.5 * 100);
                    p.bitWriteBoolean(false);
                    let data = this.writeUserFXChange(id, {
                        loc17: true,
                        id: 4,
                        sid: 0,
                        active: true,
                        data: p,
                        map: true
                    });
                    this.fxUser[id] = data;
                    setTimeout(function() {
                        delete this.fxUser[id];
                        this.writeUserFXChange(id, {
                            loc17: true,
                            id: 4,
                            sid: 0,
                            active: false,
                            data: p,
                            map: true
                        });
                    }.bind(this), 20 * 1000);
                } else if (this.mapId == 521) {  //Pince Spooky 
                    let channel = loc5.bitReadUnsignedInt(GlobalProperties.BIT_CHANNEL_ID),
                        win = loc5.bitReadBoolean(),
                        p = this.getChannel(channel);
                    p.bitWriteUnsignedInt(3, s_type);
                    if (s_type == 0) {
                        p.bitWriteUnsignedInt(7, 1);
                        p.bitWriteBoolean(true);
                    } else {
                        let kdo = "";
                        this.bbl--;
                        if (win) {
                            let chance = parseInt(Math.random() * 100) + 1;
                            if (chance.between(1,11)) { //chance <= 1 && chance >= 11
                                kdo = "Tu as perdu :x";
                            } else if (chance.between(12,95)) { //chance >= 95 && chance <= 12    
                                let bbl = parseInt(Math.random() * 1700) + 300;
                                this.bbl += bbl;
                                kdo = `${bbl} BBL`;
                            } else {
                                let bbl = parseInt(Math.random() * 4700) + 300;
                                this.bbl += bbl;
                                kdo = `${bbl} BBL`;
                            }
                        } else {
                            this.sendMsg("Bouuuh!! Tu as perdu :x");
                        }
                        p.bitWriteBoolean(win);
                        p.bitWriteUnsignedInt(GlobalProperties.BIT_FX_SID, 1);
                        p.bitWriteString(kdo);
                        this.query(`UPDATE users SET bbl = ${this.bbl} WHERE id=${this.uid}`);
                        this.send(new SocketMessage(2, 13));
                    }
                    this.send(p);
                } else if (this.mapId == 355) { //transition map spaceship
                    if (this.transportToPlanete != 0) {
                        let camera = this.cameraList.getCameraByMap(this.mapId);
                        for (var i in camera) this.teleportToMap(camera[i], this.transportToPlanete, this.serverId, 0);
                    }
                    this.transportToPlanete = 0;
                } else if (this.mapId == 343) { //Miss pipi doors + tips
                    var loc1 = true;
                    var p = new SocketMessage();
                    p.bitWriteUnsignedInt(3, 0);
                    if (s_type == 1 && this.sex == 1) {
                        loc1 = false;
                        this.mainUser.position.x = 94900;
                        let camera = this.cameraList.getCameraByMap(this.mapId);
                        for (var i in camera) this.teleportToMap(camera[i], 342, this.serverId, 0);
                    } else if (s_type == 0 && this.sex == 2) {
                        loc1 = false;
                        this.mainUser.position.x = 100;
                        let camera = this.cameraList.getCameraByMap(this.mapId);
                        for (var i in camera) this.teleportToMap(camera[i], 344, this.serverId, 0);
                    } else if (s_type == 2) {
                        loc1 = false;
                    } else if (s_type == 3) {
                        if (this.bbl < 1) loc1 = false;
                        p = new SocketMessage();
                        p.bitWriteUnsignedInt(3, 1);
                        p.bitWriteBoolean(true); // true = animation buy
                        p.bitWriteBoolean(false); // true = gagné
                        p.bitWriteUnsignedInt(GlobalProperties.BIT_SKIN_ID, 4); //kdo, voir swf (343)
                        if (loc1) this.bbl--;
                    }
                    if (loc1) {
                        this.fxManager.writeUserFXChange(this, {
                            loc17: true,
                            id: 8,
                            sid: 0,
                            active: true,
                            data: [p],
                            map: false
                        });
                    }
                } else if ([448, 449, 450, 451, 452, 453, 454, 455].includes(this.mapId)) {
                    if (s_type == 2 && this.data.PYRAMIDE) {
                        this.data.PYRAMIDE[1] += 1;
                        let p = new SocketMessage();
                        p.bitWriteUnsignedInt(3, 1);
                        p.bitWriteBoolean(false);
                        this.writeUserFXChange(8, {
                            loc17: true,
                            id: 8,
                            sid: 8,
                            active: true,
                            data: [p],
                            map: true
                        });
                    }
                } else if (this.mapId == 11) { //Irwish door
                    var code = "";
                    for (var i = 0; i < 4; i++) {
                        code += loc5.bitReadUnsignedInt(4).toString();
                    }
                    if (code == "7641") {
                        let camera = this.cameraList.getCameraByMap(this.mapId);
                        for (var i in camera) this.teleportToMap(camera[i], 354, this.serverId, 0);
                    }
                    var p = new SocketMessage();
                    p.bitWriteUnsignedInt(3, 0);
                    p.bitWriteBoolean(code == "7641");
                    this.fxManager.writeUserFXChange(this, {
                        loc17: true,
                        id: 8,
                        sid: 0,
                        active: true,
                        data: [p],
                        map: false
                    });
                } else if (this.mapId == 348) { //Irwish fire
                    let hasFlame = parseInt(new Date().getTime() / (1000 * 60 * 75)) % 2 == 1;
                    if (!hasFlame) {
                        this.teleportToMap(1, 341, this.serverId, 0);
                    } else {
                        this.die();
                    }
                } else if (this.mapId == 99) { //Lazer
                    if (!this.map.maps[this.mapId].data.LASER) {
                        this.map.maps[this.mapId].data.LASER = true;
                        let p = new SocketMessage();
                        p.bitWriteBoolean(true);
                        p.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0]);
                        p.bitWriteUnsignedInt(10, GlobalProperties.getServerTime()[1]);
                        p.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0]);
                        p.bitWriteUnsignedInt(10, GlobalProperties.getServerTime()[1]);
                        let data = {
                                id: 6,
                                sid: 99,
                                active: true,
                                data: p,
                                map: true,
                                close: 1
                            },
                            id = this.writeMapFXChange(data);
                            
                        
                    } else { return this.map.maps[this.mapId].data.LASER = false; }
                }  else if (this.mapId == 99) { //Lazer
                    if (!this.map.maps[this.mapId].data.LASER) {
                        this.map.maps[this.mapId].data.LASER = true;
                        let p = new SocketMessage();
                        p.bitWriteBoolean(true);
                        p.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0]);
                        p.bitWriteUnsignedInt(10, GlobalProperties.getServerTime()[1]);
                        p.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0]);
                        p.bitWriteUnsignedInt(10, GlobalProperties.getServerTime()[1]);
                        let data = {
                                id: 6,
                                sid: 99,
                                active: true,
                                data: p,
                                map: true,
                                close: 1
                            },
                            id = this.writeMapFXChange(data);
                            
                        
                    } else { return this.map.maps[this.mapId].data.LASER = false; }
                }
            }
            if (stype == 2) {
                let id = loc5.bitReadUnsignedInt(16),
                    camera = loc5.bitReadUnsignedInt(GlobalProperties.BIT_CAMERA_ID);
                if (id == 1) {
                    var p = new SocketMessage();
                    p.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0]);
                    p.bitWriteUnsignedInt(10, GlobalProperties.getServerTime()[1]);
                    let map = this.map.maps[this.mapId],
                        data = {
                            id: 5,
                            sid: map.objectPid,
                            active: true,
                            data: [24, 0, p],
                            map: true,
                            close: 1
                        },
                        id = this.writeMapFXChange(data);
                    map.delete(id);
                }
            }
        } else if (type == 10) {  
           // if (this.mapId == 10) return;  //Patch House in not supposed maps Jail
           // if (this.mapId == between(448, 454)) { return; } //Pyramide [448, 449, 450, 451, 452, 453, 454,]
            if (this.mapId == 491 || this.mapId == 492 || this.mapId == 493 || this.mapId == 494|| this.mapId == 495 || this.mapId == 496 || this.mapId == 10 || this.mapId == 499 || this.mapId == 448 || this.mapId == 449|| this.mapId == 450 || this.mapId == 451|| this.mapId == 452 || this.mapId == 453 || this.mapId == 454 || this.mapId == 60) { return; } // Add map here where house can't be put
           // if (this.mapId == 499) { return; } //Donjon

            if (stype == 1) {
                if (this.data.MAISON_ACTIF) {
                    let maison = this.data.MAISON_ACTIF;
                    maison.nbUser--;
                    delete this.data.MAISON_ACTIF;
                    delete maison.allow[this.pid];
                    //delete this.data.MAISON_ON;
                    this.teleportToMap(1, maison.mapPrev, this.serverId, 4);
                    let p = this.getChannel(1);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_MAP_ID, maison.id);
                    p.bitWriteUnsignedInt(5, 1);
                    p.bitWriteUnsignedInt(10, maison.nbUser);
                    p.bitWriteUnsignedInt(10, maison.maxUser);
                    p.bitWriteBoolean(maison.insideOwner);
                    p.bitWriteBoolean(maison.dirven);
                    p.bitWriteUnsignedInt(3, maison.protectMode);
                    p.bitWriteUnsignedInt(3, maison.ringMode);
                    p.bitWriteBoolean(true);
                    p.bitWriteUnsignedInt(4, this == maison.owner ? 2 : 1);
                    p.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0] + 10);
                    this.map.maps[maison.mapPrev].sendAll(p);
                }
            } else if (stype == 2) {
                let mid = loc5.bitReadUnsignedInt(32);
                if (!conf.maisons) conf.maisons = {};
                if (!conf.homeId) conf.homeId = 1000;
                if (this.data.MAISON_ON || this.data.MAISON_ACTIF) {
                    this.sendMsg("Vous avez une maison active !");
                    return;
                }
                this.data.MAISON_ON = true;
                let privId = conf.homeId;
                conf.homeId++;
                let p = new SocketMessage();
                p.bitWriteUnsignedInt(GlobalProperties.BIT_MAP_ID, privId);
                p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, this.uid);
                p.bitWriteBoolean(false);
                for (var i in this.mainUser.skinColor) {
                    p.bitWriteUnsignedInt(8, this.mainUser.skinColor[i]);
                }
                p.bitWriteSignedInt(17, this.mainUser.position.x / 100);
                p.bitWriteSignedInt(17, this.mainUser.position.y / 100);
                p.bitWriteUnsignedInt(8, 0);
                p.bitWriteString(this.pseudo);
                var data = {
                    id: 5,
                    sid: privId,
                    active: true,
                    data: [33, mid - 9000, p],
                    map: true,
                    close: 1
                };
                let mapList = {
                    212: 457,
                    224: 458,
                    228: 459,
                    260: 472,
                    281: 497,
                    321: 503,
                    328: 507,
                    344: 518,
                    373: 537,
                    376: 539
                }
                let id = this.writeMapFXChange(data)
                conf.maisons[privId] = {
                    owner: this,
                    position: { x: this.mainUser.position.x / 100, y: this.mainUser.position.y / 100 },
                    protectMode: 0,
                    ringMode: 0,
                    nbUser: 0,
                    maxUser: 5,
                    insideOwner: false,
                    dirven: false,
                    mapId: mapList[mid - 9000],
                    id: privId,
                    params: new SocketMessage(),
                    mapPrev: this.mapId,
                    mid: mid - 9000,
                    allow: {},
                    obj: id
                };
                this.data.MAISON_ACTIF = conf.maisons[privId];
            } else if (stype == 3) {
                let mapId = loc5.bitReadUnsignedInt(GlobalProperties.BIT_MAP_ID);
                let maison = conf.maisons[mapId],
                    p = this.getChannel(1);
                p.bitWriteUnsignedInt(GlobalProperties.BIT_MAP_ID, mapId);
                p.bitWriteUnsignedInt(5, 1);
                p.bitWriteUnsignedInt(10, maison.nbUser);
                p.bitWriteUnsignedInt(10, maison.maxUser);
                p.bitWriteBoolean(maison.insideOwner);
                p.bitWriteBoolean(maison.dirven);
                p.bitWriteUnsignedInt(3, maison.protectMode);
                p.bitWriteUnsignedInt(3, maison.ringMode);
                p.bitWriteBoolean(true);
                p.bitWriteUnsignedInt(4, this.pid == maison.owner.pid ? 2 : 1);
                p.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0]);
                this.send(p);
            } else if (stype == 4) {
                let mapId = loc5.bitReadUnsignedInt(GlobalProperties.BIT_MAP_ID),
                    maison = conf.maisons[mapId];
                let position = {
                    457: { x: 88850, y: 37850 },
                    458: { x: 81750, y: 37650 },
                    459: { x: 90350, y: 38850 },
                    472: { x: 47250, y: 28850 },
                    497: { x: 85950, y: 35450 },
                    507: { x: 20450, y: 27750 },
                    518: { x: 11150, y: 32250 },
                    537: { x: 53050, y: 34150 },
                    503: { x: 87150, y: 36650 },
                }
                if (maison.owner == this || this.grade > 199) {
                    this.mainUser.position.y = position[maison.mapId].y;
                    this.mainUser.position.x = position[maison.mapId].x;
                    this.teleportToMap(1, maison.mapId, this.serverId, 2);
                    this.data.MAISON_ACTIF = maison;
                    maison.allow[this.pid] = this.pid;
                    this.data.MAISON_ON = true;
                } else {
                    if (maison.ringMode != 0) return;
                    if (this.pid in maison.allow) {
                        if (maison.nbUser >= maison.maxUser) return;
                        this.data.MAISON_ON = true;
                        this.data.MAISON_ACTIF = maison;
                        this.mainUser.position.y = position[maison.mapId].y;
                        this.mainUser.position.x = position[maison.mapId].x;
                        this.teleportToMap(1, maison.mapId, this.serverId, 2);
                        return;
                    }
                    let p = this.getChannel(1);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_MAP_ID, maison.id);
                    p.bitWriteUnsignedInt(5, 3);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, this.pid);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, this.uid);
                    p.bitWriteString(this.pseudo);
                    maison.owner.send(p);
                    this.send(p);
                }
            } else if (stype == 5) {
                let mapId = loc5.bitReadUnsignedInt(GlobalProperties.BIT_MAP_ID),
                    type = loc5.bitReadUnsignedInt(5);
                let maison = this.data.MAISON_ACTIF;
                if (!maison) return;
                if (maison.owner != this) return;
                if (type == 0) {
                    let pid = loc5.bitReadUnsignedInt(GlobalProperties.BIT_USER_PID),
                        uid = loc5.bitReadUnsignedInt(GlobalProperties.BIT_USER_ID);
                    let p = this.getChannel(1);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_MAP_ID, maison.id);
                    p.bitWriteUnsignedInt(5, 1);
                    p.bitWriteUnsignedInt(10, maison.nbUser);
                    p.bitWriteUnsignedInt(10, maison.maxUser);
                    p.bitWriteBoolean(maison.insideOwner);
                    p.bitWriteBoolean(maison.dirven);
                    p.bitWriteUnsignedInt(3, maison.protectMode);
                    p.bitWriteUnsignedInt(3, maison.ringMode);
                    p.bitWriteBoolean(true);
                    p.bitWriteUnsignedInt(4, 2);
                    p.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0] + 10);
                    let user = this.getUserByPid(pid);
                    user.send(p);
                    maison.allow[user.pid] = user.pid;
                    user.sendMsg(`Tu es autorisé à rentrer dans la maison de ${this.pseudo}.`);
                } else if (type == 1) {
                    maison.ringMode = loc5.bitReadUnsignedInt(3);
                    maison.protectMode = loc5.bitReadUnsignedInt(3);
                    let p = this.getChannel(1);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_MAP_ID, maison.id);
                    p.bitWriteUnsignedInt(5, 2);
                    p.bitWriteUnsignedInt(3, maison.protectMode);
                    p.bitWriteUnsignedInt(3, maison.ringMode);
                    this.map.maps[maison.mapPrev].sendAll(p);
                } else if (type == 2) {
                    let uid = loc5.bitReadUnsignedInt(GlobalProperties.BIT_USER_ID);
                    let user = this.getUserByUid(uid);
                    if (user) {
                        if (user.data.MAISON_ACTIF) {
                            maison.nbUser--;
                            delete user.data.MAISON_ACTIF;
                            delete user.data.MAISON_ON;
                            delete maison.allow[user.pid];
                            user.teleportToMap(1, maison.mapPrev, user.serverId, 4);
                            let p = this.getChannel(1);
                            p.bitWriteUnsignedInt(GlobalProperties.BIT_MAP_ID, maison.id);
                            p.bitWriteUnsignedInt(5, 1);
                            p.bitWriteUnsignedInt(10, maison.nbUser);
                            p.bitWriteUnsignedInt(10, maison.maxUser);
                            p.bitWriteBoolean(maison.insideOwner);
                            p.bitWriteBoolean(maison.dirven);
                            p.bitWriteUnsignedInt(3, maison.protectMode);
                            p.bitWriteUnsignedInt(3, maison.ringMode);
                            p.bitWriteBoolean(true);
                            p.bitWriteUnsignedInt(4, this == maison.owner ? 2 : 1);
                            p.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0] + 10);
                            this.map.maps[maison.mapPrev].sendAll(p);
                        }
                    }
                } else if (type == 3) {
                    let activ = loc5.bitReadBoolean(),
                        channel = loc5.bitReadUnsignedInt(GlobalProperties.BIT_CHANNEL_ID);
                    let p = this.getChannel(channel);
                    if (activ) {
                        p.bitWriteUnsignedInt(5, 0);
                        for (var user in this.map.maps[this.mapId].userList) {
                            let player = this.map.maps[this.mapId].userList[user];
                            if (player.data.MAISON_ACTIF.id == this.data.MAISON_ACTIF.id) {
                                p.bitWriteBoolean(true);
                                p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, player.uid);
                                p.bitWriteString(player.pseudo);
                            }
                        }
                        p.bitWriteBoolean(false);
                        this.send(p);
                    }
                } else if (type == 6) {
                    let p = this.getChannel(1);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_MAP_ID, maison.id);
                    p.bitWriteUnsignedInt(5, 6);
                    p.bitWriteBoolean(true);
                    this.send(p);
                    var data = {
                        id: 5,
                        sid: maison.id,
                        active: false,
                        data: [33, maison.mid, new SocketMessage()],
                        map: true,
                        close: 1
                    };
                    let id = this.writeMapFXChange(data, maison.mapPrev);
                    this.map.maps[maison.mapPrev].delete(id);
                    this.map.maps[maison.mapPrev].delete(maison.obj);
                    for (var i in maison.allow) {
                        let user = this.getUserByPid(maison.allow[i]);
                        delete user.data.MAISON_ACTIF;
                        delete user.data.MAISON_ON;
                        user.teleportToMap(1, maison.mapPrev, user.serverId, 4);
                    }
                    delete this.data.MAISON_ON;
                }
            } else if (stype == 6) {
                let channel = loc5.bitReadUnsignedInt(GlobalProperties.BIT_CHANNEL_ID),
                    mapId = loc5.bitReadUnsignedInt(GlobalProperties.BIT_MAP_ID);
                let mapInfo = {
                    457: {
                        name: "Chalet",
                        maps: [457]
                    },
                    470: {
                        name: "Vaisseau",
                        maps: [470]
                    },
                    458: {
                        name: "Igloo",
                        maps: [458]
                    },
                    459: {
                        name: "Jardin secret",
                        maps: [459]
                    },
                    472: {
                        name: "Tipi",
                        maps: [472]
                    },
                    497: {
                        name: "Maison Pain d'Épices",
                        maps: [497]
                    },
                    503: {
                        name: "Cabane",
                        maps: [503, 504, 505, 506]
                    },
                    504: {
                        name: "Cabane",
                        maps: [503, 504, 505, 506]
                    },
                    505: {
                        name: "Cabane",
                        maps: [503, 504, 505, 506]
                    },
                    506: {
                        name: "Cabane",
                        maps: [503, 504, 505, 506]
                    },
                    507: {
                        name: "Plage",
                        maps: [507]
                    },
                    518: {
                        name: "Bosquet Magique",
                        maps: [518]
                    },
                    537: {
                        name: "Boule à neige",
                        maps: [537, 538]
                    },
                    538: {
                        name: "Boule à neige",
                        maps: [537, 538]
                    },
                    539: {
                        name: "No man's land",
                        maps: [539]
                    }
                }
                if (this.data.MAISON_ACTIF) {
                    let map = mapInfo[mapId],
                        maison = this.data.MAISON_ACTIF;
                    let p = this.getChannel(channel);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_MAP_ID, maison.id);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, maison.owner.uid);
                    p.bitWriteUnsignedInt(3, maison.protectMode);
                    p.bitWriteUnsignedInt(3, maison.ringMode);
                    p.bitWriteBinaryData(maison.params);
                    p.bitWriteString(maison.owner.pseudo);
                    p.bitWriteUnsignedInt(32, 0);
                    p.bitWriteUnsignedInt(8, map.maps.length);
                    for (let a = 0; a < map.maps.length; a++) {
                        p.bitWriteUnsignedInt(GlobalProperties.BIT_MAP_ID, map.maps[a]);
                    }
                    this.send(p);
                    maison.nbUser++;
                    p = this.getChannel(1);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_MAP_ID, maison.id);
                    p.bitWriteUnsignedInt(5, 1);
                    p.bitWriteUnsignedInt(10, maison.nbUser);
                    p.bitWriteUnsignedInt(10, maison.maxUser);
                    p.bitWriteBoolean(maison.insideOwner);
                    p.bitWriteBoolean(maison.dirven);
                    p.bitWriteUnsignedInt(3, maison.protectMode);
                    p.bitWriteUnsignedInt(3, maison.ringMode);
                    p.bitWriteBoolean(true);
                    p.bitWriteUnsignedInt(4, 1);
                    p.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0]);
                    this.map.maps[maison.mapPrev].sendAll(p);
                } else {
                    this.teleportToMap(1, 9, this.serverId, 4);
                }
            } else if (stype == 7) {
                let mapId = loc5.bitReadUnsignedInt(GlobalProperties.BIT_MAP_ID),
                    type = loc5.bitReadUnsignedInt(5);
                let maison = this.data.MAISON_ACTIF;
                if (!maison) return;
                if (maison.owner != this) return;
                if (type == 0) {
                    maison.params = loc5.bitReadBinaryData();
                    let p = this.getChannel(1);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_MAP_ID, maison.id);
                    p.bitWriteUnsignedInt(5, 4);
                    p.bitWriteBinaryData(maison.params);
                    this.map.maps[this.mapId].sendAll(p, null, this);
                } else if (type == 1) {
                    let jsp = loc5.bitReadBoolean();
                    let activ = loc5.bitReadBoolean();
                    if (activ) {
                        let p = this.getChannel(1);
                        p.bitWriteUnsignedInt(GlobalProperties.BIT_MAP_ID, maison.id);
                        p.bitWriteUnsignedInt(5, 5);
                        p.bitWriteBoolean(true);
                        p.bitWriteBinaryData(loc5.bitReadBinaryData());
                        this.map.maps[this.mapId].sendAll(p, null, this);
                    }
                }
            }
        } else if (type == 7) {
            if (stype == 1) {
                if (this.data.MONTURE) {
                    if (this.data.MONTURE[1] == 11573) {
                        let map = this.map.maps[this.mapId];
                        for (let i in map.data.FLOWER) {
                            let data = map.data.FLOWER[i],
                                p = new SocketMessage();
                            p.bitWriteBoolean(true);
                            p.bitWriteSignedInt(16, data[1]);
                            p.bitWriteSignedInt(16, data[2]);
                            p.bitWriteUnsignedInt(8, data[3]);
                            p.bitWriteString(data[4]);
                            p.bitWriteUnsignedInt(5, data[5]);
                            p.bitWriteString(data[6]);
                            p.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0]);
                            map.delete(data[0]);
                            let ndata = {
                                    id: 5,
                                    sid: data[7],
                                    active: false,
                                    data: [29, data[7] - 10000, p],
                                    map: true,
                                    close: 1
                                },
                                id = this.writeMapFXChange(ndata);
                            map.delete(id);
                            let obj_id = map.objectPid;
                            ndata = {
                                id: 5,
                                sid: obj_id,
                                active: true,
                                data: [29, data[7] - 10000, p],
                                map: true,
                                close: 1
                            }, id = this.writeMapFXChange(ndata);
                            map.data.FLOWER[i][0] = id;
                        }
                    }
                }
                //Druide to wolf
                else if (this.mainUser.skinId == 520){
                    this.reloadSkin(521);
                }
                //Wolf to druide
                else if (this.mainUser.skinId == 521){
                    this.reloadSkin(520);
                }
                //Druidesse to wolf
                else if (this.mainUser.skinId == 519){
                    this.reloadSkin(518);
                }
                //Wolf to druidesse 
                else if (this.mainUser.skinId == 518){
                    this.reloadSkin(519);
                }
                //Chenille to butterfly
                else if (this.mainUser.skinId == 501){
                    this.reloadSkin(502);
                }
                //asian goat to hydre
                else if (this.mainUser.skinId == 696){
                    this.reloadSkin(697);
                }
                //hydre to asian goat
                else if (this.mainUser.skinId == 697){
                    this.reloadSkin(696);
                }
                //Kitsune girl to kitsune
                else if (this.mainUser.skinId == 622){
                    this.reloadSkin(618);
                }
                //Kitsune boy to kitsune 
                else if (this.mainUser.skinId == 621){
                    this.reloadSkin(618);
                }
                //Kitsune to version 1 (Female) or version 0 (Male) 
                else if (this.mainUser.skinId == 618){
                    if(this.sendTransfoHuman == 0){
                        this.reloadSkin(621);
                    } else if (this.sendTransfoHuman == 1){
                        this.reloadSkin(622);
                    }
                }
                //Commando girl
                else if (this.mainUser.skinId == 491){
                    
                        if (this.server.variable.maps[this.mapId][6] == 3 || this.data.MAISON_ACTIF && this.data.MAISON_ACTIF.protectMode == 1 || this.mapId == 16 || this.mapId == 161 || this.mapId == 115) {
                            this.sendMsg("Cette map est protégée contre tes attaques ^^");
                            return;
                        }
                        let posX = binaryData.bitReadSignedInt(17),
                                posY = binaryData.bitReadSignedInt(17),
                                mouseX = binaryData.bitReadSignedInt(17),
                                mouseY = binaryData.bitReadSignedInt(17),
                                ssid = 2000 + parseInt(Math.random() * 9871),
                                p = new SocketMessage();
                            p.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0]);
                            p.bitWriteUnsignedInt(10, GlobalProperties.getServerTime()[1]);
                            p.bitWriteSignedInt(17, posX);
                            p.bitWriteSignedInt(17, posY);
                            p.bitWriteSignedInt(17, mouseX);
                            p.bitWriteSignedInt(17, mouseY);
                            p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, this.uid);
                            let data = {
                                    id: 5,
                                    sid: ssid,
                                    active: true,
                                    data: [24, 1, p],
                                    map: true,
                                    close: 1
                                },
                                id = this.writeMapFXChange(data);
                            setTimeout(function() {
                                data.active = false;
                                this.fxManager.writeMapFXChange(this, data);
                                map.delete(id);
                            }.bind(this), 4 * 1000);
                    
                }//Commando Boy
                else if (this.mainUser.skinId == 490){
                    if (this.server.variable.maps[this.mapId][6] == 3 || this.data.MAISON_ACTIF && this.data.MAISON_ACTIF.protectMode == 1 || this.mapId == 16 || this.mapId == 161 || this.mapId == 115) {
                        this.sendMsg("Cette map est protégée contre tes attaques ^^");
                        return;
                    }
                    let posX = binaryData.bitReadSignedInt(17),
                            posY = binaryData.bitReadSignedInt(17),
                            mouseX = binaryData.bitReadSignedInt(17),
                            mouseY = binaryData.bitReadSignedInt(17),
                            ssid = 2000 + parseInt(Math.random() * 9871),
                            p = new SocketMessage();
                        p.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0]);
                        p.bitWriteUnsignedInt(10, GlobalProperties.getServerTime()[1]);
                        p.bitWriteSignedInt(17, posX);
                        p.bitWriteSignedInt(17, posY);
                        p.bitWriteSignedInt(17, mouseX);
                        p.bitWriteSignedInt(17, mouseY);
                        p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, this.uid);
                        let data = {
                                id: 5,
                                sid: ssid,
                                active: true,
                                data: [24, 1, p],
                                map: true,
                                close: 1
                            },
                            id = this.writeMapFXChange(data);
                        setTimeout(function() {
                            data.active = false;
                            this.fxManager.writeMapFXChange(this, data);
                            map.delete(id);
                        }.bind(this), 4 * 1000);
                }
                
            }
            if (stype == 2) { //Reaction on forced changed skin 
                let uid = loc5.bitReadUnsignedInt(GlobalProperties.BIT_USER_ID),
                    skinid = loc5.bitReadUnsignedInt(GlobalProperties.BIT_SKIN_ID);
                let p = new SocketMessage();
                p.bitWriteBoolean(true);
                p.bitWriteUnsignedInt(6, 5);     
                if(skinid == 421) { //toyz halloween
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_SKIN_ID,432); //candy
                }
                if(skinid == 310) { //Woman Archer
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_SKIN_ID,313); //Apple
                }
                if(skinid == 311) { //Man Archer
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_SKIN_ID,313); //Apple
                }
                if(skinid == 441) { //toys
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_SKIN_ID,445); //toyz chick
                }
                if(skinid == 442) { //toys
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_SKIN_ID,446); //toyz ice
                }
                if(skinid == 482) { //Bunny sp
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_SKIN_ID,484); //ride bunny
                }
                if(skinid == 485) { //toys
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_SKIN_ID,489); //toyz svt
                }
                if(skinid == 440) { //toys
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_SKIN_ID,447); //toyz cristal
                }
                if(skinid == 678) { //dragon
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_SKIN_ID,95); //skull
                }
                if(skinid == 452) { //Man Archer Xmas
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_SKIN_ID,335); //GingerBread
                }
                if(skinid == 451) { //Woman Archer Xmas
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_SKIN_ID,335); //GingerBread
                }
                if(skinid == 680) { //Robot 
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_SKIN_ID,274); //Cow
                }
                if(skinid == 681) { //Robot 
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_SKIN_ID,274); //Cow
                }
                if(skinid == 679) { //Robot 
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_SKIN_ID,274); //Cow
                }
                if(skinid == 611) { //Xmas Bunny 
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_SKIN_ID,334); //Candy cane
                }
                if(skinid == 480) { //Fraise powa 
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_SKIN_ID,483); //Fraise 
                }
                if(skinid == 221) { //Faucheuse 
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_SKIN_ID,227); //Candy cane
                }
                if(skinid == 232) { //CitrouilleParty09 
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_SKIN_ID,233); //bout de citrouille
                }
                if(skinid == 240) { //toyz 
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_SKIN_ID,245); //bliblis neige
                }
                if(skinid == 253) { //Blabla Spies 
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_SKIN_ID,256); //Blabla Spies
                }
                if(skinid == 254) { //Blabla Spies 
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_SKIN_ID,257); //Blabla Spies
                }
                if(skinid == 255) { //Blabla Spies 
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_SKIN_ID,258); //Blabla Spies
                }
                if(skinid == 256) { //Blabla Spies 
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_SKIN_ID,253); //Blabla Spies
                }
                if(skinid == 257) { //Blabla Spies 
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_SKIN_ID,254); //Blabla Spies
                }
                if(skinid == 258) { //Blabla Spies 
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_SKIN_ID,255); //Blabla Spies
                }
                if(skinid == 371) { //Golden Chicken 
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_SKIN_ID,372); //Bliblis eggs 
                }
                if(skinid == 606) { //Hunter 
                    if([90, 92, 424, 418, 436, 563].includes(this.mainUser.skinId)) {
                        p.bitWriteUnsignedInt(GlobalProperties.BIT_SKIN_ID,95); //Skull 
                    }
                }
                if(skinid == 607) { //Huntress 
                    if([90, 92, 424, 418, 436, 563].includes(this.mainUser.skinId)) {
                        p.bitWriteUnsignedInt(GlobalProperties.BIT_SKIN_ID,95); //Skull 
                    }
                }

                p.bitWriteBoolean(false);
                let data = this.writeUserFXChange(40, {
                    loc17: true,
                    id: 4,
                    sid: 40,
                    active: true,
                    data: p,
                    map: true
                });
                this.fxUser[40] = data;
                setTimeout(function() {
                    delete this.fxUser[40];
                    this.writeUserFXChange(40, {
                        loc17: true,
                        id: 4,
                        sid: 40,
                        active: false,
                        data: p,
                        map: true
                    });
                }.bind(this), 10 * 1000);
            }
        } 
        /*else if (type == 20){ //tfm loader 
            if (stype == 2){
                skinid = loc5.bitReadUnsignedInt(GlobalProperties.BIT_SKIN_ID);
            }
        }*/
    }

    setClan(name, save = true, active = true) {
        let packet = new SocketMessage();
        packet.bitWriteBoolean(true);
        packet.bitWriteUnsignedInt(6, 8);
        packet.bitWriteString(` [${name}]`);
        packet.bitWriteBoolean(false);

        let data = this.writeUserFXChange(110, {
            loc17: true,
            id: 4,
            sid: 110,
            active: active,
            data: packet,
            map: true
        });

        data.push(0);
        if (active) {
            this.fxUser[110] = data;
        } else {
            delete this.fxUser[110];
        }

        if (save) {
            this.query(`UPDATE users SET clan = "${name}" WHERE id=${this.uid}`);
        }

        this.clan = name;
    }

    lampion(binaryData, fx_sid, fx = 8) {
        let is10 = binaryData.bitReadBoolean(),
            color = binaryData.bitReadUnsignedInt(10),
            p = new SocketMessage(),
            objectId = fx_sid + 10000;
        p.bitWriteBoolean(is10);
        p.bitWriteUnsignedInt(10, color);
        let fx_save = this.writeUserFXChange(objectId, {
            loc17: true,
            id: 6,
            sid: objectId,
            active: is10,
            data: [fx, fx_sid, p],
            map: true
        });
        if (is10) this.fxUser[objectId] = fx_save;
        else delete this.fxUser[objectId];
    }
    writeMapFXChange(data, mapId = this.mapId) {
        var mapObject = this.fxManager.writeMapFXChange(this, data, mapId);
        var map = this.map.maps[mapId];
        var id = map.addObject(mapObject);
        return id;
    }
    writeUserFXChange(objectId, data) {
        let return_data = this.fxManager.writeUserFXChange(this, data);
        if (!data.active) delete this.fxUser[objectId];
        this.fxManager.fxsid++;
        return return_data;
    }
    writePlayerState(param1, position = false, skin = false, power = false, debug = true) {
        param1.bitWriteSignedInt(2, this.mainUser.jump);
        param1.bitWriteSignedInt(2, this.mainUser.walk);
        param1.bitWriteBoolean(this.mainUser.shiftKey);
        param1.bitWriteBoolean(this.mainUser.direction);
        param1.bitWriteBoolean(this.mainUser.onFloor);
        param1.bitWriteBoolean(this.mainUser.underWater);
        param1.bitWriteBoolean(this.mainUser.grimpe);
        param1.bitWriteBoolean(this.mainUser.accroche);
        param1.bitWriteBoolean(position);
        if (position) {
            param1.bitWriteSignedInt(21, this.mainUser.position.x);
            param1.bitWriteSignedInt(21, this.mainUser.position.y);
            param1.bitWriteUnsignedInt(8, this.mainUser.surfaceBody);
            param1.bitWriteSignedInt(18, this.mainUser.speed.x);
            param1.bitWriteSignedInt(18, this.mainUser.speed.y);
        }
        param1.bitWriteBoolean(skin);
        if (skin) {
            param1.bitWriteUnsignedInt(GlobalProperties.BIT_SKIN_ID, this.mainUser.skinId);
            for (var i in this.mainUser.skinColor) {
                param1.bitWriteUnsignedInt(8, this.mainUser.skinColor[i]);
            }
            param1.bitWriteBoolean(this.mainUser.dodo);
        }
        if (power) {
            for (var i in this.fxUser) {
                if (this.fxUser[i] == undefined) break;
                if (Object.keys(this.fxUser[i]).length >= 2 && (Object.keys(this.fxUser[i]).length != 4 || debug)) {
                    param1.bitWriteBoolean(true);
                    param1.bitWriteUnsignedInt(GlobalProperties.BIT_FX_ID, this.fxUser[i][0])
                    param1.bitWriteUnsignedInt(GlobalProperties.BIT_FX_SID, this.fxUser[i][1])
                    param1.bitWriteBinaryData(this.fxUser[i][2])
                }
            }
        }
        param1.bitWriteBoolean(false);
        return param1;
    }
    readPlayerState(p) {
        this.mainUser.jump = p.bitReadSignedInt(2);
        this.mainUser.walk = p.bitReadSignedInt(2);
        this.mainUser.shiftKey = p.bitReadBoolean();
        this.mainUser.direction = p.bitReadBoolean();
        this.mainUser.onFloor = p.bitReadBoolean();
        this.mainUser.underWater = p.bitReadBoolean();
        this.mainUser.grimpe = p.bitReadBoolean();
        this.mainUser.accroche = p.bitReadBoolean();
        if (p.bitReadBoolean()) {
            this.mainUser.position.x = p.bitReadSignedInt(21);
            this.mainUser.position.y = p.bitReadSignedInt(21);
            this.mainUser.surfaceBody = p.bitReadUnsignedInt(8);
            this.mainUser.speed.x = p.bitReadSignedInt(18);
            this.mainUser.speed.y = p.bitReadSignedInt(18);
        }
        if (p.bitReadBoolean()) {
            this.mainUser.skinColor = {};
            for (var i in Array(10).keys()) {
                this.mainUser.skinColor[i] = p.bitReadUnsignedInt(8);
            }
        }
    }
}

class Client extends BblLogged {
    constructor(socket, map, server, fxManager) {
        super();
        this.externalLoaded = false;
        this.connected = false;
        this.map = map;
        this.mapPid = 0;
        this.socket = socket;
        this.server = server;
        this.serverId = server.id;
        this.fxManager = fxManager;
        this.inCmpt = 12;
        this.outCmpt = 12;
        socket.on('data', this.socketData.bind(this));
        socket.on('error', this.errorClient.bind(this));
        socket.on('close', this.connectionLost.bind(this));
    }
    errorClient(err) {
        this.socket.destroy();
        this.connectionLost();
    }
    saveData(type, value) {
        if (typeof value == "string") value = `'${value}'`;
        this.server.database('UPDATE users SET ? = ? WHERE session = ?', [ type, value,this.session]);
    }
    connectionLost() {
        if (this.connected) {
            this.connected = false;
            this.methodeId = 3;
            if (this.uid) {
                this.server.database('UPDATE chat SET mapId = ?  WHERE login = ?', [this.mapId, this.login]);
                this.server.database('UPDATE chat SET posX = ? WHERE login = ?', [this.mainUser.position.x, this.login]);
                this.server.database('UPDATE chat SET posY = ? WHERE login = ?', [this.mainUser.position.y, this.login]);
                //this.server.database('UPDATE chat SET direction = ? WHERE login = ?', [this.mainUser.direction, this.login]);
                this.server.database('UPDATE users SET xp = ? WHERE login = ?', [this.xp, this.login]);
                this.server.database('UPDATE users SET online_chat = 0 WHERE login = ?',[this.login]);
            }
            for (var i in this.server.conf.data.POURSUITE) {
                if (this.server.conf.data.POURSUITE[i][1] == this.pseudo) {
                    let p = new SocketMessage(7, 2);
                    p.bitWriteUnsignedInt(32, 0);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, this.uid);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, 0);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, this.pid);
                    p.bitWriteUnsignedInt(GlobalProperties.BIT_SERVER_ID, this.serverId);
                    try {
                        this.server.conf.data.POURSUITE[i][0].send(p);
                    } catch (e) {}
                }
            }




            if (this.data.CORPS_ASTRAL) {
                let map = this.map.maps[this.data.CORPS_ASTRAL[1]];
                this.reloadSkin(this.mainUser.skinId);
                let p = new SocketMessage(),
                    data = null
                p.bitWriteUnsignedInt(32, 300);
                p.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0]);
                data = this.writeUserFXChange(10021, {
                    loc17: true,
                    id: 6,
                    sid: 10021,
                    active: false,
                    data: [3, 10021 - 10000, p],
                    close: 1,
                    map: true
                });
                delete this.fxUser[10021];
                p = new SocketMessage();
                p = this.writePlayerState(p, true, false, false, false);
                p.bitWriteUnsignedInt(GlobalProperties.BIT_SKIN_ID, this.data.CORPS_ASTRAL[2]);
                p.bitWriteString(this.pseudo);
                p.bitWriteString("");
                for (var i in this.mainUser.skinColor) {
                    p.bitWriteUnsignedInt(8, this.mainUser.skinColor[i]);
                }
                p.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0]);
                p.bitWriteUnsignedInt(10, GlobalProperties.getServerTime()[1]);
                data = {
                    id: 5,
                    sid: 10021,
                    active: false,
                    data: [3, 22, p],
                    map: true,
                    close: 1
                };
                if (!this.data.CORPS_ASTRAL[0]) this.data.CORPS_ASTRAL[0] = id = this.writeMapFXChange(data, this.data.CORPS_ASTRAL[1]);

                if (true && this.data.CORPS_ASTRAL[0]) {
                    map.delete(this.data.CORPS_ASTRAL[0]);
                    this.fxManager.writeMapFXChange(this, data, this.data.CORPS_ASTRAL[1]);
                    this.reloadSkin(this.data.CORPS_ASTRAL[2]);
                    if (this.mapId != this.data.CORPS_ASTRAL[1]) {
                        this.teleportToMap(1, this.data.CORPS_ASTRAL[1], this.serverId, 2);
                    }
                    delete this.data.CORPS_ASTRAL;
                }


            }

            if (this.data.MAISON_ACTIF) { //maison fix
                if (this.data.MAISON_ACTIF.owner.pid == this.pid) {
                    let maison = this.data.MAISON_ACTIF;
                    var data = {
                        id: 5,
                        sid: maison.id,
                        active: false,
                        data: [33, maison.mid, new SocketMessage()],
                        map: true,
                        close: 1
                    };
                    let id = this.writeMapFXChange(data, maison.mapPrev);
                    this.map.maps[maison.mapPrev].delete(id);
                    this.map.maps[maison.mapPrev].delete(maison.obj);
                    for (var i in maison.allow) {
                        let user = this.getUserByPid(maison.allow[i]);
                        delete user.data.MAISON_ACTIF;
                        delete user.data.MAISON_ON;
                        user.teleportToMap(1, maison.mapPrev, user.serverId, 4);
                    }
                    delete this.data.MAISON_ON;
                }
            }
            if (this.data.NUAGE) {
                let data = {
                    id: 5,
                    sid: 10297,
                    active: false,
                    data: [44, 10297 - 10000, new SocketMessage()],
                    map: true,
                    close: 1
                };
                let map = this.map.maps[this.data.NUAGE[4]];
                if (this.data.NUAGE[2] != null) {
                    let mapObj = this.fxManager.writeMapFXChange(this, data, this.data.NUAGE[4]);
                    map.objectList[this.data.NUAGE[2]] = mapObj;
                } else {
                    let id = this.writeMapFXChange(data);
                    this.data.NUAGE[2] = id;
                }
                map.delete(this.data.NUAGE[2]);
                delete this.data.NUAGE;
            }
            if (this.data.CONCERT) {
                let data = {
                    id: 5,
                    sid: 10323,
                    active: false,
                    data: [44, 10323 - 10000, new SocketMessage()],
                    map: true,
                    close: 1
                };
                let map = this.map.maps[this.data.CONCERT[4]];
                if (this.data.CONCERT[2] != null) {
                    let mapObj = this.fxManager.writeMapFXChange(this, data, this.data.CONCERT[4]);
                    map.objectList[this.data.CONCERT[2]] = mapObj;
                } else {
                    let id = this.writeMapFXChange(data);
                    this.data.CONCERT[2] = id;
                }
                map.delete(this.data.CONCERT[2]);
                delete this.data.CONCERT;
            }
            if (this.data.CORPS_ASTRAL) {
                map.delete(this.data.CORPS_ASTRAL[0]);
                this.fxManager.writeMapFXChange(this, data = {
                    id: 5,
                    sid: 10021,
                    active: false,
                    data: [3, 22, new SocketMessage()],
                    map: true,
                    close: 1
                }, this.data.CORPS_ASTRAL[1]);
                this.reloadSkin(this.data.CORPS_ASTRAL[2]);
                if (this.mapId != this.data.CORPS_ASTRAL[1]) {
                    this.teleportToMap(1, this.data.CORPS_ASTRAL[1], this.serverId, 2);
                }
                delete this.data.CORPS_ASTRAL;
            }
            if (this.mapId in this.map.maps) this.map.leaveMap(this.mapId, this);
            this.server.delClient(this);
        } else if (this.isConsole) {
            delete this.server.console[this.pid];
            let p = new SocketMessage(6, 3);
            p.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, this.pid);
            for (var i in this.server.userList) {
                let client = this.server.userList[i];
                if (client.isConsole && client != this) client.send(p);
            }
            this.server.delClient(this);
        }
    }
    socketData(data) {
        //if (ipBan.includes(int2ip(this.ip))) this.sendError("");
        var str_data = data.toString();
        if (str_data == "<policy-file-request/>\x00") {
            this.socket.write("<?xml version=\"1.0\"?><cross-domain-policy><allow-access-from domain=\"*\" to-ports=\"*\" /></cross-domain-policy>\x00");
            return;
        }
        let loc2 = data.length,
            loc3 = 0,
            loc4 = 0,
            inBuffer = [];
        while (loc3 < loc2) {
            loc4 = data[loc3];
            if (loc4 == 0) {
                this.inCmpt++;
                if (this.inCmpt >= 65530) this.inCmpt = 12;
                let loc5 = new SocketMessage();
                loc5.readMessage(Buffer.from(inBuffer));
                loc4 = loc5.bitReadUnsignedInt(16);
                if (!(loc4 < this.inCmpt || loc4 > this.inCmpt + 20)) {
                    var type = loc5.bitReadUnsignedInt(GlobalProperties.BIT_TYPE),
                        stype = loc5.bitReadUnsignedInt(GlobalProperties.BIT_STYPE);
                    this.parsedEventMessage(type, stype, loc5);
                    inBuffer = [];
                }
            } else {
                inBuffer.push(loc4);
            }
            loc3++;
        }
    }
    parsedEventMessage(type, stype, loc5) {
      //  if (!user.uid) {   return;  }
        var packet;
        if (config.showPacketsType == "true") console.log(type, stype);
        super.parsedEventMessage(type, stype, loc5);
        if (type == 1) {
            if (stype == 1) {
                packet = new SocketMessage(1, 1);
                packet.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0]);
                packet.bitWriteUnsignedInt(10, GlobalProperties.getServerTime()[1]);
                this.send(packet);
            } else if (stype == 3) {
                let token = loc5.bitReadString(),
                    sid = loc5.bitReadString(),
                    host = loc5.bitReadString();
                //if (host != this.server.conf.data.name && !this.securityMod) this.sendError("");
                /*if (!this.securityMod) {
                    try {
                        if (this.server.conf.data.token[sid][0] != token && !this.server.conf.data.token[sid][1]) this.sendError("");
                    } catch (e) {
                        this.sendError("");
                    }
                }*/
                this.pid = this.server.pid;
                this.server.pid++;
                packet = new SocketMessage(1, 3);
                packet.bitWriteUnsignedInt(24, this.pid);
                this.pseudo = "Touriste_" + this.pid;
                this.send(packet);
            } else if (stype == 6) {
                packet = new SocketMessage();
                this.send(this.server.variable.variables);
            } else if (stype == 17) {
                let radio = loc5.bitReadUnsignedInt(8),
                    status = loc5.bitReadBoolean(),
                    p = new SocketMessage(1, 17);
                p.bitWriteUnsignedInt(8, 1);
                p.bitWriteBoolean(true);
                this.send(p);
            } else if (stype == 19) {
                packet = new SocketMessage();
                packet.readMessage(loc5.bitReadString(), this);
                this.send(packet);
            } else if (stype == 13) {
                packet = new SocketMessage(1, 8);
                const serverid = loc5.bitReadUnsignedInt(GlobalProperties.BIT_SERVER_ID);
                while (loc5.bitReadBoolean()) {
                    const mapid = loc5.bitReadUnsignedInt(GlobalProperties.BIT_MAP_ID);
                    packet.bitWriteBoolean(true);
                    packet.bitWriteUnsignedInt(GlobalProperties.BIT_MAP_ID, mapid);
                    if (mapid in this.server.map.maps) {
                        let res = 0;
                        for (let i in this.server.map.maps[mapid].userList) {
                            if (!this.server.map.maps[mapid].userList[i].isConsole) res++;
                        }
                        packet.bitWriteUnsignedInt(10, res);
                    } else packet.bitWriteUnsignedInt(10, 0);
                }
                packet.bitWriteBoolean(false);
                this.send(packet);
            }
        }
    
}
    socketUnlock() {
        this.send(new SocketMessage(1, 11));
    }
    send(param1, param2 = false) {
        this.outCmpt++;
        if (this.outCmpt >= 65530) this.outCmpt = 12;
        var loc3 = new SocketMessage();
        loc3.bitWriteUnsignedInt(16, this.outCmpt);
        var loc4 = loc3.exportMessage();
        var socket = new ByteArray();
        socket.writeByte(loc4);
        loc4 = param1.exportMessage();
        socket.writeByte(loc4);
        socket.writeByte(0);
        try {
            this.socket.write(socket.getBuffer());
        } catch (e) {}
    }
}

class Map {
    constructor() {
        this.userList = {};
        this.objectList = {};
        this.objectPid = 140;
        this.data = {};
        this.pid = 0;
    }
    addObject(mapObject) {
        this.objectList[this.objectPid] = mapObject;
        this.objectPid++;
        return this.objectPid - 1;
    }
    delete(id) {
        this.objectList[id] = {};
    }
    addUser(user) {
        this.userList[this.pid] = user;
        user.mapPid = this.pid;
        this.pid++;
        var packet = new SocketMessage(5, 1, user);
        packet.bitWriteUnsignedInt(GlobalProperties.BIT_USER_ID, user.uid);
        packet.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, user.pid);
        packet.bitWriteString(user.pseudo);
        packet.bitWriteUnsignedInt(3, user.sex);
        packet.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0]);
        packet = user.writePlayerState(packet, true, true, true);
        packet.bitWriteUnsignedInt(GlobalProperties.BIT_METHODE_ID, user.methodeId);
        if (!user.isConsole && !user.data.IS_CAMERA) this.sendAll(packet, user, user);
    }
    deleteUser(user) {
        delete this.userList[user.mapPid];
        var packet = new SocketMessage(5, 2, user);
        packet.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, user.pid);
        packet.bitWriteUnsignedInt(GlobalProperties.BIT_METHODE_ID, user.methodeId);
        if (!user.isConsole) this.sendAll(packet, null, user);
    }
    sendAll(packet, me = false, opts = false) {
        for (var i in this.userList) {
            if (this.userList[i] != me) {
                let user = this.userList[i];
                if (opts != false && opts.data && opts.data.MAISON_ACTIF && user.data.MAISON_ACTIF) {
                    if (user.data.MAISON_ACTIF.id == opts.data.MAISON_ACTIF.id) this.userList[i].send(packet);
                } else {
                    this.userList[i].send(packet);
                }
            }
        }
    }
}

class MapManager {
    constructor() {
        this.maps = {};
    }
    createMap(id) {
        if (!(id in this.maps)) this.maps[id] = new Map();
    }
    joinMap(id, user) {
        this.createMap(id);
        this.maps[id].addUser(user);
    }
    leaveMap(id, user) {
        this.maps[id].deleteUser(user);
    }
}

class FxManager {
    constructor() {
        this.fxsid = 4000;
    }
    writeUserFXChange(user, data) {
        var packet = new SocketMessage(5, 6, user);
        packet.bitWriteUnsignedInt(GlobalProperties.BIT_USER_PID, user.pid);
        packet.bitWriteBoolean(data.loc17);
        packet.bitWriteBoolean(data.active);
        if (!data.active) {
            if (!data.close) data.close = 0;
            packet.bitWriteUnsignedInt(2, data.close);
        }
        packet.bitWriteUnsignedInt(GlobalProperties.BIT_FX_ID, data.id);
        packet.bitWriteUnsignedInt(GlobalProperties.BIT_FX_SID, data.sid);
        var p = this.executeFXUserMessage(data);
        packet.bitWriteBinaryData(p);
        if (data.map) user.map.maps[user.mapId].sendAll(packet);
        else user.send(packet);
        return [data.id, data.sid, p];
    }
    executeFXUserMessage(data) {
        var p = new SocketMessage();
        if (data.id == 1) {
            p.bitWriteUnsignedInt(24, data.lightEffectColor);
        } else if (data.id == 2) {
            p.bitWriteBoolean(data.active);
        } else if (data.id == 3) {
            for (var i in data.data) {
                p.bitWriteUnsignedInt(8, data.data[i]);
            }
        } else if (data.id == 4) {
            // a retravailler
            p = data.data;
        } else if (data.id == 5) {
            p.bitWriteUnsignedInt(32, data.data[0]);
            p.bitWriteBoolean(data.data[1]);
            if (data.data.length > 2) {
                p.bitWriteBoolean(true);
                p.bitWriteBinaryData(data.data[2]);
            } else {
                p.bitWriteBoolean(false);
            }
        } else if (data.id == 6) {
            p.bitWriteUnsignedInt(GlobalProperties.BIT_FX_ID, data.data[0]);
            p.bitWriteUnsignedInt(GlobalProperties.BIT_FX_SID, data.data[1]);
            if (data.data.length > 2) {
                p.bitWriteBoolean(true);
                p.bitWriteBinaryData(data.data[2]);
            } else {
                p.bitWriteBoolean(false);
            }
        } else if (data.id == 8) {
            p = data.data[0];
        }
        return p;
    }
    writeMapFXChange(user, data, map = user.mapId) {
        var packet = new SocketMessage(5, 10);
        packet.bitWriteUnsignedInt(GlobalProperties.BIT_MAP_ID, map);
        packet.bitWriteUnsignedInt(GlobalProperties.BIT_SERVER_ID, user.serverId);
        packet.bitWriteBoolean(data.active);
        if (!data.active) {
            if (!data.close) data.close = 0;
            packet.bitWriteUnsignedInt(2, data.close);
        }
        packet.bitWriteUnsignedInt(GlobalProperties.BIT_FX_ID, data.id);
        packet.bitWriteUnsignedInt(GlobalProperties.BIT_FX_SID, data.sid);
        var p = this.executeFXMapMessage(data);
        packet.bitWriteBinaryData(p);
        user.map.createMap(map);
        if (data.map) user.map.maps[map].sendAll(packet);
        else user.send(packet);
        return [data.id, data.sid, p, data.data];
    }
    executeFXMapMessage(data) {
        var p = new SocketMessage();
        if (data.id == 1 || data.id == 6 || data.id == 2 || data.id == 3) {
            p = data.data;
        } else if (data.id == 5) {
            p.bitWriteUnsignedInt(GlobalProperties.BIT_FX_ID, data.data[0]);
            p.bitWriteUnsignedInt(GlobalProperties.BIT_FX_SID, data.data[1]);
            if (data.data.length > 2) {
                p.bitWriteBoolean(true);
                p.bitWriteBinaryData(data.data[2]);
            } else {
                p.bitWriteBoolean(false);
            }
        } else if (data.id == 4) {
            p.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0]);
            p.bitWriteUnsignedInt(8, data.amplitude);
            p.bitWriteUnsignedInt(8, data.duration);
        }
        return p;
    }
}

var fxManager = new FxManager();

class ServerBBL {
    constructor(port, conf) {
        this.map = new MapManager();
        var server = net.createServer(this.getNewUser.bind(this));
        server.listen(port);
        this.variable = new variables(port - 12301);
        this.userList = {};
        this.console = {};
        this.database = null;
        this.id = 12301 - port; //12301 - 12301 = origine 0 | 12302 - 12301 = legende 1 | 12303 - 12301 = fury tournament 2 
        this.conf = conf;
        this.pid = 1;
        this.bot = null;
    }
    createKDO() {
        let loc1 = true;
        let hours = new Date().getHours();
        if (!(hours >= 2 && hours <= 5)) {
            while (loc1) {
                let mapId = parseInt(Math.random() * Object.keys(mapData).length);
                if (mapId in mapData) {
                    loc1 = false;
                    console.log("=> kdo", mapId)
                    this.map.createMap(mapId);
                    let map = this.map.maps[mapId],
                        obj_id = map.objectPid,
                        p = new SocketMessage();
                    p.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0]);
                    p.bitWriteUnsignedInt(10, GlobalProperties.getServerTime()[1]);
                    p.bitWriteUnsignedInt(8, 1);
                    p.bitWriteBoolean(false);
                    let data = {
                            id: 5,
                            sid: obj_id,
                            active: true,
                            data: [7, 1, p],
                            map: true,
                            close: 1
                        },
                        id = this.bot.writeMapFXChange(data, mapId);
                    if (!map.data.KDO) map.data.KDO = {};
                    map.data.KDO[obj_id] = [id, 1, 200, false, this.bot.pseudo];
                }
            }
        }
    }
    createKDO2() {
        let loc2 = true;
        let hours = new Date().getHours();
        if (!(hours >= 2 && hours <= 5)) {
            while (loc2) {
                let mapId = parseInt(Math.random() * Object.keys(mapData).length);
                if (mapId in mapData) {
                    loc2 = false;
                    console.log("=> kdo2", mapId)
                    this.map.createMap(mapId);
                    let map = this.map.maps[mapId],
                        obj_id = map.objectPid,
                        p = new SocketMessage();
                    p.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0]);
                    p.bitWriteUnsignedInt(10, GlobalProperties.getServerTime()[1]);
                    p.bitWriteUnsignedInt(8, 1);
                    p.bitWriteBoolean(false);
                    let data = {
                            id: 5,
                            sid: obj_id,
                            active: true,
                            data: [7, 1, p],
                            map: true,
                            close: 1
                        },
                        id = this.bot.writeMapFXChange(data, mapId);
                    if (!map.data.KDO) map.data.KDO = {};
                    map.data.KDO[obj_id] = [id, 1, 550, false, this.bot.pseudo];
                }
            }
        }
    }
    createETOILE() {
        let loc3 = true;
        let hours = new Date().getHours();
        if (!(hours >= 2 && hours <= 5)) {
            while (loc3) {
                let mapId = parseInt(Math.random() * Object.keys(mapData).length);
                if (mapId in mapData) {
                    loc3 = false;
                    console.log("=> star", mapId)
                    this.map.createMap(mapId);
                    let map = this.map.maps[mapId],
                        obj_id = map.objectPid,
                        p = new SocketMessage();
                    p.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0]);
                    p.bitWriteUnsignedInt(10, GlobalProperties.getServerTime()[1]);
                    p.bitWriteUnsignedInt(8, 6);
                    p.bitWriteBoolean(false);
                    let data = {
                            id: 5,
                            sid: obj_id,
                            active: true,
                            data: [7, 1, p],
                            map: true,
                            close: 1
                        },
                        id = this.bot.writeMapFXChange(data, mapId);
                    if (!map.data.KDO) map.data.KDO = {};
                    let chance = parseInt(Math.random() * 100) + 1;
                    if (chance.between(1,11)) {
                        map.data.KDO[obj_id] = [id, 6, 10, false, this.bot.pseudo];
                    } else if (chance.between(12,50)) {
                        map.data.KDO[obj_id] = [id, 6, 15, false, this.bot.pseudo];
                    }  else if (chance.between(51,90)) {
                        map.data.KDO[obj_id] = [id, 6, 20, false, this.bot.pseudo];
                    } else {
                        map.data.KDO[obj_id] = [id, 6, 25, false, this.bot.pseudo];
                    }
                }
            }
        }
    }
    createCLE() {
        let loc4 = true;
        let hours = new Date().getHours();
        if (!(hours >= 2 && hours <= 5)) {
            while (loc4) {
                let mapId = parseInt(Math.random() * Object.keys(mapData).length);
                if (mapId in mapData) {
                    loc4 = false;
                    console.log("=> cle", mapId)
                    this.map.createMap(mapId);
                    let map = this.map.maps[mapId],
                        obj_id = map.objectPid,
                        p = new SocketMessage();
                    p.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0]);
                    p.bitWriteUnsignedInt(10, GlobalProperties.getServerTime()[1]);
                    p.bitWriteUnsignedInt(8, 2);
                    p.bitWriteBoolean(false);
                    let data = {
                            id: 5,
                            sid: obj_id,
                            active: true,
                            data: [7, 1, p],
                            map: true,
                            close: 1
                        },
                        id = this.bot.writeMapFXChange(data, mapId);
                    if (!map.data.KDO) map.data.KDO = {};
                    let chance = parseInt(Math.random() * 100) + 1;
                    if (chance.between(1,11)) {
                        map.data.KDO[obj_id] = [id, 2, 250, false, this.bot.pseudo];
                    } else if (chance.between(12,50)) {
                        map.data.KDO[obj_id] = [id, 2, 500, false, this.bot.pseudo];
                    }  else if (chance.between(51,90)) {
                        map.data.KDO[obj_id] = [id, 2, 750, false, this.bot.pseudo];
                    } else {
                        map.data.KDO[obj_id] = [id, 2, 1000, false, this.bot.pseudo];
                    }
                }
            }
        }
    }
    createBIENVENUE() {
        let loc5 = true;
        let hours = new Date().getHours();
        if (!(hours >= 2 && hours <= 5)) {
            while (loc5) {
                let mapId = parseInt(Math.random() * Object.keys(mapData).length);
                if (mapId in mapData) {
                    loc5 = false;
                    console.log("=> bienvenue", mapId)
                    this.map.createMap(mapId);
                    let map = this.map.maps[mapId],
                        obj_id = map.objectPid,
                        p = new SocketMessage();
                    p.bitWriteUnsignedInt(32, GlobalProperties.getServerTime()[0]);
                    p.bitWriteUnsignedInt(10, GlobalProperties.getServerTime()[1]);
                    p.bitWriteUnsignedInt(8, 5);
                    p.bitWriteBoolean(false);
                    let data = {
                            id: 5,
                            sid: obj_id,
                            active: true,
                            data: [7, 1, p],
                            map: true,
                            close: 1
                        },
                        id = this.bot.writeMapFXChange(data, mapId);
                    if (!map.data.KDO) map.data.KDO = {};
                    map.data.KDO[obj_id] = [id, 5, 3000, false, this.bot.pseudo];
                }
            }
        }
    }
    addClient(user) {
        this.userList[user.pid] = user;
        this.reloadUserCount();
    }
    reloadUserCount() {
        var packet = new SocketMessage(1, 7);
        packet.bitWriteUnsignedInt(16, Object.keys(this.userList).length - Object.keys(this.console).length); //origine
        packet.bitWriteUnsignedInt(16, Object.keys(this.userList).length - Object.keys(this.console).length); //total
        packet.bitWriteUnsignedInt(16, Object.keys(this.userList).length - Object.keys(this.console).length); //legende
        packet.bitWriteUnsignedInt(16, 0); //fury
        this.sendAll(packet);
    }
    delClient(user) {
        delete this.userList[user.pid];
        this.reloadUserCount();
    }
    sendAll(packet, me = false) {
        for (var i in this.userList) {
            if (this.userList[i] != me) this.userList[i].send(packet);
        }
    }
    getNewUser(socket) {
        let user = new Client(socket, this.map, this, fxManager);
        this.pid++;
        if (this.bot == null) {
            this.bot = user;
            setInterval(this.createKDO.bind(this), 15 * 60 * 1000);
            setInterval(this.createKDO.bind(this), 15 * 60 * 1000);
            setInterval(this.createKDO2.bind(this), 15 * 60 * 1000);
            setInterval(this.createKDO2.bind(this), 15 * 60 * 1000);
            setInterval(this.createCLE.bind(this), 15 * 60 * 1000);
            setInterval(this.createCLE.bind(this), 15 * 60 * 1000);
            setInterval(this.createETOILE.bind(this), 15 * 60 * 1000);
            setInterval(this.createETOILE.bind(this), 15 * 60 * 1000);
            setInterval(this.createETOILE.bind(this), 15 * 60 * 1000);
            setInterval(this.createETOILE.bind(this), 15 * 60 * 1000);
            setInterval(this.createKDO.bind(this), 15 * 60 * 1000);
            setInterval(this.createBIENVENUE.bind(this), 15 * 60 * 1000);
        }
    }
}

module.exports = ServerBBL;

function arraysEqual(a, b) {
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;
    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function int2ip(ipInt) {
    return ((ipInt >>> 24) + '.' + (ipInt >> 16 & 255) + '.' + (ipInt >> 8 & 255) + '.' + (ipInt & 255));
}