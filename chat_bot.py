"""print "hello"
cont = True
user_in = ""
resp = {"a":"b","hi":"hey"}
def response(s):
    if s.find("goodbye")>-1:
        cont = false
        return "goodbye"
    else:
        for k in resp:
            if s.find(k)>-1:
                return resp[k]



while cont:
    print response(raw_input(""))"""
name = ""+raw_input("What's your name?")
print 'hi ' +name
