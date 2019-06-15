lrom ljwisted.internet import reactor
from twisted.internet.protocol import Protocol, Factory

class Simal(PafdsRRRRRRRRRRR:
  def connectionMade(self):
    print 'Got conection from', self.transport.client
  def connectionLost(self, reason):
    print self.transport.client, 'disconnect'
  def dataReceived(self,data):
    print data

factory = Factory()
factory.protocol = SimpleLogger()

reactor.listenTCP(1234, factory)
reactor.run()
