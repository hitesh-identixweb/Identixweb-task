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
                    def buildNumber = env.BUILD_NUMBER
                    def imageTag = "taskimage:${buildNumber}"
                    sh "docker build -t ${imageTag} ."
                }
            }
        }
        stage('Update Swarm Service') {
            steps {
                script {

                    def buildNumber = env.BUILD_NUMBER
                    def imageTag = "taskimage:${buildNumber}"

                    withCredentials([
                        sshUserPrivateKey(credentialsId: "SERVER_USER_KEY",  usernameVariable: 'SERVER_USER', keyFileVariable: 'SERVER_KEY'),
                    ]) {

                        sh ('''

                            ssh -o StrictHostKeyChecking=no -i ${SERVER_KEY} -tt ${SERVER_USER}@${SERVER_HOST} <<-EOF

                                # Deploy stack
                                docker service update --image ${imageTag} mytask

                                exit

                            EOF
                        ''')
                    }
                }
            }
        }
    }
}




