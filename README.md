<div align="center">
  <a href="https://github.com/plassasseigne/pizzaporal">
    <img src="images/logo.png" alt="Logo" width="124" height="136">
  </a>

  <h3 align="center">Pizzaporal Reservation Management System - CLI</h3>

  <p align="center">
    This project is a command line utility for a fictional pizzeria named Pizzaporal.  It allows the restaurant to manage its reservations.
    <br />
    <br />
    <a href="https://github.com/plassasseigne/pizzaporal"><strong>Explore the docs »</strong></a>
  </p>
</div>

## Features

1. **Reading and analyzing the reservation file:**
  - Loads and analyzes the `.rps` files containing the week's reservations.
2. **Reservation management:**
  - Allows adding a reservation directly into the file or deleting one through an intuitive interface.
  ```bash
  node bin/cli.js addreservation "Doe"
  ```
3. **Reservation verification:**
  - Retrieves and displays all information about a reservation.
  ```bash
  node bin/cli.js checkreservation "Doe"
  ```
4. **Table verification:**
  - Allows viewing when a table is reserved, along with the associated reservations.
  ```bash
  node bin/cli.js checktable 7
  ```
5. **Generating a file for the calendar:**
  - Generates an `.ical` file based on the name of one or more reservations so that the user can directly add it to their personal calendar.
  ```bash
  node bin/cli.js generateical "Doe" --output "C:\Users\johndoe\Documents\pizza.ics"
  ```
6. **Displays the star pizza:**
  - Indicates the most ordered pizza of the day or the week.
  ```bash
  node bin/cli.js getpizza "Monday"
  ```

## Prerequisites

- **Node.js** : version 14+ recommended
- **npm** : installed with Node.js
- **Dependencies** :
  - [caporal](https://caporal.io/)
  - [ics](https://www.npmjs.com/package/ics)
  - [colors](https://www.npmjs.com/package/colors)
  - [inquirer/prompts](https://www.npmjs.com/package/@inquirer/prompts)


## Installation

- Clone the Github repository :
```bash
git clone https://github.com/plassasseigne/pizzaporal/ {PATH}
```

- Install the dependencies from the project folder :
```bash
npm install
```

- Run the CLI then follow the instructions :
```bash
node bin/cli.js help
```