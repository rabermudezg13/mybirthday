# Roni Birthday Messages

A two-page birthday website for Roni.

- `index.html` — guests leave a birthday message.
- `messages.html` — displays all saved messages in a tribute wall.
- Firebase Firestore keeps messages permanently.

## 1. Create Firestore

In Firebase Console open the `roni-dd95b` project, then go to **Build → Firestore Database → Create database**.

Choose a Firestore location and create the database.

## 2. Publish the security rules

Open **Firestore Database → Rules**, replace the current rules with the contents of `firestore.rules`, and click **Publish**.

These rules let visitors read and create birthday messages, but prevent visitors from editing or deleting messages.

## 3. Add Roni's photo

Create an `assets` folder in this repository and upload a photo as:

`assets/roni.jpg`

Both pages already reference this file. If it is missing, the site shows an elegant `R` placeholder instead.

## 4. GitHub Pages

In the repository go to **Settings → Pages**.

Under **Build and deployment** choose:

- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/ (root)`

Save. GitHub will publish the site at:

`https://rabermudezg13.github.io/mybirthday/`

Message wall:

`https://rabermudezg13.github.io/mybirthday/messages.html`
