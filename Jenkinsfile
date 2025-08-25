pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-cred-id') // set in Jenkins
        IMAGE_NAME = "rlateu/my-greeting-app"
        IMAGE_TAG = "${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/lateu/app.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                 dir('src') {
                   sh 'npm install'
                 }
            }
        }

        stage('Run Unit Tests') {
            steps {
                  dir('src') {
                    sh 'npm test'
                   }
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('src') {
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                }
            }
        }
    }

    post {
        success {
            echo "Tests passed! ✅"
        }
        failure {
            echo "Tests failed! ❌"
        }
    }
}
