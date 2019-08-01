output "addresses" {
  value = [
      aws_instance.locust_master.*.public_ip,
      aws_instance.locust_slave.*.public_ip
  ]
}
