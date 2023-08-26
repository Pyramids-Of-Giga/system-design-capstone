<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="https://i.imgur.com/kXVg1nL.png" alt="Logo" width="100" height="100">
  </a>

<h3 align="center">FEC Capstone</h3>

  <p align="center">
    <br />
    <a href="https://khurramali.site/fec/"><strong>View Demo »</strong></a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#requirements">Requirements</a></li>
    <li>
    <a href="#roadmap">Roadmap</a>
    <ul>
    <li><a href="#overview">Overview</a></li>
      <li><a href="#related-products">Related Products</a></li>
      <li><a href="#questions-and-answers">Questions and Answers</a></li>
      <li><a href="#reviews-and-ratings">Reviews and Ratings</a></li>
    </ul>
    </li>
    <li><a href="#authors">Authors</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Liquid Death is a front-end application that models a product page for an eCommerce
website using React. It prominently features an overview section,
related products, user-generated questions and answers, and customer
reviews.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- ![Typescript][typescript.js]
- ![React][React.js]
- ![Axios][Axios.js]
- ![Tailwind][Tailwind]
- ![Express][Express]
- ![Jest][Jest]
- ![CSS 3][CSS]
- ![HTML 5][HTML]
- ![Javascript][javascript.js]
- ![Node.JS][node.js]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Requirements

1. API key from
   ```sh
   https://github.com/
   ```
2. API key frrom Atelier API
3. API key from
   ```sh
   https://openai.com/
   ```
4. Install NPM packages
   ```sh
   npm install
   ```
5. Add your API keys in a `.env` file
   ```js
   AUTH = "ENTER YOUR GITHUB API KEY";
   API_URI = "ENTER YOUR ATELIER API KEY";
   CHATGPT_URI = "ENTER YOUR CHATGPT API KEY";
   ```
   <p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [ ] App
  - [ ] Overview
  - [ ] Related Products
  - [ ] Questions and Answers
  - [ ] Reviews and Ratings
- [ ] Server
  - [ ] Routing

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Overview-->

## Overview

The Overview section of the website displays information related to the product (pricing, name, category, etc.), a style selector, an form to add to your cart, and an image gallery for viewing styles.

The image gallery is your central hub for getting a good look at the product. In default view, there is an image carousel which is click and draggable. You can click the main image to zoom in to expanded view. Clicking again will zoom in further, allowing you to traverse the image by moving your mouse.

The product information is contained on the right side of the screen. This section outlines the name, category, price, and average review. The description and slogan are placed below the image gallery.

The style selector enables users to maneuver between different styles.

The add to cart feature allows the user to select a product-specific size and quantity and then add that item to their cart.

<!-- related-->

## Related Products

 <ul>
  <li>Related</li>
  <li>
    <span>Related List</span>
    <ul>
      <li>Questions list rendered from a get request to the api</li>
      <li>Answers list rendered from a get request to the api (is rerendered based on the questions list)</li>
      <li>Highlighting feature based on search queries</li>
      <li>Image uploads supported</li>
      <li>Add Answers, creates a pop-</li>
    </ul>
  </li>
  <li>
    <span>Related Cards</span>
    <ul>
      <li>Expand questions, displays all questions and is contained in the screen</li>
      <li>Add Questions, creates a pop-up form that sends a post request to the api </li>
    </ul>
  </li>
  </ul>

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Questions and Answers -->

## Questions and Answers

The questions and answers section is updated based on the product id receieved from the api upon initial load and product selection. Features included displaying, adding, and searching questions and answers.



 <ul>
  <li>
   <span>Search</span>
     <p align="center">
    <br />
    <img src="https://i.imgur.com/RwngAvu.gif" alt="Logo" width="100%" height="150">
  </p>
    <ul>
      <li>Keeps track of search queries that is sent to the questions and answers compoent</li>
    </ul>
    </li>
  <li>
    <span>Questions and Answers</span>
    <ul>
      <li>Questions list rendered from a get request to the api</li>
      <li>Answers list rendered from a get request to the api (is rerendered based on the questions list)</li>
      <li>Highlighting feature based on search queries</li>
      <li>Image uploads supported</li>
      <li>Add Answers, creates a pop-up form that sends a post request to the api</li>
      <img src="https://i.imgur.com/AJ1eXFM.gif" alt="Logo" width="600" height="300">
    </ul>
  </li>
  <li>
    <span>Expand and Add Questions</span>
    <ul>
      <li>Expand questions, displays all questions and is contained in the screen</li>
      <li>Add Questions, creates a pop-up form that sends a post request to the api </li>
    </ul>
  </li>
</ul>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Ratings and Reviews -->

## Reviews and Ratings

<div>
  <div>Component Hierarchy:</div>
  <img src="https://mermaid.ink/img/pako:eNp9kMGKwkAMhl-l5OSCfYEeFmy7XYU9iHrreAidaAc7E0mnW0R8dzvuID1tTsn_fSSQOzSsCTI4dTw2LYpPDqVyyVSreke_hsY-3aE37twfkzT9zBd_Uy6EF82j-_jPLhYx_TG9j2YeQFm_FxRsr8cZ-qq3wnpo_NuItAi0incOpqN5_l3vWcLheZiso12x2AiqADazLTnr24vBEiyJRaOnf9xDosC3ZElBNrUa5aJAucfk4eB5f3MNZF4GWsJw1eipNHgWtJCdsOvp8QR7JHB9?type=png">
  <ul>
    <span>Rating Breakdown</span>
    <ul>
      <li>Utilizes reviews_meta data</li>
      <li>Calculates average rating and associated stars</li>
      <li>Displays % of reviews recommended</li>
      <li>Breaksdown % of reviews by star rating</li>
      <li>Shows average characteristic value from reviews</li>
    </ul>
  </li>
  <li>
    <span>Reviews List</span>
    <ul>
      <li>Sourced from reviews data</li>
      <li>Expands with more reviews button</li>
      <li>Submit new form with Add Review button</li>
    </ul>
  </li>
</ul>
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Authors

- [Ben](https://github.com/CeruleanBean)
- [Jon](https://github.com/jonwill08)
- [Khurram](https://github.com/destocot)
- [Kurt](https://github.com/kurtvardeman)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[Typescript.js]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[Axios.js]: https://img.shields.io/badge/Axios-20232A?style=for-the-badge&logo=axios&logoColor=white
[Tailwind]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Express]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[Jest]: https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white
[CSS]: https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white
[HTML]: https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white
[Javascript.js]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[Node.JS]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
