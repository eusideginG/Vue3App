# YummyGreek

### How to use
1. Clone or fork the repository.
2. open with vscode
3. run in your terminal:  
npm install (install necessary packages)  
npm run dev (compile for development)

## important  
Do not forget to add **"/dishes"** to your url to display the dishes

## In detail
This is a restaurant application that allows customers to view the menu and place orders. Customers can see all the dishes offered by the restaurant and filter them based on preferences like allergies, dietary choices, and price. The filters will display all available options for each selected filter. Customers can also add desired dishes to their cart and proceed with the order, leaving any additional comments they may have for consideration.  
  
To display a dish: click on the **question mark (!)** button, at the top right of the card of your desired dish.  
To change the quantity of your dish: change the number input (below and left of the dish description).  
To buy a single dish: click on the **buy** button, (you can still change the quantity) and confirm your order by clicking the **confirm order** button.  
To add dishes in your cart: select the quantity you desire and click the **cart** button.  
To update the your cart: change the quantity your want and click the **cart** button.  
To remove an item from the cart: click the **cart** button without changing the quantity of the dish.
To display your cart: click the **cart** button at the top right of your screen.  
To remove a dish while you are in the cart tab: simple click the **remove** button. 
To buy your cart items: while in your cart tab, click the **confirm order** button.  
To leave a review: after every **confirm order** click you will be prompt to a review page, add your review in the text area and press the **submit** button.  
To filter: press the **filter** button (a filter menu will open), select your desired filter (the filters will apply automatically and cumulatively).  
to close the filter menu: click on the **left arrow** button at the top left of the filter menu or click the **filter** button again.


### Routing
You can edit the routes from "src/router/index.js" and change the **"path"** values as needed.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
