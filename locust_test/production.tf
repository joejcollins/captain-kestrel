variable "aws_region" {}
variable "aws_access_key" {}
variable "aws_secret_key" {}
variable "public_key" {}
variable "locust_host" {}

provider "aws" {
  region = var.aws_region
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
}

resource "aws_vpc" "locust_prod" {
  cidr_block = "10.0.0.0/16"
  instance_tenancy = "default"

  tags = {
    Name = "locust_prod"
  }
}

resource "aws_subnet" "locust_prod" {
  vpc_id = aws_vpc.locust_prod.id
  cidr_block = "10.0.0.0/24"
  map_public_ip_on_launch = true
  tags = {
    Name = "locust_prod"
  }
}

resource "aws_internet_gateway" "locust_prod" {
  vpc_id = aws_vpc.locust_prod.id

  tags = {
    Name = "locust_prod"
  }
}

resource "aws_route_table" "locust_prod" {
  vpc_id = aws_vpc.locust_prod.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.locust_prod.id
  }

  tags = {
    Name = "locust_prod"
  }
}

resource "aws_main_route_table_association" "locust_prod" {
  vpc_id = aws_vpc.locust_prod.id
  route_table_id = aws_route_table.locust_prod.id
}


resource "aws_security_group" "locust_prod" {
  name = "locust_prod"
  description = "All locust ports including gossip, management and outbound HTTP(S)"

  ingress {
    from_port = 22
    to_port = 22
    protocol = "tcp"
    cidr_blocks = [
      "185.18.136.0/22",
      "82.33.144.208/32"]
  }

  ingress {
    from_port = 80
    to_port = 80
    protocol = "tcp"
    cidr_blocks = [
      "185.18.136.0/22",
      "82.33.144.208/32"]
  }

  egress {
    from_port = 80
    to_port = 80
    protocol = "tcp"
    cidr_blocks = [
      "0.0.0.0/0"]
  }

  egress {
    from_port = 443
    to_port = 443
    protocol = "tcp"
    cidr_blocks = [
      "0.0.0.0/0"]
  }

  ingress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = [
      "10.0.0.0/16"]
  }

  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = [
      "10.0.0.0/16"]
  }

  vpc_id = aws_vpc.locust_prod.id

  tags = {
    Name = "locust_prod"
  }
}


module "locust_node" {
  source = "./modules/aws_locust"

  locust_host = var.locust_host
  locust_slave_count = 2

  aws_subnet_id = aws_subnet.locust_prod.id
  aws_region = var.aws_region
  aws_access_key = var.aws_access_key
  aws_secret_key = var.aws_secret_key
  public_key = var.public_key
  aws_security_group = aws_security_group.locust_prod.id
}
