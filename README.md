# The Great Library
## Contributors
- Iémélian Rmbeau
-  Audran Tourneur
- Amaury Giot
- Judith Lecoq


## Description

C'est un système de gestion sous forme de bibliothèque permettant de gérer des livres, des auteurs et des utilisateurs.

## Utilisation
Petit résumé des fonctionnalités de l'application :

### Menu et layout
![](image/Menu_et_layout.PNG)  
Il est possible à partir du menu de naviguer sur 3 pages différentes : Books, Authors et Users.

### Breadcumb
![breadcrum.PNG](image%2Fbreadcrum.PNG)  
Le breadcrumb permet également de naviguer entre les différentes pages de l'application.


### Page des livres (générale)
![Page_bibliotheque.PNG](image%2FPage_bibliotheque.PNG)
- La page de livre générale liste les livres présents dans la base de données.
- Il est possible de trier les livres affichés en cherchant le nom d'un livre ou bien de son auteur. Il est également possible de trier les livres en fonction de leur genre en séléctionnant les badges sous la barre de recherche.  
- En cliquant sur le nom d'un livre dans le tableau, on accède à la page de ce livre.
- En cliquant sur le nom d'un auteur dans le tableau, on accède à la page de cet auteur.

Il est possible d'ajouter des livres en cliquant sur le bouton 'Create a new book' au-dessus de la barre de recherche. On accède alors à une modal permettant de créer un nouveau livre.

![modal_creation_livre.PNG](image%2Fmodal_creation_livre.PNG)

Pour créer un livre il faut renseigner les champs suivants :
- Le titre du livre
- Le nom de l'auteur
- Le genre du livre
- La date de publication

### Page des livres (id)
![page_book_id.PNG](image%2Fpage_book_id.PNG)
- La page des livres (id) affiche les informations du livre sélectionné.
- Il est possible de cliquer sur le nom des utilisateurs possédant le livre pour accéder à leur page.
- Il est possible de supprimer le livre en cliquant sur le bouton 'Delete book'.
- En cliquant sur le bouton 'Open comment section', un drawer s'ouvre sur le côté gauche de la page. Il est alors possible de voir les commentaires du livre et d'en ajouter de nouveaux.

### Page des auteurs (générale)
![page_auteurs.PNG](image%2Fpage_auteurs.PNG)
- La page des auteurs générale liste les auteurs présents dans la base de données.
- Il est possible de trier les auteurs affichés en cherchant le nom d'un auteur dans la barre de recherche.
- Il est possible de trier les auteurs affichés en fonction du nombre de livres écrit en permettant la recherche par nombre de livres écrits.
- En cliquant sur le bouton 'More info', on accède à la page de cet auteur.

### Page des auteurs (id)
![page_auteur_id.PNG](image%2Fpage_auteur_id.PNG)
- La page des auteurs (id) affiche les informations de l'auteur sélectionné.
- Il est possible d'ajouter des livres à l'auteur en cliquant sur le bouton 'Edit book list', puis en sélectionnant/déselectionnant les livres.
- Il est possible de modifier les informations de l'auteur en cliquant sur le bouton 'Edit author information'. Il est alors possible de modifier l'image de l'auteur, son nom et son prénom.
- Il est possible de supprimer l'auteur en cliquant sur le bouton 'Delete author'.

### Page des utilisateurs (générale)
![liste_utilisateurs.PNG](image%2Fliste_utilisateurs.PNG)
- La page des utilisateurs générale liste les utilisateurs présents dans la base de données.
- Il est possible de trier les utilisateurs affichés en cherchant le nom d'un utilisateur dans la barre de recherche.
- Il est possible de trier les utilisateurs affichés en fonction du ou des livres possédés en cliquant sur le bouton 'Filter by books' et en sélectionnant/déselectionnant les livres.
- Il est possible de créer un nouvel utilisateur en cliquant sur le bouton 'Create a new user'. On accède alors à une modal permettant de créer un nouvel utilisateur où il faudra renseigner son nom et son prénom.
- En cliquant sur le bouton 'View', on accède à la page de cet utilisateur.

### Page des utilisateurs (id)
![page_profil_utilisateur.PNG](image%2Fpage_profil_utilisateur.PNG)
- La page des utilisateurs (id) affiche les informations de l'utilisateur sélectionné.
- Il est possible de changer le livre favori de l'utilisateur en cliquant sur le bouton 'Edit favorite book' et en sélectionnant un livre dans la modale.
- Il est possible de changer les genres favoris de l'utilisateur en cliquant sur le bouton 'Edit favorite genres' et en sélectionnant/déselectionnant des genres dans la modale.
- Il est possible de modifier l'étagère de l'utilisateur en cliquant sur le bouton 'Edit bookshelf' et en sélectionnant/déselectionnant des livres dans la modale.
- Il est possible d'ajouter ou de supprimer des amis à un utilisateur en cliquant sur le bouton 'Edit friend list' et en sélectionnant/déselectionnant des utilisateurs dans la modale.
- Il est possible de supprimer l'utilisateur en cliquant sur le bouton 'Delete user'.

## Tests

![tests_coverage.png](image%2Ftests_coverage.png)
![tests_summary.png](image%2Ftests_summary.png)

Nous avons réalisé des tests (essentiels), et possédons au total 30 tests.  
Au total, nous avons environ 2/3 de couverture.
