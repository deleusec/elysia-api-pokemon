# CRUD with ElysiaJS 🦊
| ElysiaJS, un framework web minimaliste basé sur Bun.js 🥟 |
| --- |

Cette application est un exemple de CRUD avec ElysiaJS. L'objectif de ce projet était de concevoir une API avec un CRUD complet et un système d'authentification.
Elle utilise les fonctionnalités de base de ElysiaJS et Bun.js et donne une vue d'ensemble sur la conception d'une API avec ces outils.

## Fonctionnalités

Voici les différentes fonctionnalités implémentées dans cette application :
- 🌐 **CRUD Pokémon**: Gérez les opérations CRUD (Create, Read, Update, Delete) pour les gérer une liste de Pokémon.
- 🌐 **CRUD Users**: Gérez les données des utilisateurs.
- 🔒 **Système d'Authentification**: Implémentation d'un système d'authentification utilisateur avec tokens JWT.

## Outils utilisés

> **Librairies** : 
>-  `@elysiajs/cookie` : Gestion des cookies
>-  `@elysiajs/jwt` : Gestion des tokens JWT (JSON Web Tokens) pour l'authentification et l'autorisation.
>-  `@elysiajs/cors` : Gestion des CORS (Cross-Origin Resource Sharing) pour permettre les requêtes provenant de domaines différents.
>-  `@elysiajs/swagger` : Intègre la documentation Swagger pour une documentation facile et interactive accessible sur la route **/api**.
>-  `elysia-helmet` : Configure les en-têtes HTTP de manière appropriée pour une meilleure sécurité.
>-  `mongoose` : Outil de modélisation d'objets pour interagir avec une base de données MongoDB.

## Mise en route 🚀

### `install`
``` bash   
bun run install
```	 

### `develop`

``` bash
bun run dev
```

### `test`

⚙️ En cours de développement
``` bash
bun run test
```

### `MongoDB`

Pour utiliser l'application, vous devez avoir une base de données MongoDB. 

### `.env.local`

Créez un fichier `.env.local` à la racine du projet et modifiez les variables d'environnement suivantes avec vos propres valeurs :

```
PORT=3000
MONGO_URI="mongodb://localhost:27017/elysiajs"
JWT_SECRET="your_secret"
```

## Utiliser l'API

### `Swagger`

Une fois l'application lancée, vous pouvez accéder à la documentation Swagger à l'adresse suivante : [http://localhost:3000/api](http://localhost:3000/api)

### `Routes`

| Route | Méthode | Description | Protégée |
| --- | --- | --- | --- |
| /api/pokemons | GET | Récupère la liste des pokémons |  
| /api/pokemons/:id | GET | Récupère un pokémon par son id |
| /api/pokemons/create | POST | Crée un nouveau pokémon |
| /api/pokemons/change/:id | PUT | Met à jour un pokémon |
| /api/pokemons/delete/:id | DELETE | Supprime un pokémon |
| /api/pokemons/update/:id | PATCH | Met à jour un ou plusieurs élément(s) d'un pokémon | ✅ |
| /api/users | GET | Récupère la liste des utilisateurs | ✅ |
| /api/users/me | GET | Récupère les données de l'utilisateur connecté | ✅ |
| /api/users/register | POST | Crée un nouvel utilisateur |
| /api/users/login | POST | Connecte un utilisateur |
| /api/users/logout | GET | Déconnecte l'utilisateur connecté |

