database = [
    ['root', 'abc123'],
    ['admin', 'abc123']
]

username = raw_input('Username:')
pin = raw_input('Pin:')
if [username, pin] in database: print 'Access granted'
