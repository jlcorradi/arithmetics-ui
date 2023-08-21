# Arithmetics UI

This project entails the development of a straightforward application. It has been created as part of an assignment for
the role of Java Developer at an undisclosed company.

You can access the live version at: http://arithmetics.codigo200.com.br

## To improve

- i18n - Support for multiple languages
- Custom validation instead of HTML5 Validations
- Date Picker instead of HTML5 date

## Proposal

The central idea revolves around crafting a platform dedicated to providing fundamental arithmetic computations. These include Addition, Subtraction, Multiplication, Division, Square Root calculations, as well as the generation of Random Strings.

## Requirements

- docker and docker-compose
- node v16 or later

## Running the Application

### Running locally

Make sure you have the backend (arithmetics) running locally before you run the ui.

if the backend is running on a URL other then http://localhost:8080 you need to adjust the file ```setupProsy.js``` to 
proxy the requests to the correct URL.

Install the app dependencies: `npm install`

Run ```npm start``` to spin up the webpack dev server which will open your browser and load the frondend application

### Running on docker

You can run the full application as docker:

```docker-compose up```

This will pull the backend (arithmetics) image and spin it up as well as a docker container with the arithmetics-ui. 
The application will be available at http://localhost:3000.