from abc import ABC, abstractmethod


class Type(ABC):

    @abstractmethod
    def method_one(self):
        pass
