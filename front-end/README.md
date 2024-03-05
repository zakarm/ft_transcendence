# Running a Node.js Project with React in Docker

This guide explains how to run a Node.js project with React using Docker.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Docker: [Install Docker](https://docs.docker.com/get-docker/)

## Steps

Follow these steps to run your Node.js project with React using Docker:

1. **Clone the Repository:**

   Clone the repository containing your Node.js project with React.

    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2. **Build Docker Image:**

    ```bash
    docker build -t my-react-app .
    ```

3. **RUN Docker Container:**

    ```bash
    docker run -p 3000:3000 my-react-app
    http://localhost:3000
    ```
