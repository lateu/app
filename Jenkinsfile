agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/lateu/app.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Unit Tests') {
            steps {
                sh 'npm test'
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