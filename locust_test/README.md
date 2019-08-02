# How to run this load test

## Overview

Load testing requires enough servers sufficient to provide a stress on the test target system.
Using your laptop is unlikely to be sufficient.
In this approach the virtual servers will be created on Amazon Web Services.
The test process has three stages.

* Creating Servers to Run the Test (this is done with a tool called `Terraform`).
* Running the Test (this is done with a Python module called `Locust`).
* Destroying the Servers After the Test (the servers cost money to run so they need to be destroyed, again using `Terraform`).

Destroying the servers isn't strictly necessary but the price mounts up if they are left on.
That said, running a load test with 10 servers costs about 10p.

### Get an AWS Account and an Access Key
 
Ask one of the other AWS users to give you an account with "Programmatic access"
and "AWS Management Console access".

Go to <https://console.aws.amazon.com/iam/home#/security_credentials> and enter the account name you were given.
This should forward you to an IAM (Identity and Access Management) login page, 
where you can enter the `zengenti` AWS account name. 

    Account: <your_account>
    IAM Account: <your_username>
    Password: <your_password>

Then create an access key and take copy of the key ID and secret ("Access keys for CLI, SDK, & API access").
This will be the only opportunity to make a copy, but there is no cost to making new keys if the copy gets lost.
The keys will look something like this.

    Access key ID: ABABABABABABABABABABAB 
    Secret access key: CDCDCDCDCDCDCDCDCDCDCDCDCDCDCDCDCDCDCDCDCDCDCD

Take the keys and edit the `secrets.tfvar` so it look something like this.

```conf
aws_region = "eu-west-1"
aws_access_key = "ABABABABABABABABABABBAB"
aws_secret_key = "CDCDCDCDCDCDCDCDCDCDCDCDCDCDCDCDCD"
public_key = "ssh-rsa EFFEEFEFEFEFEFEFEFEFEFEFEFEFEFEFEFEFEFEFEFEFEFEFEFEFEFEFEFEFEFEFEFEF== joebloggs@mylaptop.local"
locust_host = "https://cms-example.cloud.contensis.com"
```

The `aws_region` could be changed if need be,
but it is probably not necessary.

### Create Servers to Run the Test

The AWS servers are created using Terraform <https://www.terraform.io/> from Hashicorp.
Download Terraform version is 0.12.5 from <https://www.terraform.io/downloads.html>.

Terraform uses modules to interact with all the major cloud providers,
so you don't have to remember the commands specific to each of the cloud providers.
To interact with AWS and create our servers we need to download the modules for AWS
by running `terraform init`. 
This will search the files for modules that are to be used and download them to a `.terraform` directory.

Before you create the virtual servers you can see what Terraform would plan to do by running `terraform plan -var-file="secrets.tfvars"`.

To create the virtual servers use `terraform apply` with the secret variables file like this `terraform apply -var-file="secrets.tfvars"`,
(if you loose your nerve there is an opportunity back out during this process).

Terraform should create the virtual servers.  
As part of the process it should also create a local file `terraform.tfstate` which is used to refer the the individual instances created on AWS.
This is important to allow for the right instances to be destroyed at the end of this test.

Incidentally, the `locustfile.py` contains a script which defines the load tests to be run.
The `terraform apply` process should deploy this file to the virtual servers and
configure all services to support it.

### Run the Test

In order to run the tests we need to browse to the master server.  
The public IP address of the master server is available in the `terraform.tfstate` file.
The command `terraform state show module.locust_node.aws_instance.locust_master` should display the configuration of the master server.
Alternatively use `terraform state show module.locust_node.aws_instance.locust_master | grep "public_ip"` 
to get the correct lines in the `terraform.tfstate` file.

Browsing to the public IP address of the master server should show a web page with two fields.

* The number of users: the number of users testing your application. Each user opens a TCP connection to your application and tests it.
* Hatch rate: For each second, how many users will be added to the current users until the total amount of users.

So for example, if the number of users is 1000 and the hatch rate is 10.
Each second 10 users added to current users starting from 0 so in 100 seconds you will have 1000 users.
When it reaches to the number of users, the statistic will be reset.

To start the test click "Start swarming", the test specified in `locustfile.py` will but run with the number of users ramping up as specified in your "Hatch rate".

When you are satisfied the test has run for long enough,
stop it and examine the statistics and charts.
This is where the real work begins so I can't help you.

### Destroy the Servers After the Test

At the end of the test (for good house keeping and to save money) destroy the test servers with `terraform destroy -var-file="secrets.tfvars"`
