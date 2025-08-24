terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
    #aws region used
  region = "us-east-1"
}

# Security Group: Allow SSH,and HTTP 
resource "aws_security_group" "ports_access_sg" {
  name        = "allow_ssh_http"
  description = "Allow SSH, and HTTP"

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }


  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# create an EC2 Instance
resource "aws_instance" "minikube_host" {
  ami           = "ami-0f9de6e2d2f067fca" # ubuntu 22.04
  instance_type = "t2.micro"
  key_name      = "Richard-lateu-key-pair"  #  EC2 key pair name

  vpc_security_group_ids = [aws_security_group.ports_access_sg.id]

  user_data = <<-EOF
              #!/bin/bash
             
              # Updating packages
              apt-get update -y
              apt-get upgrade -y
            

              # Install and start Docker
              apt-get install -y docker.io conntrack curl
              systemctl enable docker
              systemctl start docker

              # Adding ubuntu user to docker group
              usermod -aG docker ubuntu

              # Install Minikube
              curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
              install minikube-linux-amd64 /usr/local/bin/minikube

              # Install kubectl
              curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
              chmod +x kubectl
              mv kubectl /usr/local/bin/
              
              EOF

  tags = {
    Name = "minikube-deployment-server"
  }
}
