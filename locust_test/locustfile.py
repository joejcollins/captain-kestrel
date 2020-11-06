"""Generic locustfile used to load testing sites."""
from locust import HttpLocust, TaskSet, task

class UserBehavior(TaskSet):

    @task(2)
    def index(self):
        self.client.get("/")

    @task(1)
    def where(self):
        self.client.get("/location")

    @task(1)
    def what(self):
        self.client.get("/accommodation")


class LocustDelivery(HttpLocust):
    task_set = UserBehavior
    min_wait = 5000
    max_wait = 15000
