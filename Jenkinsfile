pipeline {
    agent any

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
