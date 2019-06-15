from sys import exit
from random import randint

class Scene(object):
    def enter():
        print "This scene is not yet configured. Subclass it and implement enter()."
        exit(1)

class Engine(object):
    def __init__(self, scene_map):
        self.scene_map = scene_map

    def play(self):
        current_scene = self.scene_map.opening_scene()
        while True:
            print "\n--------"
            next_scene_name = current_scene.enter()
            current_scene = self.scene_map.next_scene(next_scene_name)


class Death(Scene):
    def enter():
        pass

    quips = [
        "You died. You kinda suck at this.",
        "Your mom would be proud...if she were smarter.", "Such a luser.",
        "I have a small puppy that's better at this."
    ]
    def enter(self):
        print Death.quips[randint(0, len(self.quips)-1)] exit(1)

class CentralCorridor(Scene):
    def enter():
        pass

class LaserWeaponArmory(Scene):
    def enter():
        pass

class TheBridge(Scene):
    def enter():
        pass

class EscapePod(Scene):
    def enter():
        pass

class Map(object):
    scenes = {
        'central_corridor': CentralCorridor(), 'laser_weapon_armory': LaserWeaponArmory(), 'the_bridge': TheBridge(),
        'escape_pod': EscapePod(),
        'death': Death()
    }

    def __init__(self, start_scene):
        self.start_scene = start_scene
        pass

    def next_scene(self, scene_name):
        return Map.scenes.get(scene_name)

    def opening_scene(scene):
        return self.next_scene(self.start_scene)

a_map = Map('central_corridor')
a_game = Engine(a_map)
a_game.play()
