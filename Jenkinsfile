pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credential-id') // set in Jenkins
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

         stage('Push to Docker Hub') {
            steps {
               withCredentials([usernamePassword(credentialsId: 'actual-credential-id', 
                                  usernameVariable: 'DOCKER_USER', 
                                  passwordVariable: 'DOCKER_PASS')]) {
            sh """
                   echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                   docker push ${IMAGE_NAME}:${IMAGE_TAG}
               """
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
