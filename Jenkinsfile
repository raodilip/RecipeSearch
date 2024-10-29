pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/raodilip/Recipe-Search-FrontEnd.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }
        stage('Build') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }
        stage('Dockerize') {
            steps {
                dir('frontend') {
                    sh 'docker build -t frontend-image .'
                }
            }
        }
        stage('Deploy') {
            steps {
                // Use docker-compose or deploy to Kubernetes
                sh 'docker-compose up -d frontend'
            }
        }
    }
}
