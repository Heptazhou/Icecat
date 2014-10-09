import re
import urllib2
import BeautifulSoup

server="https://addons.mozilla.org"
validlicenses=['http://www.gnu.org/licenses/gpl-3.0.html',
'http://www.mozilla.org/MPL/MPL-1.1.html',
'http://www.opensource.org/licenses/bsd-license.php',
'http://www.gnu.org/licenses/gpl-2.0.html',
'http://www.opensource.org/licenses/mit-license.php',
'http://www.mozilla.org/MPL/2.0/']

def normalink(string):
    return re.sub('\?.*', '', string)

def parselist(url):
    l = []
    request =  urllib2.Request(url)
    response = urllib2.urlopen(request)
    soup = BeautifulSoup.BeautifulSoup(response)
    for infodiv in soup.findAll('div',{'class':'info'}):
        for h3 in infodiv.findAll('h3'):
            for link in h3.findAll('a'):
                l.append(re.sub('\?.*', '', link['href']))
    return l


def parsepage(url):
    request =  urllib2.Request(url)
    response = urllib2.urlopen(request)
    soup = BeautifulSoup.BeautifulSoup(response)
    try:
        licenseli =  soup.findAll('li',{'class':'source-license'})[0]
        license = licenseli.findAll('a')[0]['href']
        if license not in validlicenses:
            print "INVALID LICENSE: " + license
            return 0
    except:
        return 0
    print soup.findAll(attrs={"property":"og:title"})[0]['content']
    """print soup.findAll(attrs={"property":"og:description"})[0]['content']
    print normalink(soup.findAll(attrs={"property":"og:image"})[0]['content'])
    print license"""
    addondiv = soup.findAll('div',{'id':'addon'})[0]
    addonp = addondiv.findAll('p',{'class':'install-button'})[0]
    button = addonp.findAll('a')[0]
    print server + normalink(button['href'])

links=[]
for page in range(1,2):
    links = links + parselist(server + "/en-US/firefox/search/?q=+&platform=linux&page=" + str(page))

for link in links:
    parsepage(server+link)

