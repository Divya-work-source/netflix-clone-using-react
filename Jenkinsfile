pipeline {
  agent any

  tools {
    jdk 'jdk17'
    nodejs 'node20' // Make sure Node 20 is configured in Jenkins global tools
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

    stage('Install and Build') {
      steps {
        sh 'npx update-browserslist-db@latest'
        sh 'npm ci'
        sh 'npm run build'
        
        // sh 'npm audit fix --force || true'
        sh 'npm install react-scripts@latest'
        sh 'npm install movie-trailer@3.2.1 --save'
        sh 'ls -l node_modules/.bin/react-scripts'
      }
    }

    stage('OWASP Dependency Check') {
      steps {
        dependencyCheck additionalArguments: """
          --format ALL 
          --project "netflix-clone" 
          --scan . 
          --disableAssembly 
          --disableNodeAudit 
          --disableYarn 
          --disableOssIndex
        """,
        odcInstallation: 'DP-Check'

        dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
      }
      post {
        always {
          archiveArtifacts artifacts: '**/dependency-check-report.*', allowEmptyArchive: true
        }
      }
    }

    stage('SonarQube Analysis') {
      steps {
        withSonarQubeEnv('SonarQube') {
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
        sh 'trivy image netflix-app || true'
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

  post {
    always {
      archiveArtifacts artifacts: 'reports/**', allowEmptyArchive: true
      cleanWs()
    }
  }
}
