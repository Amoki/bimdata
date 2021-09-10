# bimdata

# Questions BIMData.io

## Écriture et lecture de code

### 1 - Transformation de structure de données

En entrée :

```javascript
const input = {
  values: [
    'Door',
    'Wall',
    'Space',
    'WallStandardCase',
    'Slab',
    'Column',
    'Floor',
    'First Floor',
    'Second Floor',
    'Basement',
    'concrete',
    'wood',
    'tiles',
    'type',
    'storey',
    'material',
  ],
  attributes: [
    { value: 0, name: 13 },
    { value: 7, name: 14 },
    { value: 11, name: 15 },
  ],
  elements: [
    { uuid: '123456789', attrs: [0, 2] },
    { uuid: 'abcdefgh', attrs: [1, 2] },
  ],
};
```

Sortie attendue:

```javascript
const output = {
  123456789: { type: 'Door', material: 'wood' },
  abcdefgh: { storey: 'First Floor', material: 'wood' },
};
```

Écrivez un script qui transforme la première structure en la seconde.

```javascript
input.elements.map(({ uuid, attrs }) => {
  const result = new Object();
  attrs.forEach(
    elem => (result[input.values[input.attributes[elem].name]] = input.values[input.attributes[elem].value])
  );
  return {
    [uuid]: result,
  };
```

Quel est l'intérêt de la structure d'entrée (en supposant qu'il n'y a pas 2 éléments mais plusieurs milliers) ?

```
Réponse : Une structure comme celle-ci peut absorber 1 élément comme un nombre illimité et ce grace au fait quelle permet à un script de retrouver dynamiquement les propriétés de chaque "elements".
```

### 2 - Requeter des urls

Soit une liste d'URLs:

```javascript
const urlList = [
  'https://www.instagram.com/p/BlqPRuNhGO8/?__a=1',
  'https://www.instagram.com/p/BWVxYFxhcIZ/?__a=1',
  'https://www.instagram.com/p/Bjz_idfnru4/?__a=1',
];
```

Écrire un programme en javascript qui appelle les URLs en même temps, récupère les données exposées (du JSON), extrait le nom du lieu de chaque réponse et les affiche, dans le même ordre que les URLs.

Le résultat de l'exercice sera attendu dans un fichier index.html qu'il sera possible d'ouvrir avec un navigateur pour voir le résultat.
(Firefox bloque certaines requêtes HTTP par défaut pour les fichiers ouverts en local mais vous pouvez utiliser Chrome, Chromium ou un serveur local pour servir le fichier)

Retour:

Un moyen de retrouver la données provenant des URLs est dispo via index.js et la commande

```bash
npm run fetch
```

Ce fichier a été importé dans index.html via

```html
<script src="index.js">
```

J'ai été confronté à différentes erreurs jusqu'a tomber à celles relatives aux CORS.

J'ai ensuite essayé d'intégrer le code directement au sein de la balise script dans index.html, la de nouveau les CORS m'ont posé problème, j'ai essayé les paramétrages ci-dessous (en vain)

- ajout de headers { "Access-Control-Allow-Origin": "\*" }
- changement de mode -> cors / no-cors

Pour conclure, le seul blocage sur le code produit est un paramétrage fonctionnel de la gestion des CORS.

### 3 - Somme d'un tableau

```javascript
const sumArray = array => array.reduce((acc, elem) => acc + elem, 0);
```

### 4 - Factorielle

Écrivez une fonction calculant de façon récursive la factorielle d'un nombre n.

```javascript
const factorielle = num => {
  if (num === 0) return 1;
  return num * factorielle(num - 1);
};
```

### 5 - RegExp

Écrivez une expression régulière basique permettant de valider une date de naissance (au format `JJ/MM/AAAA`)

```javascript
Regexp : ^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$
```

### 6 - CSS

Soit le html suivant :

```html
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <title>Test BIMData</title>
  </head>
  <body>
    <div class="test">
      <div class="box">box1</div>
      <div class="box">box2</div>
      <div class="box">box3</div>
      <div class="box">box4</div>
      <div class="box different">box5</div>
      <div class="box">box6</div>
      <div class="box">box7</div>
      <div class="box">box8</div>
    </div>
  </body>
</html>
```

Ecrivez le css qui vous semble nécessaire pour reproduire l'image suivante.
![Rendu attendu](https://user-images.githubusercontent.com/1349751/132487293-aa8727ee-5b96-404f-8b8c-84f321e8187d.jpg)

Consigne supplémentaire:

- définissez l'élément `<body>` pour qu'il couvre toute la "hauteur" de l'écran.

Bonus: utilisez du SCSS

```scss
body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.test {
  display: flex;
  .box {
    width: 100px;
    background-color: #ea452f;
    text-align: end;
    border: 1px dashed black;
  }
  .box.different {
    background-color: white;
    text-align: center;
  }
}
```

## Connaissances informatiques

### 1 - Déclaration de variable en javascript

Quelle est la différence entre `var`, `let` et `const` en javaScript et quand faut-il les utiliser ?

```
Réponse :
  - let (syntaxe ES6): permet de déclarer une variable dont on peut en modifier la valeur par la suite. Peut être déclaré sans valeur initiale. Sa portée est limité au bloc où elle se trouve

  - const (syntaxe ES6): c'est une constante, on ne peut pas modifier la référence à sa valeur a postériori (privilégier let dans ce cas). Doit être déclarée avec une valeur initiale. Sa portée est la même que let, à savoir le bloc où elle se trouve

  - var (JavaScript 1.0): s'apparente à let en tout point sauf au niveau de la portée. Si var est définie dans une fonction, sa portée se limitera à cette même fonction. En revanche si elle est déclarée hors d'une fonction, alors sa portée devient globale (ce qui est très risqué)
```

### 2- Syntaxe Javascript

Que fait le code suivant ?

```javascript
([o]) => ({ o });
```

```
Réponse : renvoie une fonction anonyme
```

### 3 - En programmation orientée objet, quelle est la particularité d'une classe abstraite ?

```
Réponse : Une classe abstraite définie une implémentation pour une autre classe qui en hérite. Elle ne peut donc pas être instanciée en l'état. C'est la classe qui en hérite qui implémente de manière effective les méthodes renseignées dans la classe abstraite.
```

### 4 - Quelle est la complexité (en notation grand O) d'un algorithme affichant tous les nombres de 1 à `n`, en remplaçant les multiples de 3 par `ping`, les multiples de 5 par `pong` et les multiples de 3 et 5 par `pingpong` ?

```
Complexité : la compléxité en notation grand O d'un algorithme est le temps de son exécution
```

### 5 - Quel nombre suit `F` en hexadécimal ?

```
Réponse : le nombre 15
```

### 6 - Quelle est la différence entre `git merge` et `git rebase` ?

```
Réponse :
  - Git merge va créer un nouveau commit dans la branch dans lequel il est mergé, sans enmenner avec lui l'historique des commit de la branche de provenance.
  En revanche si le merge est effectué et qu'aucune modification n'est à déplorer dans la branche initiale, alors la branche mergée emporte avec elle son historique. On parle alors de merge en fast forward.

  - Git rebase: Intègre quoi qu'il arrive l'historique de commit de la branche d'où il vient (dans une logique de traçabilité, il est intéressant d'utiliser cette méthode)
```

### 7 - Que fait la commande `chmod 664` ?

```
Réponse : Permet de donner les droits suivants
- User: read / write
- Groupe: read / write
- Autres:  read
```

### 8 - A quoi sert le fichier `/etc/hosts`?

```
Réponse : fichier utilisé par un OS lorsqu'il se connecte à un réseau type internet. Il a pour but d'associer des noms d'hôtes à des adresses IP. Il permet en outre au système de connaitre l'adresse IP associé à un nom de domaine.
```

## Rendu:

Un repo git avec le markdown complété et le fichiers `index.html`.
