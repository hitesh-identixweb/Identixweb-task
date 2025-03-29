pipeline {
    agent any
    environment {
        SERVER_HOST = credentials('SERVER_HOST')
    }
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/hitesh-identixweb/Identixweb-task.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t taskimage:${env.BUILD_NUMBER} ."
                }
            }
        }
        stage('Update Swarm Service') {
            steps {
                script {

                    withCredentials([
                        sshUserPrivateKey(credentialsId: 'SERVER_USER_KEY',  usernameVariable: 'SERVER_USER', keyFileVariable: 'SERVER_KEY')
                    ]) {

                        sh( '''

                            ssh -o StrictHostKeyChecking=no -i ${SERVER_KEY} -tt ${SERVER_USER}@${SERVER_HOST} <<-EOF
                                echo 0000000000000000000000000000000000
                                echo "${BUILD_NUMBER}"
                                echo 222222222222222222222222222222222
                            EOF
                        '''
                        )
                    }
                }
            }
        }
    }
}

