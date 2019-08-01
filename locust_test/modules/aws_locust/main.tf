provider "aws" {
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
  region = var.aws_region
}

resource "aws_key_pair" "deployer" {
  public_key = var.public_key
}

resource "aws_instance" "locust_master" {
  ami = "ami-6d48500b"
  instance_type = "t2.micro"

  subnet_id = var.aws_subnet_id
  key_name = aws_key_pair.deployer.key_name

  vpc_security_group_ids = [
    var.aws_security_group
  ]

  connection {
    type = "ssh"
    user = "ubuntu"
    host = self.public_ip
    agent = true
  }

  tags = {
    Name = "locust-master"
  }

  provisioner "file" {
    source = "locustfile.py"
    destination = "/home/ubuntu/locustfile.py"
  }

  provisioner "file" {
    source = "Pipfile"
    destination = "/home/ubuntu/Pipfile"
  }

  provisioner "file" {
    source = "Pipfile.lock"
    destination = "/home/ubuntu/Pipfile.lock"
  }

  provisioner "file" {
    source = "supervisor.j2"
    destination = "/home/ubuntu/supervisor.j2"
  }

  provisioner "file" {
    source = "ansible-deploy.yml"
    destination = "/home/ubuntu/ansible-deploy.yml"
  }

  provisioner "remote-exec" {
    inline = [
      "sudo apt-add-repository -y ppa:ansible/ansible",
      "sudo apt-get update",
      "sudo apt-get install -y ansible",
      "ansible-playbook /home/ubuntu/ansible-deploy.yml -i 'localhost' --extra-vars '{\"locust_master\": \"${aws_instance.locust_master.private_ip}\",        \"node_name\": \"${self.tags["Name"]}\", \"locust_host\": \"${var.locust_host}\"}'",
    ]
  }
}

resource "aws_instance" "locust_slave" {
  ami = "ami-6d48500b"
  instance_type = "t2.micro"

  count = var.locust_slave_count

  subnet_id = var.aws_subnet_id
  key_name = aws_key_pair.deployer.key_name

  vpc_security_group_ids = [
    var.aws_security_group
  ]

  connection {
    type = "ssh"
    user = "ubuntu"
    host = self.public_ip
    agent = true
  }

  tags = {
    Name = "locust-slave"
  }

  provisioner "file" {
    source = "locustfile.py"
    destination = "/home/ubuntu/locustfile.py"
  }

  provisioner "file" {
    source = "Pipfile"
    destination = "/home/ubuntu/Pipfile"
  }

  provisioner "file" {
    source = "Pipfile.lock"
    destination = "/home/ubuntu/Pipfile.lock"
  }

  provisioner "file" {
    source = "supervisor.j2"
    destination = "/home/ubuntu/supervisor.j2"
  }

  provisioner "file" {
    source = "ansible-deploy.yml"
    destination = "/home/ubuntu/ansible-deploy.yml"
  }

  provisioner "remote-exec" {
    inline = [
      "sudo apt-add-repository -y ppa:ansible/ansible",
      "sudo apt-get update",
      "sudo apt-get install -y ansible",
      "ansible-playbook /home/ubuntu/ansible-deploy.yml -i 'localhost' --extra-vars '{\"locust_master\": \"${aws_instance.locust_master.private_ip}\",        \"node_name\": \"${self.tags["Name"]}\", \"locust_host\": \"${var.locust_host}\"}'",
    ]
  }

}