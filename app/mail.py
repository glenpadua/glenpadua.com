import requests

key = 'key-ed7c7844bd3f1a7404469ecc04bf3826'
request_url = 'https://api.mailgun.net/v3/mg.zephony.com/messages'

# request_url = 'https://api.mailgun.net/v2/{0}/messages'.format(sandbox)

def send_email(payload):
    request = requests.post(request_url, auth=('api', key), data={
        'from': 'kevin+form@zephony.com',
        'to': 'support@zephony.com',
        'subject': 'Message from ' + payload['name'],
        'html': payload['email'] + ' says: <br /><br />' + payload['message'],
    })

    print('Status: {0}'.format(request.status_code))
    print('Body:   {0}'.format(request.text))

    return {
        'status': 'success'
    }
