# Invoice Generation

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [API Documentation](#api-documentation)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Demo](#demo)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Project Overview
This project involves generating a detailed invoice based on various input parameters, including seller details, order details, item details, and tax calculations. The invoice will also include placeholders for the company logo and the seller's signature image.

## Features
- **Dynamic Input Handling**: Easily input and manage seller, billing, and shipping details.
- **Tax Computation**: Automatically compute tax types and amounts based on the place of supply and delivery.
- **Net Amount Calculation**: Derive net amounts for each item considering unit price, quantity, and discounts.
- **Detailed Item Listing**: List multiple items with comprehensive details including description, unit price, quantity, discount, and net amount.
- **Total Amount Calculation**: Compute the total amount including tax for all items.
- **Amount in Words**: Convert the total amount to words for easy readability.
- **Signature and Authorization**: Insert seller's signature image and authorization note.
- **Company Logo**: Placeholder for including the company logo in the invoice.
- **Responsive Design**: The application is mobile-friendly and has a clean design.

## Technologies Used
- **Frontend**: React, Vite, JavaScript, Tailwind CSS, Flowbite, firebase, to-words, Framer Motion, and MUI
- **Backend**: Node.js, Express, jsonwebtoken,jsonwebtoken, and swagger-ui(API-Docometation)
- **Database**: MongoDB
- **State Management**: Redux
- **Authentication**: Google OAuth
- **Animations**: Framer Motion
- **Hosting**: Render

## Documentation
Click on link use api- ([API Documentation](https://abc-invoices.onrender.com/api-docs/))
![API Documentation](./frontend/public/Swagger-UI.png)

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Chandan8018/ABC_INVOICES.git

    ```

2. **Backend Setup**:
    ```bash
    npm install
    ```

3. **Frontend Setup**:
    ```bash
    cd frontend
    npm install
    ```

4. **Environment Variables**:
    - Create a `.env` file in the root of the `api` directory and add your MongoDB URI, JWT secret, and other necessary environment variables.
    - Create a `.env` file in the root of the `frontend` directory and add your Firebase and other necessary environment variables.

## Usage
1. **Start the backend server**:
    ```bash
    npm run dev
    ```

2. **Start the frontend server**:
    ```bash
    cd frontend
    npm run dev
    ```

3. **Open your browser** and navigate to `http://localhost:7970` to view the application.

### Home Page

The Home Page is designed to welcome users with an attractive gradient background and interactive elements. It includes links to services and contact pages.

### Sign In / Sign Up

Users can sign in or register for a new account. These forms handle user input and manage state using Redux.

### Dashboard

Accessible only to authenticated users, the Dashboard displays user-specific information and actions.

## Folder Structure

```sh
.
├── api
|   ├── controllers
|   |   ├── auth.controller.js
|   |   ├── customer.controller.js
|   |   ├── invoice.controller.js
|   |   ├── supplier.controller.js
|   |   └── user.controller.js 
|   ├── routes
|   |   ├── auth.route.js
|   |   ├── customer.route.js
|   |   ├── supplier.route.js
|   |   ├── invoice.route.js
|   |   └── user.route.js
|   ├── models
|   |   ├── customer.model.js
|   |   ├── supplier.model.js
|   |   ├── invoice.model.js
|   |   └── user.model.js
|   ├── utils
|   |   ├── error.js
|   |   └── verifyUser.js
|   └── index.js
|   
├── frontend
|   ├── public
|   ├── src
│   |   ├── components
│   │   |   ├── footer
│   │   │   |   └── FooterComp.jsx
│   │   |   ├── header
│   │   │   |   └── Header.jsx
│   │   |   ├── privateroute
│   │   │   |   └── PrivateRoute.jsx
│   │   |   ├── invoices
│   │   │   |   ├── FullFeaturedCrudGrid.jsx
│   │   │   |   └── Invoice.jsx
│   │   |   ├── googleConfig
│   │   │   |   └── OAuth.jsx
│   │   |   ├── dash
│   │   │   |   ├── DashboardComp.jsx
|   |   |   |   ├── Profile.jsx  
|   |   |   |   ├── SideBarComp.jsx  
|   |   |   |   └── SidebarIcons.jsx
│   │   |   ├── theme
│   │   │   |   └── ThemeProvider.jsx
│   │   |   ├── ui
│   │   │   |   └── Various UI Components
│   |   ├── pages
│   │   |   ├── About.jsx
│   │   |   ├── Contact.jsx
│   │   |   ├── Dashboard.jsx
│   │   |   ├── Home.jsx
│   │   |   ├── Service.jsx
│   │   |   ├── SignIn.jsx
│   │   |   ├── QuizPage.jsx
│   │   |   ├── UpdateCustomer.jsx
│   │   |   ├── UpdateSupplier.jsx
│   │   |   ├── ViewCustomers.jsx
│   │   |   ├── ViewSuppliers.jsx
│   │   |   ├── CreateCustomer.jsx
│   │   |   ├── CreateSupplier.jsx
│   │   |   └── SignUp.jsx
│   |   ├── redux
│   │   |   ├── theme
│   │   |   │   └── themeSlice.js
│   │   |   └── user
│   │   |       └── userSlice.js
│   |   ├── .env
│   |   ├── App.jsx
│   |   ├── main.jsx
│   |   ├── firebase.js
│   |   └── index.css
|   ├── .eslintrc.js
|   ├── .gitignore
|   ├── index.html
|   ├── package-lock.json
|   ├── package.json
|   ├── postcss.config.js
|   ├── tailwind.config.js
|   └── vite.config.js
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```
## Demo

![AfterInvoice](./frontend/public/invoice2.png)
---
![Home Page](./frontend/public/home.png)
---
![Sign Up](./frontend/public/sign-up.png)
---
![Sign In](./frontend/public/sign-in.png)
---
![Update Profile](./frontend/public/update-profile.png)
---
![SideBar](./frontend/public/sidebar.png)
---
![All Customers](./frontend/public/all-customers.png)
---
![Add Customer](./frontend/public/add-customer.png)
---
![Update Customer](./frontend/public/update-customer.png)
---
![All Supplier](./frontend/public/all-suppliers.png)
---
![Add Supplier](./frontend/public/add-supplier.png)
---
![Update Supplier](./frontend/public/update-supplier.png)
---
![BeforeInvoice](./frontend/public/invoice1.png)
---


## License
This project is licensed under the MIT License. See the LICENSE file for details.
---
## Contact
For any questions or inquiries, please contact:

- Author: Chandan Kumar Sahoo
- Email: chandankumarsahoo19@gmail.com
- GitHub: https://github.com/Chandan8018/

Feel free to reach out for any questions, suggestions, or contributions. Happy coding!

