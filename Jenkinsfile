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
        sh 'npx update-browserslist-db@latest'
        sh 'npm install'
        sh 'npm audit fix --force || true'
        // sh 'npm install -g npm@9.6.7'
        sh 'npm install -g yarn'
        //sh 'npm install -g @webhint/cli'
        sh 'npm install -g sonar-scanner' // Install SonarQube Scanner
        
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
          sh 'npm run build' // Will fail if any lint warnings remain
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
        sh 'trivy image netflix-app || true' // Don't fail on vulnerabilities
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
      //junit 'reports/**/*.xml'
      archiveArtifacts artifacts: 'reports/**', allowEmptyArchive: true
      cleanWs()
    }
  }
}
