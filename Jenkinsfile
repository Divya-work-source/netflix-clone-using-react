pipeline {
  agent any

  tools {
    jdk 'jdk17'
    nodejs 'node16'
  }

  environment {
    SCANNER_HOME = tool 'sonar-scanner'
  }

  stages {
    stage('Clean') {
      steps {
        cleanWs()
      }
    }

    stage('Checkout') {
      steps {
        git credentialsId: 'github', url: 'https://github.com/divya-work-source/netflix-clone-using-react.git', branch: 'main'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('OWASP Scan') {
      steps {
        dependencyCheck additionalArguments: '--format HTML --project "netflix-clone" --scan .',
                         odcInstallation: 'DP-Check'
        dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
      }
    }

    stage('SonarQube Scan') {
      steps {
        withSonarQubeEnv('SonarQube') {
          sh 'npm run build'
        }
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t netflix-app .'
      }
    }

    stage('Trivy Scan') {
      steps {
        sh 'trivy image netflix-app'
      }
    }

    stage('Push to DockerHub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'docker', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh '''
            echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
            docker tag netflix-app $DOCKER_USER/netflix-app:latest
            docker push $DOCKER_USER/netflix-app:latest
          '''
        }
      }
    }
  }
}
