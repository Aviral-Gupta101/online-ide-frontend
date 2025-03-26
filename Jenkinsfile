pipeline {
    agent any

    environment {
        NETLIFY_SITE_ID = '4a5621b5-2355-4c2b-8767-d1037cc5cdf6'
        NETLIFY_AUTH_TOKEN = credentials('netlify-token')
    }

    stages {

        stage('Initialize') {
            steps {
                script {
                    githubNotify account: 'Aviral-Gupta101', credentialsId: 'github_creds', repo: 'online-ide-frontend',  sha: env.GIT_COMMIT, context: 'Build', status: 'PENDING'
                    githubNotify account: 'Aviral-Gupta101', credentialsId: 'github_creds', repo: 'online-ide-frontend',  sha: env.GIT_COMMIT, context: 'Deploy', status: 'PENDING'
                }
            }
        }

        stage('Build') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                script {
                    try {
                        sh '''
                            npm ci
                            ls -alrth
                            npm run build
                            cp netlify.toml dist
                        '''
                        githubNotify account: 'Aviral-Gupta101', credentialsId: 'github_creds', repo: 'online-ide-frontend',  sha: env.GIT_COMMIT, context: 'Build', status: 'SUCCESS'
                    } catch (Exception e) {
                        githubNotify account: 'Aviral-Gupta101', credentialsId: 'github_creds', repo: 'online-ide-frontend',  sha: env.GIT_COMMIT, context: 'Build', status: 'FAILURE'
                        throw e
                    }
                }
            }
        }

        stage('Deploy') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                script {
                    try {
                        sh '''
                            npm install netlify-cli
                            npx netlify --version
                            npx netlify status
                            npx netlify deploy --dir=dist --prod
                        '''
                        githubNotify account: 'Aviral-Gupta101', credentialsId: 'github_creds', repo: 'online-ide-frontend',  sha: env.GIT_COMMIT, context: 'Deploy', status: 'SUCCESS'
                    } catch (Exception e) {
                        githubNotify account: 'Aviral-Gupta101', credentialsId: 'github_creds', repo: 'online-ide-frontend',  sha: env.GIT_COMMIT, context: 'Deploy', status: 'FAILURE'
                        throw e
                    }
                }
            }
        }
    }

}