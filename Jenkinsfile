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

    stage('OWASP Dependency Check') {
      steps {
        dependencyCheck additionalArguments: '--format HTML --project "netflix-clone" --scan .',
                         odcInstallation: 'DP-Check'
        dependencyCheckPublisher pattern: '**/dependency-check-report.html'
      }
      post {
  always {
    archiveArtifacts artifacts: '**/dependency-check-report.html', allowEmptyArchive: true
  }
}

    }

    stage('SonarQube Analysis') {
      steps {
        withSonarQubeEnv('SonarQube') {
          sh 'CI=true npm run build'
          sh "${SCANNER_HOME}/bin/sonar-scanner"
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
        sh 'trivy image netflix-app || true'  // Avoid pipeline fail on vuln
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
