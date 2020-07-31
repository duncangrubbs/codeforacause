# COVID Daily Dashboard
> M&amp;T Bank Summer Technology Intern Challenge

## Challenge Description
"Pandemic Preparedness & Management" consider the challenges faced with contact tracing, social distancing, the economy, and frontline workers. How could this be helped with technology?

Build an application that enhances or improves the management of this crisis or future instances.

## App Description
The COVID Daily Dashboard is a web application that provides a daily digest of COVID numbers, news, and science, allowing the user to filter what they see to some degree. There are three settings each with a different degree of data being shown. When the user selects a setting, it is cached so that when they return to the website, they won't be shown any data or news they were not expecting.

## Principles
The app is built around three governing principles:
1. **Lightweight**. I opted to not use a web framework such a React.js or Angular.js because I wanted to ensure speed and reliability.
2. **Straightforward**. The design is simple, and only includes one page providing an intuitive experience to use, and come back to.
3. **User Control**. I wanted to the user to have control over what they were seeing, without bombarding them with a million different options. To ensure access to as much data as possible, I also provide links in the footer to all data sources and APIs used.

## How to install and build
- Running MacOS/Linux/Windows with `node >= v12.16.3`, `npm >= 6.14.4` or `yarn >= 1.22.4` installed
- Clone this repository and run `npm install` or `yarn install`
- To start a dev server, run `yarn start` or `npm start`. This will start a dev server at `localhost:3000` which you can view in your browser.
- To build run `yarn build` or `npm build`

## Settings:
1. **Limited:** Basic local (State) numbers.
2. **Standard:** Local and national numbers.
3. **Extensive:** All of the above along with new scientific papers, editorials from various sources, etc.

## Todo:
- [x] Basic Code Setup
- [x] Design
- [x] Settings List and how they will effect data
- [x] Data Fetching
- [x] Mobile styles
- [ ] Use bundler like rollup
- [ ] Deploy to GH Pages
- [ ] Service Worker and Cache
- [ ] Testing
