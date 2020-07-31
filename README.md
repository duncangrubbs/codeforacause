# Code for a Cause
> M&amp;T Bank Summer Technology Intern Challenge

## Challenge
"Pandemic Preparedness & Management" consider the challenges faced with contact tracing, social distancing, the economy, and frontline workers. How could this be helped with technology?

Build an application that enhances or improves the management of this crisis or future instances.

## Concept
A web application that provides a daily digest of COVID news, allowing the user to filter out which updates they are seeing. It would store the settings in local storage, without the user having to create an account, etc.

## Tools
- Backend - Lightweight Express Server
- Frontend - Pure HTML/CSS/JS + bundler? Rollup?
- CI/CD - Github Actions
- Deployment - Heroku

## Settings:
1. **Limited:** Basic local (County and State) numbers, described in plain English, and press releases.
2. **Standard:** National and global data, press from wh.gov and the WHO.
3. **Extensive:** All of the above along with new scientific papers, editorials from various sources, etc.

## Todo:
- [x] Basic Code Setup
- [ ] Design
- [x] Settings List and how they will effect data
- [x] Data Fetching
- [ ] Service Worker and Cache
- [ ] Use bundler like rollup
- [ ] Testing
- [ ] CI/CD GHA & Heroku Setup
