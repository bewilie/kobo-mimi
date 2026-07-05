# kobo-mimi

Une bibliothèque d'e-books (EPUB) légère et élégante, spécialement conçue et optimisée pour être lue et téléchargée sur liseuse Kobo, et hébergée sur Vercel avec stockage Vercel Blob.

## Fonctionnalités

- **Double Design :** Un design moderne, sombre et épuré pour ordinateurs et mobiles, et un mode spécial **Liseuse** (contraste élevé noir & blanc, pas d'animations gourmandes, cibles de clic agrandies) qui s'active automatiquement sur Kobo.
- **Gestion simplifiée :** Glissez-déposez vos EPUB directement sur le site pour les téléverser.
- **Sécurisé :** Les suppressions et téléversements peuvent être sécurisés par un code d'administration.
- **Stockage Cloud :** Utilise Vercel Blob pour stocker vos fichiers sans base de données complexe.

## Déploiement sur Vercel & GitHub

### 1. Pousser sur GitHub

1. Créez un nouveau dépôt vide sur GitHub nommé `kobo-mimi`.
2. Ouvrez votre terminal dans le dossier du projet et exécutez les commandes suivantes :
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/VOTRE_PSEUDO/kobo-mimi.git
   git push -u origin main
   ```

### 2. Déployer sur Vercel

1. Rendez-vous sur votre tableau de bord [Vercel](https://vercel.com).
2. Cliquez sur **Add New** > **Project** et importez votre dépôt `kobo-mimi`.
3. Cliquez sur **Deploy**.

### 3. Configurer le Stockage Vercel Blob

1. Une fois le projet créé sur Vercel, allez sur l'onglet **Storage** du projet dans le tableau de bord Vercel.
2. Cliquez sur **Create Database** et choisissez **Blob**.
3. Associez la base de données Blob à votre projet (cela va injecter automatiquement la variable d'environnement `BLOB_READ_WRITE_TOKEN`).
4. Re-déployez votre projet (Vercel le fera automatiquement ou vous pouvez lancer un déploiement dans l'onglet **Deployments**).

### 4. (Optionnel) Sécuriser les uploads/deletes avec un code d'accès

Si vous ne voulez pas que n'importe qui puisse téléverser ou supprimer des livres sur votre site :
1. Sur Vercel, allez dans **Settings** > **Environment Variables**.
2. Ajoutez une variable nommée `ADMIN_PASSWORD` avec le code de votre choix (ex: `MonSuperCode123`).
3. Sur votre site web, cliquez sur l'icône **⚙️ Code d'accès** en haut à droite et renseignez ce même code pour être autorisé à téléverser/supprimer.
