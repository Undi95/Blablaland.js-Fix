var express = require('express');
var app = express();
var https = require('http');
var http = https.Server(app);
var bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
var session = require('express-session');
var fs = require('fs');
const replace = require('buffer-replace');
var zlib = require('zlib');
var ServerBBL = require('./blablaland/blablaland.js');
let skins = JSON.parse(fs.readFileSync("skindb.json"));
const ipfilter = require('express-ipfilter').IpFilter
var CryptoJS = require("crypto-js");
var SHA512 = require("crypto-js/sha512");
var request = require('request');
const jwt = require('jsonwebtoken');
let conf = {};
conf.data = {};
conf.badword = JSON.parse(fs.readFileSync("badword.json"));
conf.data.token = {};
conf.data.navalId = 0;
conf.data.naval = {};
conf.data.external = {};
const sqlite3 = require('sqlite3').verbose();
const sqlite = require('better-sqlite3');
conf.data.ip = [];
conf.data.name = "154.49.216.178";

// Ouvre la base de données SQLite

const db = new sqlite3.Database('bbl.db');
const dbbbl = new sqlite('bbl.db');

//requête asynchrone

let queryasync = function(sql, params) {
    return new Promise((resolve, reject) => {
        // Vérifier le type de la requête
        const isSelectQuery = sql.trim().toLowerCase().startsWith('select');

        // Utiliser la méthode appropriée en fonction du type de requête
        if (isSelectQuery) {
            db.all(sql, params, (err, rows) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        } else {
            db.run(sql, params, function(err) {
                if (err) {
                    console.error(err.message);
                    reject(err);
                } else {
                    resolve({ lastID: this.lastID, changes: this.changes });
                }
            });
        }
    });
}

//requête synchrone

let querysync = function(sql, params, callback) {
    const isSelectQuery = sql.trim().toLowerCase().startsWith('select');

    if (isSelectQuery) {
        db.all(sql, params, (err, rows) => {
            if (err) {
                console.error(err.message);
                callback(err);
            } else {
                callback(null, rows);
            }
        });
    } else {
        db.run(sql, params, function(err) {
            if (err) {
                console.error(err.message);
                callback(err);
            } else {
				return this.lastID
                callback(null, { lastID: this.lastID, changes: this.changes });
            }
        });
    }
}

//requête bbl

function querybbl(query, values = []) {
  var stmt = dbbbl.prepare(query);
  var result;

  if (query.trim().toUpperCase().startsWith('SELECT')) {
    result = stmt.all(...values);
  } else if (query.trim().toUpperCase().startsWith('INSERT') || query.trim().toUpperCase().startsWith('UPDATE')) {
    var info = stmt.run(...values);
    result = info.lastInsertRowid;  // Retourne l'ID du dernier enregistrement
  }
  return result;
}

process.on('uncaughtException', function(exception) {
    console.log(exception);
});

var port = 80;

//si vous voulez activer le https

/*var porthttps = 443;

const privateKey = fs.readFileSync('/etc/letsencrypt/live/yourdomain/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/yourdomain/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/yourdomain/chain.pem', 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca
};

const httpsServer = https.createServer(credentials, app);
*/

var request = require("request");
const config = JSON.parse(fs.readFileSync('config.json'));

var servername = config.ip;

//on lance les univers bbl

var origine = new ServerBBL(12301, conf);
var legende = new ServerBBL(12302, conf);
var fury = new ServerBBL(12303, conf);
origine.database = querybbl;
legende.database = querybbl;
fury.database = querybbl;
console.log('-> Server \t OK!');

// Clé secrète pour la signature du token
const secretKey = '%N9-m]H,c89:Tx*3tAdUrw{4~H65;dgUytU)+74G7V?U8=BCvY42h!emn43@4_8J%4.Mi5Phqh$4bE}#Y/k9FwYAWn[B77Sw99^('; //CHANGEZ MOI
// clé secrète pour les mots de passes
var private_key = "ZUzvEg,fhV(3a6JBe/66_22?2fAR%9.zp~]3A99dp~#;Mk[{j2H$@8-iLXLz56E3S3q9:=L*H+}89!9)p3QiiGQa3z4DZ4qUaGr^"; // CHANGEZ MOI

app.use(session({
    secret: "6,C9CWS=gVD7-43aP7Zp7HT2X4U!exiqca8(TgTf%28e@/A7}6B+c$x4CEU2d4[8Rh;mw5{FBE3c.7*2~bh:8_#^x?])YKt9a#h6",
    name: "blablaland.js",
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Middleware pour vérifier l'authentification à chaque requête
const verifyToken = (req, res, next) => {
    const token = req.cookies.user;
    if (!token) {
        return res.status(401).send('Token d\'authentification manquant');
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).send('Token d\'authentification invalide');
        }
        req.user = decoded;
        next();
    });
};

app.get('/', (req, res) => {
    const token = req.cookies.user;
    var file = fs.readFileSync("site-web/index.html", 'utf8');
    var form = fs.readFileSync("site-web/form.html", 'utf8');
    
    if (token) {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                console.error('Erreur lors de la vérification du JWT :', err);
                setDefaultValues();
            } else {
                useJWTValues(decoded);
            }
        });
    } else {
        setDefaultValues();
    }

    function setDefaultValues() {
        file = file.replace("{{form}}", form);
        file = file.replace("{{session}}", `0`);
        file = file.replace("{{skinviewer}}", '<iframe allowfullscreen src="/data/viewskin.swf?SHOWBIG=1&SKINID=7&SKINCOLOR=%01%01%59%2c%2c%3c%01%01%01%01" height="150" width="80" id="skinviewerframe"></iframe>');
        res.send(file);
    }

    function useJWTValues(decoded) {
        const pseudo = decoded.pseudo || 'Valeur par défaut pour le pseudo';
        const bbl = decoded.bbl || 'Valeur par défaut pour le BBL';
        const xp = decoded.xp || 'Valeur par défaut pour le XP';

        file = file.replace("{{form}}", '<h1>' + pseudo + '</h1><br><img src="img/picto_bbl.png"> ' + bbl + ' BBL <br><img src="img/picto_xp.png"> ' + xp + ' XP<br><a href="/disconnect">Déconnexion</a>');
        file = file.replace("{{session}}", decoded.session || 'Valeur par défaut pour la session');
        file = file.replace("{{skinviewer}}", '<iframe allowfullscreen src="/data/viewskin.swf?SHOWBIG=1&SKINID=' + (req.cookies.skinid || 7) + '&SKINCOLOR=' + req.cookies.color + ' height="150" width="80" id="skinviewerframe"></iframe>');
        res.send(file);
    }
});


app.get('/params.xml', (req, res) => {
    res.send(`<params><scriptadr value="/scripts/"/><socket port="12301" host="${servername}"/></params>`);
});

// pour récuperer les blabilions

app.post('/scripts//chat/getBBL.php', (req, res) => {
    var user = getUserBySession(req.session.session);
    if (user) {
        res.send(`BBL=${user.bbl}`);
    }
});

// on passe sur la partie du site web

app.get('/connexion', (req, res) => {
    if (req.query.validform == 'OK') {
	let encryptpass = CryptoJS.enc.Hex.stringify(SHA512(private_key + req.query.con_password));
    // Vérifiez les informations d'identification dans la base de données
    querysync('SELECT * FROM users WHERE login = ? AND password = ?', [req.query.con_pseudo, encryptpass], (err, user) => {
		let newsession = Math.floor(Math.random() * 9999999) + 1000000;
        if (err) {
            console.error(err.message);
            res.status(500).send('Erreur serveur');
        } else if (!user) {
            res.status(401).send('Identifiants incorrects');
        } else {
            // Créez un nouvel objet utilisateur sans le mot de passe
            const userWithoutPassword = {
                ID: user[0].ID,
                login: user[0].login,
                pseudo: user[0].pseudo,
                email: user[0].email,
                bbl : user[0].bbl,
                xp : user[0].xp,
                session: newsession.toString(),
                // Ajoutez d'autres champs si nécessaire...
            };
			
			let skincolor = exportColor(JSON.parse(user[0].skincolors));
			let skinid = user[0].skinid;
			
			res.cookie('skincolor',skincolor , { maxAge: 900000, httpOnly: true }); // cookie modifiable
			res.cookie('skinid',skinid , { maxAge: 900000, httpOnly: true }); // cookie modifiable
            // Générez le token d'authentification
            const token = jwt.sign(userWithoutPassword, secretKey, { expiresIn: '1440m' });

            // Stockez le token dans un cookie sécurisé
            res.cookie('user', token, { maxAge: 900000, httpOnly: true, secure: false });
			
			querysync('UPDATE users SET session = ? WHERE ID = ?', [newsession, user[0].ID], (err, user) => {
				if (err) {
					console.error(err.message);
				}
			});			
            return res.redirect("/")
        }
    });
}});

app.get('/saver', (req, res) => {
    if (req.query.session && req.query.color) {
        querysync("SELECT * FROM users WHERE session = ?", [req.query.session.toUpperCase()], function(err, row) {
            if (err) {
                console.error(err.message);
            }
            if (row) {
                if (config.allowEditSkinColor == "true") {
                    row.skin.color = readColor(req.query.SKINCOLOR);
                    req.cookies.skincolor = exportColor(readColor(req.query.SKINCOLOR));
                    querysync("UPDATE users SET skin_color = ? WHERE session = ?", [JSON.stringify(row.skin.color), row.session], function(err) {
                        if (err) {
                            console.error(err.message);
                        }
                    });
                }
                if (req.query.SKINID && config.allowEditSkinId == "true") {
                    row.skin.id = parseInt(req.query.SKINID);
                    req.cookies.skinid = parseInt(req.query.SKINID);
                    querysync("UPDATE users SET skin_id = ? WHERE session = ?", [row.skin.id, row.session], function(err) {
                        if (err) {
                            console.error(err.message);
                        }
                    });
                }
            }
        });
        return res.send("");
    }
});

app.get('/inscription', (req, res) => {
    var file = fs.readFileSync("site-web/inscription.html", 'utf8');
    var form = fs.readFileSync("site-web/form.html", 'utf8');
	const token = req.cookies.user;

    
    if (token) {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                console.error('Erreur lors de la vérification du JWT :', err);
                setDefaultValues();
            } else {
                useJWTValues(decoded);
            }
        });
    } else {
        setDefaultValues();
    }

    function setDefaultValues() {
        file = file.replace("{{form}}", form);
        file = file.replace("{{session}}", `0`);
        file = file.replace("{{skinviewer}}", '<iframe allowfullscreen src="/data/viewskin.swf?SHOWBIG=1&SKINID=7&SKINCOLOR=%01%01%59%2c%2c%3c%01%01%01%01" height="150" width="80" id="skinviewerframe"></iframe>');
        res.send(file);
    }

    function useJWTValues(decoded) {
        const pseudo = decoded.pseudo || 'Valeur par défaut pour le pseudo';
        const bbl = decoded.bbl || 'Valeur par défaut pour le BBL';
        const xp = decoded.xp || 'Valeur par défaut pour le XP';

        file = file.replace("{{form}}", '<h1>' + pseudo + '</h1><br><img src="img/picto_bbl.png"> ' + bbl + ' BBL <br><img src="img/picto_xp.png"> ' + xp + ' XP<br><a href="/disconnect">Déconnexion</a>');
        file = file.replace("{{session}}", decoded.session || 'Valeur par défaut pour la session');
        file = file.replace("{{skinviewer}}", '<iframe allowfullscreen src="/data/viewskin.swf?SHOWBIG=1&SKINID=' + (req.cookies.skinid || 7) + '&SKINCOLOR=' + req.cookies.skincolor + '" height="150" width="80" id="skinviewerframe"></iframe>');

        res.send(file);
    }
});


app.get('/skins', (req, res) => {
    const token = req.cookies.user;
    if (!token) {
        return res.status(401).send('Non autorisé');
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).send('Token invalide');
        }

        let search = req.query.search ? `%${req.query.search}%` : '%%';
        let category = req.query.category ? `%${req.query.category}%` : '%%';
        const offset = req.query.offset ? parseInt(req.query.offset) : 0;
        const limit = req.query.limit ? parseInt(req.query.limit) : 10;
        const sql = `SELECT skins.* FROM skins LEFT JOIN skin ON skins.id = skin.skinid AND skin.login = ? WHERE skin.id IS NULL AND skins.name LIKE ? AND skins.category LIKE ? AND skins.disponible != 0 ORDER BY skins.id DESC LIMIT ? OFFSET ?`;
        console.log([user.login, search, category, limit, offset]);
		querysync(sql, [user.login, search, category, limit, offset], (err, rows) => {
            if (err) {
                throw err;
            }
            res.send(rows);
        });
    });
});

app.get('/categories', (req, res) => {
    const sql = `SELECT * FROM category`;
    querysync(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
});

app.get('/boutique', (req, res) => {
  let file = fs.readFileSync("site-web/boutique.html", 'utf8');
  res.send(file);
});

app.post('/add-to-cart', (req, res) => {
    const token = req.cookies.user;
    if (!token) {
				console.log('non autorise');

        return res.status(401).send('Non autorisé');
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
						console.log('token invalide');

            return res.status(403).send('Token invalide');
        }

		console.log('before requete');
        const skinId = req.body.skinId;
        const sql = `INSERT INTO skin (skinid, login, color, fav) SELECT ?, ?, color, 0 FROM skins WHERE id = ?`;
        querysync(sql, [skinId, user.login, skinId], (err, result) => {
            if (err) {
                console.error(err.message);
                res.status(500).send('Une erreur s\'est produite lors de l\'ajout du skin');
            } else {
				console.log('ok');
                res.send('Skin ajouté avec succès');
            }
        });
		res.send('Skin ajouté avec succès');
    });
});


app.get('/disconnect', (req, res) => {
	res.clearCookie('user');
	res.clearCookie('blablaland.js');
    return res.redirect('/');
});

app.get('/chat/bbl_chat.php', (req, res) => {
    return res.redirect('/');
});

app.get('/signup', (req, res) => {
    if (req.query.validform == 'Inscription' && req.query.con_pseudo && req.query.con_password) {
        if (req.query.con_pseudo.length < 3)
            return res.send("RES=Ce pseudo est trop court.");
        else if (req.query.con_pseudo.length > 10) {
            return res.send("RES=Ce pseudo est trop long.");
        } else if (req.query.con_password.length < 6) {
            return res.send("RES=Ce mot de passe est trop court.");
        } else if (req.query.con_password.length > 200) {
            return res.send("RES=Ce mot de passe est trop long.");
        } else {
            querysync("SELECT COUNT(*) FROM users WHERE login = ? OR pseudo ?", [req.query.con_pseudo.toUpperCase(), req.query.con_pseudo.toUpperCase()], function(err, row) {
                if (err) {
                    console.error(err.message);
                }
                    return res.send("RES=Ce pseudo est déjà pris par un joueur.");
            });

            req.session.username = req.query.con_pseudo;
            req.session.session = (Math.floor(Math.random() * 9999999) + 1000000).toString();
            let skinColor = [0, 0, 88, 44, 44, 58, 0, 0, 0, 0];
            let skinId = 7;
            let bbl = 420;
            let xp = 69;
			let email = 'null@null.fr';
			let ip0 = '0.0.0.0';
			let last_ip0 = '0.0.0.0';
			let skinsList0 = '';
            let password = CryptoJS.enc.Hex.stringify(SHA512(private_key + req.query.con_password));
			
			console.error(req.query.con_pseudo);
			console.error(password);
			console.error(JSON.stringify(skinColor));
			console.error(skinId);
			console.error(bbl);
			console.error(xp);
			console.error(req.session.session);
			console.error(email);
			console.error(ip0);
			console.error(last_ip0);
			console.error(skinsList0);
			//Contenu de la table users : ID, login, pseudo, password, email, session, bbl, xp, genre, fond_color, fond_image, grade, profile_theme, online_chat, briller, brillance, avatar_color, avatar_image, signature, lastsignature, registerdate, pays, skinaction, skinid, show_skin, skincolors, smiley, clan, fond_repeat, fond_fixed, last_chest, amis, neant, ip, last_ip, staff_titre, api_token, badges, birthdate, email_verified, skinsList 
			querysync("INSERT INTO users (login, pseudo, password, skincolors, skinid, bbl, xp, session, email, ip, last_ip, skinsList) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [req.query.con_pseudo, req.query.con_pseudo, password, JSON.stringify(skinColor), skinId, bbl, xp, req.session.session, email, ip0, last_ip0,skinsList0 ], function(err) {
                if (err) {
                    console.error(err.message);
					return res.send(err.message);
                }
				
				req.session.uid = this.lastID
            });
			querysync("INSERT INTO chat (login) VALUES (?)", [req.query.con_pseudo], function(err) {
				if (err) {
                    console.error(err.message);
					return res.send(err.message);
                }
			});
			
			//on ajoute les skins de bases
			
            let skinIds = [1, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 42, 43];
            skinIds.forEach(skinId => {
                querysync("SELECT color FROM skins WHERE ID = ?", [skinId], function(err, row) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        let color = row[0].color;
                        querysync("INSERT INTO skin (skinid, login, color) VALUES (?, ?, ?)", [skinId, req.query.con_pseudo, color], function(err) {
                            if (err) {
                                console.error(err.message);
                            }
                        });
                    }
                });
            });
			
            req.session.skincolor = exportColor(readColor(skinColor));
            req.session.skinid = skinId;
            req.session.bbl = bbl;
            req.session.xp = xp;
            return res.redirect('/');
        }
    }
    return res.send("RES=Veuillez remplir les champs.");
});

app.get('/skin', (req, res) => {
    var file = fs.readFileSync("site-web/skin.html", 'utf8');
    var form = fs.readFileSync("site-web/form.html", 'utf8');
	const token = req.cookies.user;

    
    if (token) {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                console.error('Erreur lors de la vérification du JWT :', err);
                setDefaultValues();
            } else {
                useJWTValues(decoded);
            }
        });
    } else {
        setDefaultValues();
    }

    function setDefaultValues() {
        file = file.replace("{{form}}", form);
        file = file.replace("{{session}}", `0`);
        file = file.replace("{{skinviewer}}", '<iframe allowfullscreen src="/data/viewskin.swf?SHOWBIG=1&SKINID=7&SKINCOLOR=%01%01%59%2c%2c%3c%01%01%01%01" height="150" width="80" id="skinviewerframe"></iframe>');
        res.send(file);
    }

    function useJWTValues(decoded) {
        const pseudo = decoded.pseudo || 'Valeur par défaut pour le pseudo';
        const bbl = decoded.bbl || 'Valeur par défaut pour le BBL';
        const xp = decoded.xp || 'Valeur par défaut pour le XP';

        file = file.replace("{{form}}", '<h1>' + pseudo + '</h1><br><img src="img/picto_bbl.png"> ' + bbl + ' BBL <br><img src="img/picto_xp.png"> ' + xp + ' XP<br><a href="/disconnect">Déconnexion</a>');
        file = file.replace("{{session}}", decoded.session || 'Valeur par défaut pour la session');
        file = file.replace("{{skinviewer}}", '<iframe allowfullscreen src="/data/viewskin.swf?SHOWBIG=1&SKINID=' + (req.cookies.skinid || 7) + '&SKINCOLOR=' + req.cookies.skincolor + '" height="150" width="80" id="skinviewerframe"></iframe>');

        res.send(file);
    }
});

app.get('/info', (req, res) => {
    var file = fs.readFileSync("site-web/info.html", 'utf8');
    var form = fs.readFileSync("site-web/form.html", 'utf8');
	const token = req.cookies.user;

    
    if (token) {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                console.error('Erreur lors de la vérification du JWT :', err);
                setDefaultValues();
            } else {
                useJWTValues(decoded);
            }
        });
    } else {
        setDefaultValues();
    }

    function setDefaultValues() {
        file = file.replace("{{form}}", form);
        file = file.replace("{{session}}", `0`);
        file = file.replace("{{skinviewer}}", '<iframe allowfullscreen src="/data/viewskin.swf?SHOWBIG=1&SKINID=7&SKINCOLOR=%01%01%59%2c%2c%3c%01%01%01%01" height="150" width="80" id="skinviewerframe"></iframe>');
        res.send(file);
    }

    function useJWTValues(decoded) {
        const pseudo = decoded.pseudo || 'Valeur par défaut pour le pseudo';
        const bbl = decoded.bbl || 'Valeur par défaut pour le BBL';
        const xp = decoded.xp || 'Valeur par défaut pour le XP';

        file = file.replace("{{form}}", '<h1>' + pseudo + '</h1><br><img src="img/picto_bbl.png"> ' + bbl + ' BBL <br><img src="img/picto_xp.png"> ' + xp + ' XP<br><a href="/disconnect">Déconnexion</a>');
        file = file.replace("{{session}}", decoded.session || 'Valeur par défaut pour la session');
        file = file.replace("{{skinviewer}}", '<iframe allowfullscreen src="/data/viewskin.swf?SHOWBIG=1&SKINID=' + (req.cookies.skinid || 7) + '&SKINCOLOR=' + req.cookies.skincolor + '" height="150" width="80" id="skinviewerframe"></iframe>');

        res.send(file);
    }
});

app.get('/howplay', (req, res) => {
    var file = fs.readFileSync("site-web/howplay.html", 'utf8');
    var form = fs.readFileSync("site-web/form.html", 'utf8');
	const token = req.cookies.user;

    
    if (token) {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                console.error('Erreur lors de la vérification du JWT :', err);
                setDefaultValues();
            } else {
                useJWTValues(decoded);
            }
        });
    } else {
        setDefaultValues();
    }

    function setDefaultValues() {
        file = file.replace("{{form}}", form);
        file = file.replace("{{session}}", `0`);
        file = file.replace("{{skinviewer}}", '<iframe allowfullscreen src="/data/viewskin.swf?SHOWBIG=1&SKINID=7&SKINCOLOR=%01%01%59%2c%2c%3c%01%01%01%01" height="150" width="80" id="skinviewerframe"></iframe>');
        res.send(file);
    }

    function useJWTValues(decoded) {
        const pseudo = decoded.pseudo || 'Valeur par défaut pour le pseudo';
        const bbl = decoded.bbl || 'Valeur par défaut pour le BBL';
        const xp = decoded.xp || 'Valeur par défaut pour le XP';

        file = file.replace("{{form}}", '<h1>' + pseudo + '</h1><br><img src="img/picto_bbl.png"> ' + bbl + ' BBL <br><img src="img/picto_xp.png"> ' + xp + ' XP<br><a href="/disconnect">Déconnexion</a>');
        file = file.replace("{{session}}", decoded.session || 'Valeur par défaut pour la session');
        file = file.replace("{{skinviewer}}", '<iframe allowfullscreen src="/data/viewskin.swf?SHOWBIG=1&SKINID=' + (req.cookies.skinid || 7) + '&SKINCOLOR=' + req.cookies.skincolor + '" height="150" width="80" id="skinviewerframe"></iframe>');

        res.send(file);
    }
});

app.get('/rules', (req, res) => {
    var file = fs.readFileSync("site-web/rules.html", 'utf8');
    var form = fs.readFileSync("site-web/form.html", 'utf8');
	const token = req.cookies.user;

    
    if (token) {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                console.error('Erreur lors de la vérification du JWT :', err);
                setDefaultValues();
            } else {
                useJWTValues(decoded);
            }
        });
    } else {
        setDefaultValues();
    }

    function setDefaultValues() {
        file = file.replace("{{form}}", form);
        file = file.replace("{{session}}", `0`);
        file = file.replace("{{skinviewer}}", '<iframe allowfullscreen src="/data/viewskin.swf?SHOWBIG=1&SKINID=7&SKINCOLOR=%01%01%59%2c%2c%3c%01%01%01%01" height="150" width="80" id="skinviewerframe"></iframe>');
        res.send(file);
    }

    function useJWTValues(decoded) {
        const pseudo = decoded.pseudo || 'Valeur par défaut pour le pseudo';
        const bbl = decoded.bbl || 'Valeur par défaut pour le BBL';
        const xp = decoded.xp || 'Valeur par défaut pour le XP';

        file = file.replace("{{form}}", '<h1>' + pseudo + '</h1><br><img src="img/picto_bbl.png"> ' + bbl + ' BBL <br><img src="img/picto_xp.png"> ' + xp + ' XP<br><a href="/disconnect">Déconnexion</a>');
        file = file.replace("{{session}}", decoded.session || 'Valeur par défaut pour la session');
        file = file.replace("{{skinviewer}}", '<iframe allowfullscreen src="/data/viewskin.swf?SHOWBIG=1&SKINID=' + (req.cookies.skinid || 7) + '&SKINCOLOR=' + req.cookies.skincolor + '" height="150" width="80" id="skinviewerframe"></iframe>');

        res.send(file);
    }
});

app.get('/scripts/profil/getSkinList.php', (req, res) => {
        return res.send("Made by Undi and xcore, thanks to .ca staff");
});

app.post('/scripts/profil/getSkinList.php', (req, res) => {
	const token = req.cookies.user;
	if (!token) {
		return res.send("RESULT=1&SKID_0=7&SKCOM_0=L%27Ic%C3%B4ne+de+la+v1%21%0D%0AL%27Embl%C3%AAme%2C+le+symbole+repr%C3%A9sentant+le+tout+premier+personnage+dessin%C3%A9+pour+Blablaland%21&SKNAME_0=Touriste&SKADDON_0=780984&SKCOL_0=%14%01Y--%3B%01%01%01%01&SKLASTCOL_0=%14%01Y--%3B%01%01%01%01&SKFAVORI_0=0&NB=1&SKINID=7&SKINCOLOR=%14%01Y--%3B%01%01%01%01")
	} else {
		jwt.verify(req.cookies.user, secretKey, (err, decoded) => {
			if (err) {
				console.error('Erreur lors de la vérification du JWT :', err);
				return res.send("Erreur lors de la vérification du JWT");
			} else {
				let sql = "SELECT skin.skinid, skins.name, skins.comment, skins.addon, skins.color, skin.fav FROM skin JOIN skins ON skin.skinid = skins.ID WHERE skin.login = (SELECT login FROM users WHERE session = ?)";
				querysync(sql, [decoded.session], (err, rows) => {
					if (err) {
						console.error(err.message);
						return res.send("Erreur lors de la récupération des skins");
					} else {
						var resp = "RESULT=1";
						for (var i = 0; i < rows.length; i++) {
							resp += "&SKID_" + i + "=" + rows[i].skinid;
							resp += "&SKCOM_" + i + "=" + encodeURIComponent(rows[i].comment).replace("%20","+");
							resp += "&SKNAME_" + i + "=" + encodeURIComponent(rows[i].name).replace("%20","+");
							resp += "&SKADDON_" + i + "=" + encodeURIComponent(rows[i].addon).replace("%20","+");
							resp += "&SKCOL_" + i + "=" + encodeURIComponent(rows[i].color).replace("%20","+");
							resp += "&SKLASTCOL_" + i + "=" + encodeURIComponent(rows[i].color).replace("%20","+");
							resp += "&SKFAVORI_" + i + "=" + rows[i].fav;
						}
						resp += "&SKINID=" + req.cookies.skinid + "&SKINCOLOR=" + req.cookies.skincolor.replace('%20', '+').replace('%2D', '-').replace('%2E', '.').replace('%30', '0').replace('%31', '1').replace('%32', '2').replace('%33', '3').replace('%34', '4').replace('%35', '5').replace('%36', '6').replace('%37', '7').replace('%38', '8').replace('%39', '9').replace('%41', 'A').replace('%42', 'B').replace('%43', 'C').replace('%44', 'D').replace('%45', 'E').replace('%46', 'F').replace('%47', 'G').replace('%48', 'H').replace('%49', 'I').replace('%4A', 'J').replace('%4B', 'K').replace('%4C', 'L').replace('%4D', 'M').replace('%4E', 'N').replace('%4F', 'O').replace('%50', 'P').replace('%51', 'Q').replace('%52', 'R').replace('%53', 'S').replace('%54', 'T').replace('%55', 'U').replace('%56', 'V').replace('%57', 'W').replace('%58', 'X').replace('%59', 'Y').replace('%5A', 'Z');
						resp += "&NB=" + rows.length;
						return res.send(resp);
					}
				});
			}
		});
	}
});


app.get('/scripts/profil/setSkinData.php', (req, res) => {
    if (req.query.CACHE && req.query.SKINCOLOR && req.query.SESSION && req.query.SKINID) {
		jwt.verify(req.cookies.user, secretKey, (err, decoded) => {
			if (err) {
				console.error('Erreur lors de la vérification du JWT :', err);
				return res.send("Erreur lors de la vérification du JWT");
			} else {
				let sql = "UPDATE skin SET color = ? WHERE login = (SELECT login FROM users WHERE session = ?) AND skinid = ?";
				let params = [exportColor(readColor(req.query.SKINCOLOR)), decoded.session, req.query.SKINID];
				querysync(sql, params, (err) => {
					if (err) {
						console.error(err.message);
						return res.send("Erreur lors de la mise à jour des données de la peau");
					}
				});
				// Mettre à jour skinid dans la table users
				sql = "UPDATE users SET skinid = ? WHERE session = ?";
				params = [req.query.SKINID, decoded.session];
				querysync(sql, params, (err) => {
					if (err) {
						console.error(err.message);
						return res.send("Erreur lors de la mise à jour de skinid dans la table users");
					}
				});

				let skincolor = exportColor(readColor(req.query.SKINCOLOR));
				let skinid = req.query.SKINID;				
				
				res.cookie('skincolor',skincolor , { maxAge: 900000, httpOnly: true }); // cookie modifiable
				res.cookie('skinid',skinid , { maxAge: 900000, httpOnly: true }); // cookie modifiable
				
				return res.send("");

			};				
		});
	};
});


app.use(express.static('site-web'));

http.listen(port, function () {
    console.log("Server Web on " + port);
});

// a activer pour le https
/*httpsServer.listen(porthttps, () => {
  console.log('HTTPS Server running on port 443');
});*/

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function getUserBySession(sess) {
    querysync("SELECT * FROM users WHERE session = ?", [sess], function(err, row) {
        if (err) {
            console.error(err.message);
        }
        if (row) {
            return row;
        }
        return false;
    });
}

function charToHex(number) {
    number++;
    if (number < 0) {
        number = 0xFFFFFFFF + number + 1;
    }

    let res = number.toString(16).toUpperCase();
    if (res.length == 1)
        res = "0" + res;
    return "%" + res;
}

function exportColor(arr) {
    let res = "";
    for (let i in arr)
        res += charToHex(arr[i]);
    return res;
}

function readColor(color) {
    let arr = new Array();

    for (let i = 0; i < color.length; i++)
        arr.push(color.charCodeAt(i) - 1);

    return arr;
}