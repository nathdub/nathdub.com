# nathdub.com

site du dub avec plein de petits projets randoms.

## Développement

Installer les dépendances avec `npm install`, lancer le serveur de dev avec:

```sh
npm run dev
```

Le site de dev sera accessible sur http://localhost:5173/

Pour tester la version de production:

```sh
npm run build
npm run preview
```
Le site de prod sera accessible sur http://localhost:4173/

## Déploiement

```sh
# setup cloudflare tunnel network
docker network create cloudflare-net
docker run -d --name cloudflare-tunnel --network cloudflare-net cloudflare/cloudflared:latest tunnel --no-autoupdate run --token TOKEN_TUNNEL_CLOUDFLARE

# run server
docker-compose up -d
# rebuild and run server
docker-compose up -d --build

# stop server
docker-compose down
```

Il suffit ensuite sur Cloudflare d'aller dans `Networks > Tunnels > Configure > Published application routes > Add a published application route` et de mettre pour `Service` http://nathdub-website:3000