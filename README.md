<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">FEC Capstone</h3>

  <p align="center">
    project_description
    <br />
    <a href="https://github.com/github_username/repo_name"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/github_username/repo_name">View Demo</a>
    ·
    <a href="https://github.com/github_username/repo_name/issues">Report Bug</a>
    ·
    <a href="https://github.com/github_username/repo_name/issues">Request Feature</a>
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
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#Overview">Overview</a></li>
    <li><a href="#Ratings and Reviews">Roadmap</a></li>
    <li><a href="#Questions and Answers">Contributing</a></li>
    <li><a href="#Related">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Here's a blank template to get started: To avoid retyping too much info. Do a search and replace with your text editor for the following: `github_username`, `repo_name`, `twitter_handle`, `linkedin_username`, `email_client`, `email`, `project_title`, `project_description`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![Typescript][typescript.js]][Typescript-url]
- [![React][React.js]][React-url]
- [![Axios][Axios.js]][Axios-url]
- [![Tailwind][Tailwind.css]][Tailwind-url]
- [![Express][Express.dev]][Express-url]
- [![Jest][Jest.dev]][Jest-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

Follow these steps to set up the FEC Capstone project on your local machine:

1. Clone the repository:

   ```
   git clone https://github.com/LiquidDeath2023/front-end-capstone.git
   ```

2. Install the project dependencies:

   ```bash
   npm install
   ```

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

<!-- USAGE EXAMPLES -->

## Usage

It's a website, come on.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [ Overview ] Feature 1
- [ Related] Feature 2
- [ Q&A ] Feature 3
- [ Ratings and Reviews] Feature 4

See the [open issues](https://github.com/github_username/repo_name/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Overview-->

## Overview

The Overview section of the website displays information related to the product (pricing, name, category, etc.), a style selector, an form to add to your cart, and an image gallery for viewing styles.

The image gallery is your central hub for getting a good look at the product. In default view, there is an image carousel which is click and draggable. You can click the main image to zoom in to expanded view. Clicking again will zoom in further, allowing you to traverse the image by moving your mouse.

The product information is contained on the right side of the screen. This section outlines the name, category, price, and average review. The description and slogan are placed below the image gallery.

The Style selector enables users to choose different variations or styles of the product.

Lastly, the Add to cart area provides an area to select a size and quantity, along with a button that allows customers to easily add the product to their shopping cart.

<!-- related-->

## Usage

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

## Acknowledgments

- []()
- []()
- []()

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

<!-- # Website Name

Welcome to the repository of the Website Name! This website is designed to provide users with an interactive experience through its four major components: Questions and Answers, Related, Overview, and Ratings and Reviews.

## Table of Contents
-  [Introduction](#introduction)
-  [Components](#components)
-  [Installation](#installation)
-  [Usage](#usage)
-  [Contributing](#contributing)
-  [License](#license)

## Introduction
Give a brief introduction to the website and its purpose. Explain what sets it apart and why users would find it valuable.

## Components
### 1. Questions and Answers
Describe the Questions and Answers component and its functionality. Explain how users can post questions and receive answers from the community or experts.

### 2. Related
Explain what the Related component is used for. Describe how it provides related content or suggestions based on the user's current selection or browsing history.

### 3. Overview
Give an overview of the Overview component. Explain its purpose and how it provides a summary or general information about a specific topic or category.

### 4. Ratings and Reviews
Describe the functionality and importance of the Ratings and Reviews component. Explain how users can rate and provide feedback on products, services, or any other relevant items.

## Installation
Provide step-by-step instructions on how to install and set up the website locally. Include any necessary dependencies or prerequisites.

## Usage
Explain how users can navigate and interact with the website. Provide examples or screenshots if applicable. Include any specific instructions or guidelines for each component.

## Contributing
Encourage users and developers to contribute to the project. Outline the guidelines for submitting bug reports, feature requests, or pull requests. Provide information on how to set up the development environment and run tests.

## License
Specify the license under which the website is distributed. Include any necessary disclaimers or acknowledgments.

Feel free to customize and expand upon this README file to best fit your project's needs. Good luck with your website!
-->
