#!groovy

def build() {
    deleteDir()
    checkout scm
    sh "git rev-parse --short HEAD > GIT_COMMIT"
    git_commit=readFile('GIT_COMMIT').trim()

    sh 'docker build . | tee build.log || exit 1; ID=$(tail -1 build.log | awk \'{print $3;}\'); echo $ID > DOCKER_HASH'
    docker_hash=readFile('DOCKER_HASH').trim()

    app_tag="git-${git_commit}-docker-${docker_hash}"
    app_repo="quay.io/ukhomeofficedigital/gro-form:${app_tag}"
    sh "docker tag ${docker_hash} ${app_repo}"

    return app_tag
}

def push( app_tag ) {
    withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'quay-login', 
            passwordVariable: 'PASS', usernameVariable: 'USER']]) {
        sh "docker login -e devops@digital.homeoffice.gov.uk -u ${env.USER} -p ${env.PASS} quay.io"
        sh "docker push ${app_tag}"
    }
       
    return true
}

def deploy(environment, app_tag) {
    node {
        timeout(5) {
            deleteDir()
            checkout scm
            dir('deploy') {
                echo 'DEPLOYING TO ' + environment
                withEnv(["TLS_TAG=quay.io/ukhomeofficedigital/nginx-proxy:v1.1.6", "APP_TAG=${ app_tag }", "REDIS_TAG=quay.io/ukhomeofficedigital/redis:v0.0.1"]) {
                    sh "./scripts/deploy.sh -e ${ environment } ./services/deploy.yaml"
                }    
            }
        }
    }
}

def runIntegrationTests() {
}

# main logic

repository = 'quay.io'
namespace = 'ukhomeofficedigital'
container_name = 'gro-form'
repo_name = repository + '/' + namespace + '/' container_name

node() {
    stage "Build (includes unit tests)"
        app_tag=build( repo_name )

    stage "Push"
        push( app_tag )
}

    stage "Deploy to Dev"
        deploy('dev', app_tag)

stage "Run End-to-End"

stage "Promote to Preprod"
    input "Are you Sure?"
    deploy('preprod', app_tag)

stage "Promote to Production"
    input "Are you Sure?"
    deploy('prod', app_tag)
