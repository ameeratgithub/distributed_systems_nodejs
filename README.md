# Introduction

This project illustrates how we can build a complete distributed systems with Node.js. It has variety of examples to show how we can use different tools and techniques to meet our needs. You can find a `README` in `/recipe-api`, `/web-api` and `/shared` directories. Here, I'll discuss, at high level, what was covered. Details can be found in `README`s of related directories.

> Note: I've included certificates and keys for local `https` setup, to make it easy to run the project. It **SHOULD NOT** be done in production.


## Project Structure

- `examples`
  - This directory has simple examples to understand how things work. These are not related to projects and can be excluded
- `recipe-api`
  - This project acts like a Producer service, which can be used by other services. This service is responsible for storing/retrieving data when other services demand.
- `web-api`
  - This project acts like a Consumer service, which talks to Producer(`recipe-api`) to get the data.

