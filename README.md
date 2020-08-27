# Streem Client app

A small React app that displays a form, requests to the Streem API app, and displays a stacked bar chart of the results.

## Installation

Copy `.env.example` to `.env` and fill in your application secrets.

Run `yarn install && yarn start`. Ensure you're running the Streem API app locally too, the `.env` will default to this being available at `http://localhost:3000/results`. 

You should see a form where you can enter search attributes; submitting the form with valid data should display a graph of the results. You will see a error message if an error occurs.

## Design

This is a very simple app, with a top level App component, a Form, and a Graph.

The App is responsible for setting up the other components and handling requests to the Streem API app with the `fetch` JS API. It also formats the data I get back from the Ruby app into a structure that the Graph component can render.

The Form handles the UI and behaviour of the form - only thing of real note here is that I pass the `fetchData` function from the App to this component as a prop, so that we can call it on form submission.

The Graph component renders a stacked bar chart using a React chart library from DevExtreme - I picked it because it looked simple to use.

Ideas for future improvement:

- Tests! 
- Better client-side validation on the form. I've relied on built-in browser validation as a basic level of this.
- Some CSS to improve the visual look - it's pretty raw at the moment
- Lots of improvements could be made to the UI, most important is a time picker of some kind to make entering a time easier
- Space out or rotate the labels on the X axis of the graph (they overlap currently!)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

