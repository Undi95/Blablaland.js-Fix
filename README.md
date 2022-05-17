# Blablaland.js

Un retro Open Source développé par GregVido v0.0.4.3 !
Amélioré par xcoder et Undi.

## Installation


Pour utiliser ce rétro, vous allez avoir besoin de nodejs (https://nodejs.org/en/).  
D'un navigateur qui supporte flash comme Pale Moon (https://www.palemoon.org/download.shtml)  
ainsi que Flash Player (https://ia801806.us.archive.org/13/items/flashplayer32_0r0_371_win/flashplayer32_0r0_371_win.msi) ou du launcher dans ce git.  
Une fois téléchargé, exécutez-le et installez-le.  
Créez un dossier, n'importe ou sur votre ordinateur, que vous nommerez 'blablaland.js' pour cet exemple, nous allons en créer un sur le bureau.  
Ouvrez l'invite de commande (windows + r > cmd), et entrez la commande :  
```
cd Desktop\blablaland.js
```
Ensuite, nous allons démarrer le serveur, en effectuant la commande:
```
npm start
```
Enjoy ! Vous pouvez désormer accéder à l'émulateur en allant sur http://localhost avec un navigateur supportant flash player.

Méthode la plus simple:

	- Téléchargez le pack
	- Allez dans le dossier Serveur
	- Ouvrez launch.bat
	- Enjoy! Votre serveur se lance si nodejs est bien installé
	- Décompressez le launcher
	- Ouvrez launch.bat dans dossier Client pour vous connecter à votre serveur

## NEWS v0.0.4.3

	- Ajout du sélecteur de skins officiel de Blablaland
	- Fix du Skinviewer, sur toutes les pages (again)
	- Retrait de l'anti-mod par défaut, crash sur certains serveurs
	- Ajout d'une clé d'encryption pour protéger les mots de passe (changez là!)
	- Retrait de bugs sur le site et sur le serveur
	- Nettoyage partiel du code

## NEWS v0.0.4.2

	- Ajout de la BDD complète des skins (Noms + Descriptions)
	- Fix du Skinviewer, sur toutes les pages
	- Menu amélioré de changement de skin, avec noms et infos
	- Ajout de plusieurs outils pour facilité l'import/export des skins et leurs couleurs
	- Ajout d'un plus beau formulaire d'inscription (à l'arrache)
	- Préparation pour d'autres features.... si j'ai pas la flemme
	
## NEWS v0.0.4.1

	- Ajout du launcher open-blablaland modifié par Yovach
	- Ajout de l'interface graphique du site par Feavy
	- Ajout d'une page de changement de skin
	- Ajout d'une page d'inscription
	- Ajout de mon mod Blablaland 2016 à l'id skin 999 (/cmd / /help pour les commandes de tests)
	- Ajout de skinviewer, pour voir notre perso sur le site
	- Ajout de quelques skins de blablaland.fun (id > 700)
	- Ajout de 2 .bat pour vous faciliter la vie

## NEWS v0.0.4

    - Ajoût d'un paramètre "ip" dans config.json qui faut renseigner par l'ip du serveur.
    - Réparation de nombreux bug

## NEWS v0.0.3

    - Ajoût d'un client pour activer flash player
    - Ajoût de nouvelle option au config.json

## NEWS v0.0.2

    - Ajoût du respawn
    - Ajoût du tp à la bonne position (par mémoire donc pas sûr à 100% ¯\_(ツ)_/¯)
    - Ajoût du dodo
    - Ajoût d'un fichier config.json pour configuer quelques paramètre de votre serveur.
    - Ajoût d'un système de mise à jour, qui vérifie la version de votre émulateur.
    - Les bobombes tuent les joueurs
    - Map protégé contre les bobombes
    - Téléportation entre planète impossible
    - Fusé de la base1 fonctionnel
    - Protection basique des mods activé

## Config.json
Le config.json est un petit fichier qui permettra de paramétrer votre serveur.  
Il se trouve dans le dossier Server, voici le fonctionnement:

```json
{
    "allowTouriste":"true", 
    "msgErrorTouriste":"Les touristes ont été bloqué.",
    "showPacketsType":"true",
    "allowEditSkinId": "true",
    "allowEditSkinColor": "true"
}
```
À noter que pour désactiver une règle, vous avez juste à remplacer "true" par "false".

## Client

Le client est le même que celui de blablaland.fun.  
Flash player est inclu dans le client.  
Un fichier .bat vous permet de lancer le serveur directement.  
ngrok vous permet de partager votre serveur publiquement, <a href="https://ngrok.com/">plus d'info...<a>

Comptes existant déjà dans la BDD:  

```
Pseudo: Admin
Pass: Admin000

Pseudo: Modo
Pass: Modo000

Pseudo: Membre
Pass: Membre000
```
