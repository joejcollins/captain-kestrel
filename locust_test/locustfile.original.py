try:
    import resource

    resource.setrlimit(resource.RLIMIT_NOFILE, (999_999, 999_999))
except (ImportError, ValueError):
    print("Unable to change resource limits.")

import random
import os
import logging

logger = logging.Logger(__name__)

from locust import HttpLocust, TaskSet, task

PROJECT_NAME = os.environ.get(
    "CONTENSIS_PROJECT_NAME", default="project944520190730144626"
)
ACCESS_TOKEN = os.environ.get(
    "CONTENSIS_ACCESS_TOKEN", default="JjFwaU1ySx0hEAMnjVwhWpNzLQT61ETvDkOwekK2vaFaEk5E"
)

# TODO: Generate number of nodes from depth & nodes per level
NO_OF_NODES = 137256

# Importer settings
DEPTH = 6
NODES_PER_LEVEL = 7

NO_OF_ENTRIES = 1000 if NO_OF_NODES > 1000 else NO_OF_NODES


def get_path(project_name, _id, access_token, params):
    return f"/api/delivery/projects/{project_name}/nodes/{_id}?accessToken={access_token}{params}"


def get_random_path():
    rnd_depth = random.randint(1, DEPTH)
    path = ""
    num = ""

    for d in range(rnd_depth):
        num += "-" + str(random.randint(1, NODES_PER_LEVEL))
        path += "node{}/".format(num)

    return path.strip("/")


def get_random_node_id(path=None):
    _id = str(random.randint(1, NO_OF_NODES)).zfill(12)
    if path:
        return "00000000-0000-0000-0000-{}/{}".format(_id, path)
    else:
        return "00000000-0000-0000-0000-{}".format(_id)


def get_random_params(include_start_level=False):
    """
    Get random query parameters from the following:
     - language
     - depth
     - versionStatus
     - entryFields
     - entryLinkDepth
    """
    params = ""

    if random.choice((True, False)):
        params += "&depth={}".format(random.randint(1, DEPTH))

    if include_start_level:
        params += "&startLevel={}".format(random.randint(1, DEPTH))

    # TODO: add random entry publishing
    params += "&versionStatus=latest"

    return params


class NodeDeliveryTaskSet(TaskSet):
    @task(1)
    def get_root(self):
        self.client.get(
            get_path(
                project_name=PROJECT_NAME,
                access_token=ACCESS_TOKEN,
                _id="root",
                params=get_random_params(),
            )
        )

    @task(7)
    def get_by_id(self):
        self.client.get(
            get_path(
                project_name=PROJECT_NAME,
                access_token=ACCESS_TOKEN,
                _id=get_random_node_id(),
                params=get_random_params(),
            )
        )

    @task(6)
    def get_children(self):
        self.client.get(
            get_path(
                project_name=PROJECT_NAME,
                access_token=ACCESS_TOKEN,
                _id=get_random_node_id(path="children"),
                params=get_random_params(),
            )
        )

    @task(5)
    def get_parent(self):
        self.client.get(
            get_path(
                project_name=PROJECT_NAME,
                access_token=ACCESS_TOKEN,
                _id=get_random_node_id(path="parent"),
                params=get_random_params(),
            )
        )

    @task(5)
    def get_siblings(self):
        self.client.get(
            get_path(
                project_name=PROJECT_NAME,
                access_token=ACCESS_TOKEN,
                _id=get_random_node_id(path="siblings"),
                params=get_random_params(),
            )
        )

    @task(5)
    def get_ancestor(self):
        """
        TODO: Check this works
        """
        self.client.get(
            get_path(
                project_name=PROJECT_NAME,
                access_token=ACCESS_TOKEN,
                _id=get_random_node_id(path="ancestor"),
                params=get_random_params(),
            )
        )

    @task(5)
    def get_ancestors(self):
        self.client.get(
            get_path(
                project_name=PROJECT_NAME,
                access_token=ACCESS_TOKEN,
                _id=get_random_node_id(path="ancestors"),
                params=get_random_params(),
            )
        )

    @task(10)
    def get_by_path(self):
        self.client.get(
            get_path(
                project_name=PROJECT_NAME,
                access_token=ACCESS_TOKEN,
                _id=get_random_path(),
                params=get_random_params(),
            )
        )

    @task(2)
    def get_by_entry_id(self):
        self.client.get(
            get_path(
                project_name=PROJECT_NAME,
                access_token=ACCESS_TOKEN,
                _id="",
                params=get_random_params() + "&entryId=" + get_random_node_id(),
            )
        )

    @task(7)
    def get_by_entry_id_canonical(self):
        self.client.get(
            get_path(
                project_name=PROJECT_NAME,
                access_token=ACCESS_TOKEN,
                _id="",
                params="{}&canonicalOnly=true&entryId={}".format(
                    get_random_params(), get_random_node_id()
                ),
            )
        )


class LocustDelivery(HttpLocust):
    task_set = NodeDeliveryTaskSet
    min_wait = 1000
    max_wait = 10000
