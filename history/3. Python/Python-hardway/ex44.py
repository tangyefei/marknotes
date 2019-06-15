class Parent(object):
    def implict(self):
        print "Parent: implict()"
class Child(Parent):
    def implict(self):
        print "CHILD, BEFORE PARENT altered()"
        super(Child, self).implict()
        print "CHILD, AFTER PARENT altered()"
p = Parent()
c = Child()
p.implict()
c.implict()