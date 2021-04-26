<h1 align="center">
  <br>
  <a href="https://search-vehicle.netlify.app/">
    <img src="https://raw.githubusercontent.com/HapticHash/search-vehicle/master/src/assets/logo.png" width="150">
  </a>
  <br>
  Search Vehicle
  <br>
</h1>

:star: Star this on GitHub — it helps!

[Search Vehicle](https://search-vehicle.netlify.app/) is a react based web application which helps the user to filter out the data in the search menu using vehicle type, vehicle make, and vehicle year. By using this website the users can search and locate the vehicles that were released between the year of 1995 and 2022. The data is extracted from the API which can be found using this link - https://vpic.nhtsa.dot.gov/api/

<br/>

## Project Overview

---

<img src="https://raw.githubusercontent.com/HapticHash/search-vehicle/master/src/assets/screenshots/Screenshot%201.png" alt="Home page" width="500"> <img src="https://raw.githubusercontent.com/HapticHash/search-vehicle/master/src/assets/screenshots/Screenshot2.png" alt="Loading Page" width="500">

<img src="https://raw.githubusercontent.com/HapticHash/search-vehicle/master/src/assets/screenshots/Screenshot3.png" alt="Search using car make and year" width="500"> <img src="https://raw.githubusercontent.com/HapticHash/search-vehicle/master/src/assets/screenshots/Screenshot4.png" alt="Search using all filters" width="500">

<img src="https://raw.githubusercontent.com/HapticHash/search-vehicle/master/src/assets/screenshots/Screenshot5.png" alt="Invalid result" width="500"> <img src="https://raw.githubusercontent.com/HapticHash/search-vehicle/master/src/assets/screenshots/Screenshot6.png" alt="Search using vehicle type and year" width="500">

<br/>
<br/>

## How to interact?

---

The website provides three options for filtering the results: Manufacturer, Type, and Model year of the vehicle. The users can choose either the name of the manufacturer (upto five) or the vehicle type or both of them simultaneously. The users will also have a provision of selecting a particular year for further refinement in the search engine. The default value of the year is set to be 2021. This website is designed adequately to make it responsive and mobile-friendly. The user can visit the website using [Search Vehicle](https://search-vehicle.netlify.app/).

<br/>

## How to run it locally?

---

You can get the code by simply cloning this repository on your local machine by just writing following in your command prompt/terminal.

```
git clone https://github.com/HapticHash/search-vehicle.git
```

<em> P.S. Make sure you have [git bash](https://git-scm.com/downloads/) installed in your local machine. </em>

So, Once you cloned the app then you are only few steps away from running it locally in your device.

Step 1. The prerequisite to run the project is [npm / node](https://nodejs.org/en/).

Step 2. To add all my used node modules, simply run this code in terminal of the project's folder.

```sh
npm install .
```

Step 3. Now you can run my project locally in you system by using following command in same terminal.

```JS
npm start
```

Step 4. You are now running the code in your local machine. Please feel free to play with filters in order to search your vehicle.

<br/>

## Tools/Libraries used

---

- [ReactJS](http://reactjs.org/) : It is an open-source, front end, JavaScript library for building user interfaces or UI components.
- [Ant Design](https://ant.design/) : It is a design system for enterprise-level products to create an efficient and enjoyable work experience.
- [Axios](https://www.npmjs.com/package/axios) : It is Promise based HTTP client for the browser and node.js.
- [Netlify](https://momentjs.com/) : It is an intuitive Git-based workflow and powerful serverless platform to build, deploy, and collaborate on web apps.

<br/>

## Comments

---

Currently in this app, the user can filter the results using only one value for the year. The feature of providing the range of year is not added here because of the API boundation. I tried to validate the endpoint using various ways but there is no effective way to get the results for multiple years. I also tried using loop to get results but it increased the load time of the website.

<br/>

## Author

---

Harshit Kumar Singh - [Front End Engineer](http://haptichash.github.io/)
