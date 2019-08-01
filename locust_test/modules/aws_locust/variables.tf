variable "aws_subnet_id" {
    description = "VPC to place the instance inside of."
}

variable "locust_slave_count" {
    description = "Number of instances to create."
}

variable "locust_host" {
    description = "Hostname to run test against."
}

variable "public_key" {
    description = "Public ssh key to connect to the virtual servers with."
}

variable "aws_security_group" {}

variable "aws_access_key" {}
variable "aws_secret_key" {}
variable "aws_region" {}