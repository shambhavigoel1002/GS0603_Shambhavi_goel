# GS0603_Shambhavi_goel - GSynergy React Challenge

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Implementation Highlights](#implementation-highlights)
- [Future Improvements](#future-improvements)
- [Demo](#demo)
- [Feedback](#feedback)

## Overview
This application is a Progressive Web App developed for the GSynergy TypeScript React Challenge. It provides functionality for manipulating and analyzing data with dimension members, measure data entry, conditional formatting, and data visualization.

## Features
- Store dimension management (add, remove, update, reorder)
- SKU dimension management (add, remove, update prices and costs)
- Planning grid with:
  - Store and SKU combinations
  - Calendar grouping by weeks and months
  - Sales units entry
  - Automatic calculation of Sales Dollars, GM Dollars, and GM %
  - Conditional formatting based on GM %
- Interactive charting with dual-axis visualization
- Responsive design (minimum width 1080px)
- Authentication
- Import functionality for sample data

## Technology Stack
- React with TypeScript
- State Management: [Redux/Redux Toolkit/Context API/etc.]
- Routing: [React Router/etc.]
- Grid Component: AG-Grid
- Charts: [AG-Charts/Recharts/Chart.js/D3.js]
- UI Framework: [MUI/Ant Design/etc.]
- Testing: [Jest/React Testing Library]
- Deployment: [Firebase/AWS Amplify/Netlify/Vercel/etc.]

## Installation
1. Clone the repository:
```bash
git clone https://github.com/shambhavigoel1002/GS0603_Shambhavi_goel.git
cd gsynergy-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

## Running the Application
To run the application locally:

```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:3000`

## Testing
To run the test suite:

```bash
npm test
# or
yarn test
```


## Project Structure
```
src/
├── assets/         # Static assets including images
├── components/     # Reusable UI components
├── pages/       # Feature-based modules
│   ├── stores/     # Store dimension management
│   ├── skus/       # SKU dimension management
│   ├── planning/   # Planning grid implementation
│   └── charts/     # Visualization components
├── hooks/          # Custom React hooks
├── services/       # API services
├── store/          # State management (Redux)
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
├── App.tsx         # Main app component
└── index.tsx       # Application entry point
```

## Implementation Highlights

Here are key elements of my implementation that demonstrate my proficiency:

1. **State Management Architecture**: I implemented Redux for state management.

2. **Grid Implementation**: I built a robust AG-Grid implementation with complex calculations and conditional formatting that demonstrates my understanding of data visualization and manipulation. 

3. **Component Reusability**: I designed several components with reusability in mind, particularly GridItm. These components demonstrate my ability to write maintainable, DRY code.

4. **TypeScript Implementation**: I leveraged TypeScript's type system to enhance code quality , which shows my proficiency with type-safe programming.

5. **Testing Strategy**: I implemented a comprehensive testing strategy using vitest which demonstrates my commitment to code quality and reliability.

## Future Improvements

1. **Performance Optimization**: I would optimize the rendering performance of the grid component by . This would improve the user experience when handling large datasets.

2. **Enhanced Data Visualization**: I would expand the charting capabilities , which would provide users with more insights from their data.

3. **Offline Capabilities**: I would enhance the PWA functionality to enable better offline data handling .

4. **Accessibility Improvements**: I would conduct a comprehensive accessibility audit and implement improvements to ensure the application meets WCAG standards.

5. **Additional Unit and Integration Tests**: I would increase test coverage to ensure robustness.

## Demo
A live deployment of the application can be found at:https://gs-0603-shambhavi-goel-zbvq.vercel.app/

A video demonstration of the application's functionality can be viewed at: https://jam.dev/c/9d57f77e-fe46-416f-9c4d-1484786623f8
Demo credentials for authentication:
- Username: admin@gmail.com
- Password: admin
