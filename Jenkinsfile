pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/raodilip/Recipe-Search-Backend.git'
            }
        }
        stage('Build') {
            steps {
                sh 'mvn clean package'
            }
        }
        stage('Test') {
            steps {
                sh 'mvn test'
            }
        }
        stage('Dockerize') {
            steps {
                sh 'docker build -t backend-image .'
            }
        }
        stage('Deploy') {
            steps {
                // Use docker-compose or deploy to Kubernetes
                sh 'docker-compose up -d backend'
            }
        }
    }
}
