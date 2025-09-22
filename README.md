# CI/CD Pipeline for a Node.js App on AWS EC2

This repository demonstrates a complete CI/CD pipeline for a Node.js web application using GitHub Actions. The pipeline automates building a Docker image, pushing it to Docker Hub, and deploying it to an AWS EC2 instance on every push to the `main` branch.



---

## ## Architecture

This pipeline follows a standard GitOps workflow. When a developer pushes code to the GitHub repository, it triggers a GitHub Actions workflow that handles the entire build and deployment process.

**The flow is as follows:**
1.  **Code Push**: A developer pushes new code to the `main` branch on GitHub.
2.  **CI Trigger**: GitHub Actions detects the push and starts the CI/CD workflow.
3.  **Build**: The workflow checks out the code and builds a Docker image based on the `Dockerfile`.
4.  **Push**: The newly built Docker image is pushed to a repository on Docker Hub.
5.  **Deploy**: The workflow securely connects to the AWS EC2 instance via SSH.
6.  **Run**: On the EC2 instance, the latest Docker image is pulled from Docker Hub, and a new container is started, replacing the old one.



---

## ## Technologies Used

* **Application**: Node.js, Express.js
* **Containerization**: Docker
* **CI/CD**: GitHub Actions
* **Container Registry**: Docker Hub
* **Cloud Provider**: Amazon Web Services (AWS EC2)

---

## ## Setup and Configuration

### ### 1. AWS EC2 Instance

An EC2 instance (Ubuntu, `t2.micro`) was set up to host the application. Key configurations include:
* **Docker Installation**: Docker was installed on the instance to run the containerized application.
* **Security Group**: Inbound rules were configured to allow:
    * **HTTP** traffic on port `80` from `Anywhere` (`0.0.0.0/0`) to make the web app accessible.
    * **SSH** traffic on port `22` from `Anywhere` (`0.0.0.0/0`) to allow the GitHub Actions runner to connect.



### ### 2. Docker Hub

A public repository on Docker Hub was created to store the Docker images built by the pipeline.

### ### 3. GitHub Secrets

To allow the pipeline to securely access external services without exposing credentials in the code, the following secrets were configured in the repository (`Settings` > `Secrets and variables` > `Actions`):

* `DOCKERHUB_USERNAME`: Your Docker Hub username.
* `DOCKERHUB_TOKEN`: An access token generated from Docker Hub for authentication.
* `EC2_HOST`: The public IPv4 address of the EC2 instance.
* `EC2_USERNAME`: The username for the EC2 instance (e.g., `ubuntu`).
* `EC2_SSH_KEY`: The private SSH key (`.pem` file content) to access the EC2 instance.



---

## ## The Workflow File (`.github/workflows/main.yml`)

This file is the core of the automation. It defines two sequential jobs: `build-and-push` and `deploy`.

```yaml
name: CI/CD Pipeline for Node.js App

on:
  push:
    branches: [ "main" ]

jobs:
  build-and-push:
    name: Build and Push Docker Image
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: your-dockerhub-username/your-repo-name:latest # Change this

  deploy:
    needs: build-and-push
    name: Deploy to EC2
    runs-on: ubuntu-latest
    steps:
      - name: SSH and Deploy
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ${{ secrets.EC2_USERNAME }}
          key: ${{ secrets.EC2_SSH_KEY }}
          script: |
            docker pull your-dockerhub-username/your-repo-name:latest # Change this
            docker stop my-node-app || true
            docker rm my-node-app || true
            docker run -d --name my-node-app -p 80:3000 your-dockerhub-username/your-repo-name:latest # Change this