## Getting Started

Vente_enchere_api est l'API du l'application web Vente aux enchère, pour le projet d'E-Commerce de l'année académique 2021/2022 - GI2022

## Déployer en local

### Téléchargez et intallez MongoDB sur votre machine

Le lien : https://www.mongodb.com/try/download/community

### Créez un fichier .env qui contient les variables d'environnement du projet :

    Ajoutez les variables d'environnement, notamment :
        - DB_NAME : le nom de la base de donnée
        - DB_URL : l'url de la base de donnée mongodb. Si vous êtes en local, utilisez mongodb://localhost:27017/
        - PORT : Utilisez le port 3001

### Lancez le serveur

- yarn install: installez les dépendances.
- yarn start : lancer le serveur
- ouvrir http://localhost:3001 sur votre navigateur
