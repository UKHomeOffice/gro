#!groovy

def build() {
    node {
        checkout scm
        sh 'docker build . | tee build.log || exit 1; ID=$(tail -1 build.log | awk \'{print $3;}\'); echo $ID > DOCKER_HASH'
        docker_hash=readFile('DOCKER_HASH').trim()

        sh "git rev-parse --short HEAD > GIT_COMMIT"
        git_commit=readFile('GIT_COMMIT').trim()

        app_tag="git-${git_commit}-docker-${docker_hash}"
        app_repo="quay.io/ukhomeofficedigital/gro-form:${app_tag}"
        sh "docker tag ${docker_hash} ${app_repo}"

        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'quay-login',
                passwordVariable: 'PASS', usernameVariable: 'USER']]) {
            sh "docker login -e devops@digital.homeoffice.gov.uk -u ${env.USER} -p ${env.PASS} quay.io"
            sh "docker push ${app_repo}"
        }

        return app_tag
    }
}

def deploy(environment, app_tag) {
    node {
        timeout(5) {
            deleteDir()
            checkout scm
            dir('kube') {
                echo 'DEPLOYING TO ' + environment
                withEnv(['TLS_TAG=v1.2.3', "APP_TAG=${app_tag}", 'REDIS_TAG=v0.0.1']) {
                    sh "./scripts/deploy.sh -e ${environment} ./services/gro.yaml"
                }
            }
        }
    }
}

def runIntegrationTests() {
}

stage "Build (includes unit tests)"
    app_tag=build()

stage "Deploy to Dev"
    deploy('dev', app_tag)

stage "Run End-to-End"

stage "Promote to Preprod"
    input "Are you Sure?"
    deploy('preprod', app_tag)

stage "Promote to Production"
    input "Are you Sure?"
    deploy('prod', app_tag)
